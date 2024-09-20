import { Controller, Post, Param, Body } from '@nestjs/common';
import { ConfirmCreateUserService } from './confirm-create-user.service';

@Controller('confirm-create-user')
export class ConfirmCreateUserController {
  constructor(
    private readonly confirmCreateUserService: ConfirmCreateUserService,
  ) {}

  @Post('/:token')
  async confirmCreateUser(
    @Param('token') token: string,
    @Body('verificationCode') verificationCode: number,
  ) {
    return this.confirmCreateUserService.confirmCreateUser(
      token,
      verificationCode,
    );
  }
}
