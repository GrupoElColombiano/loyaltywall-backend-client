import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/common/entity/event.entity';
import { Site } from 'src/common/entity/site.entity';

import { PointsEvents } from 'src/common/entity/points-events.entity';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { EventsPointsSite } from 'src/common/entity/events-points-site.entity';
import { PaymentTransactions } from 'src/common/entity/payment-transactions.entity';
import { UserPoints } from 'src/common/entity/user-points.entity';
import { EventCluster } from 'src/common/entity/event_cluster.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PaywallDocument } from './entities/paywall.model';
import { Paywall, PaywallDocument } from '../entities/paywall.schema';
import { Plan, PlanDocument } from '../entities/plan.schema';
import { PlansProductCategory } from 'src/common/entity/plansproductcategory.entity';
import { PaymentService } from 'src/payment/payment.service';
// import

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRpo: Repository<Site>,
    @InjectRepository(Event)
    private readonly eventsRpo: Repository<Event>,
    @InjectRepository(PointsEvents)
    private readonly pointsValueRepo: Repository<PointsEvents>,
    @InjectRepository(EventsPointsSite)
    private readonly eventsPointsSite: Repository<EventsPointsSite>,

    @InjectRepository(PaymentTransactions)
    private readonly paymentTransactions: Repository<PaymentTransactions>,

    @InjectRepository(UserPoints)
    private readonly userPoints: Repository<UserPoints>,

    @InjectRepository(UserPlan)
    private readonly userPlan: Repository<UserPlan>,

    @InjectRepository(EventCluster)
    private readonly eventClusterRepository: Repository<EventCluster>,

    // @InjectRepository(PlansProductCategory)
    // private readonly plansProductCategory: Repository<PlansProductCategory>,

    private entityManager: EntityManager,
    @InjectModel(Paywall.name) private paywallModel: Model<PaywallDocument>,
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,

    //Inyectar PaymentService
    private readonly paymentService: PaymentService,
  ) {}

  create(createGamificationDto: any) {
    return 'This action adds a new gamification';
  }

  // SETEO DE VALOR MONETARIO DEL PUNTO Y FECHA EXPIRACION

  // 1- Obiene el valor unitario (en pesos) del punto
  async findPointValueBySite(
    idSite: any,
    userId: any,
    page: number,
    pageSize: number,
    type: number,
  ) {
    console.log('🚀 ~ GamificationService ~ userId:', userId);

    // const pointValue = await this.pointsValueRepo.find();
    const offset = (page - 1) * pageSize;
    let queryBuilder;
    let result;

    if (type == 0) {
      const pointsEventsQuery = `
        SELECT a.points, b.name as event, TO_CHAR(a.registration_date, 'DD/MM/YYYY') as registration_date, 1 as "dataType"
        FROM points_events a
        INNER JOIN event b ON b.id_event = a."eventIdEvent"
        INNER JOIN events_points_site c ON c."eventIdEvent" = a."eventIdEvent"
        INNER JOIN site d ON d."idSite" = a."siteIdSite"
        WHERE a."userId" = $1
      `;

      const paymentTransactionsQuery = `
        SELECT a.points as points, a.product as event, TO_CHAR(a."system_date", 'DD/MM/YYYY') as registration_date, 0 as "dataType"
        FROM user_points a
        WHERE a."idkeycloak" = $1
      `;

      const combinedQuery = `
        (${pointsEventsQuery})
        UNION ALL
        (${paymentTransactionsQuery})
        ORDER BY registration_date DESC
        OFFSET $2
        LIMIT $3
      `;

      result = await this.entityManager.query(combinedQuery, [
        userId,
        offset,
        pageSize,
      ]);


      console.log('🔥 == result == 🔥', JSON.stringify(result));

      return result;

     
    } else if (type == 1) {
      queryBuilder = this.entityManager
        .createQueryBuilder()
        .select([
          'a.points as points',
          'b.name as event',
          `TO_CHAR(a.registration_date, 'DD/MM/YYYY') as registration_date`,
          '1 as dataType',
        ])
        .from(PointsEvents, 'a')
        .innerJoin(Event, 'b', 'b.id_event = a."eventIdEvent"')
        .innerJoin(EventsPointsSite, 'c', 'c.eventIdEvent = a."eventIdEvent"')
        .innerJoin(Site, 'd', 'd.idSite = a."siteIdSite"')
        .where('a.userId = :userId', { userId }) // Agrega la condición userId aquí
        .offset(offset)
        .limit(pageSize);

      result = await queryBuilder.getRawMany();
    } else {
      queryBuilder = this.entityManager
        .createQueryBuilder()
        .select([
          'a.points as points',
          'a.product as event',
          `TO_CHAR(a."system_date", 'DD/MM/YYYY') as registration_date`,
          '0 as "dataType"',
        ])
        .from(UserPoints, 'a')
        .where('a.idkeycloak = :userId', { userId });
      result = await queryBuilder.getRawMany();
    }
    console.log('🚀 ~ GamificationService ~ result: 139', result);
    return result;
  }

  async ListPointsToBeAddressed(userId: any) {
    const queryBuilder = this.entityManager
      .createQueryBuilder()
      .select([
        'a.points as points',
        'b.name as event',
        `TO_CHAR(a.registration_date, 'DD/MM/YYYY') as registration_date`,
      ])
      .from(PointsEvents, 'a')
      .innerJoin(Event, 'b', 'b.id_event = a."eventIdEvent"')
      .innerJoin(EventsPointsSite, 'c', 'c.eventIdEvent = a."eventIdEvent"')
      .innerJoin(Site, 'd', 'd.idSite = a."siteIdSite"')
      .where('a.userId = :userId', { userId })
      .groupBy('a.points, b.name, a.registration_date')
      .andHaving(
        `EXTRACT(DAY FROM  CURRENT_DATE -(a.registration_date::date + (
          SELECT expire_time
          FROM expire_time_point
          WHERE create_at = (SELECT MAX(create_at) FROM expire_time_point)
      ) * INTERVAL '1 day')
        ) >= 2`,
      );
    const result = await queryBuilder.getRawMany();
    return result;
  }

  // async GetTotalPoints(userId: any) {
  //   const queryBuilder = this.entityManager
  //     .createQueryBuilder()
  //     .select(['SUM(a.points) as points'])
  //     .from(PointsEvents, 'a')
  //     .where('a.userId = :userId', { userId });
  //   const result = await queryBuilder.getRawMany();
  //   return result;
  // }

  async agruparEventosPorNombre(eventos: any) {
    const resultado = [];
    const eventosAgrupados = {};

    // Agrupamos los eventos por su id_event
    eventos.forEach((evento: any) => {
      if (!eventosAgrupados[evento.id_event]) {
        eventosAgrupados[evento.id_event] = {
          cluster: evento.cluster,
          name: evento.name,
          count: 0,
          events: [],
        };
      }
      eventosAgrupados[evento.id_event].count++;
      eventosAgrupados[evento.id_event].events.push(evento);
    });

    // Convertimos el objeto agrupado en un array para el resultado final
    for (const [id_event, data] of Object.entries(eventosAgrupados)) {
      const dataInte: any = data;
      resultado.push({
        id_event: parseInt(id_event),
        cluster: dataInte.cluster,
        name: dataInte.name,
        count: dataInte.count,
        events: dataInte.events,
      });
    }

    return resultado;
  }

  async getAdvanceCluster(idSite: any, idKeycloak: any): Promise<any> {
    let clusterLevel: any;
    let userEvents = [];
    let clusterAdvance = 0;
    let eventosAgrupadosCluster1 = [];
    let eventosAgrupadosCluster2 = [];
    //traer todos los clusters_events de un sitio
    const clusters = await this.eventClusterRepository
      .createQueryBuilder('event_cluster')
      .leftJoinAndSelect('event_cluster.clusters', 'clusters')
      .leftJoinAndSelect('event_cluster.events', 'events')
      .leftJoinAndSelect('event_cluster.site', 'site')
      .where('site.idSite = :idSite', { idSite: idSite })
      .getMany();
    console.log(
      'clusters',
      clusters,
      'idSite',
      idSite,
      'idKeycloak',
      idKeycloak,
    );

    //Traer todos los eventos de un usuario
    const userPoints = await this.pointsValueRepo
      .createQueryBuilder('points_events')
      .leftJoinAndSelect('points_events.event', 'event')
      .where('points_events.userId = :idKeycloak', { idKeycloak: idKeycloak })
      .getMany();
    console.log('Eventos del usuario', userPoints);

    //Cluster 1
    clusters.forEach((cluster) => {
      const clusterPoint: any = cluster.clusters;
      if (clusterPoint.name === 'Cluster 1') {
        userPoints.forEach((userPoint) => {
          const clusterName: any = cluster.events;
          if (clusterName.name === userPoint.event.name) {
            userEvents.push({
              cluster: clusterPoint.name,
              id_event: userPoint.event.id_event,
              name: userPoint.event.name,
            });
          }
        });
      }
    });
    eventosAgrupadosCluster1 = await this.agruparEventosPorNombre(userEvents);
    clusters.forEach((cluster) => {
      const clusterPoint: any = cluster.clusters;
      const clusterEvent: any = cluster.events;
      if (clusterPoint.name === 'Cluster 1') {
        let cuent = 0;
        eventosAgrupadosCluster1.forEach((eventoAgrupado) => {
          if (clusterEvent.name === eventoAgrupado.name) {
            cuent++;
            // console.log('cluster1', clusterEvent.name);
            // console.log('eventoAgrupado', eventoAgrupado.name);
            // console.log('Verdader o falso', clusterEvent.name === eventoAgrupado.name)
            // console.log('CLUSTER', cluster.event_repeats)
            // console.log('numero event_repeats', eventoAgrupado.count)
            // console.log(' eventoAgrupado >= cluster', eventoAgrupado.count >= cluster.event_repeats)
            // console.log('numero de veces', cuent)
            // console.log('porcentual_value', cluster.porcentual_value)
            // console.log('<======================================================>')
            if (eventoAgrupado.count >= cluster.event_repeats) {
              console.log('######entro al if######');
              clusterAdvance = clusterAdvance + cluster.porcentual_value;
            }
          }
        });
      }
    });
    clusterLevel = 'Cluster 1';
    console.log('clusterAdvance Cluster 1', clusterAdvance);

    //Cluster 2
    if (clusterAdvance >= 100) {
      userEvents = [];
      clusterAdvance = 0;
      clusters.forEach((cluster) => {
        const clusterPoint: any = cluster.clusters;
        if (clusterPoint.name === 'Cluster 2') {
          userPoints.forEach((userPoint) => {
            // console.log('########################################CLUSTER 2#####################################', userPoint);
            const clusterName: any = cluster.events;
            // console.log('cluster2', clusterName.name);
            // console.log('userPoint', userPoint.event.name);
            // console.log('Nombres iguales', clusterName.name === userPoint.event.name)
            if (clusterName.name === userPoint.event.name) {
              userEvents.push({
                cluster: clusterPoint.name,
                id_event: userPoint.event.id_event,
                name: userPoint.event.name,
              });
            }
          });
        }
      });
      eventosAgrupadosCluster2 = await this.agruparEventosPorNombre(userEvents);
      console.log('eventosAgrupadosCluster2', eventosAgrupadosCluster2);
      clusters.forEach((cluster) => {
        const clusterPoint: any = cluster.clusters;
        const clusterEvent: any = cluster.events;
        if (clusterPoint.name === 'Cluster 2') {
          let cuent = 0;
          eventosAgrupadosCluster2.forEach((eventoAgrupado) => {
            console.log(
              '########################################CLUSTER 2#####################################',
            );
            console.log('cluster2', clusterEvent.name);
            console.log('eventoAgrupado', eventoAgrupado.name);
            console.log(
              'Verdader o falso',
              clusterEvent.name === eventoAgrupado.name,
            );
            if (clusterEvent.name === eventoAgrupado.name) {
              console.log('CLUSTER', cluster.event_repeats);
              console.log('numero event_repeats', eventoAgrupado.count);
              console.log(
                ' eventoAgrupado >= cluster',
                eventoAgrupado.count >= cluster.event_repeats,
              );
              cuent++;
              console.log('numero de veces', cuent);
              console.log('porcentual_value', cluster.porcentual_value);
              console.log(
                '<======================================================>',
              );
              if (eventoAgrupado.count >= cluster.event_repeats) {
                console.log('######entro al if######');
                clusterAdvance = clusterAdvance + cluster.porcentual_value;
              }
            }
          });
        }
      });
      clusterLevel = 'Cluster 2';
    }
    console.log('clusterAdvance Cluster 2', clusterAdvance);

    //Cluster 3
    if (clusterAdvance >= 100) {
      userEvents = [];
      clusterAdvance = 0;
      clusters.forEach((cluster) => {
        const clusterPoint: any = cluster.clusters;
        if (clusterPoint.name === 'Cluster 3') {
          userPoints.forEach((userPoint) => {
            const clusterName: any = cluster.events;
            if (clusterName.name === userPoint.event.name) {
              userEvents.push({
                cluster: clusterPoint.name,
                id_event: userPoint.event.id_event,
                name: userPoint.event.name,
              });
            }
          });
        }
      });
      eventosAgrupadosCluster2 = await this.agruparEventosPorNombre(userEvents);
      clusters.forEach((cluster) => {
        const clusterPoint: any = cluster.clusters;
        const clusterEvent: any = cluster.events;
        if (clusterPoint.name === 'Cluster 3') {
          let cuent = 0;
          eventosAgrupadosCluster2.forEach((eventoAgrupado) => {
            if (clusterEvent.name === eventoAgrupado.name) {
              cuent++;
              if (eventoAgrupado.count >= cluster.event_repeats) {
                clusterAdvance = clusterAdvance + cluster.porcentual_value;
              }
            }
          });
        }
      });
      clusterLevel = 'Cluster 3';
    }
    console.log('clusterAdvance Cluster 3', clusterAdvance);

    return {
      clusterLevel,
      clusterAdvance,
    };
  }

  async getTotalPoints(userId: any) {
    // Obtener el total de puntos de un usuario en la tabla points_events
    const queryBuilder = await this.pointsValueRepo
      .createQueryBuilder('points_events')
      .where('points_events.userId = :idKeycloak', { idKeycloak: userId })
      .select('SUM(points_events.points)', 'total_points');
    const total_puntos = await queryBuilder.getRawOne();
    console.log('total_puntos', total_puntos);

    //Traer el total de puntos redimidos o gastados de payment_transaction
    const queryBuilderPointsConsumed = await this.paymentTransactions
      .createQueryBuilder('payment_transaction')
      .where('payment_transaction.userId = :idKeycloak', {
        idKeycloak: userId,
      })
      .select('SUM(payment_transaction.amount)', 'total_points_consumed')
      .getRawOne();
    console.log('queryBuilderPointsConsumed', queryBuilderPointsConsumed);

    //De los puntos totales restar los puntos consumidos
    const result =
      total_puntos.total_points -
      queryBuilderPointsConsumed.total_points_consumed;

    return {
      result,
    };
  }

  async getPlan(idKeycloak: string) {
    console.log('idKeycloak', idKeycloak);
    let id_plan = 0;
    let id_site = 0;
    const plansProductCategory = [];
    const idPlansProductCategorys = [];
    const idProducts = [];
    const idCategorys = [];
    const plan_suscrito = await this.paymentService.getPlanByUserId(idKeycloak);
    console.log('PLAN SUSCRITO', plan_suscrito);

    try {
      const rawQuery = `
            SELECT user_plan.*, plans.*, rates.*
            FROM user_plan
            JOIN plans ON user_plan.id_plan = plans."idPlan"
            LEFT JOIN rates ON plans."idPlan" = rates."idPlan"
            WHERE user_plan.id_user = $1
            AND plans."userType" = 'Suscrito'
            AND user_plan."is_active" = true;
        `;

      const connection = this.userPlan.manager.connection;
      const queryResults = await connection.query(rawQuery, [idKeycloak]);
      console.log('queryResults', queryResults);

      let plan = null;
      if (queryResults.length > 0) {
        plan = { ...queryResults[0] };
        plan.rates = queryResults.map((row) => ({
          time: row.time,
          rate: row.rate,
          rate_special: row.rate_special,
          rate_special_renewal: row.rate_special_renewal,
          rate_renewal: row.rate_renewal,
          duration: row.duration,
          is_special: row.is_special,
          date_start: row.date_start,
          date_end: row.date_end,
        }));
        delete plan.isActive;
        delete plan.id_plan;
      }

      if (plan) {
        id_plan = plan.idPlan;
        id_site = plan.idSite;
      }

      if (id_plan > 0 && id_site > 0) {
        const rawQueryPlans = `
          SELECT ppc.*
          FROM "PlansProductCategory" ppc
          WHERE ppc."idPlan" = $1 AND ppc."idSite" = $2;
          `;

        const plansProductCategoryIf = await this.entityManager.query(
          rawQueryPlans,
          [id_plan, id_site],
        );

        plansProductCategory.push(plansProductCategoryIf);
      }

      if (plansProductCategory.length > 0) {
        plansProductCategory[0].forEach((element: any) => {
          idProducts.push(element.idProduct);
          idPlansProductCategorys.push(element.idPlansProductCategory);
        });
      }

      const products = await this.entityManager.query(
        `
            SELECT * FROM "product" WHERE "idProduct" = ANY($1);
          `,
        [idProducts],
      );

      const categorys_access = await this.entityManager.query(
        `
            SELECT * FROM "categorys_access" WHERE "idPlansProductCategory" = ANY($1);
          `,
        [idPlansProductCategorys],
      );

      if (categorys_access.length > 0) {
        categorys_access.forEach((element: any) => {
          idCategorys.push(element.idCategory);
        });
      }

      const categorys = await this.entityManager.query(
        `
            SELECT * FROM "categories" WHERE "idCategory" = ANY($1);
        `,
        [idCategorys],
      );

      if (products.length > 0 && categorys.length > 0) {
        products.forEach((product: any) => {
          categorys.forEach((category: any) => {
            if (product.idProduct === category.idProduct) {
              product.category = category.name;
            }
          });
        });
      }
      plan.products = [];
      products.forEach((product: any) => {
        const productEdit = {
          name: product.name,
          description: product.description,
          category: product.category,
        };
        plan.products.push(productEdit);
      });

      delete plan.time;
      delete plan.rate;
      delete plan.rate_special;
      delete plan.rate_special_renewal;
      delete plan.rate_renewal;
      delete plan.duration;
      delete plan.is_special;
      delete plan.date_start;
      delete plan.date_end;

      return {
        message: 'Plan obtenido correctamente',
        plan: plan,
      };
    } catch (error) {
      console.log('error', error);
      throw new Error('Error al obtener el plan');
    }
  }
}

/**
 *
 * SELECT ext.points, ext.registration_date FROM points_events as ext
GROUP BY points, registration_date
HAVING

(
    EXTRACT(DAY FROM
        (ext.registration_date::date + (
            SELECT expire_time
            FROM expire_time_point
            WHERE create_at = (SELECT MAX(create_at) FROM expire_time_point WHERE site_id = 1)
        ) * INTERVAL '1 day') - CURRENT_DATE
    )
) = 1;
 */
