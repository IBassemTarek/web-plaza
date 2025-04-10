import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/backend/config/dbConnect";
import { signJwtAccessToken } from "@/lib/jwt";

export const authOptions = {
  session: {
    strategy: "jwt",
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        // remove password from user object
        const { password: pass, ...userWithoutPass } = user.toObject();

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
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/api/auth/session?update")) {
        const updatedUser = await User.findById(token.user._id);
        const accessToken = signJwtAccessToken(JSON.stringify(updatedUser));
        token.user = {
          ...updatedUser,
          accessToken,
        };
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.user.id = token.id || session.user._id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token", // customize session cookie name if needed
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        path: "/",
        sameSite: "lax", // or "strict" if you want stricter cookie handling
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
