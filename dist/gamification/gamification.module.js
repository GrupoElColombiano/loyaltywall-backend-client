"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationModule = void 0;
const common_1 = require("@nestjs/common");
const gamification_service_1 = require("./service/gamification.service");
const gamification_controller_1 = require("./controller/gamification.controller");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../common/entity/event.entity");
const site_entity_1 = require("../common/entity/site.entity");
const points_events_entity_1 = require("../common/entity/points-events.entity");
const events_points_site_entity_1 = require("../common/entity/events-points-site.entity");
const payment_transactions_entity_1 = require("../common/entity/payment-transactions.entity");
const user_points_entity_1 = require("../common/entity/user-points.entity");
const mongoose_1 = require("@nestjs/mongoose");
const paywall_schema_1 = require("./entities/paywall.schema");
const plan_schema_1 = require("./entities/plan.schema");
const event_cluster_entity_1 = require("../common/entity/event_cluster.entity");
const cluster_entity_1 = require("../common/entity/cluster.entity");
const user_plan_entity_1 = require("../common/entity/user_plan.entity");
const payment_module_1 = require("../payment/payment.module");
let GamificationModule = exports.GamificationModule = class GamificationModule {
};
exports.GamificationModule = GamificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                event_entity_1.Event,
                points_events_entity_1.PointsEvents,
                events_points_site_entity_1.EventsPointsSite,
                site_entity_1.Site,
                payment_transactions_entity_1.PaymentTransactions,
                user_points_entity_1.UserPoints,
                event_cluster_entity_1.EventCluster,
                cluster_entity_1.Cluster,
                plan_schema_1.Plan,
                user_plan_entity_1.UserPlan,
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: paywall_schema_1.Paywall.name, schema: paywall_schema_1.PaywallSchema },
                { name: plan_schema_1.Plan.name, schema: plan_schema_1.PlanSchema },
            ]),
            payment_module_1.PaymentModule,
        ],
        controllers: [gamification_controller_1.GamificationController],
        providers: [gamification_service_1.GamificationService],
    })
], GamificationModule);
//# sourceMappingURL=gamification.module.js.map