import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials, req) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        const user = await prisma.user.findFirst({
          where: {
            email
          }
        })

        if (!(password && user?.password)) return null

        if (user && await bcrypt.compare(password, user.password)) {
          // console.log(user)
          return user
        }

        return null
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_ID || "",
      clientSecret: process.env.AUTH_DISCORD_SECRET || ""
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async session({ session, token, user }) {
      if (token) {
        session.id = token.id as string
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
  },
  session: {
    strategy: 'jwt',
  }
})