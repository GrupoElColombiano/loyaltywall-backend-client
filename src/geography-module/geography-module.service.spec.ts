import { Test, TestingModule } from '@nestjs/testing';
import { GeographyModuleService } from './geography-module.service';

describe('GeographyModuleService', () => {
  let service: GeographyModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeographyModuleService],
    }).compile();

    service = module.get<GeographyModuleService>(GeographyModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
