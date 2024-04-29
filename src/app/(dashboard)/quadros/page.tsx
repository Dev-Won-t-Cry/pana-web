"use client";

import { UserPlus } from "lucide-react";
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()

  return (
    <>
      <div className="flex flex-row justify-between items-center border-2 border-black rounded-full px-4 py-2 bg-white">
        <p>ESTUDO</p>
        <button className="flex flex-row space-x-2 bg-slate-700 text-white rounded-none p-2">
          <UserPlus />
          <p>
            Compartilhar
          </p>
        </button>
      </div>
      <div className="flex flex-row space-x-4 items-start">
        <div className="flex flex-col space-y-2 border-2 border-black rounded-3xl p-4 w-2/12 bg-white">
          <div className="flex flex-row justify-between border-2 border-yellow-300 rounded-full p-2">
            <p>MER</p>
            <p>...</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-green-200">
            <p>Diego</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-yellow-200">
            <p>Thales</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-green-200">
            <p>Kauê</p>
          </div>
          <div>
            <p>+ ADICIONAR CARTÃO</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2 border-2 border-black rounded-3xl p-4 w-2/12 bg-white">
          <div className="flex flex-row justify-between border-2 border-red-300 rounded-full p-2">
            <p>DIAG - CLASSE</p>
            <p>...</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-red-200">
            <p>Diego</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-red-200">
            <p>Thales</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-red-200">
            <p>Kauê</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-red-200">
            <p>Gustavo</p>
          </div>
          <div className="border-2 border-black rounded-full p-2 bg-red-200">
            <p>Lucas</p>
          </div>
          <div>
            <p>+ ADICIONAR CARTÃO</p>
          </div>
        </div>
      </div>
    </>
  )
}