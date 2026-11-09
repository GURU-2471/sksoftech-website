import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("sk_admin_session");
  const isAuthenticated = sessionCookie?.value === "authenticated_admin_sksoftech";

  // 1. Protect Admin API endpoints (Except /api/admin/auth)
  if (pathname.startsWith("/api/admin")) {
    if (!pathname.startsWith("/api/admin/auth") && !isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Admin session required to access administrative APIs.",
        },
        { status: 401 }
      );
    }
  }

  // 2. Protect Admin UI routes (Except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect authenticated admins away from /admin/login to /admin dashboard
  if (pathname === "/admin/login" && isAuthenticated) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  // 4. Inject standard security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
