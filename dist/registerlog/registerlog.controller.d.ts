import { RegisterlogService } from './registerlog.service';
export declare class RegisterlogController {
    private readonly registerlogService;
    constructor(registerlogService: RegisterlogService);
    createRegisterlog(registerlogDto: any): Promise<import("./entity/register-log.entity").RegisterLog>;
    createPaymentTransactions(paymentTransactionDto: any): Promise<void>;
    createPaymentTransaction(paymentTransactionDto: any): Promise<void>;
    findAll(): Promise<import("./entity/register-log.entity").RegisterLog[]>;
    findAllPaymentTransaction(paymentTransactionDto: any): Promise<void>;
}
