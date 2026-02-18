// Admin API: Seed Real Jobs to Database
// POST /api/admin/seed-jobs

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Real jobs from Urgent Positions Excel
const urgentJobs = [
  { title: 'Senior Supervisor', company: 'RK Yangon Steel', location: 'Thanlyin', salary: '7.5 Lakhs to 10 Lakhs' },
  { title: 'Warehouse Supervisor', company: 'Universal Energy', location: 'Thingangyun', salary: 'Negotiable' },
  { title: 'Content & Script Writer', company: 'Shwe Taung Htun', location: 'Mingalar Taung Nyunt', salary: '4 Lakhs to 6 Lakhs' },
  { title: 'Site Engineer', company: 'Sun Myat Tun', location: 'Botahtaung', salary: '7.5 Lakhs' },
  { title: 'Data Collector', company: 'NielsenIQ Myanmar', location: 'Mdy, Sagaing, Meikhtila', salary: '3.5 Lakhs' },
  { title: 'Loan Officer', company: 'Real Aid Microfinance', location: 'Ayeyarwady', salary: '4 Lakhs to 5 Lakhs' },
  { title: 'Cashier', company: 'Real Aid Microfinance', location: 'Ayeyarwady', salary: 'Above 3 Lakhs' },
  { title: 'Brand Executive', company: 'Unicharm Myanmar', location: 'Yankin', salary: '7 Lakhs to 9 Lakhs' },
  { title: 'Assistant Brand Manager', company: 'Unicharm Myanmar', location: 'Yankin', salary: '15 Lakhs to 17 Lakhs' },
  { title: 'Receptionist', company: 'Myanmar Information Technology', location: 'Insein', salary: '3 Lakhs to 4 Lakhs' },
  { title: 'Assistant Accountant', company: 'KBZ Life Insurance', location: 'Bahan', salary: '4 Lakhs to 5 Lakhs' },
  { title: 'Accountant', company: 'Universal Energy', location: 'Thingangyun', salary: '6 Lakhs to 7 Lakhs' },
  { title: 'Online Sale', company: 'Salpyar', location: 'North Dagon', salary: '2.4 Lakhs' },
  { title: 'Graphic Designer', company: 'WOW Sport', location: 'Kamaryut', salary: 'Around 10 Lakhs' },
  { title: 'Senior Sales Executive', company: 'WOW Sport', location: 'Kamaryut', salary: '10 Lakhs' },
  { title: 'Senior Agency Sales Representative', company: 'AMI', location: 'Kamaryut', salary: '5 Lakhs to 6.5 Lakhs' },
  { title: 'Admin Supervisor', company: 'TOMO', location: 'South Dagon', salary: '5 Lakhs to 6 Lakhs' },
  { title: 'IT Supervisor', company: 'Wave Plus', location: 'Mingalardon', salary: '6 Lakhs' },
  { title: 'Sales Staff', company: 'Yangoods', location: 'Pyin Oo Lwin', salary: '2.04 Lakhs' },
  { title: 'Senior Page Admin', company: 'TOMO', location: 'Tamwe', salary: 'Negotiable' },
  { title: 'Junior Page Admin', company: 'TOMO', location: 'Tamwe', salary: '3 Lakhs to 3.5 Lakhs' },
  { title: 'Junior Accountant', company: 'Unicharm Myanmar', location: 'Yankin', salary: '3.5 Lakhs to 4 Lakhs' },
  { title: 'Accountant', company: 'GK International Company', location: 'Kamaryut', salary: '6.5 Lakhs to 8 Lakhs' },
  { title: 'Assistant Project Coordinator', company: 'GK International Company', location: 'Kamaryut', salary: '3.5 Lakhs to 5 Lakhs' },
  { title: 'Interior Designer', company: 'Delight Amatat', location: 'Thingangyun', salary: '10 Lakhs to 15 Lakhs' },
  { title: 'Quantity Surveyor', company: 'Delight Amatat', location: 'Thingangyun', salary: '10 Lakhs to 15 Lakhs' },
];

const skillsMap: Record<string, string[]> = {
  'supervisor': ['leadership', 'team management', 'communication', 'problem solving'],
  'warehouse': ['inventory management', 'logistics', 'excel', 'organization'],
  'content': ['writing', 'creative', 'research', 'social media'],
  'engineer': ['technical', 'problem solving', 'project management', 'autocad'],
  'data': ['data collection', 'excel', 'attention to detail', 'research'],
  'loan': ['finance', 'customer service', 'documentation', 'analysis'],
  'cashier': ['cash handling', 'customer service', 'excel', 'accuracy'],
  'brand': ['marketing', 'branding', 'communication', 'analysis'],
  'receptionist': ['communication', 'customer service', 'excel', 'phone etiquette'],
  'accountant': ['accounting', 'excel', 'quickbooks', 'financial reporting'],
  'sale': ['sales', 'negotiation', 'communication', 'customer relationship'],
  'graphic': ['adobe photoshop', 'illustrator', 'creative', 'design'],
  'admin': ['administration', 'excel', 'organization', 'communication'],
  'it': ['it support', 'networking', 'troubleshooting', 'hardware'],
  'page': ['social media', 'facebook', 'content management', 'communication'],
  'project': ['project management', 'coordination', 'communication', 'planning'],
  'interior': ['design', 'autocad', '3d modeling', 'creative'],
  'surveyor': ['quantity surveying', 'construction', 'estimation', 'measurement'],
};

const titleTranslations: Record<string, string> = {
  'Senior Supervisor': 'အကြီးကြပ် တာဝန်ခံ',
  'Warehouse Supervisor': 'ကျင်းစီမံခန့်ခွဲသူ',
  'Content & Script Writer': 'အကြောင်းအရာနှင့် စကရစ်ရေးသူ',
  'Site Engineer': 'နေရာခန့်အင်ဂျင်နီယာ',
  'Data Collector': 'ဒေတာစုဆောင်းသူ',
  'Loan Officer': 'ချေးငွေမန်နေဂျာ',
  'Cashier': 'ငွေရှင်',
  'Brand Executive': 'ဘရန်းအမှုဆောင်',
  'Assistant Brand Manager': 'ဘရန်းမန်နေဂျာလက်ထောက်',
  'Receptionist': 'ကြိုဆိုရေးမှူး',
  'Assistant Accountant': 'စာရင်းကိုင်လက်ထောက်',
  'Accountant': 'စာရင်းကိုင်',
  'Online Sale': 'အွန်လိုင်းရောင်းသူ',
  'Graphic Designer': 'ဂရပ်ဖစ်ဒီဇိုင်နာ',
  'Senior Sales Executive': 'အရောင်းမန်နေဂျာကြီး',
  'Senior Agency Sales Representative': 'အေဂျင်စီအရောင်းကိုယ်စားလှယ်',
  'Admin Supervisor': 'အုပ်ချုပ်ရေးကြီးကြပ်သူ',
  'IT Supervisor': 'IT ကြီးကြပ်သူ',
  'Sales Staff': 'အရောင်းဝန်ထမ်း',
  'Senior Page Admin': 'စာမျက်နှာအက်ဒမင်ကြီး',
  'Junior Page Admin': 'စာမျက်နှာအက်ဒမင်ငယ်',
  'Junior Accountant': 'စာရင်းကိုင်ငယ်',
  'Assistant Project Coordinator': 'ပရောဂျက်ကိုဩဒိနာတူလက်ထောက်',
  'Interior Designer': 'အတွင်းပိုင်းဒီဇိုင်နာ',
  'Quantity Surveyor': 'ပမာဏတိုင်းတာသူ',
};

const levelMap: Record<string, 'Entry' | 'Mid' | 'Senior' | 'Lead'> = {
  'senior': 'Senior', 'assistant': 'Entry', 'junior': 'Entry',
  'supervisor': 'Mid', 'manager': 'Senior', 'executive': 'Mid',
  'officer': 'Entry', 'staff': 'Entry', 'admin': 'Entry',
};

function parseSalary(salaryStr: string): { min: number; max: number } {
  const str = salaryStr.toLowerCase();
  if (str.includes('nego')) return { min: 0, max: 0 };
  const lakhs = str.match(/[\d.]+/g);
  if (!lakhs?.length) return { min: 0, max: 0 };
  const values = lakhs.map(v => parseFloat(v) * 100000);
  return values.length === 1 ? { min: values[0], max: values[0] } : { min: Math.min(...values), max: Math.max(...values) };
}

function calculateReward(salaryMin: number, salaryMax: number): number {
  if (!salaryMin && !salaryMax) return 100000;
  const avgSalary = (salaryMin + salaryMax) / 2;
  return Math.max(50000, Math.min(500000, Math.round((avgSalary * 0.15) / 10000) * 10000));
}

function getSkills(title: string): string[] {
  const titleLower = title.toLowerCase();
  for (const [keyword, skills] of Object.entries(skillsMap)) {
    if (titleLower.includes(keyword)) return skills;
  }
  return ['communication', 'teamwork', 'problem solving'];
}

function getLevel(title: string): 'Entry' | 'Mid' | 'Senior' | 'Lead' {
  const titleLower = title.toLowerCase();
  for (const [keyword, level] of Object.entries(levelMap)) {
    if (titleLower.includes(keyword)) return level;
  }
  return 'Mid';
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const results: { inserted: string[]; skipped: string[]; errors: string[] } = { inserted: [], skipped: [], errors: [] };

    // Check existing jobs first
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('title, company');

    const existingSet = new Set((existingJobs || []).map(j => `${j.title}|${j.company}`));

    // Prepare and insert jobs
    for (const job of urgentJobs) {
      const key = `${job.title}|${job.company}`;
      if (existingSet.has(key)) {
        results.skipped.push(key);
        continue;
      }

      const { min, max } = parseSalary(job.salary);
      const jobRecord = {
        title: job.title,
        title_mm: titleTranslations[job.title] || job.title,
        company: job.company,
        company_id: job.company.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20),
        location: job.location,
        salary: job.salary,
        salary_min: min,
        salary_max: max,
        reward: calculateReward(min, max),
        skills: getSkills(job.title),
        type: 'Full-time' as const,
        level: getLevel(job.title),
        urgent: true,
        description: `${job.title} position at ${job.company}. Location: ${job.location}. Salary: ${job.salary}`,
        requirements: getSkills(job.title).map(s => `Experience with ${s}`),
        benefits: ['Competitive salary', 'Professional development', 'Health benefits'],
        status: 'active' as const,
        posted_by: 'system',
        posted_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('jobs').insert(jobRecord);
      if (error) {
        results.errors.push(`${key}: ${error.message}`);
      } else {
        results.inserted.push(key);
      }
    }

    // Get final count
    const { count } = await supabase.from('jobs').select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.inserted.length} jobs, skipped ${results.skipped.length} existing`,
      totalJobsInDatabase: count,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'POST to this endpoint to seed jobs',
    jobsToSeed: urgentJobs.length,
    jobs: urgentJobs.map(j => ({ title: j.title, company: j.company, location: j.location, salary: j.salary }))
  });
}
