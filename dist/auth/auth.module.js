"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const user_repository_1 = require("../user/user.repository");
const jwt_strategy_1 = require("./autenticacion/jwt.strategy");
const roles_guard_1 = require("./autorizacion/roles.guard");
const time_1 = require("./const/time");
const secret_1 = require("./const/secret");
const typeorm_1 = require("@nestjs/typeorm");
const auth_google_module_1 = require("./providers/auth-google/auth-google.module");
const auth_facebook_module_1 = require("./providers/auth-facebook/auth-facebook.module");
const user_entity_1 = require("../user/entitys/user.entity");
const mail_module_1 = require("../mail/mail.module");
const reset_password_module_1 = require("./providers/reset-password/reset-password.module");
const two_factor_authentication_module_1 = require("./providers/two-factor-authentication/two-factor-authentication.module");
const confirm_create_user_module_1 = require("./providers/confirm-create-user/confirm-create-user.module");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: secret_1.SECRET,
                signOptions: { expiresIn: time_1.TIME },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            auth_google_module_1.AuthGoogleModule,
            auth_facebook_module_1.AuthFacebookModule,
            mail_module_1.MailModule,
            reset_password_module_1.ResetPasswordModule,
            two_factor_authentication_module_1.TwoFactorAuthenticationModule,
            confirm_create_user_module_1.ConfirmCreateUserModule,
        ],
        providers: [user_repository_1.UserRepository, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard, auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map