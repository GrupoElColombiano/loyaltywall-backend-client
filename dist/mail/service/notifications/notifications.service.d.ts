import { MailerService } from '@nestjs-modules/mailer';
export declare class NotificationService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendNotification(email: string, subject: string, template: string): Promise<void>;
}
