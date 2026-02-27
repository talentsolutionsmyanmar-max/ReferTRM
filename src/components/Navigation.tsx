'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, Home, Briefcase, Building2, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { label: 'Home', href: '#', labelMm: 'ပင်မစာမျက်နှာ', icon: Home },
  { label: 'Jobs', href: '#jobs', labelMm: 'အလုပ်များ', icon: Briefcase },
  { label: 'Companies', href: '#companies', labelMm: 'ကုမ္ပဏီများ', icon: Building2 },
  { label: 'Refer', href: '#why-refer', labelMm: 'ရည်ညွှန်းပါ', icon: Users },
  { label: 'Academy', href: '#academy', labelMm: 'သင်ကြားရေး', icon: GraduationCap },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5 safe-area-top"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 touch-target">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-900">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold leading-none">
                <span className="text-teal-400">TRM</span>{' '}
                <span className="text-white">ReferTRM</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 touch-target ${
                  activeTab === item.label
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button + Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              className="btn-primary btn-mobile touch-target"
              onClick={() => window.open('https://t.me/ReferTRM', '_blank')}
            >
              <Send className="mr-2 h-4 w-4" />
              Join Telegram
            </Button>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors touch-target no-select"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>

        {/* Orange Progress Bar */}
        <div className="h-0.5 w-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          />
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay for better UX */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-[68px] left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-b border-white/5 z-50 overflow-y-auto max-h-[calc(100vh-68px)]"
            >
              <nav className="flex flex-col p-4 gap-1 safe-area-bottom">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setActiveTab(item.label);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 touch-target ${
                      activeTab === item.label
                        ? 'text-teal-400 bg-teal-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeTab === item.label ? 'bg-teal-500/20' : 'bg-white/5'
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-base">{item.label}</div>
                        <div className="text-xs text-slate-500 burmese-text">{item.labelMm}</div>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${
                      activeTab === item.label ? 'text-teal-400' : 'text-slate-500'
                    }`} />
                  </motion.a>
                ))}
                
                {/* CTA Button - Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="mt-4 pt-4 border-t border-white/5"
                >
                  <Button
                    className="w-full btn-primary btn-mobile text-base py-5"
                    onClick={() => window.open('https://t.me/ReferTRM', '_blank')}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Join Telegram
                  </Button>
                  
                  {/* Trust Badge */}
                  <div className="mt-3 text-center">
                    <p className="text-xs text-slate-500">
                      🇲🇲 Made with ❤️ in Myanmar
                    </p>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
