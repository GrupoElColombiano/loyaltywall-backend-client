// /* eslint-disable prettier/prettier */
// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
// import { UserDto } from 'src/user/dto/user.dto';
// import { AuthUserDto } from '../dto/auth-user-dto';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(userDto: UserDto): Promise<AuthUserDto> {
//     const user = await this.authService.validateUser(userDto);
//     if (!user) {
//       throw new UnauthorizedException({
//         message: 'Acceso denegado. No tiene autorización para realizar esta acción.',
//       });
//     }
//     return user;
//   }
// }
