export interface seedRole {
  name: string;
  description: string;
}

export interface seedPermission {
  name: string;
  description: string;
}

export interface seedUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface seed {
  permissions: seedPermission[];
  roles: seedRole[];
  users: seedUser[];
}
