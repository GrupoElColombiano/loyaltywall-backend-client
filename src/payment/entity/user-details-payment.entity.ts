import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('user_details_payment')
  export class UserDetailsPayment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column()
    email: string;
  
    @Column()
    phone: string;

    @Column()
    cedula: string;
  
    @Column()
    typo_de_documento: string;
  
    @Column()
    address: string;
  
    @Column({ nullable: true })
    address_reference: string;
  
    @Column()
    region: string;
  
    @Column()
    city: string;
  
    @Column()
    postal_code: string;
  
    @CreateDateColumn()
    created_at: Date;
  }
  