import { AuthGoogleService } from './auth-google.service';
export declare class AuthGoogleController {
    private readonly authGoogleService;
    constructor(authGoogleService: AuthGoogleService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<"User not found" | "No user from Google" | {
        message: string;
        user: import("../../../user/entitys/user.entity").UserEntity;
    }>;
}
