import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "connected";

  try {
    // Ping PostgreSQL (Fix 15: Health Check for UptimeRobot)
    await prisma.$queryRaw`SELECT 1`;
  } catch (err: any) {
    dbStatus = `degraded: ${err?.message || "connection error"}`;
  }

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus === "connected";

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      responseTimeMs,
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
    },
    { status: isHealthy ? 200 : 503 }
  );
}
