import NextAuthSessionProvider from '@/providers/sessionProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className='w-full h-full'>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  )
}