import { Test, TestingModule } from '@nestjs/testing';
import { ImagestoworkService } from './imagestowork.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ImagestoworkService', () => {
  let service: ImagestoworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagestoworkService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<ImagestoworkService>(ImagestoworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
