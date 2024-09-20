import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';
export declare class AuthGoogleService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    googleLogin(user: any): Promise<"User not found" | "No user from Google" | {
        message: string;
        user: UserEntity;
    }>;
}
