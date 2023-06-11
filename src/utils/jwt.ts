import jwt from "jsonwebtoken";
import { IUser } from "src/types/user";

export function generateAcessToken(user: IUser) {
  return jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
    expiresIn: "12h",
  });
}
export function generateAuthorizationToken(token: string) {
  return jwt.verify(token, process.env.JWT_PASS ?? "");
}
