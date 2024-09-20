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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const gamification_service_1 = require("../service/gamification.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let GamificationController = exports.GamificationController = class GamificationController {
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    findPointValueBySite(idSite, userId, page, limit, type) {
        return this.gamificationService.findPointValueBySite(idSite, userId, page, limit, type);
    }
    ListPointsToBeAddressed(userId) {
        return this.gamificationService.ListPointsToBeAddressed(userId);
    }
    getAdvanceCluster(idSite, idKeycloak) {
        return this.gamificationService.getAdvanceCluster(idSite, idKeycloak);
    }
    getTotalPoints(userId) {
        console.log('userId', userId);
        return this.gamificationService.getTotalPoints(userId);
    }
    getPlan(idKeycloak) {
        console.log('idKeycloak', idKeycloak);
        return this.gamificationService.getPlan(idKeycloak);
    }
};
__decorate([
    (0, common_1.Get)('/point_value/filter-pagination/:idSite/:userId/:page/:limit/:type'),
    __param(0, (0, common_1.Param)('idSite')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __param(4, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "findPointValueBySite", null);
__decorate([
    (0, common_1.Get)('/point_tobe_addressed/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "ListPointsToBeAddressed", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Get)('/advance_cluster/:idSite/:idKeycloak'),
    __param(0, (0, common_1.Param)('idSite')),
    __param(1, (0, common_1.Param)('idKeycloak')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getAdvanceCluster", null);
__decorate([
    (0, nest_keycloak_connect_1.Public)(true),
    (0, common_1.Get)('/total_point/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getTotalPoints", null);
__decorate([
    (0, common_1.Get)('/plan/:idKeycloak'),
    __param(0, (0, common_1.Param)('idKeycloak')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getPlan", null);
exports.GamificationController = GamificationController = __decorate([
    (0, common_1.Controller)('gamification'),
    (0, nest_keycloak_connect_1.Unprotected)(),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], GamificationController);
//# sourceMappingURL=gamification.controller.js.map