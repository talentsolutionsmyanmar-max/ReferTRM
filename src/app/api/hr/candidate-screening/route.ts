import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Candidate interface
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeText: string;
  skills: string[];
  experience: number;
  education: string;
  appliedRole: string;
  appliedDate: string;
  status: 'new' | 'screening' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  matchScore?: number;
  notes?: string;
}

// Job requirements interface
interface JobRequirements {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minExperience: number;
  maxExperience?: number;
  educationLevel?: string;
  location?: string;
  salaryRange?: { min: number; max: number };
}

// Screening criteria
interface ScreeningCriteria {
  mustHave: string[];
  niceToHave: string[];
  exclude: string[];
  minMatchScore: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      candidates, 
      jobRequirements, 
      screeningCriteria,
      maxResults = 10,
    } = body as { 
      candidates: Candidate[]; 
      jobRequirements: JobRequirements;
      screeningCriteria?: ScreeningCriteria;
      maxResults?: number;
    };

    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Candidates are required' },
        { status: 400 }
      );
    }

    if (!jobRequirements) {
      return NextResponse.json(
        { success: false, error: 'Job requirements are required' },
        { status: 400 }
      );
    }

    // Screen candidates
    const screenedCandidates = await screenCandidates(
      candidates,
      jobRequirements,
      screeningCriteria
    );

    // Sort by match score and return top candidates
    const topCandidates = screenedCandidates
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, maxResults);

    // Generate summary statistics
    const stats = {
      totalCandidates: candidates.length,
      screenedCandidates: screenedCandidates.length,
      shortlistedCandidates: screenedCandidates.filter(c => c.status === 'shortlisted').length,
      averageMatchScore: Math.round(
        screenedCandidates.reduce((sum, c) => sum + (c.matchScore || 0), 0) / screenedCandidates.length
      ),
      topSkills: getTopSkills(screenedCandidates),
      experienceDistribution: getExperienceDistribution(screenedCandidates),
    };

    return NextResponse.json({
      success: true,
      candidates: topCandidates,
      stats,
      screeningDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Candidate screening error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to screen candidates' },
      { status: 500 }
    );
  }
}

async function screenCandidates(
  candidates: Candidate[],
  requirements: JobRequirements,
  criteria?: ScreeningCriteria
): Promise<Candidate[]> {
  const screenedCandidates: Candidate[] = [];

  for (const candidate of candidates) {
    const matchResult = calculateMatchScore(candidate, requirements, criteria);
    
    screenedCandidates.push({
      ...candidate,
      matchScore: matchResult.score,
      status: matchResult.score >= (criteria?.minMatchScore || 60) ? 'shortlisted' : 'screening',
      notes: matchResult.summary,
    });
  }

  return screenedCandidates;
}

function calculateMatchScore(
  candidate: Candidate,
  requirements: JobRequirements,
  criteria?: ScreeningCriteria
): { score: number; summary: string } {
  let score = 0;
  const factors: string[] = [];

  // Required skills match (40 points max)
  const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());
  const requiredSkillsLower = requirements.requiredSkills.map(s => s.toLowerCase());
  
  const requiredMatches = requiredSkillsLower.filter(skill =>
    candidateSkillsLower.some(cs => cs.includes(skill) || skill.includes(cs)) ||
    candidate.resumeText.toLowerCase().includes(skill)
  );
  
  const requiredScore = (requiredMatches.length / Math.max(requiredSkillsLower.length, 1)) * 40;
  score += requiredScore;
  
  if (requiredMatches.length > 0) {
    factors.push(`Required skills: ${requiredMatches.length}/${requirements.requiredSkills.length}`);
  }

  // Preferred skills match (20 points max)
  const preferredSkillsLower = requirements.preferredSkills?.map(s => s.toLowerCase()) || [];
  const preferredMatches = preferredSkillsLower.filter(skill =>
    candidateSkillsLower.some(cs => cs.includes(skill) || skill.includes(cs)) ||
    candidate.resumeText.toLowerCase().includes(skill)
  );
  
  const preferredScore = preferredSkillsLower.length > 0
    ? (preferredMatches.length / preferredSkillsLower.length) * 20
    : 10;
  score += preferredScore;

  // Experience match (20 points max)
  if (candidate.experience >= requirements.minExperience) {
    score += 20;
    factors.push(`Experience: ${candidate.experience} years (min: ${requirements.minExperience})`);
  } else if (candidate.experience >= requirements.minExperience * 0.7) {
    score += 10;
    factors.push(`Close experience: ${candidate.experience} years`);
  }

  // Education match (10 points max)
  if (requirements.educationLevel) {
    if (candidate.education.toLowerCase().includes(requirements.educationLevel.toLowerCase())) {
      score += 10;
      factors.push('Education matches requirements');
    }
  } else {
    score += 5; // Give partial credit if no education requirement
  }

  // Must-have criteria (10 points max)
  if (criteria?.mustHave && criteria.mustHave.length > 0) {
    const mustHaveMatches = criteria.mustHave.filter(mh =>
      candidate.resumeText.toLowerCase().includes(mh.toLowerCase())
    );
    score += (mustHaveMatches.length / criteria.mustHave.length) * 10;
  }

  // Exclude criteria (penalize)
  if (criteria?.exclude && criteria.exclude.length > 0) {
    const excludeMatches = criteria.exclude.filter(ex =>
      candidate.resumeText.toLowerCase().includes(ex.toLowerCase())
    );
    score -= excludeMatches.length * 10;
  }

  // Normalize score
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Generate summary
  let summary = `Match score: ${score}%. `;
  summary += factors.join('. ');
  
  if (score >= 80) {
    summary += ' Strong candidate - recommend for interview.';
  } else if (score >= 60) {
    summary += ' Good potential - consider for screening call.';
  } else if (score >= 40) {
    summary += ' Partial match - may need development.';
  } else {
    summary += ' Limited match for this role.';
  }

  return { score, summary };
}

function getTopSkills(candidates: Candidate[]): { skill: string; count: number }[] {
  const skillCounts: Record<string, number> = {};
  
  candidates.forEach(c => {
    c.skills.forEach(skill => {
      const normalized = skill.toLowerCase().trim();
      skillCounts[normalized] = (skillCounts[normalized] || 0) + 1;
    });
  });

  return Object.entries(skillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getExperienceDistribution(candidates: Candidate[]): Record<string, number> {
  const distribution: Record<string, number> = {
    '0-1 years': 0,
    '1-3 years': 0,
    '3-5 years': 0,
    '5-10 years': 0,
    '10+ years': 0,
  };

  candidates.forEach(c => {
    if (c.experience < 1) distribution['0-1 years']++;
    else if (c.experience < 3) distribution['1-3 years']++;
    else if (c.experience < 5) distribution['3-5 years']++;
    else if (c.experience < 10) distribution['5-10 years']++;
    else distribution['10+ years']++;
  });

  return distribution;
}

// GET endpoint for screening templates
export async function GET() {
  return NextResponse.json({
    success: true,
    screeningTemplates: [
      {
        id: 'technical',
        name: 'Technical Roles',
        criteria: {
          mustHave: ['programming', 'software development', 'coding'],
          niceToHave: ['agile', 'git', 'testing'],
          exclude: [],
          minMatchScore: 60,
        },
      },
      {
        id: 'sales',
        name: 'Sales Roles',
        criteria: {
          mustHave: ['sales', 'customer', 'revenue'],
          niceToHave: ['crm', 'negotiation', 'presentation'],
          exclude: [],
          minMatchScore: 55,
        },
      },
      {
        id: 'management',
        name: 'Management Roles',
        criteria: {
          mustHave: ['leadership', 'team management', 'strategy'],
          niceToHave: ['budget', 'project management', 'kpi'],
          exclude: [],
          minMatchScore: 65,
        },
      },
    ],
    statusOptions: [
      { value: 'new', label: 'New Application', color: 'blue' },
      { value: 'screening', label: 'Under Screening', color: 'yellow' },
      { value: 'shortlisted', label: 'Shortlisted', color: 'green' },
      { value: 'interview', label: 'Interview Scheduled', color: 'purple' },
      { value: 'offered', label: 'Offer Extended', color: 'teal' },
      { value: 'rejected', label: 'Not Selected', color: 'red' },
    ],
    myanmarTips: [
      'Consider both English and Myanmar language proficiency',
      'Local work experience may be more relevant for some roles',
      'Verify educational credentials from Myanmar institutions',
      'Consider cultural fit alongside technical skills',
    ],
  });
}

// PUT endpoint for updating candidate status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, status, notes, interviewDate } = body;

    // In a real implementation, this would update a database
    // For now, we'll return a success response
    
    return NextResponse.json({
      success: true,
      candidate: {
        id: candidateId,
        status,
        notes,
        interviewDate,
        updatedAt: new Date().toISOString(),
      },
      message: `Candidate status updated to ${status}`,
    });
  } catch (error) {
    console.error('Update candidate error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update candidate' },
      { status: 500 }
    );
  }
}
