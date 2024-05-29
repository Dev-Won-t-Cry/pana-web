import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { auth } from "@/auth";

interface PrivateLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Cadastro | Pana',
  description: 'Cadastro | Pana',
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth()

  if (session) {
    redirect('/quadros')
  }

  return (
    <>
      {children}
    </>
  )
}