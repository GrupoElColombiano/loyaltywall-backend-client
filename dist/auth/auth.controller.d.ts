/// <reference types="passport" />
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
export declare class AuthController {
    private readonly authRepository;
    constructor(authRepository: AuthService);
    login(email: string, password: string): Promise<any>;
    getProfile(req: Request & {
        user: UserDto;
    }): Express.User & UserDto;
}
