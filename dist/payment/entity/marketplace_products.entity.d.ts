import { Subscription } from './subscriptionsentity.entity';
export declare class MarketplaceProduct {
    id: number;
    subscription: Subscription;
    id_transaction: string;
    id_product: number;
    name_product: string;
    price: number;
    quantity: number;
    points: number;
    is_paid_with_points: boolean;
    description: string;
    image: string;
}
