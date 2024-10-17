import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { AppConfigModule } from './config.module';

import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';
import { RegisterlogModule } from './registerlog/registerlog.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConfigService } from './auth-kc/keycloak-config.service';
import { KeycloakModuleAuth } from './auth-kc/auth-kc.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { GamificationModule } from './gamification/gamification.module';
import { GeographyModule } from './geography-module/geography-module.module';
import { TemplateModule } from './template/template.module';
import { PaywallModule } from './paywall/paywall.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true, // Indica que el archivo .env es global
    }),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakModuleAuth],
    }),
    // AppConfigModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    ProfileModule,
    MailModule,
    PaymentModule,
    RegisterlogModule,
    KeycloakModuleAuth,
    KeycloakModule,
    GamificationModule,
    GeographyModule,
    TemplateModule,
    PaywallModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
