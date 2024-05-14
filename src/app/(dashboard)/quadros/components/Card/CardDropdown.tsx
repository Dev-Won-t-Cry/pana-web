"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { Card } from "@prisma/client";
import { CardRename } from "./CardRename";
import { CardDelete } from "./CardDelete";
import { Mail, MessageSquare, PlusCircle } from "lucide-react";
import { updateCardAction } from "@/app/_actions";
import { useRouter } from "next/navigation";

type Props = {
  card: Card
}

export const CardDropdown = ({ card }: Props) => {
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const cardStatus = card.status === "Done" ? "bg-green-200"
    : card.status === "InProgress" ? "bg-yellow-200"
      : "bg-red-200"

  const changeStatus = async (status: Card["status"]) => {
    setLoading(true)
    await updateCardAction(card.id, {
      title: card.title,
      order: card.order,
      status
    })

    router.refresh()
    setLoading(false)
  }

  return (
    <>
      <CardRename card={card} open={renameOpen} setOpen={setRenameOpen} />
      <CardDelete card={card} open={deleteOpen} setOpen={setDeleteOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div key={card.id} className={`border-2 border-black rounded-full p-2 ${cardStatus}`}>
            <p className="text-left">{card.title}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>Renomear</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Excluir</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Marcar como</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => changeStatus("Done")}>
                    <p className="text-green-500">Feito</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeStatus("InProgress")}>
                    <p className="text-yellow-500">Em progresso</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeStatus("Todo")}>
                    <p className="text-red-500">A fazer</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}