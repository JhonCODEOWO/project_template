import { SetMetadata } from '@nestjs/common';
import { ValidPermissions } from 'src/common/enums/permission.enum';

export const PERMISSIONS_KEY_METADATA = 'permissions';

export const PermissionProtected = (...args: ValidPermissions[]) =>
  SetMetadata(PERMISSIONS_KEY_METADATA, args);
