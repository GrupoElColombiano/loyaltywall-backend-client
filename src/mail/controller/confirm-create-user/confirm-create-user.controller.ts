import { Controller, Post, Body, Get } from '@nestjs/common';
import { ConfirmCreateUserService } from '../../service/confirm-create-user/confirm-create-user.service';

@Controller('email')
export class ConfirmCreateUserController {
  constructor(
    private readonly confirmCreateUserService: ConfirmCreateUserService,
  ) {}

  @Get('send')
  async sendMail(): Promise<any> {
    return 'mail';
  }

  @Post('confirm-create-user')
  async confirmCreateUserMail(
    @Body('email') email: string,
    @Body('domine') domine: string,
  ): Promise<any> {
    console.log('data', email, domine);
    return await this.confirmCreateUserService.sendConfirmCreateUser(
      email,
      domine,
    );
  }
}
