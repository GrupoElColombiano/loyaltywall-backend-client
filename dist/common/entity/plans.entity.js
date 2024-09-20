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
exports.Plan = void 0;
const typeorm_1 = require("typeorm");
const plansproductcategory_entity_1 = require("./plansproductcategory.entity");
let Plan = exports.Plan = class Plan {
    constructor() {
        this.idVersionPlan = 1;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idPlan' }),
    __metadata("design:type", Number)
], Plan.prototype, "idPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idVersionPlan', default: 1, type: 'int' }),
    __metadata("design:type", Object)
], Plan.prototype, "idVersionPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Plan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Plan.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plansproductcategory_entity_1.PlansProductCategory, (plansProductsCategory) => plansProductsCategory.plan),
    __metadata("design:type", Array)
], Plan.prototype, "plansProductsCategory", void 0);
exports.Plan = Plan = __decorate([
    (0, typeorm_1.Entity)({ name: 'plans' })
], Plan);
//# sourceMappingURL=plans.entity.js.map