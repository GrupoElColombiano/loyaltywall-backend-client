import { UserDetailsPayment } from './user-details-payment.entity';
import { MarketplaceProduct } from './marketplace_products.entity';
import { PaymentGateway } from './payment.entity.entity';
export declare class Subscription {
    id_subscription: number;
    id_plan: number;
    id_rate: number;
    transacction: string;
    sysdate: Date;
    id_version: string;
    id_user: string;
    cancellation_status: number;
    transaction_type: string;
    amount: string;
    paymentGateway: PaymentGateway;
    payment_gateway_id: number;
    userDetailsPayment: UserDetailsPayment;
    user_details_payment_id: number;
    id_transaction: string;
    id_order: string;
    id_site: number;
    marketplaceProducts: MarketplaceProduct[];
}
