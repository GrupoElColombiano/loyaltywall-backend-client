import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserTokenDto } from './dto/auth-user-token.dto';
import { AuthUserDto } from './dto/auth-user-dto';
import { UserEntity } from 'src/user/entitys/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: AuthUserDto): Promise<any> {
    console.log('login usuario sección service', userDto);
    try {
      const user = await this.userRepository.findOne({
        where: { email: userDto.email },
      });

      if (!user) {
        throw new NotAcceptableException('User not found');
      }

      if (!user.isVerified) {
        throw new NotAcceptableException('User not verified');
      }

      const passwordValid = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (!passwordValid) {
        throw new NotAcceptableException('Invalid credentials');
      }

      const payload = { username: user.email };

      return {
        user: user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
