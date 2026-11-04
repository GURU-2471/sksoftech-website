import { NextRequest, NextResponse } from "next/server";
import { getFAQs, addFAQ, updateFAQ, deleteFAQ, getAISettings, updateAISettings } from "@/lib/aiStore";

export async function GET() {
  return NextResponse.json({
    success: true,
    faqs: getFAQs(),
    settings: getAISettings(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, question, answer, category, id, data, settings } = body;

    if (action === "create_faq") {
      const created = addFAQ(question, answer, category || "General");
      return NextResponse.json({ success: true, item: created });
    }

    if (action === "update_faq") {
      const updated = updateFAQ(Number(id), data);
      return NextResponse.json({ success: true, item: updated });
    }

    if (action === "delete_faq") {
      deleteFAQ(Number(id));
      return NextResponse.json({ success: true });
    }

    if (action === "update_settings") {
      const updatedSettings = updateAISettings(settings);
      return NextResponse.json({ success: true, settings: updatedSettings });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("AI Config API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
