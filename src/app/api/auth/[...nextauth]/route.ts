import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../../prisma/db";
import { type Adapter } from "next-auth/adapters";

export interface AdminSession extends Session {
  token?: AdminToken;
}
export interface AdminToken {
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: number;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "NOT ASSIGNED",
      clientSecret: process.env.GOOGLE_SECRET ?? "NOT ASSIGNED",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // TODO: REQUIRE THE PHONE IN THIS STEP
    // signIn({ profile, account, user }) {
    // },
  },

  pages: {
    signIn: "/login",
    signOut: "logout",
  },
  // debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };