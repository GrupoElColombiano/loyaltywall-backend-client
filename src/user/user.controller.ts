import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@ApiTags('auth')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('/signup')
  async createUser(@Body() userDto: UserDto): Promise<any> {
    const result = await this.userRepository.createUser(userDto);
    return result;
  }

  /*
    Este endpoint es sólo para pruebas, en donde se tenga que eliminar un usuario
    de la base de datos, pero sólo es temporal, se eliminará apenas se finalice.  
  */
  @Post('delete-user')
  async deleteUser(@Body('email') email: string): Promise<any> {
    const result = await this.userRepository.deleteUser(email);
    return result;
  }
}
