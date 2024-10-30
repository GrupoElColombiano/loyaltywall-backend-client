import {
  Controller,
  Put,
  Body,
  Param,
  Headers,
  Post,
  Get,
} from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { Public } from 'nest-keycloak-connect';

@Controller('keycloak')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) { }

  /**
   * Login and retrieve an authentication token.
   * @param credentials - User credentials for login.
   * @returns {Promise<any>} A promise that resolves to the authentication token.
   */
  @Public(true)
  @Post('token')
  async login(): Promise<any> {
    return await this.keycloakService.loginToken();
  }

  /**
   * List all users.
   * @param tokenAccess - Authorization token.
   * @returns {Promise<any>} A promise that resolves to a list of users.
   */
  @Public(true)
  @Get('users/list')
  async listUsers(@Headers('Authorization') tokenAccess: string): Promise<any> {
    console.log('token', tokenAccess);
    return await this.keycloakService.listUsers(tokenAccess);
  }

  /**
   * Edit a user by ID.
   * @param user - User data to update.
   * @param id - User ID.
   * @param tokenAccess - Authorization token.
   * @returns {Promise<any>} A promise that resolves to the updated user data.
   */
  @Public(true)
  @Put('users/edit/:id')
  async editUser(
    @Body() user: any,
    @Param('id') id: any,
    @Headers('Authorization') tokenAccess: string,
  ): Promise<any> {
    return await this.keycloakService.editUser(tokenAccess, user, id);
  }

  /**
   * Cambiar la contraseña de un usuario por ID.
   * @param newPassword - Nueva contraseña para el usuario.
   * @param id - ID del usuario.
   * @param tokenAccess - Token de autorización.
   * @returns {Promise<any>} Una promesa que resuelve a los datos actualizados del usuario.
   */
  @Public(true)
  @Put('users/change-password/:id')
  async changePassword(
    @Body() newPassword: any,
    @Param('id') id: any,
    @Headers('Authorization') tokenAccess: string,
  ): Promise<any> {
    console.log(newPassword);
    return await this.keycloakService.changePassword(
      tokenAccess,
      newPassword,
      id,
    );
  }

  /**
   * Find a user by ID.
   * @param tokenAccess - Authorization token.
   * @param id - User ID.
   * @returns {Promise<any>} A promise that resolves to the found user data.
   */
  @Public(true)
  @Get('users/:id')
  async listUser(
    @Headers('Authorization') tokenAccess: string,
    @Param('id') id: any,
  ): Promise<any> {
    console.log('token', tokenAccess);
    return await this.keycloakService.findUser(tokenAccess, id);
  }
}
