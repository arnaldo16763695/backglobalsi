import { Module } from '@nestjs/common';
import { StepstoworksService } from './stepstoworks.service';
import { StepstoworksController } from './stepstoworks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StepstoworksController],
  providers: [StepstoworksService, PrismaService, JwtService],
})
export class StepstoworksModule {}
