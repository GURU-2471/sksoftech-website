import { NextRequest, NextResponse } from "next/server";
import { getJobs, saveJob, updateJob, deleteJob } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("active") === "true";

  const allJobs = getJobs();
  const jobs = activeOnly ? allJobs.filter((j) => j.isActive) : allJobs;

  return NextResponse.json({ success: true, jobs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, jobData, id, updates } = body;

    if (action === "create") {
      if (!jobData.title || !jobData.description) {
        return NextResponse.json({ success: false, message: "Title and description required." }, { status: 400 });
      }

      const newJob = saveJob({
        title: jobData.title,
        department: jobData.department || "Engineering",
        location: jobData.location || "Pune, Maharashtra",
        type: jobData.type || "Full-time",
        description: jobData.description,
        requirements: Array.isArray(jobData.requirements)
          ? jobData.requirements
          : (jobData.requirements || "").split("\n").filter(Boolean),
        isActive: jobData.isActive ?? true,
      });

      return NextResponse.json({ success: true, job: newJob });
    }

    if (action === "toggle" || action === "update") {
      const updated = updateJob(Number(id), updates);
      return NextResponse.json({ success: true, job: updated });
    }

    if (action === "delete") {
      deleteJob(Number(id));
      return NextResponse.json({ success: true, message: "Job deleted successfully." });
    }

    return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Jobs API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
