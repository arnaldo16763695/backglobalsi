import { Module } from '@nestjs/common';
import { StepstoworksService } from './stepstoworks.service';
import { StepstoworksController } from './stepstoworks.controller';

@Module({
  controllers: [StepstoworksController],
  providers: [StepstoworksService],
})
export class StepstoworksModule {}
