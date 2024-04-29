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
    <div className="w-full h-screen flex flex-row items-center justify-center space-x-16">
      <div className="flex flex-col space-y-8 w-2/12">
        <Nav />
      </div>
      <div className="flex flex-col space-y-8 w-8/12 h-5/6 bg-login-box border-2 border-black rounded-3xl p-8">
        {children}
      </div>
    </div>
  )
}