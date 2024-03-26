import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { authOptions } from "../authOptions";

const inter = Inter({ subsets: ["latin"] });

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
    redirect('/admin')
  }

  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}