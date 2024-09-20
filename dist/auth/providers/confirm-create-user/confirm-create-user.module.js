"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmCreateUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../user/entitys/user.entity");
const confirm_create_user_service_1 = require("./confirm-create-user.service");
const confirm_create_user_controller_1 = require("./confirm-create-user.controller");
let ConfirmCreateUserModule = exports.ConfirmCreateUserModule = class ConfirmCreateUserModule {
};
exports.ConfirmCreateUserModule = ConfirmCreateUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        providers: [confirm_create_user_service_1.ConfirmCreateUserService],
        controllers: [confirm_create_user_controller_1.ConfirmCreateUserController],
    })
], ConfirmCreateUserModule);
//# sourceMappingURL=confirm-create-user.module.js.map