import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService { 
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}


  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(loginAuthDto);
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
        role: user.role,
      },
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
      email: user.email,
      sub: user.sub
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
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
