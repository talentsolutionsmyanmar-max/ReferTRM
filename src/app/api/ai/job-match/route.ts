import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Job categories with skill requirements for Myanmar market
const jobCategories = {
  'technology': {
    roles: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'IT Support', 'DevOps Engineer', 'Mobile Developer'],
    skills: ['javascript', 'python', 'react', 'node.js', 'sql', 'git', 'typescript', 'aws', 'docker'],
    avgSalary: { min: 500000, max: 3000000 },
    growth: 'high',
  },
  'marketing': {
    roles: ['Marketing Manager', 'Digital Marketing Specialist', 'Content Writer', 'Social Media Manager', 'SEO Specialist', 'Brand Manager'],
    skills: ['marketing', 'social media', 'content writing', 'seo', 'analytics', 'creative', 'communication'],
    avgSalary: { min: 400000, max: 2000000 },
    growth: 'high',
  },
  'sales': {
    roles: ['Sales Manager', 'Sales Executive', 'Business Development', 'Account Manager', 'Sales Representative'],
    skills: ['sales', 'negotiation', 'communication', 'crm', 'relationship building', 'presentation'],
    avgSalary: { min: 350000, max: 2500000 },
    growth: 'medium',
  },
  'finance': {
    roles: ['Accountant', 'Financial Analyst', 'Audit Associate', 'Finance Manager', 'Tax Specialist'],
    skills: ['accounting', 'excel', 'financial analysis', 'tax', 'auditing', 'quickbooks'],
    avgSalary: { min: 400000, max: 2000000 },
    growth: 'stable',
  },
  'hr': {
    roles: ['HR Manager', 'Recruiter', 'HR Executive', 'Training Coordinator', 'Payroll Specialist'],
    skills: ['recruitment', 'communication', 'leadership', 'training', 'employee relations', 'hris'],
    avgSalary: { min: 350000, max: 1800000 },
    growth: 'medium',
  },
  'operations': {
    roles: ['Operations Manager', 'Project Manager', 'Supply Chain Analyst', 'Logistics Coordinator', 'Quality Assurance'],
    skills: ['project management', 'leadership', 'process improvement', 'logistics', 'supply chain'],
    avgSalary: { min: 450000, max: 2200000 },
    growth: 'medium',
  },
  'customer-service': {
    roles: ['Customer Service Representative', 'Call Center Agent', 'Customer Success Manager', 'Support Specialist'],
    skills: ['customer service', 'communication', 'problem solving', 'patience', 'phone etiquette'],
    avgSalary: { min: 250000, max: 800000 },
    growth: 'stable',
  },
  'design': {
    roles: ['UI/UX Designer', 'Graphic Designer', 'Motion Designer', 'Product Designer', 'Creative Director'],
    skills: ['figma', 'photoshop', 'illustrator', 'ui design', 'ux design', 'creative', 'prototyping'],
    avgSalary: { min: 400000, max: 2500000 },
    growth: 'high',
  },
};

// Myanmar-specific career context
const myanmarCareerContext = {
  topCompanies: ['KBZ Bank', 'Wave Money', 'MPT', 'Ooredoo', 'Telenor', 'City Mart', 'Grab', 'Foodpanda'],
  growingSectors: ['Fintech', 'E-commerce', 'Digital Marketing', 'Software Development', 'Renewable Energy'],
  inDemandSkills: ['English proficiency', 'Digital literacy', 'Communication', 'Problem solving', 'Adaptability'],
};

interface UserProfile {
  skills: string[];
  experience: number;
  education: string;
  interests: string[];
  location: string;
  salaryExpectation?: number;
  workStyle?: 'remote' | 'onsite' | 'hybrid' | 'flexible';
}

interface JobMatch {
  role: string;
  category: string;
  matchScore: number;
  skillMatch: number;
  growthPotential: 'high' | 'medium' | 'stable';
  salaryRange: { min: number; max: number };
  reasons: string[];
  gaps: string[];
  recommendations: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userProfile, limit = 5 } = body as { userProfile: UserProfile; limit?: number };

    if (!userProfile || !userProfile.skills) {
      return NextResponse.json(
        { success: false, error: 'User profile with skills is required' },
        { status: 400 }
      );
    }

    // Try AI-powered matching
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert career advisor specializing in the Myanmar job market. You understand:
- Local salary ranges and expectations
- Growing industries in Myanmar
- Skills in demand
- Career progression paths
- Cultural considerations for Myanmar workplace

Analyze user profiles and recommend the best job matches with specific, actionable advice.`,
          },
          {
            role: 'user',
            content: `Analyze this user profile and recommend the top ${limit} job matches for Myanmar market:

Profile:
- Skills: ${userProfile.skills.join(', ')}
- Experience: ${userProfile.experience} years
- Education: ${userProfile.education}
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Location: ${userProfile.location || 'Yangon'}
- Salary Expectation: ${userProfile.salaryExpectation ? `${userProfile.salaryExpectation} MMK` : 'Flexible'}
- Work Style: ${userProfile.workStyle || 'Flexible'}

Available categories: ${Object.keys(jobCategories).join(', ')}

Respond in JSON format:
{
  "matches": [
    {
      "role": "Job Title",
      "category": "category name",
      "matchScore": 0-100,
      "skillMatch": 0-100,
      "growthPotential": "high|medium|stable",
      "salaryRange": {"min": number, "max": number},
      "reasons": ["reason1", "reason2"],
      "gaps": ["skill gap1"],
      "recommendations": ["actionable advice1"]
    }
  ],
  "careerPath": {
    "shortTerm": "next 1-2 years goal",
    "mediumTerm": "3-5 years goal",
    "longTerm": "5+ years goal"
  },
  "skillDevelopment": ["skill1 to develop", "skill2 to develop"],
  "marketInsights": "Brief Myanmar market insight for this profile"
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        const result = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          matches: result.matches?.slice(0, limit) || [],
          careerPath: result.careerPath || null,
          skillDevelopment: result.skillDevelopment || [],
          marketInsights: result.marketInsights || '',
          analyzedAt: new Date().toISOString(),
          source: 'ai',
        });
      } catch {
        return generateAlgorithmicMatch(userProfile, limit);
      }
    } catch (aiError) {
      console.log('AI matching failed, using algorithmic fallback:', aiError);
      return generateAlgorithmicMatch(userProfile, limit);
    }
  } catch (error) {
    console.error('Job matching error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to match jobs' },
      { status: 500 }
    );
  }
}

function generateAlgorithmicMatch(profile: UserProfile, limit: number) {
  const matches: JobMatch[] = [];
  const userSkillsLower = profile.skills.map(s => s.toLowerCase());
  
  for (const [category, data] of Object.entries(jobCategories)) {
    const categorySkillsLower = data.skills.map(s => s.toLowerCase());
    const matchingSkills = userSkillsLower.filter(skill => 
      categorySkillsLower.some(catSkill => 
        catSkill.includes(skill) || skill.includes(catSkill)
      )
    );
    
    const skillMatch = Math.round((matchingSkills.length / data.skills.length) * 100);
    let matchScore = skillMatch;
    
    if (profile.experience >= 5) matchScore += 10;
    else if (profile.experience >= 2) matchScore += 5;
    
    if (profile.interests?.some(i => 
      myanmarCareerContext.growingSectors.some(g => 
        g.toLowerCase().includes(i.toLowerCase())
      )
    )) {
      matchScore += 10;
    }
    
    matchScore = Math.min(100, matchScore);
    
    if (matchScore >= 20) {
      const topRole = data.roles[0];
      const gaps = categorySkillsLower
        .filter(skill => !userSkillsLower.some(us => us.includes(skill) || skill.includes(us)))
        .slice(0, 3);
      
      matches.push({
        role: topRole,
        category,
        matchScore,
        skillMatch,
        growthPotential: data.growth as 'high' | 'medium' | 'stable',
        salaryRange: data.avgSalary,
        reasons: [
          `Strong skill alignment (${skillMatch}% match)`,
          `${data.growth} growth sector in Myanmar`,
          matchingSkills.length > 0 ? `Skills match: ${matchingSkills.slice(0, 3).join(', ')}` : 'Transferable skills applicable',
        ],
        gaps: gaps.length > 0 ? gaps : ['Consider building category-specific skills'],
        recommendations: [
          gaps.length > 0 ? `Develop skills in: ${gaps.slice(0, 2).join(', ')}` : 'Continue building expertise',
          'Network with professionals in this field',
          data.growth === 'high' ? 'High growth sector - great timing!' : 'Stable career path',
        ],
      });
    }
  }
  
  const topMatches = matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
  
  const topMatch = topMatches[0];
  const careerPath = {
    shortTerm: `Build expertise as ${topMatch?.role || 'professional'} in ${profile.experience < 2 ? 'entry-level' : 'mid-level'} position`,
    mediumTerm: `Progress to senior ${topMatch?.role || 'role'} or team lead position`,
    longTerm: `Become ${topMatch?.category === 'technology' ? 'Technical Lead or CTO' : 'Department Head or Director'} in your field`,
  };
  
  const skillDevelopment = [
    'English communication skills',
    'Digital literacy and tools',
    'Industry-specific certifications',
  ];
  
  const marketInsights = `The Myanmar job market is seeing strong growth in ${myanmarCareerContext.growingSectors.slice(0, 3).join(', ')}. Your profile shows potential in ${topMatch?.category || 'multiple areas'} with ${topMatch?.matchScore || 'good'}% alignment.`;

  return NextResponse.json({
    success: true,
    matches: topMatches,
    careerPath,
    skillDevelopment,
    marketInsights,
    analyzedAt: new Date().toISOString(),
    source: 'algorithm',
  });
}

// GET endpoint for category suggestions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skills = searchParams.get('skills')?.split(',').map(s => s.trim().toLowerCase()) || [];
  
  const suggestions: { category: string; roles: string[]; matchScore: number }[] = [];
  
  for (const [category, data] of Object.entries(jobCategories)) {
    const categorySkillsLower = data.skills.map(s => s.toLowerCase());
    const matchingSkills = skills.filter(skill => 
      categorySkillsLower.some(catSkill => 
        catSkill.includes(skill) || skill.includes(catSkill)
      )
    );
    
    if (matchingSkills.length > 0) {
      suggestions.push({
        category,
        roles: data.roles.slice(0, 3),
        matchScore: Math.round((matchingSkills.length / data.skills.length) * 100),
      });
    }
  }
  
  return NextResponse.json({
    success: true,
    suggestions: suggestions.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5),
    allCategories: Object.keys(jobCategories),
  });
}
