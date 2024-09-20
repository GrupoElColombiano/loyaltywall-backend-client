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
exports.PaywallController = void 0;
const common_1 = require("@nestjs/common");
const paywall_service_1 = require("./paywall.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let PaywallController = exports.PaywallController = class PaywallController {
    constructor(paywallService) {
        this.paywallService = paywallService;
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< login executed >>');
            return yield this.paywallService.Login(loginData);
        });
    }
    points(pointsData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< points executed >>');
            return yield this.paywallService.RedemptionOfPoints(pointsData);
        });
    }
    planBuy(planBuyData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< planBuy executed >>');
            return yield this.paywallService.PlanBuy(planBuyData);
        });
    }
    socialMedia(socialMediaData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< socialMedia executed >>');
            return yield this.paywallService.SocialMedia(socialMediaData);
        });
    }
    marketplaceBuy(marketplaceBuyData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< marketplaceBuy executed >>', marketplaceBuyData);
            return yield this.paywallService.MarketplaceBuy(marketplaceBuyData);
        });
    }
    gamificationLevel(gamificationLevelData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<< gamificationLevel executed >>');
            return yield this.paywallService.GamificationLevel(gamificationLevelData);
        });
    }
};
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "login", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('points'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "points", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('planBuy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "planBuy", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('socialMedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "socialMedia", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('marketplaceBuy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "marketplaceBuy", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Post)('gamificationLevel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaywallController.prototype, "gamificationLevel", null);
exports.PaywallController = PaywallController = __decorate([
    (0, common_1.Controller)('paywall'),
    __metadata("design:paramtypes", [paywall_service_1.PaywallService])
], PaywallController);
//# sourceMappingURL=paywall.controller.js.map