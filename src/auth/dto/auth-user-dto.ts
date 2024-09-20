import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of the user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
    minLength: 6,
  })
  password: string;
}
