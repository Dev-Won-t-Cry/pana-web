"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react"

export default function Configuracoes() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col space-y-16 items-center">
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Editar quadros
      </Button>
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Alterar plano de fundo
      </Button>
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Escolhe tema
      </Button>
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Editar perfil
      </Button>
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Solicitar dados
      </Button>
      <Button className="px-8 py-12 uppercase font-bold text-xl rounded-5xl border-2 border-black">
        Avaliação
      </Button>
      <Button onClick={() => signOut()} className="px-8 py-12 uppercase font-bold text-xl rounded-5xl text-white bg-dashboard-primary hover:bg-red-500 border-2 border-black">
        Sair da conta
      </Button>
    </div>
  )
}