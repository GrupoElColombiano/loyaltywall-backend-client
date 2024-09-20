import { PaywallService } from './paywall.service';
export declare class PaywallController {
    private readonly paywallService;
    constructor(paywallService: PaywallService);
    login(loginData: any): Promise<any>;
    points(pointsData: any): Promise<any>;
    planBuy(planBuyData: any): Promise<any>;
    socialMedia(socialMediaData: any): Promise<any>;
    marketplaceBuy(marketplaceBuyData: any): Promise<any>;
    gamificationLevel(gamificationLevelData: any): Promise<any>;
}
