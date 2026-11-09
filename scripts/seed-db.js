const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PostgreSQL sksoftech_db...');

  // Hash default password for team logins: "sksoftech@2026"
  const passwordHash = await bcrypt.hash('sksoftech@2026', 10);

  const teamMembers = [
    {
      name: 'Shubham Kale',
      email: 'shubham@sksoftech.in',
      role: 'SUPER_ADMIN',
      passwordHash,
    },
    {
      name: 'Aakash Deshmukh',
      email: 'marketing@sksoftech.in',
      role: 'MARKETING_SALES_HEAD',
      passwordHash,
    },
    {
      name: 'Pooja Patil',
      email: 'pm@sksoftech.in',
      role: 'PROJECT_MANAGER',
      passwordHash,
    },
    {
      name: 'Neha Shinde',
      email: 'hr@sksoftech.in',
      role: 'RECRUITER',
      passwordHash,
    },
  ];

  for (const member of teamMembers) {
    await prisma.user.upsert({
      where: { email: member.email },
      update: {
        name: member.name,
        role: member.role,
        passwordHash: member.passwordHash,
      },
      create: {
        name: member.name,
        email: member.email,
        role: member.role,
        passwordHash: member.passwordHash,
      },
    });
    console.log(`✓ Seeded User: ${member.name} (${member.role})`);
  }

  // Seed initial audit log
  await prisma.auditLog.create({
    data: {
      userName: 'Shubham Kale (Founder & CEO)',
      userRole: 'SUPER_ADMIN',
      action: 'SYSTEM_INITIALIZATION',
      resource: 'PostgreSQL_Database',
      details: 'PostgreSQL database synchronized with RBAC roles: Super Admin, Marketing/Sales Head, Project Manager, Recruiter.',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('✓ Initial Audit Log seeded.');
  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
