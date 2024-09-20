import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plan } from './plans.entity';

@Entity({ name: 'user_plan' })
export class UserPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'id_user' })
  idUser: string;

  @Column({ nullable: true, name: 'id_plan' })
  idPlan: number;

  @Column({ nullable: true, name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: true, name: 'date_expired_plan', type: 'timestamp' })
  dateExpiredPlan: Date;

  @Column({ nullable: true, name: 'date_init_plan', type: 'timestamp' })
  dateInitPlan: Date;

  @Column({ nullable: true, name: 'id_version' })
  idVersion: string;

  @Column({ nullable: true, name: 'idSite' })
  idSite: number;

  // @ManyToOne(() => Plan, (plan) => plan.userPlans)
  // @JoinColumn({ name: 'id_plan' })
  // plan: Plan;
}
