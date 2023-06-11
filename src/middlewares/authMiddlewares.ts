import { NextFunction, Request, Response } from "express";
import { generateAuthorizationToken } from "../utils/jwt";
import { JwtPayload } from "../types/user";
import { prisma } from "../database";

export const authMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.json({
      error: true,
      message: "not authorized",
    });
  }

  const token = authorization.split(" ")[1];
  console.log(token);

  const { id } = generateAuthorizationToken(token) as JwtPayload;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    response.json({
      error: true,
      message: "not authorized",
    });
  }

  const { password: _, ...loggedUser } = user as NonNullable<typeof user>;
  request.user = loggedUser;
  next();
};
