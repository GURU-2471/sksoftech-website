import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAuditEvent } from "@/lib/auditLog";

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: {
    label: "Founder & CEO / Super Admin",
    description: "Complete access across all departments, database, financial leads, audit logs, team roles & content.",
    allowedTabs: ["overview", "analytics", "content", "leads", "careers", "blog", "team", "audit", "settings"],
    canDeleteLeads: true,
    canManageRoles: true,
    canEditContent: true,
    canExportData: true,
  },
  MARKETING_SALES_HEAD: {
    label: "Marketing & Sales Head",
    description: "Full access to Visitor Analytics, Inquiries & Leads, AI Blog Writer, SEO & Marketing campaigns.",
    allowedTabs: ["overview", "analytics", "leads", "blog", "content"],
    canDeleteLeads: false,
    canManageRoles: false,
    canEditContent: true,
    canExportData: true,
  },
  PROJECT_MANAGER: {
    label: "Project Manager",
    description: "Full access to Portfolio Projects, Services Catalog, Tech Stack Marquee & Client Requests.",
    allowedTabs: ["overview", "content", "leads"],
    canDeleteLeads: false,
    canManageRoles: false,
    canEditContent: true,
    canExportData: false,
  },
  RECRUITER: {
    label: "HR & Recruiter",
    description: "Full access to Job Openings, Candidate Resumes, AI Resume Screener & Application statuses.",
    allowedTabs: ["overview", "careers"],
    canDeleteLeads: false,
    canManageRoles: false,
    canEditContent: false,
    canExportData: true,
  },
};

export async function GET() {
  try {
    let users: any[] = [];
    try {
      users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
        },
        orderBy: { id: "asc" },
      });
    } catch (dbErr) {
      console.warn("Postgres user fetch error:", dbErr);
    }

    // Default seed fallback if DB query failed
    if (!users || users.length === 0) {
      users = [
        {
          id: 1,
          name: "Shubham Kale",
          email: "shubham@sksoftech.in",
          role: "SUPER_ADMIN",
          isActive: true,
        },
        {
          id: 2,
          name: "Aakash Deshmukh",
          email: "marketing@sksoftech.in",
          role: "MARKETING_SALES_HEAD",
          isActive: true,
        },
        {
          id: 3,
          name: "Pooja Patil",
          email: "pm@sksoftech.in",
          role: "PROJECT_MANAGER",
          isActive: true,
        },
        {
          id: 4,
          name: "Neha Shinde",
          email: "hr@sksoftech.in",
          role: "RECRUITER",
          isActive: true,
        },
      ];
    }

    return NextResponse.json({
      success: true,
      users,
      rolePermissions: ROLE_PERMISSIONS,
    });
  } catch (err) {
    console.error("Team API error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load team data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, newRole, name, email } = body;

    if (action === "updateRole" && userId && newRole) {
      await prisma.user.update({
        where: { id: Number(userId) },
        data: { role: newRole },
      });

      await logAuditEvent({
        userName: "Admin",
        userRole: "SUPER_ADMIN",
        action: "UPDATE_USER_ROLE",
        resource: "RBAC_System",
        details: `Changed role of user #${userId} to ${newRole}`,
      });

      return NextResponse.json({ success: true, message: "User role updated successfully" });
    }

    if (action === "createUser" && name && email && newRole) {
      const created = await prisma.user.create({
        data: {
          name,
          email,
          role: newRole,
          passwordHash: "$2a$10$w850P2vVqM7hRkY7d62gOuV02u/L22iQJom0f45H2vQ8Yp7Vb16zG", // sksoftech@2026
        },
      });

      await logAuditEvent({
        userName: "Admin",
        userRole: "SUPER_ADMIN",
        action: "CREATE_TEAM_MEMBER",
        resource: "UserManagement",
        details: `Added new team member ${name} (${newRole})`,
      });

      return NextResponse.json({ success: true, user: created });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Team update error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update team" },
      { status: 500 }
    );
  }
}
