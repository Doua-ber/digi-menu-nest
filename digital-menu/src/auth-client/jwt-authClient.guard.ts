import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtClientAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, client, info, context) {
      const req = context.switchToHttp().getRequest();
      
      if (!req.cookies || !req.cookies['access_token']) {

        console.log('Aucun token trouvé dans les cookies');
        throw new UnauthorizedException('Token JWT manquant');
      }
        if (err || !client) {
          console.error('Erreur d’authentification:', err || info.message);
          throw new UnauthorizedException('Accès refusé, client non authentifié');
        }
        
        req.client = client; 
        return client;
      }
}