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
exports.PlansProductCategory = void 0;
const typeorm_1 = require("typeorm");
const plans_entity_1 = require("./plans.entity");
let PlansProductCategory = exports.PlansProductCategory = class PlansProductCategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idPlansProductCategory' }),
    __metadata("design:type", Number)
], PlansProductCategory.prototype, "idPlansProductCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plans_entity_1.Plan, (plan) => plan.plansProductsCategory),
    (0, typeorm_1.JoinColumn)({ name: 'idPlan' }),
    __metadata("design:type", plans_entity_1.Plan)
], PlansProductCategory.prototype, "plan", void 0);
exports.PlansProductCategory = PlansProductCategory = __decorate([
    (0, typeorm_1.Entity)({ name: 'PlansProductCategory' })
], PlansProductCategory);
//# sourceMappingURL=plansproductcategory.entity.js.map