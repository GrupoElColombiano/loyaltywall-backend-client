import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationController } from './two-factor-authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  providers: [TwoFactorAuthenticationService],
  controllers: [TwoFactorAuthenticationController],
})
export class TwoFactorAuthenticationModule {}
