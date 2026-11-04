import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/storage";
import {
  sendEmail,
  contactNotificationTemplate,
  contactConfirmationTemplate,
} from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, type } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Persist directly to shared storage for Admin
    const record = saveInquiry({
      name,
      email,
      phone: phone || null,
      serviceInterest: service || (type === "quote" ? "Free Quote Request" : "General Inquiry"),
      message,
    });

    // Send email notifications
    await sendEmail({
      to: process.env.COMPANY_EMAIL || "sksoftech2026@gmail.com",
      subject: `📩 New ${type === "quote" ? "Quote Request" : "Contact Inquiry"} from ${name}`,
      html: contactNotificationTemplate({ name, email, phone, message, serviceInterest: service }),
    });

    await sendEmail({
      to: email,
      subject: "We received your message — SK Softech",
      html: contactConfirmationTemplate(name),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      inquiry: record,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
