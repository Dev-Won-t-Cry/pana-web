"use server"

import { createCard, deleteCard, getCards, updateCard } from "@/lib/card"
import { createFrame, getFrames } from "@/lib/frame"
import { createList, deleteList, getLists, updateList } from "@/lib/list"
import { UpdateCardType } from "@/types/card"
import { UpdateListType } from "@/types/list"
import { List } from "@prisma/client"

// Frames

export async function getFramesAction() {
  return await getFrames()
}

export async function createFrameAction(title: string, userId: string) {
  return await createFrame(title, userId)
}

// Lists

export async function getListsAction(id: string) {
  return await getLists(id)
}

export async function createListAction(title: string, frameId: string, order: number) {
  return await createList(title, frameId, order)
}

export async function updateListAction(listId: string, data: UpdateListType) {
  return await updateList(listId, data)
}

export async function deleteListAction(listId: string) {
  return await deleteList(listId)
}

// Cards

export async function getCardsAction(id: string) {
  return await getCards(id)
}

export async function createCardAction(title: string, listId: string, order: number) {
  return await createCard(title, listId, order)
}

export async function updateCardAction(cardId: string, data: UpdateCardType) {
  return await updateCard(cardId, data)
}

export async function deleteCardAction(cardId: string) {
  return await deleteCard(cardId)
}