import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { MailService } from '@sendgrid/mail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { ResetPasswordEntity } from 'src/mail/entitys/reset-password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResetPasswordEntity])],
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController],
})
export class ResetPasswordModule {}
