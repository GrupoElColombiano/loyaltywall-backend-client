import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('register_logs') // Cambiamos el nombre de la tabla a 'register_logs'
export class RegisterLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;

  @Column()
  activityType: string;

  @Column()
  description: string;

  @Column()
  affectedObject: string;

  @Column()
  success: boolean;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  timestamp: Date;
}
