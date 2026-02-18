'use client';

import { useState, useCallback } from 'react';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  DollarSign,
  ChevronRight,
  Lightbulb,
  AlertCircle,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface CareerPath {
  shortTerm: string;
  mediumTerm: string;
  longTerm: string;
}

interface JobMatchResult {
  matches: JobMatch[];
  careerPath: CareerPath;
  skillDevelopment: string[];
  marketInsights: string;
}

interface AIJobMatcherProps {
  userProfile: {
    skills: string[];
    experience: number;
    education: string;
    interests?: string[];
    location?: string;
  };
  language?: 'en' | 'my';
  onJobSelect?: (job: JobMatch) => void;
}

export default function AIJobMatcher({ 
  userProfile, 
  language = 'en',
  onJobSelect 
}: AIJobMatcherProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

  const analyzeProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          limit: 5,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to analyze profile');
    } finally {
      setLoading(false);
    }
  }, [userProfile]);

  const handleJobClick = (job: JobMatch) => {
    setSelectedJob(selectedJob?.role === job.role ? null : job);
    onJobSelect?.(job);
  };

  const formatSalary = (min: number, max: number) => {
    const formatNum = (n: number) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
      if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
      return String(n);
    };
    return `${formatNum(min)} - ${formatNum(max)} MMK`;
  };

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-amber-500';
      default: return 'text-slate-400';
    }
  };

  const texts = {
    en: {
      title: 'AI Job Match',
      subtitle: 'Find your perfect career path',
      analyze: 'Analyze My Profile',
      analyzing: 'Analyzing...',
      topMatches: 'Top Job Matches',
      careerPath: 'Your Career Path',
      shortTerm: 'Short Term (1-2 years)',
      mediumTerm: 'Medium Term (3-5 years)',
      longTerm: 'Long Term (5+ years)',
      skillDevelopment: 'Recommended Skills to Develop',
      marketInsights: 'Market Insights',
      matchScore: 'Match Score',
      skillMatch: 'Skill Match',
      salaryRange: 'Salary Range',
      growthPotential: 'Growth Potential',
      reasons: 'Why This Match',
      gaps: 'Skills to Develop',
      recommendations: 'Recommendations',
      high: 'High Growth',
      medium: 'Medium Growth',
      stable: 'Stable',
    },
    my: {
      title: 'AI အလုပ်က配',
      subtitle: 'သင့်အတွက် အကောင်းဆုံး အလုပ်ကို ရှာပါ',
      analyze: 'ပရိုဖိုင်ခွဲခြမ်းစိတ်ဖြာပါ',
      analyzing: 'ခွဲခြမ်းစိတ်ဖြာနေသည်...',
      topMatches: 'အကောင်းဆုံး အလုပ်များ',
      careerPath: 'သင့်အလုပ်လမ်းကြောင်း',
      shortTerm: 'တိုတောင်းကာလ (၁-၂ နှစ်)',
      mediumTerm: 'အလယ်အလတ်ကာလ (၃-၅ နှစ်)',
      longTerm: 'ရှည်ကာလ (၅+ နှစ်)',
      skillDevelopment: 'ဖွံ့ဖြိုးတိုးတက်ရန် အကျိုးသင့်ဆုံး ကျွမ်းကျင်မှုများ',
      marketInsights: 'ဈေးကွက်အခြေအနေ',
      matchScore: 'ကိုက်ညီမှုရမှတ်',
      skillMatch: 'ကျွမ်းကျင်မှု ကိုက်ညီမှု',
      salaryRange: 'လစာအပိုင်းအခြား',
      growthPotential: 'ကြီးထွားမှုအလားအလာ',
      reasons: 'ဤအလုပ်နှင့် ကိုက်ညီသောအကြောင်းများ',
      gaps: 'ဖွံ့ဖြိုးတိုးတက်ရန် ကျွမ်းကျင်မှုများ',
      recommendations: 'အကြံပြုချက်များ',
      high: 'မြန်ဆန်စွာ ကြီးထွားသည်',
      medium: 'အလယ်အလတ် ကြီးထွားသည်',
      stable: 'တည်ငြိမ်သည်',
    },
  };

  const t = texts[language];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-sm text-white/80">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Analyze Button */}
        {!result && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-10 h-10 text-teal-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {language === 'my' 
                ? 'သင့်ကျွမ်းကျင်မှုများနှင့် အတွေ့အကြုံကို ခွဲခြမ်းစိတ်ဖြာ၍ အကောင်းဆုံး အလုပ်များကို ရှာပေးပါမည်။'
                : 'We\'ll analyze your skills and experience to find the best job matches for you.'}
            </p>
            <button
              onClick={analyzeProfile}
              disabled={loading}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t.analyze}
                </>
              )}
            </button>
            {error && (
              <p className="mt-4 text-red-500 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Job Matches */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-500" />
                {t.topMatches}
              </h3>
              
              <div className="space-y-3">
                {result.matches.map((job, index) => (
                  <div key={job.role}>
                    <button
                      onClick={() => handleJobClick(job)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all",
                        selectedJob?.role === job.role
                          ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-teal-300"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {job.role}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-400">
                              {job.category}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                            </span>
                            <span className={cn("flex items-center gap-1", getGrowthColor(job.growthPotential))}>
                              <TrendingUp className="w-3.5 h-3.5" />
                              {t[job.growthPotential]}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-500">
                            {job.matchScore}%
                          </div>
                          <div className="text-xs text-slate-400">{t.matchScore}</div>
                        </div>
                      </div>
                    </button>
                    
                    {/* Expanded Details */}
                    {selectedJob?.role === job.role && (
                      <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-slate-500 mb-2">{t.reasons}</h4>
                            <ul className="space-y-1">
                              {job.reasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-slate-500 mb-2">{t.gaps}</h4>
                            <ul className="space-y-1">
                              {job.gaps.map((gap, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  {gap}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-medium text-slate-500 mb-2">{t.recommendations}</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.recommendations.map((rec, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg">
                                {rec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Path */}
            {result.careerPath && (
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  {t.careerPath}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {t.shortTerm}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {result.careerPath.shortTerm}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-2">
                      {t.mediumTerm}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {result.careerPath.mediumTerm}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                      {t.longTerm}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {result.careerPath.longTerm}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Skill Development */}
            {result.skillDevelopment.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  {t.skillDevelopment}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skillDevelopment.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Market Insights */}
            {result.marketInsights && (
              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  {t.marketInsights}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {result.marketInsights}
                </p>
              </div>
            )}

            {/* Re-analyze Button */}
            <button
              onClick={analyzeProfile}
              disabled={loading}
              className="w-full py-3 border border-teal-500 text-teal-600 dark:text-teal-400 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              {language === 'my' ? 'ပြန်လည်ခွဲခြမ်းစိတ်ဖြာပါ' : 'Re-analyze Profile'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
