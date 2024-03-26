"use client";

import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"

export default function Admin() {
  const { data: session } = useSession()

  console.log(session)

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Olá, {session?.user.name}. Bem vindo(a)!</h1>
      <Button onClick={() => {
        signOut()
      }}>
        Sair
      </Button>
    </div>
  )
}