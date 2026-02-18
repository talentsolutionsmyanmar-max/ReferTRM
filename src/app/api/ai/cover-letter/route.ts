import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Cover letter templates by job type
const coverLetterTemplates = {
  professional: {
    opening: `Dear Hiring Manager,

I am writing to express my strong interest in the {position} role at {company}. With {experience} years of experience in {field}, I am confident that my skills and passion make me an excellent candidate for this position.`,
    
    body: `In my current role as {currentRole}, I have successfully {achievement1}. I have developed strong expertise in {skills}, which directly aligns with the requirements for this position. My experience includes:

• {bullet1}
• {bullet2}
• {bullet3}

I am particularly drawn to {company} because of {companyReason}. I believe my background in {relevantExperience} would allow me to make meaningful contributions to your team.`,
    
    closing: `I would welcome the opportunity to discuss how my experience and skills can benefit {company}. Thank you for considering my application. I look forward to hearing from you.

Best regards,
{name}`,
  },
  
  creative: {
    opening: `Dear {company} Team,

When I discovered the {position} opening, I knew I had to apply. {hookStatement}`,
    
    body: `As someone who {personalStory}, I bring a unique perspective to {field}. My journey has taught me {lessonLearned}, which I believe aligns perfectly with {company}'s mission.

Here's what I bring to the table:
{creativeBullets}

What excites me most about {company} is {excitement}.`,
    
    closing: `Let's create something amazing together. I'd love to show you how my blend of {skills} can help {company} achieve its goals.

Excited to connect,
{name}`,
  },
  
  careerChange: {
    opening: `Dear Hiring Manager,

After {previousExperience} years in {previousField}, I have made the intentional decision to transition into {newField}. The {position} role at {company} represents the perfect opportunity to leverage my transferable skills while pursuing my passion for {newField}.`,
    
    body: `While my background is in {previousField}, I have developed valuable skills that are highly relevant to this role:

• {transferableSkill1}
• {transferableSkill2}
• {transferableSkill3}

I have been actively preparing for this transition by {preparation}. My fresh perspective, combined with my proven track record in {previousField}, would bring a unique value to your team.`,
    
    closing: `I am eager to demonstrate how my diverse background can contribute to {company}'s success. Thank you for considering my application.

Best regards,
{name}`,
  },
  
  entryLevel: {
    opening: `Dear Hiring Manager,

As a recent {degree} graduate from {university}, I am excited to apply for the {position} role at {company}. I am eager to begin my career and contribute my enthusiasm and fresh knowledge to your team.`,
    
    body: `During my studies, I focused on {focusArea} and achieved {achievement}. My academic projects have prepared me with:

• {academicSkill1}
• {academicSkill2}
• {academicSkill3}

I have also gained practical experience through {internship/project}, where I {practicalAchievement}.`,
    
    closing: `I am enthusiastic about the opportunity to learn and grow with {company}. Thank you for considering my application.

Best regards,
{name}`,
  },
};

interface CoverLetterRequest {
  name: string;
  email: string;
  phone?: string;
  position: string;
  company: string;
  experience: number;
  currentRole?: string;
  skills: string[];
  achievements: string[];
  education?: string;
  template?: 'professional' | 'creative' | 'careerChange' | 'entryLevel';
  tone?: 'formal' | 'friendly' | 'enthusiastic';
  includeMyanmar?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body as CoverLetterRequest;

    if (!data.name || !data.position || !data.company) {
      return NextResponse.json(
        { success: false, error: 'Name, position, and company are required' },
        { status: 400 }
      );
    }

    // Determine template based on experience and request
    const template = data.template || 
      (data.experience === 0 ? 'entryLevel' : 
       data.experience < 3 ? 'professional' : 'professional');

    // Try AI-powered generation
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert career coach and cover letter writer. Create compelling, personalized cover letters that highlight the candidate's strengths and align with the job requirements. Consider Myanmar workplace culture when relevant.`,
          },
          {
            role: 'user',
            content: `Write a ${data.tone || 'professional'} cover letter for:

Name: ${data.name}
Position: ${data.position}
Company: ${data.company}
Experience: ${data.experience} years
Current Role: ${data.currentRole || 'Not specified'}
Skills: ${data.skills?.join(', ') || 'Not specified'}
Key Achievements: ${data.achievements?.join('; ') || 'Not specified'}
Education: ${data.education || 'Not specified'}

${data.includeMyanmar ? 'Include both English and Myanmar versions.' : ''}

Create a compelling cover letter that:
1. Opens with a strong hook
2. Highlights relevant experience and achievements
3. Shows enthusiasm for the company
4. Closes with a clear call to action
5. Is concise (max 350 words)

Respond in JSON format:
{
  "coverLetter": "full cover letter text",
  ${data.includeMyanmar ? '"coverLetterMyanmar": "Myanmar translation",' : ''}
  "highlights": ["strength1", "strength2"],
  "tips": ["application tip1"]
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        const result = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          coverLetter: result.coverLetter,
          coverLetterMyanmar: result.coverLetterMyanmar,
          highlights: result.highlights || [],
          tips: result.tips || [],
          generatedAt: new Date().toISOString(),
          source: 'ai',
        });
      } catch {
        return generateTemplateCoverLetter(data, template);
      }
    } catch (aiError) {
      console.log('AI cover letter generation failed, using template:', aiError);
      return generateTemplateCoverLetter(data, template);
    }
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
}

function generateTemplateCoverLetter(
  data: CoverLetterRequest, 
  template: 'professional' | 'creative' | 'careerChange' | 'entryLevel'
) {
  const t = coverLetterTemplates[template];
  
  let coverLetter = '';
  
  // Opening
  coverLetter += t.opening
    .replace('{name}', data.name)
    .replace('{position}', data.position)
    .replace('{company}', data.company)
    .replace('{experience}', String(data.experience))
    .replace('{field}', data.skills?.[0] || 'relevant field')
    .replace('{currentRole}', data.currentRole || 'professional')
    .replace('{hookStatement}', `The opportunity to contribute to a company that values innovation and growth deeply resonates with me.`)
    .replace('{previousExperience}', String(data.experience))
    .replace('{previousField}', 'my previous field')
    .replace('{newField}', data.position.split(' ')[0] || 'this field')
    .replace('{degree}', 'Bachelor\'s')
    .replace('{university}', 'University');
  
  coverLetter += '\n\n';
  
  // Body
  const achievement1 = data.achievements?.[0] || 'delivered successful projects';
  const bullet1 = data.achievements?.[1] || `Led initiatives that improved team efficiency`;
  const bullet2 = data.achievements?.[2] || `Collaborated with cross-functional teams`;
  const bullet3 = data.achievements?.[3] || `Developed innovative solutions to complex problems`;
  
  coverLetter += t.body
    .replace('{currentRole}', data.currentRole || 'professional')
    .replace('{achievement1}', achievement1)
    .replace('{skills}', data.skills?.slice(0, 3).join(', ') || 'relevant skills')
    .replace('{bullet1}', bullet1)
    .replace('{bullet2}', bullet2)
    .replace('{bullet3}', bullet3)
    .replace('{company}', data.company)
    .replace('{companyReason}', 'its commitment to excellence and innovation')
    .replace('{relevantExperience}', data.skills?.[0] || 'my field')
    .replace('{personalStory}', 'has always been passionate about growth and learning')
    .replace('{lessonLearned}', 'the importance of adaptability and continuous improvement')
    .replace('{creativeBullets}', `• ${bullet1}\n• ${bullet2}\n• ${bullet3}`)
    .replace('{excitement}', 'the opportunity to make a meaningful impact')
    .replace('{transferableSkill1}', 'Strong analytical and problem-solving abilities')
    .replace('{transferableSkill2}', 'Excellent communication and collaboration skills')
    .replace('{transferableSkill3}', 'Proven ability to adapt and learn quickly')
    .replace('{preparation}', 'completing relevant courses and certifications')
    .replace('{focusArea}', data.skills?.[0] || 'my field of study')
    .replace('{achievement}', 'academic excellence')
    .replace('{academicSkill1}', data.skills?.[0] || 'Strong analytical skills')
    .replace('{academicSkill2}', data.skills?.[1] || 'Research and critical thinking')
    .replace('{academicSkill3}', data.skills?.[2] || 'Team collaboration')
    .replace('{internship/project}', 'my internship')
    .replace('{practicalAchievement}', 'gained hands-on experience in the field');
  
  coverLetter += '\n\n';
  
  // Closing
  coverLetter += t.closing
    .replace('{company}', data.company)
    .replace('{name}', data.name)
    .replace('{skills}', data.skills?.slice(0, 2).join(' and ') || 'skills');
  
  const highlights = [
    data.experience > 0 ? `${data.experience} years of relevant experience` : 'Strong academic foundation',
    `Skills in ${data.skills?.slice(0, 3).join(', ') || 'relevant areas'}`,
    data.achievements?.[0] || 'Proven track record of achievements',
  ];
  
  const tips = [
    'Customize this letter with specific examples from your experience',
    'Research the company and mention specific initiatives or values',
    'Keep the letter to one page',
    'Proofread carefully before sending',
  ];

  return NextResponse.json({
    success: true,
    coverLetter,
    highlights,
    tips,
    generatedAt: new Date().toISOString(),
    source: 'template',
  });
}

// GET endpoint for cover letter tips
export async function GET() {
  return NextResponse.json({
    success: true,
    tips: [
      {
        title: 'Customize for Each Application',
        description: 'Tailor your cover letter to match the specific job requirements and company culture.',
      },
      {
        title: 'Show, Don\'t Just Tell',
        description: 'Use specific examples and quantifiable achievements to demonstrate your value.',
      },
      {
        title: 'Address the Hiring Manager',
        description: 'Try to find the hiring manager\'s name instead of using "Dear Hiring Manager".',
      },
      {
        title: 'Keep It Concise',
        description: 'Aim for 3-4 short paragraphs that can be read in under a minute.',
      },
      {
        title: 'End with a Call to Action',
        description: 'Express your interest in an interview and thank the reader for their time.',
      },
    ],
    myanmarTips: [
      'Use formal language and respectful terms',
      'Include both English and Myanmar versions if requested',
      'Mention any local experience or knowledge of Myanmar market',
      'Be humble but confident in presenting achievements',
    ],
  });
}
