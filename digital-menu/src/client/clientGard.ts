import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const client = request.client;

    console.log('client récupéré dans ClientGuard:', client);

    

    if (!client) {
      throw new ForbiddenException('client non authentifié');
    }

    return true;
  }
}

     
