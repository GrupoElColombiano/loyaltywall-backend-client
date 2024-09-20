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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.KeycloakController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const keycloak_service_1 = require("./keycloak.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let KeycloakController = exports.KeycloakController = class KeycloakController {
    constructor(keycloakService) {
        this.keycloakService = keycloakService;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.keycloakService.loginToken();
        });
    }
    listUsers(tokenAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('token', tokenAccess);
            return yield this.keycloakService.listUsers(tokenAccess);
        });
    }
    editUser(user, id, tokenAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.keycloakService.editUser(tokenAccess, user, id);
        });
    }
    changePassword(newPassword, id, tokenAccess) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(newPassword);
            return yield this.keycloakService.changePassword(tokenAccess, newPassword, id);
        });
    }
    listUser(tokenAccess, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('token', tokenAccess);
            return yield this.keycloakService.findUser(tokenAccess, id);
        });
    }
};
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('token'),
    (0, swagger_1.ApiOperation)({ summary: 'Login and retrieve an authentication token' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KeycloakController.prototype, "login", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Get)('users/list'),
    (0, swagger_1.ApiOperation)({ summary: 'List all users' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeycloakController.prototype, "listUsers", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Put)('users/edit/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Edit a user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], KeycloakController.prototype, "editUser", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Put)('users/change-password/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar la contraseña de un usuario por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Éxito' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], KeycloakController.prototype, "changePassword", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find a user by ID' }),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KeycloakController.prototype, "listUser", null);
exports.KeycloakController = KeycloakController = __decorate([
    (0, common_1.Controller)('keycloak'),
    (0, swagger_1.ApiTags)('KEYCLOAK'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [keycloak_service_1.KeycloakService])
], KeycloakController);
//# sourceMappingURL=keycloak.controller.js.map