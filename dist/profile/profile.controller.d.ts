import { ProfileService } from './profile.service';
import { UserEntity } from 'src/user/entitys/user.entity';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getUserProfile(id: number): Promise<UserEntity | undefined>;
}
