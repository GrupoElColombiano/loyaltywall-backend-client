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
exports.TwoFactorAuthenticationMailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../user/entitys/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt = require("jsonwebtoken");
const two_factor_authentication_template_1 = require("../../template/two--factor-authentication/two-factor-authentication.template");
const two_factor_confirmed_template_1 = require("../../template/two--factor-authentication/two-factor-confirmed.template");
let TwoFactorAuthenticationMailService = exports.TwoFactorAuthenticationMailService = class TwoFactorAuthenticationMailService {
    constructor(userEntity, mailerService) {
        this.userEntity = userEntity;
        this.mailerService = mailerService;
    }
    sendTwoFactorAuthenticationMail(mail, domine, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = jwt.sign({ mail: mail }, 'secret', { expiresIn: '1h' });
                const url = `${domine}/${token}`;
                yield this.mailerService.sendMail({
                    to: mail,
                    subject: 'Two Factor Authentication',
                    html: (0, two_factor_authentication_template_1.twoFactorAuthHTML)(mail, firstName, url),
                });
                return {
                    token: token,
                    message: 'Se ha enviado un correo a su cuenta de correo electrónico. Por favor, verifique su bandeja de entrada y complete el proceso de registro.',
                };
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    sendConfirmationTwoFactorAuthenticationMail(firstName, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mailerService.sendMail({
                    to: email,
                    subject: 'Two Factor Authentication',
                    html: (0, two_factor_confirmed_template_1.twoFactorAuthConfirmedHTML)(email, firstName),
                });
            }
            catch (error) {
                console.error(error);
                throw new common_1.NotFoundException(error);
            }
        });
    }
};
exports.TwoFactorAuthenticationMailService = TwoFactorAuthenticationMailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], TwoFactorAuthenticationMailService);
//# sourceMappingURL=two-factor-authentication.mail.service.js.map