'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, Languages } from 'lucide-react';
import { useTranslation, Language } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  variant?: 'icon' | 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာ', flag: '🇲🇲' },
];

export function LanguageToggle({ 
  variant = 'button', 
  size = 'md',
  showLabel = true 
}: LanguageToggleProps) {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5',
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Icon variant - just shows globe icon
  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg bg-slate-800/50 border border-white/10 hover:border-teal-500/50 transition-all ${sizeClasses[size]}`}
          title={`Language: ${currentLang?.name}`}
        >
          <Globe className="h-5 w-5 text-slate-400" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 z-50 glass-card p-2 bg-slate-900 border border-white/10 rounded-xl min-w-[160px]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      language === lang.code
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-slate-500">{lang.nativeName}</p>
                    </div>
                    {language === lang.code && (
                      <Check className="h-4 w-4 text-teal-400" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Button variant - shows current language
  if (variant === 'button') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 rounded-lg bg-slate-800/50 border border-white/10 hover:border-teal-500/50 transition-all ${sizeClasses[size]}`}
        >
          <span className="text-lg">{currentLang?.flag}</span>
          {showLabel && (
            <span className="text-slate-300 font-medium">
              {currentLang?.name}
            </span>
          )}
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 z-50 glass-card p-2 bg-slate-900 border border-white/10 rounded-xl min-w-[180px]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      language === lang.code
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-slate-500">{lang.nativeName}</p>
                    </div>
                    {language === lang.code && (
                      <Check className="h-4 w-4 text-teal-400" />
                    )}
                  </button>
                ))}
                
                {/* Myanmar AI Notice */}
                {language === 'my' && (
                  <div className="mt-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <p className="text-xs text-purple-300">
                      🌟 Myanmar translations powered by AI for natural, culturally-aware language.
                    </p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Dropdown variant - for settings page
  if (variant === 'dropdown') {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Languages className="h-4 w-4" />
          Language / ဘာသာစကား
        </label>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                language === lang.code
                  ? 'bg-teal-500/15 border-teal-500/50 text-teal-400'
                  : 'bg-slate-800/50 border-white/10 text-slate-300 hover:border-white/30'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className="font-medium">{lang.name}</p>
                <p className="text-sm text-slate-500">{lang.nativeName}</p>
              </div>
              {language === lang.code && (
                <Check className="h-5 w-5 ml-auto text-teal-400" />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {language === 'my' 
            ? 'Myanmar translations use AI for natural, culturally-appropriate language.'
            : 'Toggle Myanmar language for full platform experience in your native language.'}
        </p>
      </div>
    );
  }

  return null;
}

// Compact toggle for mobile navigation
export function LanguageToggleCompact() {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800/50 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
    >
      <Globe className="h-3 w-3" />
      {language === 'en' ? 'MY' : 'EN'}
    </button>
  );
}

export default LanguageToggle;
