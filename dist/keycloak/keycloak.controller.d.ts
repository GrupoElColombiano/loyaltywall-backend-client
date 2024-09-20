import { KeycloakService } from './keycloak.service';
export declare class KeycloakController {
    private readonly keycloakService;
    constructor(keycloakService: KeycloakService);
    login(): Promise<any>;
    listUsers(tokenAccess: string): Promise<any>;
    editUser(user: any, id: any, tokenAccess: string): Promise<any>;
    changePassword(newPassword: any, id: any, tokenAccess: string): Promise<any>;
    listUser(tokenAccess: string, id: any): Promise<any>;
}
