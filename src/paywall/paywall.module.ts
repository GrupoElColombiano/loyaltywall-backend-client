import { Module } from '@nestjs/common';
import { PaywallController } from './paywall.controller';
import { PaywallService } from './paywall.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PaywallController],
  providers: [PaywallService],
})
export class PaywallModule {}
