import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;

        if (pathname === "/" || pathname.startsWith("/api/videos") || pathname.startsWith("/api/video")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  // Only run auth middleware on routes that require authentication.
  matcher: ["/upload"],
};