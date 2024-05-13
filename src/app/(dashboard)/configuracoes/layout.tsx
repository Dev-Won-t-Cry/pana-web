import { ReactNode } from "react";
import { Metadata } from "next";

interface PrivateLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Configurações | Pana',
  description: 'Configurações | Pana',
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}