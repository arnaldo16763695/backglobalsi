import { Test, TestingModule } from '@nestjs/testing';
import { StepstoworksService } from './stepstoworks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StepstoworksService', () => {
  let service: StepstoworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepstoworksService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<StepstoworksService>(StepstoworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
