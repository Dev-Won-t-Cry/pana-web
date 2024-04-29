"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react"

const Nav = () => {
  return (
    <nav className="flex flex-col items-center space-y-8 bg-login-box border-2 border-black rounded-3xl p-8">
      <a href="/dashboard" className="bg-white w-full border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300">Quadros</a>
      <a href="/membros" className="bg-white w-full border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300">Membros</a>
      <a href="/configuracoes" className="bg-white w-full border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300">Configurações</a>
      <a href="/quadros" className="bg-white w-full border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300">Seus Quadros</a>
      <button onClick={() => signOut()} className="bg-white flex flex-row space-x-4 border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300">
        <LogOut />
        <p>Sair</p>
      </button>
    </nav>
  )
}

export default Nav