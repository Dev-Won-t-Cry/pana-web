"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createFrameAction, createListAction, updateCardAction, updateListAction } from "@/app/_actions"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { updateList } from "@/lib/list"
import { Card } from "@prisma/client"
import { UpdateListType } from "@/types/list"
import { UpdateCardType } from "@/types/card"

export const Schema = z.object({
  title: z.string().min(1).max(255),
})

type Props = {
  card: Card
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CardRename = ({ card, open, setOpen }: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: "",
    },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    setLoading(true)

    const values: UpdateCardType = {
      title: data.title,
      order: card.order,
      status: card.status
    }

    await updateCardAction(card.id, values)

    setLoading(false)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {loading ? (
                <FaSpinner className="animate-spin h-5 w-5" />
              ) : "Salvar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}