import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./Data/user"
import { UserRole } from "@prisma/client"

import { getTwoFactorConfirmationByUserId } from "@/Data/two-factor-confirmation"
import { getAccountByUserId } from "./Data/account"

export const 
{ auth, handlers, signIn, signOut } 
= NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      console.log({
        user,
        account
      });

      // Allow OAuth without email verifications
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verifications
      if (!existingUser?.emailVerified) return false;

      // Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete confirmation for next login
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true;
    },

    async session({ session, token }) {
      console.log({
        sessionToken: token,
        session
      });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      // Fix: check if token.email exists before assigning
      if (session.user) {
        session.user.name = token.name;

        if (token.email) {
          session.user.email = token.email;
        }

        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      console.log('i am being call here')

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    }
  },

  adapter: PrismaAdapter(db),

  ...authConfig,

  session: {
    strategy: "jwt",
  },
});
