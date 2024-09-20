import { Body, Controller, Post } from '@nestjs/common';
import { PaywallService } from './paywall.service';
import { Public } from 'nest-keycloak-connect';

@Controller('paywall')
export class PaywallController {
  constructor(private readonly paywallService: PaywallService) {}

  @Public(true)
  @Post('login')
  async login(@Body() loginData: any) {
    console.log('<< login executed >>');
    return await this.paywallService.Login(loginData);
  }

  @Public(true)
  @Post('points')
  async points(@Body() pointsData: any) {
    // async points() {
    console.log('<< points executed >>');
    return await this.paywallService.RedemptionOfPoints(pointsData);
  }

  @Public(true)
  @Post('planBuy')
  async planBuy(@Body() planBuyData: any) {
    // async planBuy() {
    console.log('<< planBuy executed >>');
    return await this.paywallService.PlanBuy(planBuyData);
  }

  @Public(true)
  @Post('socialMedia')
  async socialMedia(@Body() socialMediaData: any) {
    // async socialMedia() {
    console.log('<< socialMedia executed >>');
    return await this.paywallService.SocialMedia(socialMediaData);
  }

  @Public(true)
  @Post('marketplaceBuy')
  async marketplaceBuy(@Body() marketplaceBuyData: any) {
    // async marketplaceBuy() {
    console.log('<< marketplaceBuy executed >>', marketplaceBuyData);
    return await this.paywallService.MarketplaceBuy(marketplaceBuyData);
  }

  @Public(true)
  @Post('gamificationLevel')
  async gamificationLevel(@Body() gamificationLevelData: any) {
    // async gamificationLevel() {
    console.log('<< gamificationLevel executed >>');
    return await this.paywallService.GamificationLevel(gamificationLevelData);
  }
}
