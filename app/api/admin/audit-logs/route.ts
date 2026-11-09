import { NextResponse } from "next/server";
import { getAuditLogs } from "@/lib/auditLog";

export async function GET() {
  try {
    const logs = await getAuditLogs(50);
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Audit log API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load audit logs" },
      { status: 500 }
    );
  }
}
