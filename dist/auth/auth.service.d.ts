import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user-dto';
import { UserEntity } from 'src/user/entitys/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    login(userDto: AuthUserDto): Promise<any>;
}
