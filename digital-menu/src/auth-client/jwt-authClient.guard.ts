import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtClientAuthGuard extends AuthGuard('jwt-client') {

  handleRequest(err, client, info, context) {
    const req = context.switchToHttp().getRequest();
  
    console.log('Cookies reçus dans la requête:', req.cookies);  // Log des cookies reçus
    console.log('Token JWT trouvé dans les cookies:', req.cookies['access_token']);  // Log du token JWT
  
    if (!req.cookies || !req.cookies['access_token']) {
      console.log('Aucun token trouvé dans les cookies');  // Log si token est manquant
      throw new UnauthorizedException('Token JWT manquant');
    }
  
    if (err || !client) {
      console.error('Erreur d’authentification:', err || info?.message);  // Log d'erreur
      throw new UnauthorizedException('Accès refusé, client non authentifié');
    }
  
    req.client = client;
    return client;
  }
  
  
  
}


