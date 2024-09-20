import { PartialType } from '@nestjs/swagger';
import { AuthUserDto } from './auth-user-dto';
export class UpdateAuthDto extends PartialType(AuthUserDto) {}
