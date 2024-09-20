"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_entity_1 = require("./entity/payment.entity.entity");
const payment_transactions_entity_1 = require("./entity/payment-transactions.entity");
const axios_1 = require("@nestjs/axios");
const subscriptionsentity_entity_1 = require("./entity/subscriptionsentity.entity");
const plans_entity_1 = require("../common/entity/plans.entity");
const plansproductcategory_entity_1 = require("../common/entity/plansproductcategory.entity");
const user_details_payment_entity_1 = require("./entity/user-details-payment.entity");
const marketplace_products_entity_1 = require("./entity/marketplace_products.entity");
const user_plan_entity_1 = require("../common/entity/user_plan.entity");
let PaymentModule = exports.PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([payment_entity_entity_1.PaymentGateway, payment_transactions_entity_1.PaymentTransaction, subscriptionsentity_entity_1.Subscription, plans_entity_1.Plan, plansproductcategory_entity_1.PlansProductCategory, user_details_payment_entity_1.UserDetailsPayment, marketplace_products_entity_1.MarketplaceProduct, user_plan_entity_1.UserPlan]), axios_1.HttpModule],
        providers: [payment_service_1.PaymentService],
        controllers: [payment_controller_1.PaymentController],
        exports: [payment_service_1.PaymentService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map