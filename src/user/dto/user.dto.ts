import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  readonly _id?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty({ message: 'El campo firstName es obligatorio' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty({ message: 'El campo lastName es obligatorio' })
  readonly lastName: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsEmail(
    {},
    { message: 'El campo email debe ser un correo electrónico válido' },
  )
  readonly email: string;

  @ApiProperty({ example: '********' })
  @IsNotEmpty({ message: 'El campo password es obligatorio' })
  readonly password: string;

  @ApiProperty({ example: '********' })
  @IsNotEmpty({ message: 'El campo confirmPassword es obligatorio' })
  readonly confirmPassword: string;

  @ApiProperty({ example: '3244760644' })
  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  readonly celular: number;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'El campo isSelectedInfo es obligatorio' })
  readonly isSelectedInfo: boolean;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'El campo isSelectedPolicy es obligatorio' })
  readonly isSelectedPolicy: boolean;
}
