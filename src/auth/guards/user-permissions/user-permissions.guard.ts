import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY_METADATA } from 'src/auth/decorators/permission-protected/permission-protected.decorator';
import { User } from 'src/auth/entities/users.entity';
import { ValidPermissions } from 'src/common/enums/permission.enum';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtener permisos a validar
    const validPermissions: ValidPermissions[] = this.reflector.get(
      PERMISSIONS_KEY_METADATA,
      context.getHandler(),
    );

    console.log(validPermissions);

    //Obtener usuario de la petición
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user)
      throw new UnauthorizedException(
        `It seems like you arent logged yet, be sure to authenticate before.`,
      );
    const permissions: string[] = [];

    //Recorrer roles y obtener los permisos
    for (const role of user.roles) {
      for (const permission of role.permisssions) {
        permissions.push(permission.name);
      }
    }

    //Validar que los permisos estén incluidos en el usuario.
    if (validPermissions.some((perm) => permissions.includes(perm))) {
      return true;
    }
    throw new UnauthorizedException(
      `You can access to this endpoint witouth the ${validPermissions} permission(s)`,
    );
  }
}
