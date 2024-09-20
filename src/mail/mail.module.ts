import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ResetPasswordMailController } from './controller/reset-password/reset-password.mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordEntity } from './entitys/reset-password.entity';
import { UserEntity } from 'src/user/entitys/user.entity';
import { TwoFactorAuthenticationMailService } from './service/two-factor-authenticate/two-factor-authentication.mail.service';
import { ResetPasswordMailService } from './service/reset-password/reset-password.mail.service';
import { ConfirmCreateUserController } from './controller/confirm-create-user/confirm-create-user.controller';
import { ConfirmCreateUserService } from './service/confirm-create-user/confirm-create-user.service';
import { NotificationController } from './controller/notifications/notifications.controller';
import { NotificationService } from './service/notifications/notifications.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', //process.env.GMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: 'loyaltywall.paywall@gmail.com', //process.env.GMAIL_USER,
          pass: 'axuocdbmturyyzjg', //process.env.GMAIL_PASSWORD
        },
      },
    }),
    TypeOrmModule.forFeature([ResetPasswordEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    ResetPasswordMailService,
    TwoFactorAuthenticationMailService,
    ConfirmCreateUserService,
    NotificationService,
  ],
  exports: [
    ResetPasswordMailService,
    TwoFactorAuthenticationMailService,
    ConfirmCreateUserService,
    NotificationService,
  ],
  controllers: [
    ResetPasswordMailController,
    ConfirmCreateUserController,
    NotificationController,
  ],
})
export class MailModule {
  constructor() {
    // console.log('MailModule loaded');
    // console.log(process.env);
  }
}
