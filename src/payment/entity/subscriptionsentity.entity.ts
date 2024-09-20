import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserDetailsPayment } from './user-details-payment.entity';
import { MarketplaceProduct } from './marketplace_products.entity';
import { PaymentGateway } from './payment.entity.entity';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id_subscription: number;

  @Column()
  id_plan: number;

  @Column()
  id_rate: number;

  @Column({ type: 'varchar', length: 255 })
  transacction: string; // Asegúrate de que el nombre es correcto

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sysdate: Date;

  @Column({ type: 'varchar' })
  id_version: string;

  @Column({ type: 'varchar', length: 255 })
  id_user: string;

  @Column()
  cancellation_status: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  transaction_type: string;

  @Column({ type: 'varchar', nullable: true })
  amount: string;

  @ManyToOne(() => PaymentGateway, (gateway) => gateway.subscriptions, { nullable: true })
  @JoinColumn({ name: 'payment_gateway_id' })
  paymentGateway: PaymentGateway;

  @Column({ nullable: true })
  payment_gateway_id: number;

  @ManyToOne(() => UserDetailsPayment, { nullable: true })
  @JoinColumn({ name: 'user_details_payment_id' })
  userDetailsPayment: UserDetailsPayment;

  @Column({ nullable: true })
  user_details_payment_id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id_transaction: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  id_order: string;

  //idSite tipo number
  @Column({ nullable: true })
  id_site: number;

  @OneToMany(() => MarketplaceProduct, (marketplaceProduct) => marketplaceProduct.subscription)
  marketplaceProducts: MarketplaceProduct[];
}
