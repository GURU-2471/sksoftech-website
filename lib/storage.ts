import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return defaultValue;
}

function writeJsonFile<T>(filename: string, data: T) {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// Inquiries Schema
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

// Job Opening Schema
export interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

// Applications Schema
export interface Application {
  id: number;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone?: string | null;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  hrNotes?: string | null;
  status: "NEW" | "REVIEWING" | "SHORTLISTED" | "REJECTED";
  createdAt: string;
}

const defaultJobs: JobOpening[] = [
  {
    id: 1,
    title: "Full Stack Web Developer",
    department: "Engineering",
    location: "Pune, Maharashtra",
    type: "Full-time",
    description: "Build scalable web applications using Next.js, React, Node.js and PostgreSQL.",
    requirements: [
      "2+ years experience with Next.js or React",
      "Knowledge of Node.js & REST APIs",
      "Experience with relational databases",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Pune, Maharashtra",
    type: "Full-time",
    description: "Drive growth for client brands through Google Ads, Meta Ads, SEO, and social funnels.",
    requirements: [
      "1+ years in performance marketing",
      "Google Ads & Meta Ads expertise",
      "Strong analytical and copywriting skills",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

// --- Persistent Storage Helpers ---

export function getInquiries(): Inquiry[] {
  return readJsonFile<Inquiry[]>("inquiries.json", []);
}

export function saveInquiry(data: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
  const inquiries = getInquiries();
  const newInq: Inquiry = {
    ...data,
    id: Date.now(),
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(newInq);
  writeJsonFile("inquiries.json", inquiries);
  return newInq;
}

export function updateInquiryStatus(id: number, status: "NEW" | "IN_PROGRESS" | "CLOSED") {
  const inquiries = getInquiries();
  const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
  writeJsonFile("inquiries.json", updated);
  return updated.find((inq) => inq.id === id);
}

// --- Jobs Helpers ---

export function getJobs(): JobOpening[] {
  return readJsonFile<JobOpening[]>("jobs.json", defaultJobs);
}

export function saveJob(data: Omit<JobOpening, "id" | "createdAt">): JobOpening {
  const jobs = getJobs();
  const newJob: JobOpening = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  writeJsonFile("jobs.json", jobs);
  return newJob;
}

export function updateJob(id: number, data: Partial<JobOpening>): JobOpening | undefined {
  const jobs = getJobs();
  const updated = jobs.map((j) => (j.id === id ? { ...j, ...data } : j));
  writeJsonFile("jobs.json", updated);
  return updated.find((j) => j.id === id);
}

export function deleteJob(id: number) {
  const jobs = getJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  writeJsonFile("jobs.json", filtered);
}

// --- Applications Helpers ---

export function getApplications(): Application[] {
  return readJsonFile<Application[]>("applications.json", []);
}

export function saveApplication(data: Omit<Application, "id" | "createdAt" | "status">): Application {
  const apps = getApplications();
  const newApp: Application = {
    ...data,
    id: Date.now(),
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  apps.unshift(newApp);
  writeJsonFile("applications.json", apps);
  return newApp;
}
