import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Image from "next/image";
import { auth } from "@/auth";

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="w-full h-screen flex flex-row items-start justify-center space-x-16 p-[2%]">
      <div className="flex flex-col space-y-8 w-2/12">
        <div className="px-16 py-10 bg-black/30 rounded-5xl flex justify-center items-center">
          <Image src="/static/images/pana.png" width={300} height={300} alt="" />
        </div>
        <Nav />
      </div>
      <div className="flex flex-col space-y-8 w-8/12 min-h-[80%] bg-black/30 rounded-5xl p-8">
        {children}
      </div>
    </div>
  )
}