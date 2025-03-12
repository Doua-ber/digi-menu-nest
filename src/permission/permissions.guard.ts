import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    
  } from '@nestjs/common';
  import { PERMISSIONS_KEY } from './permissions.decorator';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // Assure-toi que l'utilisateur est présent dans la requête
  
    console.log('Utilisateur extrait de la requête:', user);
  
    if (!user) {
      throw new ForbiddenException('Utilisateur non autorisé');
    }
  
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Permissions récupérées via Reflector:', requiredPermissions);
    
    if (!requiredPermissions) {
      return true;  // Si aucune permission n'est définie, on autorise l'accès
    }
  
    const userPermissions = user.role?.permissions?.map((p) => p.titleEng) || [];
    console.log('Permissions de l’utilisateur:', userPermissions);
  
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.map(p => p.toLowerCase()).includes(perm.toLowerCase()),
    );
    
    if (!hasPermission) {
      throw new ForbiddenException('Vous n’avez pas les droits nécessaires.');
    }
  
    return true;
  }
}