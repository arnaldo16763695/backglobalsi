import { Module } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { TechniciansController } from './technicians.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TechniciansController],
  providers: [TechniciansService, PrismaService, JwtService],
})
export class TechniciansModule {}
