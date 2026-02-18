import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Offer letter interface
interface OfferLetterData {
  candidateName: string;
  candidateEmail: string;
  position: string;
  department: string;
  reportingTo: string;
  startDate: string;
  salary: {
    base: number;
    currency: string;
    period: 'monthly' | 'annual';
    allowances?: { name: string; amount: number }[];
  };
  benefits: string[];
  probationPeriod: number; // months
  workHours: {
    start: string;
    end: string;
    daysPerWeek: number;
  };
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract';
  offerExpiryDate: string;
  companyInfo: {
    name: string;
    address: string;
    hrName: string;
    hrTitle: string;
  };
  specialConditions?: string[];
}

// Myanmar labor law considerations
const myanmarLaborLaw = {
  standardWorkHours: 8,
  standardWorkDays: 5,
  overtimeRate: 2, // double pay
  publicHolidays: [
    'Independence Day (January 4)',
    'Union Day (February 12)',
    'Peasants Day (March 2)',
    'Water Festival (April 13-16)',
    'Labour Day (May 1)',
    'Martyrs Day (July 19)',
    'Christmas Day (December 25)',
  ],
  annualLeave: 10, // days
  sickLeave: 30, // days per year
  casualLeave: 6, // days per year
  maternityLeave: 12, // weeks
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      offerData, 
      includeMyanmar = true,
      template = 'standard',
    } = body as { 
      offerData: OfferLetterData;
      includeMyanmar?: boolean;
      template?: 'standard' | 'executive' | 'contract';
    };

    if (!offerData?.candidateName || !offerData?.position || !offerData?.companyInfo?.name) {
      return NextResponse.json(
        { success: false, error: 'Missing required offer details' },
        { status: 400 }
      );
    }

    // Try AI-powered offer letter generation
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert HR professional specializing in Myanmar employment law and offer letter creation. Create professional, legally compliant offer letters that follow Myanmar labor regulations. Include all necessary terms and conditions.`,
          },
          {
            role: 'user',
            content: `Generate a professional offer letter for:

Candidate: ${offerData.candidateName}
Position: ${offerData.position}
Department: ${offerData.department}
Reporting To: ${offerData.reportingTo}
Start Date: ${offerData.startDate}
Location: ${offerData.location}
Employment Type: ${offerData.employmentType}

Compensation:
- Base Salary: ${offerData.salary.base} ${offerData.salary.currency} (${offerData.salary.period})
${offerData.salary.allowances?.map(a => `- ${a.name}: ${a.amount} ${offerData.salary.currency}`).join('\n') || ''}

Benefits: ${offerData.benefits.join(', ')}
Probation Period: ${offerData.probationPeriod} months
Work Hours: ${offerData.workHours.start} - ${offerData.workHours.end}, ${offerData.workHours.daysPerWeek} days/week

Company: ${offerData.companyInfo.name}
Address: ${offerData.companyInfo.address}

HR Contact: ${offerData.companyInfo.hrName}, ${offerData.companyInfo.hrTitle}
Offer Expires: ${offerData.offerExpiryDate}

${offerData.specialConditions ? `Special Conditions: ${offerData.specialConditions.join('; ')}` : ''}

${includeMyanmar ? 'Include Myanmar translation after the English version.' : ''}

Create a formal offer letter with:
1. Header with company details
2. Offer statement
3. Position details
4. Compensation package
5. Benefits
6. Terms and conditions (probation, notice period, etc.)
7. Acceptance instructions
8. Signature blocks`,
          },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      return NextResponse.json({
        success: true,
        offerLetter: responseText,
        generatedAt: new Date().toISOString(),
        source: 'ai',
      });
    } catch (aiError) {
      console.log('AI generation failed, using template:', aiError);
      return generateTemplateOfferLetter(offerData, includeMyanmar);
    }
  } catch (error) {
    console.error('Offer letter generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate offer letter' },
      { status: 500 }
    );
  }
}

function generateTemplateOfferLetter(data: OfferLetterData, includeMyanmar: boolean) {
  const { 
    candidateName, 
    position, 
    department, 
    reportingTo, 
    startDate, 
    salary, 
    benefits, 
    probationPeriod,
    workHours,
    location,
    employmentType,
    offerExpiryDate,
    companyInfo,
    specialConditions,
  } = data;

  const formattedSalary = salary.period === 'monthly'
    ? `${salary.base.toLocaleString()} ${salary.currency} per month`
    : `${salary.base.toLocaleString()} ${salary.currency} per annum`;

  let offerLetter = `${companyInfo.name.toUpperCase()}
${companyInfo.address}

Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

OFFER OF EMPLOYMENT

Dear ${candidateName},

We are pleased to offer you the position of ${position} in our ${department} department at ${companyInfo.name}. This letter sets out the terms and conditions of your employment.

POSITION DETAILS
Position: ${position}
Department: ${department}
Reporting To: ${reportingTo}
Location: ${location}
Employment Type: ${employmentType.charAt(0).toUpperCase() + employmentType.slice(1)}
Start Date: ${startDate}

COMPENSATION
Base Salary: ${formattedSalary}
${salary.allowances?.map(a => `${a.name}: ${a.amount.toLocaleString()} ${salary.currency} per month`).join('\n') || ''}

BENEFITS
${benefits.map(b => `• ${b}`).join('\n')}

WORK SCHEDULE
Working Hours: ${workHours.start} - ${workHours.end}
Working Days: ${workHours.daysPerWeek} days per week

PROBATION PERIOD
You will be on probation for a period of ${probationPeriod} months from your start date. During this period, either party may terminate employment with 1 week's notice.

TERMS AND CONDITIONS
1. Notice Period: After confirmation, either party may terminate employment with 1 month's written notice.
2. Confidentiality: You will be required to sign a confidentiality agreement.
3. You must comply with all company policies and procedures.

${specialConditions ? `SPECIAL CONDITIONS\n${specialConditions.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : ''}

ACCEPTANCE
If you wish to accept this offer, please sign and return this letter by ${offerExpiryDate}.

We look forward to welcoming you to our team.

Sincerely,


_____________________________
${companyInfo.hrName}
${companyInfo.hrTitle}
${companyInfo.name}

----------------------------------------

ACCEPTANCE

I, ${candidateName}, accept the offer of employment under the terms and conditions outlined above.

Signature: _____________________________
Date: _____________________________
`;

  if (includeMyanmar) {
    offerLetter += `

========================================

${companyInfo.name.toUpperCase()}
${companyInfo.address}

ရက်စွဲ: ${new Date().toLocaleDateString('my-MM', { year: 'numeric', month: 'long', day: 'numeric' })}

အလုပ်ခန့်အပ်ခြင်းစာတမ်း

ခင်ဗျား ${candidateName} အား ${companyInfo.name} တွင် ${department} ဌာန၌ ${position} ရာထူးဖြင့် အလုပ်ခန့်အပ်ပါသည်။ ဤစာတမ်းတွင် ခင်ဗျား၏ အလုပ်သက်တမ်းဆိုင်ရာ စည်းမျဉ်းစည်းကမ်းများကို ဖော်ပြထားပါသည်။

ရာထူးအသေးစိတ်
ရာထူး: ${position}
ဌာန: ${department}
တာဝန်ခံ: ${reportingTo}
နေရာ: ${location}
အလုပ်အမျိုးအစား: ${employmentType === 'full-time' ? 'အချိန်ပြည့်' : employmentType === 'part-time' ? 'အချိန်ပိုင်း' : 'စာချုပ်'}
စတင်ရက်စွဲ: ${startDate}

လစာနှင့်အခွင့်အစွမ်း
အခြေခံလစာ: ${salary.base.toLocaleString()} ${salary.currency} (လစဉ်)

အလုပ်ချိန်
အလုပ်ချိန်: ${workHours.start} - ${workHours.end}
အလုပ်ရက်: တစ်ပတ်လျှင် ${workHours.daysPerWeek} ရက်

စမ်းသပ်ကာလ
စမ်းသပ်ကာလ: ${probationPeriod} လ

လက်မှတ်ရေးထိုးခြင်း
ဤစာတမ်းကို ${offerExpiryDate} နောက်ဆုံးထား၍ လက်မှတ်ရေးထိုးပြီး ပြန်လည်ပေးပို့ပါ။


_____________________________
${companyInfo.hrName}
${companyInfo.hrTitle}
`;
  }

  return NextResponse.json({
    success: true,
    offerLetter,
    generatedAt: new Date().toISOString(),
    source: 'template',
  });
}

// GET endpoint for offer letter templates and info
export async function GET() {
  return NextResponse.json({
    success: true,
    templates: [
      {
        id: 'standard',
        name: 'Standard Offer Letter',
        description: 'Standard full-time employment offer',
        suitableFor: ['full-time'],
      },
      {
        id: 'executive',
        name: 'Executive Offer Letter',
        description: 'Senior role with additional benefits and clauses',
        suitableFor: ['full-time', 'executive'],
      },
      {
        id: 'contract',
        name: 'Contract Offer Letter',
        description: 'Fixed-term contract employment',
        suitableFor: ['contract', 'part-time'],
      },
    ],
    benefitOptions: [
      'Health Insurance',
      'Annual Bonus',
      'Performance Bonus',
      'Transportation Allowance',
      'Meal Allowance',
      'Phone/Internet Allowance',
      'Professional Development',
      'Annual Leave (10 days)',
      'Sick Leave (30 days)',
      'Public Holidays',
      'Provident Fund',
      'Life Insurance',
    ],
    myanmarLaborLaw: {
      standardWorkHours: myanmarLaborLaw.standardWorkHours,
      standardWorkDays: myanmarLaborLaw.standardWorkDays,
      annualLeave: myanmarLaborLaw.annualLeave,
      sickLeave: myanmarLaborLaw.sickLeave,
      publicHolidays: myanmarLaborLaw.publicHolidays.length,
      note: 'All offers must comply with Myanmar Labor Laws 2011 and subsequent amendments.',
    },
    publicHolidays: myanmarLaborLaw.publicHolidays,
  });
}
