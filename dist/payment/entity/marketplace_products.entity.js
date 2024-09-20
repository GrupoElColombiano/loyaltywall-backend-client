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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceProduct = void 0;
const typeorm_1 = require("typeorm");
const subscriptionsentity_entity_1 = require("./subscriptionsentity.entity");
let MarketplaceProduct = exports.MarketplaceProduct = class MarketplaceProduct {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MarketplaceProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscriptionsentity_entity_1.Subscription, (subscription) => subscription.marketplaceProducts),
    (0, typeorm_1.JoinColumn)({ name: 'id_transaction', referencedColumnName: 'id_transaction' }),
    __metadata("design:type", subscriptionsentity_entity_1.Subscription)
], MarketplaceProduct.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], MarketplaceProduct.prototype, "id_transaction", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MarketplaceProduct.prototype, "id_product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MarketplaceProduct.prototype, "name_product", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], MarketplaceProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MarketplaceProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MarketplaceProduct.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MarketplaceProduct.prototype, "is_paid_with_points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarketplaceProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MarketplaceProduct.prototype, "image", void 0);
exports.MarketplaceProduct = MarketplaceProduct = __decorate([
    (0, typeorm_1.Entity)({ name: 'marketplace_products' })
], MarketplaceProduct);
//# sourceMappingURL=marketplace_products.entity.js.map