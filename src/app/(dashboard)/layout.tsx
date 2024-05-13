import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authOptions } from "../authOptions";
import Nav from "@/components/Nav";

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="w-full h-screen flex flex-row items-start justify-center space-x-16 pt-32">
      <div className="flex flex-col space-y-8 min-w-2/12">
        <div className="px-16 py-10 bg-black/30 rounded-5xl">
          <p className="text-8xl text-login-title text-center">PANA</p>
        </div>
        <Nav />
      </div>
      <div className="flex flex-col space-y-8 w-8/12 min-h-[80%] bg-black/30 rounded-5xl p-8">
        {children}
      </div>
    </div>
  )
}