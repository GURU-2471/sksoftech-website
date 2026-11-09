import prisma from "./prisma";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const AUDIT_FILE = path.join(DATA_DIR, "audit_logs.json");

function ensureAuditFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(AUDIT_FILE)) {
    fs.writeFileSync(AUDIT_FILE, JSON.stringify([], null, 2));
  }
}

export interface AuditEntry {
  id?: number;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress?: string;
  createdAt?: string | Date;
}

export async function logAuditEvent(entry: AuditEntry) {
  const timestamp = new Date();

  // 1. PostgreSQL DB
  try {
    await prisma.auditLog.create({
      data: {
        userName: entry.userName,
        userRole: entry.userRole,
        action: entry.action,
        resource: entry.resource,
        details: entry.details || "",
        ipAddress: entry.ipAddress || "127.0.0.1",
        createdAt: timestamp,
      },
    });
  } catch (err) {
    console.warn("PostgreSQL audit logging skipped/fallback:", err);
  }

  // 2. JSON store fallback
  try {
    ensureAuditFile();
    const existing: AuditEntry[] = JSON.parse(fs.readFileSync(AUDIT_FILE, "utf-8"));
    const newEntry: AuditEntry = {
      id: Date.now(),
      userName: entry.userName,
      userRole: entry.userRole,
      action: entry.action,
      resource: entry.resource,
      details: entry.details,
      ipAddress: entry.ipAddress || "127.0.0.1",
      createdAt: timestamp.toISOString(),
    };
    existing.unshift(newEntry);
    fs.writeFileSync(AUDIT_FILE, JSON.stringify(existing.slice(0, 100), null, 2));
  } catch (fileErr) {
    console.error("Audit log file error:", fileErr);
  }
}

export async function getAuditLogs(limit = 50): Promise<AuditEntry[]> {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    if (logs && logs.length > 0) {
      return logs.map((l) => ({
        id: l.id,
        userName: l.userName,
        userRole: l.userRole,
        action: l.action,
        resource: l.resource,
        details: l.details || undefined,
        ipAddress: l.ipAddress || undefined,
        createdAt: l.createdAt.toISOString(),
      }));
    }
  } catch (err) {
    console.warn("Reading audit logs from Postgres failed, using fallback:", err);
  }

  ensureAuditFile();
  try {
    return JSON.parse(fs.readFileSync(AUDIT_FILE, "utf-8")).slice(0, limit);
  } catch {
    return [];
  }
}
