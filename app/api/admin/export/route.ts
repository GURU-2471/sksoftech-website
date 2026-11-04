import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "inquiries" | "applications"

  if (type === "applications") {
    const apps = await prisma.application.findMany();
    // Generate CSV
    const headers = "ID,Candidate Name,Email,Phone,Job Title,Match Score / Notes,Status,Application Date\n";
    const rows = apps
      .map((a: any) => {
        const cleanNotes = (a.hrNotes || "").replace(/[\r\n]+/g, " ").replace(/"/g, '""');
        return `"${a.id}","${a.applicantName}","${a.email}","${a.phone || ""}","${a.jobTitle}","${cleanNotes}","${a.status}","${new Date(a.createdAt).toLocaleDateString()}"`;
      })
      .join("\n");

    const csvContent = headers + rows;
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="SK_Softech_Applications_${Date.now()}.csv"`,
      },
    });
  }

  // Default: inquiries
  const inquiries = await prisma.inquiry.findMany();
  const headers = "ID,Name,Email,Phone,Service Interest,Message,Status,Date\n";
  const rows = inquiries
    .map((inq: any) => {
      const cleanMsg = (inq.message || "").replace(/[\r\n]+/g, " ").replace(/"/g, '""');
      return `"${inq.id}","${inq.name}","${inq.email}","${inq.phone || ""}","${inq.serviceInterest || "General"}","${cleanMsg}","${inq.status}","${new Date(inq.createdAt).toLocaleDateString()}"`;
    })
    .join("\n");

  const csvContent = headers + rows;
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="SK_Softech_Leads_${Date.now()}.csv"`,
    },
  });
}
