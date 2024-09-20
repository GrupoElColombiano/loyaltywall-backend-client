import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  @Unique(['password'])
  password: string;

  @Column({ type: 'varchar', nullable: true })
  celular: number;

  @Column({ nullable: true })
  @Unique(['authConfirmToken'])
  authConfirmToken?: string;

  @Column({ select: false, nullable: true })
  isSelectedInfo: boolean;

  @Column({ select: false, nullable: true })
  isSelectedPolicy: boolean;

  @Column({ default: false, nullable: true })
  isVerified?: boolean;

  @Column({ nullable: true })
  @Unique(['verificationCode'])
  verificationCode?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  confirmPassword: string;
}
