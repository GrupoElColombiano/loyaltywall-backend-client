import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/user/entitys/user.entity';

@Injectable()
export class ConfirmCreateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}
  async confirmCreateUser(
    token: string,
    verificationCode: number,
  ): Promise<any> {
    try {
      // Verificar el token y la expiración
      const decodedToken: any = jwt.verify(token, 'secret');
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp <= currentTimestamp) {
        throw new NotFoundException('El código de verificación ha expirado');
      }

      // Obtener el correo electrónico del token decodificado
      const email = decodedToken.email;
      console.log('decode', decodedToken);
      console.log('email', email);
      // Buscar el usuario por el correo electrónico
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException('El usuario no existe');
      }

      if (user.isVerified) {
        throw new NotFoundException('El usuario ya está confirmado');
      }

      // Verificar el código de verificación
      if (user.verificationCode !== verificationCode) {
        console.log('Código de verificación inválido', verificationCode, user);
        throw new NotFoundException('Código de verificación inválido');
      }

      // Marcar al usuario como verificado
      user.isVerified = true;
      await this.userRepository.save(user);

      // Enviar correo de confirmación
      await this.mailerService.sendMail({
        to: email,
        subject: 'Usuario confirmado',
        html: `<h1>¡Usuario confirmado!</h1>
          <p>Hola ${user.firstName}, tu cuenta ha sido confirmada correctamente.</p>
        `,
      });

      return {
        messageConfirmCreateUser: 'El usuario ha sido confirmado exitosamente',
      };
    } catch (error) {
      console.log('Error al confirmar.', error);
      throw new NotFoundException(error.message);
    }
  }
}
