import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KeycloakService {
  private authServerUrl: string;
  private realm: string;
  private clientIdNumber: string;
  private clientId: string;
  private clientSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServerUrl = this.configService.get('KEYCLOAK_AUTH_SERVER_URL');
    this.realm = this.configService.get('KEYCLOAK_REALM');
    this.clientIdNumber = this.configService.get('KEYCLOAK_CLIENT_ID_NUMBER');
    this.clientId = this.configService.get('KEYCLOAK_CLIENT_ID');
    this.clientSecret = this.configService.get('KEYCLOAK_SECRET');
  }

  /**
   * Authenticate user and obtain an access token.
   * @param credentials - User login credentials.
   * @returns {Promise<any>} A promise that resolves to the obtained access token.
   */
  async loginToken(): Promise<any> {
    try {
      const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const body = {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      };

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/token`,
          body,
          { headers: headersRequest },
        ),
      );

      return response.data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * List all users.
   * @param tokenAccess - Authorization token.
   * @returns {Promise<any>} A promise that resolves to a list of users.
   */
  async listUsers(tokenAccess: string): Promise<any> {
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `${tokenAccess}`,
      };

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.authServerUrl}/admin/realms/${this.realm}/users`,
          { headers: headersRequest },
        ),
      );

      return response.data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

   /**
   * Edit a user by ID.
   * @param tokenAccess - Authorization token.
   * @param user - User data to update.
   * @param id - User ID.
   * @returns {Promise<any>} A promise that resolves to the updated user data.
   */
   async editUser(tokenAccess: string, user: any, id: string): Promise<any> {
    console.log("user", user, "id", id);
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `${tokenAccess}`,
        'custom-header': 'custom-header-value',
      };
      //console.log('token', tokenAccess);
      const url = `${this.authServerUrl}realms/${this.realm}/loyaltywall-user/update-attributes`;

      console.log('url', url);
      console.log('headers',headersRequest);
      let response: any;
      try{
        response = await firstValueFrom(
          this.httpService.put(url, user, { headers: headersRequest })
        );
      } catch (error) {
        console.log('ERROR WITH HTTP SERVICE PUT TO KEYCLOAK💥💥', error)
      }

      console.log('response status 🙌🙌', response.status)

      if (response.status === 204) {
        return {
          status: 200,
          message: `User with id: ${id} has been edited`,
          user: user,
        };
      } else {
        throw new NotFoundException('Failed to update the user');
      }
    } catch (error) {
      console.log(error, "THIS IS THE ERROR EDITING THE USER💥💥")
      throw new NotFoundException(error.message);
    }
  }


  /**
   * Cambiar la contraseña de un usuario por ID.
   * @param tokenAccess - Token de autorización.
   * @param newPassword - Nueva contraseña para el usuario.
   * @param userId - ID del usuario cuya contraseña se va a cambiar.
   * @returns {Promise<any>} Una promesa que resuelve a los datos actualizados del usuario.
   */
  async changePassword(
    tokenAccess: string,
    newPassword: string,
    id: string,
  ): Promise<any> {
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `${tokenAccess}`,
      };

      const url = `${this.authServerUrl}/admin/realms/${this.realm}/users/${id}/reset-password`;

      const response = await firstValueFrom(
        this.httpService.post(
          url,
          { type: 'password', value: newPassword, temporary: false },
          { headers: headersRequest },
        ),
      );

      console.log('response', response);

      if (response.status === 204) {
        return {
          status: 200,
          message: `Contraseña del usuario con ID: ${id} ha sido cambiada`,
        };
      } else {
        throw new NotFoundException(
          'No se pudo cambiar la contraseña del usuario',
        );
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Find a user by ID.
   * @param tokenAccess - Authorization token.
   * @param id - User ID.
   * @returns {Promise<any>} A promise that resolves to the found user data.
   */
  async findUser(tokenAccess: string, id: any): Promise<any> {
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `${tokenAccess}`,
      };

      const url = `${this.authServerUrl}/admin/realms/${this.realm}/users/${id}`;
      const response = await firstValueFrom(
        this.httpService.get(url, { headers: headersRequest }),
      );

      if (response.status === 200) {
        return response.data; // Return the found user.
      } else if (response.status === 404) {
        throw new NotFoundException('User not found');
      } else {
        throw new Error('Unknown error while searching for the user');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
