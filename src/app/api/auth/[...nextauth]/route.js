// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";
import { signJwtAccessToken } from "@/lib/jwt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        const userObj = user.toObject();
        const { password: pass, ...userWithoutPass } = userObj;

        const accessToken = signJwtAccessToken(JSON.stringify(userWithoutPass));
        if (accessToken) {
          return {
            ...userWithoutPass,
            accessToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
