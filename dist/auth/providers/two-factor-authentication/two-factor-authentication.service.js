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
exports.TwoFactorAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const two_factor_authentication_mail_service_1 = require("../../../mail/service/two-factor-authenticate/two-factor-authentication.mail.service");
const user_entity_1 = require("../../../user/entitys/user.entity");
const typeorm_2 = require("typeorm");
let TwoFactorAuthenticationService = exports.TwoFactorAuthenticationService = class TwoFactorAuthenticationService {
    constructor(userRepository, twoFactorAuthenticationMailService) {
        this.userRepository = userRepository;
        this.twoFactorAuthenticationMailService = twoFactorAuthenticationMailService;
    }
    confirmTwoFactorAuthentication(token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('token', token);
            const user = yield this.userRepository.findOne({
                where: { authConfirmToken: token },
            });
            if (!user) {
                throw new Error('No existe el usuario');
            }
            if (user.isVerified) {
                return {
                    message: 'El usuario ya está verificado',
                };
            }
            user.isVerified = true;
            console.log('user', user);
            yield this.userRepository.save(user);
            yield this.twoFactorAuthenticationMailService.sendConfirmationTwoFactorAuthenticationMail(user.firstName, user.email);
            return {
                message: 'Usuario creado con éxito',
            };
        });
    }
};
exports.TwoFactorAuthenticationService = TwoFactorAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        two_factor_authentication_mail_service_1.TwoFactorAuthenticationMailService])
], TwoFactorAuthenticationService);
//# sourceMappingURL=two-factor-authentication.service.js.map