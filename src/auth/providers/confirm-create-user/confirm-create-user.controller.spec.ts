import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmCreateUserController } from './confirm-create-user.controller';

describe('ConfirmCreateUserController', () => {
  let controller: ConfirmCreateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmCreateUserController],
    }).compile();

    controller = module.get<ConfirmCreateUserController>(ConfirmCreateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
