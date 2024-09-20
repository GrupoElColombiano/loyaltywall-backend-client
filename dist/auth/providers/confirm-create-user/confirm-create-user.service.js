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
const mailer_1 = require("@nestjs-modules/mailer");
const jwt = require("jsonwebtoken");
const user_entity_1 = require("../../../user/entitys/user.entity");
let ConfirmCreateUserService = exports.ConfirmCreateUserService = class ConfirmCreateUserService {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
    }
    confirmCreateUser(token, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = jwt.verify(token, 'secret');
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (decodedToken.exp <= currentTimestamp) {
                    throw new common_1.NotFoundException('El código de verificación ha expirado');
                }
                const email = decodedToken.email;
                console.log('decode', decodedToken);
                console.log('email', email);
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user) {
                    throw new common_1.NotFoundException('El usuario no existe');
                }
                if (user.isVerified) {
                    throw new common_1.NotFoundException('El usuario ya está confirmado');
                }
                if (user.verificationCode !== verificationCode) {
                    console.log('Código de verificación inválido', verificationCode, user);
                    throw new common_1.NotFoundException('Código de verificación inválido');
                }
                user.isVerified = true;
                yield this.userRepository.save(user);
                yield this.mailerService.sendMail({
                    to: email,
                    subject: 'Usuario confirmado',
                    html: `<h1>¡Usuario confirmado!</h1>
          <p>Hola ${user.firstName}, tu cuenta ha sido confirmada correctamente.</p>
        `,
                });
                return {
                    messageConfirmCreateUser: 'El usuario ha sido confirmado exitosamente',
                };
            }
            catch (error) {
                console.log('Error al confirmar.', error);
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