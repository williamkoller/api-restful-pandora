interface IUser {
  id: string;
}

declare namespace Express {
  interface Request {
    users: IUser;
  }
}
