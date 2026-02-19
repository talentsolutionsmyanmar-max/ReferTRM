import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Role-specific templates for enhanced generation
const roleTemplates: Record<string, { responsibilities: string[]; requirements: string[]; skills: string[] }> = {
  'software-engineer': {
    responsibilities: [
      'Design, develop, and maintain scalable software applications',
      'Write clean, maintainable, and efficient code following best practices',
      'Collaborate with cross-functional teams to define and ship new features',
      'Participate in code reviews and provide constructive feedback',
      'Troubleshoot, debug, and optimize application performance',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong proficiency in one or more programming languages',
      'Experience with version control systems (Git)',
      'Understanding of software development methodologies',
      'Problem-solving skills and attention to detail',
    ],
    skills: ['Programming', 'Problem Solving', 'Team Collaboration', 'Technical Documentation'],
  },
  'sales-manager': {
    responsibilities: [
      'Develop and implement strategic sales plans to achieve targets',
      'Lead, mentor, and motivate the sales team to maximize performance',
      'Build and maintain strong relationships with key clients',
      'Analyze market trends and competitor activities',
      'Prepare sales reports and forecasts for management',
    ],
    requirements: [
      'Bachelor\'s degree in Business, Marketing, or related field',
      'Proven track record in sales leadership',
      'Strong negotiation and communication skills',
      'Experience with CRM systems and sales analytics',
      'Ability to travel as needed',
    ],
    skills: ['Leadership', 'Negotiation', 'Strategic Planning', 'Client Relations'],
  },
  'marketing-specialist': {
    responsibilities: [
      'Develop and execute marketing campaigns across multiple channels',
      'Create engaging content for social media, website, and marketing materials',
      'Analyze campaign performance and optimize for better ROI',
      'Coordinate with external agencies and vendors',
      'Manage marketing budget and track expenses',
    ],
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      'Experience with digital marketing tools and platforms',
      'Strong creative and analytical skills',
      'Excellent written and verbal communication',
      'Knowledge of Myanmar market is a plus',
    ],
    skills: ['Content Creation', 'Digital Marketing', 'Analytics', 'Brand Management'],
  },
  'hr-manager': {
    responsibilities: [
      'Develop and implement HR strategies aligned with business goals',
      'Manage recruitment, onboarding, and employee relations',
      'Oversee compensation, benefits, and performance management',
      'Ensure compliance with labor laws and company policies',
      'Foster a positive and inclusive workplace culture',
    ],
    requirements: [
      'Bachelor\'s degree in Human Resources or related field',
      'HR certification (SHRM, HRCI) preferred',
      'Strong knowledge of Myanmar labor laws',
      'Excellent interpersonal and conflict resolution skills',
      'Experience with HRIS systems',
    ],
    skills: ['People Management', 'Recruitment', 'Policy Development', 'Conflict Resolution'],
  },
  'accountant': {
    responsibilities: [
      'Prepare and maintain accurate financial records',
      'Manage accounts payable and receivable',
      'Prepare monthly, quarterly, and annual financial reports',
      'Ensure compliance with tax regulations',
      'Coordinate with external auditors',
    ],
    requirements: [
      'Bachelor\'s degree in Accounting or Finance',
      'CPA or equivalent certification preferred',
      'Proficiency in accounting software',
      'Knowledge of Myanmar tax laws',
      'Strong attention to detail and accuracy',
    ],
    skills: ['Financial Analysis', 'Bookkeeping', 'Tax Compliance', 'Reporting'],
  },
  'operations-manager': {
    responsibilities: [
      'Oversee daily operations and ensure efficiency',
      'Develop and implement operational policies and procedures',
      'Monitor and improve operational performance metrics',
      'Manage budgets and control costs',
      'Coordinate between departments for smooth operations',
    ],
    requirements: [
      'Bachelor\'s degree in Business Administration or related field',
      'Proven experience in operations management',
      'Strong leadership and organizational skills',
      'Experience with process improvement methodologies',
      'Ability to work under pressure and meet deadlines',
    ],
    skills: ['Process Optimization', 'Team Leadership', 'Budget Management', 'Strategic Planning'],
  },
  'customer-service': {
    responsibilities: [
      'Respond to customer inquiries via phone, email, and chat',
      'Resolve customer complaints and issues professionally',
      'Maintain customer database and track interactions',
      'Provide product information and guidance',
      'Escalate complex issues to appropriate departments',
    ],
    requirements: [
      'High school diploma or equivalent',
      'Previous customer service experience preferred',
      'Excellent communication skills in English and Myanmar',
      'Patience and empathy in dealing with customers',
      'Basic computer skills',
    ],
    skills: ['Communication', 'Problem Solving', 'Patience', 'Multi-tasking'],
  },
  'data-analyst': {
    responsibilities: [
      'Collect, process, and analyze large datasets',
      'Create reports and visualizations to present findings',
      'Identify trends and provide actionable insights',
      'Collaborate with stakeholders to understand data needs',
      'Maintain data quality and integrity',
    ],
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, or related field',
      'Proficiency in SQL, Python, or R',
      'Experience with data visualization tools',
      'Strong analytical and problem-solving skills',
      'Attention to detail and accuracy',
    ],
    skills: ['Data Analysis', 'SQL', 'Visualization', 'Statistical Analysis'],
  },
  'project-manager': {
    responsibilities: [
      'Plan, execute, and monitor projects from start to finish',
      'Define project scope, goals, and deliverables',
      'Manage project resources, budget, and timeline',
      'Coordinate with stakeholders and team members',
      'Identify and mitigate project risks',
    ],
    requirements: [
      'Bachelor\'s degree in related field',
      'PMP or other project management certification preferred',
      'Proven experience in project management',
      'Strong leadership and communication skills',
      'Experience with project management tools',
    ],
    skills: ['Project Planning', 'Risk Management', 'Stakeholder Communication', 'Agile'],
  },
  'executive-assistant': {
    responsibilities: [
      'Manage executive calendar and schedule appointments',
      'Prepare meeting agendas and take minutes',
      'Handle confidential information with discretion',
      'Coordinate travel arrangements',
      'Perform general administrative tasks',
    ],
    requirements: [
      'Bachelor\'s degree preferred',
      'Previous experience as an executive assistant',
      'Proficiency in Microsoft Office suite',
      'Excellent organizational and communication skills',
      'Fluency in English and Myanmar',
    ],
    skills: ['Calendar Management', 'Communication', 'Organization', 'Discretion'],
  },
};

// Culture trait descriptions
const cultureDescriptions: Record<string, { en: string; mm: string }> = {
  'innovative': {
    en: 'embracing new ideas and creative solutions',
    mm: 'အတွေးအခေါ်သစ်များနှင့် ဆန်းသစ်တီထွင်သော ဖြေရှင်းချက်များကို လက်ခံလိုက်လာသည်',
  },
  'collaborative': {
    en: 'working together as a team to achieve shared goals',
    mm: 'ပူးတွဲဆောင်ရွက်၍ ဘုံရည်မှန်းချက်များကို အောင်မြင်အောင် လုပ်ဆောင်သည်',
  },
  'fast-paced': {
    en: 'thriving in a dynamic, rapidly changing environment',
    mm: 'တက်ကြွပြောင်းလဲနေသော ပတ်ဝန်းကျင်တွင် အောင်မြင်စွာ လှုပ်ရှားသည်',
  },
  'detail-oriented': {
    en: 'paying meticulous attention to every aspect of work',
    mm: 'အလုပ်၏ အစိတ်အပိုင်းတိုင်းကို သေချာစွာ ဂရုတစိုက် လုပ်ဆောင်သည်',
  },
  'customer-focused': {
    en: 'putting customer needs at the center of all decisions',
    mm: 'ဖောက်သည်များ၏ လိုအပ်ချက်များကို ဆုံးဖြတ်ချက်အားလုံး၏ အလယ်တွင် ထားသည်',
  },
  'results-driven': {
    en: 'focused on achieving measurable outcomes and impact',
    mm: 'တိုင်းတာနိုင်သော ရလဒ်များနှင့် သက်ရောက်မှုများကို ဦးတည်သည်',
  },
  'work-life-balance': {
    en: 'valuing personal well-being alongside professional success',
    mm: 'ပရော်ဖက်ရှင်နယ် အောင်မြင်မှုနှင့်အတူ ကိုယ်ပိုင် ကောင်းကျိုးကိုလည်း တန်ဖိုးထားသည်',
  },
  'growth-mindset': {
    en: 'continuously learning and developing new skills',
    mm: 'ဆက်လက်၍ သင်ယူပြီး ကျွမ်းကျင်မှုသစ်များ ဖွံ့ဖြိုးတိုးတက်သည်',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobTitle,
      role,
      experienceLevel,
      salaryRange,
      location,
      cultureTraits,
      additionalRequirements,
      includeBilingual,
      toneFormality,
    } = body;

    // Get role template
    const template = roleTemplates[role] || null;

    // Get culture descriptions
    const cultureDescs = (cultureTraits || [])
      .map((trait: string) => cultureDescriptions[trait])
      .filter(Boolean);

    // Build the prompt for AI
    const prompt = `Generate a professional job description for a ${jobTitle || role} position.

Context:
- Experience Level: ${experienceLevel}
- Location: ${location || 'Yangon, Myanmar'}
- Salary Range: ${salaryRange || 'Competitive market rate'}
- Company Culture: ${cultureDescs.map((c: { en: string }) => c.en).join(', ') || 'Professional and collaborative'}
- Additional Requirements: ${additionalRequirements || 'None specified'}
- Tone Formality: ${toneFormality}% (0% = very casual, 100% = very formal)

${template ? `Role-specific responsibilities to include:
${template.responsibilities.map((r: string) => `- ${r}`).join('\n')}

Required skills: ${template.skills.join(', ')}
` : ''}

Please generate a complete job description in markdown format with the following sections:
1. Job Title
2. About the Company (brief, highlighting culture)
3. Position Overview
4. Key Responsibilities (5-7 bullet points)
5. Requirements (4-6 bullet points)
6. What We Offer (benefits and perks)
7. How to Apply

${includeBilingual ? `Also include a Myanmar language translation of the key sections (About Company, Position Overview, Requirements) after the English version.` : ''}

Make the job description attractive to candidates while being professional and accurate.`;

    // Try to use AI SDK
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR professional specializing in creating compelling job descriptions for the Myanmar market. You understand local labor laws, cultural nuances, and what attracts top talent. Create professional, inclusive, and engaging job postings.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const jd = completion.choices?.[0]?.message?.content || '';
      
      // Calculate attractiveness score based on completeness
      let score = 60; // Base score
      if (salaryRange) score += 15;
      if (cultureTraits?.length >= 3) score += 10;
      if (template) score += 10;
      if (additionalRequirements) score += 5;
      if (includeBilingual) score += 5;
      if (jobTitle) score += 5;
      score = Math.min(score, 98);

      return NextResponse.json({
        success: true,
        jd,
        score,
        generatedAt: new Date().toISOString(),
      });
    } catch (aiError) {
      console.log('AI generation failed, using fallback:', aiError);
      
      // Fallback to template-based generation
      const fallbackJD = generateFallbackJD({
        jobTitle,
        role,
        experienceLevel,
        salaryRange,
        location,
        cultureTraits,
        additionalRequirements,
        includeBilingual,
        template,
        cultureDescs,
      });

      return NextResponse.json({
        success: true,
        jd: fallbackJD,
        score: 85,
        generatedAt: new Date().toISOString(),
        fallback: true,
      });
    }
  } catch (error) {
    console.error('JD Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate job description' },
      { status: 500 }
    );
  }
}

function generateFallbackJD(params: {
  jobTitle: string;
  role: string;
  experienceLevel: string;
  salaryRange: string;
  location: string;
  cultureTraits: string[];
  additionalRequirements: string;
  includeBilingual: boolean;
  template: { responsibilities: string[]; requirements: string[]; skills: string[] } | null;
  cultureDescs: { en: string; mm: string }[];
}) {
  const {
    jobTitle,
    role,
    experienceLevel,
    salaryRange,
    location,
    cultureTraits,
    additionalRequirements,
    includeBilingual,
    template,
    cultureDescs,
  } = params;

  const expLabels: Record<string, string> = {
    'entry': 'Entry Level (0-1 years)',
    'junior': 'Junior (1-3 years)',
    'mid': 'Mid-Level (3-5 years)',
    'senior': 'Senior (5-8 years)',
    'lead': 'Lead/Manager (8+ years)',
  };

  const title = jobTitle || role?.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Position';

  return `# ${title}

## About the Company
We are a forward-thinking organization in Myanmar, committed to fostering innovation and excellence. Our team values ${cultureDescs.length > 0 ? cultureDescs.map((c) => c.en).join(', ') : 'collaboration, integrity, and continuous growth'}, creating an environment where every team member can thrive and make a meaningful impact.

## Position Overview
We are seeking an experienced ${title} to join our dynamic team in ${location || 'Yangon'}. This is a ${expLabels[experienceLevel] || 'Mid-Level'} position that offers exciting opportunities for professional growth and development.

## Key Responsibilities
${template?.responsibilities?.map((r: string) => `• ${r}`).join('\n') || `• Lead and execute strategic initiatives aligned with company objectives
• Collaborate with cross-functional teams to drive project success
• Analyze data and provide actionable insights to stakeholders
• Mentor junior team members and contribute to knowledge sharing
• Stay current with industry trends and best practices`}

## Requirements
${template?.requirements?.map((r: string) => `• ${r}`).join('\n') || `• ${expLabels[experienceLevel] || '3-5 years'} of relevant experience
• Strong communication and interpersonal skills
• Proficiency in relevant tools and technologies
• Problem-solving mindset with attention to detail
• Ability to work effectively in a fast-paced environment`}

${additionalRequirements ? `## Additional Requirements\n• ${additionalRequirements}\n` : ''}

## What We Offer
• Competitive salary: ${salaryRange || 'Market-rate compensation'}
• Comprehensive health benefits
• Professional development opportunities
• Collaborative and inclusive work environment
• Work-life balance initiatives

## How to Apply
Submit your application through ReferTRM platform. Qualified candidates will be contacted for interviews.

---

${includeBilingual ? `## ကုမ္ပဏီအကြောင်း
ကျွန်ုပ်တို့သည် မြန်မာနိုင်ငံတွင် ဆန်းသစ်တီထွင်မှုနှင့် ထူးခြားမှုကို မြှင့်တင်ရန် ကတိကဝတ် ပြုထားသော အဖွဲ့အစည်းတစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့၏ အဖွဲ့သည် ${cultureDescs.length > 0 ? cultureDescs.map((c) => c.mm).join('၊ ') : 'ပူးပေါင်းဆောင်ရွက်မှု၊ ရိုသေမှုနှင့် ဆက်လက်ကြီးထွားမှု'} တန်ဖိုးများကို အလေးပေးထားပြီး အဖွဲ့ဝင်တိုင်းသည် ကြီးထွားတိုးတက်နိုင်သော ပတ်ဝန်းကျင်တစ်ခုကို ဖန်တီးပေးထားသည်။

## ရာထူးအကျဉ်းချုပ်
${location || 'ရန်ကုန်'}တွင် ရှိသော ကျွန်ုပ်တို့၏ စိတ်လှုပ်ရှားဖွယ် အဖွဲ့တွင် အတွေ့အကြုံရှိ ${title} တစ်ဦးကို လိုအပ်နေပါသည်။

## လိုအပ်ချက်များ
• ${expLabels[experienceLevel] || 'အလယ်အလတ်အဆင့်'} ဆိုင်ရာအတွေ့အကြုံ
• ဆက်သွယ်ရေးနှင့် လူမှုရေးကျွမ်းကျင်မှု အားကောင်းခြင်း
• သက်ဆိုင်ရာကိရိယာများနှင့် နည်းပညာများတွင် ကျွမ်းကျင်ခြင်း
• ပြဿနာဖြေရှင်းရေးစိတ်ဓာတ်နှင့် အသေးစိတ်ဂရုတစိုက် လုပ်ဆောင်နိုင်ခြင်း

---

` : ''}*Generated by ReferTRM AI Job Description Generator*`;
}
