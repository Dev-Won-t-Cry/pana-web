import { prisma } from "@/app/server/prisma";

export async function getCards(listId: string) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        listId
      }
    })
    return cards
  } catch (error) {
    console.error(error)
  }
}

export async function createCard(title: string, listId: string, order: number) {
  try {
    const card = await prisma.card.create({
      data: {
        title,
        listId,
        status: "Todo",
        order
      }
    })
    return card
  } catch (error) {
    console.error(error)
  }
}