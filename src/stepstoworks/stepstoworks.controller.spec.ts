import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { StepstoworksController } from './stepstoworks.controller';
import { StepstoworksService } from './stepstoworks.service';

describe('StepstoworksController', () => {
  let controller: StepstoworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepstoworksController],
      providers: [
        { provide: StepstoworksService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<StepstoworksController>(StepstoworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
