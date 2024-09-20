import { Module } from '@nestjs/common';
import { GamificationService } from './service/gamification.service';
import { GamificationController } from './controller/gamification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/common/entity/event.entity';
import { Site } from 'src/common/entity/site.entity';

import { PointsEvents } from 'src/common/entity/points-events.entity';
import { EventsPointsSite } from 'src/common/entity/events-points-site.entity';
import { PaymentTransactions } from 'src/common/entity/payment-transactions.entity';
import { UserPoints } from 'src/common/entity/user-points.entity';

import { MongooseModule } from '@nestjs/mongoose';

import { Paywall, PaywallSchema } from './entities/paywall.schema';
import { Plan, PlanSchema } from './entities/plan.schema';
import { EventCluster } from 'src/common/entity/event_cluster.entity';
import { Cluster } from 'src/common/entity/cluster.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';
import { PlansProductCategory } from 'src/common/entity/plansproductcategory.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      PointsEvents,
      EventsPointsSite,
      Site,
      PaymentTransactions,
      UserPoints,
      EventCluster,
      Cluster,
      Plan,
      UserPlan,
      // PlansProductCategory,
    ]),
    MongooseModule.forFeature([
      { name: Paywall.name, schema: PaywallSchema },
      { name: Plan.name, schema: PlanSchema },
    ]),
    PaymentModule,
  ],
  controllers: [GamificationController],
  providers: [GamificationService],
})
export class GamificationModule {}
