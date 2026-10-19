import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { RefreshJwtGuard } from './guard/refresh.guard';
import { RolesGuard } from './guard/roles.guard';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtGuard, RefreshJwtGuard, RolesGuard],
  exports: [AuthService, JwtService, JwtGuard, RefreshJwtGuard, RolesGuard],
})
export class AuthModule {}
