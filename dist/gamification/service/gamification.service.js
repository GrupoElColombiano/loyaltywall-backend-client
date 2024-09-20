"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../../common/entity/event.entity");
const site_entity_1 = require("../../common/entity/site.entity");
const points_events_entity_1 = require("../../common/entity/points-events.entity");
const typeorm_2 = require("typeorm");
const events_points_site_entity_1 = require("../../common/entity/events-points-site.entity");
const payment_transactions_entity_1 = require("../../common/entity/payment-transactions.entity");
const user_points_entity_1 = require("../../common/entity/user-points.entity");
const event_cluster_entity_1 = require("../../common/entity/event_cluster.entity");
const user_plan_entity_1 = require("../../common/entity/user_plan.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const paywall_schema_1 = require("../entities/paywall.schema");
const plan_schema_1 = require("../entities/plan.schema");
const payment_service_1 = require("../../payment/payment.service");
let GamificationService = exports.GamificationService = class GamificationService {
    constructor(siteRpo, eventsRpo, pointsValueRepo, eventsPointsSite, paymentTransactions, userPoints, userPlan, eventClusterRepository, entityManager, paywallModel, planModel, paymentService) {
        this.siteRpo = siteRpo;
        this.eventsRpo = eventsRpo;
        this.pointsValueRepo = pointsValueRepo;
        this.eventsPointsSite = eventsPointsSite;
        this.paymentTransactions = paymentTransactions;
        this.userPoints = userPoints;
        this.userPlan = userPlan;
        this.eventClusterRepository = eventClusterRepository;
        this.entityManager = entityManager;
        this.paywallModel = paywallModel;
        this.planModel = planModel;
        this.paymentService = paymentService;
    }
    create(createGamificationDto) {
        return 'This action adds a new gamification';
    }
    findPointValueBySite(idSite, userId, page, pageSize, type) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🚀 ~ GamificationService ~ userId:', userId);
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
                result = yield this.entityManager.query(combinedQuery, [
                    userId,
                    offset,
                    pageSize,
                ]);
                console.log('🔥 == result == 🔥', JSON.stringify(result));
            }
            else if (type == 1) {
                queryBuilder = this.entityManager
                    .createQueryBuilder()
                    .select([
                    'a.points as points',
                    'b.name as event',
                    `TO_CHAR(a.registration_date, 'DD/MM/YYYY') as registration_date`,
                    '1 as dataType',
                ])
                    .from(points_events_entity_1.PointsEvents, 'a')
                    .innerJoin(event_entity_1.Event, 'b', 'b.id_event = a."eventIdEvent"')
                    .innerJoin(events_points_site_entity_1.EventsPointsSite, 'c', 'c.eventIdEvent = a."eventIdEvent"')
                    .innerJoin(site_entity_1.Site, 'd', 'd.idSite = a."siteIdSite"')
                    .where('a.userId = :userId', { userId })
                    .offset(offset)
                    .limit(pageSize);
                result = yield queryBuilder.getRawMany();
            }
            else {
                queryBuilder = this.entityManager
                    .createQueryBuilder()
                    .select([
                    'a.points as points',
                    'a.product as event',
                    `TO_CHAR(a."system_date", 'DD/MM/YYYY') as registration_date`,
                    '0 as "dataType"',
                ])
                    .from(user_points_entity_1.UserPoints, 'a')
                    .where('a.idkeycloak = :userId', { userId });
                result = yield queryBuilder.getRawMany();
            }
            console.log('🚀 ~ GamificationService ~ result: 139', result);
            return result;
        });
    }
    ListPointsToBeAddressed(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.entityManager
                .createQueryBuilder()
                .select([
                'a.points as points',
                'b.name as event',
                `TO_CHAR(a.registration_date, 'DD/MM/YYYY') as registration_date`,
            ])
                .from(points_events_entity_1.PointsEvents, 'a')
                .innerJoin(event_entity_1.Event, 'b', 'b.id_event = a."eventIdEvent"')
                .innerJoin(events_points_site_entity_1.EventsPointsSite, 'c', 'c.eventIdEvent = a."eventIdEvent"')
                .innerJoin(site_entity_1.Site, 'd', 'd.idSite = a."siteIdSite"')
                .where('a.userId = :userId', { userId })
                .groupBy('a.points, b.name, a.registration_date')
                .andHaving(`EXTRACT(DAY FROM  CURRENT_DATE -(a.registration_date::date + (
          SELECT expire_time
          FROM expire_time_point
          WHERE create_at = (SELECT MAX(create_at) FROM expire_time_point)
      ) * INTERVAL '1 day')
        ) >= 2`);
            const result = yield queryBuilder.getRawMany();
            return result;
        });
    }
    agruparEventosPorNombre(eventos) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = [];
            const eventosAgrupados = {};
            eventos.forEach((evento) => {
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
            for (const [id_event, data] of Object.entries(eventosAgrupados)) {
                const dataInte = data;
                resultado.push({
                    id_event: parseInt(id_event),
                    cluster: dataInte.cluster,
                    name: dataInte.name,
                    count: dataInte.count,
                    events: dataInte.events,
                });
            }
            return resultado;
        });
    }
    getAdvanceCluster(idSite, idKeycloak) {
        return __awaiter(this, void 0, void 0, function* () {
            let clusterLevel;
            let userEvents = [];
            let clusterAdvance = 0;
            let eventosAgrupadosCluster1 = [];
            let eventosAgrupadosCluster2 = [];
            const clusters = yield this.eventClusterRepository
                .createQueryBuilder('event_cluster')
                .leftJoinAndSelect('event_cluster.clusters', 'clusters')
                .leftJoinAndSelect('event_cluster.events', 'events')
                .leftJoinAndSelect('event_cluster.site', 'site')
                .where('site.idSite = :idSite', { idSite: idSite })
                .getMany();
            console.log('clusters', clusters, 'idSite', idSite, 'idKeycloak', idKeycloak);
            const userPoints = yield this.pointsValueRepo
                .createQueryBuilder('points_events')
                .leftJoinAndSelect('points_events.event', 'event')
                .where('points_events.userId = :idKeycloak', { idKeycloak: idKeycloak })
                .getMany();
            console.log('Eventos del usuario', userPoints);
            clusters.forEach((cluster) => {
                const clusterPoint = cluster.clusters;
                if (clusterPoint.name === 'Cluster 1') {
                    userPoints.forEach((userPoint) => {
                        const clusterName = cluster.events;
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
            eventosAgrupadosCluster1 = yield this.agruparEventosPorNombre(userEvents);
            clusters.forEach((cluster) => {
                const clusterPoint = cluster.clusters;
                const clusterEvent = cluster.events;
                if (clusterPoint.name === 'Cluster 1') {
                    let cuent = 0;
                    eventosAgrupadosCluster1.forEach((eventoAgrupado) => {
                        if (clusterEvent.name === eventoAgrupado.name) {
                            cuent++;
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
            if (clusterAdvance >= 100) {
                userEvents = [];
                clusterAdvance = 0;
                clusters.forEach((cluster) => {
                    const clusterPoint = cluster.clusters;
                    if (clusterPoint.name === 'Cluster 2') {
                        userPoints.forEach((userPoint) => {
                            const clusterName = cluster.events;
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
                eventosAgrupadosCluster2 = yield this.agruparEventosPorNombre(userEvents);
                console.log('eventosAgrupadosCluster2', eventosAgrupadosCluster2);
                clusters.forEach((cluster) => {
                    const clusterPoint = cluster.clusters;
                    const clusterEvent = cluster.events;
                    if (clusterPoint.name === 'Cluster 2') {
                        let cuent = 0;
                        eventosAgrupadosCluster2.forEach((eventoAgrupado) => {
                            console.log('########################################CLUSTER 2#####################################');
                            console.log('cluster2', clusterEvent.name);
                            console.log('eventoAgrupado', eventoAgrupado.name);
                            console.log('Verdader o falso', clusterEvent.name === eventoAgrupado.name);
                            if (clusterEvent.name === eventoAgrupado.name) {
                                console.log('CLUSTER', cluster.event_repeats);
                                console.log('numero event_repeats', eventoAgrupado.count);
                                console.log(' eventoAgrupado >= cluster', eventoAgrupado.count >= cluster.event_repeats);
                                cuent++;
                                console.log('numero de veces', cuent);
                                console.log('porcentual_value', cluster.porcentual_value);
                                console.log('<======================================================>');
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
            if (clusterAdvance >= 100) {
                userEvents = [];
                clusterAdvance = 0;
                clusters.forEach((cluster) => {
                    const clusterPoint = cluster.clusters;
                    if (clusterPoint.name === 'Cluster 3') {
                        userPoints.forEach((userPoint) => {
                            const clusterName = cluster.events;
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
                eventosAgrupadosCluster2 = yield this.agruparEventosPorNombre(userEvents);
                clusters.forEach((cluster) => {
                    const clusterPoint = cluster.clusters;
                    const clusterEvent = cluster.events;
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
        });
    }
    getTotalPoints(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = yield this.pointsValueRepo
                .createQueryBuilder('points_events')
                .where('points_events.userId = :idKeycloak', { idKeycloak: userId })
                .select('SUM(points_events.points)', 'total_points');
            const total_puntos = yield queryBuilder.getRawOne();
            console.log('total_puntos', total_puntos);
            const queryBuilderPointsConsumed = yield this.paymentTransactions
                .createQueryBuilder('payment_transaction')
                .where('payment_transaction.userId = :idKeycloak', {
                idKeycloak: userId,
            })
                .select('SUM(payment_transaction.amount)', 'total_points_consumed')
                .getRawOne();
            console.log('queryBuilderPointsConsumed', queryBuilderPointsConsumed);
            const result = total_puntos.total_points -
                queryBuilderPointsConsumed.total_points_consumed;
            return {
                result,
            };
        });
    }
    getPlan(idKeycloak) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('idKeycloak', idKeycloak);
            let id_plan = 0;
            let id_site = 0;
            const plansProductCategory = [];
            const idPlansProductCategorys = [];
            const idProducts = [];
            const idCategorys = [];
            const plan_suscrito = yield this.paymentService.getPlanByUserId(idKeycloak);
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
                const queryResults = yield connection.query(rawQuery, [idKeycloak]);
                console.log('queryResults', queryResults);
                let plan = null;
                if (queryResults.length > 0) {
                    plan = Object.assign({}, queryResults[0]);
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
                    const plansProductCategoryIf = yield this.entityManager.query(rawQueryPlans, [id_plan, id_site]);
                    plansProductCategory.push(plansProductCategoryIf);
                }
                if (plansProductCategory.length > 0) {
                    plansProductCategory[0].forEach((element) => {
                        idProducts.push(element.idProduct);
                        idPlansProductCategorys.push(element.idPlansProductCategory);
                    });
                }
                const products = yield this.entityManager.query(`
            SELECT * FROM "product" WHERE "idProduct" = ANY($1);
          `, [idProducts]);
                const categorys_access = yield this.entityManager.query(`
            SELECT * FROM "categorys_access" WHERE "idPlansProductCategory" = ANY($1);
          `, [idPlansProductCategorys]);
                if (categorys_access.length > 0) {
                    categorys_access.forEach((element) => {
                        idCategorys.push(element.idCategory);
                    });
                }
                const categorys = yield this.entityManager.query(`
            SELECT * FROM "categories" WHERE "idCategory" = ANY($1);
        `, [idCategorys]);
                if (products.length > 0 && categorys.length > 0) {
                    products.forEach((product) => {
                        categorys.forEach((category) => {
                            if (product.idProduct === category.idProduct) {
                                product.category = category.name;
                            }
                        });
                    });
                }
                plan.products = [];
                products.forEach((product) => {
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
            }
            catch (error) {
                console.log('error', error);
                throw new Error('Error al obtener el plan');
            }
        });
    }
};
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_entity_1.Site)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(2, (0, typeorm_1.InjectRepository)(points_events_entity_1.PointsEvents)),
    __param(3, (0, typeorm_1.InjectRepository)(events_points_site_entity_1.EventsPointsSite)),
    __param(4, (0, typeorm_1.InjectRepository)(payment_transactions_entity_1.PaymentTransactions)),
    __param(5, (0, typeorm_1.InjectRepository)(user_points_entity_1.UserPoints)),
    __param(6, (0, typeorm_1.InjectRepository)(user_plan_entity_1.UserPlan)),
    __param(7, (0, typeorm_1.InjectRepository)(event_cluster_entity_1.EventCluster)),
    __param(9, (0, mongoose_1.InjectModel)(paywall_schema_1.Paywall.name)),
    __param(10, (0, mongoose_1.InjectModel)(plan_schema_1.Plan.name)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager,
        mongoose_2.Model,
        mongoose_2.Model,
        payment_service_1.PaymentService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map