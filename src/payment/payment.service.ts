// src/payment/payment.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as paypal from '@paypal/checkout-server-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entity/subscriptionsentity.entity';
import { Repository } from 'typeorm';
import { Plan } from 'src/common/entity/plans.entity';
import { UserDetailsPayment } from './entity/user-details-payment.entity';
import { MarketplaceProduct } from './entity/marketplace_products.entity';
import { PaymentGateway } from './entity/payment.entity.entity';
import { UserPlan } from 'src/common/entity/user_plan.entity';
import { PaymentTransaction } from './entity/payment-transactions.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PaymentService {
  private readonly apiUrlLocations =
    'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json';

  private payPalClient: paypal.core.PayPalHttpClient;
 
  paypalWebhookEvents = [
    { event: 'CHECKOUT.ORDER.APPROVED', id: 0 },
    { event: 'PAYMENT.CAPTURE.COMPLETED', id: 1 },
    { event: 'PAYMENT.CAPTURE.DENIED', id: 2 },
    { event: 'PAYMENT.CAPTURE.REFUNDED', id: 3 },
    { event: 'PAYMENT.CAPTURE.PENDING', id: 4 },
  ];

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(UserDetailsPayment)
    private readonly userDetailsPaymentRepository: Repository<UserDetailsPayment>,
    @InjectRepository(MarketplaceProduct)
    private readonly marketplaceProductRepository: Repository<MarketplaceProduct>,
    @InjectRepository(PaymentGateway)
    private readonly paymentGatewayRepository: Repository<PaymentGateway>,
    @InjectRepository(UserPlan)
    private readonly userPlanRepository: Repository<UserPlan>,
    @InjectRepository(PaymentTransaction)
    private readonly paymentTransactionRepository: Repository<PaymentTransaction>,
  ) {}

  configurePaypalClient({ clientId, clientSecret }) {
    let environment;

    if (process.env.NODE_ENV === 'production') {
      environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
      environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
    this.payPalClient = new paypal.core.PayPalHttpClient(environment);
  }


  async createTransactionWithPoints(paymentGateway:any) {

      //todo: create a table to manage transactions with points
     const saveMainTransactionWithPoints = await this.paymentTransactionRepository.save(paymentGateway);

       if (paymentGateway?.data?.products) {

        try {

        //todo: manage just one uuidv4() id_transaction for all products

        paymentGateway?.data?.products.forEach(async (product) => {
          const marketplaceProduct = new MarketplaceProduct();
          marketplaceProduct.id_transaction = uuidv4();
          marketplaceProduct.id_product = product.id;
          marketplaceProduct.name_product = product.name;
          marketplaceProduct.price = product.price;
          marketplaceProduct.quantity = product.quantity;
          marketplaceProduct.points = product.points;
          marketplaceProduct.is_paid_with_points = product.isPaidWithPoints;
          marketplaceProduct.description = product.description;
          marketplaceProduct.image = product.image;
          await this.marketplaceProductRepository.save(marketplaceProduct);
        });


        } catch(error) {
          throw new InternalServerErrorException('Error saving product Data');
        }


      }

      return {
        transaction:saveMainTransactionWithPoints.id,
        status:"created"
      }

  }

  async getPaymentGatewateToSite({ idSite, paymentGatewayName }) {
    return this.paymentGatewayRepository
      .find({
        where: { idSite },
      })
      .then((response) =>
        response.find(
          (item) => item.name === paymentGatewayName && item.testMode === false,
        ),
      );
  }

  //Pagos Evertec
  private generateAuth({ login, tranKey }) {
    const nonce = Math.random().toString(36).substring(2);
    const seed = new Date().toISOString();
    const hash = CryptoJS.SHA256(nonce + seed + tranKey).toString(
      CryptoJS.enc.Base64,
    );
    const encodedNonce = Buffer.from(nonce).toString('base64');

    return {
      login,
      tranKey: hash,
      nonce: encodedNonce,
      seed,
    };
  }

  async createOrderEvertec(orderData: any) {
    try {
      const evertecCredentialsToSite = await this.getPaymentGatewateToSite({
        idSite: orderData?.idSite,
        paymentGatewayName: 'evertec',
      });

      const auth = this.generateAuth({
        login: evertecCredentialsToSite?.clientId,
        tranKey: evertecCredentialsToSite?.apiKey,
      });

      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 30);
      const expiration = expirationDate.toISOString();

      // Asumiendo que orderData.total es un número y quieres convertirlo a un entero sin puntos.
      orderData.total = parseInt(
        orderData.total.toString().replace(/\./g, ''),
        10,
      );

      const data = {
        locale: 'es_CO',
        auth,
        buyer: {
          name: orderData.names,
          surname: orderData.lastName,
          document: orderData.cedula,
          documentType: orderData.typo_de_documento,
          email: orderData.email,
          mobile: orderData.phone,
        },
        payment: {
          reference: 'P2',
          description: 'Pago básico de prueba P1',
          amount: {
            currency: 'COP',
            total: orderData.total,
          },
          allowPartial: false,
        },
        notificationUrl: `${process.env.API_CLIENT_URL}/payment/notifications`,
        expiration,
        returnUrl: `${process.env.FRONTEND_CLIENT_URL}/marketplace`,
        ipAddress: '127.0.0.1', // Dirección IP del cliente
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Agente de usuario del navegador
      };

      const config = {
        method: 'post',
        url: `${process.env.EVERTEC_URL}/session`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);
      const id_order = response.data.requestId;

      //Guardar todo el orderData en la tabla userDetailsPaymentRepository y guardar en una variable el id_user_details_payment
      let id_user_details_payment = null;
      if (orderData.products) {
        const userDetail = new UserDetailsPayment();
        userDetail.first_name = orderData.names;
        userDetail.last_name = orderData.lastName;
        userDetail.email = orderData.email;
        userDetail.phone = orderData.phone;
        userDetail.cedula = orderData.cedula;
        userDetail.typo_de_documento = orderData.typo_de_documento;
        userDetail.address = orderData.address;
        userDetail.address_reference = orderData.referenceAddress;
        userDetail.region = orderData.region;
        userDetail.city = orderData.city;
        userDetail.postal_code = orderData.zipCode;
        const user_details_payment =
          await this.userDetailsPaymentRepository.save(userDetail);
        id_user_details_payment = user_details_payment.id;
      }

      //Guardar en la tabla subscriptions
      const subscription = new Subscription();
      subscription.id_plan = orderData.id_plan || null;
      subscription.id_rate = orderData.id_rate || null;
      subscription.transacction = orderData.transacction || null;
      subscription.sysdate = new Date();
      subscription.id_version = orderData.id_version || null;
      subscription.id_user = orderData.id_user;
      subscription.cancellation_status = 4;
      subscription.transaction_type = orderData.products ? 'product' : 'plan';
      subscription.amount = orderData.total;
      subscription.payment_gateway_id = 2;
      subscription.user_details_payment_id = id_user_details_payment;
      subscription.id_order = id_order;
      subscription.id_site = orderData.id_site || 1;
      const subscriptionSaved = await this.subscriptionRepository.save(
        subscription,
      );

      const userPlan = new UserPlan();
      userPlan.idUser = orderData.id_user;
      userPlan.isActive = false;
      userPlan.dateExpiredPlan = new Date(
        new Date().setDate(new Date().getDate() + 30),
      );
      userPlan.dateInitPlan = new Date();
      userPlan.idVersion = orderData.id_version;
      await this.userPlanRepository.save(userPlan);

      //guardar en la tabla marketplace_products el array de productos
      if (orderData.products) {
        orderData.products.forEach(async (product) => {
          const marketplaceProduct = new MarketplaceProduct();
          marketplaceProduct.id_transaction =
            subscriptionSaved?.id_transaction || '';
          marketplaceProduct.id_product = product.id;
          marketplaceProduct.name_product = product.name;
          marketplaceProduct.price = product.price;
          marketplaceProduct.quantity = product.quantity;
          marketplaceProduct.points = product.points;
          marketplaceProduct.is_paid_with_points = product.isPaidWithPoints;
          marketplaceProduct.description = product.description;
          marketplaceProduct.image = product.image;
          await this.marketplaceProductRepository.save(marketplaceProduct);
        });
      }

      return response.data;
    } catch (error) {
      throw new Error('Error creating order');
    }
  }

  async checkTransactionStatus({ requestId, idSite }) {
    console.log('🔥 checkTransactionStatus 🔥', { requestId, idSite });
    try {
      const evertecCredentialsToSite = await this.getPaymentGatewateToSite({
        idSite,
        paymentGatewayName: 'evertec',
      });

      console.log(
        '🚀 ~ PaymentService ~ createOrderPaypal ~ evertecCredentialsToSite:',
        evertecCredentialsToSite,
      );

      const auth = this.generateAuth({
        login: evertecCredentialsToSite?.clientId,
        tranKey: evertecCredentialsToSite?.apiKey,
      });
      // const auth = this.generateAuth();

      const config = {
        method: 'post',
        url: `${process.env.EVERTEC_URL}/session/${requestId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ auth }),
      };

      const response = await axios.request(config);
      const id_order = response.data.requestId;

      
      if (response.data.status.status === 'APPROVED') {
        //Setear el campo cancellation_status de la tabla subscriptions a 0
        console.log('Pago aprobado', id_order);
        await this.setCancellationStatus(id_order, 1);
      }

      if (response.data.status.status === 'REJECTED') {
        //Setear el campo cancellation_status de la tabla subscriptions a 2
        console.log('Pago rechazado', id_order);
        await this.setCancellationStatus(id_order, 2);
      }

      if (response.data.status.status === 'PENDING') {
        //Setear el campo cancellation_status de la tabla subscriptions a 4
        console.log('Pago pendiente', id_order);
        await this.setCancellationStatus(id_order, 4);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error checking transaction status');
    }
  }

  async handleNotification(notificationData: any) {
    //Sacar el tipo de evento que viene de evertec
    const { event } = notificationData;
    console.log('event', event);

    //Buscar el id del evento en el array de eventos de evertec
    if (event === 'TRANSACTION.CAPTURED') {
      console.log('Evento de pago aprobado');
      //Setear el campo cancellation_status de la tabla subscriptions a 0
      await this.setCancellationStatus('4JY113764M151633M', 0);
    }

    // Simula el manejo de la notificación (aquí puedes agregar la lógica necesaria)
    return {
      status: 'success',
      message: 'Notification processed successfully',
    };
  }

  //PAGOS PAYPAL
  //Crea una orden de pago
  async generateReferenceId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async createOrderPaypal(orderData: any) {

    const paypalCredentialsToSite = await this.getPaymentGatewateToSite({
      idSite: orderData?.idSite,
      paymentGatewayName: 'paypal',
    });


    this.configurePaypalClient({
      clientId: paypalCredentialsToSite.clientId,
      clientSecret: paypalCredentialsToSite.apiKey,
    });

    let id_user_details_payment = null;
    const { total } = orderData;
    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'PUHF',
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2).toString(), // Asegúrate de que amount esté en formato string
          },
        },
      ],
      application_context: {
        return_url: `${process.env.FRONTEND_CLIENT_URL}/marketplace`,
        cancel_url: `${process.env.FRONTEND_CLIENT_URL}/marketplace`,
      },
    });

    try {
      const response = await this.payPalClient.execute(request);
    
      const orderId = response.result.id;

      if (orderData.products) {
        const userDetail = new UserDetailsPayment();
        userDetail.first_name = orderData.names;
        userDetail.last_name = orderData.lastName;
        userDetail.email = orderData.email;
        userDetail.phone = orderData.phone;
        userDetail.cedula = orderData.cedula;
        userDetail.typo_de_documento = orderData.typo_de_documento;
        userDetail.address = orderData.address;
        userDetail.address_reference = orderData.referenceAddress;
        userDetail.region = orderData.region;
        userDetail.city = orderData.city;
        userDetail.postal_code = orderData.zipCode;
        const user_details_payment =
          await this.userDetailsPaymentRepository.save(userDetail);
        id_user_details_payment = user_details_payment.id;
      }

      //Guardar en la tabla subscriptions
      const subscription = new Subscription();
      subscription.id_plan = orderData.id_plan || null;
      subscription.id_rate = orderData.id_rate || null;
      subscription.transacction = orderData.transacction || null;
      subscription.sysdate = new Date();
      subscription.id_version = orderData.id_version || null;
      subscription.id_user = orderData.id_user;
      subscription.cancellation_status = 4;
      subscription.transaction_type = orderData.products ? 'product' : 'plan';
      subscription.amount = total;
      subscription.payment_gateway_id = 1;
      subscription.user_details_payment_id = id_user_details_payment;
      subscription.id_order = orderId;
      subscription.id_site = orderData.id_site || 1;
      await this.subscriptionRepository.save(subscription);

      //Guardar la suscripción en la tabla user_plan, si el id_plan no es null. En ésta tabla se guardarán los planes suscritos ligados al usuario.
      if (orderData.id_plan) {
        const userPlan = new UserPlan();
        userPlan.idUser = orderData.id_user;
        userPlan.idPlan = orderData.id_plan;
        userPlan.isActive = false;
        userPlan.dateExpiredPlan = new Date(
          new Date().setDate(new Date().getDate() + 30),
        );
        userPlan.dateInitPlan = new Date();
        userPlan.idVersion = orderData.id_version.toString();
        userPlan.idSite = orderData.id_site || 1;
        console.log('userPlan', userPlan);
        await this.userPlanRepository.save(userPlan);
      }

      //guardar en la tabla marketplace_products el array de productos
      if (orderData.products) {
        console.log('Productos', orderData.products);
        orderData.products.forEach(async (product) => {
          const marketplaceProduct = new MarketplaceProduct();
          marketplaceProduct.id_transaction =
            subscription?.id_transaction || '';
          marketplaceProduct.id_product = product.id;
          marketplaceProduct.name_product = product.name;
          marketplaceProduct.price = product.price;
          marketplaceProduct.quantity = product.quantity;
          marketplaceProduct.points = product.points;
          marketplaceProduct.is_paid_with_points = product.isPaidWithPoints;
          marketplaceProduct.description = product.description;
          marketplaceProduct.image = product.image;
          await this.marketplaceProductRepository.save(marketplaceProduct);
        });
      }

      return {
        message: 'Empieza a confirmar tu orden',
        data: {
          flow_confirm_order: response.result.links[1].href,
          capture_order: response.result.links[3].href,
        },
      };
    } catch (error) {
      return error;
    }
  }

  //Metodo de webhook para informar a la aplicación que se ha realizado un pago
  async webhook(body: any) {
    console.log('✅ webhook');
    const { event_type } = body;
    const id = '4JY113764M151633M';
    console.log('event_type', event_type);

    //Agregar if para verificar el tipo de evento de los 5 necesarios para el webhook
    if (event_type === 'CHECKOUT.CHECKOUT.BUYER-APPROVED') {
      console.log('Evento de pago pendiente');
      await this.setCancellationStatus('4JY113764M151633M', 4);
    }

    if (event_type === 'CHECKOUT.ORDER.APPROVED') {
      console.log('Evento de pago aprobado');
      await this.setCancellationStatus('4JY113764M151633M', 0);
    }

    if (event_type === 'CHECKOUT.ORDER.COMPLETED') {
      console.log('Evento de pago completado');
      await this.setCancellationStatus('4JY113764M151633M', 1);
    }

    if (event_type === 'CHECKOUT.ORDER.DECLINED') {
      console.log('Evento de pago rechazado');
      await this.setCancellationStatus('4JY113764M151633M', 2);
    }

    if (event_type === 'CHECKOUT.ORDER.VOIDED') {
      console.log('Evento de pago anulado');
      await this.setCancellationStatus('4JY113764M151633M', 3);
    }

    return {
      message: 'Evento registrado correctamente',
    };
  }

  //Setear el campo cancellation_status de la tabla subscriptions a x número, dependiendo del evento
  async setCancellationStatus(orderId: string, status: number) {
    console.log('✅ setCancellationStatus');
    console.log('orderId', orderId);
    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: { id_order: orderId },
      });
      console.log(
        '🚀 ~ PaymentService ~ setCancellationStatus ~ subscription:',
        subscription,
      );

      const { id_plan, id_version, id_user } = subscription;

      if (subscription) {
        // Primero, setear todos los registros de la tabla subscriptions de un usuario en particular a 3 y que tengan el campo id_plan diferente a null, si el status es 1
        if (status === 1) {
          await this.subscriptionRepository
            .createQueryBuilder()
            .update(Subscription)
            .set({ cancellation_status: 3 })
            .where('id_user = :id_user AND id_plan IS NOT NULL', {
              id_user: subscription.id_user,
            })
            .execute();
          //Filtrar por los campos id_plan, id_version y el id_user
          const userPlan = await this.userPlanRepository.findOne({
            where: {
              idUser: id_user,
              idPlan: id_plan,
              idVersion: id_version?.toString(),
            },
          });

          if (userPlan) {
            // Primero, asegúrate de que todos los planes anteriores del usuario estén inactivos
            await this.userPlanRepository
              .createQueryBuilder()
              .update(UserPlan)
              .set({ isActive: false })
              .where('idUser = :idUser', { idUser: id_user })
              .execute();

            // Luego, actualiza el campo isActive a true filtrando por id_user y id_plan
            await this.userPlanRepository
              .createQueryBuilder()
              .update(UserPlan)
              .set({ isActive: true })
              .where('idUser = :idUser', { idUser: id_user })
              .andWhere('idPlan = :idPlan', { idPlan: id_plan })
              .execute();
          }
        }

        // Luego, setear el estado de cancelación de la suscripción específica al valor que viene
        subscription.cancellation_status = status;
        await this.subscriptionRepository.save(subscription);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Metodo para capturar el pago
  async captureOrder(body: any) {
    // debo realizar el capture al siguiente link:https://api.sandbox.paypal.com/v2/checkout/orders/4KE635249K399071B/capture
    const { orderId, userId } = body;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);

    try {
      const response = await this.payPalClient.execute(request);

      //Si el pago es exitoso se registrar el evento de paywallService
      if (response.result.status === 'COMPLETED') {
        //Se registra el pago en la base de datos
        await this.setCancellationStatus(orderId, 1);

        //Sacar de la tabla suscripciones el id_plan y el id_version
        const subscription = await this.subscriptionRepository.findOne({
          where: { id_order: orderId },
        });
        const { id_plan, id_version } = subscription;

        //Filtrar por los campos id_plan, id_version y el id_user
        const userPlan = await this.userPlanRepository.findOne({
          where: {
            idUser: userId,
            idPlan: id_plan,
            idVersion: id_version.toString(),
          },
        });

        if (userPlan) {
          // Primero, asegúrate de que todos los planes anteriores del usuario estén inactivos
          await this.userPlanRepository
            .createQueryBuilder()
            .update(UserPlan)
            .set({ isActive: false })
            .where('idUser = :idUser', { idUser: userId })
            .execute();

          // Luego, actualiza el campo isActive a true filtrando por id_user y id_plan
          await this.userPlanRepository
            .createQueryBuilder()
            .update(UserPlan)
            .set({ isActive: true })
            .where('idUser = :idUser', { idUser: userId })
            .andWhere('idPlan = :idPlan', { idPlan: id_plan })
            .execute();
        }
      }

      return { ...response, healty: true };
    } catch (error) {
      return { ...error, healty: false };
    }
  }

  //Metodo para consultar el estado de una orden
  async getOrder(orderId: string) {
    const request = new paypal.orders.OrdersGetRequest(orderId);

    try {
      const response = await this.payPalClient.execute(request);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //Metodo para obtener el historial de transacciones de la tabla de suscripciones y filtrar por id_user
  async getSubscriptionHistory(id_user: string, name?: string) {
    try {
      const subscriptions: any = await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .where('subscription.id_user = :id_user', { id_user })
        .leftJoinAndSelect('subscription.paymentGateway', 'paymentGateway')
        .leftJoinAndSelect(
          'subscription.userDetailsPayment',
          'userDetailsPayment',
        )
        .leftJoinAndSelect(
          'subscription.marketplaceProducts',
          'marketplaceProducts',
        )
        .getMany();

      // Usar map para manejar promesas asincrónicas y Promise.all para esperar a todas
      const subscriptionsWithPlan = await Promise.all(
        subscriptions.map(async (subscription) => {
          if (subscription.id_plan === null) {
            subscription.plan = null;
            return subscription;
          }

          const plan = await this.planRepository.findOne({
            where: { idPlan: subscription.id_plan },
          });
          subscription.plan = plan;
          return subscription;
        }),
      );

      // Filtrar por nombre si se proporciona
      let filteredSubscriptions = subscriptionsWithPlan;
      if (name) {
        filteredSubscriptions = subscriptionsWithPlan.filter(
          (subscription) =>
            subscription.plan && subscription.plan.name === name,
        );
      }

      // console.log('userId para el historial', filteredSubscriptions);

      return subscriptionsWithPlan;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Metodo para obtener el historial de transacciones de productos de la tabla de suscripciones y filtrar por id_site
  async getMarketplaceProductsHistory(id_site: number, userId?: string) {
    try {
      const subscriptions: any = await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .where('subscription.id_site = :id_site', { id_site })
        .innerJoinAndSelect('subscription.paymentGateway', 'paymentGateway')
        .innerJoinAndSelect(
          'subscription.userDetailsPayment',
          'userDetailsPayment',
        )
        .innerJoinAndSelect(
          'subscription.marketplaceProducts',
          'marketplaceProducts',
        )
        .getMany();

     

      //Retornar sólo las transacciones que tengan productos o que tengan el campo subscription.id_plan en null, porque si está en null es una transacción de productos. Retornar s´lo el campo marketplaceProducts
      const filteredSubscriptions = subscriptions
        .filter(
          (subscription) =>
            subscription.marketplaceProducts.length > 0 ||
            subscription.id_plan === null,
        )
        .map((subscription) => subscription.marketplaceProducts);

      //Se retorna de la froma [[{product1}, {product2}], [{product1}, {product2}]] y lo necesito [{product1}, {product2}, {product1}, {product2}]
      const flatMarketplaceProducts = filteredSubscriptions.flat();

      const responseFavorites = await axios.request({
        method: 'get',
        url: `${process.env.MARKET_PLACE_URL}/products/favorites`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          User_id: userId || "",
        },
      })
     


      const products = flatMarketplaceProducts.map((product) => {
        const {
          id_product,
          name_product,
          price,
          quantity,
          points,
          is_paid_with_points,
          description,
          image,
        } = product;

        return {
          id: id_product,
          name: name_product,
          description,
          price,
          image,
          points,
          isInFavorite: false,
          isPaidWithPoints: is_paid_with_points,
        };
      });

     
      const productMap = new Map();

      products.forEach(product => {
       
        const isFavorite = responseFavorites?.data?.items.some(favProduct => favProduct.id === product.id);
      
        productMap.set(product.id, {
          ...product,
          isInFavorite: isFavorite ? true : product.isInFavorite
        });
      });
      
      const uniqueProducts = Array.from(productMap.values());

      return uniqueProducts;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //-----------------------------------------------------------------------------------------------------//
  //Métodos para obtener los departamentos y ciudades de Colombia
  async getAllDepartments() {
    const response = await axios.get(this.apiUrlLocations);
    return response.data.map((dept) => ({
      id: dept.id,
      name: dept.departamento,
    }));
  }

  async getCitiesByDepartmentId(id: number) {
    const response = await axios.get(this.apiUrlLocations);
    const department = response.data.find((dept) => {
      return dept.id === Number(id);
    });
    return department ? department.ciudades : [];
  }

  //Método para obtener el id_plan de la tabla subscriptions, filtrando por el userId
  async getPlanByUserId(userId: string) {
    try {
      // Buscar el id_plan de la tabla subscriptions filtrando por el userId y que tenga el campo cancellation_status en 1
      const subscription = await this.subscriptionRepository
        .createQueryBuilder('subscription')
        .where('subscription.id_user = :userId', { userId })
        .andWhere('subscription.cancellation_status = 1')
        .getOne();

      return {
        id_plan: subscription.id_plan,
        id_version: subscription.id_version,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
