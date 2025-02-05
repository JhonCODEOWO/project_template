import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/common/enums/role.enum';

export const METADATA_KEY_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(METADATA_KEY_ROLES, args);
