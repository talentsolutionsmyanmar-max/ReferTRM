// Seed script for ReferTRM
// Run with: bunx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Companies
  const companies = await Promise.all([
    prisma.company.upsert({
      where: { slug: 'wave-money' },
      update: {},
      create: {
        name: 'Wave Money',
        nameMm: 'ဝေ့မ်းမန်း',
        slug: 'wave-money',
        logo: '/companies/wave.png',
        description: 'Myanmar\'s leading mobile financial services provider',
        industry: 'FinTech',
        companySize: '500+',
        location: 'Yangon',
        website: 'https://wavemoney.com.mm',
        overallRating: 4.2,
        workLifeBalance: 4.0,
        compensation: 4.3,
        jobSecurity: 4.1,
        management: 3.9,
        culture: 4.4,
        totalReviews: 45,
        recommendPercent: 85,
        approveCEO: 88,
        plan: 'gold',
      },
    }),
    prisma.company.upsert({
      where: { slug: 'kbz-bank' },
      update: {},
      create: {
        name: 'KBZ Bank',
        nameMm: 'ကဘီဇီဘဏ်',
        slug: 'kbz-bank',
        logo: '/companies/kbz.png',
        description: 'One of Myanmar\'s largest commercial banks',
        industry: 'Banking',
        companySize: '500+',
        location: 'Yangon',
        website: 'https://kbzbank.com',
        overallRating: 3.9,
        workLifeBalance: 3.7,
        compensation: 4.1,
        jobSecurity: 4.2,
        management: 3.8,
        culture: 3.9,
        totalReviews: 62,
        recommendPercent: 78,
        approveCEO: 75,
        plan: 'diamond',
      },
    }),
    prisma.company.upsert({
      where: { slug: 'foodpanda-mm' },
      update: {},
      create: {
        name: 'Foodpanda Myanmar',
        nameMm: 'ဖူဒ်ပန်ဒါ',
        slug: 'foodpanda-mm',
        logo: '/companies/foodpanda.png',
        description: 'Leading food delivery platform in Myanmar',
        industry: 'E-commerce',
        companySize: '201-500',
        location: 'Yangon',
        website: 'https://foodpanda.mm',
        overallRating: 3.8,
        workLifeBalance: 3.5,
        compensation: 3.9,
        jobSecurity: 3.6,
        management: 3.7,
        culture: 4.0,
        totalReviews: 38,
        recommendPercent: 72,
        approveCEO: 70,
        plan: 'silver',
      },
    }),
    prisma.company.upsert({
      where: { slug: 'myanma-postal' },
      update: {},
      create: {
        name: 'Myanma Post & Telecommunications',
        nameMm: 'မြန်မာ့ဆက်သွယ်ရေး',
        slug: 'myanma-postal',
        logo: '/companies/mpt.png',
        description: 'Myanmar\'s largest telecommunications provider',
        industry: 'Telecommunications',
        companySize: '500+',
        location: 'Yangon',
        website: 'https://mpt.com.mm',
        overallRating: 3.6,
        workLifeBalance: 3.8,
        compensation: 3.5,
        jobSecurity: 4.0,
        management: 3.4,
        culture: 3.6,
        totalReviews: 55,
        recommendPercent: 68,
        approveCEO: 65,
        plan: 'gold',
      },
    }),
    prisma.company.upsert({
      where: { slug: 'grand-royal' },
      update: {},
      create: {
        name: 'Grand Royal Group',
        nameMm: 'ဂရန်းရွယ်',
        slug: 'grand-royal',
        logo: '/companies/grandroyal.png',
        description: 'Leading FMCG company in Myanmar',
        industry: 'FMCG',
        companySize: '201-500',
        location: 'Yangon',
        website: 'https://grandroyal.com.mm',
        overallRating: 4.0,
        workLifeBalance: 3.9,
        compensation: 4.2,
        jobSecurity: 4.1,
        management: 4.0,
        culture: 4.0,
        totalReviews: 28,
        recommendPercent: 82,
        approveCEO: 80,
        plan: 'bronze',
      },
    }),
  ]);

  console.log(`✅ Created ${companies.length} companies`);

  // Create Jobs
  const wave = companies[0];
  const kbz = companies[1];
  const foodpanda = companies[2];
  const mpt = companies[3];
  const grandRoyal = companies[4];

  const jobs = await Promise.all([
    // Wave Money Jobs
    prisma.job.create({
      data: {
        title: 'Senior Software Engineer',
        slug: 'senior-software-engineer-wave-1',
        companyId: wave.id,
        description: 'Lead development of mobile banking features',
        location: 'Yangon',
        salaryMin: 12,
        salaryMax: 18,
        salaryDisplay: '12-18 Lakhs',
        reward: 100,
        type: 'Full-time',
        level: 'Senior',
        skills: 'React,Node.js,TypeScript,PostgreSQL',
        urgent: true,
        featured: true,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Manager',
        slug: 'product-manager-wave-2',
        companyId: wave.id,
        description: 'Drive product strategy for financial services',
        location: 'Yangon',
        salaryMin: 10,
        salaryMax: 15,
        salaryDisplay: '10-15 Lakhs',
        reward: 80,
        type: 'Full-time',
        level: 'Senior',
        skills: 'Product Management,Agile,Data Analysis',
        featured: true,
      },
    }),
    // KBZ Bank Jobs
    prisma.job.create({
      data: {
        title: 'Data Analyst',
        slug: 'data-analyst-kbz-1',
        companyId: kbz.id,
        description: 'Analyze banking data for insights',
        location: 'Yangon',
        salaryMin: 8,
        salaryMax: 12,
        salaryDisplay: '8-12 Lakhs',
        reward: 60,
        type: 'Full-time',
        level: 'Mid',
        skills: 'SQL,Python,Tableau,Excel',
        urgent: true,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Branch Manager',
        slug: 'branch-manager-kbz-2',
        companyId: kbz.id,
        description: 'Manage branch operations and team',
        location: 'Mandalay',
        salaryMin: 10,
        salaryMax: 14,
        salaryDisplay: '10-14 Lakhs',
        reward: 70,
        type: 'Full-time',
        level: 'Senior',
        skills: 'Banking Operations,Team Leadership',
      },
    }),
    // Foodpanda Jobs
    prisma.job.create({
      data: {
        title: 'Marketing Manager',
        slug: 'marketing-manager-fp-1',
        companyId: foodpanda.id,
        description: 'Lead marketing campaigns and growth',
        location: 'Yangon',
        salaryMin: 8,
        salaryMax: 12,
        salaryDisplay: '8-12 Lakhs',
        reward: 50,
        type: 'Full-time',
        level: 'Senior',
        skills: 'Digital Marketing,Content Strategy,Analytics',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Operations Coordinator',
        slug: 'operations-coordinator-fp-2',
        companyId: foodpanda.id,
        description: 'Coordinate delivery operations',
        location: 'Yangon',
        salaryMin: 5,
        salaryMax: 7,
        salaryDisplay: '5-7 Lakhs',
        reward: 30,
        type: 'Full-time',
        level: 'Entry',
        skills: 'Operations,Communication,Problem Solving',
      },
    }),
    // MPT Jobs
    prisma.job.create({
      data: {
        title: 'Network Engineer',
        slug: 'network-engineer-mpt-1',
        companyId: mpt.id,
        description: 'Maintain and optimize network infrastructure',
        location: 'Yangon',
        salaryMin: 9,
        salaryMax: 13,
        salaryDisplay: '9-13 Lakhs',
        reward: 65,
        type: 'Full-time',
        level: 'Mid',
        skills: 'Networking,Cisco,Troubleshooting',
      },
    }),
    // Grand Royal Jobs
    prisma.job.create({
      data: {
        title: 'Sales Executive',
        slug: 'sales-executive-gr-1',
        companyId: grandRoyal.id,
        description: 'Drive sales in assigned territory',
        location: 'Yangon',
        salaryMin: 4,
        salaryMax: 6,
        salaryDisplay: '4-6 Lakhs',
        reward: 25,
        type: 'Full-time',
        level: 'Entry',
        skills: 'Sales,Communication,Negotiation',
        urgent: true,
      },
    }),
  ]);

  console.log(`✅ Created ${jobs.length} jobs`);

  // Create Learning Tracks
  const tracks = await Promise.all([
    prisma.learningTrack.create({
      data: {
        title: 'AI & Prompt Engineering',
        titleMm: 'AI နှင့် Prompt Engineering',
        description: 'Master AI tools and prompt engineering for productivity',
        icon: '🤖',
        color: 'from-purple-500 to-blue-500',
        order: 1,
        referralBonus: 0.20,
      },
    }),
    prisma.learningTrack.create({
      data: {
        title: 'Recruitment Mastery',
        titleMm: 'Recruitment ကျွမ်းကျင်မှု',
        description: 'Learn professional recruitment and hiring skills',
        icon: '🎯',
        color: 'from-green-500 to-teal-500',
        order: 2,
        referralBonus: 0.18,
      },
    }),
    prisma.learningTrack.create({
      data: {
        title: 'Communication Skills',
        titleMm: 'ဆက်သွယ်ရေးစွမ်းရည်',
        description: 'Improve professional communication abilities',
        icon: '💬',
        color: 'from-orange-500 to-red-500',
        order: 3,
        referralBonus: 0.15,
      },
    }),
    prisma.learningTrack.create({
      data: {
        title: 'Digital Marketing',
        titleMm: 'Digital Marketing',
        description: 'Master digital marketing strategies',
        icon: '📱',
        color: 'from-pink-500 to-purple-500',
        order: 4,
        referralBonus: 0.16,
      },
    }),
    prisma.learningTrack.create({
      data: {
        title: 'Career Development',
        titleMm: 'အလုပ်အကိုင်ဖွံ့ဖြိုးတိုးတက်မှု',
        description: 'Build a successful career path',
        icon: '🚀',
        color: 'from-cyan-500 to-blue-500',
        order: 5,
        referralBonus: 0.15,
      },
    }),
  ]);

  console.log(`✅ Created ${tracks.length} learning tracks`);

  // Create Modules for each track
  for (const track of tracks) {
    await Promise.all([
      prisma.module.create({
        data: {
          trackId: track.id,
          title: 'Introduction',
          titleMm: 'မိတ်ဆက်',
          description: 'Get started with the basics',
          duration: 10,
          points: 10,
          order: 1,
        },
      }),
      prisma.module.create({
        data: {
          trackId: track.id,
          title: 'Core Concepts',
          titleMm: 'အခြေခံအယူအဆများ',
          description: 'Learn the fundamental concepts',
          duration: 15,
          points: 15,
          order: 2,
        },
      }),
      prisma.module.create({
        data: {
          trackId: track.id,
          title: 'Practical Application',
          titleMm: 'လက်တွေ့အသုံးချမှု',
          description: 'Apply what you learned',
          duration: 20,
          points: 20,
          order: 3,
        },
      }),
      prisma.module.create({
        data: {
          trackId: track.id,
          title: 'Advanced Topics',
          titleMm: 'အဆင့်မြှင့်အချက်များ',
          description: 'Master advanced techniques',
          duration: 25,
          points: 25,
          order: 4,
        },
      }),
    ]);
  }

  console.log('✅ Created modules for all tracks');

  // Create Shop Items
  await Promise.all([
    prisma.shopItem.create({
      data: {
        name: 'Premium Avatar - Warrior',
        nameMm: 'Premium Avatar - စစ်သည်',
        description: 'Unlock the warrior avatar skin',
        cost: 100,
        category: 'avatar',
        rarity: 'rare',
        unlockKey: 'avatar_warrior',
      },
    }),
    prisma.shopItem.create({
      data: {
        name: 'Premium Avatar - Sage',
        nameMm: 'Premium Avatar - ပညာရှင်',
        description: 'Unlock the sage avatar skin',
        cost: 150,
        category: 'avatar',
        rarity: 'epic',
        unlockKey: 'avatar_sage',
      },
    }),
    prisma.shopItem.create({
      data: {
        name: 'Profile Badge - Top Referrer',
        nameMm: 'Profile Badge - ထိပ်တန်းရည်ညွှန်းသူ',
        description: 'Show off your referrer status',
        cost: 200,
        category: 'feature',
        rarity: 'legendary',
        unlockKey: 'badge_top_referrer',
      },
    }),
    prisma.shopItem.create({
      data: {
        name: 'Double Points (24h)',
        nameMm: 'Points နှစ်ဆ (၂၄နာရီ)',
        description: 'Earn double points for 24 hours',
        cost: 50,
        category: 'premium',
        rarity: 'common',
        unlockKey: 'double_points_24h',
      },
    }),
  ]);

  console.log('✅ Created shop items');

  // Create Prize Pool for current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  await prisma.prizePool.create({
    data: {
      month: currentMonth,
      totalAmount: 300000,
      firstPlace: 150000,
      secondPlace: 100000,
      thirdPlace: 50000,
    },
  });

  console.log('✅ Created prize pool for ' + currentMonth);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
