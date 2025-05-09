import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const EXPIRES_TIME = 30 * 60 * 1000;
@Injectable()
export class AuthService { 
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}


  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(loginAuthDto);
    const payload = {
      sub: user.id, // ahora sub será el ID, como recomienda la convención JWT
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRES_TIME),
      },
    };
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByEmail(loginAuthDto.email);
    if (user && (await compare(loginAuthDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(user: any) {
    const payload = {
      sub: user.id || user.sub, // asegura que siempre tenga el id
      email: user.email,
      name: user.name,       
      role: user.role,       
    };
    
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }), 
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRES_TIME),
    };
  }
}
