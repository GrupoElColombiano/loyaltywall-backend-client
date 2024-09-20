import { Controller, Param, Post } from '@nestjs/common';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Controller('two-factor-authentication')
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}
  @Post('/:token')
  async confirmTwoFactorAuthentication(@Param('token') token: string) {
    return this.twoFactorAuthenticationService.confirmTwoFactorAuthentication(
      token,
    );
  }
}
