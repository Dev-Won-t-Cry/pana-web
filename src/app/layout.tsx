import NextAuthSessionProvider from '@/providers/sessionProvider'
import '../styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import Providers from './providers'

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
      <body
        className='w-full h-full'
        style={{
          backgroundImage: 'url(/static/images/background.png)',
          backgroundSize: 'cover',
        }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}