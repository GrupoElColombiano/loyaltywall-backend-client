import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterLog } from './entity/register-log.entity';
import { PaymentTransaction } from './entity/payment-log.entity';

@Injectable()
export class RegisterlogService {

  constructor(
    @InjectRepository(RegisterLog)
    private readonly registerLogRepository: Repository<RegisterLog>,
    @InjectRepository(PaymentTransaction)
    private readonly paymentTransactionRepository: Repository<PaymentTransaction>,
  ) { }

  async create(registerLog: RegisterLog): Promise<RegisterLog> {
    try {
      return await this.registerLogRepository.save(registerLog);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createPaymentTransaction(paymentTransaction: PaymentTransaction): Promise<PaymentTransaction> {
    try {
      return await this.paymentTransactionRepository.save(paymentTransaction);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll(): Promise<RegisterLog[]> {
    try {
      return await this.registerLogRepository.find();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // Método findAllPaymentTransaction que filtra por nombre de pasarela de pago
  async findAllPaymentTransaction(paymentTransactionDto: any): Promise<any> {
    const { name } = paymentTransactionDto;
    try {
      let queryBuilder = this.paymentTransactionRepository.createQueryBuilder('paymentTransaction')
        .leftJoinAndSelect('paymentTransaction.gateway', 'gateway');

      // Si se proporciona un nombre, aplicar el filtro
      if (name) {
        queryBuilder = queryBuilder.where('gateway.name = :name', { name });
      }

      const paymentTransactions = await queryBuilder.getMany();

      return paymentTransactions;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: any): Promise<RegisterLog> {
    try {
      return await this.registerLogRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
