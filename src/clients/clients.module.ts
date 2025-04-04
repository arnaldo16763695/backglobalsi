import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, JwtGuard, JwtService],
})
export class ClientsModule {} 
