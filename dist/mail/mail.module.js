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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const reset_password_mail_controller_1 = require("./controller/reset-password/reset-password.mail.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reset_password_entity_1 = require("./entitys/reset-password.entity");
const user_entity_1 = require("../user/entitys/user.entity");
const two_factor_authentication_mail_service_1 = require("./service/two-factor-authenticate/two-factor-authentication.mail.service");
const reset_password_mail_service_1 = require("./service/reset-password/reset-password.mail.service");
const confirm_create_user_controller_1 = require("./controller/confirm-create-user/confirm-create-user.controller");
const confirm_create_user_service_1 = require("./service/confirm-create-user/confirm-create-user.service");
const notifications_controller_1 = require("./controller/notifications/notifications.controller");
const notifications_service_1 = require("./service/notifications/notifications.service");
let MailModule = exports.MailModule = class MailModule {
    constructor() {
    }
};
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'loyaltywall.paywall@gmail.com',
                        pass: 'axuocdbmturyyzjg',
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([reset_password_entity_1.ResetPasswordEntity]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
        ],
        providers: [
            reset_password_mail_service_1.ResetPasswordMailService,
            two_factor_authentication_mail_service_1.TwoFactorAuthenticationMailService,
            confirm_create_user_service_1.ConfirmCreateUserService,
            notifications_service_1.NotificationService,
        ],
        exports: [
            reset_password_mail_service_1.ResetPasswordMailService,
            two_factor_authentication_mail_service_1.TwoFactorAuthenticationMailService,
            confirm_create_user_service_1.ConfirmCreateUserService,
            notifications_service_1.NotificationService,
        ],
        controllers: [
            reset_password_mail_controller_1.ResetPasswordMailController,
            confirm_create_user_controller_1.ConfirmCreateUserController,
            notifications_controller_1.NotificationController,
        ],
    }),
    __metadata("design:paramtypes", [])
], MailModule);
//# sourceMappingURL=mail.module.js.map