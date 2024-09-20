import { PaymentGateway } from '../../payment/entity/payment.entity.entity';
export declare class PaymentTransaction {
    id: number;
    gateway: PaymentGateway;
    amount: number;
    userName: string;
    status: boolean;
    createdAt: Date;
}
