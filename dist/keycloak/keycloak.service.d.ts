import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class KeycloakService {
    private readonly httpService;
    private readonly configService;
    private authServerUrl;
    private realm;
    private clientIdNumber;
    private clientId;
    private clientSecret;
    constructor(httpService: HttpService, configService: ConfigService);
    loginToken(): Promise<any>;
    listUsers(tokenAccess: string): Promise<any>;
    editUser(tokenAccess: string, user: any, id: string): Promise<any>;
    changePassword(tokenAccess: string, newPassword: string, id: string): Promise<any>;
    findUser(tokenAccess: string, id: any): Promise<any>;
}
