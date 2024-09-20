"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthKcModule = void 0;
const common_1 = require("@nestjs/common");
const auth_kc_service_1 = require("./auth-kc.service");
const auth_kc_controller_1 = require("./auth-kc.controller");
const keycloak_config_service_1 = require("./keycloak-config.service");
let AuthKcModule = exports.AuthKcModule = class AuthKcModule {
};
exports.AuthKcModule = AuthKcModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [auth_kc_controller_1.AuthKcController],
        providers: [auth_kc_service_1.AuthKcService, keycloak_config_service_1.KeycloakConfigService],
        exports: [keycloak_config_service_1.KeycloakConfigService],
    })
], AuthKcModule);
//# sourceMappingURL=auth-kc.module.js.map