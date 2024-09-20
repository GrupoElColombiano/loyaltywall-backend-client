import { ResetPasswordService } from './reset-password.service';
export declare class ResetPasswordController {
    private readonly resetPasswordService;
    constructor(resetPasswordService: ResetPasswordService);
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
