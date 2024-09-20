import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './autenticacion/jwt-auth.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthUserDto } from './dto/auth-user-dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authRepository: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('login usarui', email, password);
    const userDto: AuthUserDto = { email, password };
    return this.authRepository.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request & { user: UserDto }) {
    return req.user;
  }
}
