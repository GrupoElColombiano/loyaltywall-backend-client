import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Unprotected, Public } from 'nest-keycloak-connect';

@Controller('payment')
@Unprotected()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('evertec/create-order')
  async createOrder(@Body() createOrderDto: any) {
    console.log(
      'Data que viene desde frontend para evertec 🔥',
      createOrderDto,
    );
    const result = await this.paymentService.createOrderEvertec(createOrderDto);
    console.log('🚀 ~ PaymentController ~ createOrder ~ result:', result);
    return result;
  }

  @Get('evertec/check-status/:requestId/:idSite')
  async checkTransactionStatus(
    @Param('requestId') requestId: string,
    @Param('idSite') idSite: string,
  ) {
    const result = await this.paymentService.checkTransactionStatus({
      requestId,
      idSite,
    });
    return result;
  }

  @Post('notifications')
  async handleNotification(@Body() notificationData: any) {
    const result = await this.paymentService.handleNotification(
      notificationData,
    );
    return result;
  }

  //========================================================//

  //PAYPAL
  //Create order paypal
  @Post('paypal/create-order')
  async createOrderPaypal(@Body() orderData: any) {
    try {
      console.log('amount', orderData);
      const response = await this.paymentService.createOrderPaypal(orderData);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Controlador de webhook para informar a la aplicación que se ha realizado un pago
  @Post('paypal/webhook')
  async webhook(@Body() body: any) {
    console.log('webhook', body);
    try {
      const response = await this.paymentService.webhook(body);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('paypal/capture-order')
  async captureOrder(@Body() body: any) {
    console.log('la orden ingresó: ', body);
    try {
      const response = await this.paymentService.captureOrder(body);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Consultar el estado de una order
  @Get('paypal/order/:id')
  async getOrder(@Param('id') id: string) {
    try {
      const response = await this.paymentService.getOrder(id);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //========================================================//
  //Metodo para obtener el historial de transacciones de la tabla de suscripciones y filtrar por id_user
  @Get('subscriptions/:userId')
  async getSubscriptions(
    @Param('userId') userId: string,
    @Query('name') name: string,
  ) {
    const result = await this.paymentService.getSubscriptionHistory(userId);
    return result;
  }

  //Metodo para obtener el historial de transacciones de productos de la tabla de suscripciones y filtrar por id_site
  @Get('subscriptions/site/:idSite')
  async getSubscriptionsBySite(@Param('idSite') idSite: number) {
    const result = await this.paymentService.getMarketplaceProductsHistory(
      idSite,
    );
    return result;
  }

  //========================================================//
  //Metodo para obtener ciudades y departamentos de Colombia
  @Get('departments')
  async getAllDepartments() {
    return await this.paymentService.getAllDepartments();
  }

  @Get('departments/:id/cities')
  async getCitiesByDepartmentId(@Param('id') id: number) {
    return await this.paymentService.getCitiesByDepartmentId(id);
  }
}
