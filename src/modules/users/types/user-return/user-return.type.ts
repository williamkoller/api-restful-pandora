export type UserReturnType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogged?: Date;
};
