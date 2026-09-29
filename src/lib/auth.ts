import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { validateRegistrationEmail } from "@/lib/disposableEmailBlocker";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-secret",
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials Provider (Email & Password with Disposable Email Blocking & Verification)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@cse.ac.in" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        const email = credentials.email.trim().toLowerCase();

        // 1. Check disposable email filter
        const emailCheck = validateRegistrationEmail(email);
        if (!emailCheck.isValid) {
          throw new Error(emailCheck.reason || "Invalid or disposable email detected.");
        }

        // 2. Fetch User from database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password. Please check credentials or create an account.");
        }

        // 3. Verify Password Hash
        const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValidPassword) {
          throw new Error("Invalid email or password.");
        }

        // 4. Update login streak or audit
        await prisma.user.update({
          where: { id: user.id },
          data: {
            updatedAt: new Date(),
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          currentYear: user.currentYear,
          currentSemester: user.currentSemester,
          specialization: user.specialization,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "STUDENT";
        token.currentYear = (user as any).currentYear || 1;
        token.currentSemester = (user as any).currentSemester || 1;
        token.specialization = (user as any).specialization || null;
      }

      // If logging in via Google OAuth, create or link user account in DB
      if (account && account.provider === "google" && token.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: token.email,
              name: token.name || "Engineering Student",
              image: token.picture,
              role: "STUDENT",
              emailVerifiedAt: new Date(),
              currentYear: 1,
              currentSemester: 1,
            },
          });
          token.id = newUser.id;
          token.role = newUser.role;
        } else {
          token.id = existingUser.id;
          token.role = existingUser.role;
        }
      }

      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.currentYear) token.currentYear = session.currentYear;
        if (session.currentSemester) token.currentSemester = session.currentSemester;
        if (session.specialization) token.specialization = session.specialization;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).currentYear = token.currentYear as number;
        (session.user as any).currentSemester = token.currentSemester as number;
        (session.user as any).specialization = token.specialization as string | null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "engineering-hub-cse-secret-key-32chars-minimum-secure",
};
