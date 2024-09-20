"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyModule = void 0;
const common_1 = require("@nestjs/common");
const geography_module_controller_1 = require("./geography-module.controller");
const geography_module_service_1 = require("./geography-module.service");
let GeographyModule = exports.GeographyModule = class GeographyModule {
};
exports.GeographyModule = GeographyModule = __decorate([
    (0, common_1.Module)({
        controllers: [geography_module_controller_1.GeographyController],
        providers: [geography_module_service_1.GeographyService],
    })
], GeographyModule);
//# sourceMappingURL=geography-module.module.js.map