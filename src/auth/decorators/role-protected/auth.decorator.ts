import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from 'src/common/enums/role.enum';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

//Decorador que permite verificar que un usuario esté logeado y tenga al menos uno de los roles especificados
export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
