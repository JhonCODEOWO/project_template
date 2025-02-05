import { UserPermissionsGuard } from './user-permissions.guard';

describe('UserPermissionsGuard', () => {
  it('should be defined', () => {
    expect(new UserPermissionsGuard()).toBeDefined();
  });
});
