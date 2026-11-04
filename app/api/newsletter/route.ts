import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Valid email required." }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed!" });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });

    await sendEmail({
      to: email,
      subject: "Welcome to SK Softech Newsletter!",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
          <div style="background:#0B1F4B;padding:25px;text-align:center;border-radius:8px 8px 0 0;">
            <h2 style="color:#FFC21A;margin:0;">SK Softech</h2>
          </div>
          <div style="background:#fff;padding:25px;border-radius:0 0 8px 8px;border:1px solid #eee;">
            <h3 style="color:#0B1F4B;">Welcome aboard! 🎉</h3>
            <p style="color:#555;">Thank you for subscribing to SK Softech updates. You'll be the first to know about our latest services, tips and offers.</p>
            <p style="color:#999;font-size:12px;margin-top:20px;">SK Softech and Digital Marketing | Pune, Maharashtra</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
