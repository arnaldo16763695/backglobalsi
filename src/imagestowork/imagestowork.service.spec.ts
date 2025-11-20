import { Test, TestingModule } from '@nestjs/testing';
import { ImagestoworkService } from './imagestowork.service';

describe('ImagestoworkService', () => {
  let service: ImagestoworkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagestoworkService],
    }).compile();

    service = module.get<ImagestoworkService>(ImagestoworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
