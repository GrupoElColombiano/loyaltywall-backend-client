import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';
export declare class TwoFactorAuthenticationMailService {
    private readonly userEntity;
    private readonly mailerService;
    constructor(userEntity: Repository<UserEntity>, mailerService: MailerService);
    sendTwoFactorAuthenticationMail(mail: string, domine: string, firstName: string): Promise<{
        token: string;
        message: string;
    }>;
    sendConfirmationTwoFactorAuthenticationMail(firstName: string, email: string): Promise<void>;
}
