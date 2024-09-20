import { Controller, Post, Body } from '@nestjs/common';
import { Public, Unprotected } from 'nest-keycloak-connect';
import { NotificationService } from 'src/mail/service/notifications/notifications.service';

@Unprotected()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Public(true)
  @Post('notification')
  async sendNotification(
    @Body() body: { email: string; subject: string; template: string },
  ) {
    console.log('Enrtro a notificacion controller');
    const { email, subject, template } = body;
    await this.notificationService.sendNotification(email, subject, template);
    return { message: 'Notificación enviada exitosamente' };
  }
}
