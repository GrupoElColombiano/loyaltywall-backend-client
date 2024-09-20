import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TwoFactorAuthenticationMailService } from 'src/mail/service/two-factor-authenticate/two-factor-authentication.mail.service';
import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly twoFactorAuthenticationMailService: TwoFactorAuthenticationMailService,
  ) {}

  async confirmTwoFactorAuthentication(token: string): Promise<any> {
    console.log('token', token);
    const user = await this.userRepository.findOne({
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
    await this.userRepository.save(user);
    await this.twoFactorAuthenticationMailService.sendConfirmationTwoFactorAuthenticationMail(
      user.firstName,
      user.email,
    );
    return {
      message: 'Usuario creado con éxito',
    };
  }
}
