import api from "@/services/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./server/prisma";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET,
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials?.email
					}
				})

				if (user && await bcrypt.compare(credentials?.password || "", user.password)) {
					return user
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }) {
			session = token as any
			return session
		}
	}
}