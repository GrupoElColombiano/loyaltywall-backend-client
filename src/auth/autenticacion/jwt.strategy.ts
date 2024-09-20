/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../dto/auth-jwtpayload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }
  
  async validate(payload: JwtPayload) {
    console.log('generador del user', payload);
    const user = { userId: payload.sub, username: payload.username };
    if (!user) {
      throw new UnauthorizedException({ message: 'Acceso denegado. No tiene autorización para realizar esta acción.'});
    }
    return user;
  }
}
