import { Request, Response } from "express";
import { prisma } from "../database";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";
import { generateAcessToken } from "../utils/jwt";
import { GenerateRefreshTokens } from "../provider/refreshtokens";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return response.json({
        error: true,
        message: "this email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return response.json({
      error: false,
      message: "user has been registred",
      user,
    });
  } catch (error) {
    return response.json({ message: "error :/" });
  }
};
///login de usuario
export const loginUser = async (request: Request, response: Response) => {
  try {
    ///e extraido a propriedade usuario em email
    const { email, password } = request.body;
    // nesse comparado se email informado esta existente no bancco de dados de emails cadastrados
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response.json({
        error: true,
        message: "email not registered",
      });
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return response.json({
        error: true,
        message: "password incorrectly!",
      });
    }

    const token = generateAcessToken(user);

    const generateRefreshToken = await GenerateRefreshTokens(user.id);

    const { password: _, ...userLogin } = user;

    return response.json({
      user: userLogin,
      token: token,
      generateRefreshToken: generateRefreshToken,
    });
  } catch (error) {
    return response.json({ message: "error :/" });
  }
};

export const profileUser = async (request: Request, response: Response) => {
  return response.json(request.user);
};
