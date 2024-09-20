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
exports.ResetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../user/entitys/user.entity");
const hash_password_1 = require("../../../utils/hash-password");
const jwt = require("jsonwebtoken");
const reset_password_entity_1 = require("../../../mail/entitys/reset-password.entity");
let ResetPasswordService = exports.ResetPasswordService = class ResetPasswordService {
    constructor(userRepository, resetPasswordRepository) {
        this.userRepository = userRepository;
        this.resetPasswordRepository = resetPasswordRepository;
    }
    resetPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenDecode = jwt.verify(token, 'secret');
                if (tokenDecode.exp < Math.floor(Date.now() / 1000)) {
                    throw new common_1.NotFoundException('Token expirado');
                }
                const resetPasswordUser = yield this.resetPasswordRepository.findOne({
                    where: { token: token },
                });
                if (!resetPasswordUser) {
                    throw new common_1.NotFoundException('Token no encontrado');
                }
                const user = yield this.userRepository.findOne({
                    where: { email: resetPasswordUser.email },
                });
                if (!user) {
                    throw new common_1.NotFoundException('Usuario no encontrado');
                }
                console.log('password', password);
                const hashedPassword = yield (0, hash_password_1.hashPassword)(password);
                user.password = hashedPassword;
                yield this.userRepository.save(user);
                yield this.resetPasswordRepository.delete(resetPasswordUser.id);
                return {
                    message: 'Contraseña actualizada',
                };
            }
            catch (error) {
                throw new common_1.NotFoundException(error.message);
            }
        });
    }
};
exports.ResetPasswordService = ResetPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(reset_password_entity_1.ResetPasswordEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ResetPasswordService);
//# sourceMappingURL=reset-password.service.js.map