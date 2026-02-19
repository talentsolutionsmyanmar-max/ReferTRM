// Seed Real Jobs from Excel - ReferTRM
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface JobRow {
  no: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

// Parse the Excel CSV export manually since we don't have a CSV parser
const jobsData: JobRow[] = [
  { no: 1, title: 'Senior Supervisor', company: 'RK Yangon Steel', location: 'Thanlyin', salary: '7.5 Lakhs to 10 Lakhs' },
  { no: 2, title: 'Warehouse Supervisor', company: 'Universal Energy', location: 'Thingangyun', salary: 'Nego' },
  { no: 3, title: 'Content & Script Writer', company: 'Shwe Taung Htun', location: 'Mingalar Taung Nyunt', salary: '4 Lakhs to 6 Lakhs' },
  { no: 4, title: 'Site Engineer', company: 'Sun Myat Tun', location: 'Botahtaung', salary: '7.5 Lakhs' },
  { no: 5, title: 'Data Collector', company: 'NielsenIQ Myanmar', location: 'Mdy,Sagaing,Meikhtila', salary: '3.5 Lakhs' },
  { no: 6, title: 'Loan Officer', company: 'Real Aid Microfinance', location: 'Ayeyarwady', salary: '4 Lakhs to 5 Lakhs' },
  { no: 7, title: 'Cashier', company: 'Real Aid Microfinance', location: 'Ayeyarwady', salary: 'Above 3 Lakhs' },
  { no: 8, title: 'Brand Executive', company: 'Unicharm Myanmar', location: 'Yankin', salary: '7 Lakhs to 9 Lakhs' },
  { no: 9, title: 'Assistant Brand Manager', company: 'Unicharm Myanmar', location: 'Yankin', salary: '15 Lakhs to 17 Lakhs' },
  { no: 10, title: 'Receptionist', company: 'Myanmar Information Technology', location: 'Insein', salary: '3 Lakhs to 4 Lakhs' },
  { no: 11, title: 'Assistant Accountant', company: 'KBZ Life Insurance', location: 'Bahan', salary: '4 Lakhs to 5 Lakhs' },
  { no: 12, title: 'Accountant', company: 'Universal Energy', location: 'Thingangyun', salary: '6 Lakhs to 7 Lakhs' },
  { no: 13, title: 'Online Sale', company: 'Salpyar', location: 'North Dagon', salary: '2.4 Lakhs' },
  { no: 14, title: 'Graphic Designer', company: 'WOW Sport', location: 'Kamaryut', salary: 'Around 10 Lakhs' },
  { no: 15, title: 'Senior Sales Executive', company: 'WOW Sport', location: 'Kamaryut', salary: '10 Lakhs' },
  { no: 16, title: 'Senior Agency Sales Representative', company: 'AMI', location: 'Kamaryut', salary: '5 Lakhs to 6.5 Lakhs' },
  { no: 17, title: 'Admin Supervisor', company: 'TOMO', location: 'South Dagon', salary: '5 Lakhs to 6 Lakhs' },
  { no: 18, title: 'IT Supervisor', company: 'Wave Plus', location: 'Mingalardon', salary: '6 Lakhs' },
  { no: 19, title: 'Sales Staff', company: 'Yangoods', location: 'Pyin Oo Lwin', salary: '2.04 Lakhs' },
  { no: 20, title: 'Senior Page Admin', company: 'TOMO', location: 'Tamwe', salary: 'Nego' },
  { no: 21, title: 'Junior Page Admin', company: 'TOMO', location: 'Tamwe', salary: '3 Lakhs to 3.5 Lakhs' },
  { no: 22, title: 'Junior Accountant', company: 'Unicharm Myanmar', location: 'Yankin', salary: '3.5 Lakhs to 4 Lakhs' },
  { no: 23, title: 'Accountant', company: 'GK International Company', location: 'Kamaryut', salary: '6.5 Lakhs to 8 Lakhs' },
  { no: 24, title: 'Assistant Project Coordinator', company: 'GK International Company', location: 'Kamaryut', salary: '3.5 Lakhs to 5 Lakhs' },
  { no: 25, title: 'Interior Designer', company: 'Delight Amatat', location: 'Thingangyun', salary: '10 Lakhs to 15 Lakhs' },
  { no: 26, title: 'Quantity Surveyor', company: 'Delight Amatat', location: 'Thingangyun', salary: '10 Lakhs to 15 Lakhs' },
];

function parseSalary(salaryStr: string): { min: number | null; max: number | null } {
  if (!salaryStr || salaryStr === 'Nego') {
    return { min: null, max: null };
  }
  
  const numbers = salaryStr.match(/[\d.]+/g);
  if (!numbers) {
    return { min: null, max: null };
  }
  
  if (numbers.length >= 2) {
    return { min: parseFloat(numbers[0]), max: parseFloat(numbers[1]) };
  } else if (numbers.length === 1) {
    const val = parseFloat(numbers[0]);
    return { min: val, max: val };
  }
  
  return { min: null, max: null };
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🌱 Seeding real job data...');
  
  // Delete existing jobs and companies
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  console.log('✅ Cleared existing data');
  
  // Get unique companies
  const uniqueCompanies = [...new Set(jobsData.map(j => j.company))];
  const companyMap: Record<string, string> = {};
  
  for (const companyName of uniqueCompanies) {
    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug: generateSlug(companyName) + '-' + Date.now().toString(36),
        location: 'Yangon',
        industry: 'General',
        plan: 'free',
      },
    });
    companyMap[companyName] = company.id;
  }
  console.log(`✅ Created ${uniqueCompanies.length} companies`);
  
  // Create jobs
  let jobCount = 0;
  for (const job of jobsData) {
    const companyId = companyMap[job.company];
    if (!companyId) continue;
    
    const { min, max } = parseSalary(job.salary);
    
    await prisma.job.create({
      data: {
        title: job.title,
        slug: generateSlug(job.title) + '-' + jobCount,
        companyId,
        description: `Join ${job.company} as ${job.title}. Location: ${job.location}`,
        location: job.location,
        salaryMin: min,
        salaryMax: max,
        salaryDisplay: job.salary,
        reward: 50,
        type: 'Full-time',
        level: 'Mid',
        urgent: true,
      },
    });
    jobCount++;
  }
  
  console.log(`✅ Created ${jobCount} jobs`);
  console.log('🎉 Real job data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
