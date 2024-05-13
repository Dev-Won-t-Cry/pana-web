import { prisma } from "@/app/server/prisma";

export async function getLists(frameId: string) {
  try {
    const lists = await prisma.list.findMany({
      where: {
        frameId
      },
      include: {
        cards: true
      }
    })
    return lists
  } catch (error) {
    console.error(error)
  }
}

export async function createList(title: string, frameId: string, order: number) {
  try {
    const list = await prisma.list.create({
      data: {
        title,
        frameId,
        order
      }
    })
    return list
  } catch (error) {
    console.error(error)
  }
}