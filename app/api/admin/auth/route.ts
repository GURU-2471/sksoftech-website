import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Default admin credentials (configurable via env if needed)
    const validUser = process.env.ADMIN_USER || "admin";
    const validPass = process.env.ADMIN_PASSWORD || "sksofttech@2026";

    if (username === validUser && password === validPass) {
      const response = NextResponse.json({ success: true });
      // Set secure session cookie (valid 7 days)
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

    return NextResponse.json(
      { success: false, message: "Invalid username or password." },
      { status: 401 }
    );
  } catch {
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
