import { Module } from '@nestjs/common';
import { AuthFacebookService } from './auth-facebook.service';
import { AuthFacebookController } from './auth-facebook.controller';
// import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  controllers: [AuthFacebookController],
  // providers: [AuthFacebookService, FacebookStrategy],
  providers: [AuthFacebookService],
})
export class AuthFacebookModule {}
