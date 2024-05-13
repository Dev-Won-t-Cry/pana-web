import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { authOptions } from "../authOptions";

interface PrivateLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Login | Pana',
  description: 'Login | Pana',
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/quadros')
  }

  return (
    <>
      {children}
    </>
  )
}