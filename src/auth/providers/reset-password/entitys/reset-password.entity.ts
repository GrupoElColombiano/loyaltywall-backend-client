import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reset-password')
export class ResetPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  token: string;
}
