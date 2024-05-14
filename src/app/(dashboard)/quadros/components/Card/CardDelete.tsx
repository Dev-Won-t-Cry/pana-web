"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { deleteCardAction, deleteListAction } from "@/app/_actions"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { Card } from "@prisma/client"

export const Schema = z.object({
  title: z.string().min(1).max(255),
})

type Props = {
  card: Card
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CardDelete = ({ card, open, setOpen }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)

    await deleteCardAction(card.id)

    setLoading(false)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Button onClick={() => onSubmit()}>
          {loading ? (
            <FaSpinner className="animate-spin h-5 w-5" />
          ) : "Excluir"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}