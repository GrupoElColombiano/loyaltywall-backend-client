"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const enviroments_1 = require("./enviroments");
const config_2 = require("./config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const database_module_1 = require("./database/database.module");
const profile_module_1 = require("./profile/profile.module");
const mail_module_1 = require("./mail/mail.module");
const payment_module_1 = require("./payment/payment.module");
const registerlog_module_1 = require("./registerlog/registerlog.module");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const core_1 = require("@nestjs/core");
const keycloak_config_service_1 = require("./auth-kc/keycloak-config.service");
const auth_kc_module_1 = require("./auth-kc/auth-kc.module");
const keycloak_module_1 = require("./keycloak/keycloak.module");
const gamification_module_1 = require("./gamification/gamification.module");
const geography_module_module_1 = require("./geography-module/geography-module.module");
const template_module_1 = require("./template/template.module");
const paywall_module_1 = require("./paywall/paywall.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: enviroments_1.enviroments[process.env.NODE_ENV] || '.env',
                load: [config_2.default],
                isGlobal: true,
            }),
            nest_keycloak_connect_1.KeycloakConnectModule.registerAsync({
                useExisting: keycloak_config_service_1.KeycloakConfigService,
                imports: [auth_kc_module_1.AuthKcModule],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            profile_module_1.ProfileModule,
            mail_module_1.MailModule,
            payment_module_1.PaymentModule,
            registerlog_module_1.RegisterlogModule,
            auth_kc_module_1.AuthKcModule,
            keycloak_module_1.KeycloakModule,
            gamification_module_1.GamificationModule,
            geography_module_module_1.GeographyModule,
            template_module_1.TemplateModule,
            paywall_module_1.PaywallModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.ResourceGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.RoleGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map