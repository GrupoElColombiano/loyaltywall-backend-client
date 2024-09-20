// En la entidad Events
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserPoints {
  @PrimaryGeneratedColumn()
  id_user_points: number;
  @Column()
  id_product: number;
  @Column()
  id_site: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  system_date: Date;
  @Column()
  points: string;
  @Column()
  idkeycloak: number;
}
