export type UserRolePermissionsType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  rolePermissions: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLogged: Date;
};
