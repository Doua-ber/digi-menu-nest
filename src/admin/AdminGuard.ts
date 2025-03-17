import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Utilisateur récupéré dans AdminGuard:', user);

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }

    if (user.role?.titleEng !== 'admin') {
      throw new ForbiddenException('Accès réservé seulement aux administrateurs');
    }

    return true;
  }
}
