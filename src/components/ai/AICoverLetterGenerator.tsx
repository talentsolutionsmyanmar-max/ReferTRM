'use client';

import { useState, useCallback } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  Download,
  ChevronDown,
  AlertCircle,
  Wand2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoverLetterData {
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

interface CoverLetterResult {
  coverLetter: string;
  coverLetterMyanmar?: string;
  highlights: string[];
  tips: string[];
}

interface AICoverLetterGeneratorProps {
  language?: 'en' | 'my';
  initialData?: Partial<CoverLetterData>;
}

export default function AICoverLetterGenerator({
  language = 'en',
  initialData,
}: AICoverLetterGeneratorProps) {
  const [formData, setFormData] = useState<CoverLetterData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    position: initialData?.position || '',
    company: initialData?.company || '',
    experience: initialData?.experience || 0,
    currentRole: initialData?.currentRole || '',
    skills: initialData?.skills || [],
    achievements: initialData?.achievements || [],
    education: initialData?.education || '',
    template: 'professional',
    tone: 'formal',
    includeMyanmar: language === 'my',
  });

  const [skillInput, setSkillInput] = useState('');
  const [achievementInput, setAchievementInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const generateCoverLetter = useCallback(async () => {
    if (!formData.name || !formData.position || !formData.company) {
      setError(language === 'my' ? 'အမည်၊ ရာထူးနှင့် ကုမ္ပဏီလိုအပ်သည်' : 'Name, position, and company are required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to generate cover letter');
      }
    } catch (err) {
      setError('Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  }, [formData, language]);

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const addAchievement = () => {
    if (achievementInput.trim() && !formData.achievements.includes(achievementInput.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput('');
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement),
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadAsDoc = () => {
    if (!result) return;
    
    const content = result.coverLetterMyanmar 
      ? `${result.coverLetter}\n\n---\n\n${result.coverLetterMyanmar}`
      : result.coverLetter;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${formData.company.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const texts = {
    en: {
      title: 'AI Cover Letter Generator',
      subtitle: 'Create a compelling cover letter in seconds',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      position: 'Target Position',
      company: 'Company Name',
      experience: 'Years of Experience',
      currentRole: 'Current Role',
      education: 'Education',
      skills: 'Key Skills',
      addSkill: 'Add Skill',
      achievements: 'Key Achievements',
      addAchievement: 'Add Achievement',
      template: 'Template Style',
      tone: 'Writing Tone',
      includeMyanmar: 'Include Myanmar Translation',
      generate: 'Generate Cover Letter',
      generating: 'Generating...',
      coverLetter: 'Your Cover Letter',
      myanmarVersion: 'Myanmar Version',
      highlights: 'Key Highlights',
      tips: 'Pro Tips',
      copy: 'Copy to Clipboard',
      copied: 'Copied!',
      download: 'Download',
      regenerate: 'Regenerate',
      templates: {
        professional: 'Professional',
        creative: 'Creative',
        careerChange: 'Career Change',
        entryLevel: 'Entry Level',
      },
      tones: {
        formal: 'Formal',
        friendly: 'Friendly',
        enthusiastic: 'Enthusiastic',
      },
    },
    my: {
      title: 'AI စာတမ်းဖြင့်လျှောက်လွှာ ဖန်တီးသူ',
      subtitle: 'စိတ်ဆွဲဖွယ် စာတမ်းဖြင့်လျှောက်လွှာကို စက္ကန့်အနည်းငယ်ဖြင့် ဖန်တီးပါ',
      name: 'သင့်အမည်',
      email: 'အီးမေးလ်လိပ်စာ',
      phone: 'ဖုန်းနံပါတ်',
      position: 'ရည်မှန်းရာထူး',
      company: 'ကုမ္ပဏီအမည်',
      experience: 'အတွေ့အကြုံနှစ်များ',
      currentRole: 'လက်ရှိရာထူး',
      education: 'ပညာရေး',
      skills: 'အဓိကကျွမ်းကျင်မှုများ',
      addSkill: 'ကျွမ်းကျင်မှုထည့်ပါ',
      achievements: 'အောင်မြင်မှုများ',
      addAchievement: 'အောင်မြင်မှုထည့်ပါ',
      template: 'စတိုင်ပုံစံ',
      tone: 'ရေးသားမှုအသံကျော',
      includeMyanmar: 'မြန်မာဘာသာပြန်ဆိုမှုပါဝင်ပါ',
      generate: 'စာတမ်းဖြင့်လျှောက်လွှာ ဖန်တီးပါ',
      generating: 'ဖန်တီးနေသည်...',
      coverLetter: 'သင့်စာတမ်းဖြင့်လျှောက်လွှာ',
      myanmarVersion: 'မြန်မာပုံစံ',
      highlights: 'အဓိကအချက်များ',
      tips: 'အကြံပြုချက်များ',
      copy: 'ကလစ်ဘုတ်သို့ကူးယူပါ',
      copied: 'ကူးယူပြီးပြီ!',
      download: 'ဒေါင်းလုဒ်ဆွဲပါ',
      regenerate: 'ပြန်လည်ဖန်တီးပါ',
      templates: {
        professional: 'ပရော်ဖက်ရှင်နယ်',
        creative: 'ဆန်းသစ်ဖန်တီးမှု',
        careerChange: 'အလုပ်ပြောင်းရွှေ့မှု',
        entryLevel: 'စတင်သူ',
      },
      tones: {
        formal: 'တရားဝင်',
        friendly: 'ခင်မင်ဖွယ်',
        enthusiastic: 'စိတ်အားထက်သန်',
      },
    },
  };

  const t = texts[language];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-sm text-white/80">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.name} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.position} *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  placeholder={language === 'my' ? 'ဥပမာ - Software Engineer' : 'e.g. Software Engineer'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.company} *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  placeholder={language === 'my' ? 'ဥပမာ - KBZ Bank' : 'e.g. KBZ Bank'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.experience}
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.currentRole}
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.skills}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  placeholder={language === 'my' ? 'ကျွမ်းကျင်မှုထည့်ပါ' : 'Add a skill'}
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50"
                >
                  {t.addSkill}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-red-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t.achievements}
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  placeholder={language === 'my' ? 'အောင်မြင်မှုထည့်ပါ' : 'Add an achievement'}
                />
                <button
                  onClick={addAchievement}
                  className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50"
                >
                  {t.addAchievement}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.achievements.map((achievement, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1"
                  >
                    {achievement}
                    <button onClick={() => removeAchievement(achievement)} className="text-amber-400 hover:text-red-500">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Template & Tone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.template}
                </label>
                <select
                  value={formData.template}
                  onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value as CoverLetterData['template'] }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  {Object.entries(t.templates).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.tone}
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value as CoverLetterData['tone'] }))}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  {Object.entries(t.tones).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Myanmar toggle */}
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={formData.includeMyanmar}
                onChange={(e) => setFormData(prev => ({ ...prev, includeMyanmar: e.target.checked }))}
                className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
              />
              {t.includeMyanmar}
            </label>

            {/* Error */}
            {error && (
              <p className="text-red-500 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}

            {/* Generate Button */}
            <button
              onClick={generateCoverLetter}
              disabled={loading || !formData.name || !formData.position || !formData.company}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  {t.generate}
                </>
              )}
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            {result ? (
              <>
                {/* Cover Letter */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-500" />
                      {t.coverLetter}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(result.coverLetter)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        title={t.copy}
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={downloadAsDoc}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        title={t.download}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-400 font-sans">
                      {result.coverLetter}
                    </pre>
                  </div>
                </div>

                {/* Myanmar Version */}
                {result.coverLetterMyanmar && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {t.myanmarVersion}
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-h-64 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-amber-800 dark:text-amber-200 font-sans">
                        {result.coverLetterMyanmar}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {result.highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t.highlights}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.highlights.map((h, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips Toggle */}
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showTips && "rotate-180")} />
                  {t.tips}
                </button>
                
                {showTips && result.tips.length > 0 && (
                  <ul className="space-y-1">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-amber-500 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Regenerate */}
                <button
                  onClick={generateCoverLetter}
                  disabled={loading}
                  className="w-full py-2 border border-amber-500 text-amber-600 dark:text-amber-400 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                  {t.regenerate}
                </button>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-12 text-slate-500">
                <div>
                  <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                  <p>{language === 'my' ? 'သင့်စာတမ်းဖြင့်လျှောက်လွှာ ဤနေရာတွင် ပေါ်လာမည်' : 'Your cover letter will appear here'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
