import { Module } from '@nestjs/common';
import { KeycloakController } from './keycloak.controller';
import { KeycloakService } from './keycloak.service';
import { HttpModule } from '@nestjs/axios';
import { RegisterlogModule } from 'src/registerlog/registerlog.module';

@Module({
  imports: [HttpModule, RegisterlogModule],
  controllers: [KeycloakController],
  providers: [KeycloakService],
})
export class KeycloakModule {}
