import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  Redirect,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('facebook')
export class AuthFacebookController {
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async facebookLogin() {}

  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  @Redirect('/')
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req,
    };
  }
}
