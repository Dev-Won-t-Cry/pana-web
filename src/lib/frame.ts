import { prisma } from "@/app/server/prisma";

export async function getFrames(userId: string) {
  try {
    const frames = await prisma.frame.findMany({
      where: {
        userId
      },
      include: {
        user: true
      }
    })
    return frames
  } catch (error) {
    console.error(error)
  }
}

export async function createFrame(title: string, userId: string) {
  try {
    const frame = await prisma.frame.create({
      data: {
        title,
        userId,
      }
    })
    return frame
  } catch (error) {
    console.error(error)
  }
}