import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('Utilisateur extrait dans JwtAuthGuard:', user);
    if (err || !user) {
      console.log('Erreur ou utilisateur non trouvé:', err, info);
      throw err || new UnauthorizedException('Non autorisé');
    }
    return user;
  }
  

}