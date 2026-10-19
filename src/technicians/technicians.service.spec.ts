import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansService } from './technicians.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TechniciansService', () => {
  let service: TechniciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechniciansService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<TechniciansService>(TechniciansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
