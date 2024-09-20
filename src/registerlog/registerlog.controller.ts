import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterlogService } from './registerlog.service';
// import { Public, Unprotected } from 'nest-keycloak-connect';

@Controller('registerlog')
// @Unprotected()
export class RegisterlogController {
  constructor(private readonly registerlogService: RegisterlogService) {}

  // @Public(true)
  @Post('create')
  async createRegisterlog(@Body() registerlogDto: any) {
    return this.registerlogService.create(registerlogDto);
  }

  // @Public(true)
  @Post('createPaymentTransaction')
  async createPaymentTransactions(@Body() paymentTransactionDto: any) {
    // return this.registerlogService.createPaymentTransaction(paymentTransactionDto);
  }

  // @Public(true)
  @Post('createPaymentTransaction')
  async createPaymentTransaction(@Body() paymentTransactionDto: any) {
    // return this.registerlogService.createPaymentTransaction(paymentTransactionDto);
  }

  // @Public(true)
  @Get('findAll')
  async findAll() {
    return this.registerlogService.findAll();
  }

  // @Public(true)
  @Get('findAllPaymentTransaction')
  async findAllPaymentTransaction(@Body() paymentTransactionDto: any) {
    // return this.registerlogService.findAllPaymentTransaction(paymentTransactionDto);
  }
}
