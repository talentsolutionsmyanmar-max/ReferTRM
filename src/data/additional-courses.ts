// Extended Course Catalog - Mapped to Zodiac Development Needs
// Each zodiac sign has specific development areas that these courses address

import { LucideIcon } from 'lucide-react';
import {
  Brain, Heart, Target, TrendingUp, Award, Users, Globe2, Scale,
  Presentation, MessageSquare, Zap, Shield, Compass, Crown, Lightbulb,
  BarChart3, PenTool, Headphones, Sparkles, Clock, Layers
} from 'lucide-react';

export interface CourseModule {
  id: string;
  title: string;
  titleMm: string;
  duration: number;
  points: number;
  description: string;
  lessons: { title: string; duration: number; type: 'video' | 'reading' | 'interactive' | 'quiz' }[];
  objectives: string[];
}

export interface LearningTrack {
  id: string;
  title: string;
  titleMm: string;
  description: string;
  icon: LucideIcon;
  color: string;
  difficulty: string;
  category: string;
  totalHours: number;
  totalModules: number;
  totalPoints: number;
  featured?: boolean;
  new?: boolean;
  modules: CourseModule[];
  // Which zodiac signs this course is recommended for
  recommendedForZodiac?: string[];
}

// New courses designed based on zodiac development needs
export const additionalCourses: LearningTrack[] = [
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence Mastery',
    titleMm: 'စိတ်ခံစားမှုဉာဏ်ကျွမ်းကျင်မှု',
    description: 'Develop EQ for better relationships and career success',
    icon: Heart,
    color: 'from-rose-600 to-pink-600',
    difficulty: 'All Levels',
    category: 'Personal Development',
    totalHours: 3.0,
    totalModules: 8,
    totalPoints: 140,
    new: true,
    recommendedForZodiac: ['aries', 'leo', 'sagittarius', 'capricorn', 'aquarius'],
    modules: [
      {
        id: 'eq-1', title: 'Understanding Emotions', titleMm: 'စိတ်ခံစားမှုများကိုနားလည်ခြင်း', duration: 25, points: 18,
        description: 'Learn to recognize and understand your emotions',
        lessons: [
          { title: 'What is Emotional Intelligence?', duration: 8, type: 'video' },
          { title: 'The Four EQ Skills', duration: 7, type: 'video' },
          { title: 'Why EQ Matters at Work', duration: 5, type: 'reading' },
          { title: 'Emotion Recognition Quiz', duration: 5, type: 'quiz' }
        ],
        objectives: ['Define emotional intelligence', 'Identify the four EQ skills', 'Understand workplace EQ importance']
      },
      {
        id: 'eq-2', title: 'Self-Awareness Development', titleMm: 'မိမိကိုယ်ကိုသိရှိမှုဖွံ့ဖြိုးတိုးတက်ရေး', duration: 30, points: 20,
        description: 'Build deeper understanding of your emotions and triggers',
        lessons: [
          { title: 'Recognizing Your Emotions', duration: 10, type: 'video' },
          { title: 'Identifying Emotional Triggers', duration: 8, type: 'video' },
          { title: 'Journaling for Self-Discovery', duration: 7, type: 'interactive' },
          { title: 'Self-Reflection Exercise', duration: 5, type: 'interactive' }
        ],
        objectives: ['Recognize emotions in real-time', 'Identify personal triggers', 'Practice self-reflection']
      },
      {
        id: 'eq-3', title: 'Self-Management Skills', titleMm: 'မိမိကိုယ်ကိုစီမံခန့်ခွဲမှုကျွမ်းကျင်မှု', duration: 30, points: 20,
        description: 'Manage your emotions effectively in any situation',
        lessons: [
          { title: 'Emotional Regulation Techniques', duration: 10, type: 'video' },
          { title: 'Managing Stress and Anxiety', duration: 8, type: 'video' },
          { title: 'Staying Calm Under Pressure', duration: 7, type: 'reading' },
          { title: 'Practice Scenarios', duration: 5, type: 'interactive' }
        ],
        objectives: ['Apply regulation techniques', 'Manage workplace stress', 'Stay composed under pressure']
      },
      {
        id: 'eq-4', title: 'Social Awareness', titleMm: 'လူမှုရေးသတိထားမှု', duration: 25, points: 18,
        description: 'Read and understand others\' emotions effectively',
        lessons: [
          { title: 'Reading Body Language', duration: 8, type: 'video' },
          { title: 'Understanding Context', duration: 7, type: 'video' },
          { title: 'Cultural Sensitivity', duration: 5, type: 'reading' },
          { title: 'Observation Exercise', duration: 5, type: 'interactive' }
        ],
        objectives: ['Read non-verbal cues', 'Understand social context', 'Be culturally aware']
      },
      {
        id: 'eq-5', title: 'Empathy in the Workplace', titleMm: 'အလုပ်နေရာတွင်စာနာမှု', duration: 25, points: 18,
        description: 'Build empathy for stronger professional relationships',
        lessons: [
          { title: 'Types of Empathy', duration: 7, type: 'video' },
          { title: 'Active Listening Skills', duration: 8, type: 'video' },
          { title: 'Showing Empathy Professionally', duration: 5, type: 'reading' },
          { title: 'Empathy Role-Play', duration: 5, type: 'interactive' }
        ],
        objectives: ['Distinguish empathy types', 'Listen actively', 'Express empathy professionally']
      },
      {
        id: 'eq-6', title: 'Relationship Management', titleMm: 'ဆက်ဆံရေးစီမံခန့်ခွဲမှု', duration: 25, points: 16,
        description: 'Build and maintain strong professional relationships',
        lessons: [
          { title: 'Building Trust', duration: 7, type: 'video' },
          { title: 'Giving Constructive Feedback', duration: 6, type: 'video' },
          { title: 'Handling Difficult Conversations', duration: 7, type: 'video' },
          { title: 'Relationship Mapping', duration: 5, type: 'interactive' }
        ],
        objectives: ['Build professional trust', 'Give feedback effectively', 'Handle difficult talks']
      },
      {
        id: 'eq-7', title: 'EQ for Leadership', titleMm: 'ခေါင်းဆောင်မှုအတွက် EQ', duration: 20, points: 16,
        description: 'Apply emotional intelligence as a leader',
        lessons: [
          { title: 'Leading with Empathy', duration: 7, type: 'video' },
          { title: 'Motivating Your Team', duration: 6, type: 'video' },
          { title: 'EQ in Decision Making', duration: 4, type: 'reading' },
          { title: 'Leadership EQ Assessment', duration: 3, type: 'quiz' }
        ],
        objectives: ['Lead empathetically', 'Motivate with EQ', 'Make emotionally intelligent decisions']
      },
      {
        id: 'eq-8', title: 'EQ Mastery Assessment', titleMm: 'EQ ကျွမ်းကျင်မှုတိုင်းတာခြင်း', duration: 20, points: 14,
        description: 'Complete assessment to earn your certificate',
        lessons: [
          { title: 'Course Review', duration: 5, type: 'reading' },
          { title: 'Practical EQ Challenge', duration: 10, type: 'interactive' },
          { title: 'Final Assessment', duration: 5, type: 'quiz' }
        ],
        objectives: ['Review EQ concepts', 'Complete practical challenge', 'Demonstrate EQ mastery']
      }
    ]
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking Mastery',
    titleMm: 'အများရှေ့မှာစတင်ပြောခြင်း',
    description: 'Overcome fear and become a confident public speaker',
    icon: Presentation,
    color: 'from-indigo-600 to-purple-600',
    difficulty: 'Beginner Friendly',
    category: 'Communication',
    totalHours: 3.5,
    totalModules: 8,
    totalPoints: 150,
    new: true,
    recommendedForZodiac: ['leo', 'aries', 'sagittarius', 'gemini', 'libra'],
    modules: [
      {
        id: 'ps-1', title: 'Overcoming Public Speaking Fear', titleMm: 'အများရှေ့ပြောရန်စိုးရိမ်မှုကျော်လွန်ခြင်း', duration: 30, points: 20,
        description: 'Conquer your fear and build confidence',
        lessons: [
          { title: 'Understanding Stage Fright', duration: 10, type: 'video' },
          { title: 'Mental Preparation Techniques', duration: 8, type: 'video' },
          { title: 'Physical Relaxation Methods', duration: 7, type: 'interactive' },
          { title: 'Your First Mini-Presentation', duration: 5, type: 'interactive' }
        ],
        objectives: ['Understand stage fright', 'Prepare mentally', 'Relax physically']
      },
      {
        id: 'ps-2', title: 'Structuring Your Presentation', titleMm: 'သင့်တင်ပြချက်ဖွဲ့စည်းမှု', duration: 30, points: 20,
        description: 'Create compelling presentation structures',
        lessons: [
          { title: 'The Classic Speech Structure', duration: 10, type: 'video' },
          { title: 'Opening with Impact', duration: 7, type: 'video' },
          { title: 'Crafting Your Message', duration: 8, type: 'interactive' },
          { title: 'Closing Memorably', duration: 5, type: 'reading' }
        ],
        objectives: ['Structure presentations', 'Create impactful openings', 'Craft memorable closings']
      },
      {
        id: 'ps-3', title: 'Vocal Delivery Techniques', titleMm: 'အသံဖြင့်ပေးပို့နည်း', duration: 25, points: 18,
        description: 'Use your voice effectively',
        lessons: [
          { title: 'Voice Projection', duration: 7, type: 'video' },
          { title: 'Pace and Pauses', duration: 7, type: 'video' },
          { title: 'Tone and Emphasis', duration: 6, type: 'video' },
          { title: 'Voice Practice Session', duration: 5, type: 'interactive' }
        ],
        objectives: ['Project voice confidently', 'Use pauses effectively', 'Apply tone variations']
      },
      {
        id: 'ps-4', title: 'Body Language on Stage', titleMm: 'စင်ပေါ်တွင်ခန္ဓာကိုယ်ဘာသာစကား', duration: 25, points: 18,
        description: 'Use body language to enhance your message',
        lessons: [
          { title: 'Posture and Presence', duration: 8, type: 'video' },
          { title: 'Gestures and Movement', duration: 7, type: 'video' },
          { title: 'Eye Contact Strategies', duration: 5, type: 'reading' },
          { title: 'Body Language Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Maintain confident posture', 'Use purposeful gestures', 'Connect through eye contact']
      },
      {
        id: 'ps-5', title: 'Creating Visual Aids', titleMm: 'ပုံရိပ်အကူအညီများဖန်တီးခြင်း', duration: 25, points: 18,
        description: 'Design effective slides and visual materials',
        lessons: [
          { title: 'Slide Design Principles', duration: 8, type: 'video' },
          { title: 'Using Images and Charts', duration: 7, type: 'video' },
          { title: 'Avoiding Common Mistakes', duration: 5, type: 'reading' },
          { title: 'Create Sample Slides', duration: 5, type: 'interactive' }
        ],
        objectives: ['Design clean slides', 'Use visuals effectively', 'Avoid presentation pitfalls']
      },
      {
        id: 'ps-6', title: 'Engaging Your Audience', titleMm: 'ပရိသတ်ပါဝင်ဆံ့', duration: 25, points: 18,
        description: 'Keep your audience engaged throughout',
        lessons: [
          { title: 'Storytelling Techniques', duration: 8, type: 'video' },
          { title: 'Interactive Elements', duration: 7, type: 'video' },
          { title: 'Handling Questions', duration: 5, type: 'reading' },
          { title: 'Engagement Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Tell compelling stories', 'Add interactive elements', 'Handle Q&A confidently']
      },
      {
        id: 'ps-7', title: 'Special Occasion Speaking', titleMm: 'အထူးအခမ်းအနားပြောခြင်း', duration: 20, points: 16,
        description: 'Speak at weddings, meetings, and events',
        lessons: [
          { title: 'Wedding Speeches', duration: 6, type: 'video' },
          { title: 'Business Presentations', duration: 6, type: 'video' },
          { title: 'Toasts and Tributes', duration: 4, type: 'reading' },
          { title: 'Write Your Speech', duration: 4, type: 'interactive' }
        ],
        objectives: ['Give wedding speeches', 'Present in business settings', 'Give memorable toasts']
      },
      {
        id: 'ps-8', title: 'Final Presentation Showcase', titleMm: 'နောက်ဆုံးတင်ပြချက်ပြသခြင်း', duration: 30, points: 22,
        description: 'Deliver your capstone presentation',
        lessons: [
          { title: 'Prepare Your Final Speech', duration: 5, type: 'reading' },
          { title: 'Recorded Presentation', duration: 15, type: 'interactive' },
          { title: 'Self-Evaluation', duration: 10, type: 'interactive' }
        ],
        objectives: ['Prepare complete speech', 'Deliver confidently', 'Evaluate performance']
      }
    ]
  },
  {
    id: 'leadership-management',
    title: 'Leadership & Management',
    titleMm: 'ခေါင်းဆောင်မှုနှင့်စီမံခန့်ခွဲမှု',
    description: 'Develop essential leadership skills for any career stage',
    icon: Crown,
    color: 'from-amber-600 to-yellow-600',
    difficulty: 'Intermediate',
    category: 'Leadership',
    totalHours: 4.0,
    totalModules: 8,
    totalPoints: 170,
    featured: true,
    recommendedForZodiac: ['leo', 'aries', 'capricorn', 'scorpio', 'taurus'],
    modules: [
      {
        id: 'lm-1', title: 'Leadership Foundations', titleMm: 'ခေါင်းဆောင်မှုအခြေခံ', duration: 30, points: 22,
        description: 'Understand what makes great leaders',
        lessons: [
          { title: 'What is Leadership?', duration: 10, type: 'video' },
          { title: 'Leaders vs Managers', duration: 7, type: 'video' },
          { title: 'Leadership Theories', duration: 8, type: 'reading' },
          { title: 'Leadership Self-Assessment', duration: 5, type: 'quiz' }
        ],
        objectives: ['Define leadership', 'Distinguish leaders from managers', 'Identify your leadership style']
      },
      {
        id: 'lm-2', title: 'Leadership Styles', titleMm: 'ခေါင်းဆောင်မှုပုံစံများ', duration: 35, points: 22,
        description: 'Discover and develop your leadership style',
        lessons: [
          { title: 'Transformational Leadership', duration: 10, type: 'video' },
          { title: 'Servant Leadership', duration: 8, type: 'video' },
          { title: 'Situational Leadership', duration: 8, type: 'video' },
          { title: 'Find Your Style', duration: 9, type: 'interactive' }
        ],
        objectives: ['Apply transformational leadership', 'Practice servant leadership', 'Adapt to situations']
      },
      {
        id: 'lm-3', title: 'Team Building & Motivation', titleMm: 'အဖွဲ့တည်ဆောက်မှုနှင့်လှုံ့ဆော်မှု', duration: 35, points: 22,
        description: 'Build and inspire high-performing teams',
        lessons: [
          { title: 'Building Effective Teams', duration: 10, type: 'video' },
          { title: 'Motivation Theories', duration: 8, type: 'video' },
          { title: 'Delegation Strategies', duration: 7, type: 'reading' },
          { title: 'Team Building Exercise', duration: 10, type: 'interactive' }
        ],
        objectives: ['Build effective teams', 'Apply motivation theories', 'Delegate effectively']
      },
      {
        id: 'lm-4', title: 'Strategic Decision Making', titleMm: 'မဟာဗျူဟာဆိုင်ရာ 결정내리기', duration: 30, points: 20,
        description: 'Make better decisions as a leader',
        lessons: [
          { title: 'Decision-Making Frameworks', duration: 10, type: 'video' },
          { title: 'Data-Driven Decisions', duration: 8, type: 'video' },
          { title: 'Avoiding Decision Traps', duration: 7, type: 'reading' },
          { title: 'Case Study Analysis', duration: 5, type: 'interactive' }
        ],
        objectives: ['Use decision frameworks', 'Leverage data', 'Avoid common traps']
      },
      {
        id: 'lm-5', title: 'Change Management', titleMm: 'အပြောင်းအလဲစီမံခန့်ခွဲမှု', duration: 30, points: 20,
        description: 'Lead teams through organizational change',
        lessons: [
          { title: 'Understanding Change', duration: 10, type: 'video' },
          { title: 'Change Models', duration: 8, type: 'video' },
          { title: 'Overcoming Resistance', duration: 7, type: 'reading' },
          { title: 'Change Plan Creation', duration: 5, type: 'interactive' }
        ],
        objectives: ['Understand change dynamics', 'Apply change models', 'Manage resistance']
      },
      {
        id: 'lm-6', title: 'Performance Management', titleMm: 'ဆောင်ရွက်မှုစီမံခန့်ခွဲမှု', duration: 30, points: 20,
        description: 'Evaluate and develop team performance',
        lessons: [
          { title: 'Setting Expectations', duration: 8, type: 'video' },
          { title: 'Feedback and Coaching', duration: 10, type: 'video' },
          { title: 'Performance Reviews', duration: 7, type: 'reading' },
          { title: 'Practice Performance Review', duration: 5, type: 'interactive' }
        ],
        objectives: ['Set clear expectations', 'Provide effective feedback', 'Conduct performance reviews']
      },
      {
        id: 'lm-7', title: 'Ethical Leadership', titleMm: 'ကျင့်ဝတ်ခေါင်းဆောင်မှု', duration: 25, points: 18,
        description: 'Lead with integrity and ethics',
        lessons: [
          { title: 'Leadership Ethics', duration: 8, type: 'video' },
          { title: 'Building Trust', duration: 7, type: 'video' },
          { title: 'Ethical Dilemmas', duration: 5, type: 'reading' },
          { title: 'Ethics Scenarios', duration: 5, type: 'interactive' }
        ],
        objectives: ['Understand leadership ethics', 'Build organizational trust', 'Navigate ethical dilemmas']
      },
      {
        id: 'lm-8', title: 'Leadership Capstone Project', titleMm: 'ခေါင်းဆောင်မှုနိဂုံးစာမူ', duration: 35, points: 26,
        description: 'Apply everything in a leadership simulation',
        lessons: [
          { title: 'Leadership Simulation', duration: 20, type: 'interactive' },
          { title: 'Peer Feedback', duration: 10, type: 'interactive' },
          { title: 'Personal Leadership Plan', duration: 5, type: 'interactive' }
        ],
        objectives: ['Apply leadership skills', 'Receive feedback', 'Create development plan']
      }
    ]
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution',
    titleMm: 'ပဋိပက္ခဖြေရှင်းမှု',
    description: 'Handle workplace conflicts professionally and effectively',
    icon: Scale,
    color: 'from-blue-600 to-cyan-600',
    difficulty: 'Intermediate',
    category: 'Professional Development',
    totalHours: 2.5,
    totalModules: 8,
    totalPoints: 120,
    recommendedForZodiac: ['aries', 'leo', 'scorpio', 'cancer', 'libra'],
    modules: [
      {
        id: 'cr-1', title: 'Understanding Conflict', titleMm: 'ပဋိပက္ခကိုနားလည်ခြင်း', duration: 20, points: 16,
        description: 'Recognize types and causes of workplace conflict',
        lessons: [
          { title: 'What is Workplace Conflict?', duration: 7, type: 'video' },
          { title: 'Types of Conflict', duration: 5, type: 'video' },
          { title: 'Conflict Triggers', duration: 5, type: 'reading' },
          { title: 'Conflict Identification Quiz', duration: 3, type: 'quiz' }
        ],
        objectives: ['Define workplace conflict', 'Identify conflict types', 'Recognize triggers']
      },
      {
        id: 'cr-2', title: 'Your Conflict Style', titleMm: 'သင့်ပဋိပက္ခပုံစံ', duration: 20, points: 16,
        description: 'Discover your natural conflict resolution style',
        lessons: [
          { title: 'Five Conflict Styles', duration: 8, type: 'video' },
          { title: 'Style Assessment', duration: 7, type: 'quiz' },
          { title: 'Adapting Your Style', duration: 5, type: 'reading' }
        ],
        objectives: ['Know conflict styles', 'Assess your style', 'Adapt to situations']
      },
      {
        id: 'cr-3', title: 'Communication in Conflict', titleMm: 'ပဋိပက္ခတွင်ဆက်သွယ်မှု', duration: 25, points: 18,
        description: 'Communicate effectively during disagreements',
        lessons: [
          { title: 'Active Listening', duration: 8, type: 'video' },
          { title: '"I" Statements', duration: 7, type: 'video' },
          { title: 'Avoiding Escalation', duration: 5, type: 'reading' },
          { title: 'Communication Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Listen actively', 'Use "I" statements', 'Prevent escalation']
      },
      {
        id: 'cr-4', title: 'Mediation Techniques', titleMm: 'စောင့်ရှောက်မှုနည်းပညာ', duration: 25, points: 16,
        description: 'Mediate conflicts between others',
        lessons: [
          { title: 'Mediation Process', duration: 8, type: 'video' },
          { title: 'Creating Safe Space', duration: 7, type: 'video' },
          { title: 'Facilitating Dialogue', duration: 5, type: 'reading' },
          { title: 'Mediation Role-Play', duration: 5, type: 'interactive' }
        ],
        objectives: ['Understand mediation', 'Create safe environment', 'Facilitate discussions']
      },
      {
        id: 'cr-5', title: 'Managing Difficult People', titleMm: 'ခက်ခဲသောလူများစီမံခန့်ခွဲမှု', duration: 20, points: 14,
        description: 'Handle challenging personalities professionally',
        lessons: [
          { title: 'Types of Difficult People', duration: 7, type: 'video' },
          { title: 'De-escalation Strategies', duration: 7, type: 'video' },
          { title: 'Setting Boundaries', duration: 4, type: 'reading' },
          { title: 'Scenario Practice', duration: 2, type: 'interactive' }
        ],
        objectives: ['Identify difficult types', 'De-escalate tensions', 'Set professional boundaries']
      },
      {
        id: 'cr-6', title: 'Conflict Prevention', titleMm: 'ပဋိပက္ခကာကွယ်မှု', duration: 20, points: 14,
        description: 'Prevent conflicts before they start',
        lessons: [
          { title: 'Building Preventive Culture', duration: 7, type: 'video' },
          { title: 'Early Warning Signs', duration: 5, type: 'video' },
          { title: 'Team Agreements', duration: 5, type: 'reading' },
          { title: 'Prevention Plan', duration: 3, type: 'interactive' }
        ],
        objectives: ['Build preventive culture', 'Spot early warnings', 'Create team agreements']
      },
      {
        id: 'cr-7', title: 'Conflict Resolution at Different Levels', titleMm: 'အမျိုးမျိုးသောအဆင့်များတွင်ပဋိပက္ခဖြေရှင်းမှု', duration: 20, points: 12,
        description: 'Handle conflicts with peers, bosses, and subordinates',
        lessons: [
          { title: 'Peer Conflicts', duration: 6, type: 'video' },
          { title: 'Conflicts with Authority', duration: 6, type: 'video' },
          { title: 'Team Conflicts', duration: 5, type: 'video' },
          { title: 'Reflection Exercise', duration: 3, type: 'interactive' }
        ],
        objectives: ['Handle peer conflicts', 'Manage upward conflicts', 'Resolve team disputes']
      },
      {
        id: 'cr-8', title: 'Conflict Resolution Mastery', titleMm: 'ပဋိပက္ခဖြေရှင်းမှုကျွမ်းကျင်မှု', duration: 20, points: 14,
        description: 'Final assessment and certification',
        lessons: [
          { title: 'Case Study Analysis', duration: 8, type: 'interactive' },
          { title: 'Conflict Simulation', duration: 7, type: 'interactive' },
          { title: 'Final Assessment', duration: 5, type: 'quiz' }
        ],
        objectives: ['Analyze complex conflicts', 'Apply resolution skills', 'Demonstrate mastery']
      }
    ]
  },
  {
    id: 'time-productivity',
    title: 'Time Management & Productivity',
    titleMm: 'အချိန်စီမံခန့်ခွဲမှုနှင့်ထုတ်ကုန်စွမ်းအား',
    description: 'Maximize your productivity and achieve work-life balance',
    icon: Clock,
    color: 'from-emerald-600 to-green-600',
    difficulty: 'Beginner Friendly',
    category: 'Personal Development',
    totalHours: 2.5,
    totalModules: 8,
    totalPoints: 120,
    recommendedForZodiac: ['aries', 'gemini', 'sagittarius', 'pisces', 'virgo'],
    modules: [
      {
        id: 'tm-1', title: 'Time Management Fundamentals', titleMm: 'အချိန်စီမံခန့်ခွဲမှုအခြေခံ', duration: 25, points: 16,
        description: 'Understand the basics of effective time management',
        lessons: [
          { title: 'Why Time Management Matters', duration: 8, type: 'video' },
          { title: 'Time Audit', duration: 7, type: 'interactive' },
          { title: 'Identifying Time Wasters', duration: 5, type: 'reading' },
          { title: 'Your Time Profile', duration: 5, type: 'quiz' }
        ],
        objectives: ['Value time management', 'Audit your time', 'Identify time wasters']
      },
      {
        id: 'tm-2', title: 'Priority Management', titleMm: 'ဦးစားပေးစီမံခန့်ခွဲမှု', duration: 25, points: 18,
        description: 'Focus on what truly matters',
        lessons: [
          { title: 'Eisenhower Matrix', duration: 10, type: 'video' },
          { title: 'Pareto Principle (80/20)', duration: 7, type: 'video' },
          { title: 'Priority Setting Exercise', duration: 5, type: 'reading' },
          { title: 'Create Your Matrix', duration: 3, type: 'interactive' }
        ],
        objectives: ['Use Eisenhower Matrix', 'Apply 80/20 principle', 'Set daily priorities']
      },
      {
        id: 'tm-3', title: 'Planning & Scheduling', titleMm: 'စီမံကိန်းနှင့်အချိန်ဇယား', duration: 25, points: 16,
        description: 'Plan your days and weeks effectively',
        lessons: [
          { title: 'Weekly Planning', duration: 8, type: 'video' },
          { title: 'Daily Scheduling', duration: 7, type: 'video' },
          { title: 'Time Blocking', duration: 5, type: 'reading' },
          { title: 'Create Your Schedule', duration: 5, type: 'interactive' }
        ],
        objectives: ['Plan weekly effectively', 'Schedule daily tasks', 'Use time blocking']
      },
      {
        id: 'tm-4', title: 'Overcoming Procrastination', titleMm: 'အလုပ်ပျက်စွာနေမှုကျော်လွန်ခြင်း', duration: 20, points: 14,
        description: 'Stop procrastinating and take action',
        lessons: [
          { title: 'Why We Procrastinate', duration: 7, type: 'video' },
          { title: 'Breaking the Cycle', duration: 6, type: 'video' },
          { title: 'Accountability Systems', duration: 4, type: 'reading' },
          { title: 'Procrastination Buster', duration: 3, type: 'interactive' }
        ],
        objectives: ['Understand procrastination', 'Break procrastination habits', 'Build accountability']
      },
      {
        id: 'tm-5', title: 'Focus & Concentration', titleMm: 'အာရုံစိုက်မှုနှင့်集中ဗျာဟာ', duration: 25, points: 16,
        description: 'Improve your focus and avoid distractions',
        lessons: [
          { title: 'Deep Work Concept', duration: 8, type: 'video' },
          { title: 'Eliminating Distractions', duration: 7, type: 'video' },
          { title: 'Pomodoro Technique', duration: 5, type: 'reading' },
          { title: 'Focus Session Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Practice deep work', 'Eliminate distractions', 'Use Pomodoro technique']
      },
      {
        id: 'tm-6', title: 'Tools & Systems', titleMm: 'ကိရိယာများနှင့်စနစ်များ', duration: 20, points: 14,
        description: 'Use technology for better productivity',
        lessons: [
          { title: 'Digital Tools Overview', duration: 7, type: 'video' },
          { title: 'Calendar Systems', duration: 6, type: 'video' },
          { title: 'Task Management Apps', duration: 4, type: 'reading' },
          { title: 'Setup Your System', duration: 3, type: 'interactive' }
        ],
        objectives: ['Know productivity tools', 'Use calendar effectively', 'Choose task manager']
      },
      {
        id: 'tm-7', title: 'Work-Life Balance', titleMm: 'အလုပ်-ဘဝညီမျှမှု', duration: 20, points: 14,
        description: 'Achieve healthy balance between work and life',
        lessons: [
          { title: 'Setting Boundaries', duration: 7, type: 'video' },
          { title: 'Self-Care Practices', duration: 6, type: 'video' },
          { title: 'Avoiding Burnout', duration: 4, type: 'reading' },
          { title: 'Balance Assessment', duration: 3, type: 'quiz' }
        ],
        objectives: ['Set work boundaries', 'Practice self-care', 'Prevent burnout']
      },
      {
        id: 'tm-8', title: 'Productivity Mastery', titleMm: 'ထုတ်ကုန်စွမ်းအားကျွမ်းကျင်မှု', duration: 25, points: 12,
        description: 'Final assessment and productivity plan',
        lessons: [
          { title: 'Productivity System Review', duration: 7, type: 'reading' },
          { title: 'Weekly Productivity Challenge', duration: 10, type: 'interactive' },
          { title: 'Your Productivity Blueprint', duration: 8, type: 'interactive' }
        ],
        objectives: ['Review all concepts', 'Complete challenge', 'Create productivity plan']
      }
    ]
  },
  {
    id: 'creative-problem-solving',
    title: 'Creative Problem Solving',
    titleMm: 'ဖန်တီးသောပြဿနာဖြေရှင်းမှု',
    description: 'Develop innovative solutions to complex challenges',
    icon: Lightbulb,
    color: 'from-fuchsia-600 to-pink-600',
    difficulty: 'Intermediate',
    category: 'Innovation',
    totalHours: 2.5,
    totalModules: 8,
    totalPoints: 130,
    recommendedForZodiac: ['aquarius', 'gemini', 'sagittarius', 'pisces', 'leo'],
    modules: [
      {
        id: 'cps-1', title: 'Problem Solving Mindset', titleMm: 'ပြဿနာဖြေရှင်းမှုစိတ်ပိုင်းဆိုင်ရာ', duration: 20, points: 16,
        description: 'Develop a problem-solving mindset',
        lessons: [
          { title: 'What is Creative Problem Solving?', duration: 7, type: 'video' },
          { title: 'Growth Mindset for Problems', duration: 6, type: 'video' },
          { title: 'Reframing Problems', duration: 4, type: 'reading' },
          { title: 'Problem Reframing Exercise', duration: 3, type: 'interactive' }
        ],
        objectives: ['Understand creative problem solving', 'Develop growth mindset', 'Reframe problems']
      },
      {
        id: 'cps-2', title: 'Problem Analysis Techniques', titleMm: 'ပြဿနာခွဲခြမ်းစိတ်ဖြာနည်းပညာ', duration: 25, points: 18,
        description: 'Analyze problems systematically',
        lessons: [
          { title: 'Root Cause Analysis', duration: 8, type: 'video' },
          { title: '5 Whys Technique', duration: 7, type: 'video' },
          { title: 'Fishbone Diagram', duration: 5, type: 'reading' },
          { title: 'Problem Analysis Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Find root causes', 'Use 5 Whys', 'Create fishbone diagrams']
      },
      {
        id: 'cps-3', title: 'Generating Creative Solutions', titleMm: 'ဖန်တီးမှုဆိုင်ရာဖြေရှင်းချက်များဖန်တီးခြင်း', duration: 25, points: 18,
        description: 'Generate innovative ideas and solutions',
        lessons: [
          { title: 'Brainstorming Techniques', duration: 8, type: 'video' },
          { title: 'SCAMPER Method', duration: 7, type: 'video' },
          { title: 'Mind Mapping', duration: 5, type: 'reading' },
          { title: 'Creative Session', duration: 5, type: 'interactive' }
        ],
        objectives: ['Brainstorm effectively', 'Apply SCAMPER', 'Create mind maps']
      },
      {
        id: 'cps-4', title: 'Design Thinking Basics', titleMm: 'ဒီဇိုင်းတွေးခေါ်မှုအခြေခံ', duration: 25, points: 16,
        description: 'Apply design thinking to problems',
        lessons: [
          { title: 'Design Thinking Process', duration: 8, type: 'video' },
          { title: 'Empathy in Problem Solving', duration: 7, type: 'video' },
          { title: 'Prototyping Solutions', duration: 5, type: 'reading' },
          { title: 'Mini Design Sprint', duration: 5, type: 'interactive' }
        ],
        objectives: ['Understand design thinking', 'Apply empathy', 'Create prototypes']
      },
      {
        id: 'cps-5', title: 'Decision Making for Solutions', titleMm: 'ဖြေရှင်းချက်များအတွက်ဆုံးဖြတ်ချက်ချခြင်း', duration: 20, points: 16,
        description: 'Choose the best solution confidently',
        lessons: [
          { title: 'Evaluating Options', duration: 7, type: 'video' },
          { title: 'Decision Matrices', duration: 6, type: 'video' },
          { title: 'Risk Assessment', duration: 4, type: 'reading' },
          { title: 'Decision Matrix Practice', duration: 3, type: 'interactive' }
        ],
        objectives: ['Evaluate solutions', 'Use decision matrices', 'Assess risks']
      },
      {
        id: 'cps-6', title: 'Implementation Planning', titleMm: 'အကောင်အထည်ဖော်ဆောင်ရွက်မှုစီမံကိန်း', duration: 20, points: 14,
        description: 'Plan and execute solutions effectively',
        lessons: [
          { title: 'Action Planning', duration: 7, type: 'video' },
          { title: 'Resource Allocation', duration: 6, type: 'video' },
          { title: 'Milestone Setting', duration: 4, type: 'reading' },
          { title: 'Create Action Plan', duration: 3, type: 'interactive' }
        ],
        objectives: ['Create action plans', 'Allocate resources', 'Set milestones']
      },
      {
        id: 'cps-7', title: 'Overcoming Barriers', titleMm: 'အတားအဆီးများကျော်လွန်ခြင်း', duration: 20, points: 14,
        description: 'Handle obstacles during implementation',
        lessons: [
          { title: 'Common Implementation Barriers', duration: 7, type: 'video' },
          { title: 'Stakeholder Management', duration: 6, type: 'video' },
          { title: 'Adjusting Course', duration: 4, type: 'reading' },
          { title: 'Barrier Exercise', duration: 3, type: 'interactive' }
        ],
        objectives: ['Identify barriers', 'Manage stakeholders', 'Adapt to challenges']
      },
      {
        id: 'cps-8', title: 'Problem Solving Capstone', titleMm: 'ပြဿနာဖြေရှင်းမှုနိဂုံး', duration: 25, points: 18,
        description: 'Apply all skills to a complex problem',
        lessons: [
          { title: 'Complex Problem Selection', duration: 5, type: 'reading' },
          { title: 'Full Problem Solving Cycle', duration: 12, type: 'interactive' },
          { title: 'Solution Presentation', duration: 8, type: 'interactive' }
        ],
        objectives: ['Select meaningful problem', 'Apply full process', 'Present solution']
      }
    ]
  },
  {
    id: 'negotiation-skills',
    title: 'Negotiation Skills',
    titleMm: 'ညှိနှိုင်းမှုကျွမ်းကျင်မှု',
    description: 'Master the art of negotiation for career success',
    icon: MessageSquare,
    color: 'from-violet-600 to-indigo-600',
    difficulty: 'Intermediate',
    category: 'Communication',
    totalHours: 2.5,
    totalModules: 8,
    totalPoints: 130,
    recommendedForZodiac: ['libra', 'taurus', 'capricorn', 'scorpio', 'aries'],
    modules: [
      {
        id: 'ns-1', title: 'Negotiation Fundamentals', titleMm: 'ညှိနှိုင်းမှုအခြေခံ', duration: 20, points: 16,
        description: 'Understand the basics of effective negotiation',
        lessons: [
          { title: 'What is Negotiation?', duration: 7, type: 'video' },
          { title: 'Win-Win Mindset', duration: 6, type: 'video' },
          { title: 'Negotiation Styles', duration: 4, type: 'reading' },
          { title: 'Style Assessment', duration: 3, type: 'quiz' }
        ],
        objectives: ['Define negotiation', 'Adopt win-win mindset', 'Know your style']
      },
      {
        id: 'ns-2', title: 'Preparation & Research', titleMm: 'ပြင်ဆင်မှုနှင့်သုတေသန', duration: 25, points: 18,
        description: 'Prepare thoroughly before any negotiation',
        lessons: [
          { title: 'Know Your BATNA', duration: 8, type: 'video' },
          { title: 'Research the Other Party', duration: 7, type: 'video' },
          { title: 'Setting Objectives', duration: 5, type: 'reading' },
          { title: 'Preparation Checklist', duration: 5, type: 'interactive' }
        ],
        objectives: ['Define BATNA', 'Research effectively', 'Set clear objectives']
      },
      {
        id: 'ns-3', title: 'Communication in Negotiation', titleMm: 'ညှိနှိုင်းမှုတွင်ဆက်သွယ်မှု', duration: 25, points: 18,
        description: 'Communicate persuasively during negotiations',
        lessons: [
          { title: 'Active Listening', duration: 8, type: 'video' },
          { title: 'Asking Right Questions', duration: 7, type: 'video' },
          { title: 'Persuasion Techniques', duration: 5, type: 'reading' },
          { title: 'Communication Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Listen actively', 'Ask strategic questions', 'Persuade ethically']
      },
      {
        id: 'ns-4', title: 'Salary Negotiation', titleMm: 'လစာညှိနှိုင်းမှု', duration: 25, points: 16,
        description: 'Negotiate salary and benefits confidently',
        lessons: [
          { title: 'Salary Research Methods', duration: 8, type: 'video' },
          { title: 'Presenting Your Value', duration: 7, type: 'video' },
          { title: 'Counter-Offer Strategies', duration: 5, type: 'reading' },
          { title: 'Salary Negotiation Role-Play', duration: 5, type: 'interactive' }
        ],
        objectives: ['Research salary data', 'Present value proposition', 'Handle counter-offers']
      },
      {
        id: 'ns-5', title: 'Business Negotiations', titleMm: 'စီးပွားရေးညှိနှိုင်းမှု', duration: 25, points: 16,
        description: 'Handle business deals and partnerships',
        lessons: [
          { title: 'Contract Negotiations', duration: 8, type: 'video' },
          { title: 'Vendor Negotiations', duration: 7, type: 'video' },
          { title: 'Partnership Deals', duration: 5, type: 'reading' },
          { title: 'Business Scenario', duration: 5, type: 'interactive' }
        ],
        objectives: ['Negotiate contracts', 'Handle vendor talks', 'Form partnerships']
      },
      {
        id: 'ns-6', title: 'Handling Difficult Situations', titleMm: 'ခက်ခဲသောအခြေအနေများကိုကိုင်တွယ်ခြင်း', duration: 20, points: 14,
        description: 'Navigate challenging negotiation scenarios',
        lessons: [
          { title: 'Dealing with Hardball Tactics', duration: 7, type: 'video' },
          { title: 'Breaking Deadlocks', duration: 6, type: 'video' },
          { title: 'When to Walk Away', duration: 4, type: 'reading' },
          { title: 'Difficult Scenario Practice', duration: 3, type: 'interactive' }
        ],
        objectives: ['Counter hardball tactics', 'Break deadlocks', 'Know when to exit']
      },
      {
        id: 'ns-7', title: 'Cultural Considerations', titleMm: 'ယဉ်ကျေးမှုဆိုင်ရာထည့်သွင်းစဉ်းစားမှု', duration: 20, points: 14,
        description: 'Negotiate across cultures effectively',
        lessons: [
          { title: 'Negotiation in Myanmar Context', duration: 7, type: 'video' },
          { title: 'International Negotiations', duration: 6, type: 'video' },
          { title: 'Building Relationships', duration: 4, type: 'reading' },
          { title: 'Cross-Cultural Exercise', duration: 3, type: 'interactive' }
        ],
        objectives: ['Understand Myanmar context', 'Navigate international deals', 'Build relationships']
      },
      {
        id: 'ns-8', title: 'Negotiation Mastery', titleMm: 'ညှိနှိုင်းမှုကျွမ်းကျင်မှု', duration: 25, points: 18,
        description: 'Final negotiation simulation',
        lessons: [
          { title: 'Full Negotiation Simulation', duration: 12, type: 'interactive' },
          { title: 'Feedback and Analysis', duration: 8, type: 'video' },
          { title: 'Personal Development Plan', duration: 5, type: 'interactive' }
        ],
        objectives: ['Complete simulation', 'Receive feedback', 'Create improvement plan']
      }
    ]
  },
  {
    id: 'stress-management',
    title: 'Stress Management & Resilience',
    titleMm: 'စိတ်ဖိစီးမှုစီမံခန့်ခွဲမှုနှင့်ခံနိုင်ရည်',
    description: 'Build resilience and manage stress effectively',
    icon: Shield,
    color: 'from-teal-600 to-cyan-600',
    difficulty: 'Beginner Friendly',
    category: 'Wellness',
    totalHours: 2.0,
    totalModules: 8,
    totalPoints: 110,
    recommendedForZodiac: ['cancer', 'virgo', 'scorpio', 'capricorn', 'pisces'],
    modules: [
      {
        id: 'sm-1', title: 'Understanding Stress', titleMm: 'စိတ်ဖိစီးမှုကိုနားလည်ခြင်း', duration: 20, points: 14,
        description: 'Recognize stress and its effects',
        lessons: [
          { title: 'What is Stress?', duration: 7, type: 'video' },
          { title: 'Stress Response System', duration: 5, type: 'video' },
          { title: 'Good vs Bad Stress', duration: 5, type: 'reading' },
          { title: 'Stress Assessment', duration: 3, type: 'quiz' }
        ],
        objectives: ['Define stress', 'Understand stress response', 'Distinguish stress types']
      },
      {
        id: 'sm-2', title: 'Identifying Your Stressors', titleMm: 'သင့်စိတ်ဖိစီးမှုများကိုဖော်ထုတ်ခြင်း', duration: 20, points: 14,
        description: 'Know what triggers your stress',
        lessons: [
          { title: 'Common Workplace Stressors', duration: 7, type: 'video' },
          { title: 'Personal Stress Triggers', duration: 6, type: 'video' },
          { title: 'Stress Diary', duration: 4, type: 'reading' },
          { title: 'Create Your Stress Map', duration: 3, type: 'interactive' }
        ],
        objectives: ['Identify workplace stress', 'Know personal triggers', 'Track stress patterns']
      },
      {
        id: 'sm-3', title: 'Quick Stress Relief', titleMm: 'မြန်ဆန်သောစိတ်ဖိစီးမှုသက်သာရေး', duration: 20, points: 14,
        description: 'Immediate techniques for stress relief',
        lessons: [
          { title: 'Breathing Techniques', duration: 7, type: 'video' },
          { title: 'Progressive Muscle Relaxation', duration: 6, type: 'video' },
          { title: 'Quick Grounding', duration: 4, type: 'reading' },
          { title: 'Practice Session', duration: 3, type: 'interactive' }
        ],
        objectives: ['Use breathing techniques', 'Practice relaxation', 'Apply grounding methods']
      },
      {
        id: 'sm-4', title: 'Building Resilience', titleMm: 'ခံနိုင်ရည်တည်ဆောက်မှု', duration: 25, points: 16,
        description: 'Develop resilience for long-term wellbeing',
        lessons: [
          { title: 'What is Resilience?', duration: 8, type: 'video' },
          { title: 'Resilience Factors', duration: 7, type: 'video' },
          { title: 'Building Mental Toughness', duration: 5, type: 'reading' },
          { title: 'Resilience Assessment', duration: 5, type: 'quiz' }
        ],
        objectives: ['Define resilience', 'Know resilience factors', 'Build mental toughness']
      },
      {
        id: 'sm-5', title: 'Work-Life Boundaries', titleMm: 'အလုပ်-ဘဝနယ်နိမိတ်များ', duration: 20, points: 14,
        description: 'Set healthy boundaries',
        lessons: [
          { title: 'Setting Boundaries', duration: 7, type: 'video' },
          { title: 'Saying No Effectively', duration: 6, type: 'video' },
          { title: 'Digital Detox', duration: 4, type: 'reading' },
          { title: 'Boundary Setting Exercise', duration: 3, type: 'interactive' }
        ],
        objectives: ['Set clear boundaries', 'Say no confidently', 'Practice digital wellness']
      },
      {
        id: 'sm-6', title: 'Mindfulness Basics', titleMm: 'ဇာနိသတိအခြေခံ', duration: 20, points: 14,
        description: 'Introduction to mindfulness practice',
        lessons: [
          { title: 'What is Mindfulness?', duration: 7, type: 'video' },
          { title: 'Simple Meditation', duration: 6, type: 'video' },
          { title: 'Daily Mindfulness', duration: 4, type: 'reading' },
          { title: 'Guided Practice', duration: 3, type: 'interactive' }
        ],
        objectives: ['Understand mindfulness', 'Practice meditation', 'Apply daily mindfulness']
      },
      {
        id: 'sm-7', title: 'Support Systems', titleMm: 'ပံ့ပိုးမှုစနစ်များ', duration: 15, points: 12,
        description: 'Build and use support networks',
        lessons: [
          { title: 'Building Support Networks', duration: 5, type: 'video' },
          { title: 'Seeking Help', duration: 4, type: 'video' },
          { title: 'Professional Resources', duration: 3, type: 'reading' },
          { title: 'Support Map', duration: 3, type: 'interactive' }
        ],
        objectives: ['Build support network', 'Know when to seek help', 'Find resources']
      },
      {
        id: 'sm-8', title: 'Your Stress Management Plan', titleMm: 'သင့်စိတ်ဖိစီးမှုစီမံခန့်ခွဲမှုအစီအစဉ်', duration: 20, points: 12,
        description: 'Create your personal stress management plan',
        lessons: [
          { title: 'Plan Overview', duration: 5, type: 'reading' },
          { title: 'Personal Stress Plan', duration: 10, type: 'interactive' },
          { title: 'Commitment Statement', duration: 5, type: 'interactive' }
        ],
        objectives: ['Review techniques', 'Create personal plan', 'Commit to practice']
      }
    ]
  },
  {
    id: 'assertiveness-training',
    title: 'Assertiveness & Confidence',
    titleMm: 'တက်ကြွမှုနှင့်ခံ့ကျည်းမှု',
    description: 'Speak up confidently and assert your needs',
    icon: Zap,
    color: 'from-orange-600 to-red-600',
    difficulty: 'Beginner Friendly',
    category: 'Personal Development',
    totalHours: 2.0,
    totalModules: 8,
    totalPoints: 110,
    recommendedForZodiac: ['cancer', 'pisces', 'libra', 'taurus', 'virgo'],
    modules: [
      {
        id: 'as-1', title: 'Understanding Assertiveness', titleMm: 'တက်ကြွမှုကိုနားလည်ခြင်း', duration: 20, points: 14,
        description: 'Learn what assertiveness really means',
        lessons: [
          { title: 'Assertiveness vs Aggressiveness', duration: 7, type: 'video' },
          { title: 'Passive-Aggressive Spectrum', duration: 6, type: 'video' },
          { title: 'Benefits of Being Assertive', duration: 4, type: 'reading' },
          { title: 'Self-Assessment', duration: 3, type: 'quiz' }
        ],
        objectives: ['Define assertiveness', 'Distinguish communication styles', 'Understand benefits']
      },
      {
        id: 'as-2', title: 'Overcoming People-Pleasing', titleMm: 'လူများအားပေးခြင်းကိုကျော်လွန်ခြင်း', duration: 20, points: 14,
        description: 'Stop the cycle of people-pleasing',
        lessons: [
          { title: 'Why We People-Please', duration: 7, type: 'video' },
          { title: 'Costs of People-Pleasing', duration: 6, type: 'video' },
          { title: 'Breaking the Pattern', duration: 4, type: 'reading' },
          { title: 'People-Pleasing Quiz', duration: 3, type: 'quiz' }
        ],
        objectives: ['Understand people-pleasing', 'Recognize costs', 'Break patterns']
      },
      {
        id: 'as-3', title: 'Assertive Communication', titleMm: 'တက်ကြွသောဆက်သွယ်မှု', duration: 25, points: 16,
        description: 'Communicate assertively',
        lessons: [
          { title: '"I" Statements', duration: 8, type: 'video' },
          { title: 'Fogging Technique', duration: 7, type: 'video' },
          { title: 'Broken Record Method', duration: 5, type: 'reading' },
          { title: 'Communication Practice', duration: 5, type: 'interactive' }
        ],
        objectives: ['Use "I" statements', 'Apply fogging', 'Use broken record']
      },
      {
        id: 'as-4', title: 'Saying No with Confidence', titleMm: 'ခံ့ကျည်းစွာမဟုတ်ပါဟုပြောခြင်း', duration: 20, points: 14,
        description: 'Say no without guilt',
        lessons: [
          { title: 'The Art of Saying No', duration: 7, type: 'video' },
          { title: 'No Without Excuses', duration: 6, type: 'video' },
          { title: 'Handling Pushback', duration: 4, type: 'reading' },
          { title: 'No Practice Scenarios', duration: 3, type: 'interactive' }
        ],
        objectives: ['Say no gracefully', 'Avoid over-explaining', 'Handle reactions']
      },
      {
        id: 'as-5', title: 'Setting Boundaries', titleMm: 'နယ်နိမိတ်သတ်မှတ်ခြင်း', duration: 20, points: 14,
        description: 'Set and maintain healthy boundaries',
        lessons: [
          { title: 'Types of Boundaries', duration: 7, type: 'video' },
          { title: 'Communicating Boundaries', duration: 6, type: 'video' },
          { title: 'Enforcing Boundaries', duration: 4, type: 'reading' },
          { title: 'Boundary Script Writing', duration: 3, type: 'interactive' }
        ],
        objectives: ['Know boundary types', 'Communicate clearly', 'Enforce effectively']
      },
      {
        id: 'as-6', title: 'Handling Criticism', titleMm: 'ဝေဖန်ချက်များကိုကိုင်တွယ်ခြင်း', duration: 20, points: 14,
        description: 'Deal with criticism assertively',
        lessons: [
          { title: 'Constructive vs Destructive', duration: 7, type: 'video' },
          { title: 'Responding to Criticism', duration: 6, type: 'video' },
          { title: 'Not Taking It Personally', duration: 4, type: 'reading' },
          { title: 'Criticism Response Practice', duration: 3, type: 'interactive' }
        ],
        objectives: ['Distinguish criticism types', 'Respond professionally', 'Stay emotionally detached']
      },
      {
        id: 'as-7', title: 'Asking for What You Want', titleMm: 'သင်လိုချင်သည်များကိုတောင်းဆိုခြင်း', duration: 20, points: 12,
        description: 'Make requests confidently',
        lessons: [
          { title: 'Making Clear Requests', duration: 7, type: 'video' },
          { title: 'Asking for Raises', duration: 6, type: 'video' },
          { title: 'Requesting Support', duration: 4, type: 'reading' },
          { title: 'Request Role-Play', duration: 3, type: 'interactive' }
        ],
        objectives: ['Make clear requests', 'Ask for what you deserve', 'Seek support']
      },
      {
        id: 'as-8', title: 'Assertiveness in Action', titleMm: 'လက်တွေ့တက်ကြွမှု', duration: 15, points: 12,
        description: 'Apply assertiveness in real situations',
        lessons: [
          { title: 'Review & Practice', duration: 5, type: 'reading' },
          { title: 'Real Scenario Planning', duration: 5, type: 'interactive' },
          { title: 'Confidence Commitment', duration: 5, type: 'interactive' }
        ],
        objectives: ['Review all skills', 'Plan real applications', 'Commit to growth']
      }
    ]
  },
];

// Combine with existing courses
export const allCourses: LearningTrack[] = additionalCourses;
