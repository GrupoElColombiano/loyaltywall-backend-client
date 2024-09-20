// Importa los módulos necesarios de TypeORM
import { PaymentGateway } from '../../payment/entity/payment.entity.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // Asegúrate de importar la entidad de PaymentGateway si aún no lo has hecho.

@Entity({ name: 'payment_transactions' }) // Nombre de la tabla para el historial de transacciones
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentGateway)
  @JoinColumn({ name: 'gateway_id' })
  gateway: PaymentGateway;

  @Column()
  amount: number;

  @Column()
  userName: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
