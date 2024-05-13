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
import { createCardAction, createFrameAction } from "@/app/_actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaSpinner } from "react-icons/fa"

export const AddCardSchema = z.object({
  title: z.string().min(1).max(255),
})

type AddCardProps = {
  id: string
}

export const AddCard = ({ id }: AddCardProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof AddCardSchema>>({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      title: "",
    },
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof AddCardSchema>) => {
    setLoading(true)
    await createCardAction(data.title, id, length)

    setLoading(false)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 px-4 py-2 text-red-700 rounded-md">
        <UserPlus size={24} />
        <span className="uppercase">Adicionar um cartão</span>
      </DialogTrigger>
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
              ) : "Entrar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}