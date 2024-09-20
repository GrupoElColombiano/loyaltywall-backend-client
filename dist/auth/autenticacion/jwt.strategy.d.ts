import { AuthService } from '../auth.service';
import { JwtPayload } from '../dto/auth-jwtpayload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string;
    }>;
}
export {};
