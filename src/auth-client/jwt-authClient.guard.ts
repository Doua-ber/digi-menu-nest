import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtClientAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, client, info, context) {
        if (err || !client) {
          console.error('Erreur d’authentification:', err || info.message);
          throw new UnauthorizedException('Accès refusé, utilisateur non authentifié');
        }
        const req = context.switchToHttp().getRequest();
        req.client = client; 
        return client;
      }
}