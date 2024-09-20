import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
// import { GoogleStrategy } from './strategy/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entitys/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  // providers: [AuthGoogleService, GoogleStrategy],
  providers: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
