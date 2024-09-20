import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly profileRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number): Promise<UserEntity | undefined> {
    return this.profileRepository.findOne({ where: { id } });
  }
}
