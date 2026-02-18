import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Interview question templates by category
const questionTemplates = {
  behavioral: [
    {
      question: 'Tell me about a time when you had to work with a difficult team member.',
      hints: ['Use STAR method', 'Focus on resolution', 'Show growth mindset'],
      sampleAnswer: 'In my previous role, I worked with a colleague who frequently missed deadlines. I scheduled a private conversation to understand their challenges...',
    },
    {
      question: 'Describe a situation where you had to adapt to a significant change at work.',
      hints: ['Show flexibility', 'Positive attitude', 'Problem-solving approach'],
      sampleAnswer: 'When our company transitioned to a new CRM system, I proactively learned the new platform...',
    },
    {
      question: 'Give an example of a time you showed leadership.',
      hints: ['Define leadership broadly', 'Show impact', 'Include team success'],
      sampleAnswer: 'During a critical project, our team lead fell ill. I stepped up to coordinate...',
    },
  ],
  technical: {
    'software-engineer': [
      {
        question: 'Explain the difference between REST and GraphQL APIs.',
        hints: ['Data fetching approach', 'Flexibility', 'Use cases'],
        sampleAnswer: 'REST uses multiple endpoints for different resources, while GraphQL uses a single endpoint with query-based data fetching...',
      },
      {
        question: 'How would you optimize a slow database query?',
        hints: ['Indexing', 'Query optimization', 'Caching'],
        sampleAnswer: 'First, I would analyze the query execution plan, then consider adding appropriate indexes...',
      },
    ],
    'marketing': [
      {
        question: 'How would you measure the success of a marketing campaign?',
        hints: ['KPIs', 'ROI calculation', 'Attribution'],
        sampleAnswer: 'I would track metrics like conversion rate, CAC, ROAS, and brand awareness lift...',
      },
    ],
    'sales': [
      {
        question: 'How do you handle objections from potential clients?',
        hints: ['Active listening', 'Empathy', 'Solution-focused'],
        sampleAnswer: 'I listen carefully to understand the real concern, acknowledge it, then provide relevant solutions...',
      },
    ],
    'hr': [
      {
        question: 'How would you handle a conflict between two employees?',
        hints: ['Neutral approach', 'Documentation', 'Resolution focus'],
        sampleAnswer: 'I would meet with each party separately first, then facilitate a joint discussion...',
      },
    ],
  },
  situational: [
    {
      question: 'What would you do if you were given an unrealistic deadline?',
      hints: ['Communication', 'Prioritization', 'Solution-oriented'],
      sampleAnswer: 'I would assess the scope, identify critical path items, and communicate with stakeholders about trade-offs...',
    },
    {
      question: 'How would you handle a situation where you made a significant mistake at work?',
      hints: ['Accountability', 'Quick action', 'Learning mindset'],
      sampleAnswer: 'I would immediately inform my manager, propose a solution, and document lessons learned...',
    },
  ],
  common: [
    {
      question: 'Tell me about yourself.',
      hints: ['Professional summary', 'Relevant experience', 'Career goals'],
      sampleAnswer: 'I am a [role] with [X] years of experience in [industry]. I specialize in [skills] and have achieved [key accomplishment]...',
    },
    {
      question: 'Why do you want to work for this company?',
      hints: ['Company research', 'Values alignment', 'Career fit'],
      sampleAnswer: 'I admire [company]\'s commitment to [value] and the opportunity to contribute to [specific initiative]...',
    },
    {
      question: 'What are your greatest strengths and weaknesses?',
      hints: ['Job-relevant strengths', 'Genuine weakness', 'Improvement plan'],
      sampleAnswer: 'My key strengths include [strength1] and [strength2]. For weakness, I\'m working on [weakness] by [improvement action]...',
    },
    {
      question: 'Where do you see yourself in 5 years?',
      hints: ['Career growth', 'Company alignment', 'Realistic goals'],
      sampleAnswer: 'I see myself growing into a [advanced role], leading [initiative], while continuing to develop my expertise in [area]...',
    },
  ],
};

// Myanmar-specific interview tips
const myanmarInterviewTips = {
  attire: 'Business professional is preferred. For men: longyi or formal pants with button-down shirt. For women: conservative blouse with longyi or formal attire.',
  greetings: 'A slight bow with palms together (namaste) or handshake is appropriate. Address interviewers as U (for men) or Daw (for women) if older.',
  communication: 'Be humble but confident. Direct answers are appreciated, but avoid being overly aggressive.',
  questions: 'It is acceptable to ask about company culture and growth opportunities. Avoid asking about salary in the first interview.',
};

interface InterviewSession {
  jobRole: string;
  company?: string;
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior';
  interviewType: 'behavioral' | 'technical' | 'situational' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational' | 'common';
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  sampleAnswer: string;
  followUpQuestions?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      jobRole, 
      company, 
      experienceLevel, 
      interviewType,
      difficulty = 'medium',
      count = 5,
    } = body as InterviewSession & { count?: number };

    if (!jobRole) {
      return NextResponse.json(
        { success: false, error: 'Job role is required' },
        { status: 400 }
      );
    }

    // Try AI-powered question generation
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert interview coach specializing in the Myanmar job market. Generate realistic interview questions with helpful hints and sample answers. Consider Myanmar workplace culture and expectations.`,
          },
          {
            role: 'user',
            content: `Generate ${count} interview questions for:

Job Role: ${jobRole}
Company: ${company || 'General company in Myanmar'}
Experience Level: ${experienceLevel}
Interview Type: ${interviewType || 'mixed'}
Difficulty: ${difficulty}

For each question provide:
1. The question text
2. Category (behavioral/technical/situational/common)
3. 2-3 hints for answering
4. A sample answer

Respond in JSON format:
{
  "questions": [
    {
      "id": "q1",
      "question": "question text",
      "category": "behavioral",
      "difficulty": "medium",
      "hints": ["hint1", "hint2"],
      "sampleAnswer": "sample answer text",
      "followUpQuestions": ["follow up 1"]
    }
  ],
  "preparationTips": ["tip1", "tip2"],
  "companyInsights": "brief company/role insight"
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        const result = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          questions: result.questions || [],
          preparationTips: result.preparationTips || [],
          companyInsights: result.companyInsights || '',
          myanmarTips: myanmarInterviewTips,
          generatedAt: new Date().toISOString(),
          source: 'ai',
        });
      } catch {
        return generateFallbackQuestions(jobRole, interviewType, difficulty, count);
      }
    } catch (aiError) {
      console.log('AI question generation failed, using fallback:', aiError);
      return generateFallbackQuestions(jobRole, interviewType, difficulty, count);
    }
  } catch (error) {
    console.error('Interview prep error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
}

function generateFallbackQuestions(
  jobRole: string, 
  interviewType: string, 
  difficulty: string, 
  count: number
) {
  const questions: InterviewQuestion[] = [];
  const roleKey = jobRole.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
  
  // Add common questions
  const commonQs = questionTemplates.common.slice(0, 2);
  commonQs.forEach((q, i) => {
    questions.push({
      id: `common-${i + 1}`,
      question: q.question,
      category: 'common',
      difficulty: 'easy',
      hints: q.hints,
      sampleAnswer: q.sampleAnswer,
    });
  });
  
  // Add behavioral questions
  if (interviewType === 'behavioral' || interviewType === 'mixed' || !interviewType) {
    const behavioralQs = questionTemplates.behavioral.slice(0, 2);
    behavioralQs.forEach((q, i) => {
      questions.push({
        id: `behavioral-${i + 1}`,
        question: q.question,
        category: 'behavioral',
        difficulty: difficulty === 'hard' ? 'hard' : 'medium',
        hints: q.hints,
        sampleAnswer: q.sampleAnswer,
      });
    });
  }
  
  // Add technical questions if available
  const techQs = questionTemplates.technical[roleKey as keyof typeof questionTemplates.technical];
  if (techQs && (interviewType === 'technical' || interviewType === 'mixed' || !interviewType)) {
    techQs.forEach((q, i) => {
      questions.push({
        id: `technical-${i + 1}`,
        question: q.question,
        category: 'technical',
        difficulty: difficulty === 'easy' ? 'medium' : difficulty,
        hints: q.hints,
        sampleAnswer: q.sampleAnswer,
      });
    });
  }
  
  // Add situational questions
  if (interviewType === 'situational' || interviewType === 'mixed' || !interviewType) {
    const situationalQs = questionTemplates.situational.slice(0, 2);
    situationalQs.forEach((q, i) => {
      questions.push({
        id: `situational-${i + 1}`,
        question: q.question,
        category: 'situational',
        difficulty: 'medium',
        hints: q.hints,
        sampleAnswer: q.sampleAnswer,
      });
    });
  }
  
  const preparationTips = [
    'Research the company thoroughly before the interview',
    'Prepare 2-3 questions to ask the interviewer',
    'Practice the STAR method for behavioral questions',
    'Review your resume and be ready to explain any gap or transition',
    'Prepare a brief "tell me about yourself" elevator pitch',
  ];
  
  const companyInsights = `For ${jobRole} roles in Myanmar, employers often value practical experience and adaptability. Highlight any experience with local market knowledge or cross-functional collaboration.`;

  return NextResponse.json({
    success: true,
    questions: questions.slice(0, count),
    preparationTips,
    companyInsights,
    myanmarTips: myanmarInterviewTips,
    generatedAt: new Date().toISOString(),
    source: 'template',
  });
}

// PUT endpoint for answer feedback
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, userAnswer, jobRole } = body;

    if (!question || !userAnswer) {
      return NextResponse.json(
        { success: false, error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Try AI-powered feedback
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an expert interview coach. Provide constructive feedback on interview answers. Be encouraging but specific about improvements. Consider the STAR method for behavioral questions.`,
          },
          {
            role: 'user',
            content: `Evaluate this interview answer:

Question: "${question}"
Job Role: ${jobRole || 'General'}

User's Answer:
"${userAnswer}"

Provide feedback in JSON format:
{
  "score": 0-100,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "suggestedAnswer": "improved version of the answer",
  "keyPoints": ["key point that should be mentioned"],
  "tone": "professional/friendly/mixed",
  "length": "appropriate/too short/too long"
}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 1500,
      });

      const responseText = completion.choices?.[0]?.message?.content || '';
      
      try {
        const feedback = JSON.parse(responseText);
        
        return NextResponse.json({
          success: true,
          feedback,
          analyzedAt: new Date().toISOString(),
        });
      } catch {
        return generateFallbackFeedback(question, userAnswer);
      }
    } catch {
      return generateFallbackFeedback(question, userAnswer);
    }
  } catch (error) {
    console.error('Answer feedback error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze answer' },
      { status: 500 }
    );
  }
}

function generateFallbackFeedback(question: string, userAnswer: string) {
  const wordCount = userAnswer.split(/\s+/).length;
  const hasStructure = userAnswer.toLowerCase().includes('situation') || 
                       userAnswer.toLowerCase().includes('result') ||
                       userAnswer.length > 100;
  
  let score = 50;
  const strengths: string[] = [];
  const improvements: string[] = [];
  
  if (wordCount > 50) {
    strengths.push('Provided a detailed answer');
    score += 10;
  } else {
    improvements.push('Consider providing more detail in your answer');
  }
  
  if (hasStructure) {
    strengths.push('Good use of structure in response');
    score += 15;
  } else {
    improvements.push('Try using the STAR method (Situation, Task, Action, Result) for behavioral questions');
  }
  
  if (userAnswer.includes('I') || userAnswer.includes('my')) {
    strengths.push('Personal examples included');
    score += 10;
  }
  
  score = Math.min(95, score);
  
  return NextResponse.json({
    success: true,
    feedback: {
      score,
      strengths,
      improvements,
      suggestedAnswer: 'Consider structuring your answer with a clear situation, specific actions you took, and measurable results.',
      keyPoints: ['Be specific', 'Show impact', 'Demonstrate growth'],
      tone: wordCount > 100 ? 'professional' : 'concise',
      length: wordCount < 30 ? 'too short' : wordCount > 300 ? 'too long' : 'appropriate',
    },
    analyzedAt: new Date().toISOString(),
  });
}
