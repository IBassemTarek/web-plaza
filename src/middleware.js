// src/middleware.js
import { NextResponse } from "next/server";

// Remove the dependency on next-auth middleware
export async function middleware(request) {
  // Allow all requests to proceed - no authentication check in middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/me/:path*", "/shipping"],
};
