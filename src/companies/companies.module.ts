import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService, JwtGuard, JwtService],
})
export class CompaniesModule {}
