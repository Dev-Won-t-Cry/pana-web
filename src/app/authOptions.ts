import api from "@/services/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

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
				const response = await api.post('/auth/login', credentials);

				console.log(response.data)

				const user = await response.data.user;

				if (user && response.status === 200) {
					return user;
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