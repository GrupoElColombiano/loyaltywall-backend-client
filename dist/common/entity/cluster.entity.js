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
exports.Cluster = void 0;
const typeorm_1 = require("typeorm");
const event_cluster_entity_1 = require("./event_cluster.entity");
const event_entity_1 = require("./event.entity");
const site_entity_1 = require("./site.entity");
let Cluster = exports.Cluster = class Cluster {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cluster.prototype, "id_cluster", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Cluster.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Cluster.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Cluster.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (event) => event.clusters, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Cluster.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => site_entity_1.Site, (site) => site.clusters, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Cluster.prototype, "sites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_cluster_entity_1.EventCluster, (eventCluster) => eventCluster.clusters),
    (0, typeorm_1.JoinColumn)({ name: 'id_event_cluster' }),
    __metadata("design:type", Array)
], Cluster.prototype, "eventCluster", void 0);
exports.Cluster = Cluster = __decorate([
    (0, typeorm_1.Entity)('cluster')
], Cluster);
//# sourceMappingURL=cluster.entity.js.map