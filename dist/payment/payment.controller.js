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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let PaymentController = exports.PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createOrder(createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Data que viene desde frontend para evertec 🔥', createOrderDto);
            const result = yield this.paymentService.createOrderEvertec(createOrderDto);
            console.log('🚀 ~ PaymentController ~ createOrder ~ result:', result);
            return result;
        });
    }
    checkTransactionStatus(requestId, idSite) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.checkTransactionStatus({
                requestId,
                idSite,
            });
            return result;
        });
    }
    handleNotification(notificationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.handleNotification(notificationData);
            return result;
        });
    }
    createOrderPaypal(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('amount', orderData);
                const response = yield this.paymentService.createOrderPaypal(orderData);
                return response;
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    webhook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('webhook', body);
            try {
                const response = yield this.paymentService.webhook(body);
                return response;
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    captureOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('la orden ingresó: ', body);
            try {
                const response = yield this.paymentService.captureOrder(body);
                return response;
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.paymentService.getOrder(id);
                return response;
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getSubscriptions(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.getSubscriptionHistory(userId);
            return result;
        });
    }
    getSubscriptionsBySite(idSite) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.paymentService.getMarketplaceProductsHistory(idSite);
            return result;
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentService.getAllDepartments();
        });
    }
    getCitiesByDepartmentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentService.getCitiesByDepartmentId(id);
        });
    }
};
__decorate([
    (0, common_1.Post)('evertec/create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('evertec/check-status/:requestId/:idSite'),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, common_1.Param)('idSite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkTransactionStatus", null);
__decorate([
    (0, common_1.Post)('notifications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleNotification", null);
__decorate([
    (0, common_1.Post)('paypal/create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrderPaypal", null);
__decorate([
    (0, common_1.Post)('paypal/webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "webhook", null);
__decorate([
    (0, common_1.Post)('paypal/capture-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "captureOrder", null);
__decorate([
    (0, common_1.Get)('paypal/order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('subscriptions/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getSubscriptions", null);
__decorate([
    (0, common_1.Get)('subscriptions/site/:idSite'),
    __param(0, (0, common_1.Param)('idSite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getSubscriptionsBySite", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllDepartments", null);
__decorate([
    (0, common_1.Get)('departments/:id/cities'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getCitiesByDepartmentId", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map