import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Utilisateur récupéré dans ManagerGuard:', user);
    console.log(`user.type: "${user.type}" | type attendu: "Manager"`);

    

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }
    //if (user.role?.titleEng !== 'manager'){

    if (user?.type?.trim().toLowerCase() !== 'manager') {
        throw new ForbiddenException('Accès réservé seulement aux managers');
      }
      

    return true;
  }
}

     
