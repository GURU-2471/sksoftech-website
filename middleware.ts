import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, except /admin/login and auth API
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get("sk_admin_session");

    if (!sessionCookie || sessionCookie.value !== "authenticated_admin_sksoftech") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated user visits /admin/login, redirect to /admin dashboard
  if (pathname === "/admin/login") {
    const sessionCookie = request.cookies.get("sk_admin_session");
    if (sessionCookie && sessionCookie.value === "authenticated_admin_sksoftech") {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
