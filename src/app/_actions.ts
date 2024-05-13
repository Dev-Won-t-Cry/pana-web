"use server"

import { createCard, getCards } from "@/lib/card"
import { createFrame, getFrames } from "@/lib/frame"
import { createList, getLists } from "@/lib/list"

export async function getFramesAction() {
  return await getFrames()
}

export async function createFrameAction(title: string, userId: string) {
  return await createFrame(title, userId)
}

export async function getListsAction(id: string) {
  return await getLists(id)
}

export async function createListAction(title: string, frameId: string, order: number) {
  return await createList(title, frameId, order)
}

export async function getCardsAction(id: string) {
  return await getCards(id)
}

export async function createCardAction(title: string, listId: string, order: number) {
  return await createCard(title, listId, order)
}