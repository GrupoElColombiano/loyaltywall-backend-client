import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { PaywallService } from './paywall.service';
import { Public } from 'nest-keycloak-connect';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/common/entity/site.entity';
import { EventsPointsSite } from 'src/common/entity/events-points-site.entity';
import { PointsEvents } from 'src/common/entity/points-events.entity';
import { Repository } from 'typeorm';

@Controller('paywall')
export class PaywallController {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    @InjectRepository(EventsPointsSite)
    private readonly eventsPointsSiteRepository: Repository<EventsPointsSite>,
    @InjectRepository(PointsEvents)
    private readonly pointsEventsRepository: Repository<PointsEvents>,
    private readonly paywallService: PaywallService

  ) {}

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

  @Public(true)
  @Post('points_event')
  async pointsEvent(@Body() pointsEventData: any) {
    /*
      TODO
    */
   
    const siteInfo = await this.siteRepository.findOneBy({ name: pointsEventData?.nameSite });
  

    const pointsInfo = await this.eventsPointsSiteRepository
    .createQueryBuilder('eventsPointsSite')
    .leftJoinAndSelect('eventsPointsSite.pointsEvents', 'pointsEvents')
    .where('eventsPointsSite.siteIdSite = :siteIdSite', { siteIdSite: siteInfo?.idSite })
    .andWhere('eventsPointsSite.eventIdEvent = :eventIdEvent', { eventIdEvent: pointsEventData?.eventoId })
    .getOne();
    console.log("🧠🧠🧠 ~ pointsEvent ~ pointsInfo:", pointsInfo)
   


    if (!pointsInfo && !pointsInfo?.id) {
      return { message: 'No points found' };
    }

    const pointEventDataToCreate = {
        eventIdEvent: pointsEventData?.eventoId,
        siteIdSite: siteInfo?.idSite,
        points: pointsInfo?.points,
        registration_date: pointsInfo?.registration_date,
        expiration_date: pointsInfo?.expiration_date,
        userId: pointsEventData?.userId,
    }

    try {
      const responsePointEvents = this.pointsEventsRepository.create(pointEventDataToCreate);
      const pointEventsQueryResult = await this.pointsEventsRepository.save(responsePointEvents);
      console.log("🚀🚀🚀🚀 ~ pointsEvent ~ pointEventsQueryResult:", pointEventsQueryResult)
      
      return pointEventsQueryResult;
    } catch (error) {
      console.log('error🔴🔴🔴🔴🔴🔴🔴', error);
    }
  }
}
