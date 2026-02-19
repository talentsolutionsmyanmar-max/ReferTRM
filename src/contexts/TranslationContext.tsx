'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'my';

// Translation context type
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { context?: string; fallback?: string }) => string;
  isTranslating: boolean;
  translateText: (text: string, context?: string) => Promise<string>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Common translations embedded (for instant loading)
const commonTranslations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', my: 'ပင်မစာမျက်နှာ' },
  'nav.jobs': { en: 'Jobs', my: 'အလုပ်များ' },
  'nav.companies': { en: 'Companies', my: 'ကုမ္ပဏီများ' },
  'nav.academy': { en: 'Academy', my: 'သင်ကြားရေး' },
  'nav.community': { en: 'Community', my: 'အသိုင်းအဝိုင်း' },
  'nav.settings': { en: 'Settings', my: 'ဆက်တင်များ' },
  'nav.leaderboard': { en: 'Leaderboard', my: 'ခေါင်းဆောင်မှုစာရင်း' },
  'nav.rewards': { en: 'Rewards', my: 'ဆုလာဘ်များ' },
  'nav.safety': { en: 'Safety Hub', my: 'လုံခြုံရေးစင်တာ' },
  'nav.blood': { en: 'Blood Network', my: 'သွေးလှူကွန်ရက်' },
  'nav.zodiac': { en: 'Zodiac Career', my: 'ဗီဇဗေဒင်အလုပ်' },
  'nav.referrals': { en: 'Referrals', my: 'ရည်ညွှန်းမှုများ' },
  
  // Actions
  'action.apply': { en: 'Apply Now', my: 'ယခုလျှောက်ပါ' },
  'action.submit': { en: 'Submit', my: 'တင်သွင်းပါ' },
  'action.cancel': { en: 'Cancel', my: 'ပယ်ဖျက်ပါ' },
  'action.save': { en: 'Save', my: 'သိမ်းဆည်းပါ' },
  'action.edit': { en: 'Edit', my: 'ပြုပြင်ပါ' },
  'action.delete': { en: 'Delete', my: 'ဖျက်ပါ' },
  'action.search': { en: 'Search', my: 'ရှာဖွေပါ' },
  'action.filter': { en: 'Filter', my: 'စစ်ထုတ်ပါ' },
  'action.upload': { en: 'Upload', my: 'တင်ပါ' },
  'action.download': { en: 'Download', my: 'ဒေါင်းလုဒ်ဆွဲပါ' },
  'action.share': { en: 'Share', my: 'မျှဝေပါ' },
  'action.copy': { en: 'Copy', my: 'ကူးယူပါ' },
  'action.close': { en: 'Close', my: 'ပိတ်ပါ' },
  'action.continue': { en: 'Continue', my: 'ဆက်လက်လုပ်ဆောင်ပါ' },
  'action.back': { en: 'Back', my: 'နောက်သို့' },
  'action.next': { en: 'Next', my: 'ရှေ့သို့' },
  'action.skip': { en: 'Skip', my: 'ကျော်ပါ' },
  'action.complete': { en: 'Complete', my: 'ပြီးမြောက်ပါ' },
  'action.generate': { en: 'Generate', my: 'ဖန်တီးပါ' },
  'action.analyze': { en: 'Analyze', my: 'ခွဲခြမ်းစိတ်ဖြာပါ' },
  'action.schedule': { en: 'Schedule', my: 'အချိန်ဇယားချပါ' },
  'action.start': { en: 'Start', my: 'စတင်ပါ' },
  'action.retry': { en: 'Retry', my: 'ထပ်မံကြိုးစားပါ' },
  
  // Status
  'status.active': { en: 'Active', my: 'လှုပ်ရှားနေသည်' },
  'status.pending': { en: 'Pending', my: 'စောင့်ဆိုင်းနေသည်' },
  'status.completed': { en: 'Completed', my: 'ပြီးမြောက်ပြီ' },
  'status.approved': { en: 'Approved', my: 'အတည်ပြုပြီ' },
  'status.rejected': { en: 'Rejected', my: 'ငြင်းပယ်ပြီ' },
  'status.loading': { en: 'Loading...', my: 'တင်နေသည်...' },
  'status.success': { en: 'Success!', my: 'အောင်မြင်ပါသည်!' },
  'status.error': { en: 'Error', my: 'အမှားအယွင်း' },
  
  // Messages
  'msg.welcome': { en: 'Welcome', my: 'ကြိုဆိုပါသည်' },
  'msg.no_results': { en: 'No results found', my: 'ရလဒ်မတွေ့ပါ' },
  'msg.coming_soon': { en: 'Coming Soon', my: 'မကြာမီ' },
  'msg.learn_more': { en: 'Learn More', my: 'ပိုမိုလေ့လာပါ' },
  'msg.view_all': { en: 'View All', my: 'အားလုံးကြည့်ပါ' },
  'msg.get_started': { en: 'Get Started', my: 'စတင်ပါ' },
  
  // Job-related
  'job.title': { en: 'Job Title', my: 'အလုပ်ရာထူးအမည်' },
  'job.company': { en: 'Company', my: 'ကုမ္ပဏီ' },
  'job.location': { en: 'Location', my: 'နေရာ' },
  'job.salary': { en: 'Salary', my: 'လစာ' },
  'job.experience': { en: 'Experience', my: 'အတွေ့အကြုံ' },
  'job.requirements': { en: 'Requirements', my: 'လိုအပ်ချက်များ' },
  'job.benefits': { en: 'Benefits', my: 'အကျိုးခံစားခွင့်များ' },
  'job.full_time': { en: 'Full-time', my: 'အချိန်ပြည့်' },
  'job.part_time': { en: 'Part-time', my: 'အချိန်ပိုင်း' },
  'job.remote': { en: 'Remote', my: 'အဝေးမှအလုပ်' },
  'job.contract': { en: 'Contract', my: 'စာချုပ်' },
  'job.urgent': { en: 'Urgent', my: 'အရေးပေါ်' },
  
  // Profile
  'profile.name': { en: 'Name', my: 'အမည်' },
  'profile.email': { en: 'Email', my: 'အီးမေးလ်' },
  'profile.phone': { en: 'Phone', my: 'ဖုန်းနံပါတ်' },
  'profile.address': { en: 'Address', my: 'လိပ်စာ' },
  'profile.education': { en: 'Education', my: 'ပညာရေး' },
  'profile.skills': { en: 'Skills', my: 'ကျွမ်းကျင်မှုများ' },
  'profile.experience': { en: 'Experience', my: 'အတွေ့အကြုံ' },
  
  // Time
  'time.today': { en: 'Today', my: 'ယနေ့' },
  'time.yesterday': { en: 'Yesterday', my: 'မနေ့' },
  'time.this_week': { en: 'This Week', my: 'ယခုအပတ်' },
  'time.this_month': { en: 'This Month', my: 'ယခုလ' },
  'time.days': { en: 'days', my: 'ရက်' },
  'time.hours': { en: 'hours', my: 'နာရီ' },
  'time.minutes': { en: 'minutes', my: 'မိနစ်' },
  
  // Auth
  'auth.sign_in': { en: 'Sign In', my: 'လော့ဂ်အင်' },
  'auth.sign_up': { en: 'Sign Up', my: 'မှတ်ပုံတင်' },
  'auth.log_out': { en: 'Log Out', my: 'လော့ဂ်အောက်' },
  'auth.forgot_password': { en: 'Forgot Password?', my: 'စကားဝှက်မေ့နေပါသလား?' },
  'auth.reset_password': { en: 'Reset Password', my: 'စကားဝှက်ပြန်လည်သတ်မှတ်ပါ' },
  
  // Encouragement (Important for youth!)
  'encourage.start_journey': { en: 'Start Your Journey', my: 'သင်၏ခရီးစတင်ပါ' },
  'encourage.build_future': { en: 'Build Your Future', my: 'သင့်အနာဂတ်ကိုတည်ဆောက်ပါ' },
  'encourage.learn_grow': { en: 'Learn and Grow', my: 'သင်ယူ၍ ကြီးထွားပါ' },
  'encourage.connect': { en: 'Connect with Opportunities', my: 'အခွင့်အလမ်းများနှင့် ဆက်သွယ်ပါ' },
  'encourage.you_can': { en: 'You Can Do It!', my: 'သင်လုပ်နိုင်ပါသည်!' },
  'encourage.keep_learning': { en: 'Keep Learning', my: 'ဆက်လက်သင်ယူပါ' },
  
  // AI Tools
  'ai.generator': { en: 'AI Generator', my: 'AI ဖန်တီးရေး' },
  'ai.analyzer': { en: 'AI Analyzer', my: 'AI ခွဲခြမ်းစိတ်ဖြာရေး' },
  'ai.generate_jd': { en: 'Generate Job Description', my: 'အလုပ်ကြော်ငြာ ဖန်တီးပါ' },
  'ai.analyze_resume': { en: 'Analyze Resume', my: 'CV ခွဲခြမ်းစိတ်ဖြာပါ' },
  
  // Company
  'company.dashboard': { en: 'Company Dashboard', my: 'ကုမ္ပဏီ ပင်မစာမျက်နှာ' },
  'company.jobs': { en: 'Job Postings', my: 'အလုပ်ကြော်ငြာများ' },
  'company.applicants': { en: 'Applicants', my: 'လျှောက်လွှာတင်သူများ' },
  'company.analytics': { en: 'Analytics', my: 'ခွဲခြမ်းစိတ်ဖြာမှု' },
  'company.billing': { en: 'Billing', my: 'ငွေပေးချေမှု' },
  
  // Currency
  'currency.per_month': { en: 'per month', my: 'ကျပ်/လ' },
  'currency.lakh': { en: 'Lakh', my: 'သိန်း' },
  'currency.million': { en: 'Million', my: 'သန်း' },
};

// Translation cache for API calls
const translationCache = new Map<string, string>();

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Load language preference from localStorage (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedLanguage = localStorage.getItem('refertrm-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'my')) {
        setLanguage(savedLanguage);
      }
    } catch (e) {
      console.error('Error loading language preference:', e);
    }
  }, []);

  // Save language preference (client-side only)
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('refertrm-language', lang);
      } catch (e) {
        console.error('Error saving language preference:', e);
      }
    }
  };

  // Translation function
  const t = (key: string, options?: { context?: string; fallback?: string }): string => {
    // If English, return fallback or key
    if (language === 'en') {
      return options?.fallback || key;
    }

    // Check embedded translations
    const translation = commonTranslations[key];
    if (translation) {
      return translation[language];
    }

    // Check cache
    const cacheKey = `${key}-${language}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Return fallback or key (will be translated asynchronously if needed)
    return options?.fallback || key;
  };

  // Translate arbitrary text via API
  const translateText = async (text: string, context?: string): Promise<string> => {
    if (language === 'en') return text;

    const cacheKey = `${text}-${context || 'formal'}`;
    const cached = translationCache.get(cacheKey);
    if (cached) return cached;

    setIsTranslating(true);
    try {
      const response = await fetch('/api/translation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          context: context || 'formal',
          sourceLanguage: 'en',
          targetLanguage: 'my',
        }),
      });

      const data = await response.json();
      if (data.success && data.translation) {
        translationCache.set(cacheKey, data.translation);
        return data.translation;
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }

    return text;
  };

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        isTranslating,
        translateText,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

// Hook to use translation
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Export common translations for direct access
export { commonTranslations };
