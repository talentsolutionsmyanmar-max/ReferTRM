// Career Roadmap Data Structure
// Comprehensive career development paths for Myanmar professionals

// Types
export interface SkillRequirement {
  name: string;
  nameMm?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  importance: 'required' | 'recommended' | 'bonus';
  description?: string;
}

export interface KnowledgeRequirement {
  category: string;
  skills: SkillRequirement[];
}

export interface CompetenceRequirement {
  category: string;
  items: {
    description: string;
    descriptionMm?: string;
    metric?: string;
    verified: boolean;
  }[];
}

export interface AttitudeRequirement {
  category: string;
  items: {
    trait: string;
    traitMm?: string;
    description: string;
    indicators: string[];
  }[];
}

export interface LinkedCourse {
  courseId: string;
  title: string;
  titleMm?: string;
  type: 'required' | 'recommended' | 'assessment';
  estimatedHours: number;
  academyLink?: string;
}

export interface CareerLevel {
  id: string;
  level: number;
  title: string;
  titleMm: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  yearsOfExperience: {
    min: number;
    max: number;
  };
  knowledge: KnowledgeRequirement[];
  competence: CompetenceRequirement[];
  attitude: AttitudeRequirement[];
  courses: LinkedCourse[];
  tools: string[];
  responsibilities: string[];
  nextLevelTips: string[];
  icon: string;
  color: string;
}

export interface CareerTrack {
  id: string;
  name: string;
  nameMm: string;
  description: string;
  descriptionMm: string;
  category: 'technology' | 'recruitment' | 'marketing' | 'sales' | 'hr' | 'finance' | 'operations' | 'design';
  levels: CareerLevel[];
  icon: string;
  color: string;
  demandLevel: 'high' | 'medium' | 'low';
  avgSalaryGrowth: string;
}

// Developer Career Track
export const developerTrack: CareerTrack = {
  id: 'developer',
  name: 'Software Developer',
  nameMm: 'ဆော့ဖ်ဝဲ Developer',
  description: 'Build software applications, websites, and systems using programming languages and frameworks',
  descriptionMm: 'ပရိုဂရမ်းမင်းဘာသာစကားများနှင့် frameworks များကို အသုံးပြု၍ ဆော့ဖ်ဝဲ applications များ၊ ဝဘ်ဆိုက်များနှင့် စနစ်များကို တည်ဆောက်ပါ',
  category: 'technology',
  icon: '💻',
  color: 'from-blue-500 to-cyan-500',
  demandLevel: 'high',
  avgSalaryGrowth: '+15%',
  levels: [
    {
      id: 'junior-developer',
      level: 1,
      title: 'Junior Developer',
      titleMm: 'Junior Developer',
      salaryRange: { min: 300000, max: 500000, currency: 'MMK' },
      yearsOfExperience: { min: 0, max: 2 },
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      knowledge: [
        {
          category: 'Technical Skills',
          skills: [
            { name: 'JavaScript Basics', nameMm: 'JavaScript အခြေခံ', level: 'beginner', importance: 'required', description: 'Variables, functions, DOM manipulation' },
            { name: 'HTML/CSS', nameMm: 'HTML/CSS', level: 'beginner', importance: 'required', description: 'Semantic HTML, Flexbox, Grid basics' },
            { name: 'React Basics', nameMm: 'React အခြေခံ', level: 'beginner', importance: 'required', description: 'Components, props, state, hooks' },
            { name: 'Git Version Control', nameMm: 'Git', level: 'beginner', importance: 'required', description: 'Basic commands, branching, pull requests' },
            { name: 'SQL Basics', nameMm: 'SQL အခြေခံ', level: 'beginner', importance: 'recommended', description: 'SELECT, INSERT, UPDATE, DELETE' },
          ]
        },
        {
          category: 'Development Concepts',
          skills: [
            { name: 'Clean Code Principles', nameMm: 'ရှင်းလင်းသော ကုဒ်မူဘာညီမျှ', level: 'beginner', importance: 'recommended' },
            { name: 'Agile/Scrum Basics', nameMm: 'Agile/Scrum အခြေခံ', level: 'beginner', importance: 'required' },
            { name: 'Testing Concepts', nameMm: 'Testing အယူအဆ', level: 'beginner', importance: 'recommended' },
          ]
        }
      ],
      competence: [
        {
          category: 'Project Experience',
          items: [
            { description: 'Build 2+ small projects independently', descriptionMm: 'ပရောဂျက်ငယ် ၂ ခုကို ကိုယ်တိုင်တည်ဆောက်ရန်', metric: '2 projects', verified: false },
            { description: 'Contribute to team project', descriptionMm: 'အဖွဲ့ပရောဂျက်တွင် ပါဝင်ဆောင်ရွက်ရန်', verified: false },
            { description: 'Fix bugs in existing codebase', descriptionMm: 'ရှိပြီးသား codebase တွင် bugs များပြင်ရန်', metric: '5+ bugs fixed', verified: false },
          ]
        },
        {
          category: 'Code Quality',
          items: [
            { description: 'Write clean, readable code', descriptionMm: 'ရှင်းလင်းတက်ကျုံ့သော ကုဒ်ရေးသားရန်', verified: false },
            { description: 'Accept and apply code review feedback', descriptionMm: 'Code review အကြံပြုချက်များကို လက်ခံအသုံးပြုရန်', verified: false },
            { description: 'Complete assigned tasks on time', descriptionMm: 'လွှဲပြောင်းထားသော လုပ်ငန်းများကို အချိန်မီပြီးမြောက်ရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Communication',
          items: [
            { trait: 'Ask Questions', traitMm: 'မေးမြန်းခြင်း', description: 'Ask questions when stuck, dont struggle alone', indicators: ['Asks clarifying questions', 'Seeks help appropriately', 'Documents solutions learned'] },
            { trait: 'Honest Communication', traitMm: 'ရိုးသားသော ဆက်သွယ်မှု', description: 'Communicate progress honestly, flag blockers early', indicators: ['Gives accurate status updates', 'Reports issues promptly', 'Doesnt overcommit'] },
          ]
        },
        {
          category: 'Learning Mindset',
          items: [
            { trait: 'Eagerness to Learn', traitMm: 'သင်ယူလိုစိတ်', description: 'Shows genuine interest in learning new technologies', indicators: ['Completes assigned courses', 'Explores beyond requirements', 'Shares learnings with team'] },
            { trait: 'Accepts Feedback', traitMm: 'တုံ့ပြန်ချက်လက်ခံခြင်း', description: 'Takes feedback positively and improves', indicators: ['Doesnt get defensive', 'Implements suggestions', 'Thanks reviewers'] },
          ]
        },
        {
          category: 'Professionalism',
          items: [
            { trait: 'Punctuality', traitMm: 'အချိန်မှန်ခြင်း', description: 'Shows up on time for meetings and work', indicators: ['Attends meetings on time', 'Meets deadlines', 'Reliable attendance'] },
            { trait: 'Documentation', traitMm: 'စာရွက်စာတမ်းပြုလုပ်ခြင်း', description: 'Documents work and decisions', indicators: ['Writes clear comments', 'Updates documentation', 'Maintains organized notes'] },
          ]
        }
      ],
      courses: [
        { courseId: 'js-fundamentals', title: 'JavaScript Fundamentals', titleMm: 'JavaScript အခြေခံ', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
        { courseId: 'react-basics', title: 'React Basics', titleMm: 'React အခြေခံ', type: 'required', estimatedHours: 25, academyLink: '/dashboard/academy' },
        { courseId: 'git-github', title: 'Git & GitHub', titleMm: 'Git & GitHub', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
        { courseId: 'html-css', title: 'HTML & CSS Mastery', titleMm: 'HTML & CSS ကျွမ်းကျင်မှု', type: 'recommended', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'sql-basics', title: 'SQL Basics', titleMm: 'SQL အခြေခံ', type: 'recommended', estimatedHours: 12, academyLink: '/dashboard/academy' },
      ],
      tools: ['VS Code', 'Git', 'Chrome DevTools', 'Terminal', 'npm/yarn'],
      responsibilities: [
        'Write code for assigned features under supervision',
        'Fix bugs and write tests',
        'Participate in code reviews (receive feedback)',
        'Attend daily standups and sprint ceremonies',
        'Document code and technical decisions',
        'Learn and apply coding best practices',
      ],
      nextLevelTips: [
        'Complete all required courses in Academy',
        'Build a portfolio project that showcases full-stack skills',
        'Learn backend basics (Node.js, Express)',
        'Start contributing to code reviews for peers',
        'Take ownership of small features end-to-end',
        'Practice system design thinking',
      ]
    },
    {
      id: 'mid-developer',
      level: 2,
      title: 'Mid-Level Developer',
      titleMm: 'Mid-Level Developer',
      salaryRange: { min: 500000, max: 1000000, currency: 'MMK' },
      yearsOfExperience: { min: 2, max: 4 },
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      knowledge: [
        {
          category: 'Technical Skills',
          skills: [
            { name: 'Advanced React', nameMm: 'React အဆင့်မြင့်', level: 'intermediate', importance: 'required', description: 'Hooks patterns, context, performance optimization' },
            { name: 'Backend Development', nameMm: 'Backend Development', level: 'intermediate', importance: 'required', description: 'Node.js, Express, REST APIs' },
            { name: 'Database Design', nameMm: 'Database Design', level: 'intermediate', importance: 'required', description: 'SQL/NoSQL, schema design, optimization' },
            { name: 'Testing', nameMm: 'Testing', level: 'intermediate', importance: 'required', description: 'Unit tests, integration tests, TDD basics' },
            { name: 'System Design Basics', nameMm: 'System Design အခြေခံ', level: 'intermediate', importance: 'recommended' },
            { name: 'Docker Basics', nameMm: 'Docker အခြေခံ', level: 'beginner', importance: 'recommended' },
          ]
        },
        {
          category: 'Architecture',
          skills: [
            { name: 'State Management', nameMm: 'State Management', level: 'intermediate', importance: 'required', description: 'Redux, Zustand, or similar' },
            { name: 'API Design', nameMm: 'API Design', level: 'intermediate', importance: 'required', description: 'REST principles, API versioning' },
            { name: 'CI/CD Concepts', nameMm: 'CI/CD အယူအဆ', level: 'beginner', importance: 'recommended' },
          ]
        }
      ],
      competence: [
        {
          category: 'Project Experience',
          items: [
            { description: 'Lead feature development end-to-end', descriptionMm: 'Feature development ကို အစမှအဆုံး ဦးဆောင်ရန်', metric: '3+ features', verified: false },
            { description: 'Mentor junior developers', descriptionMm: 'Junior developers များကို လမ်းညွှန်ရန်', metric: '1+ mentees', verified: false },
            { description: 'Improve code quality/processes', descriptionMm: 'Code quality/processes များကို တိုးတက်စေရန်', verified: false },
          ]
        },
        {
          category: 'Technical Leadership',
          items: [
            { description: 'Conduct effective code reviews', descriptionMm: 'ထိရောက်သော code reviews ပြုလုပ်ရန်', metric: '10+ reviews/month', verified: false },
            { description: 'Estimate tasks accurately', descriptionMm: 'လုပ်ငန်းများကို တိကျစွာ ခန့်မှန်းရန်', verified: false },
            { description: 'Communicate technical concepts clearly', descriptionMm: 'နည်းပညာဆိုင်ရာ အယူအဆများကို ရှင်းလင်းစွာ ဆက်သွယ်ရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Leadership',
          items: [
            { trait: 'Initiative', traitMm: 'ဦးဆောင်မှု', description: 'Takes initiative on improvements without being asked', indicators: ['Proposes solutions proactively', 'Identifies technical debt', 'Drives improvements'] },
            { trait: 'Knowledge Sharing', traitMm: 'အသိပညာမျှဝေခြင်း', description: 'Shares knowledge proactively with team', indicators: ['Writes documentation', 'Gives tech talks', 'Mentors juniors'] },
          ]
        },
        {
          category: 'Problem Solving',
          items: [
            { trait: 'Analytical Thinking', traitMm: 'ခွဲခြမ်းစိတ်ဖြာတွေးခေါ်မှု', description: 'Breaks down complex problems systematically', indicators: ['Identifies root causes', 'Proposes multiple solutions', 'Considers trade-offs'] },
            { trait: 'Ownership', traitMm: 'ပိုင်ဆိုင်မှုစိတ်', description: 'Takes full ownership of assigned features', indicators: ['Sees features to completion', 'Handles edge cases', 'Follows up on issues'] },
          ]
        }
      ],
      courses: [
        { courseId: 'advanced-react', title: 'Advanced React Patterns', titleMm: 'React အဆင့်မြင့် Patterns', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
        { courseId: 'nodejs-backend', title: 'Node.js Backend Development', titleMm: 'Node.js Backend Development', type: 'required', estimatedHours: 25, academyLink: '/dashboard/academy' },
        { courseId: 'database-design', title: 'SQL & Database Design', titleMm: 'SQL & Database Design', type: 'required', estimatedHours: 18, academyLink: '/dashboard/academy' },
        { courseId: 'system-design', title: 'System Design Fundamentals', titleMm: 'System Design အခြေခံ', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'testing-qa', title: 'Testing & Quality Assurance', titleMm: 'Testing & Quality Assurance', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
      ],
      tools: ['VS Code', 'Git', 'Docker', 'PostgreSQL/MongoDB', 'Postman', 'AWS/GCP Basics'],
      responsibilities: [
        'Design and implement features independently',
        'Write comprehensive tests for all code',
        'Conduct code reviews for team members',
        'Mentor junior developers',
        'Participate in architecture discussions',
        'Estimate and plan sprint work',
        'Debug and fix complex issues',
      ],
      nextLevelTips: [
        'Master system design and architecture patterns',
        'Lead a major technical initiative or migration',
        'Develop expertise in a specific domain',
        'Improve cross-team collaboration skills',
        'Learn cloud architecture and DevOps',
        'Practice technical writing and documentation',
      ]
    },
    {
      id: 'senior-developer',
      level: 3,
      title: 'Senior Developer',
      titleMm: 'Senior Developer',
      salaryRange: { min: 1000000, max: 2000000, currency: 'MMK' },
      yearsOfExperience: { min: 5, max: 8 },
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      knowledge: [
        {
          category: 'Technical Skills',
          skills: [
            { name: 'Full-Stack Development', nameMm: 'Full-Stack Development', level: 'advanced', importance: 'required', description: 'Expert in frontend and backend' },
            { name: 'System Architecture', nameMm: 'System Architecture', level: 'advanced', importance: 'required', description: 'Microservices, distributed systems' },
            { name: 'Cloud Infrastructure', nameMm: 'Cloud Infrastructure', level: 'intermediate', importance: 'required', description: 'AWS/GCP/Azure services' },
            { name: 'DevOps & CI/CD', nameMm: 'DevOps & CI/CD', level: 'intermediate', importance: 'required', description: 'Pipelines, containers, monitoring' },
            { name: 'Performance Optimization', nameMm: 'Performance Optimization', level: 'advanced', importance: 'required' },
            { name: 'Security Best Practices', nameMm: 'Security Best Practices', level: 'intermediate', importance: 'required' },
          ]
        },
        {
          category: 'Architecture & Design',
          skills: [
            { name: 'Design Patterns', nameMm: 'Design Patterns', level: 'advanced', importance: 'required' },
            { name: 'Scalability', nameMm: 'Scalability', level: 'advanced', importance: 'required', description: 'Horizontal/vertical scaling' },
            { name: 'Technical Strategy', nameMm: 'Technical Strategy', level: 'intermediate', importance: 'recommended' },
          ]
        }
      ],
      competence: [
        {
          category: 'Project Experience',
          items: [
            { description: 'Lead major technical initiatives', descriptionMm: 'အဓိကနည်းပညာအစီအစဉ်များကို ဦးဆောင်ရန်', metric: '2+ initiatives', verified: false },
            { description: 'Architecture design for complex systems', descriptionMm: 'ရှုပ်ထွေးသော စနစ်များအတွက် architecture design', verified: false },
            { description: 'Cross-team collaboration', descriptionMm: 'အဖွဲ့ချင်း ပူးပေါင်းဆောင်ရွက်မှု', verified: false },
          ]
        },
        {
          category: 'Technical Leadership',
          items: [
            { description: 'Define technical standards and best practices', descriptionMm: 'နည်းပညာစံနှုန်းများနှင့် best practices များ သတ်မှတ်ရန်', verified: false },
            { description: 'Make high-impact technical decisions', descriptionMm: 'အကျိုးသက်ရောက်မှုကြီးသော နည်းပညာ 결정များ', verified: false },
            { description: 'Mentor multiple developers', descriptionMm: 'Developer များစွာကို လမ်းညွှန်ရန်', metric: '3+ mentees', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Strategic Thinking',
          items: [
            { trait: 'Technical Vision', traitMm: 'နည်းပညာအမြင်', description: 'Sets technical direction and vision', indicators: ['Creates technical roadmaps', 'Evaluates new technologies', 'Plans for scale'] },
            { trait: 'Business Alignment', traitMm: 'စီးပွားရေးတူညီမှု', description: 'Aligns technical decisions with business goals', indicators: ['Understands business context', 'Balances technical debt', 'Prioritizes effectively'] },
          ]
        },
        {
          category: 'Leadership',
          items: [
            { trait: 'Influence', traitMm: 'လွှမ်းမိုးမှု', description: 'Influences technical decisions across teams', indicators: ['Leads architecture reviews', 'Facilitates technical discussions', 'Builds consensus'] },
            { trait: 'Empowerment', traitMm: 'အာဏာပေးအားမွန်ကြောင်း', description: 'Empowers team members to grow', indicators: ['Delegates effectively', 'Provides growth opportunities', 'Recognizes contributions'] },
          ]
        }
      ],
      courses: [
        { courseId: 'system-design-adv', title: 'Advanced System Design', titleMm: 'System Design အဆင့်မြင့်', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
        { courseId: 'cloud-arch', title: 'Cloud Architecture', titleMm: 'Cloud Architecture', type: 'required', estimatedHours: 25, academyLink: '/dashboard/academy' },
        { courseId: 'devops-ci', title: 'DevOps & CI/CD Mastery', titleMm: 'DevOps & CI/CD Mastery', type: 'required', estimatedHours: 18, academyLink: '/dashboard/academy' },
        { courseId: 'tech-leadership', title: 'Technical Leadership', titleMm: 'နည်းပညာ ခေါင်းဆောင်မှု', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
      ],
      tools: ['VS Code', 'Git', 'Docker', 'Kubernetes basics', 'AWS/GCP/Azure', 'Monitoring tools', 'Architecture diagramming'],
      responsibilities: [
        'Lead technical design for complex features',
        'Set coding standards and best practices',
        'Mentor mid-level and junior developers',
        'Make architectural decisions',
        'Drive technical initiatives',
        'Conduct technical interviews',
        'Collaborate with product and business teams',
        'Ensure system reliability and scalability',
      ],
      nextLevelTips: [
        'Develop people management skills',
        'Learn to manage technical debt strategically',
        'Build expertise in organizational processes',
        'Practice stakeholder communication',
        'Learn budget and resource planning',
        'Understand business strategy and goals',
      ]
    },
    {
      id: 'tech-lead',
      level: 4,
      title: 'Tech Lead',
      titleMm: 'Tech Lead',
      salaryRange: { min: 2000000, max: 3500000, currency: 'MMK' },
      yearsOfExperience: { min: 6, max: 10 },
      icon: '👑',
      color: 'from-amber-500 to-yellow-500',
      knowledge: [
        {
          category: 'Technical Skills',
          skills: [
            { name: 'System Architecture Mastery', nameMm: 'System Architecture Mastery', level: 'expert', importance: 'required' },
            { name: 'Technical Strategy', nameMm: 'Technical Strategy', level: 'advanced', importance: 'required' },
            { name: 'Team Leadership', nameMm: 'Team Leadership', level: 'advanced', importance: 'required' },
            { name: 'Project Management', nameMm: 'Project Management', level: 'intermediate', importance: 'required' },
            { name: 'Stakeholder Management', nameMm: 'Stakeholder Management', level: 'intermediate', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Leadership',
          items: [
            { description: 'Lead team of 5-10 developers', descriptionMm: 'Developer 5-10 ဦးပါအဖွဲ့ကို ဦးဆောင်ရန်', metric: 'Team size 5-10', verified: false },
            { description: 'Drive technical roadmap', descriptionMm: 'နည်းပညာလမ်းစဉ်ကို ဦးဆောင်ရန်', verified: false },
            { description: 'Balance technical and business needs', descriptionMm: 'နည်းပညာနှင့် စီးပွားရေးလိုအပ်ချက်များကို ချိန်ညှိရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Management',
          items: [
            { trait: 'People Development', traitMm: 'လူများဖွံ့ဖြိုးတိုးတက်မှု', description: 'Develops team members careers', indicators: ['Regular 1:1s', 'Career planning', 'Growth opportunities'] },
            { trait: 'Decision Making', traitMm: 'ဆုံးဖြတ်ချက်ချမှတ်ခြင်း', description: 'Makes timely and informed decisions', indicators: ['Weighs trade-offs', 'Takes ownership', 'Communicates decisions'] },
          ]
        }
      ],
      courses: [
        { courseId: 'tech-lead-mastery', title: 'Tech Lead Mastery', titleMm: 'Tech Lead Mastery', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
        { courseId: 'people-management', title: 'People Management for Engineers', titleMm: 'Engineers အတွက် လူမှုရေးစီမံခန့်ခွဲမှု', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'stakeholder-comms', title: 'Stakeholder Communication', titleMm: 'Stakeholder ဆက်သွယ်ရေး', type: 'recommended', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'Jira/Linear', 'Confluence', 'Architecture tools', 'Monitoring dashboards'],
      responsibilities: [
        'Lead development team',
        'Set technical direction',
        'Conduct performance reviews',
        'Resource planning and allocation',
        'Stakeholder communication',
        'Technical hiring decisions',
        'Cross-team coordination',
      ],
      nextLevelTips: [
        'Build broader organizational influence',
        'Develop business acumen',
        'Learn organizational strategy',
        'Build executive communication skills',
        'Understand budgeting and finance',
      ]
    },
    {
      id: 'engineering-manager',
      level: 5,
      title: 'Engineering Manager',
      titleMm: 'Engineering Manager',
      salaryRange: { min: 3500000, max: 6000000, currency: 'MMK' },
      yearsOfExperience: { min: 8, max: 15 },
      icon: '🏆',
      color: 'from-red-500 to-rose-500',
      knowledge: [
        {
          category: 'Management Skills',
          skills: [
            { name: 'Team Building', nameMm: 'အဖွဲ့တည်ဆောက်မှု', level: 'expert', importance: 'required' },
            { name: 'Strategic Planning', nameMm: 'မဟာဗျူဟာ စီမံကိန်း', level: 'advanced', importance: 'required' },
            { name: 'Budget Management', nameMm: 'ဘတ်ဂျက် စီမံခန့်ခွဲမှု', level: 'intermediate', importance: 'required' },
            { name: 'Organizational Design', nameMm: 'အဖွဲ့အစည်း ဒီဇိုင်း', level: 'intermediate', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Leadership',
          items: [
            { description: 'Manage multiple teams (20+ people)', descriptionMm: 'အဖွဲ့များစွာ (20+ ဦး) စီမံခန့်ခွဲရန်', verified: false },
            { description: 'Define engineering culture', descriptionMm: 'Engineering ယဉ်ကျေးမှုကို သတ်မှတ်ရန်', verified: false },
            { description: 'Partner with executive leadership', descriptionMm: 'ဦးဆောင်ခေါင်းဆောင်များနှင့် ပူးပေါင်းရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Executive Presence',
          items: [
            { trait: 'Strategic Vision', traitMm: 'မဟာဗျူဟာအမြင်', description: 'Sets long-term engineering vision', indicators: ['3-5 year planning', 'Technology investment', 'Organizational growth'] },
            { trait: 'Executive Communication', traitMm: 'Executive ဆက်သွယ်ရေး', description: 'Communicates effectively at all levels', indicators: ['Board presentations', 'Investor updates', 'Company-wide comms'] },
          ]
        }
      ],
      courses: [
        { courseId: 'eng-manager', title: 'Engineering Management', titleMm: 'Engineering စီမံခန့်ခွဲမှု', type: 'required', estimatedHours: 25, academyLink: '/dashboard/academy' },
        { courseId: 'exec-leadership', title: 'Executive Leadership', titleMm: 'Executive ခေါင်းဆောင်မှု', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'Executive dashboards', 'HR systems', 'Budget tools', 'Strategic planning tools'],
      responsibilities: [
        'Lead engineering organization',
        'Define engineering strategy',
        'Build and develop teams',
        'Manage budget and resources',
        'Partner with product and business',
        'Report to executive leadership',
        'Drive engineering culture',
      ],
      nextLevelTips: [
        'Continue developing business acumen',
        'Build industry presence (speaking, writing)',
        'Develop executive network',
        'Consider CTO track',
      ]
    }
  ]
};

// Recruiter Career Track
export const recruiterTrack: CareerTrack = {
  id: 'recruiter',
  name: 'Recruiter / Talent Acquisition',
  nameMm: 'Recruiter / Talent Acquisition',
  description: 'Source, screen, and hire talent for organizations across various industries',
  descriptionMm: 'ကုမ္ပဏီများအတွက် အရည်အချင်းရှိသူများကို ရှာဖွေ၊ စိစစ်၊ ငှားရမ်းခြင်း',
  category: 'recruitment',
  icon: '👥',
  color: 'from-green-500 to-teal-500',
  demandLevel: 'high',
  avgSalaryGrowth: '+12%',
  levels: [
    {
      id: 'junior-recruiter',
      level: 1,
      title: 'Junior Recruiter',
      titleMm: 'Junior Recruiter',
      salaryRange: { min: 250000, max: 400000, currency: 'MMK' },
      yearsOfExperience: { min: 0, max: 1 },
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      knowledge: [
        {
          category: 'Recruitment Fundamentals',
          skills: [
            { name: 'Job Description Understanding', nameMm: 'အလုပ်ဖော်ပြချက် နားလည်မှု', level: 'beginner', importance: 'required' },
            { name: 'Candidate Screening', nameMm: 'ကိုယ်စားလှယ်လောင်း စိစစ်ခြင်း', level: 'beginner', importance: 'required' },
            { name: 'Phone Interviewing', nameMm: 'ဖုန်းဖြင့် အင်တာဗျူး', level: 'beginner', importance: 'required' },
            { name: 'ATS Systems', nameMm: 'ATS စနစ်များ', level: 'beginner', importance: 'required' },
            { name: 'LinkedIn Sourcing', nameMm: 'LinkedIn Sourcing', level: 'beginner', importance: 'required' },
          ]
        },
        {
          category: 'Tools & Platforms',
          skills: [
            { name: 'Job Posting Platforms', nameMm: 'အလုပ်ကြောငြာ ပလက်ဖောင်းများ', level: 'beginner', importance: 'required', description: 'JobNet, MyJobs, LinkedIn Jobs' },
            { name: 'Excel/Google Sheets', nameMm: 'Excel/Google Sheets', level: 'beginner', importance: 'required' },
            { name: 'Email Communication', nameMm: 'Email ဆက်သွယ်ရေး', level: 'beginner', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Sourcing Metrics',
          items: [
            { description: 'Source 20+ candidates per month', descriptionMm: 'တစ်လလျှင် ကိုယ်စားလှယ်လောင်း 20+ ဦး ရှာဖွေရန်', metric: '20+ candidates/month', verified: false },
            { description: 'Conduct 10+ screening calls per week', descriptionMm: 'တစ်ပတ်လျှင် စိစစ်ရေးခေါ်ဆိုမှု 10+ ပြုလုပ်ရန်', metric: '10+ calls/week', verified: false },
            { description: 'Maintain database accuracy', descriptionMm: 'ဒေတာဘေ့စ်တိကျမှန်ကန်မှု', verified: false },
          ]
        },
        {
          category: 'Process',
          items: [
            { description: 'Schedule interviews accurately', descriptionMm: 'အင်တာဗျူးများကို တိကျစွာ အချိန်ဇယားချရန်', verified: false },
            { description: 'Follow up with candidates timely', descriptionMm: 'ကိုယ်စားလှယ်လောင်းများနှင့် အချိန်မီ ဆက်သွယ်ရန်', verified: false },
            { description: 'Document all interactions', descriptionMm: 'ဆက်သွယ်မှုအားလုံးကို မှတ်တမ်းတင်ရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Communication',
          items: [
            { trait: 'Professional Manner', traitMm: 'ပရော်ဖက်ရှင်နယ် ဆက်ဆံမှု', description: 'Professional phone and email manner', indicators: ['Clear communication', 'Polite demeanor', 'Appropriate follow-up'] },
            { trait: 'Active Listening', traitMm: 'တက်ကြွသောနားထောင်မှု', description: 'Listens carefully to candidates and hiring managers', indicators: ['Asks clarifying questions', 'Takes accurate notes', 'Confirms understanding'] },
          ]
        },
        {
          category: 'Work Ethic',
          items: [
            { trait: 'Attention to Detail', traitMm: 'အသေးစိတ်သတိပြုမှု', description: 'Pays attention to details in job specs and candidate profiles', indicators: ['Accurate data entry', 'Catches errors', 'Thorough screening'] },
            { trait: 'Persistence', traitMm: 'ဇွဲလုံ့လ', description: 'Doesnt give up easily when sourcing difficult roles', indicators: ['Multiple sourcing channels', 'Follows up persistently', 'Creative approaches'] },
          ]
        }
      ],
      courses: [
        { courseId: 'recruit-fundamentals', title: 'Recruitment Fundamentals', titleMm: 'Recruitment အခြေခံများ', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'phone-screening', title: 'Effective Phone Screening', titleMm: 'ထိရောက်သော Phone Screening', type: 'required', estimatedHours: 8, academyLink: '/dashboard/academy' },
        { courseId: 'linkedin-sourcing', title: 'LinkedIn Sourcing Basics', titleMm: 'LinkedIn Sourcing အခြေခံ', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
        { courseId: 'ats-training', title: 'ATS System Training', titleMm: 'ATS စနစ် လေ့ကျင့်ခန်း', type: 'recommended', estimatedHours: 5, academyLink: '/dashboard/academy' },
      ],
      tools: ['LinkedIn Recruiter Lite', 'ATS (Workday, Greenhouse, etc.)', 'Excel/Google Sheets', 'JobNet', 'MyJobs.com.mm'],
      responsibilities: [
        'Source candidates from job boards and LinkedIn',
        'Conduct initial phone screens',
        'Schedule interviews between candidates and hiring managers',
        'Maintain accurate candidate database',
        'Follow up with candidates throughout process',
        'Post job advertisements on platforms',
      ],
      nextLevelTips: [
        'Learn advanced Boolean search techniques',
        'Develop deeper understanding of technical roles',
        'Build relationships with passive candidates',
        'Improve candidate experience skills',
        'Learn basic negotiation techniques',
        'Track and improve your metrics',
      ]
    },
    {
      id: 'recruiter',
      level: 2,
      title: 'Recruiter',
      titleMm: 'Recruiter',
      salaryRange: { min: 400000, max: 700000, currency: 'MMK' },
      yearsOfExperience: { min: 1, max: 3 },
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      knowledge: [
        {
          category: 'Advanced Recruitment',
          skills: [
            { name: 'Behavioral Interviewing', nameMm: 'Behavioral Interviewing', level: 'intermediate', importance: 'required', description: 'STAR method, competency-based questions' },
            { name: 'Boolean Search', nameMm: 'Boolean Search', level: 'intermediate', importance: 'required', description: 'Advanced search operators' },
            { name: 'Salary Benchmarking', nameMm: 'လစာ Benchmarking', level: 'intermediate', importance: 'required' },
            { name: 'Candidate Experience', nameMm: 'ကိုယ်စားလှယ်လောင်း အတွေ့အကြုံ', level: 'intermediate', importance: 'recommended' },
            { name: 'Employer Branding', nameMm: 'အလုပ်ရှင် Branding', level: 'beginner', importance: 'recommended' },
          ]
        },
        {
          category: 'Industry Knowledge',
          skills: [
            { name: 'Market Intelligence', nameMm: 'ဈေးကွက် ဉာဏ်ရည်', level: 'intermediate', importance: 'required' },
            { name: 'Competitor Analysis', nameMm: 'ယှဉ်ပြိုင်သူ ခွဲခြမ်းစိတ်ဖြာမှု', level: 'beginner', importance: 'recommended' },
            { name: 'Technical Role Understanding', nameMm: 'နည်းပညာဆိုင်ရာ အမူအကိုင်နားလည်မှု', level: 'intermediate', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Full-Cycle Recruitment',
          items: [
            { description: 'Manage 3-5 open positions simultaneously', descriptionMm: 'တစ်ပြိုင်နက် ရာထူး 3-5 ခု စီမံခန့်ခွဲရန်', metric: '3-5 roles', verified: false },
            { description: 'Achieve 70%+ offer acceptance rate', descriptionMm: 'Offer လက်ခံမှုနှုန်း 70%+ ရရှိရန်', metric: '70%+ acceptance', verified: false },
            { description: 'Fill positions within 45 days average', descriptionMm: 'ပျမ်းမျှ 45 ရက်အတွင်း ရာထူးများ ဖြည့်ဆည်းရန်', metric: '45 days avg', verified: false },
          ]
        },
        {
          category: 'Stakeholder Management',
          items: [
            { description: 'Conduct intake meetings with hiring managers', descriptionMm: 'ငှားရမ်းသူမန်နေဂျာများနှင့် ဆွေးနွေးရန်', verified: false },
            { description: 'Provide market insights to clients', descriptionMm: 'ဖောက်သည်များအား ဈေးကွက်အချက်အလက်များ ပေးရန်', verified: false },
            { description: 'Build candidate pipelines proactively', descriptionMm: 'ကိုယ်စားလှယ်လောင်း pipelines များ တက်ကြွစွာ တည်ဆောက်ရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Consultative Approach',
          items: [
            { trait: 'Trusted Advisor', traitMm: 'ယုံကြည်ရသော အကြံပေး', description: 'Acts as trusted advisor to hiring managers', indicators: ['Provides market insights', 'Challenges unrealistic expectations', 'Offers solutions'] },
            { trait: 'Candidate Advocacy', traitMm: 'ကိုယ်စားလှယ်လောင်း ကာကွယ်ပြောဆိုမှု', description: 'Advocates for candidates while meeting business needs', indicators: ['Fair negotiations', 'Transparent communication', 'Positive experience'] },
          ]
        }
      ],
      courses: [
        { courseId: 'behavioral-interview', title: 'Advanced Interview Techniques', titleMm: 'အဆင့်မြင့် Interview နည်းပညာများ', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
        { courseId: 'boolean-search', title: 'Boolean & X-Ray Search Mastery', titleMm: 'Boolean & X-Ray Search Mastery', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
        { courseId: 'salary-negotiation', title: 'Salary Negotiation Techniques', titleMm: 'လစာ ညှိနှိုင်းဆွေးနွေးမှု နည်းပညာများ', type: 'required', estimatedHours: 8, academyLink: '/dashboard/academy' },
        { courseId: 'recruit-analytics', title: 'Recruitment Analytics', titleMm: 'Recruitment Analytics', type: 'recommended', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['LinkedIn Recruiter (Full)', 'Advanced ATS features', 'Boolean search tools', 'Salary benchmarking tools', 'Assessment platforms'],
      responsibilities: [
        'Full-cycle recruitment for multiple roles',
        'Intake meetings with hiring managers',
        'Advanced sourcing (passive candidates)',
        'Behavioral interviews',
        'Salary negotiations',
        'Candidate pipeline development',
        'Market research and intelligence',
      ],
      nextLevelTips: [
        'Develop deep expertise in a specific domain',
        'Learn to coach hiring managers',
        'Build a strong personal brand',
        'Develop leadership skills',
        'Master data-driven recruiting',
        'Build extensive professional network',
      ]
    },
    {
      id: 'senior-recruiter',
      level: 3,
      title: 'Senior Recruiter',
      titleMm: 'Senior Recruiter',
      salaryRange: { min: 700000, max: 1200000, currency: 'MMK' },
      yearsOfExperience: { min: 3, max: 6 },
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      knowledge: [
        {
          category: 'Expert Skills',
          skills: [
            { name: 'Executive Search', nameMm: 'Executive Search', level: 'advanced', importance: 'required' },
            { name: 'Recruitment Strategy', nameMm: 'Recruitment Strategy', level: 'advanced', importance: 'required' },
            { name: 'Team Mentoring', nameMm: 'အဖွဲ့ လမ်းညွှန်မှု', level: 'intermediate', importance: 'required' },
            { name: 'Employer Branding', nameMm: 'အလုပ်ရှင် Branding', level: 'intermediate', importance: 'required' },
            { name: 'Recruitment Marketing', nameMm: 'Recruitment Marketing', level: 'intermediate', importance: 'recommended' },
          ]
        }
      ],
      competence: [
        {
          category: 'Leadership',
          items: [
            { description: 'Mentor 2+ junior recruiters', descriptionMm: 'Junior recruiters 2+ ဦးကို လမ်းညွှန်ရန်', metric: '2+ mentees', verified: false },
            { description: 'Handle executive-level searches', descriptionMm: 'Executive အဆင့်ရှာဖွေမှုများ ကိုင်တွယ်ရန်', verified: false },
            { description: 'Drive process improvements', descriptionMm: 'လုပ်ငန်းစဉ်တိုးတက်မှုများ ဦးဆောင်ရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Strategic Thinking',
          items: [
            { trait: 'Business Partnership', traitMm: 'စီးပွားရေး မိတ်ဖက်ဖြစ်မှု', description: 'Partners with business leaders on talent strategy', indicators: ['Strategic planning', 'Workforce planning', 'Talent mapping'] },
            { trait: 'Innovation', traitMm: 'ဆန်းသစ်တီထွင်မှု', description: 'Innovates recruitment processes and strategies', indicators: ['New sourcing methods', 'Process improvements', 'Technology adoption'] },
          ]
        }
      ],
      courses: [
        { courseId: 'exec-search', title: 'Executive Search Mastery', titleMm: 'Executive Search Mastery', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'recruit-strategy', title: 'Recruitment Strategy & Planning', titleMm: 'Recruitment Strategy & Planning', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
        { courseId: 'mentorship', title: 'Coaching & Mentoring Skills', titleMm: 'Coaching & Mentoring Skills', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'Executive search databases', 'Assessment centers', 'Employer branding platforms', 'Analytics dashboards'],
      responsibilities: [
        'Lead complex and executive searches',
        'Mentor junior team members',
        'Develop recruitment strategies',
        'Partner with senior stakeholders',
        'Drive employer branding initiatives',
        'Improve recruitment processes',
        'Train hiring managers on interviewing',
      ],
      nextLevelTips: [
        'Develop team leadership capabilities',
        'Learn workforce planning',
        'Build executive relationships',
        'Understand broader HR function',
        'Develop business acumen',
      ]
    },
    {
      id: 'talent-manager',
      level: 4,
      title: 'Talent Acquisition Manager',
      titleMm: 'Talent Acquisition Manager',
      salaryRange: { min: 1200000, max: 2500000, currency: 'MMK' },
      yearsOfExperience: { min: 6, max: 10 },
      icon: '👑',
      color: 'from-amber-500 to-yellow-500',
      knowledge: [
        {
          category: 'Management Skills',
          skills: [
            { name: 'Team Leadership', nameMm: 'အဖွဲ့ခေါင်းဆောင်မှု', level: 'advanced', importance: 'required' },
            { name: 'Budget Management', nameMm: 'ဘတ်ဂျက် စီမံခန့်ခွဲမှု', level: 'intermediate', importance: 'required' },
            { name: 'Strategic Planning', nameMm: 'မဟာဗျူဟာ စီမံကိန်း', level: 'advanced', importance: 'required' },
            { name: 'Stakeholder Management', nameMm: 'Stakeholder စီမံခန့်ခွဲမှု', level: 'advanced', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Team Management',
          items: [
            { description: 'Manage team of 5+ recruiters', descriptionMm: 'Recruiter 5+ ဦးပါအဖွဲ့ကို စီမံခန့်ခွဲရန်', metric: '5+ team members', verified: false },
            { description: 'Own recruitment budget', descriptionMm: 'Recruitment ဘတ်ဂျက်ကို ပိုင်ဆိုင်ရန်', verified: false },
            { description: 'Report to executive leadership', descriptionMm: 'Executive ခေါင်းဆောင်မှုသို့ အစီရင်ခံရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Executive Leadership',
          items: [
            { trait: 'Visionary Leadership', traitMm: 'မျှော်မှန်းခေါင်းဆောင်မှု', description: 'Sets talent acquisition vision and direction', indicators: ['Talent strategy', 'Team development', 'Organizational impact'] },
            { trait: 'Business Impact', traitMm: 'စီးပွားရေး သက်ရောက်မှု', description: 'Demonstrates clear business impact of talent function', indicators: ['Hiring metrics', 'Quality of hire', 'Business alignment'] },
          ]
        }
      ],
      courses: [
        { courseId: 'talent-leadership', title: 'Talent Acquisition Leadership', titleMm: 'Talent Acquisition ခေါင်းဆောင်မှု', type: 'required', estimatedHours: 20, academyLink: '/dashboard/academy' },
        { courseId: 'workforce-planning', title: 'Workforce Planning', titleMm: 'Workforce Planning', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'hr-business', title: 'HR Business Partnership', titleMm: 'HR Business Partnership', type: 'recommended', estimatedHours: 12, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'HR analytics platforms', 'Budget management tools', 'Strategic planning tools', 'Leadership dashboards'],
      responsibilities: [
        'Lead talent acquisition team',
        'Develop talent acquisition strategy',
        'Manage recruitment budget',
        'Partner with business leadership',
        'Drive employer brand strategy',
        'Report to executive team',
        'Build high-performing team',
      ],
      nextLevelTips: [
        'Develop broader HR expertise',
        'Build executive presence',
        'Learn organizational development',
        'Understand total rewards',
        'Consider HR Director track',
      ]
    }
  ]
};

// Marketing Career Track
export const marketingTrack: CareerTrack = {
  id: 'marketing',
  name: 'Digital Marketing',
  nameMm: 'Digital Marketing',
  description: 'Plan and execute marketing campaigns across digital channels to drive business growth',
  descriptionMm: 'စီးပွားရေးကြီးထွားမှုအတွက် Digital နည်းလမ်းများဖြင့် မာကတ်တင်းကျော်ညားများ စီမံခန့်ခွဲခြင်း',
  category: 'marketing',
  icon: '📊',
  color: 'from-pink-500 to-rose-500',
  demandLevel: 'high',
  avgSalaryGrowth: '+10%',
  levels: [
    {
      id: 'marketing-executive',
      level: 1,
      title: 'Marketing Executive',
      titleMm: 'Marketing Executive',
      salaryRange: { min: 300000, max: 500000, currency: 'MMK' },
      yearsOfExperience: { min: 0, max: 2 },
      icon: '🌱',
      color: 'from-green-500 to-emerald-500',
      knowledge: [
        {
          category: 'Digital Marketing Basics',
          skills: [
            { name: 'Social Media Marketing', nameMm: 'Social Media Marketing', level: 'beginner', importance: 'required' },
            { name: 'Content Creation', nameMm: 'Content ဖန်တီးမှု', level: 'beginner', importance: 'required' },
            { name: 'Basic Analytics', nameMm: 'အခြေခံ Analytics', level: 'beginner', importance: 'required' },
            { name: 'Email Marketing', nameMm: 'Email Marketing', level: 'beginner', importance: 'recommended' },
            { name: 'SEO Basics', nameMm: 'SEO အခြေခံ', level: 'beginner', importance: 'recommended' },
          ]
        }
      ],
      competence: [
        {
          category: 'Execution',
          items: [
            { description: 'Create and schedule social media posts', descriptionMm: 'Social media posts များ ဖန်တီးပြီး အချိန်ဇယားချရန်', metric: '20+ posts/month', verified: false },
            { description: 'Monitor and report on campaign metrics', descriptionMm: 'ကျော်ညားမှု တိုင်းတာချက်များ စောင့်ကြည့်ပြီး အစီရင်ခံရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Creativity',
          items: [
            { trait: 'Creative Thinking', traitMm: 'ဆန်းသစ်သော တွေးခေါ်မှု', description: 'Generates creative content ideas', indicators: ['Original ideas', 'Visual sense', 'Trend awareness'] },
          ]
        }
      ],
      courses: [
        { courseId: 'digital-marketing-101', title: 'Digital Marketing Fundamentals', titleMm: 'Digital Marketing အခြေခံများ', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'social-media', title: 'Social Media Marketing', titleMm: 'Social Media Marketing', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
        { courseId: 'content-marketing', title: 'Content Marketing Basics', titleMm: 'Content Marketing အခြေခံ', type: 'recommended', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['Facebook Business Manager', 'Instagram', 'Canva', 'Google Analytics', 'Hootsuite/Buffer'],
      responsibilities: [
        'Execute social media campaigns',
        'Create content for various channels',
        'Monitor marketing metrics',
        'Coordinate with design team',
        'Support campaign planning',
      ],
      nextLevelTips: [
        'Develop analytics skills',
        'Learn paid advertising',
        'Build content strategy skills',
        'Understand marketing automation',
        'Get certified in Google Ads/Facebook Ads',
      ]
    },
    {
      id: 'marketing-specialist',
      level: 2,
      title: 'Marketing Specialist',
      titleMm: 'Marketing Specialist',
      salaryRange: { min: 500000, max: 800000, currency: 'MMK' },
      yearsOfExperience: { min: 2, max: 4 },
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      knowledge: [
        {
          category: 'Specialized Skills',
          skills: [
            { name: 'Paid Advertising', nameMm: 'Paid Advertising', level: 'intermediate', importance: 'required', description: 'Facebook Ads, Google Ads' },
            { name: 'SEO/SEM', nameMm: 'SEO/SEM', level: 'intermediate', importance: 'required' },
            { name: 'Marketing Analytics', nameMm: 'Marketing Analytics', level: 'intermediate', importance: 'required' },
            { name: 'Content Strategy', nameMm: 'Content Strategy', level: 'intermediate', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Campaign Management',
          items: [
            { description: 'Manage paid advertising campaigns', descriptionMm: 'Paid advertising ကျော်ညားမှုများ စီမံခန့်ခွဲရန်', metric: 'Manage ad budget', verified: false },
            { description: 'Analyze and optimize campaign performance', descriptionMm: 'ကျော်ညားမှု ထိရောက်မှုကို ခွဲခြမ်းစိတ်ဖြာပြီး တိုးတက်စေရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Data-Driven',
          items: [
            { trait: 'Analytical Mind', traitMm: 'ခွဲခြမ်းစိတ်ဖြာသော စိတ်', description: 'Makes decisions based on data and metrics', indicators: ['Uses analytics', 'Tests hypotheses', 'Optimizes based on data'] },
          ]
        }
      ],
      courses: [
        { courseId: 'google-ads', title: 'Google Ads Mastery', titleMm: 'Google Ads Mastery', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'facebook-ads', title: 'Facebook Ads Advanced', titleMm: 'Facebook Ads အဆင့်မြင့်', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
        { courseId: 'seo-mastery', title: 'SEO Mastery', titleMm: 'SEO Mastery', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'analytics-pro', title: 'Google Analytics Pro', titleMm: 'Google Analytics Pro', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'Google Ads', 'Facebook Ads Manager', 'SEMrush/Ahrefs', 'Google Tag Manager'],
      responsibilities: [
        'Plan and execute marketing campaigns',
        'Manage advertising budget',
        'Analyze campaign performance',
        'Develop content strategy',
        'Optimize conversion funnels',
        'Conduct competitive analysis',
      ],
      nextLevelTips: [
        'Develop strategic thinking',
        'Learn marketing attribution',
        'Build leadership skills',
        'Understand marketing technology stack',
        'Get advanced certifications',
      ]
    },
    {
      id: 'marketing-manager',
      level: 3,
      title: 'Marketing Manager',
      titleMm: 'Marketing Manager',
      salaryRange: { min: 800000, max: 1500000, currency: 'MMK' },
      yearsOfExperience: { min: 4, max: 7 },
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      knowledge: [
        {
          category: 'Strategic Skills',
          skills: [
            { name: 'Marketing Strategy', nameMm: 'Marketing Strategy', level: 'advanced', importance: 'required' },
            { name: 'Brand Management', nameMm: 'Brand Management', level: 'intermediate', importance: 'required' },
            { name: 'Team Leadership', nameMm: 'အဖွဲ့ခေါင်းဆောင်မှု', level: 'intermediate', importance: 'required' },
            { name: 'Budget Management', nameMm: 'ဘတ်ဂျက် စီမံခန့်ခွဲမှု', level: 'intermediate', importance: 'required' },
          ]
        }
      ],
      competence: [
        {
          category: 'Leadership',
          items: [
            { description: 'Lead marketing team', descriptionMm: 'Marketing အဖွဲ့ကို ဦးဆောင်ရန်', metric: '2-5 team members', verified: false },
            { description: 'Develop marketing strategy', descriptionMm: 'Marketing strategy ဖန်တီးရန်', verified: false },
          ]
        }
      ],
      attitude: [
        {
          category: 'Business Focus',
          items: [
            { trait: 'Business Acumen', traitMm: 'စီးပွားရေး အသိဉာဏ်', description: 'Understands business impact of marketing', indicators: ['ROI focus', 'Revenue awareness', 'Business alignment'] },
          ]
        }
      ],
      courses: [
        { courseId: 'marketing-strategy', title: 'Marketing Strategy', titleMm: 'Marketing Strategy', type: 'required', estimatedHours: 15, academyLink: '/dashboard/academy' },
        { courseId: 'brand-management', title: 'Brand Management', titleMm: 'Brand Management', type: 'required', estimatedHours: 12, academyLink: '/dashboard/academy' },
        { courseId: 'marketing-leadership', title: 'Marketing Leadership', titleMm: 'Marketing Leadership', type: 'required', estimatedHours: 10, academyLink: '/dashboard/academy' },
      ],
      tools: ['All previous', 'Marketing automation platforms', 'CRM systems', 'BI tools', 'Project management'],
      responsibilities: [
        'Develop marketing strategy',
        'Lead marketing team',
        'Manage marketing budget',
        'Drive brand growth',
        'Report to leadership',
        'Partner with sales and product',
      ],
      nextLevelTips: [
        'Develop executive presence',
        'Build cross-functional influence',
        'Understand P&L management',
        'Learn organizational leadership',
      ]
    }
  ]
};

// Export all tracks
export const careerTracks: CareerTrack[] = [
  developerTrack,
  recruiterTrack,
  marketingTrack,
  // Add more tracks as needed
];

// Helper functions
export function getCareerTrack(id: string): CareerTrack | undefined {
  return careerTracks.find(track => track.id === id);
}

export function getCareerLevel(trackId: string, levelId: string): CareerLevel | undefined {
  const track = getCareerTrack(trackId);
  return track?.levels.find(level => level.id === levelId);
}

export function getTracksByCategory(category: CareerTrack['category']): CareerTrack[] {
  return careerTracks.filter(track => track.category === category);
}

export function calculateProgress(level: CareerLevel, completedCourses: string[]): number {
  const requiredCourses = level.courses.filter(c => c.type === 'required');
  const completed = requiredCourses.filter(c => completedCourses.includes(c.courseId)).length;
  return Math.round((completed / requiredCourses.length) * 100);
}

export function getNextLevel(trackId: string, currentLevelId: string): CareerLevel | null {
  const track = getCareerTrack(trackId);
  if (!track) return null;
  
  const currentIndex = track.levels.findIndex(l => l.id === currentLevelId);
  if (currentIndex === -1 || currentIndex >= track.levels.length - 1) return null;
  
  return track.levels[currentIndex + 1];
}

export default careerTracks;
