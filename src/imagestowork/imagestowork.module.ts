import { Module } from '@nestjs/common';
import { ImagestoworkService } from './imagestowork.service';
import { ImagestoworkController } from './imagestowork.controller';

@Module({
  controllers: [ImagestoworkController],
  providers: [ImagestoworkService],
})
export class ImagestoworkModule {}
