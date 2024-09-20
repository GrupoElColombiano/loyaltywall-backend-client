import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/user/entitys/user.entity';
export declare class ConfirmCreateUserService {
    private readonly userRepository;
    private readonly mailerService;
    constructor(userRepository: Repository<UserEntity>, mailerService: MailerService);
    confirmCreateUser(token: string, verificationCode: number): Promise<any>;
}
