import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
export declare class TwoFactorAuthenticationController {
    private readonly twoFactorAuthenticationService;
    constructor(twoFactorAuthenticationService: TwoFactorAuthenticationService);
    confirmTwoFactorAuthentication(token: string): Promise<any>;
}
