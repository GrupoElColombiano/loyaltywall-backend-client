import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createOrder(createOrderDto: any): Promise<any>;
    checkTransactionStatus(requestId: string, idSite: string): Promise<any>;
    handleNotification(notificationData: any): Promise<{
        status: string;
        message: string;
    }>;
    createOrderPaypal(orderData: any): Promise<any>;
    webhook(body: any): Promise<{
        message: string;
    }>;
    captureOrder(body: any): Promise<any>;
    getOrder(id: string): Promise<any>;
    getSubscriptions(userId: string, name: string): Promise<any[]>;
    getSubscriptionsBySite(idSite: number): Promise<any>;
    getAllDepartments(): Promise<any>;
    getCitiesByDepartmentId(id: number): Promise<any>;
}
