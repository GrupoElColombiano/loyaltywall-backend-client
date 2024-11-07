import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Subscription } from './subscriptionsentity.entity';


@Entity({ name: 'marketplace_products' })
export class MarketplaceProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.marketplaceProducts)
  @JoinColumn({ name: 'id_transaction', referencedColumnName: 'id_transaction' })
  subscription: Subscription;

  @Column({ type: 'uuid' })
  id_transaction: string;

  @Column()
  id_product: number;

  @Column()
  name_product: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  points: number;

  @Column({ type: 'boolean', default: false })
  is_paid_with_points: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  image: string;
}
