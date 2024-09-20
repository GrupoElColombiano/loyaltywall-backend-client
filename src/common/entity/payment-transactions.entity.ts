// En la entidad Events
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentTransactions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column()
  userId: string;
  @Column()
  gateway_id: number;
  @Column()
  status: boolean;
}
