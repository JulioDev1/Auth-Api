import { Request, Response } from "express";
import { prisma } from "../database";

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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return response.json({
      error: false,
      message: "user has been registred",
      user,
    });
  } catch (error) {
    return response.json({ message: "error :/" });
  }
};
export const loginOn = async (req: Request, res: Response) => {
  await res.status(200).json({
    users: [
      {
        userName: "klasdjasljas",
        password: "********",
      },
    ],
  });
};
