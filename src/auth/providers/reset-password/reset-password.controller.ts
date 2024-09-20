import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post(':token')
  async resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {
    console.log('token', token);
    console.log('newPassword', newPassword);
    return this.resetPasswordService.resetPassword(token, newPassword);
  }
}
