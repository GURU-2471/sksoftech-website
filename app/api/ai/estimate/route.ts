import { NextRequest, NextResponse } from "next/server";
import { callGemini, COMPANY_CONTEXT } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { projectDescription, category } = await req.json();

    if (!projectDescription) {
      return NextResponse.json({ success: false, message: "Please provide your project requirements." }, { status: 400 });
    }

    const systemPrompt = `${COMPANY_CONTEXT}
You are an expert Technical Solutions Architect and Project Estimator at SK Softech.
Your job is to generate a realistic, professional, and transparent project breakdown and estimation.
Respond strictly with a JSON object matching this schema:
{
  "summary": "Short 1-2 sentence overview of the technical approach",
  "recommendedTech": ["Tech 1", "Tech 2", "Tech 3"],
  "estimatedTimeline": "e.g. 4 - 6 Weeks",
  "estimatedCostRange": "e.g. ₹35,000 - ₹65,000",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "maintenanceAdvice": "Brief advice on hosting/maintenance"
}
`;

    const userPrompt = `
Requirement Category: ${category || "General Digital Solution"}
Client Project Description: "${projectDescription}"

Generate the comprehensive estimation JSON.
`;

    const rawResult = await callGemini(userPrompt, systemPrompt, true);
    const estimate = JSON.parse(rawResult);

    return NextResponse.json({ success: true, estimate });
  } catch (error) {
    console.error("Estimate API error:", error);
    return NextResponse.json({
      success: false,
      message: "Could not generate estimate at the moment. Please contact us directly at 9307696221.",
    }, { status: 500 });
  }
}
