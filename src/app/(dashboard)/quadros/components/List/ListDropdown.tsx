"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";
import { List } from "@prisma/client";
import { ListRename } from "./ListRename";
import { ListDelete } from "./ListDelete";

type Props = {
  list: List
}

export const ListDropdown = ({ list }: Props) => {
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <ListRename list={list} open={renameOpen} setOpen={setRenameOpen} />
      <ListDelete list={list} open={deleteOpen} setOpen={setDeleteOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger><FaEllipsisH /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>Renomear</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Excluir</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}