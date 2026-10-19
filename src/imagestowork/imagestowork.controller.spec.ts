import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ImagestoworkController } from './imagestowork.controller';
import { ImagestoworkService } from './imagestowork.service';

describe('ImagestoworkController', () => {
  let controller: ImagestoworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagestoworkController],
      providers: [
        { provide: ImagestoworkService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ImagestoworkController>(ImagestoworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
