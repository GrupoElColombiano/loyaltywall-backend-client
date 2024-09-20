import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/user.repository';
import { JwtStrategy } from './autenticacion/jwt.strategy';
import { RolesGuard } from './autorizacion/roles.guard';
import { TIME } from './const/time';
import { SECRET } from './const/secret';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './providers/auth-google/auth-google.module';
import { AuthFacebookModule } from './providers/auth-facebook/auth-facebook.module';
import { UserEntity } from 'src/user/entitys/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { ResetPasswordModule } from './providers/reset-password/reset-password.module';
import { TwoFactorAuthenticationModule } from './providers/two-factor-authentication/two-factor-authentication.module';
import { ConfirmCreateUserModule } from './providers/confirm-create-user/confirm-create-user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: TIME },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthGoogleModule,
    AuthFacebookModule,
    MailModule,
    ResetPasswordModule,
    TwoFactorAuthenticationModule,
    ConfirmCreateUserModule,
  ],
  providers: [UserRepository, JwtStrategy, RolesGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
