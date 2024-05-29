import { prisma } from "@/app/server/prisma";
import { hashSync } from "bcryptjs";

export async function signUp(name: string, email: string, password: string) {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (userExists) {
      return Promise.reject('Usuário já cadastrado')
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10)
      }
    })

    return user
  } catch (error) {
    console.error(error)
  }
}