import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, SiteContent } from "@/lib/siteContentStore";

export async function GET() {
  const content = getSiteContent();
  return NextResponse.json({ success: true, content });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = saveSiteContent(body as SiteContent);
    return NextResponse.json({ success: true, content: updated });
  } catch (err) {
    console.error("Content API error:", err);
    return NextResponse.json({ success: false, message: "Failed to save content" }, { status: 500 });
  }
}
