import { Module } from '@nestjs/common';
import { AuthKcService } from './auth-kc.service';
import { AuthKcController } from './auth-kc.controller';
import { KeycloakConfigService } from './keycloak-config.service';

@Module({
  imports: [],
  controllers: [AuthKcController],
  providers: [AuthKcService, KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class AuthKcModule {}
