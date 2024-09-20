import { NotificationService } from 'src/mail/service/notifications/notifications.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(body: {
        email: string;
        subject: string;
        template: string;
    }): Promise<{
        message: string;
    }>;
}
