import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Utilisateur récupéré dans ManagerGuard:', user);

    

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }
    //if (user.role?.titleEng !== 'manager'){

    if (!(user instanceof Manager)) {


        throw new ForbiddenException('Accès réservé seulement aux managers');
      }
      

    return true;
  }
}
