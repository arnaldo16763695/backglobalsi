import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard } from './guard/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService, JwtGuard ],
})
export class AuthModule {}
