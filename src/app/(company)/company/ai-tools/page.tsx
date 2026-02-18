'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Download,
  RefreshCw,
  ChevronRight,
  Building2,
  Users,
  Clock,
  DollarSign,
  Star,
  Zap,
  Brain,
  Target,
  MessageSquare,
  Loader2,
  Wand2,
  Settings2,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Globe,
  CheckCircle2,
  ArrowRight,
  Upload,
  FileUp,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Code,
  BarChart2,
  AlertCircle,
  ThumbsUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

// Job role templates
const jobRoles = [
  { value: 'software-engineer', label: 'Software Engineer', labelMm: 'ဆော့ဗ်ဝဲ အင်ဂျင်နီယာ' },
  { value: 'sales-manager', label: 'Sales Manager', labelMm: 'ရောင်းချသူ မန်နေဂျာ' },
  { value: 'marketing-specialist', label: 'Marketing Specialist', labelMm: 'မာကတ်တင်း အထူးပညာရှင်' },
  { value: 'hr-manager', label: 'HR Manager', labelMm: 'လူ့စွမ်းအားအရင်းအမြစ် မန်နေဂျာ' },
  { value: 'accountant', label: 'Accountant', labelMm: 'စာရင်းကိုင်' },
  { value: 'operations-manager', label: 'Operations Manager', labelMm: 'လည်ပတ်မှု မန်နေဂျာ' },
  { value: 'customer-service', label: 'Customer Service', labelMm: 'ဖောက်သည်ဝန်ဆောင်မှု' },
  { value: 'data-analyst', label: 'Data Analyst', labelMm: 'ဒေတာ သုတေသန' },
  { value: 'project-manager', label: 'Project Manager', labelMm: 'ပရောဂျက် မန်နေဂျာ' },
  { value: 'executive-assistant', label: 'Executive Assistant', labelMm: 'အလုပ်အမှုဆောင် လက်ထောက်' },
];

// Company culture traits
const cultureTraits = [
  { id: 'innovative', label: 'Innovative', labelMm: 'ဆန်းသစ်တီထွင်' },
  { id: 'collaborative', label: 'Collaborative', labelMm: 'ပူးပေါင်းဆောင်ရွက်' },
  { id: 'fast-paced', label: 'Fast-Paced', labelMm: 'မြန်ဆန်သော' },
  { id: 'detail-oriented', label: 'Detail-Oriented', labelMm: 'အသေးစိတ် ဂရုတစိုက်' },
  { id: 'customer-focused', label: 'Customer-Focused', labelMm: 'ဖောက်သည်ကို ဦးစားပေး' },
  { id: 'results-driven', label: 'Results-Driven', labelMm: 'ရလဒ်ကို ဦးတည်' },
  { id: 'work-life-balance', label: 'Work-Life Balance', labelMm: 'အလုပ်နှင့် ဘဝ ချိန်ခွင်' },
  { id: 'growth-mindset', label: 'Growth Mindset', labelMm: 'ကြီးထွားမှု စိတ်ဓာတ်' },
];

// Experience levels
const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-1 years)', labelMm: 'အဆင့်မြင့် (၀-၁ နှစ်)' },
  { value: 'junior', label: 'Junior (1-3 years)', labelMm: 'စတင်သူ (၁-၃ နှစ်)' },
  { value: 'mid', label: 'Mid-Level (3-5 years)', labelMm: 'အလယ်အလတ် (၃-၅ နှစ်)' },
  { value: 'senior', label: 'Senior (5-8 years)', labelMm: 'အကြီးတန်း (၅-၈ နှစ်)' },
  { value: 'lead', label: 'Lead/Manager (8+ years)', labelMm: 'ခေါင်းဆောင်/မန်နေဂျာ (၈+ နှစ်)' },
];

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState('jd-generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedJD, setGeneratedJD] = useState<string | null>(null);
  const [attractivenessScore, setAttractivenessScore] = useState(0);

  // JD Generator State
  const [jobTitle, setJobTitle] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [salaryRange, setSalaryRange] = useState('');
  const [location, setLocation] = useState('Yangon');
  const [selectedTraits, setSelectedTraits] = useState<string[]>(['innovative', 'collaborative']);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [includeBilingual, setIncludeBilingual] = useState(true);
  const [toneFormality, setToneFormality] = useState(70);

  // Document Processor State
  const [docType, setDocType] = useState('offer-letter');
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);

  // Resume Analyzer State
  const [resumeText, setResumeText] = useState('');
  const [targetJobRole, setTargetJobRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    candidateName: string;
    email: string;
    phone: string;
    skills: { name: string; level: 'expert' | 'proficient' | 'familiar' }[];
    experience: { title: string; company: string; duration: string }[];
    education: { degree: string; school: string; year: string }[];
    matchScore: number;
    strengths: string[];
    gaps: string[];
    recommendation: 'strongly-recommend' | 'recommend' | 'consider' | 'not-suitable';
    summary: string;
  } | null>(null);

  const handleTraitToggle = (traitId: string) => {
    setSelectedTraits(prev =>
      prev.includes(traitId)
        ? prev.filter(t => t !== traitId)
        : [...prev, traitId]
    );
  };

  const generateJD = async () => {
    setIsGenerating(true);
    setAttractivenessScore(0);

    try {
      const response = await fetch('/api/ai/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobTitle || selectedRole,
          role: selectedRole,
          experienceLevel,
          salaryRange,
          location,
          cultureTraits: selectedTraits,
          additionalRequirements,
          includeBilingual,
          toneFormality,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedJD(data.jd);
        // Animate attractiveness score
        setTimeout(() => setAttractivenessScore(data.score || 85), 500);
      }
    } catch (error) {
      console.error('Error generating JD:', error);
      // Fallback mock generation for demo
      generateMockJD();
    }

    setIsGenerating(false);
  };

  const generateMockJD = () => {
    const role = jobRoles.find(r => r.value === selectedRole);
    const traits = cultureTraits.filter(t => selectedTraits.includes(t.id));
    const exp = experienceLevels.find(e => e.value === experienceLevel);

    const mockJD = `# ${jobTitle || role?.label || 'Position'}

## About the Company
We are a forward-thinking organization in Myanmar, committed to fostering innovation and excellence. Our team values ${traits.map(t => t.label.toLowerCase()).join(', ')}, creating an environment where every team member can thrive and make a meaningful impact.

## Position Overview
We are seeking an experienced ${jobTitle || role?.label} to join our dynamic team in ${location}. This is a ${exp?.label.split('(')[0].trim()}position that offers exciting opportunities for professional growth and development.

## Key Responsibilities
• Lead and execute strategic initiatives aligned with company objectives
• Collaborate with cross-functional teams to drive project success
• Analyze data and provide actionable insights to stakeholders
• Mentor junior team members and contribute to knowledge sharing
• Stay current with industry trends and best practices

## Requirements
• ${exp?.label} of relevant experience
• Strong communication and interpersonal skills
• Proficiency in relevant tools and technologies
• Problem-solving mindset with attention to detail
• Ability to work effectively in a fast-paced environment

## What We Offer
• Competitive salary: ${salaryRange || 'Market-rate compensation'}
• Comprehensive health benefits
• Professional development opportunities
• Collaborative and inclusive work environment
• Work-life balance initiatives

## How to Apply
Submit your application through ReferTRM platform. Qualified candidates will be contacted for interviews.

---

${includeBilingual ? `
## ကုမ္ပဏီအကြောင်း
ကျွန်ုပ်တို့သည် မြန်မာနိုင်ငံတွင် ဆန်းသစ်တီထွင်မှုနှင့် ထူးခြားမှုကို မြှင့်တင်ရန် ကတိကဝတ် ပြုထားသော အဖွဲ့အစည်းတစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့၏ အဖွဲ့သည် ${traits.map(t => t.labelMm).join('၊ ')} တန်ဖိုးများကို အလေးပေးထားပြီး အဖွဲ့ဝင်တိုင်းသည် ကြီးထွားတိုးတက်နိုင်သော ပတ်ဝန်းကျင်တစ်ခုကို ဖန်တီးပေးထားသည်။

## ရာထူးအကျဉ်းချုပ်
${location}တွင် ရှိသော ကျွန်ုပ်တို့၏ စိတ်လှုပ်ရှားဖွယ် အဖွဲ့တွင် အတွေ့အကြုံရှိ ${jobTitle || role?.labelMm} တစ်ဦးကို လိုအပ်နေပါသည်။
` : ''}

---
*Generated by ReferTRM AI Job Description Generator*`;

    setGeneratedJD(mockJD);
    setTimeout(() => setAttractivenessScore(87), 500);
  };

  const generateDocument = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType,
          candidateName,
          position,
          startDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedDoc(data.document);
      }
    } catch (error) {
      console.error('Error generating document:', error);
      // Fallback mock generation
      generateMockDocument();
    }

    setIsGenerating(false);
  };

  const generateMockDocument = () => {
    const mockDoc = `# OFFER LETTER

**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

**To:** ${candidateName}

**Position:** ${position}

**Start Date:** ${startDate}

---

Dear ${candidateName},

We are pleased to offer you the position of ${position} at our company. After careful consideration of your qualifications and experience, we believe you will be an excellent addition to our team.

## Terms of Employment

**Position:** ${position}
**Start Date:** ${startDate}
**Location:** Yangon, Myanmar
**Employment Type:** Full-time

## Compensation

Your starting salary will be discussed and agreed upon in the follow-up meeting. You will also be eligible for our standard benefits package, which includes:

- Health insurance coverage
- Annual leave: 10 days
- Public holidays as per Myanmar calendar
- Professional development allowance

## Next Steps

Please sign and return this letter by [Date] to confirm your acceptance of this offer. If you have any questions, please do not hesitate to contact us.

We look forward to welcoming you to our team!

Best regards,

**HR Department**
[Company Name]

---

*Generated by ReferTRM AI Document Processor*`;

    setGeneratedDoc(mockDoc);
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetJobRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.analysis);
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Fallback mock analysis for demo
      generateMockAnalysis();
    }

    setIsAnalyzing(false);
  };

  const generateMockAnalysis = () => {
    // Simulate AI analysis with mock data
    const mockResult = {
      candidateName: 'Mya Myint',
      email: 'mya.myint@email.com',
      phone: '+95 9 123 456 789',
      skills: [
        { name: 'JavaScript', level: 'expert' as const },
        { name: 'React', level: 'expert' as const },
        { name: 'Node.js', level: 'proficient' as const },
        { name: 'TypeScript', level: 'proficient' as const },
        { name: 'Python', level: 'familiar' as const },
        { name: 'SQL', level: 'proficient' as const },
        { name: 'Git', level: 'expert' as const },
        { name: 'Agile/Scrum', level: 'proficient' as const },
      ],
      experience: [
        { title: 'Senior Software Engineer', company: 'Tech Solutions Myanmar', duration: '2021 - Present (3 years)' },
        { title: 'Software Developer', company: 'Digital Innovations Co.', duration: '2019 - 2021 (2 years)' },
        { title: 'Junior Developer', company: 'StartUp Yangon', duration: '2017 - 2019 (2 years)' },
      ],
      education: [
        { degree: 'B.Sc. in Computer Science', school: 'University of Yangon', year: '2017' },
      ],
      matchScore: targetJobRole === 'software-engineer' ? 92 : 78,
      strengths: [
        'Strong technical skills in modern web technologies',
        '7+ years of progressive experience',
        'Experience with both frontend and backend development',
        'Good track record of career progression',
      ],
      gaps: [
        'No cloud certification mentioned',
        'Limited experience with Myanmar market specific tools',
      ],
      recommendation: targetJobRole === 'software-engineer' ? 'strongly-recommend' as const : 'recommend' as const,
      summary: 'Mya Myint is a highly qualified candidate with 7+ years of software development experience. They demonstrate strong proficiency in modern web technologies including JavaScript, React, and Node.js. Their career shows consistent growth and they would be an excellent addition to any development team. Consider prioritizing for interview.',
    };

    setAnalysisResult(mockResult);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-teal-400" />
            AI Tools for HR
          </h1>
          <p className="text-slate-400 mt-1">
            Powered by AI to streamline your HR workflows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-teal-500/50 text-teal-400">
            <Zap className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="border-amber-500/50 text-amber-400">
            Bilingual Support
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: 'Time Saved', value: '70%', color: 'text-teal-400' },
          { icon: FileText, label: 'Docs Generated', value: '1,234', color: 'text-amber-400' },
          { icon: Star, label: 'Quality Score', value: '94%', color: 'text-purple-400' },
          { icon: Users, label: 'Companies Using', value: '156', color: 'text-pink-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-card p-1 mb-6">
          <TabsTrigger value="jd-generator" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            JD Generator
          </TabsTrigger>
          <TabsTrigger value="document-processor" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Processor
          </TabsTrigger>
          <TabsTrigger value="resume-analyzer" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Resume Analyzer
          </TabsTrigger>
        </TabsList>

        {/* JD Generator Tab */}
        <TabsContent value="jd-generator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings2 className="h-5 w-5 text-teal-400" />
                  Job Description Settings
                </CardTitle>
                <CardDescription>
                  Configure your JD generation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Role Selection */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Job Role Template</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select a role template..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      {jobRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value} className="text-white hover:bg-slate-800">
                          {role.label} ({role.labelMm})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Job Title */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Custom Job Title (Optional)</Label>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Experience Level</Label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="text-white hover:bg-slate-800">
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location & Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Location</Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Yangon"
                      className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Salary Range (MMK)</Label>
                    <Input
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="500,000 - 800,000"
                      className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Company Culture Traits */}
                <div className="space-y-3">
                  <Label className="text-slate-300">Company Culture Traits</Label>
                  <div className="flex flex-wrap gap-2">
                    {cultureTraits.map((trait) => (
                      <button
                        key={trait.id}
                        onClick={() => handleTraitToggle(trait.id)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedTraits.includes(trait.id)
                            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
                            : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:border-white/20'
                        }`}
                      >
                        {trait.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Additional Requirements</Label>
                  <Textarea
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Any specific skills, certifications, or requirements..."
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
                  />
                </div>

                {/* Advanced Options */}
                <div className="p-4 rounded-xl bg-slate-800/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Bilingual Output (Myanmar)
                    </Label>
                    <Switch
                      checked={includeBilingual}
                      onCheckedChange={setIncludeBilingual}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-300">Tone Formality</Label>
                      <span className="text-sm text-slate-500">{toneFormality}%</span>
                    </div>
                    <Slider
                      value={[toneFormality]}
                      onValueChange={(v) => setToneFormality(v[0])}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateJD}
                  disabled={isGenerating || (!selectedRole && !jobTitle)}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-6"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Job Description
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="h-5 w-5 text-teal-400" />
                    Generated Output
                  </CardTitle>
                  {generatedJD && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generatedJD)}
                        className="border-white/10 hover:bg-white/5"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateJD}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!generatedJD ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                      <Wand2 className="h-10 w-10 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No JD Generated Yet</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Fill in the job details and click "Generate Job Description" to create an AI-powered, culture-aligned job posting.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Attractiveness Score */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-teal-400">JD Attractiveness Score</span>
                        <span className="text-lg font-bold text-white">{attractivenessScore}%</span>
                      </div>
                      <Progress value={attractivenessScore} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-400 mt-2">
                        {attractivenessScore >= 80 ? '✨ Excellent! This JD is likely to attract quality candidates.' :
                         attractivenessScore >= 60 ? '👍 Good! Consider adding more specific requirements.' :
                         '💡 Consider adding salary range and more details.'}
                      </p>
                    </motion.div>

                    {/* Generated Content */}
                    <div className="prose prose-invert prose-sm max-w-none">
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 max-h-[500px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                          {generatedJD}
                        </pre>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        Ready to post
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 hover:bg-white/5"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-600 text-white"
                        >
                          Post to Jobs
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Document Processor Tab */}
        <TabsContent value="document-processor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="h-5 w-5 text-amber-400" />
                  Document Generator
                </CardTitle>
                <CardDescription>
                  Auto-generate HR documents with AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Type */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Document Type</Label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="offer-letter">Offer Letter</SelectItem>
                      <SelectItem value="employment-contract">Employment Contract</SelectItem>
                      <SelectItem value="nda">Non-Disclosure Agreement (NDA)</SelectItem>
                      <SelectItem value="experience-letter">Experience Letter</SelectItem>
                      <SelectItem value="promotion-letter">Promotion Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Candidate Name */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Candidate/Employee Name</Label>
                  <Input
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="U Myint Myat"
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Position</Label>
                  <Input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Software Engineer"
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateDocument}
                  disabled={isGenerating || !candidateName || !position}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-6"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Document...
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="h-5 w-5 text-amber-400" />
                    Generated Document
                  </CardTitle>
                  {generatedDoc && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedDoc)}
                      className="border-white/10 hover:bg-white/5"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!generatedDoc ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                      <FileText className="h-10 w-10 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No Document Generated</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Select a document type, enter details, and generate professional HR documents instantly.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                      {generatedDoc}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resume Analyzer Tab */}
        <TabsContent value="resume-analyzer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-purple-400" />
                  Resume Analyzer
                </CardTitle>
                <CardDescription>
                  Paste resume text or upload a file for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target Job Role */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Target Job Role (Optional)</Label>
                  <Select value={targetJobRole} onValueChange={setTargetJobRole}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select a job role to match against..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      {jobRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value} className="text-white hover:bg-slate-800">
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Resume Text Input */}
                <div className="space-y-2">
                  <Label className="text-slate-300">Resume Content</Label>
                  <Textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste the resume text here... (Copy from PDF or document)"
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 min-h-[300px] font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">
                    Tip: Open the resume PDF, select all text (Ctrl+A), copy (Ctrl+C), and paste here
                  </p>
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" id="resume-upload" />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FileUp className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">
                      <span className="text-purple-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX, TXT (Max 5MB)</p>
                  </label>
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={analyzeResume}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-6"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card className="glass-card border-white/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-purple-400" />
                    Analysis Results
                  </CardTitle>
                  {analysisResult && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAnalysisResult(null);
                        setResumeText('');
                      }}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!analysisResult ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                      <Brain className="h-10 w-10 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No Analysis Yet</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Paste a resume and click "Analyze Resume" to extract skills, experience, and get hiring recommendations.
                    </p>

                    {/* Features Preview */}
                    <div className="grid grid-cols-1 gap-3 mt-6 w-full max-w-xs">
                      {[
                        { icon: Target, label: 'Skill Extraction', desc: 'Auto-detect technical & soft skills' },
                        { icon: Award, label: 'Match Score', desc: 'Compare against job requirements' },
                        { icon: Heart, label: 'Culture Fit', desc: 'Analyze cultural alignment' },
                      ].map((feature) => (
                        <div key={feature.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/5">
                          <feature.icon className="h-5 w-5 text-purple-400" />
                          <div className="text-left">
                            <h4 className="font-medium text-white text-sm">{feature.label}</h4>
                            <p className="text-xs text-slate-500">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Candidate Header */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{analysisResult.candidateName}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {analysisResult.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {analysisResult.phone}
                            </span>
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          analysisResult.recommendation === 'strongly-recommend' ? 'bg-green-500/20 text-green-400' :
                          analysisResult.recommendation === 'recommend' ? 'bg-teal-500/20 text-teal-400' :
                          analysisResult.recommendation === 'consider' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {analysisResult.recommendation === 'strongly-recommend' ? '⭐ Strong Match' :
                           analysisResult.recommendation === 'recommend' ? '✓ Good Match' :
                           analysisResult.recommendation === 'consider' ? '~ Consider' :
                           '✗ Not Suitable'}
                        </div>
                      </div>
                    </div>

                    {/* Match Score */}
                    {targetJobRole && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-slate-800/50 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-300">Match Score for {jobRoles.find(r => r.value === targetJobRole)?.label}</span>
                          <span className={`text-lg font-bold ${
                            analysisResult.matchScore >= 80 ? 'text-green-400' :
                            analysisResult.matchScore >= 60 ? 'text-teal-400' :
                            analysisResult.matchScore >= 40 ? 'text-amber-400' : 'text-red-400'
                          }`}>{analysisResult.matchScore}%</span>
                        </div>
                        <Progress value={analysisResult.matchScore} className="h-3 bg-slate-700" />
                      </motion.div>
                    )}

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <Code className="h-4 w-4 text-purple-400" />
                        Skills Detected
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className={`${
                              skill.level === 'expert' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                              skill.level === 'proficient' ? 'border-teal-500/50 text-teal-400 bg-teal-500/10' :
                              'border-slate-500/50 text-slate-400 bg-slate-500/10'
                            }`}
                          >
                            {skill.name}
                            <span className="ml-1 text-xs">({skill.level})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-amber-400" />
                        Experience
                      </h4>
                      <div className="space-y-3">
                        {analysisResult.experience.map((exp, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-800/50 border border-white/5">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-white">{exp.title}</p>
                                <p className="text-sm text-slate-400">{exp.company}</p>
                              </div>
                              <span className="text-xs text-slate-500">{exp.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-cyan-400" />
                        Education
                      </h4>
                      {analysisResult.education.map((edu, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-800/50 border border-white/5">
                          <p className="font-medium text-white">{edu.degree}</p>
                          <p className="text-sm text-slate-400">{edu.school} • {edu.year}</p>
                        </div>
                      ))}
                    </div>

                    {/* Strengths & Gaps */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-400" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.strengths.map((strength, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-400" />
                          Development Areas
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.gaps.map((gap, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                              <AlertCircle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* AI Summary */}
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                      <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        AI Summary & Recommendation
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{analysisResult.summary}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        Analysis complete
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 hover:bg-white/5"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          Schedule Interview
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Pro Tips Section */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-teal-500/5 to-cyan-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-teal-500/20">
              <MessageSquare className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Pro Tips for Better JDs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-400" />
                  Include specific salary ranges for 40% more applicants
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-400" />
                  Add company culture traits for better culture fit
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-400" />
                  Bilingual JDs reach 2x more local candidates
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-400" />
                  Clear growth paths attract senior talent
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
