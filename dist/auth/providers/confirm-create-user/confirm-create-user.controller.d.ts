import { ConfirmCreateUserService } from './confirm-create-user.service';
export declare class ConfirmCreateUserController {
    private readonly confirmCreateUserService;
    constructor(confirmCreateUserService: ConfirmCreateUserService);
    confirmCreateUser(token: string, verificationCode: number): Promise<any>;
}
