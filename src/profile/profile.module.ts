import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
