/* eslint-disable prettier/prettier */
export interface JwtPayload {
    username: string;
    sub: string;
    iat: number;
    exp: number;
  }