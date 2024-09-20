import { Controller } from '@nestjs/common';
import { AuthKcService } from './auth-kc.service';

@Controller('auth-kc')
export class AuthKcController {
  constructor(private readonly authKcService: AuthKcService) {}
}
