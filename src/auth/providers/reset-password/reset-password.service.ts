import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { hashPassword } from 'src/utils/hash-password';
import * as jwt from 'jsonwebtoken';
import { ResetPasswordEntity } from 'src/mail/entitys/reset-password.entity';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ResetPasswordEntity)
    private readonly resetPasswordRepository: Repository<ResetPasswordEntity>,
  ) {}

  async resetPassword(token: string, password: string) {
    try {
      const tokenDecode: any = jwt.verify(token, 'secret');
      if (tokenDecode.exp < Math.floor(Date.now() / 1000)) {
        throw new NotFoundException('Token expirado');
      }

      const resetPasswordUser = await this.resetPasswordRepository.findOne({
        where: { token: token },
      });

      if (!resetPasswordUser) {
        throw new NotFoundException('Token no encontrado');
      }

      const user = await this.userRepository.findOne({
        where: { email: resetPasswordUser.email },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      console.log('password', password);
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      await this.userRepository.save(user);
      await this.resetPasswordRepository.delete(resetPasswordUser.id);

      return {
        message: 'Contraseña actualizada',
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
