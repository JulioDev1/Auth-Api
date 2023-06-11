import dayjs from "dayjs";
import { prisma } from "../database";

export const GenerateRefreshTokens = async (userId: number) => {
  const expiresIn = dayjs().add(15, "second").unix();
  const generateRefreshToken = await prisma.refreshTokens.create({
    data: {
      userId,
      expiresIn,
    },
  });
  return generateRefreshToken;
};
