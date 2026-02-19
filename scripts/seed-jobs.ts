// Seed Script: Import Real Jobs from Excel to Supabase
// Run with: npx ts-node scripts/seed-jobs.ts

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

// Skills mapping by job title
const skillsMap: Record<string, string[]> = {
  'supervisor': ['leadership', 'team management', 'communication', 'problem solving'],
  'warehouse': ['inventory management', 'logistics', 'excel', 'organization'],
  'content': ['writing', 'creative', 'research', 'social media'],
  'script': ['writing', 'creative', 'storytelling', 'communication'],
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

// Burmese translations
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
  'Senior Sales Executive': 'ငွေရှင်အရောင်းမန်နေဂျာ',
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

// Job level mapping
const levelMap: Record<string, 'Entry' | 'Mid' | 'Senior' | 'Lead'> = {
  'senior': 'Senior',
  'assistant': 'Entry',
  'junior': 'Entry',
  'supervisor': 'Mid',
  'manager': 'Senior',
  'executive': 'Mid',
  'officer': 'Entry',
  'staff': 'Entry',
  'admin': 'Entry',
};

// Parse salary string to min/max
function parseSalary(salaryStr: string): { min: number; max: number } {
  const str = salaryStr.toLowerCase();

  if (str.includes('nego') || str.includes('negotiable')) {
    return { min: 0, max: 0 };
  }

  const lakhs = str.match(/[\d.]+/g);
  if (!lakhs || lakhs.length === 0) {
    return { min: 0, max: 0 };
  }

  const values = lakhs.map(v => parseFloat(v) * 100000); // Convert Lakhs to MMK

  if (values.length === 1) {
    return { min: values[0], max: values[0] };
  }

  return { min: Math.min(...values), max: Math.max(...values) };
}

// Calculate referral reward (15-20% of annual salary / 12 months)
function calculateReward(salaryMin: number, salaryMax: number): number {
  if (salaryMin === 0 && salaryMax === 0) {
    return 100000; // Default 1 lakh for negotiable
  }

  const avgSalary = (salaryMin + salaryMax) / 2;
  // Reward is roughly 15-20% of monthly salary, rounded to nice numbers
  const reward = Math.round((avgSalary * 0.15) / 10000) * 10000;
  return Math.max(50000, Math.min(500000, reward)); // Between 50K and 500K
}

// Get skills for job title
function getSkills(title: string): string[] {
  const titleLower = title.toLowerCase();

  for (const [keyword, skills] of Object.entries(skillsMap)) {
    if (titleLower.includes(keyword)) {
      return skills;
    }
  }

  return ['communication', 'teamwork', 'problem solving']; // Default skills
}

// Get job level from title
function getLevel(title: string): 'Entry' | 'Mid' | 'Senior' | 'Lead' {
  const titleLower = title.toLowerCase();

  for (const [keyword, level] of Object.entries(levelMap)) {
    if (titleLower.includes(keyword)) {
      return level as 'Entry' | 'Mid' | 'Senior' | 'Lead';
    }
  }

  return 'Mid';
}

// Generate company slug for ID
function generateCompanyId(companyName: string): string {
  return companyName.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
}

async function seedJobs() {
  console.log('🚀 Starting job seeding process...\n');

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase credentials not found. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check existing jobs count
  const { count: existingCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });

  console.log(`📊 Existing jobs in database: ${existingCount || 0}`);

  // Prepare job records
  const jobsToInsert = urgentJobs.map((job, index) => {
    const { min, max } = parseSalary(job.salary);
    const reward = calculateReward(min, max);
    const skills = getSkills(job.title);
    const level = getLevel(job.title);

    return {
      title: job.title,
      title_mm: titleTranslations[job.title] || job.title,
      company: job.company,
      company_id: generateCompanyId(job.company),
      location: job.location,
      salary: job.salary,
      salary_min: min,
      salary_max: max,
      reward: reward,
      skills: skills,
      type: 'Full-time' as const,
      level: level,
      urgent: true,
      description: `${job.title} position at ${job.company}. Location: ${job.location}. Salary: ${job.salary}`,
      requirements: skills.map(s => `Experience with ${s}`),
      benefits: ['Competitive salary', 'Professional development', 'Health benefits'],
      status: 'active' as const,
      posted_by: 'system',
      posted_at: new Date().toISOString(),
    };
  });

  console.log(`\n📝 Prepared ${jobsToInsert.length} jobs to insert:\n`);

  // Display preview
  jobsToInsert.slice(0, 5).forEach((job, i) => {
    console.log(`${i + 1}. ${job.title} @ ${job.company}`);
    console.log(`   📍 ${job.location} | 💰 ${job.salary}`);
    console.log(`   🎁 Reward: ${(job.reward).toLocaleString()} MMK | Level: ${job.level}`);
    console.log(`   🛠️ Skills: ${job.skills.join(', ')}\n`);
  });
  console.log(`... and ${jobsToInsert.length - 5} more jobs\n`);

  // Insert jobs
  console.log('💾 Inserting jobs into Supabase...');

  const { data, error } = await supabase
    .from('jobs')
    .upsert(jobsToInsert, {
      onConflict: 'title,company',
      ignoreDuplicates: false
    })
    .select();

  if (error) {
    console.error('❌ Error inserting jobs:', error);

    // Try inserting one by one to identify issues
    console.log('\n🔄 Trying individual inserts...\n');

    for (const job of jobsToInsert) {
      const { error: insertError } = await supabase
        .from('jobs')
        .insert(job);

      if (insertError) {
        console.log(`⚠️  Skipped: ${job.title} @ ${job.company} - ${insertError.message}`);
      } else {
        console.log(`✅ Inserted: ${job.title} @ ${job.company}`);
      }
    }
  } else {
    console.log(`✅ Successfully inserted/updated ${data?.length || jobsToInsert.length} jobs!`);
  }

  // Verify final count
  const { count: finalCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📊 Final job count: ${finalCount || 0}`);
  console.log('\n✨ Seeding complete!');
}

// Run the seed function
seedJobs().catch(console.error);
