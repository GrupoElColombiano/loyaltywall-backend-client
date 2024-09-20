import { Test, TestingModule } from '@nestjs/testing';
import { AuthKcService } from './auth-kc.service';

describe('AuthKcService', () => {
  let service: AuthKcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthKcService],
    }).compile();

    service = module.get<AuthKcService>(AuthKcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
