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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo firstName es obligatorio' }),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo lastName es obligatorio' }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'johndoe@example.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo email es obligatorio' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El campo email debe ser un correo electrónico válido' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '********' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo password es obligatorio' }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '********' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo confirmPassword es obligatorio' }),
    __metadata("design:type", String)
], UserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3244760644' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo celular es obligatorio' }),
    __metadata("design:type", Number)
], UserDto.prototype, "celular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo isSelectedInfo es obligatorio' }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isSelectedInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo isSelectedPolicy es obligatorio' }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isSelectedPolicy", void 0);
//# sourceMappingURL=user.dto.js.map