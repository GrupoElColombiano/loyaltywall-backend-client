import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';
import { ConfirmCreateUserService } from './confirm-create-user.service';
import { ConfirmCreateUserController } from './confirm-create-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [ConfirmCreateUserService],
  controllers: [ConfirmCreateUserController],
})
export class ConfirmCreateUserModule {}
