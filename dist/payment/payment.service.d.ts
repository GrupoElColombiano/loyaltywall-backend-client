import { Subscription } from './entity/subscriptionsentity.entity';
import { Repository } from 'typeorm';
import { Plan } from 'src/common/entity/plans.entity';
import { UserDetailsPayment } from './entity/user-details-payment.entity';
import { MarketplaceProduct } from './entity/marketplace_products.entity';
import { PaymentGateway } from './entity/payment.entity.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';
export declare class PaymentService {
    private readonly subscriptionRepository;
    private readonly planRepository;
    private readonly userDetailsPaymentRepository;
    private readonly marketplaceProductRepository;
    private readonly paymentGatewayRepository;
    private readonly userPlanRepository;
    private readonly apiUrlLocations;
    private paymentGateways;
    private payPalClient;
    private login;
    private tranKey;
    paypalWebhookEvents: {
        event: string;
        id: number;
    }[];
    constructor(subscriptionRepository: Repository<Subscription>, planRepository: Repository<Plan>, userDetailsPaymentRepository: Repository<UserDetailsPayment>, marketplaceProductRepository: Repository<MarketplaceProduct>, paymentGatewayRepository: Repository<PaymentGateway>, userPlanRepository: Repository<UserPlan>);
    configurePaypalClient({ clientId, clientSecret }: {
        clientId: any;
        clientSecret: any;
    }): void;
    getPaymentGatewateToSite({ idSite, paymentGatewayName }: {
        idSite: any;
        paymentGatewayName: any;
    }): Promise<PaymentGateway>;
    private generateAuth;
    createOrderEvertec(orderData: any): Promise<any>;
    checkTransactionStatus({ requestId, idSite }: {
        requestId: any;
        idSite: any;
    }): Promise<any>;
    handleNotification(notificationData: any): Promise<{
        status: string;
        message: string;
    }>;
    generateReferenceId(): Promise<string>;
    createOrderPaypal(orderData: any): Promise<any>;
    webhook(body: any): Promise<{
        message: string;
    }>;
    setCancellationStatus(orderId: string, status: number): Promise<void>;
    captureOrder(body: any): Promise<any>;
    getOrder(orderId: string): Promise<any>;
    getSubscriptionHistory(id_user: string, name?: string): Promise<any[]>;
    getMarketplaceProductsHistory(id_site: number): Promise<any>;
    getAllDepartments(): Promise<any>;
    getCitiesByDepartmentId(id: number): Promise<any>;
    getPlanByUserId(userId: string): Promise<{
        id_plan: number;
        id_version: string;
    }>;
}
