import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGateway } from './entity/payment.entity.entity';
import { PaymentTransaction } from './entity/payment-transactions.entity';
import { HttpModule } from '@nestjs/axios';
import { Subscription } from './entity/subscriptionsentity.entity';
import { Plan } from 'src/common/entity/plans.entity';
import { PlansProductCategory } from 'src/common/entity/plansproductcategory.entity';
import { UserDetailsPayment } from './entity/user-details-payment.entity';
import { MarketplaceProduct } from './entity/marketplace_products.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentGateway, PaymentTransaction, Subscription, Plan, PlansProductCategory, UserDetailsPayment, MarketplaceProduct, UserPlan]), HttpModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
