import { TwoFactorAuthenticationMailService } from 'src/mail/service/two-factor-authenticate/two-factor-authentication.mail.service';
import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';
export declare class TwoFactorAuthenticationService {
    private readonly userRepository;
    private readonly twoFactorAuthenticationMailService;
    constructor(userRepository: Repository<UserEntity>, twoFactorAuthenticationMailService: TwoFactorAuthenticationMailService);
    confirmTwoFactorAuthentication(token: string): Promise<any>;
}
