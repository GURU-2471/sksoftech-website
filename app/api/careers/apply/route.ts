import { NextRequest, NextResponse } from "next/server";
import { saveApplication } from "@/lib/storage";
import {
  sendEmail,
  applicationNotificationTemplate,
  applicationConfirmationTemplate,
} from "@/lib/mailer";
import { callGemini } from "@/lib/ai";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { success: false, message: "Name, email, and job title are required." },
        { status: 400 }
      );
    }

    let resumeUrl: string | null = null;
    let resumePath: string | null = null;
    let resumeText = "";

    if (resumeFile && resumeFile.size > 0) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json({ success: false, message: "Resume must be PDF or DOC/DOCX." }, { status: 400 });
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const ext = resumeFile.name.split(".").pop();
      const randomName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      resumePath = path.join(uploadsDir, randomName);
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      fs.writeFileSync(resumePath, buffer);
      resumeUrl = `/uploads/resumes/${randomName}`;

      if (resumeFile.type === "application/pdf") {
        try {
          const pdfParse = require("pdf-parse");
          const parsed = await pdfParse(buffer);
          resumeText = parsed?.text ? parsed.text.slice(0, 3000) : "";
        } catch (pdfErr) {
          console.warn("Could not parse PDF text:", pdfErr);
        }
      }
    }

    // AI Candidate Screener
    let aiEvaluation = null;
    try {
      const screenerPrompt = `
You are the Technical HR Screener for SK Softech.
Target Role: "${jobTitle}"
Candidate Name: "${name}"
Cover Letter: "${coverLetter || "None provided"}"
Resume Extract:
${resumeText || "Resume document uploaded"}

Analyze fit and output strictly JSON:
{
  "matchScore": 88,
  "recommendation": "Interview | Hold | Reject",
  "strengths": ["Strength 1", "Strength 2"],
  "missingSkills": ["Gap 1"],
  "summary": "1 sentence verdict"
}
`;
      const rawAi = await callGemini(screenerPrompt, "Strict JSON candidate evaluation", true);
      aiEvaluation = JSON.parse(rawAi);
    } catch (e) {
      console.warn("AI screening fallback:", e);
    }

    const hrNotes = aiEvaluation
      ? `[AI Match: ${aiEvaluation.matchScore}% | Rec: ${aiEvaluation.recommendation}]\n${aiEvaluation.summary}\nStrengths: ${aiEvaluation.strengths?.join(", ")}`
      : "Pending Review";

    // Save to shared persistent storage
    const application = saveApplication({
      jobTitle,
      applicantName: name,
      email,
      phone: phone || null,
      coverLetter: coverLetter || null,
      resumeUrl,
      hrNotes,
    });

    // Notify HR
    await sendEmail({
      to: process.env.HR_EMAIL || process.env.COMPANY_EMAIL || "sksoftech2026@gmail.com",
      subject: `📋 ${aiEvaluation ? `[Score: ${aiEvaluation.matchScore}%] ` : ""}New Application: ${jobTitle} — ${name}`,
      html: `
        ${applicationNotificationTemplate({ applicantName: name, email, phone, jobTitle, coverLetter })}
        ${
          aiEvaluation
            ? `<div style="margin-top:20px;padding:15px;background:#eef2ff;border-left:4px solid #1e6fff;">
                <h3 style="color:#0B1F4B;margin:0 0 10px;">🤖 AI Screening Report</h3>
                <p><strong>Match Score:</strong> ${aiEvaluation.matchScore}% | <strong>Recommendation:</strong> ${aiEvaluation.recommendation}</p>
                <p><strong>Summary:</strong> ${aiEvaluation.summary}</p>
                <p><strong>Identified Strengths:</strong> ${aiEvaluation.strengths?.join(", ")}</p>
               </div>`
            : ""
        }
      `,
      attachments: resumePath
        ? [{ filename: `Resume_${name.replace(/\s/g, "_")}.${resumePath.split(".").pop()}`, path: resumePath }]
        : undefined,
    });

    // Notify applicant
    await sendEmail({
      to: email,
      subject: "Application Received — SK Softech",
      html: applicationConfirmationTemplate(name, jobTitle),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      application,
      aiEvaluation,
    });
  } catch (error) {
    console.error("Career apply API error:", error);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
