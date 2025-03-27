import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    console.log('Cookies reçus dans JwtAuthGuard:', request.cookies);

    if (!request.cookies || !request.cookies['auth_token']) {

      console.log('Aucun token trouvé dans les cookies');
      throw new UnauthorizedException('Token JWT manquant');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log(' Utilisateur extrait dans JwtAuthGuard:', user);

    if (err || !user) {
      console.log(' Erreur ou utilisateur non trouvé:', err, info);
      throw err || new UnauthorizedException('Non autorisé');
    }
    return user;
  }
}
