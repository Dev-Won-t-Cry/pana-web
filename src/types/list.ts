import { List } from "@prisma/client";

export type UpdateListType = Pick<List, "title" | "order">