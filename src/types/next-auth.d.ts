import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt";
import { UserType } from "./user";

declare module "next-auth" {
  interface Session {
    user: UserType
  }

  interface JWT {
    access_token: string & DefaultJWT
  }
}