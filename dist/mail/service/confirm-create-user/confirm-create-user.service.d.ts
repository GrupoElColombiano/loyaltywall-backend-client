import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
export declare class ConfirmCreateUserService {
    private readonly userRepository;
    private readonly mailerService;
    constructor(userRepository: Repository<UserEntity>, mailerService: MailerService);
    sendConfirmCreateUser(email: string, domain: string): Promise<any>;
}
