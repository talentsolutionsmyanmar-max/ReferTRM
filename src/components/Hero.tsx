'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, FileText, ArrowDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trustStats = [
  { icon: Briefcase, value: '25+', label: 'Real Open Roles', labelMm: 'အလုပ်နေရာများ' },
  { icon: FileText, value: '1,000+', label: 'CVs Ready', labelMm: 'ကိုယ်ရေးအကျဉ်းများ' },
  { icon: Users, value: '150+', label: 'Active Referrers', labelMm: 'ရည်ညွှန်းသူများ' },
];

export default function Hero() {
  const scrollToJobs = () => {
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCompanies = () => {
    document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal-500/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-300">Powered by Talent Solutions Myanmar</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          <span className="text-gradient-teal">Refer Friends</span>
          <span className="text-white">, </span>
          <span className="text-gradient-gold">Earn Rewards</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-slate-300 mb-2">
            Earn up to <span className="text-gradient-gold font-bold">500,000 MMK</span> via KPay (85% to you)
          </p>
          <p className="text-lg text-slate-400 burmese-text mb-4">
            သူငယ်ချင်းများကို ရည်ညွှန်းပါ → KPay မှတဆင့် ကျပ် ၅သိန်းထိ ရရှိပါ
          </p>
          <p className="text-md text-slate-500">
            Companies pay only <span className="text-amber-400 font-semibold">50,000 MMK</span> flat success fee per hire
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Button
            onClick={scrollToJobs}
            size="lg"
            className="btn-teal text-lg px-8 py-6"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Browse 25 Real Jobs
          </Button>
          <Button
            onClick={scrollToCompanies}
            size="lg"
            className="btn-gold text-lg px-8 py-6"
          >
            <Send className="mr-2 h-5 w-5" />
            For Companies – 3 Free Hires
          </Button>
        </motion.div>

        {/* Burmese Button Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 text-sm text-slate-500 burmese-text"
        >
          <span>အလုပ် ၂၅ ခု ကြည့်ရှုပါ</span>
          <span className="hidden sm:inline">|</span>
          <span>ကုမ္ပဏီများအတွက် - အခမဲ့ ၃ နေရာ</span>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="glass-card p-5 text-center"
            >
              <stat.icon className="h-7 w-7 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-300 text-sm">{stat.label}</div>
              <div className="text-slate-500 text-xs burmese-text">{stat.labelMm}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-slate-500 cursor-pointer"
            onClick={scrollToJobs}
          >
            <span className="text-xs mb-1">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
