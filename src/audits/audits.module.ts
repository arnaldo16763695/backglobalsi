import { Module } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuditsController],
  providers: [AuditsService, PrismaService],
})
export class AuditsModule {}
