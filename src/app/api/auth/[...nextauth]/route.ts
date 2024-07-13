import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, Session, getServerSession } from "next-auth";
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
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "logout",
  },
  // debug: true,
};

/**
 * Return whether the session belongs to the admin
 * @returns
 */
export const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin =
    session && session.user?.email === process.env.GOOGLE_ADMIN_EMAIL;

  return isAdmin;
};

/**
 * Cheks if the session belongs to an admin.
 *
 * The difference between this and the `isAdmin()` util is that this requires
 * the session object to be provided and makes the check based on it
 * @returns true if the session belongs to the admin, false otherwise.
 */
export const isAdminSession = (session: Session | null): boolean => {
  const isAdmin =
    session !== null &&
    session.user !== undefined &&
    session.user.email === process.env.GOOGLE_ADMIN_EMAIL;

  return isAdmin;
};

/**
 * Get the session object. Only works server-side
 * @returns session object, or null if the user is not logged
 */
export const getSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
