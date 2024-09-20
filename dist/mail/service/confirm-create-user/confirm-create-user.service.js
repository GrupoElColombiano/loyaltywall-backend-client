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
exports.ConfirmCreateUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../user/entitys/user.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const jwt = require("jsonwebtoken");
let ConfirmCreateUserService = exports.ConfirmCreateUserService = class ConfirmCreateUserService {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
    }
    sendConfirmCreateUser(email, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { email },
                });
                if (!user) {
                    throw new common_1.NotFoundException('El usuario no existe');
                }
                if (user.isVerified) {
                    throw new common_1.NotFoundException('El usuario ya está confirmado');
                }
                const verificationCode = Math.floor(100000 + Math.random() * 900000);
                const token = jwt.sign({ email: user.email }, 'secret', {
                    expiresIn: '1h',
                });
                user.verificationCode = verificationCode;
                yield this.userRepository.save(user);
                const confirmationUrl = `${domain}/${token}`;
                yield this.mailerService.sendMail({
                    to: email,
                    subject: 'Confirmación de usuario',
                    html: `<h1>Bienvenido, ${user.firstName}!</h1>
          <p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
          <a href="${confirmationUrl}">${confirmationUrl}</a>
          <p>Tu código de verificación es: ${verificationCode}</p>
        `,
                });
                return {
                    messageConfirmCreateUser: 'Verifica tu correo electrónico para confirmar tu cuenta',
                };
            }
            catch (error) {
                console.log('Error al confirmar el usuario', error);
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
};
exports.ConfirmCreateUserService = ConfirmCreateUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], ConfirmCreateUserService);
//# sourceMappingURL=confirm-create-user.service.js.map