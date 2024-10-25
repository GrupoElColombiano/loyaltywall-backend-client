import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (request?.url === '/') {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      // Verify the token using Keycloak's JWKS endpoint
      const payload = await this.verifyTokenWithKeycloak(token);
      request.user = payload; // Attach the payload to the request
      return true;
    } catch (error) {
      console.log(error, "💥💥💥 FROM PAYLOAD VALIDATION");
      throw new UnauthorizedException('Token validation failed');
    }
  }

  // Extract token from the Authorization header
  private extractTokenFromRequest(request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    return authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  }

  // Verify the token using Keycloak's JWKS endpoint with fetch
  async verifyTokenWithKeycloak(token: string): Promise<any> {
    const jwksUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`;
    
    // Use fetch to get JWKS data
    const response = await fetch(jwksUrl);
    
    if (!response.ok) {
      throw new UnauthorizedException('Failed to fetch JWKS');
    }

    const data = await response.json();
   
    // Decode the token to get the `kid`
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Find the signing key in the JWKS
    const signingKey = data.keys.find(key => key.kid === decodedToken.header.kid);
    if (!signingKey) {
      throw new UnauthorizedException('Signing key not found');
    }

    // Format the public key properly
    const publicKey = `-----BEGIN CERTIFICATE-----\n${signingKey.x5c[0]}\n-----END CERTIFICATE-----`;

    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          reject(new UnauthorizedException('Token validation failed'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
