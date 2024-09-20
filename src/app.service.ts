import { Injectable } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello SoftGic! Backend Client V2 - ' + new Date();
  }
}
