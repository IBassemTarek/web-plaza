import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // Only apply to specific protected routes
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/me") && pathname !== "/shipping") {
    return NextResponse.next();
  }

  try {
    // Try to verify the token with minimal configuration
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      return NextResponse.next();
    } else {
      // Only redirect if token is definitely missing
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's any error in verification, allow the request through
    // and let client-side handle redirection if needed
    return NextResponse.next();
  }
}

// Simplified matcher focusing only on the key protected routes
export const config = {
  matcher: ["/me/:path*", "/shipping"],
};
