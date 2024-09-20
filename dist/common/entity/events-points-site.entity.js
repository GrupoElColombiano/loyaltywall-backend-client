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
exports.EventsPointsSite = void 0;
const typeorm_1 = require("typeorm");
const points_events_entity_1 = require("./points-events.entity");
let EventsPointsSite = exports.EventsPointsSite = class EventsPointsSite {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventsPointsSite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => points_events_entity_1.PointsEvents, { eager: true }),
    __metadata("design:type", points_events_entity_1.PointsEvents)
], EventsPointsSite.prototype, "pointsEvents", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventsPointsSite.prototype, "eventIdEvent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventsPointsSite.prototype, "siteIdSite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventsPointsSite.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EventsPointsSite.prototype, "registration_state", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], EventsPointsSite.prototype, "expiration_date", void 0);
exports.EventsPointsSite = EventsPointsSite = __decorate([
    (0, typeorm_1.Entity)()
], EventsPointsSite);
//# sourceMappingURL=events-points-site.entity.js.map