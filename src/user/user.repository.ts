import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entitys/user.entity';
import { hashPassword } from 'src/utils/hash-password';
import { TwoFactorAuthenticationMailService } from 'src/mail/service/two-factor-authenticate/two-factor-authentication.mail.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly twoFactorAuthenticationMailService: TwoFactorAuthenticationMailService,
  ) {}

  async createUser(userDto: UserEntity): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userDto.email },
      });

      if (user) {
        throw new NotFoundException('El usuario ya existe');
      }

      if (userDto.password !== userDto.confirmPassword) {
        throw new NotFoundException('Las contraseñas no coinciden');
      }

      const { password, confirmPassword } = userDto;
      const passwordHashed = await hashPassword(password);
      const confirmPasswordHashed = await hashPassword(confirmPassword);
      const userWithHashedPassword: UserEntity = {
        ...userDto,
        password: passwordHashed,
        confirmPassword: confirmPasswordHashed,
      };

      // const sendMail =
      //   await this.twoFactorAuthenticationMailService.sendTwoFactorAuthenticationMail(
      //     userDto.email,
      //     domain,
      //     userDto.firstName,
      //   );

      // Agregar el token al usuario antes de guardarlo
      // userWithHashedPassword.authConfirmToken = sendMail.token;
      console.log('usuario completo', userWithHashedPassword);
      await this.userRepository.save(userWithHashedPassword);

      return {
        messageCreateUser: 'Usuario creado con éxito',
      };
    } catch (error) {
      console.log('error al crear el usuario', error);
      throw new NotFoundException(error.message);
    }
  }

  async getUser(query: object): Promise<UserEntity | undefined> {
    try {
      return this.userRepository.findOne(query);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteUser(email: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('El usuario no existe');
      }
      await this.userRepository.delete({ email });
      return {
        message: 'Usuario eliminado con éxito',
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
