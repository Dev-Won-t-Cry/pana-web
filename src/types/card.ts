import { Card } from "@prisma/client";

export type UpdateCardType = Pick<Card, "title" | "order" | "status">