"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const two_factor_authentication_controller_1 = require("./two-factor-authentication.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../user/entitys/user.entity");
const mail_module_1 = require("../../../mail/mail.module");
const two_factor_authentication_service_1 = require("./two-factor-authentication.service");
let TwoFactorAuthenticationModule = exports.TwoFactorAuthenticationModule = class TwoFactorAuthenticationModule {
};
exports.TwoFactorAuthenticationModule = TwoFactorAuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]), mail_module_1.MailModule],
        providers: [two_factor_authentication_service_1.TwoFactorAuthenticationService],
        controllers: [two_factor_authentication_controller_1.TwoFactorAuthenticationController],
    })
], TwoFactorAuthenticationModule);
//# sourceMappingURL=two-factor-authentication.module.js.map