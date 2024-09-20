import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNotification(
    email: string,
    subject: string,
    template: string,
  ): Promise<void> {
    console.log('Enrtro a notificacion service');
    const mailOptions = {
      to: email,
      subject: subject,
      html: template,
    };

    console.log('MAIL-OPTIONS', mailOptions);

    await this.mailerService.sendMail(mailOptions);
  }
}
