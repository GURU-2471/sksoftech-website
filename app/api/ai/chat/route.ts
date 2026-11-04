import { NextRequest, NextResponse } from "next/server";
import { callGemini, COMPANY_CONTEXT } from "@/lib/ai";
import { getFAQs, getAISettings } from "@/lib/aiStore";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { messages, leadInfo, selectedQuestionId } = await req.json();
    const settings = getAISettings();
    const activeFaqs = getFAQs().filter((f) => f.isActive);

    if (!settings.enableChatbot) {
      return NextResponse.json({
        success: true,
        reply: "AI Chat is currently offline for scheduled maintenance. Please call us at 9307696221.",
      });
    }

    // Direct match if visitor selected one of the admin-configured questions
    if (selectedQuestionId) {
      const match = activeFaqs.find((f) => f.id === Number(selectedQuestionId));
      if (match) {
        return NextResponse.json({
          success: true,
          reply: match.answer,
        });
      }
    }

    // Handle captured lead
    if (leadInfo?.phone || leadInfo?.email) {
      await prisma.inquiry.create({
        data: {
          name: leadInfo.name || "AI Chat Visitor",
          email: leadInfo.email || "visitor@chat.ai",
          phone: leadInfo.phone || null,
          message: `Captured via AI Assistant Chat: ${leadInfo.summary || "Interested in services"}`,
          serviceInterest: "AI Bot Lead",
          status: "NEW",
        },
      });

      await sendEmail({
        to: process.env.COMPANY_EMAIL || "sksoftech2026@gmail.com",
        subject: `🤖 Hot Lead from AI Chatbot: ${leadInfo.name || "Visitor"} (${leadInfo.phone || leadInfo.email})`,
        html: `
          <div style="font-family:sans-serif;padding:20px;background:#f9f9f9;">
            <div style="background:#0B1F4B;color:#FFC21A;padding:15px;border-radius:8px 8px 0 0;">
              <h2>New Lead Captured by AI Assistant!</h2>
            </div>
            <div style="background:#fff;padding:20px;border-radius:0 0 8px 8px;border:1px solid #ddd;">
              <p><strong>Name:</strong> ${leadInfo.name || "N/A"}</p>
              <p><strong>Phone:</strong> ${leadInfo.phone || "N/A"}</p>
              <p><strong>Email:</strong> ${leadInfo.email || "N/A"}</p>
              <p><strong>Context/Interests:</strong> ${leadInfo.summary || "General inquiry"}</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        reply: "Thank you! Our technical lead has received your details and will call you soon. You can also reach us directly at 9307696221.",
      });
    }

    // Check if user question closely matches any admin FAQ
    const lastUserMsg = messages?.[messages.length - 1]?.content?.toLowerCase() || "";
    for (const faq of activeFaqs) {
      const q = faq.question.toLowerCase();
      // basic keyword matching
      const words = q.split(" ").filter((w: string) => w.length > 3);
      const matchCount = words.filter((w: string) => lastUserMsg.includes(w)).length;
      if (matchCount >= 2 || lastUserMsg.includes(q)) {
        return NextResponse.json({
          success: true,
          reply: faq.answer,
        });
      }
    }

    // Dynamic AI Fallback trained with the dynamic admin FAQs
    const faqContext = activeFaqs
      .map((f, i) => `Q${i + 1}: ${f.question}\nA${i + 1}: ${f.answer}`)
      .join("\n\n");

    const prompt = `
Verified Company Answers (Admin Managed):
${faqContext}

User Message: "${lastUserMsg}"

Please answer accurately using the verified company answers when possible. Be brief (2-3 sentences), warm, and suggest contacting 9307696221 for a free quote.
`;

    const reply = await callGemini(prompt, COMPANY_CONTEXT, false);
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json({
      success: false,
      reply: "We are always available! Call us directly at 9307696221 or WhatsApp us for instant help.",
    });
  }
}
