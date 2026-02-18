import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// ATS-friendly resume sections
interface ResumeSection {
  type: 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'projects';
  title: string;
  content: string | ResumeEntry[];
}

interface ResumeEntry {
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    portfolio?: string;
  };
  summary?: string;
  experience: ResumeEntry[];
  education: ResumeEntry[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  certifications?: { name: string; issuer: string; date: string }[];
  projects?: { name: string; description: string; technologies: string[] }[];
  languages?: { language: string; proficiency: string }[];
}

// ATS keyword optimization for Myanmar job market
const atsKeywords = {
  'software-engineer': ['javascript', 'python', 'react', 'node.js', 'sql', 'git', 'api', 'agile', 'debugging', 'testing'],
  'marketing': ['digital marketing', 'seo', 'social media', 'content strategy', 'analytics', 'campaign management', 'brand development'],
  'sales': ['sales strategy', 'client relationship', 'negotiation', 'pipeline management', 'revenue growth', 'territory management'],
  'hr': ['recruitment', 'employee relations', 'performance management', 'onboarding', 'hris', 'compliance', 'training'],
  'finance': ['financial analysis', 'budgeting', 'forecasting', 'reconciliation', 'reporting', 'tax compliance', 'audit'],
  'operations': ['process improvement', 'supply chain', 'logistics', 'vendor management', 'cost reduction', 'quality assurance'],
};

// Myanmar-specific resume tips
const myanmarResumeTips = [
  'Include both English and Myanmar language skills if applicable',
  'Mention any experience with Myanmar government or local companies',
  'Highlight familiarity with local regulations and business practices',
  'Include references from Myanmar-based employers when possible',
  'Use a clean, professional format that works with local ATS systems',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      resumeData, 
      targetRole,
      optimizeForATS = true,
      includeMyanmar = false,
    } = body as { 
      resumeData: ResumeData; 
      targetRole?: string;
      optimizeForATS?: boolean;
      includeMyanmar?: boolean;
    };

    if (!resumeData?.personalInfo?.name) {
      return NextResponse.json(
        { success: false, error: 'Personal information is required' },
        { status: 400 }
      );
    }

    // Try AI-powered resume optimization
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert resume writer specializing in ATS-optimized resumes. Create clean, professional resumes that pass Applicant Tracking Systems. Focus on:
- Clear section headings
- Quantifiable achievements
- Keyword optimization
- Clean formatting
- Action verbs

${includeMyanmar ? 'Also provide a Myanmar language version of the resume.' : ''}`,
          },
          {
            role: 'user',
            content: `Create an ATS-optimized resume for:

Personal Info:
- Name: ${resumeData.personalInfo.name}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone || ''}
- Location: ${resumeData.personalInfo.location || ''}

Target Role: ${targetRole || 'General Professional'}

Summary: ${resumeData.summary || 'Not provided'}

Experience:
${resumeData.experience.map(e => `- ${e.title} at ${e.organization} (${e.startDate} - ${e.endDate || 'Present'}): ${e.description.join(', ')}`).join('\n')}

Education:
${resumeData.education.map(e => `- ${e.title} from ${e.organization} (${e.startDate})`).join('\n')}

Skills:
- Technical: ${resumeData.skills.technical.join(', ')}
- Soft: ${resumeData.skills.soft.join(', ')}
- Tools: ${resumeData.skills.tools.join(', ')}

${resumeData.certifications ? `Certifications: ${resumeData.certifications.map(c => c.name).join(', ')}` : ''}

${resumeData.languages ? `Languages: ${resumeData.languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}` : ''}

Optimize for ATS: ${optimizeForATS}

Respond in JSON format:
{
  "resume": "full ATS-optimized resume text",
  ${includeMyanmar ? '"resumeMyanmar": "Myanmar language version",' : ''}
  "atsScore": 0-100,
  "keywordMatches": ["matched keyword1", "matched keyword2"],
  "suggestions": ["improvement suggestion1"],
  "sections": ["list of sections included"]
}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 3000,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        const result = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          resume: result.resume,
          resumeMyanmar: result.resumeMyanmar,
          atsScore: result.atsScore || 75,
          keywordMatches: result.keywordMatches || [],
          suggestions: result.suggestions || [],
          sections: result.sections || [],
          tips: myanmarResumeTips,
          generatedAt: new Date().toISOString(),
          source: 'ai',
        });
      } catch {
        return generateFallbackResume(resumeData, targetRole, optimizeForATS, includeMyanmar);
      }
    } catch (aiError) {
      console.log('AI resume generation failed, using template:', aiError);
      return generateFallbackResume(resumeData, targetRole, optimizeForATS, includeMyanmar);
    }
  } catch (error) {
    console.error('Resume builder error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}

function generateFallbackResume(
  resumeData: ResumeData,
  targetRole: string | undefined,
  optimizeForATS: boolean,
  includeMyanmar: boolean
) {
  const { personalInfo, summary, experience, education, skills, certifications, languages } = resumeData;
  
  let resume = '';
  
  // Header
  resume += `${personalInfo.name}\n`;
  resume += `${personalInfo.email}`;
  if (personalInfo.phone) resume += ` | ${personalInfo.phone}`;
  if (personalInfo.location) resume += ` | ${personalInfo.location}`;
  resume += '\n\n';
  
  // Professional Summary
  if (summary) {
    resume += `PROFESSIONAL SUMMARY\n`;
    resume += `${'─'.repeat(50)}\n`;
    resume += `${summary}\n\n`;
  }
  
  // Experience
  if (experience.length > 0) {
    resume += `PROFESSIONAL EXPERIENCE\n`;
    resume += `${'─'.repeat(50)}\n`;
    
    experience.forEach(exp => {
      resume += `\n${exp.title}\n`;
      resume += `${exp.organization}`;
      if (exp.location) resume += ` | ${exp.location}`;
      resume += `\n`;
      resume += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || 'Present'}\n\n`;
      
      exp.description.forEach(desc => {
        resume += `• ${desc}\n`;
      });
    });
    resume += '\n';
  }
  
  // Education
  if (education.length > 0) {
    resume += `EDUCATION\n`;
    resume += `${'─'.repeat(50)}\n`;
    
    education.forEach(edu => {
      resume += `\n${edu.title}\n`;
      resume += `${edu.organization}`;
      if (edu.startDate) resume += ` | ${edu.startDate}`;
      resume += '\n';
    });
    resume += '\n';
  }
  
  // Skills
  resume += `SKILLS\n`;
  resume += `${'─'.repeat(50)}\n`;
  
  if (skills.technical.length > 0) {
    resume += `Technical: ${skills.technical.join(', ')}\n`;
  }
  if (skills.soft.length > 0) {
    resume += `Soft Skills: ${skills.soft.join(', ')}\n`;
  }
  if (skills.tools.length > 0) {
    resume += `Tools & Technologies: ${skills.tools.join(', ')}\n`;
  }
  resume += '\n';
  
  // Certifications
  if (certifications && certifications.length > 0) {
    resume += `CERTIFICATIONS\n`;
    resume += `${'─'.repeat(50)}\n`;
    certifications.forEach(cert => {
      resume += `• ${cert.name} - ${cert.issuer} (${cert.date})\n`;
    });
    resume += '\n';
  }
  
  // Languages
  if (languages && languages.length > 0) {
    resume += `LANGUAGES\n`;
    resume += `${'─'.repeat(50)}\n`;
    languages.forEach(lang => {
      resume += `• ${lang.language}: ${lang.proficiency}\n`;
    });
  }

  // Calculate ATS score
  let atsScore = 60;
  if (summary) atsScore += 5;
  if (experience.length >= 2) atsScore += 10;
  if (education.length > 0) atsScore += 5;
  if (skills.technical.length >= 3) atsScore += 10;
  if (skills.soft.length >= 2) atsScore += 5;
  if (certifications && certifications.length > 0) atsScore += 5;
  atsScore = Math.min(95, atsScore);

  // Find keyword matches
  const keywordMatches: string[] = [];
  const roleKey = targetRole?.toLowerCase().replace(/\s+/g, '-') || '';
  const targetKeywords = atsKeywords[roleKey as keyof typeof atsKeywords] || [];
  
  const allText = resume.toLowerCase();
  targetKeywords.forEach(keyword => {
    if (allText.includes(keyword.toLowerCase())) {
      keywordMatches.push(keyword);
    }
  });

  const suggestions = [
    'Add more quantifiable achievements (e.g., "increased sales by 25%")',
    'Include relevant keywords for your target role',
    'Use action verbs to start each bullet point',
    'Keep formatting simple and consistent',
    'Tailor your summary to the specific job',
  ];

  return NextResponse.json({
    success: true,
    resume,
    atsScore,
    keywordMatches,
    suggestions,
    sections: ['Summary', 'Experience', 'Education', 'Skills'],
    tips: myanmarResumeTips,
    generatedAt: new Date().toISOString(),
    source: 'template',
  });
}

// GET endpoint for resume templates
export async function GET() {
  return NextResponse.json({
    success: true,
    templates: [
      {
        id: 'professional',
        name: 'Professional',
        description: 'Clean and traditional format suitable for corporate roles',
        recommended: ['finance', 'hr', 'operations'],
      },
      {
        id: 'technical',
        name: 'Technical',
        description: 'Skills-focused format for IT and engineering roles',
        recommended: ['software-engineer', 'data-analyst', 'devops'],
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Modern format for design and marketing roles',
        recommended: ['designer', 'marketing', 'content-writer'],
      },
      {
        id: 'entry-level',
        name: 'Entry Level',
        description: 'Education-focused format for recent graduates',
        recommended: ['fresh-graduate', 'intern', 'junior'],
      },
    ],
    sections: [
      { id: 'summary', name: 'Professional Summary', required: true },
      { id: 'experience', name: 'Work Experience', required: true },
      { id: 'education', name: 'Education', required: true },
      { id: 'skills', name: 'Skills', required: true },
      { id: 'certifications', name: 'Certifications', required: false },
      { id: 'projects', name: 'Projects', required: false },
      { id: 'languages', name: 'Languages', required: false },
    ],
    atsTips: [
      'Use standard section headings (Experience, Education, Skills)',
      'Avoid tables, graphics, and complex formatting',
      'Use standard fonts (Arial, Calibri, Times New Roman)',
      'Include relevant keywords from the job description',
      'Save as .docx or .pdf format',
    ],
    myanmarTips: myanmarResumeTips,
  });
}
