"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let KeycloakService = exports.KeycloakService = class KeycloakService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.authServerUrl = this.configService.get('KEYCLOAK_AUTH_SERVER_URL');
        this.realm = this.configService.get('KEYCLOAK_REALM');
        this.clientIdNumber = this.configService.get('KEYCLOAK_CLIENT_ID_NUMBER');
        this.clientId = this.configService.get('KEYCLOAK_CLIENT_ID');
        this.clientSecret = this.configService.get('KEYCLOAK_SECRET');
    }
    loginToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headersRequest = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                const body = {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'client_credentials',
                };
                const response = yield (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/token`, body, { headers: headersRequest }));
                return response.data;
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
    listUsers(tokenAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headersRequest = {
                    'Content-Type': 'application/json',
                    Authorization: `${tokenAccess}`,
                };
                const response = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.authServerUrl}/admin/realms/${this.realm}/users`, { headers: headersRequest }));
                return response.data;
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
    editUser(tokenAccess, user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("user", user, "id", id);
            try {
                const headersRequest = {
                    'Content-Type': 'application/json',
                    Authorization: `${tokenAccess}`,
                    'custom-header': 'custom-header-value',
                };
                const url = `${this.authServerUrl}realms/${this.realm}/loyaltywall-user/update-attributes`;
                console.log('url', url);
                console.log('headers', headersRequest);
                let response;
                try {
                    response = yield (0, rxjs_1.firstValueFrom)(this.httpService.put(url, user, { headers: headersRequest }));
                }
                catch (error) {
                    console.log('error', error);
                }
                console.log('response', response.status);
                if (response.status === 204) {
                    return {
                        status: 200,
                        message: `User with id: ${id} has been edited`,
                        user: user,
                    };
                }
                else {
                    throw new common_1.NotFoundException('Failed to update the user');
                }
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
    changePassword(tokenAccess, newPassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headersRequest = {
                    'Content-Type': 'application/json',
                    Authorization: `${tokenAccess}`,
                };
                const url = `${this.authServerUrl}/admin/realms/${this.realm}/users/${id}/reset-password`;
                const response = yield (0, rxjs_1.firstValueFrom)(this.httpService.post(url, { type: 'password', value: newPassword, temporary: false }, { headers: headersRequest }));
                console.log('response', response);
                if (response.status === 204) {
                    return {
                        status: 200,
                        message: `Contraseña del usuario con ID: ${id} ha sido cambiada`,
                    };
                }
                else {
                    throw new common_1.NotFoundException('No se pudo cambiar la contraseña del usuario');
                }
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
    findUser(tokenAccess, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headersRequest = {
                    'Content-Type': 'application/json',
                    Authorization: `${tokenAccess}`,
                };
                const url = `${this.authServerUrl}/admin/realms/${this.realm}/users/${id}`;
                const response = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers: headersRequest }));
                if (response.status === 200) {
                    return response.data;
                }
                else if (response.status === 404) {
                    throw new common_1.NotFoundException('User not found');
                }
                else {
                    throw new Error('Unknown error while searching for the user');
                }
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
};
exports.KeycloakService = KeycloakService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], KeycloakService);
//# sourceMappingURL=keycloak.service.js.map