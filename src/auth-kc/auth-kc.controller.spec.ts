import { Test, TestingModule } from '@nestjs/testing';
import { AuthKcController } from './auth-kc.controller';
import { AuthKcService } from './auth-kc.service';

describe('AuthKcController', () => {
  let controller: AuthKcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthKcController],
      providers: [AuthKcService],
    }).compile();

    controller = module.get<AuthKcController>(AuthKcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
