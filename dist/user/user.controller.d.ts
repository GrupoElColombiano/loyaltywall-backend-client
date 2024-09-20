import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(userDto: UserDto): Promise<any>;
    deleteUser(email: string): Promise<any>;
}
