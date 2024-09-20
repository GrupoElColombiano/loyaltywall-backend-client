/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Req, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGoogleService } from './auth-google.service';

@Controller('google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  // @Redirect('/')
  googleAuthRedirect(@Req() req: any) {
    return this.authGoogleService.googleLogin(req.user);
  }
}
