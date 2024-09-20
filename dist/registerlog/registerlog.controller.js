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
exports.RegisterlogController = void 0;
const common_1 = require("@nestjs/common");
const registerlog_service_1 = require("./registerlog.service");
let RegisterlogController = exports.RegisterlogController = class RegisterlogController {
    constructor(registerlogService) {
        this.registerlogService = registerlogService;
    }
    createRegisterlog(registerlogDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.registerlogService.create(registerlogDto);
        });
    }
    createPaymentTransactions(paymentTransactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    createPaymentTransaction(paymentTransactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.registerlogService.findAll();
        });
    }
    findAllPaymentTransaction(paymentTransactionDto) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterlogController.prototype, "createRegisterlog", null);
__decorate([
    (0, common_1.Post)('createPaymentTransaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterlogController.prototype, "createPaymentTransactions", null);
__decorate([
    (0, common_1.Post)('createPaymentTransaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterlogController.prototype, "createPaymentTransaction", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegisterlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findAllPaymentTransaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterlogController.prototype, "findAllPaymentTransaction", null);
exports.RegisterlogController = RegisterlogController = __decorate([
    (0, common_1.Controller)('registerlog'),
    __metadata("design:paramtypes", [registerlog_service_1.RegisterlogService])
], RegisterlogController);
//# sourceMappingURL=registerlog.controller.js.map