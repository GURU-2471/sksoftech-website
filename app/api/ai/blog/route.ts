import { NextRequest, NextResponse } from "next/server";
import { callGemini, COMPANY_CONTEXT } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { topic, keywords, targetAudience } = await req.json();

    if (!topic) {
      return NextResponse.json({ success: false, message: "Topic is required" }, { status: 400 });
    }

    const systemPrompt = `${COMPANY_CONTEXT}
You are an expert SEO Content Strategist for SK Softech.
Write high-ranking, valuable, engaging technical and digital marketing blog posts.
Output strictly valid JSON with this structure:
{
  "title": "Compelling SEO Title",
  "metaDescription": "150-160 character meta description",
  "readingTime": "e.g. 5 min read",
  "category": "Technology | Marketing | Web Development",
  "content": "Full markdown formatted article with H2, H3, bullet points and a strong call-to-action mentioning SK Softech Pune."
}
`;

    const userPrompt = `
Topic: "${topic}"
Target Keywords: ${keywords || "Web Development Pune, Digital Marketing, Software"}
Audience: ${targetAudience || "Business Owners and Entrepreneurs"}

Write a complete, ready-to-publish SEO blog article.
`;

    const raw = await callGemini(userPrompt, systemPrompt, true);
    const blog = JSON.parse(raw);

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("AI Blog error:", error);
    return NextResponse.json({ success: false, message: "Failed to generate blog article." }, { status: 500 });
  }
}
