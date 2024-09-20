"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const CryptoJS = require("crypto-js");
const paypal = require("@paypal/checkout-server-sdk");
const typeorm_1 = require("@nestjs/typeorm");
const subscriptionsentity_entity_1 = require("./entity/subscriptionsentity.entity");
const typeorm_2 = require("typeorm");
const plans_entity_1 = require("../common/entity/plans.entity");
const user_details_payment_entity_1 = require("./entity/user-details-payment.entity");
const marketplace_products_entity_1 = require("./entity/marketplace_products.entity");
const payment_entity_entity_1 = require("./entity/payment.entity.entity");
const user_plan_entity_1 = require("../common/entity/user_plan.entity");
let PaymentService = exports.PaymentService = class PaymentService {
    constructor(subscriptionRepository, planRepository, userDetailsPaymentRepository, marketplaceProductRepository, paymentGatewayRepository, userPlanRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
        this.userDetailsPaymentRepository = userDetailsPaymentRepository;
        this.marketplaceProductRepository = marketplaceProductRepository;
        this.paymentGatewayRepository = paymentGatewayRepository;
        this.userPlanRepository = userPlanRepository;
        this.apiUrlLocations = 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json';
        this.login = '716602852a0cdef7a2cd5894d25b0887';
        this.tranKey = 'yRm9C73F';
        this.paypalWebhookEvents = [
            { event: 'CHECKOUT.ORDER.APPROVED', id: 0 },
            { event: 'PAYMENT.CAPTURE.COMPLETED', id: 1 },
            { event: 'PAYMENT.CAPTURE.DENIED', id: 2 },
            { event: 'PAYMENT.CAPTURE.REFUNDED', id: 3 },
            { event: 'PAYMENT.CAPTURE.PENDING', id: 4 },
        ];
    }
    configurePaypalClient({ clientId, clientSecret }) {
        let environment;
        console.log('✅ configurePaypalClient - environment ✅', {
            clientId,
            clientSecret,
        });
        console.log('✅ configurePaypalClient - environment ✅', process.env);
        if (process.env.NODE_ENV === 'production') {
            environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
        }
        else {
            environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
        }
        this.payPalClient = new paypal.core.PayPalHttpClient(environment);
    }
    getPaymentGatewateToSite({ idSite, paymentGatewayName }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentGatewayRepository
                .find({
                where: { idSite },
            })
                .then((response) => response.find((item) => item.name === paymentGatewayName && item.testMode === false));
        });
    }
    generateAuth({ login, tranKey }) {
        const nonce = Math.random().toString(36).substring(2);
        const seed = new Date().toISOString();
        const hash = CryptoJS.SHA256(nonce + seed + tranKey).toString(CryptoJS.enc.Base64);
        const encodedNonce = Buffer.from(nonce).toString('base64');
        return {
            login,
            tranKey: hash,
            nonce: encodedNonce,
            seed,
        };
    }
    createOrderEvertec(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const evertecCredentialsToSite = yield this.getPaymentGatewateToSite({
                    idSite: orderData === null || orderData === void 0 ? void 0 : orderData.idSite,
                    paymentGatewayName: 'evertec',
                });
                console.log('🚀 ~ PaymentService ~ createOrderPaypal ~ evertecCredentialsToSite:', evertecCredentialsToSite);
                const auth = this.generateAuth({
                    login: evertecCredentialsToSite === null || evertecCredentialsToSite === void 0 ? void 0 : evertecCredentialsToSite.clientId,
                    tranKey: evertecCredentialsToSite === null || evertecCredentialsToSite === void 0 ? void 0 : evertecCredentialsToSite.apiKey,
                });
                console.log('🚀 ~ PaymentService ~ createOrderEvertec ~ auth:', auth);
                const expirationDate = new Date();
                expirationDate.setMinutes(expirationDate.getMinutes() + 30);
                const expiration = expirationDate.toISOString();
                orderData.total = parseInt(orderData.total.toString().replace(/\./g, ''), 10);
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
                    ipAddress: '127.0.0.1',
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                };
                const config = {
                    method: 'post',
                    url: `${process.env.EVERTEC_URL}/session`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(data),
                };
                const response = yield axios_1.default.request(config);
                const id_order = response.data.requestId;
                let id_user_details_payment = null;
                if (orderData.products) {
                    const userDetail = new user_details_payment_entity_1.UserDetailsPayment();
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
                    const user_details_payment = yield this.userDetailsPaymentRepository.save(userDetail);
                    id_user_details_payment = user_details_payment.id;
                }
                const subscription = new subscriptionsentity_entity_1.Subscription();
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
                const subscriptionSaved = yield this.subscriptionRepository.save(subscription);
                console.log('-- subscriptionSaved --', JSON.stringify(subscriptionSaved));
                const userPlan = new user_plan_entity_1.UserPlan();
                userPlan.idUser = orderData.id_user;
                userPlan.isActive = false;
                userPlan.dateExpiredPlan = new Date(new Date().setDate(new Date().getDate() + 30));
                userPlan.dateInitPlan = new Date();
                userPlan.idVersion = orderData.id_version;
                yield this.userPlanRepository.save(userPlan);
                if (orderData.products) {
                    orderData.products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                        const marketplaceProduct = new marketplace_products_entity_1.MarketplaceProduct();
                        marketplaceProduct.id_transaction =
                            (subscriptionSaved === null || subscriptionSaved === void 0 ? void 0 : subscriptionSaved.id_transaction) || '';
                        marketplaceProduct.id_product = product.id;
                        marketplaceProduct.name_product = product.name;
                        marketplaceProduct.price = product.price;
                        marketplaceProduct.quantity = product.quantity;
                        marketplaceProduct.points = product.points;
                        marketplaceProduct.is_paid_with_points = product.isPaidWithPoints;
                        marketplaceProduct.description = product.description;
                        marketplaceProduct.image = product.image;
                        yield this.marketplaceProductRepository.save(marketplaceProduct);
                    }));
                }
                return response.data;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error creating order');
            }
        });
    }
    checkTransactionStatus({ requestId, idSite }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🔥 checkTransactionStatus 🔥', { requestId, idSite });
            try {
                const evertecCredentialsToSite = yield this.getPaymentGatewateToSite({
                    idSite,
                    paymentGatewayName: 'evertec',
                });
                console.log('🚀 ~ PaymentService ~ createOrderPaypal ~ evertecCredentialsToSite:', evertecCredentialsToSite);
                const auth = this.generateAuth({
                    login: evertecCredentialsToSite === null || evertecCredentialsToSite === void 0 ? void 0 : evertecCredentialsToSite.clientId,
                    tranKey: evertecCredentialsToSite === null || evertecCredentialsToSite === void 0 ? void 0 : evertecCredentialsToSite.apiKey,
                });
                const config = {
                    method: 'post',
                    url: `${process.env.EVERTEC_URL}/session/${requestId}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({ auth }),
                };
                const response = yield axios_1.default.request(config);
                const id_order = response.data.requestId;
                if (response.data.status.status === 'APPROVED') {
                    console.log('Pago aprobado', id_order);
                    yield this.setCancellationStatus(id_order, 1);
                }
                if (response.data.status.status === 'REJECTED') {
                    console.log('Pago rechazado', id_order);
                    yield this.setCancellationStatus(id_order, 2);
                }
                if (response.data.status.status === 'PENDING') {
                    console.log('Pago pendiente', id_order);
                    yield this.setCancellationStatus(id_order, 4);
                }
                return response.data;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error checking transaction status');
            }
        });
    }
    handleNotification(notificationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { event } = notificationData;
            console.log('event', event);
            if (event === 'TRANSACTION.CAPTURED') {
                console.log('Evento de pago aprobado');
                yield this.setCancellationStatus('4JY113764M151633M', 0);
            }
            return {
                status: 'success',
                message: 'Notification processed successfully',
            };
        });
    }
    generateReferenceId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15));
        });
    }
    createOrderPaypal(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🚀 ~ PaymentService ~ createOrderPaypal ~ createOrderPaypal: 🚀');
            const paypalCredentialsToSite = yield this.getPaymentGatewateToSite({
                idSite: orderData === null || orderData === void 0 ? void 0 : orderData.idSite,
                paymentGatewayName: 'paypal',
            });
            console.log('🚀 ~ PaymentService ~ createOrderPaypal ~ paypalCredentialsToSite:', paypalCredentialsToSite);
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
                            value: total.toFixed(2).toString(),
                        },
                    },
                ],
                application_context: {
                    return_url: `${process.env.FRONTEND_CLIENT_URL}/marketplace`,
                    cancel_url: `${process.env.FRONTEND_CLIENT_URL}/marketplace`,
                },
            });
            try {
                const response = yield this.payPalClient.execute(request);
                console.log('🚀 ~ PaymentService ~ createOrderPaypal ~ response:', response);
                const orderId = response.result.id;
                if (orderData.products) {
                    const userDetail = new user_details_payment_entity_1.UserDetailsPayment();
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
                    const user_details_payment = yield this.userDetailsPaymentRepository.save(userDetail);
                    id_user_details_payment = user_details_payment.id;
                }
                const subscription = new subscriptionsentity_entity_1.Subscription();
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
                yield this.subscriptionRepository.save(subscription);
                if (orderData.id_plan) {
                    const userPlan = new user_plan_entity_1.UserPlan();
                    userPlan.idUser = orderData.id_user;
                    userPlan.idPlan = orderData.id_plan;
                    userPlan.isActive = false;
                    userPlan.dateExpiredPlan = new Date(new Date().setDate(new Date().getDate() + 30));
                    userPlan.dateInitPlan = new Date();
                    userPlan.idVersion = orderData.id_version.toString();
                    userPlan.idSite = orderData.id_site || 1;
                    console.log('userPlan', userPlan);
                    yield this.userPlanRepository.save(userPlan);
                }
                if (orderData.products) {
                    console.log('Productos', orderData.products);
                    orderData.products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                        const marketplaceProduct = new marketplace_products_entity_1.MarketplaceProduct();
                        marketplaceProduct.id_transaction =
                            (subscription === null || subscription === void 0 ? void 0 : subscription.id_transaction) || '';
                        marketplaceProduct.id_product = product.id;
                        marketplaceProduct.name_product = product.name;
                        marketplaceProduct.price = product.price;
                        marketplaceProduct.quantity = product.quantity;
                        marketplaceProduct.points = product.points;
                        marketplaceProduct.is_paid_with_points = product.isPaidWithPoints;
                        marketplaceProduct.description = product.description;
                        marketplaceProduct.image = product.image;
                        yield this.marketplaceProductRepository.save(marketplaceProduct);
                    }));
                }
                return {
                    message: 'Empieza a confirmar tu orden',
                    data: {
                        flow_confirm_order: response.result.links[1].href,
                        capture_order: response.result.links[3].href,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    webhook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('✅ webhook');
            const { event_type } = body;
            const id = '4JY113764M151633M';
            console.log('event_type', event_type);
            if (event_type === 'CHECKOUT.CHECKOUT.BUYER-APPROVED') {
                console.log('Evento de pago pendiente');
                yield this.setCancellationStatus('4JY113764M151633M', 4);
            }
            if (event_type === 'CHECKOUT.ORDER.APPROVED') {
                console.log('Evento de pago aprobado');
                yield this.setCancellationStatus('4JY113764M151633M', 0);
            }
            if (event_type === 'CHECKOUT.ORDER.COMPLETED') {
                console.log('Evento de pago completado');
                yield this.setCancellationStatus('4JY113764M151633M', 1);
            }
            if (event_type === 'CHECKOUT.ORDER.DECLINED') {
                console.log('Evento de pago rechazado');
                yield this.setCancellationStatus('4JY113764M151633M', 2);
            }
            if (event_type === 'CHECKOUT.ORDER.VOIDED') {
                console.log('Evento de pago anulado');
                yield this.setCancellationStatus('4JY113764M151633M', 3);
            }
            return {
                message: 'Evento registrado correctamente',
            };
        });
    }
    setCancellationStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('✅ setCancellationStatus');
            console.log('orderId', orderId);
            try {
                const subscription = yield this.subscriptionRepository.findOne({
                    where: { id_order: orderId },
                });
                console.log('🚀 ~ PaymentService ~ setCancellationStatus ~ subscription:', subscription);
                const { id_plan, id_version, id_user } = subscription;
                if (subscription) {
                    if (status === 1) {
                        yield this.subscriptionRepository
                            .createQueryBuilder()
                            .update(subscriptionsentity_entity_1.Subscription)
                            .set({ cancellation_status: 3 })
                            .where('id_user = :id_user AND id_plan IS NOT NULL', {
                            id_user: subscription.id_user,
                        })
                            .execute();
                        const userPlan = yield this.userPlanRepository.findOne({
                            where: {
                                idUser: id_user,
                                idPlan: id_plan,
                                idVersion: id_version === null || id_version === void 0 ? void 0 : id_version.toString(),
                            },
                        });
                        if (userPlan) {
                            yield this.userPlanRepository
                                .createQueryBuilder()
                                .update(user_plan_entity_1.UserPlan)
                                .set({ isActive: false })
                                .where('idUser = :idUser', { idUser: id_user })
                                .execute();
                            yield this.userPlanRepository
                                .createQueryBuilder()
                                .update(user_plan_entity_1.UserPlan)
                                .set({ isActive: true })
                                .where('idUser = :idUser', { idUser: id_user })
                                .andWhere('idPlan = :idPlan', { idPlan: id_plan })
                                .execute();
                        }
                    }
                    subscription.cancellation_status = status;
                    yield this.subscriptionRepository.save(subscription);
                }
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    captureOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { orderId, userId } = body;
            const request = new paypal.orders.OrdersCaptureRequest(orderId);
            try {
                const response = yield this.payPalClient.execute(request);
                if (response.result.status === 'COMPLETED') {
                    yield this.setCancellationStatus(orderId, 1);
                    const subscription = yield this.subscriptionRepository.findOne({
                        where: { id_order: orderId },
                    });
                    const { id_plan, id_version } = subscription;
                    const userPlan = yield this.userPlanRepository.findOne({
                        where: {
                            idUser: userId,
                            idPlan: id_plan,
                            idVersion: id_version.toString(),
                        },
                    });
                    if (userPlan) {
                        yield this.userPlanRepository
                            .createQueryBuilder()
                            .update(user_plan_entity_1.UserPlan)
                            .set({ isActive: false })
                            .where('idUser = :idUser', { idUser: userId })
                            .execute();
                        yield this.userPlanRepository
                            .createQueryBuilder()
                            .update(user_plan_entity_1.UserPlan)
                            .set({ isActive: true })
                            .where('idUser = :idUser', { idUser: userId })
                            .andWhere('idPlan = :idPlan', { idPlan: id_plan })
                            .execute();
                    }
                }
                return Object.assign(Object.assign({}, response), { healty: true });
            }
            catch (error) {
                return Object.assign(Object.assign({}, error), { healty: false });
            }
        });
    }
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new paypal.orders.OrdersGetRequest(orderId);
            try {
                const response = yield this.payPalClient.execute(request);
                return response;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    getSubscriptionHistory(id_user, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield this.subscriptionRepository
                    .createQueryBuilder('subscription')
                    .where('subscription.id_user = :id_user', { id_user })
                    .leftJoinAndSelect('subscription.paymentGateway', 'paymentGateway')
                    .leftJoinAndSelect('subscription.userDetailsPayment', 'userDetailsPayment')
                    .leftJoinAndSelect('subscription.marketplaceProducts', 'marketplaceProducts')
                    .getMany();
                const subscriptionsWithPlan = yield Promise.all(subscriptions.map((subscription) => __awaiter(this, void 0, void 0, function* () {
                    if (subscription.id_plan === null) {
                        subscription.plan = null;
                        return subscription;
                    }
                    const plan = yield this.planRepository.findOne({
                        where: { idPlan: subscription.id_plan },
                    });
                    subscription.plan = plan;
                    return subscription;
                })));
                let filteredSubscriptions = subscriptionsWithPlan;
                if (name) {
                    filteredSubscriptions = subscriptionsWithPlan.filter((subscription) => subscription.plan && subscription.plan.name === name);
                }
                return subscriptionsWithPlan;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getMarketplaceProductsHistory(id_site) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield this.subscriptionRepository
                    .createQueryBuilder('subscription')
                    .where('subscription.id_site = :id_site', { id_site })
                    .innerJoinAndSelect('subscription.paymentGateway', 'paymentGateway')
                    .innerJoinAndSelect('subscription.userDetailsPayment', 'userDetailsPayment')
                    .innerJoinAndSelect('subscription.marketplaceProducts', 'marketplaceProducts')
                    .getMany();
                const filteredSubscriptions = subscriptions
                    .filter((subscription) => subscription.marketplaceProducts.length > 0 ||
                    subscription.id_plan === null)
                    .map((subscription) => subscription.marketplaceProducts);
                const flatMarketplaceProducts = filteredSubscriptions.flat();
                const products = flatMarketplaceProducts.map((product) => {
                    const { id_product, name_product, price, quantity, points, is_paid_with_points, description, image, } = product;
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
                return products;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.apiUrlLocations);
            return response.data.map((dept) => ({
                id: dept.id,
                name: dept.departamento,
            }));
        });
    }
    getCitiesByDepartmentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.apiUrlLocations);
            const department = response.data.find((dept) => {
                return dept.id === Number(id);
            });
            return department ? department.ciudades : [];
        });
    }
    getPlanByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield this.subscriptionRepository
                    .createQueryBuilder('subscription')
                    .where('subscription.id_user = :userId', { userId })
                    .andWhere('subscription.cancellation_status = 1')
                    .getOne();
                return {
                    id_plan: subscription.id_plan,
                    id_version: subscription.id_version,
                };
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
};
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscriptionsentity_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(plans_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(user_details_payment_entity_1.UserDetailsPayment)),
    __param(3, (0, typeorm_1.InjectRepository)(marketplace_products_entity_1.MarketplaceProduct)),
    __param(4, (0, typeorm_1.InjectRepository)(payment_entity_entity_1.PaymentGateway)),
    __param(5, (0, typeorm_1.InjectRepository)(user_plan_entity_1.UserPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map