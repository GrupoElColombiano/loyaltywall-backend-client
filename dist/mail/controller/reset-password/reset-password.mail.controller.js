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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordMailController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const reset_password_mail_service_1 = require("../../service/reset-password/reset-password.mail.service");
let ResetPasswordMailController = exports.ResetPasswordMailController = class ResetPasswordMailController {
    constructor(ResetPasswordMailService) {
        this.ResetPasswordMailService = ResetPasswordMailService;
    }
    sendMail(mail, domine) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ResetPasswordMailService.sendPasswordReset(mail, domine);
                return 'Email sent successfully';
            }
            catch (error) {
                if (error instanceof common_2.NotFoundException) {
                    throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                }
                else {
                    console.log('Error en el envío de la info', error);
                    throw new common_1.HttpException('Failed to send the email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
};
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)('mail')),
    __param(1, (0, common_1.Body)('domine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ResetPasswordMailController.prototype, "sendMail", null);
exports.ResetPasswordMailController = ResetPasswordMailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [reset_password_mail_service_1.ResetPasswordMailService])
], ResetPasswordMailController);
//# sourceMappingURL=reset-password.mail.controller.js.map