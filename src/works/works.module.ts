import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [WorksController],
  providers: [WorksService, PrismaService, JwtGuard, JwtService],
})
export class WorksModule {}
