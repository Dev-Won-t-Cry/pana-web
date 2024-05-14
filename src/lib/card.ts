import { prisma } from "@/app/server/prisma";
import { UpdateCardType } from "@/types/card";

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

export async function updateCard(cardId: string, data: UpdateCardType) {
  try {
    const card = await prisma.card.update({
      data,
      where: {
        id: cardId
      }
    })
    return card
  } catch (error) {
    console.error(error)
  }
}

export async function deleteCard(cardId: string) {
  try {
    const card = await prisma.card.delete({
      where: {
        id: cardId
      }
    })
    return card
  } catch (error) {
    console.error(error)
  }
}