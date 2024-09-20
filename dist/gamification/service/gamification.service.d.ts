import { Event } from 'src/common/entity/event.entity';
import { Site } from 'src/common/entity/site.entity';
import { PointsEvents } from 'src/common/entity/points-events.entity';
import { EntityManager, Repository } from 'typeorm';
import { EventsPointsSite } from 'src/common/entity/events-points-site.entity';
import { PaymentTransactions } from 'src/common/entity/payment-transactions.entity';
import { UserPoints } from 'src/common/entity/user-points.entity';
import { EventCluster } from 'src/common/entity/event_cluster.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';
import { Model } from 'mongoose';
import { PaywallDocument } from '../entities/paywall.schema';
import { PlanDocument } from '../entities/plan.schema';
import { PaymentService } from 'src/payment/payment.service';
export declare class GamificationService {
    private readonly siteRpo;
    private readonly eventsRpo;
    private readonly pointsValueRepo;
    private readonly eventsPointsSite;
    private readonly paymentTransactions;
    private readonly userPoints;
    private readonly userPlan;
    private readonly eventClusterRepository;
    private entityManager;
    private paywallModel;
    private planModel;
    private readonly paymentService;
    constructor(siteRpo: Repository<Site>, eventsRpo: Repository<Event>, pointsValueRepo: Repository<PointsEvents>, eventsPointsSite: Repository<EventsPointsSite>, paymentTransactions: Repository<PaymentTransactions>, userPoints: Repository<UserPoints>, userPlan: Repository<UserPlan>, eventClusterRepository: Repository<EventCluster>, entityManager: EntityManager, paywallModel: Model<PaywallDocument>, planModel: Model<PlanDocument>, paymentService: PaymentService);
    create(createGamificationDto: any): string;
    findPointValueBySite(idSite: any, userId: any, page: number, pageSize: number, type: number): Promise<any>;
    ListPointsToBeAddressed(userId: any): Promise<any[]>;
    agruparEventosPorNombre(eventos: any): Promise<any[]>;
    getAdvanceCluster(idSite: any, idKeycloak: any): Promise<any>;
    getTotalPoints(userId: any): Promise<{
        result: number;
    }>;
    getPlan(idKeycloak: string): Promise<{
        message: string;
        plan: any;
    }>;
}
