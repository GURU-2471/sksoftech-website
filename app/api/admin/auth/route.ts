import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";
import { logAuditEvent } from "@/lib/auditLog";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(60),
  password: z.string().min(1, "Password is required").max(100),
});

export async function POST(req: NextRequest) {
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Rate Limiting: Max 5 attempts per 15 minutes (Fix 07 from 20 Fixes)
  const rateCheck = checkRateLimit(`login_${ipAddress}`, 5, 15 * 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many login attempts. Please wait ${rateCheck.retryAfter} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.retryAfter || 60) },
      }
    );
  }

  try {
    const rawBody = await req.json().catch(() => ({}));
    const parseResult = loginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password format." },
        { status: 400 }
      );
    }

    const { username, password } = parseResult.data;

    // Default admin credentials (configurable via env)
    const validUser = process.env.ADMIN_USER || "admin";
    const validPass = process.env.ADMIN_PASSWORD || "sksofttech@2026";

    if (username === validUser && password === validPass) {
      // Audit log successful login
      await logAuditEvent({
        userName: "Admin",
        userRole: "SUPER_ADMIN",
        action: "ADMIN_LOGIN_SUCCESS",
        resource: "AuthSystem",
        details: "Successful administrator login",
        ipAddress,
      });

      const response = NextResponse.json({ success: true, message: "Authentication successful" });
      // Set secure session cookie (Fix 10: HttpOnly, Secure, SameSite=lax)
      response.cookies.set({
        name: "sk_admin_session",
        value: "authenticated_admin_sksoftech",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    // Audit log failed login
    await logAuditEvent({
      userName: username.slice(0, 30),
      userRole: "UNKNOWN",
      action: "ADMIN_LOGIN_FAILED",
      resource: "AuthSystem",
      details: "Invalid password attempt",
      ipAddress,
    });

    return NextResponse.json(
      { success: false, message: "Invalid username or password." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { success: false, message: "Server error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("sk_admin_session");
  return response;
}
