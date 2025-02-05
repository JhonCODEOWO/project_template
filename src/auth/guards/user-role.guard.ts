import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/users.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtener roles del metadata
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    const user = req.user as User;

    if (!user)
      throw new UnauthorizedException(
        `Cant get a user from the request, verify that u are logged in`,
      );

    //Recorrer roles del usuario y verificar que coincida con el solicitado
    for (const role of user.roles) {
      if (validRoles.includes(role.name)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.name} dont have the role to access to this route. Valid role(s): [${validRoles}]`,
    );
  }
}
