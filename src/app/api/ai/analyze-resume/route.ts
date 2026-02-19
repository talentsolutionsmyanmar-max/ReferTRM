import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Skills database for matching
const skillsDatabase: Record<string, string[]> = {
  technical: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'php',
    'react', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'spring', 'next.js',
    'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'graphql',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'jenkins', 'git',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'figma', 'photoshop',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'data analysis',
    'excel', 'powerpoint', 'word', 'google sheets', 'tableau', 'power bi',
  ],
  soft: [
    'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
    'time management', 'project management', 'negotiation', 'presentation', 'mentoring',
    'customer service', 'sales', 'marketing', 'analytical', 'creative', 'adaptable',
    'organized', 'detail-oriented', 'collaborative', 'innovative',
  ],
};

// Job role requirements for matching
const jobRequirements: Record<string, { required: string[]; preferred: string[] }> = {
  'software-engineer': {
    required: ['javascript', 'python', 'sql', 'git'],
    preferred: ['react', 'node.js', 'docker', 'aws', 'typescript'],
  },
  'sales-manager': {
    required: ['sales', 'communication', 'leadership', 'customer service'],
    preferred: ['marketing', 'negotiation', 'presentation', 'crm'],
  },
  'marketing-specialist': {
    required: ['marketing', 'communication', 'creative', 'analytical'],
    preferred: ['social media', 'seo', 'content writing', 'google analytics'],
  },
  'hr-manager': {
    required: ['leadership', 'communication', 'teamwork', 'organized'],
    preferred: ['recruitment', 'training', 'employee relations', 'hris'],
  },
  'accountant': {
    required: ['excel', 'analytical', 'detail-oriented', 'organized'],
    preferred: ['quickbooks', 'sap', 'tax preparation', 'auditing'],
  },
  'operations-manager': {
    required: ['leadership', 'project management', 'problem solving', 'organized'],
    preferred: ['supply chain', 'logistics', 'erp', 'process improvement'],
  },
  'customer-service': {
    required: ['customer service', 'communication', 'problem solving', 'teamwork'],
    preferred: ['crm', 'phone etiquette', 'complaint handling', 'multilingual'],
  },
  'data-analyst': {
    required: ['sql', 'excel', 'python', 'analytical'],
    preferred: ['tableau', 'power bi', 'statistics', 'machine learning'],
  },
  'project-manager': {
    required: ['project management', 'leadership', 'communication', 'organized'],
    preferred: ['pmp', 'agile', 'scrum', 'jira', 'microsoft project'],
  },
  'executive-assistant': {
    required: ['organized', 'communication', 'time management', 'detail-oriented'],
    preferred: ['calendar management', 'travel coordination', 'microsoft office', 'scheduling'],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, targetJobRole } = body;

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Resume text is required' },
        { status: 400 }
      );
    }

    // Try AI analysis first
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert resume analyzer and HR professional. Extract key information from resumes and provide hiring recommendations. Always respond in valid JSON format with the following structure:
{
  "candidateName": "Full name",
  "email": "email address or empty string",
  "phone": "phone number or empty string",
  "skills": [{"name": "skill name", "level": "expert|proficient|familiar"}],
  "experience": [{"title": "job title", "company": "company name", "duration": "duration string"}],
  "education": [{"degree": "degree name", "school": "school name", "year": "year"}],
  "matchScore": 0-100 score if targetJobRole provided,
  "strengths": ["strength1", "strength2"],
  "gaps": ["gap1", "gap2"],
  "recommendation": "strongly-recommend|recommend|consider|not-suitable",
  "summary": "Brief summary of the candidate and recommendation"
}`,
          },
          {
            role: 'user',
            content: `Analyze this resume and extract all key information. ${targetJobRole ? `Also provide a match score and fit assessment for the role: ${targetJobRole}` : ''}

Resume text:
${resumeText}

Respond ONLY with valid JSON, no additional text.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        // Try to parse the AI response as JSON
        const analysis = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          analysis,
          analyzedAt: new Date().toISOString(),
        });
      } catch {
        // If parsing fails, use fallback
        console.log('AI response parsing failed, using fallback');
        return generateFallbackAnalysis(resumeText, targetJobRole);
      }
    } catch (aiError) {
      console.log('AI analysis failed, using fallback:', aiError);
      return generateFallbackAnalysis(resumeText, targetJobRole);
    }
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

function generateFallbackAnalysis(resumeText: string, targetJobRole: string | null) {
  const text = resumeText.toLowerCase();
  
  // Extract candidate name (look for common patterns)
  const namePatterns = [
    /name[:\s]+([A-Za-z\s]+)/i,
    /^([A-Z][a-z]+\s+[A-Z][a-z]+)/m,
  ];
  
  let candidateName = 'Candidate';
  for (const pattern of namePatterns) {
    const match = resumeText.match(pattern);
    if (match) {
      candidateName = match[1].trim();
      break;
    }
  }

  // Extract email
  const emailMatch = resumeText.match(/[\w.-]+@[\w.-]+\.\w+/);
  const email = emailMatch ? emailMatch[0] : 'Not provided';

  // Extract phone
  const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  const phone = phoneMatch ? phoneMatch[0] : 'Not provided';

  // Extract skills from database
  const foundSkills: { name: string; level: 'expert' | 'proficient' | 'familiar' }[] = [];
  
  [...skillsDatabase.technical, ...skillsDatabase.soft].forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      // Determine level based on context
      let level: 'expert' | 'proficient' | 'familiar' = 'proficient';
      if (text.includes(`expert in ${skill}`) || text.includes(`${skill} expert`) || 
          text.includes(`advanced ${skill}`) || text.includes(`senior ${skill}`)) {
        level = 'expert';
      } else if (text.includes(`familiar with ${skill}`) || text.includes(`basic ${skill}`) ||
                 text.includes(`beginner ${skill}`)) {
        level = 'familiar';
      }
      foundSkills.push({ name: skill, level });
    }
  });

  // Extract experience (simplified)
  const experience: { title: string; company: string; duration: string }[] = [];
  const expPatterns = [
    /(\d{4})\s*[-–]\s*(present|current|\d{4})/gi,
    /(senior|junior|lead|manager|developer|engineer|analyst|specialist|coordinator)\s+(?:at|@)?\s*([A-Za-z\s]+)/gi,
  ];
  
  // Add some mock experience based on years found
  const years = resumeText.match(/\d{4}/g);
  if (years && years.length > 0) {
    const uniqueYears = [...new Set(years)].sort();
    if (uniqueYears.length >= 2) {
      experience.push({
        title: 'Professional Role',
        company: 'Company',
        duration: `${uniqueYears[0]} - ${uniqueYears[uniqueYears.length - 1]}`,
      });
    }
  }

  // Extract education
  const education: { degree: string; school: string; year: string }[] = [];
  const degreePatterns = [
    /(bachelor|master|phd|mba|b\.?sc\.?|m\.?sc\.?|b\.?a\.?|m\.?a\.?)[^.,]*?(\d{4})?/gi,
    /(university|college|institute)[^.,]*/gi,
  ];
  
  degreePatterns.forEach(pattern => {
    const matches = resumeText.match(pattern);
    if (matches) {
      matches.slice(0, 2).forEach(match => {
        const yearMatch = match.match(/\d{4}/);
        education.push({
          degree: match.trim(),
          school: 'University',
          year: yearMatch ? yearMatch[0] : 'N/A',
        });
      });
    }
  });

  // Calculate match score if job role provided
  let matchScore = 50;
  let recommendation: 'strongly-recommend' | 'recommend' | 'consider' | 'not-suitable' = 'consider';
  
  if (targetJobRole && jobRequirements[targetJobRole]) {
    const requirements = jobRequirements[targetJobRole];
    const skillNames = foundSkills.map(s => s.name.toLowerCase());
    
    let requiredMatch = 0;
    requirements.required.forEach(skill => {
      if (skillNames.includes(skill.toLowerCase()) || text.includes(skill.toLowerCase())) {
        requiredMatch++;
      }
    });
    
    let preferredMatch = 0;
    requirements.preferred.forEach(skill => {
      if (skillNames.includes(skill.toLowerCase()) || text.includes(skill.toLowerCase())) {
        preferredMatch++;
      }
    });
    
    const requiredScore = (requiredMatch / requirements.required.length) * 60;
    const preferredScore = (preferredMatch / requirements.preferred.length) * 40;
    matchScore = Math.round(requiredScore + preferredScore);
    
    if (matchScore >= 80) recommendation = 'strongly-recommend';
    else if (matchScore >= 60) recommendation = 'recommend';
    else if (matchScore >= 40) recommendation = 'consider';
    else recommendation = 'not-suitable';
  }

  // Generate strengths and gaps
  const strengths: string[] = [];
  const gaps: string[] = [];
  
  if (foundSkills.length >= 5) {
    strengths.push(`Strong skill set with ${foundSkills.length} identifiable skills`);
  }
  if (foundSkills.some(s => s.level === 'expert')) {
    strengths.push('Has expert-level proficiency in key areas');
  }
  if (experience.length >= 2) {
    strengths.push('Diverse professional experience');
  }
  if (education.length > 0) {
    strengths.push('Relevant educational background');
  }
  
  if (foundSkills.length < 3) {
    gaps.push('Limited skills detected in resume - consider more detailed skill descriptions');
  }
  if (experience.length === 0) {
    gaps.push('Experience details could not be extracted clearly');
  }
  if (!email || email === 'Not provided') {
    gaps.push('Contact information not clearly stated');
  }

  // Generate summary
  const skillCount = foundSkills.length;
  const expertCount = foundSkills.filter(s => s.level === 'expert').length;
  
  const summary = `${candidateName} is a candidate with ${skillCount} detected skills${expertCount > 0 ? `, including ${expertCount} at expert level` : ''}. ${matchScore > 60 ? 'Based on the resume analysis, this candidate shows promise and should be considered for further evaluation.' : 'More information may be needed to fully assess this candidate\'s fit for the role.'}`;

  const analysis = {
    candidateName,
    email,
    phone,
    skills: foundSkills.slice(0, 10), // Limit to 10 skills
    experience: experience.slice(0, 3),
    education: education.slice(0, 2),
    matchScore,
    strengths: strengths.length > 0 ? strengths : ['Resume successfully analyzed'],
    gaps: gaps.length > 0 ? gaps : ['No significant gaps identified'],
    recommendation,
    summary,
  };

  return NextResponse.json({
    success: true,
    analysis,
    analyzedAt: new Date().toISOString(),
    fallback: true,
  });
}
