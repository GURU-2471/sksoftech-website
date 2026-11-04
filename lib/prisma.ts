// Mock/Universal In-Memory & DB Client Interface for SK Softech
// Allows website to run out-of-the-box before PostgreSQL is provisioned

export interface User {
  id: number;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR" | "HR";
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  serviceInterest?: string | null;
  status: "NEW" | "IN_PROGRESS" | "CLOSED";
  createdAt: Date;
}

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
  createdAt: Date;
}

class InMemoryDb {
  private inquiries: Inquiry[] = [];
  private applications: Application[] = [];
  private subscribers: string[] = [];

  inquiry = {
    create: async ({ data }: { data: Omit<Inquiry, "id" | "createdAt"> }) => {
      const record: Inquiry = {
        ...data,
        id: this.inquiries.length + 1,
        createdAt: new Date(),
      };
      this.inquiries.push(record);
      return record;
    },
    findMany: async () => this.inquiries,
  };

  application = {
    create: async ({ data }: { data: Omit<Application, "id" | "createdAt"> }) => {
      const record: Application = {
        ...data,
        id: this.applications.length + 1,
        createdAt: new Date(),
      };
      this.applications.push(record);
      return record;
    },
    findMany: async () => this.applications,
  };

  newsletterSubscriber = {
    findUnique: async ({ where }: { where: { email: string } }) => {
      return this.subscribers.includes(where.email) ? { email: where.email } : null;
    },
    create: async ({ data }: { data: { email: string } }) => {
      this.subscribers.push(data.email);
      return { email: data.email };
    },
  };
}

const globalForDb = globalThis as unknown as { prisma: InMemoryDb | undefined };
export const prisma = globalForDb.prisma ?? new InMemoryDb();
if (process.env.NODE_ENV !== "production") globalForDb.prisma = prisma;
