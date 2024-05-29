import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    id: string
    user: User
  }

  interface JWT {
    access_token: string & DefaultJWT
  }
}