import { Repository } from 'typeorm';
import { UserEntity } from './entitys/user.entity';
import { TwoFactorAuthenticationMailService } from 'src/mail/service/two-factor-authenticate/two-factor-authentication.mail.service';
export declare class UserRepository {
    private readonly userRepository;
    private readonly twoFactorAuthenticationMailService;
    constructor(userRepository: Repository<UserEntity>, twoFactorAuthenticationMailService: TwoFactorAuthenticationMailService);
    createUser(userDto: UserEntity): Promise<any>;
    getUser(query: object): Promise<UserEntity | undefined>;
    deleteUser(email: string): Promise<any>;
}
