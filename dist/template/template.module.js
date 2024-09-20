"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateModule = void 0;
const common_1 = require("@nestjs/common");
const template_service_1 = require("./template.service");
const template_controller_1 = require("./template.controller");
const mongoose_1 = require("@nestjs/mongoose");
const template_schema_1 = require("./entities/template.schema");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../common/entity/event.entity");
const site_entity_1 = require("../common/entity/site.entity");
const points_events_entity_1 = require("../common/entity/points-events.entity");
const events_points_site_entity_1 = require("../common/entity/events-points-site.entity");
let TemplateModule = exports.TemplateModule = class TemplateModule {
};
exports.TemplateModule = TemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event, points_events_entity_1.PointsEvents, events_points_site_entity_1.EventsPointsSite, site_entity_1.Site]),
            mongoose_1.MongooseModule.forFeature([
                { name: template_schema_1.Template.name, schema: template_schema_1.TemplateSchema },
            ]),
        ],
        controllers: [template_controller_1.TemplateController],
        providers: [template_service_1.TemplateService],
        exports: [template_service_1.TemplateService],
    })
], TemplateModule);
//# sourceMappingURL=template.module.js.map