import { Module } from '@nestjs/common';
import { PaywallController } from './paywall.controller';
import { PaywallService } from './paywall.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from 'src/common/entity/site.entity';
import { PointsEvents } from 'src/common/entity/points-events.entity';
import { EventsPointsSite } from 'src/common/entity/events-points-site.entity';
import { Cluster } from 'src/common/entity/cluster.entity';
import { EventCluster } from 'src/common/entity/event_cluster.entity';
import { PaymentTransactions } from 'src/common/entity/payment-transactions.entity';
import { Plan } from 'src/common/entity/plans.entity';
import { UserPoints } from 'src/common/entity/user-points.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';

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
    HttpModule
  ],
  controllers: [PaywallController],
  providers: [PaywallService],
})
export class PaywallModule {}
