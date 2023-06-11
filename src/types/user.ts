interface IUser {
  id: number;
  name: String;
  email: String;
  password: String;
}

type JwtPayload = {
  id: number;
};

export { IUser, JwtPayload };
