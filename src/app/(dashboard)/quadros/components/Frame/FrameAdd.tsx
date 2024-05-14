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
import { createFrameAction } from "@/app/_actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaSpinner } from "react-icons/fa"

export const Schema = z.object({
  title: z.string().min(1).max(255),
})

type Props = {
  id: string
}

export const FrameAdd = ({ id }: Props) => {
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
    const quadro = await createFrameAction(data.title, id)

    setLoading(false)
    router.push(`/quadros/${quadro?.id}`)
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
        <UserPlus size={24} />
        <span>Novo Quadro</span>
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
              ) : "Adicionar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}