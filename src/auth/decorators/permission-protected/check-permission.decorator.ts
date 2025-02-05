import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidPermissions } from 'src/common/enums/permission.enum';
import { PermissionProtected } from './permission-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserPermissionsGuard } from 'src/auth/guards/user-permissions/user-permissions.guard';

export function CheckPermission(...permission: ValidPermissions[]) {
  return applyDecorators(
    PermissionProtected(...permission),
    UseGuards(AuthGuard(), UserPermissionsGuard),
  );
}
