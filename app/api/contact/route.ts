import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveInquiry } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  sendEmail,
  contactNotificationTemplate,
  contactConfirmationTemplate,
} from "@/lib/mailer";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .transform((val) => val.replace(/<[^>]*>?/gm, "")), // Strip HTML tags
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .max(25)
    .optional()
    .nullable()
    .transform((val) => (val ? val.replace(/[^\d+ ()-]/g, "") : null)),
  service: z.string().trim().max(100).optional().nullable(),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(5000, "Message cannot exceed 5000 characters")
    .transform((val) => val.replace(/<[^>]*>?/gm, "")),
  type: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Rate Limiting: Max 5 contact requests per 60 seconds (Fix 07)
  const rate = checkRateLimit(`contact_${ipAddress}`, 5, 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "You are sending messages too quickly. Please wait a moment.",
      },
      { status: 429 }
    );
  }

  try {
    const rawBody = await req.json().catch(() => ({}));
    const parse = contactSchema.safeParse(rawBody);

    if (!parse.success) {
      const errorMsg =
        Object.values(parse.error.flatten().fieldErrors)[0]?.[0] ||
        "Invalid input fields provided.";
      return NextResponse.json({ success: false, message: errorMsg }, { status: 400 });
    }

    const { name, email, phone, service, message, type } = parse.data;

    // 1. Persist in PostgreSQL (Fix 03, Fix 11)
    try {
      await prisma.inquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          message,
          serviceInterest: service || (type === "quote" ? "Free Quote Request" : "General Inquiry"),
        },
      });
    } catch (pgErr) {
      console.warn("PostgreSQL inquiry save fallback:", pgErr);
    }

    // 2. Persist directly to shared storage for Admin
    const record = saveInquiry({
      name,
      email,
      phone: phone || null,
      serviceInterest: service || (type === "quote" ? "Free Quote Request" : "General Inquiry"),
      message,
    });

    // 3. Send email notifications (Async / Non-blocking failure)
    sendEmail({
      to: process.env.COMPANY_EMAIL || "sksoftech2026@gmail.com",
      subject: `📩 New ${type === "quote" ? "Quote Request" : "Contact Inquiry"} from ${name}`,
      html: contactNotificationTemplate({
        name,
        email,
        phone: phone || undefined,
        message,
        serviceInterest: service || undefined,
      }),
    }).catch((e) => console.warn("Admin notification email failed:", e));

    sendEmail({
      to: email,
      subject: "We received your message — SK Softech",
      html: contactConfirmationTemplate(name),
    }).catch((e) => console.warn("Client confirmation email failed:", e));

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
