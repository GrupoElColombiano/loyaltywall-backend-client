import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGoogleService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async googleLogin(user: any) {
    if (!user) {
      return 'No user from Google';
    }

    // Buscar usuario por el email recibido de Google
    const foundUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (foundUser) {
      return {
        message: 'User information from Google',
        user: foundUser,
      };
    } else {
      return 'User not found';
    }
  }
}
