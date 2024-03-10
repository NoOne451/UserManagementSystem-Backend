import { prisma } from '../prisma/index.js';
export const findUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
