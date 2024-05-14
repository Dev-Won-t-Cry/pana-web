import { prisma } from "@/app/server/prisma";
import { UpdateListType } from "@/types/list";
import { List } from "@prisma/client";

export async function getLists(frameId: string) {
  try {
    const lists = await prisma.list.findMany({
      where: {
        frameId
      },
      include: {
        cards: true,
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

export async function updateList(listId: string, data: UpdateListType) {
  try {
    const list = await prisma.list.update({
      data,
      where: {
        id: listId
      }
    })
    return list
  } catch (error) {
    console.error(error)
  }
}

export async function deleteList(listId: string) {
  try {
    const list = await prisma.list.delete({
      where: {
        id: listId
      }
    })
    return list
  } catch (error) {
    console.error(error)
  }
}