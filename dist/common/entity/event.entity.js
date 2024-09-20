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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const event_cluster_entity_1 = require("./event_cluster.entity");
const cluster_entity_1 = require("./cluster.entity");
const site_entity_1 = require("./site.entity");
let Event = exports.Event = class Event {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id_event", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Event.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Event.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_cluster_entity_1.EventCluster, (event_cluster) => event_cluster.events),
    (0, typeorm_1.JoinColumn)({ name: 'id_event_cluster' }),
    __metadata("design:type", Array)
], Event.prototype, "event_cluster", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => cluster_entity_1.Cluster, (cluster) => cluster.events),
    __metadata("design:type", Array)
], Event.prototype, "clusters", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => site_entity_1.Site, (site) => site.events),
    __metadata("design:type", Array)
], Event.prototype, "sites", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
//# sourceMappingURL=event.entity.js.map