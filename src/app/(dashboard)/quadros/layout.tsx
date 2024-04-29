import { ReactNode } from "react";
import { Metadata } from "next";

interface PrivateLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Quadros | Pana',
  description: 'Quadros | Pana',
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}