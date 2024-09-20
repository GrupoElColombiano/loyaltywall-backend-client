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
exports.Events = void 0;
const typeorm_1 = require("typeorm");
const points_events_entity_1 = require("./points-events.entity");
let Events = exports.Events = class Events {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Events.prototype, "id_event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => points_events_entity_1.PointsEvents, (pointsValue) => pointsValue.event),
    __metadata("design:type", Array)
], Events.prototype, "pointsValues", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Events.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Events.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Events.prototype, "registration_state", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Events.prototype, "update_at", void 0);
exports.Events = Events = __decorate([
    (0, typeorm_1.Entity)()
], Events);
//# sourceMappingURL=events.entity.js.map