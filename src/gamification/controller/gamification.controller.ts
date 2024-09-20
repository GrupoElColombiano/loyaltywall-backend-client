import { Controller, Get, Param } from '@nestjs/common';
import { GamificationService } from '../service/gamification.service';
import { Public, Unprotected } from 'nest-keycloak-connect';

@Controller('gamification')
@Unprotected()
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}
  // SETEO DE VALOR MONETARIO DEL PUNTO Y FECHA EXPIRACION
  // 1- Obiene el valor unitario (en pesos) del punto
  @Get('/point_value/filter-pagination/:idSite/:userId/:page/:limit/:type')
  findPointValueBySite(
    @Param('idSite') idSite: number,
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Param('type') type: number,
  ) {
    return this.gamificationService.findPointValueBySite(
      idSite,
      userId,
      page,
      limit,
      type,
    );
  }

  @Get('/point_tobe_addressed/:userId')
  ListPointsToBeAddressed(@Param('userId') userId: string) {
    return this.gamificationService.ListPointsToBeAddressed(userId);
  }

  // @Get('/total_point/:userId')
  // GetTotalPoints(@Param('userId') userId: string) {
  //   return this.gamificationService.GetTotalPoints(userId);
  // }

  @Public(true)
  @Get('/advance_cluster/:idSite/:idKeycloak')
  getAdvanceCluster(
    @Param('idSite') idSite: number,
    @Param('idKeycloak') idKeycloak: string,
  ) {
    return this.gamificationService.getAdvanceCluster(idSite, idKeycloak);
  }

  @Public(true)
  @Get('/total_point/:userId')
  getTotalPoints(@Param('userId') userId: string) {
    console.log('userId', userId);
    return this.gamificationService.getTotalPoints(userId);
  }

  @Get('/plan/:idKeycloak')
  getPlan(@Param('idKeycloak') idKeycloak: string) {
    console.log('idKeycloak', idKeycloak);
    return this.gamificationService.getPlan(idKeycloak);
  }
}
