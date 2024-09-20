import { Test, TestingModule } from '@nestjs/testing';
import { GeographyModuleController } from './geography-module.controller';

describe('GeographyModuleController', () => {
  let controller: GeographyModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeographyModuleController],
    }).compile();

    controller = module.get<GeographyModuleController>(GeographyModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
