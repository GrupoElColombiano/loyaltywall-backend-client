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
exports.Site = void 0;
const typeorm_1 = require("typeorm");
const cluster_entity_1 = require("./cluster.entity");
const event_entity_1 = require("./event.entity");
const event_cluster_entity_1 = require("./event_cluster.entity");
let Site = exports.Site = class Site {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Site.prototype, "idSite", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Site.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Site.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], Site.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Site.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Site.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Site.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => cluster_entity_1.Cluster, (cluster) => cluster.sites),
    __metadata("design:type", Array)
], Site.prototype, "clusters", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (event) => event.sites, { nullable: true }),
    __metadata("design:type", Array)
], Site.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_cluster_entity_1.EventCluster, (eventCluster) => eventCluster.site),
    (0, typeorm_1.JoinColumn)({ name: 'id_event_cluster' }),
    __metadata("design:type", event_cluster_entity_1.EventCluster)
], Site.prototype, "event_clusters", void 0);
exports.Site = Site = __decorate([
    (0, typeorm_1.Entity)()
], Site);
//# sourceMappingURL=site.entity.js.map