'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const ImpactFundSection = dynamic(() => import('@/components/impact/ImpactFundSection'), { ssr: false });

export default function ImpactPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-pink-400">❤️</span>
            Community Impact
          </h1>
          <p className="text-slate-400 burmese-text">အသိုင်းအဝိုင်း ထောက်ပံ့မှု</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
            <span className="text-green-400 text-sm font-medium">5-10% Revenue → Community</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
            <span className="text-teal-400 text-sm font-medium">100% Transparent</span>
          </div>
        </div>
      </div>

      {/* Main Impact Section */}
      <ImpactFundSection />

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center bg-gradient-to-r from-teal-500/5 via-pink-500/5 to-purple-500/5 border-white/5"
      >
        <div className="text-6xl mb-4">🇲🇲</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Built with Heart in Myanmar
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-4">
          ReferTRM isn't just a platform - it's a movement. We believe that technology should serve the people,
          especially those who need it most. That's why we commit a portion of our revenue to scholarships, 
          rural internet access, and community building.
        </p>
        <p className="text-slate-500 burmese-text max-w-xl mx-auto mb-6">
          ReferTRM သည် ပလက်ဖောင်းတစ်ခုသာ မဟုတ်ပါ - ၎င်းသည် လှုပ်ရှားမှုတစ်ခုဖြစ်သည်။ 
          နည်းပညာသည် လူများအတွက်၊ အထူးသဖြင့် အသိဉာဏ်ဆုံးသူများအတွက် ဆောင်ရွက်သင့်သည်ဟု ကျွန်ုပ်တို့ ယုံကြည်ပါသည်။
        </p>
        <p className="text-teal-400 text-sm font-medium">
          Together, we're building a brighter future for Myanmar's youth. 💙
        </p>
      </motion.div>
    </div>
  );
}
