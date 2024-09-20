import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';
export declare class ProfileService {
    private readonly profileRepository;
    constructor(profileRepository: Repository<UserEntity>);
    getUser(id: number): Promise<UserEntity | undefined>;
}
