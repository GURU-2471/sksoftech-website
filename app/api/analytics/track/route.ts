import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

function ensureAnalyticsFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(
      ANALYTICS_FILE,
      JSON.stringify(
        {
          totalViews: 0,
          todayViews: 0,
          lastDate: new Date().toISOString().split("T")[0],
          devices: { Desktop: 0, Mobile: 0, Tablet: 0 },
          recentVisits: [],
        },
        null,
        2
      )
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { path: pagePath = "/", referrer = "", device = "Desktop" } = body;

    const userAgent = req.headers.get("user-agent") || "";
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Record in PostgreSQL sksoftech_db
    try {
      await prisma.visitorLog.create({
        data: {
          path: pagePath,
          referrer: referrer || null,
          device: device || "Desktop",
          userAgent: userAgent.slice(0, 255),
          ipAddress: ipAddress.slice(0, 50),
        },
      });
    } catch (dbErr) {
      console.warn("PostgreSQL visitor logging skipped/fallback:", dbErr);
    }

    // 2. Also keep zero-latency JSON aggregator
    ensureAnalyticsFile();
    const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8"));
    const today = new Date().toISOString().split("T")[0];

    if (data.lastDate !== today) {
      data.todayViews = 0;
      data.lastDate = today;
    }

    data.totalViews = (data.totalViews || 0) + 1;
    data.todayViews = (data.todayViews || 0) + 1;

    const devKey = device.toLowerCase().includes("mobile")
      ? "Mobile"
      : device.toLowerCase().includes("tablet")
      ? "Tablet"
      : "Desktop";

    data.devices[devKey] = (data.devices[devKey] || 0) + 1;

    data.recentVisits = [
      {
        path: pagePath,
        device: devKey,
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        date: today,
        ip: ipAddress === "::1" || ipAddress === "127.0.0.1" ? "Localhost (Pune)" : ipAddress,
      },
      ...(data.recentVisits || []).slice(0, 29),
    ];

    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, count: data.totalViews });
  } catch (err) {
    console.error("Analytics track error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
