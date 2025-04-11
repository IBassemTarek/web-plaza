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

        // Convert mongoose document to plain object
        const userObj = user.toObject();

        // Remove password from user object
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
    async redirect({ url, baseUrl }) {
      // Simple redirect logic without the problematic code
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, user, account, profile, trigger, session }) {
      // First login
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        token.id = user._id || user.id; // Store the user ID
      }

      // Handle user updates
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }

      // Check if token is expired
      const isTokenExpired =
        token.accessTokenExpires && Date.now() > token.accessTokenExpires;

      if (isTokenExpired) {
        try {
          // Re-sign token with fresh user info
          await dbConnect();
          const updatedUser = await User.findById(token.user._id || token.id);

          if (!updatedUser) {
            throw new Error("User not found");
          }

          const userObj = updatedUser.toObject();
          const newAccessToken = signJwtAccessToken(JSON.stringify(userObj));

          token.user = {
            ...userObj,
            accessToken: newAccessToken,
          };
          token.accessToken = newAccessToken;
          token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        } catch (err) {
          console.error("Token refresh failed", err);
          // Don't throw an error here, just return the token as is
          // The user will be redirected to login when the session is checked
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
        // Ensure ID is available in the expected format
        session.user.id = token.id || token.user._id || token.user.id;
      }
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
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        // Don't set domain explicitly unless you're using a custom domain
        // domain: process.env.NODE_ENV === "production" ? undefined : undefined
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
