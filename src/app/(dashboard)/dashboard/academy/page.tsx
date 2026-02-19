'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Play, Clock, Award, Check, Lock, Star, ChevronRight,
  GraduationCap, FileText, Download, ArrowLeft, TrendingUp,
  Target, Trophy, Brain, Globe, Megaphone, Briefcase, Target as TargetIcon,
  DollarSign, BarChart3, Rocket, Users, FileEdit, Cpu, Languages,
  Presentation, LineChart, Shield, MessageSquare, Video, Sparkles,
  Lightbulb, Heart, Zap, Clock3, Award as AwardIcon, Calendar,
  ChevronDown, ChevronUp, CheckCircle2, Circle, BookMarked, PenTool,
  Building2, PieChart, Wrench, PenTool as PenToolIcon, Headphones,
  FileSpreadsheet, Presentation as PresentationIcon, BadgeCheck,
  University, Globe2, Users2, Building, Briefcase as BriefcaseIcon,
  Settings, Sliders, Scale, Gavel, HeartHandshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

// Course Level Types - Professional Style
const COURSE_LEVELS = {
  beginner: { name: 'Beginner', nameMm: 'စတင်သူ', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
  elementary: { name: 'Elementary', nameMm: 'အခြေခံ', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
  intermediate: { name: 'Intermediate', nameMm: 'အလယ်အလတ်', color: 'text-amber-400', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30' },
  advanced: { name: 'Advanced', nameMm: 'အဆင့်မြင့်', color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30' },
};

// Get module level based on position
const getModuleLevel = (index: number) => {
  if (index < 2) return 'beginner';
  if (index < 4) return 'elementary';
  if (index < 6) return 'intermediate';
  return 'advanced';
};

// Professional Learning Tracks with Detailed Modules
// Designed for Myanmar's Future Leaders - Professional, Trustworthy, Life-Changing

const learningTracks = [
  {
    id: 'ai-technology',
    title: 'AI & Technology',
    titleMm: 'AI နှင့် နည်းပညာ',
    description: 'Master AI tools, ChatGPT, and modern technology for career advancement',
    icon: Cpu,
    color: 'from-violet-600 to-indigo-600',
    difficulty: 'Beginner Friendly',
    category: 'Technology',
    totalHours: 3.5,
    totalModules: 8,
    totalPoints: 150,
    featured: true,
    modules: [
      {
        id: 'ai-1',
        title: 'Understanding Artificial Intelligence',
        titleMm: 'အဆင့်မြင့်ဉာဏ်ရည်ကို နားလည်ခြင်း',
        duration: 25,
        points: 20,
        description: 'Learn what AI is, how it works, and its real-world applications in Myanmar and globally',
        lessons: [
          { title: 'What is Artificial Intelligence?', duration: 8, type: 'video' },
          { title: 'History of AI Development', duration: 5, type: 'reading' },
          { title: 'AI Applications in Daily Life', duration: 7, type: 'video' },
          { title: 'Quiz: AI Basics', duration: 5, type: 'quiz' },
        ],
        objectives: ['Define AI and its types', 'Understand AI applications', 'Identify AI in daily life'],
      },
      {
        id: 'ai-2',
        title: 'Getting Started with ChatGPT',
        titleMm: 'ChatGPT စတင်အသုံးပြုခြင်း',
        duration: 30,
        points: 20,
        description: 'Learn to use ChatGPT effectively for work, study, and personal productivity',
        lessons: [
          { title: 'Creating Your ChatGPT Account', duration: 5, type: 'video' },
          { title: 'ChatGPT Interface Overview', duration: 8, type: 'video' },
          { title: 'Writing Your First Prompts', duration: 10, type: 'interactive' },
          { title: 'Best Practices for Beginners', duration: 7, type: 'reading' },
        ],
        objectives: ['Create and navigate ChatGPT', 'Write effective prompts', 'Apply best practices'],
      },
      {
        id: 'ai-3',
        title: 'Prompt Engineering Essentials',
        titleMm: 'Prompt Engineering အခြေခံများ',
        duration: 35,
        points: 20,
        description: 'Master the art of writing prompts to get the best results from AI tools',
        lessons: [
          { title: 'Anatomy of a Good Prompt', duration: 10, type: 'video' },
          { title: 'Context and Role Playing', duration: 8, type: 'video' },
          { title: 'Practical Prompt Templates', duration: 12, type: 'interactive' },
          { title: 'Common Mistakes to Avoid', duration: 5, type: 'reading' },
        ],
        objectives: ['Structure effective prompts', 'Use role-based prompting', 'Avoid common errors'],
      },
      {
        id: 'ai-4',
        title: 'AI for Workplace Productivity',
        titleMm: 'အလုပ်နေရာထိရောက်မှုအတွက် AI',
        duration: 30,
        points: 20,
        description: 'Use AI tools to boost your productivity at work - emails, reports, presentations',
        lessons: [
          { title: 'AI for Email Writing', duration: 8, type: 'video' },
          { title: 'Creating Reports with AI', duration: 10, type: 'video' },
          { title: 'Presentation Content Generation', duration: 7, type: 'interactive' },
          { title: 'Case Study: Myanmar Office Scenario', duration: 5, type: 'reading' },
        ],
        objectives: ['Write emails faster with AI', 'Generate report content', 'Create presentations efficiently'],
      },
      {
        id: 'ai-5',
        title: 'AI Tools for Myanmar Professionals',
        titleMm: 'မြန်မာပရော်ဖက်ရှင်နယ်များအတွက် AI ကိရိယာများ',
        duration: 25,
        points: 20,
        description: 'Explore AI tools relevant to Myanmar workplace context',
        lessons: [
          { title: 'Translation Tools (Myanmar-English)', duration: 8, type: 'video' },
          { title: 'AI for Myanmar Language Content', duration: 7, type: 'video' },
          { title: 'Free vs Paid AI Tools', duration: 5, type: 'reading' },
          { title: 'Practice Session', duration: 5, type: 'interactive' },
        ],
        objectives: ['Use translation AI tools', 'Create Myanmar content', 'Choose appropriate tools'],
      },
      {
        id: 'ai-6',
        title: 'AI Ethics and Responsible Use',
        titleMm: 'AI ကျင့်ဝတ်နှင့် တာဝန်ယူအသုံးပြုမှု',
        duration: 20,
        points: 20,
        description: 'Understand ethical considerations when using AI in professional settings',
        lessons: [
          { title: 'AI Bias and Fairness', duration: 7, type: 'video' },
          { title: 'Privacy Considerations', duration: 5, type: 'reading' },
          { title: 'Plagiarism and Attribution', duration: 5, type: 'video' },
          { title: 'Quiz: AI Ethics', duration: 3, type: 'quiz' },
        ],
        objectives: ['Understand AI bias', 'Protect privacy', 'Use AI ethically'],
      },
      {
        id: 'ai-7',
        title: 'AI Career Opportunities in Myanmar',
        titleMm: 'မြန်မာပြည်တွင် AI အလုပ်အကိုင်အခွင့်အလမ်းများ',
        duration: 25,
        points: 15,
        description: 'Explore career paths and opportunities in AI and technology sector in Myanmar',
        lessons: [
          { title: 'Growing AI Job Market', duration: 8, type: 'video' },
          { title: 'Skills Needed for AI Jobs', duration: 7, type: 'reading' },
          { title: 'Interview with Myanmar Tech Professionals', duration: 7, type: 'video' },
          { title: 'Action Plan for Career Growth', duration: 3, type: 'interactive' },
        ],
        objectives: ['Identify AI career paths', 'Plan skill development', 'Create career roadmap'],
      },
      {
        id: 'ai-8',
        title: 'Final Assessment: AI Proficiency',
        titleMm: 'နောက်ဆုံးတိုင်းတာမှု: AI ကျွမ်းကျင်မှု',
        duration: 20,
        points: 15,
        description: 'Complete the final assessment to earn your certificate',
        lessons: [
          { title: 'Course Review', duration: 5, type: 'reading' },
          { title: 'Practical Project', duration: 10, type: 'interactive' },
          { title: 'Final Exam', duration: 5, type: 'quiz' },
        ],
        objectives: ['Demonstrate AI knowledge', 'Complete practical task', 'Pass final assessment'],
      },
    ],
  },
  {
    id: 'english-language',
    title: 'Professional English Skills',
    titleMm: 'ပရော်ဖက်ရှင်နယ်အင်္ဂလိပ်စကား',
    description: 'Develop English skills for workplace success and career advancement',
    icon: Languages,
    color: 'from-blue-600 to-cyan-600',
    difficulty: 'All Levels',
    category: 'Language',
    totalHours: 4.0,
    totalModules: 8,
    totalPoints: 160,
    modules: [
      {
        id: 'eng-1',
        title: 'Essential Grammar for Work',
        titleMm: 'အလုပ်အတွက် မရှိမဖြစ်သဒ္ဒါ',
        duration: 30,
        points: 20,
        description: 'Master grammar structures commonly used in professional settings',
        lessons: [
          { title: 'Tenses for Business', duration: 10, type: 'video' },
          { title: 'Subject-Verb Agreement', duration: 8, type: 'video' },
          { title: 'Articles and Prepositions', duration: 7, type: 'interactive' },
          { title: 'Grammar Practice Quiz', duration: 5, type: 'quiz' },
        ],
        objectives: ['Use correct tenses', 'Apply grammar rules', 'Write error-free sentences'],
      },
      {
        id: 'eng-2',
        title: 'Business Vocabulary Building',
        titleMm: 'စီးပွားရေးဝေါဟာရ တိုးချဲ့ခြင်း',
        duration: 25,
        points: 20,
        description: 'Expand your professional vocabulary for workplace communication',
        lessons: [
          { title: 'Common Business Terms', duration: 8, type: 'video' },
          { title: 'Industry-Specific Vocabulary', duration: 7, type: 'reading' },
          { title: 'Idioms and Phrases', duration: 5, type: 'video' },
          { title: 'Vocabulary Flashcards', duration: 5, type: 'interactive' },
        ],
        objectives: ['Learn business terms', 'Use industry vocabulary', 'Understand idioms'],
      },
      {
        id: 'eng-3',
        title: 'Professional Email Writing',
        titleMm: 'ပရော်ဖက်ရှင်နယ်အီးမေးလ်ရေးသားခြင်း',
        duration: 35,
        points: 20,
        description: 'Write clear, professional emails that get results',
        lessons: [
          { title: 'Email Structure and Format', duration: 10, type: 'video' },
          { title: 'Subject Lines That Work', duration: 5, type: 'reading' },
          { title: 'Tone and Formality', duration: 8, type: 'video' },
          { title: 'Write Your Own Email', duration: 12, type: 'interactive' },
        ],
        objectives: ['Structure professional emails', 'Write effective subject lines', 'Match tone to context'],
      },
      {
        id: 'eng-4',
        title: 'Meeting English',
        titleMm: 'အစည်းအဝေးအင်္ဂလိပ်',
        duration: 30,
        points: 20,
        description: 'Participate confidently in English meetings',
        lessons: [
          { title: 'Starting and Ending Meetings', duration: 8, type: 'video' },
          { title: 'Expressing Opinions', duration: 7, type: 'video' },
          { title: 'Asking Questions Professionally', duration: 5, type: 'interactive' },
          { title: 'Role Play: Meeting Scenario', duration: 10, type: 'interactive' },
        ],
        objectives: ['Lead meeting discussions', 'Express opinions clearly', 'Ask professional questions'],
      },
      {
        id: 'eng-5',
        title: 'Interview English Mastery',
        titleMm: 'အင်တာဗျူးအင်္ဂလိပ် ကျွမ်းကျင်မှု',
        duration: 35,
        points: 20,
        description: 'Ace your job interviews with confident English responses',
        lessons: [
          { title: 'Common Interview Questions', duration: 10, type: 'video' },
          { title: 'The STAR Method', duration: 8, type: 'video' },
          { title: 'Answering Difficult Questions', duration: 7, type: 'reading' },
          { title: 'Mock Interview Practice', duration: 10, type: 'interactive' },
        ],
        objectives: ['Answer interview questions', 'Use STAR method', 'Handle difficult questions'],
      },
      {
        id: 'eng-6',
        title: 'Presentation Skills in English',
        titleMm: 'အင်္ဂလိပ်ဖြင့် တင်ပြနည်းများ',
        duration: 30,
        points: 20,
        description: 'Deliver effective presentations in English',
        lessons: [
          { title: 'Structuring Your Presentation', duration: 8, type: 'video' },
          { title: 'Useful Phrases for Presenting', duration: 7, type: 'reading' },
          { title: 'Handling Q&A Sessions', duration: 5, type: 'video' },
          { title: 'Practice Presentation', duration: 10, type: 'interactive' },
        ],
        objectives: ['Structure presentations', 'Use presentation phrases', 'Handle audience questions'],
      },
      {
        id: 'eng-7',
        title: 'Myanmar-English Translation Basics',
        titleMm: 'မြန်မာ-အင်္ဂလိပ် ဘာသာပြန်အခြေခံ',
        duration: 25,
        points: 20,
        description: 'Translate effectively between Myanmar and English',
        lessons: [
          { title: 'Translation Principles', duration: 8, type: 'video' },
          { title: 'Common Translation Mistakes', duration: 7, type: 'reading' },
          { title: 'Business Document Translation', duration: 5, type: 'video' },
          { title: 'Translation Practice', duration: 5, type: 'interactive' },
        ],
        objectives: ['Apply translation principles', 'Avoid common mistakes', 'Translate business documents'],
      },
      {
        id: 'eng-8',
        title: 'Final Assessment: English Proficiency',
        titleMm: 'နောက်ဆုံးတိုင်းတာမှု: အင်္ဂလိပ်ကျွမ်းကျင်မှု',
        duration: 25,
        points: 20,
        description: 'Complete comprehensive assessment for your certificate',
        lessons: [
          { title: 'Grammar Test', duration: 8, type: 'quiz' },
          { title: 'Writing Task', duration: 10, type: 'interactive' },
          { title: 'Speaking Assessment', duration: 7, type: 'interactive' },
        ],
        objectives: ['Demonstrate English skills', 'Complete writing task', 'Show speaking ability'],
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Essentials',
    titleMm: 'ဒစ်ဂျစ်တယ်မာကeting်ကင်းအခြေခံ',
    description: 'Master digital marketing strategies for Myanmar market',
    icon: Megaphone,
    color: 'from-pink-600 to-rose-600',
    difficulty: 'Beginner Friendly',
    category: 'Marketing',
    totalHours: 3.5,
    totalModules: 8,
    totalPoints: 150,
    modules: [
      { id: 'dm-1', title: 'Digital Marketing Fundamentals', titleMm: 'ဒစ်ဂျစ်တယ်မာကeting်ကင်းအခြေခံ', duration: 30, points: 20, description: 'Understand digital marketing concepts and strategy', lessons: [{ title: 'What is Digital Marketing?', duration: 10, type: 'video' }, { title: 'Digital vs Traditional Marketing', duration: 8, type: 'video' }, { title: 'The Customer Journey', duration: 7, type: 'reading' }, { title: 'Quiz', duration: 5, type: 'quiz' }], objectives: ['Understand digital marketing', 'Compare marketing types', 'Map customer journey'] },
      { id: 'dm-2', title: 'Social Media Marketing', titleMm: 'ဆိုရှယ်မီဒီယာမာကeting်ကင်း', duration: 35, points: 20, description: 'Build effective social media presence', lessons: [{ title: 'Platform Overview', duration: 10, type: 'video' }, { title: 'Facebook Marketing', duration: 10, type: 'video' }, { title: 'TikTok for Business', duration: 8, type: 'video' }, { title: 'Content Calendar Creation', duration: 7, type: 'interactive' }], objectives: ['Choose right platforms', 'Create content strategy', 'Build engagement'] },
      { id: 'dm-3', title: 'Content Marketing Strategy', titleMm: 'အကြောင်းအရာမာကeting်ကင်းမဟာဗျူဟာ', duration: 30, points: 20, description: 'Create engaging content that converts', lessons: [{ title: 'Content Types and Formats', duration: 10, type: 'video' }, { title: 'Storytelling for Brands', duration: 8, type: 'video' }, { title: 'Content Planning', duration: 7, type: 'reading' }, { title: 'Create Sample Content', duration: 5, type: 'interactive' }], objectives: ['Create various content types', 'Tell brand stories', 'Plan content calendar'] },
      { id: 'dm-4', title: 'Facebook Ads Mastery', titleMm: 'Facebook ကြော်ငြာကျွမ်းကျင်မှု', duration: 35, points: 20, description: 'Run successful Facebook advertising campaigns', lessons: [{ title: 'Ads Manager Overview', duration: 10, type: 'video' }, { title: 'Targeting Options', duration: 8, type: 'video' }, { title: 'Budget and Bidding', duration: 7, type: 'reading' }, { title: 'Create Your First Ad', duration: 10, type: 'interactive' }], objectives: ['Navigate Ads Manager', 'Target effectively', 'Manage budgets'] },
      { id: 'dm-5', title: 'SEO Fundamentals', titleMm: 'SEO အခြေခံများ', duration: 30, points: 20, description: 'Optimize your website for search engines', lessons: [{ title: 'How Search Engines Work', duration: 10, type: 'video' }, { title: 'Keyword Research', duration: 8, type: 'video' }, { title: 'On-Page SEO', duration: 7, type: 'reading' }, { title: 'SEO Audit Practice', duration: 5, type: 'interactive' }], objectives: ['Understand SEO basics', 'Research keywords', 'Optimize pages'] },
      { id: 'dm-6', title: 'Email Marketing', titleMm: 'အီးမေးလ်မာကeting်ကင်း', duration: 25, points: 20, description: 'Build email campaigns that convert', lessons: [{ title: 'Building Email Lists', duration: 8, type: 'video' }, { title: 'Email Design Best Practices', duration: 7, type: 'video' }, { title: 'Automation Basics', duration: 5, type: 'reading' }, { title: 'Draft Email Campaign', duration: 5, type: 'interactive' }], objectives: ['Build email lists', 'Design emails', 'Set up automation'] },
      { id: 'dm-7', title: 'Analytics and Measurement', titleMm: 'ခွဲခြမ်းစိတ်ဖြာမှုနှင့်တိုင်းတာမှု', duration: 30, points: 15, description: 'Measure and improve your marketing performance', lessons: [{ title: 'Key Metrics to Track', duration: 10, type: 'video' }, { title: 'Google Analytics Basics', duration: 8, type: 'video' }, { title: 'Facebook Insights', duration: 7, type: 'reading' }, { title: 'Create Performance Report', duration: 5, type: 'interactive' }], objectives: ['Track key metrics', 'Use analytics tools', 'Report performance'] },
      { id: 'dm-8', title: 'Marketing Strategy Capstone', titleMm: 'မာကeting်ကင်းမဟာဗျူဟာနိဂုံး', duration: 25, points: 15, description: 'Create a complete digital marketing plan', lessons: [{ title: 'Strategy Framework', duration: 5, type: 'reading' }, { title: 'Case Study: Myanmar Brand', duration: 10, type: 'video' }, { title: 'Final Project', duration: 10, type: 'interactive' }], objectives: ['Create marketing plan', 'Apply all concepts', 'Present strategy'] },
    ],
  },
  {
    id: 'job-interview',
    title: 'Job Interview Success',
    titleMm: 'အလုပ်အင်တာဗျူးအောင်မြင်ရေး',
    description: 'Master interview skills to land your dream job',
    icon: Target,
    color: 'from-emerald-600 to-green-600',
    difficulty: 'All Levels',
    category: 'Career',
    totalHours: 3.0,
    totalModules: 8,
    totalPoints: 140,
    modules: [
      { id: 'ji-1', title: 'Interview Preparation Blueprint', titleMm: 'အင်တာဗျူးပြင်ဆင်မှုအစီအစဉ်', duration: 25, points: 18, description: 'Prepare thoroughly for any interview', lessons: [{ title: 'Research the Company', duration: 8, type: 'video' }, { title: 'Know Your Resume', duration: 5, type: 'reading' }, { title: 'Prepare Your Stories', duration: 7, type: 'video' }, { title: 'Preparation Checklist', duration: 5, type: 'interactive' }], objectives: ['Research effectively', 'Know your resume', 'Prepare stories'] },
      { id: 'ji-2', title: 'Answering Common Questions', titleMm: 'မေးလေ့ရှိသောမေးခွန်းများဖြေဆိုခြင်း', duration: 35, points: 20, description: 'Master responses to frequently asked questions', lessons: [{ title: 'Tell Me About Yourself', duration: 8, type: 'video' }, { title: 'Strengths and Weaknesses', duration: 10, type: 'video' }, { title: 'Why Do You Want This Job?', duration: 7, type: 'video' }, { title: 'Practice Answers', duration: 10, type: 'interactive' }], objectives: ['Introduce yourself', 'Discuss strengths', 'Express motivation'] },
      { id: 'ji-3', title: 'The STAR Method', titleMm: 'STAR နည်းလမ်း', duration: 30, points: 20, description: 'Structure behavioral interview answers effectively', lessons: [{ title: 'Understanding STAR', duration: 8, type: 'video' }, { title: 'Situation and Task', duration: 7, type: 'video' }, { title: 'Action and Result', duration: 7, type: 'video' }, { title: 'STAR Practice Scenarios', duration: 8, type: 'interactive' }], objectives: ['Apply STAR method', 'Structure answers', 'Provide examples'] },
      { id: 'ji-4', title: 'Salary Negotiation Tactics', titleMm: 'လစာညှိနှိုင်းမှုနည်းဗျူဟာ', duration: 25, points: 18, description: 'Negotiate salary with confidence', lessons: [{ title: 'Know Your Worth', duration: 8, type: 'video' }, { title: 'Salary Research Methods', duration: 5, type: 'reading' }, { title: 'Negotiation Scripts', duration: 7, type: 'video' }, { title: 'Role Play Negotiation', duration: 5, type: 'interactive' }], objectives: ['Research salary ranges', 'Use negotiation scripts', 'Confidently negotiate'] },
      { id: 'ji-5', title: 'Body Language Mastery', titleMm: 'ခန္ဓာကိုယ်ဘာသာစကားကျွမ်းကျင်မှု', duration: 20, points: 16, description: 'Use body language to make great impressions', lessons: [{ title: 'First Impressions', duration: 6, type: 'video' }, { title: 'Posture and Gestures', duration: 6, type: 'video' }, { title: 'Eye Contact Tips', duration: 4, type: 'reading' }, { title: 'Body Language Practice', duration: 4, type: 'interactive' }], objectives: ['Create first impressions', 'Use proper posture', 'Maintain eye contact'] },
      { id: 'ji-6', title: 'Virtual Interview Excellence', titleMm: 'အွန်လိုင်းအင်တာဗျူးထူးခြားမှု', duration: 25, points: 16, description: 'Excel in video and phone interviews', lessons: [{ title: 'Technical Setup', duration: 7, type: 'video' }, { title: 'Virtual Background Tips', duration: 5, type: 'reading' }, { title: 'Camera Presence', duration: 8, type: 'video' }, { title: 'Mock Video Interview', duration: 5, type: 'interactive' }], objectives: ['Set up technology', 'Create good background', 'Present on camera'] },
      { id: 'ji-7', title: 'Questions to Ask Employers', titleMm: 'အလုပ်ရှင်များမေးသင့်သောမေးခွန်းများ', duration: 20, points: 16, description: 'Ask insightful questions that impress employers', lessons: [{ title: 'Questions About Role', duration: 6, type: 'video' }, { title: 'Questions About Culture', duration: 5, type: 'video' }, { title: 'Questions to Avoid', duration: 4, type: 'reading' }, { title: 'Prepare Your Questions', duration: 5, type: 'interactive' }], objectives: ['Ask about role', 'Ask about culture', 'Avoid wrong questions'] },
      { id: 'ji-8', title: 'Final Interview Simulation', titleMm: 'နောက်ဆုံးအင်တာဗျူးစမတ်ရှင်', duration: 30, points: 16, description: 'Complete mock interview for your certificate', lessons: [{ title: 'Full Interview Simulation', duration: 15, type: 'interactive' }, { title: 'Feedback Review', duration: 10, type: 'video' }, { title: 'Final Assessment', duration: 5, type: 'quiz' }], objectives: ['Complete mock interview', 'Receive feedback', 'Demonstrate skills'] },
    ],
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy',
    titleMm: 'ဘဏ္ဍာရေးဗဟုသုတ',
    description: 'Build financial knowledge for personal and professional success',
    icon: DollarSign,
    color: 'from-amber-600 to-yellow-600',
    difficulty: 'Beginner Friendly',
    category: 'Finance',
    totalHours: 3.0,
    totalModules: 8,
    totalPoints: 140,
    modules: [
      { id: 'fl-1', title: 'Personal Budgeting Fundamentals', titleMm: 'ပုဂ္ဂိုလ်ရေးဘတ်ဂျက်အခြေခံ', duration: 25, points: 18, description: 'Create and manage your personal budget', lessons: [{ title: 'Income and Expenses', duration: 8, type: 'video' }, { title: '50/30/20 Rule', duration: 7, type: 'video' }, { title: 'Budgeting Tools', duration: 5, type: 'reading' }, { title: 'Create Your Budget', duration: 5, type: 'interactive' }], objectives: ['Track income/expenses', 'Apply budgeting rules', 'Use budgeting tools'] },
      { id: 'fl-2', title: 'Smart Savings Strategies', titleMm: 'ဉာဏနည်းစုဆောင်းမှု', duration: 20, points: 18, description: 'Build your savings with effective strategies', lessons: [{ title: 'Emergency Fund', duration: 6, type: 'video' }, { title: 'Savings Goals', duration: 5, type: 'video' }, { title: 'Automated Savings', duration: 4, type: 'reading' }, { title: 'Savings Plan', duration: 5, type: 'interactive' }], objectives: ['Build emergency fund', 'Set savings goals', 'Automate savings'] },
      { id: 'fl-3', title: 'Banking in Myanmar', titleMm: 'မြန်မာပြည်တွင်ဘဏ်လုပ်ငန်း', duration: 25, points: 18, description: 'Navigate Myanmar banking system effectively', lessons: [{ title: 'Types of Bank Accounts', duration: 7, type: 'video' }, { title: 'Choosing the Right Bank', duration: 6, type: 'video' }, { title: 'Banking Fees and Charges', duration: 5, type: 'reading' }, { title: 'Bank Comparison', duration: 7, type: 'interactive' }], objectives: ['Understand account types', 'Choose banks wisely', 'Know banking fees'] },
      { id: 'fl-4', title: 'Mobile Banking Mastery', titleMm: 'မိုဘိုင်းဘဏ်လုပ်ငန်းကျွမ်းကျင်မှု', duration: 25, points: 18, description: 'Use mobile payment platforms confidently', lessons: [{ title: 'KBZ Pay, Wave Money, CB Pay', duration: 10, type: 'video' }, { title: 'Security Best Practices', duration: 5, type: 'reading' }, { title: 'Transaction Limits and Fees', duration: 5, type: 'reading' }, { title: 'Setup Practice', duration: 5, type: 'interactive' }], objectives: ['Use mobile wallets', 'Stay secure', 'Know transaction limits'] },
      { id: 'fl-5', title: 'Investment Fundamentals', titleMm: 'ရင်းနှီးမြှုပ်နှံမှုအခြေခံ', duration: 30, points: 18, description: 'Understand basic investment concepts', lessons: [{ title: 'Types of Investments', duration: 10, type: 'video' }, { title: 'Risk and Return', duration: 8, type: 'video' }, { title: 'Getting Started', duration: 5, type: 'reading' }, { title: 'Investment Quiz', duration: 7, type: 'quiz' }], objectives: ['Know investment types', 'Assess risk', 'Start investing'] },
      { id: 'fl-6', title: 'Debt Management', titleMm: 'ကြွေးမြီစီမံခန့်ခွဲမှု', duration: 20, points: 16, description: 'Manage and reduce debt effectively', lessons: [{ title: 'Good vs Bad Debt', duration: 6, type: 'video' }, { title: 'Debt Repayment Strategies', duration: 6, type: 'video' }, { title: 'Avoiding Debt Traps', duration: 4, type: 'reading' }, { title: 'Debt Payoff Plan', duration: 4, type: 'interactive' }], objectives: ['Distinguish debt types', 'Repay strategically', 'Avoid debt traps'] },
      { id: 'fl-7', title: 'Tax Basics for Employees', titleMm: 'ဝန်ထမ်းများအတွက်အခွန်အခြေခံ', duration: 20, points: 16, description: 'Understand income tax for employees in Myanmar', lessons: [{ title: 'Income Tax Basics', duration: 7, type: 'video' }, { title: 'Tax Deductions', duration: 5, type: 'reading' }, { title: 'Filing Requirements', duration: 4, type: 'video' }, { title: 'Tax Calculation Practice', duration: 4, type: 'interactive' }], objectives: ['Understand income tax', 'Know deductions', 'File correctly'] },
      { id: 'fl-8', title: 'Financial Goal Planning', titleMm: 'ဘဏ္ဍာရေးရည်မှန်းချက်စီမံကိန်း', duration: 25, points: 18, description: 'Set and achieve your financial goals', lessons: [{ title: 'Short vs Long-term Goals', duration: 7, type: 'video' }, { title: 'Goal Setting Framework', duration: 6, type: 'video' }, { title: 'Tracking Progress', duration: 5, type: 'reading' }, { title: 'Create Financial Plan', duration: 7, type: 'interactive' }], objectives: ['Set financial goals', 'Create action plan', 'Track progress'] },
    ],
  },
  {
    id: 'soft-skills',
    title: 'Workplace Soft Skills',
    titleMm: 'အလုပ်နေရာဆော့စကီးလ်များ',
    description: 'Develop essential skills for workplace success',
    icon: Users,
    color: 'from-teal-600 to-cyan-600',
    difficulty: 'All Levels',
    category: 'Professional Development',
    totalHours: 3.5,
    totalModules: 8,
    totalPoints: 150,
    modules: [
      { id: 'ss-1', title: 'Time Management Excellence', titleMm: 'အချိန်စီမံခန့်ခွဲမှုထူးခြားမှု', duration: 25, points: 20, description: 'Master time management for productivity', lessons: [{ title: 'Time Management Principles', duration: 8, type: 'video' }, { title: 'Priority Matrix', duration: 7, type: 'video' }, { title: 'Tools and Techniques', duration: 5, type: 'reading' }, { title: 'Create Schedule', duration: 5, type: 'interactive' }], objectives: ['Apply time principles', 'Use priority matrix', 'Use productivity tools'] },
      { id: 'ss-2', title: 'Effective Communication', titleMm: 'ထိရောက်သောဆက်သွယ်မှု', duration: 30, points: 20, description: 'Communicate clearly and professionally', lessons: [{ title: 'Verbal Communication', duration: 8, type: 'video' }, { title: 'Written Communication', duration: 7, type: 'video' }, { title: 'Active Listening', duration: 7, type: 'video' }, { title: 'Communication Practice', duration: 8, type: 'interactive' }], objectives: ['Speak clearly', 'Write professionally', 'Listen actively'] },
      { id: 'ss-3', title: 'Teamwork and Collaboration', titleMm: 'အဖွဲ့လိုက်လုပ်ဆောင်မှု', duration: 25, points: 18, description: 'Work effectively in diverse teams', lessons: [{ title: 'Team Dynamics', duration: 7, type: 'video' }, { title: 'Collaboration Tools', duration: 6, type: 'video' }, { title: 'Virtual Teamwork', duration: 5, type: 'reading' }, { title: 'Team Exercise', duration: 7, type: 'interactive' }], objectives: ['Understand team dynamics', 'Use collaboration tools', 'Work remotely'] },
      { id: 'ss-4', title: 'Problem Solving Skills', titleMm: 'ပြဿနာဖြေရှင်းမှုကျွမ်းကျင်မှု', duration: 30, points: 20, description: 'Solve problems creatively and systematically', lessons: [{ title: 'Problem Solving Framework', duration: 10, type: 'video' }, { title: 'Root Cause Analysis', duration: 7, type: 'video' }, { title: 'Decision Making', duration: 5, type: 'reading' }, { title: 'Case Study Analysis', duration: 8, type: 'interactive' }], objectives: ['Use problem framework', 'Analyze root causes', 'Make decisions'] },
      { id: 'ss-5', title: 'Leadership Foundations', titleMm: 'ခေါင်းဆောင်မှုအခြေခံ', duration: 25, points: 18, description: 'Develop leadership qualities for any role', lessons: [{ title: 'Leadership Styles', duration: 8, type: 'video' }, { title: 'Leading Without Authority', duration: 6, type: 'video' }, { title: 'Motivating Others', duration: 6, type: 'reading' }, { title: 'Leadership Scenario', duration: 5, type: 'interactive' }], objectives: ['Understand leadership styles', 'Lead informally', 'Motivate teams'] },
      { id: 'ss-6', title: 'Conflict Resolution', titleMm: 'ပဋိပက္ခဖြေရှင်းမှု', duration: 20, points: 16, description: 'Handle workplace conflicts professionally', lessons: [{ title: 'Types of Conflict', duration: 6, type: 'video' }, { title: 'Resolution Strategies', duration: 6, type: 'video' }, { title: 'Mediation Basics', duration: 4, type: 'reading' }, { title: 'Conflict Simulation', duration: 4, type: 'interactive' }], objectives: ['Identify conflict types', 'Apply resolution strategies', 'Mediate disputes'] },
      { id: 'ss-7', title: 'Adaptability and Resilience', titleMm: 'လိုက်လျောညီထွေဖြစ်မှုနှင့်ခံနိုင်ရည်', duration: 20, points: 16, description: 'Thrive in changing environments', lessons: [{ title: 'Embracing Change', duration: 6, type: 'video' }, { title: 'Building Resilience', duration: 6, type: 'video' }, { title: 'Stress Management', duration: 4, type: 'reading' }, { title: 'Resilience Plan', duration: 4, type: 'interactive' }], objectives: ['Embrace change', 'Build resilience', 'Manage stress'] },
      { id: 'ss-8', title: 'Professional Etiquette', titleMm: 'ပရော်ဖက်ရှင်နယ်ယဉ်ကျေးမှု', duration: 25, points: 16, description: 'Master workplace etiquette and professionalism', lessons: [{ title: 'Office Etiquette', duration: 7, type: 'video' }, { title: 'Email and Meeting Etiquette', duration: 6, type: 'video' }, { title: 'Cultural Sensitivity', duration: 5, type: 'reading' }, { title: 'Etiquette Quiz', duration: 7, type: 'quiz' }], objectives: ['Follow office etiquette', 'Communicate professionally', 'Be culturally aware'] },
    ],
  },
];

// Get icon component for lesson type
const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video': return Video;
    case 'reading': return FileText;
    case 'interactive': return PenTool;
    case 'quiz': return BookMarked;
    default: return FileText;
  }
};

export default function AcademyPage() {
  const { user } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const track = learningTracks.find(t => t.id === selectedTrack);
  const currentModule = track?.modules.find(m => m.id === selectedModuleId);

  const completedModules = user?.completedModules || [];
  const totalCompleted = completedModules.length;
  const totalModules = learningTracks.reduce((sum, t) => sum + t.modules.length, 0);
  const overallProgress = Math.round((totalCompleted / totalModules) * 100);

  const toggleModuleExpand = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Learning Academy
              </h1>
              <p className="text-slate-400 text-sm">Professional Education for Myanmar's Future</p>
              <p className="text-teal-400/60 text-xs burmese-text">မြန်မာ့အနာဂတ်အတွက် ပရော်ဖက်ရှင်နယ်ပညာရေး</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-white/5">
            <University className="h-4 w-4 text-teal-400" />
            <span className="text-xs text-slate-300">Free Learning</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 border border-white/5">
            <Award className="h-4 w-4 text-amber-400" />
            <span className="text-xs text-slate-300">Certificates</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
            <BadgeCheck className="h-4 w-4 text-green-400" />
            <span className="text-xs text-green-400">100% Free</span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <div className="text-3xl font-bold text-teal-400">10+</div>
          <div className="text-slate-400 text-sm">Courses</div>
          <div className="text-slate-500 text-xs burmese-text">သင်ခန်းစားများ</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <div className="text-3xl font-bold text-amber-400">50+</div>
          <div className="text-slate-400 text-sm">Modules</div>
          <div className="text-slate-500 text-xs burmese-text">မော်ဂျူလများ</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <div className="text-3xl font-bold text-green-400">Free</div>
          <div className="text-slate-400 text-sm">Certificates</div>
          <div className="text-slate-500 text-xs burmese-text">အခမဲ့</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <div className="text-3xl font-bold text-purple-400">24/7</div>
          <div className="text-slate-400 text-sm">Access</div>
          <div className="text-slate-500 text-xs burmese-text">အမြဲတမ်း</div>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <div className="glass-card p-6 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border-teal-500/20">
        <div className="flex items-start gap-4">
          <Heart className="h-8 w-8 text-red-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white">Our Mission: Education for All</h3>
            <p className="text-slate-300 text-sm mt-1">
              We believe every young person in Myanmar deserves access to quality education, whether in Yangon, Mandalay, or the most remote villages. 
              This platform provides free courses to help you build skills, find jobs, and create a better future for yourself and our country.
            </p>
            <p className="text-teal-400 text-sm mt-2 burmese-text">
              မြန်မာနိုင်ငံရှိ လူငယ်တိုင်းသည် အရည်အသွေးမြင့်ပညာရေးကို ရယူခွင့်ရှိသင့်သည်။ ရန်ကုန်၊ မန္တလေးသာမက အဝေးရောက်ကျေးလက်ဒေသများတွင်ပါ 
              ဤပလက်ဖောင်းသည် အခမဲ့သင်ခန်းစာများပေးပြီး အသက်မွေးဝမ်းကြောင်းကျွမ်းကျင်မှုများ တိုးတက်စေပါသည်။
            </p>
          </div>
        </div>
      </div>

      {/* Quick Learning Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/dashboard/academy/knowledge" className="block">
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass-card p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer h-full"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Daily Knowledge Feed</h3>
                <p className="text-amber-400/80 text-sm burmese-text">နေ့စဉ်ဗဟုသုတ</p>
                <p className="text-slate-400 text-sm mt-2">
                  Quick knowledge cards you can read in 3 minutes. Earn points while learning practical skills!
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                    <Zap className="h-3 w-3 mr-1" /> +5 pts per card
                  </Badge>
                  <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">
                    Works Offline
                  </Badge>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </motion.div>
        </a>

        <a href="/dashboard/academy/buddy" className="block">
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass-card p-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20 hover:border-teal-500/40 transition-all cursor-pointer h-full"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Knowledge Buddy AI</h3>
                <p className="text-teal-400/80 text-sm burmese-text">ဗဟုသုတ ဘာဒီ</p>
                <p className="text-slate-400 text-sm mt-2">
                  Ask any question about tech, business, career, or life skills. Get instant answers!
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                    +2 pts per question
                  </Badge>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </motion.div>
        </a>
      </div>

      {/* Progress Overview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Your Learning Journey</h3>
            <p className="text-slate-400 text-sm">အသင်ယူမှုခရီးလမ်း</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-400">{totalCompleted}/{totalModules}</div>
            <div className="text-slate-500 text-sm">Lessons Complete</div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-3" />
        <div className="flex justify-between mt-2 text-sm text-slate-500">
          <span>{overallProgress}% Complete</span>
          <span>{totalModules - totalCompleted} remaining</span>
        </div>
      </div>

      {/* Content Views */}
      <AnimatePresence mode="wait">
        {selectedModuleId && track ? (
          // Module Detail View
          <motion.div key="module" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <button onClick={() => setSelectedModuleId(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to {track.title}</span>
            </button>

            <div className="glass-card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center`}>
                  <track.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{currentModule?.title}</h2>
                    {currentModule && (() => {
                      const moduleIndex = track.modules.findIndex(m => m.id === currentModule.id);
                      const level = COURSE_LEVELS[getModuleLevel(moduleIndex)];
                      return (
                        <span className={`text-xs px-2 py-1 rounded ${level.bgColor} ${level.color} ${level.borderColor} border`}>
                          {level.name}
                        </span>
                      );
                    })()}
                  </div>
                  <p className="text-slate-400 burmese-text">{currentModule?.titleMm}</p>
                </div>
                {currentModule && completedModules.includes(currentModule.id) && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Check className="h-4 w-4 mr-1" />Complete
                  </Badge>
                )}
              </div>

              <p className="text-slate-300 mb-6">{currentModule?.description}</p>

              {/* Learning Objectives */}
              {currentModule?.objectives && (
                <div className="mb-6 p-4 bg-slate-800/50 rounded-xl">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-teal-400" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {currentModule.objectives.map((obj, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-teal-400" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <Clock3 className="h-5 w-5 text-teal-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{currentModule?.duration} min</div>
                  <div className="text-slate-500 text-xs">Duration</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Star className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{currentModule?.points} pts</div>
                  <div className="text-slate-500 text-xs">Points</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <BookOpen className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{currentModule?.lessons?.length || 0}</div>
                  <div className="text-slate-500 text-xs">Lessons</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <Award className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">Free</div>
                  <div className="text-slate-500 text-xs">Certificate</div>
                </div>
              </div>

              {/* Lessons List */}
              {currentModule?.lessons && (
                <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-4">Lesson Content</h3>
                  <div className="space-y-3">
                    {currentModule.lessons.map((lesson, i) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            lesson.type === 'video' ? 'bg-red-500/20' :
                            lesson.type === 'reading' ? 'bg-blue-500/20' :
                            lesson.type === 'interactive' ? 'bg-green-500/20' : 'bg-amber-500/20'
                          }`}>
                            <LessonIcon className={`h-4 w-4 ${
                              lesson.type === 'video' ? 'text-red-400' :
                              lesson.type === 'reading' ? 'text-blue-400' :
                              lesson.type === 'interactive' ? 'text-green-400' : 'text-amber-400'
                            }`} />
                          </div>
                          <span className="text-slate-300 flex-1">{lesson.title}</span>
                          <Badge variant="outline" className="border-white/10 text-slate-500 text-xs">
                            {lesson.duration} min
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button className="flex-1 btn-primary">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
                <Button variant="outline" className="border-white/10">
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        ) : selectedTrack && track ? (
          // Track Modules View
          <motion.div key="track" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <button onClick={() => setSelectedTrack(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to All Courses</span>
            </button>

            {/* Track Header */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center`}>
                  <track.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-white">{track.title}</h2>
                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">{track.difficulty}</Badge>
                    <Badge variant="outline" className="border-white/10 text-slate-400">{track.category}</Badge>
                  </div>
                  <p className="text-slate-400 burmese-text">{track.titleMm}</p>
                  <p className="text-slate-500 mt-2">{track.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" />{track.totalHours} hours</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{track.totalModules} modules</span>
                    <span className="flex items-center gap-1"><Star className="h-4 w-4" />{track.totalPoints} points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Legend */}
            <div className="glass-card p-4">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-teal-400" />
                Course Level Progression
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(COURSE_LEVELS).map(([key, level]) => (
                  <div key={key} className={`text-center p-2 rounded-lg ${level.bgColor} ${level.borderColor} border`}>
                    <span className={`text-sm font-medium ${level.color}`}>{level.name}</span>
                    <p className="text-xs text-slate-500">{level.nameMm}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              {track.modules.map((mod, index) => {
                const isComplete = completedModules.includes(mod.id);
                const isLocked = index > 0 && !completedModules.includes(track.modules[index - 1].id);
                const moduleLevel = getModuleLevel(index);
                const levelInfo = COURSE_LEVELS[moduleLevel];
                const isExpanded = expandedModules.has(mod.id);

                return (
                  <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <div className={`glass-card ${isLocked ? 'opacity-60' : ''}`}>
                      <div className="p-5 cursor-pointer" onClick={() => !isLocked && toggleModuleExpand(mod.id)}>
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isComplete ? 'bg-green-500/20 text-green-400' :
                            isLocked ? 'bg-slate-700 text-slate-500' : `${levelInfo.bgColor} ${levelInfo.color}`
                          }`}>
                            {isComplete ? <Check className="h-5 w-5" /> :
                             isLocked ? <Lock className="h-5 w-5" /> :
                             <span className="font-bold">{index + 1}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-white">{mod.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded ${levelInfo.bgColor} ${levelInfo.color}`}>
                                {levelInfo.name}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm burmese-text">{mod.titleMm}</p>
                            <p className="text-slate-400 text-sm mt-1 line-clamp-1">{mod.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                              <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" />{mod.duration} min</span>
                              <span className="flex items-center gap-1"><Star className="h-4 w-4" />{mod.points} pts</span>
                              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{mod.lessons?.length || 0} lessons</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!isLocked && (
                              <Button size="sm" className="btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedModuleId(mod.id); }}>
                                Start
                              </Button>
                            )}
                            {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Lessons */}
                      {isExpanded && mod.lessons && (
                        <div className="px-5 pb-5 pt-0 border-t border-white/5">
                          <div className="mt-4 space-y-2">
                            {mod.lessons.map((lesson, i) => {
                              const LessonIcon = getLessonIcon(lesson.type);
                              return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                                  <Circle className="h-4 w-4 text-slate-500" />
                                  <LessonIcon className={`h-4 w-4 ${
                                    lesson.type === 'video' ? 'text-red-400' :
                                    lesson.type === 'reading' ? 'text-blue-400' :
                                    lesson.type === 'interactive' ? 'text-green-400' : 'text-amber-400'
                                  }`} />
                                  <span className="text-slate-300 text-sm flex-1">{lesson.title}</span>
                                  <span className="text-slate-500 text-xs">{lesson.duration} min</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          // All Tracks View
          <motion.div key="tracks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTracks.map((track, index) => {
              const trackCompleted = track.modules.filter(m => completedModules.includes(m.id)).length;
              const trackProgress = Math.round((trackCompleted / track.modules.length) * 100);

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 cursor-pointer hover:border-teal-500/30 transition-all group"
                  onClick={() => setSelectedTrack(track.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <track.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{track.title}</h3>
                      <p className="text-slate-500 text-sm burmese-text truncate">{track.titleMm}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="border-white/10 text-slate-400 text-xs">{track.category}</Badge>
                        <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">{track.difficulty}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{track.description}</p>

                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />{track.totalHours}h
                    </span>
                    <span className="text-slate-500">{track.modules.length} modules</span>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                      {track.totalPoints} pts
                    </Badge>
                  </div>

                  <Progress value={trackProgress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{trackCompleted}/{track.modules.length} Complete</span>
                    <span>{trackProgress}%</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Free Certificates</h3>
              <p className="text-slate-400 text-sm">Complete all modules to earn your certificate</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-teal-400">Digital Certificate</span>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-teal-400">PDF Download</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Diploma Programs</h3>
              <p className="text-slate-400 text-sm">Complete multiple tracks for professional diplomas</p>
              <Badge className="mt-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">Coming Soon</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
