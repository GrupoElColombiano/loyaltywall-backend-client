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
  UseGuards 
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Unprotected, Public } from 'nest-keycloak-connect';
import { JwtAuthGuard } from 'src/auth-kc/guards/jwt-auth.guard';

@Controller('payment')
@Unprotected()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post('create')
  async createPaymentWithPoints(@Body() data:any) {
    return this.paymentService.createTransactionWithPoints(data)
  }

 
  @UseGuards(JwtAuthGuard)
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
 
  @UseGuards(JwtAuthGuard)
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
 
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
 
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get('subscriptions/:userId')
  async getSubscriptions(
    @Param('userId') userId: string,
    @Query('name') name: string,
  ) {
    const result = await this.paymentService.getSubscriptionHistory(userId);
    return result;
  }

  //Metodo para obtener el historial de transacciones de productos de la tabla de suscripciones y filtrar por id_site 
  @UseGuards(JwtAuthGuard)
  @Get('subscriptions/site/:idSite/:userId')
  async getSubscriptionsBySite(@Param('idSite') idSite: number, @Param('userId') userId: string) {
    const result = await this.paymentService.getMarketplaceProductsHistory(
      idSite,
      userId
    );
    return result;
  }

  //========================================================//
  //Metodo para obtener ciudades y departamentos de Colombia 
  @UseGuards(JwtAuthGuard)
  @Get('departments')
  async getAllDepartments() {
    return await this.paymentService.getAllDepartments();
  }
 
  @UseGuards(JwtAuthGuard)
  @Get('departments/:id/cities')
  async getCitiesByDepartmentId(@Param('id') id: number) {
    return await this.paymentService.getCitiesByDepartmentId(id);
  }
}
