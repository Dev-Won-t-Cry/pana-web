"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation";

type Link = {
  href: string
  label: string
}

const Nav = () => {
  const pathname = usePathname()

  const links: Link[] = [
    { href: '/quadros', label: 'Quadros' },
    { href: '/membros', label: 'Membros' },
    { href: '/configuracoes', label: 'Configurações' }
  ]

  return (
    <nav className="flex flex-col items-center space-y-8 bg-black/30 rounded-5xl p-8">
      {
        links.map(link => (
          <a key={link.href} href={link.href} className={`w-full border-2 border-black rounded-full text-center text-[0.8em] px-4 py-2 uppercase transition ease-in-out duration-300 font-bold ${pathname === link.href ? 'bg-dashboard-primary hover:bg-red-500' : 'bg-white hover:bg-gray-300'}`}>{link.label}</a>
        ))
      }
      <button onClick={() => signOut()} className="bg-white flex flex-row space-x-4 border-2 border-black rounded-full text-center px-4 py-2 uppercase hover:bg-gray-300 transition ease-in-out duration-300 font-bold">
        <LogOut />
        <p>Sair</p>
      </button>
    </nav>
  )
}

export default Nav