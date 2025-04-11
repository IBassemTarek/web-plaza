import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the path is a protected route
  const isProtectedRoute =
    pathname.startsWith("/me") || pathname === "/shipping";

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Try to get the token with more lenient settings
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // If there's no token and this is a protected route, redirect to login
  if (!token && isProtectedRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all protected routes
    "/me/:path*",
    "/shipping",
    // But exclude API and static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
