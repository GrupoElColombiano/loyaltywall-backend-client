import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { ResetPasswordEntity } from 'src/mail/entitys/reset-password.entity';
export declare class ResetPasswordService {
    private readonly userRepository;
    private readonly resetPasswordRepository;
    constructor(userRepository: Repository<UserEntity>, resetPasswordRepository: Repository<ResetPasswordEntity>);
    resetPassword(token: string, password: string): Promise<{
        message: string;
    }>;
}
