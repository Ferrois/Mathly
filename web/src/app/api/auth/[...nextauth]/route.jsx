import NextAuth from "next-auth/next";
import prisma from "src/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "ferrois@abc.com" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "ferrois" },
      },
      async authorize(credentials) {
        // Guard Clause 1: Check for fields
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // Check: User exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Guard Clause 2: No user
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // Check: Password matches
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        // Guard Clause 3: Password not matching
        if (!passwordMatch) throw new Error("Incorrect Password");

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.username = user.username || "null";
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
