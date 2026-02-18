'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  GraduationCap,
  Wifi,
  Users,
  TrendingUp,
  Sparkles,
  HandHeart,
  DollarSign,
  Target,
  Check,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Impact categories
const impactCategories = [
  {
    id: 'scholarship',
    name: 'Scholarships',
    nameMm: 'ပညာထောက်ပံ့မှု',
    description: 'Education for underprivileged youth',
    descriptionMm: 'ဆင်းရဲသားလူငယ်များအတွက် ပညာရေး',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    percentage: 35,
    stories: [
      { name: 'Mg Zaw', location: 'Mandalay', course: 'AI & Technology', impact: 'Full scholarship' },
      { name: 'Su Myat', location: 'Yangon', course: 'English Language', impact: '50% scholarship' },
    ],
  },
  {
    id: 'internet',
    name: 'Rural Internet',
    nameMm: 'ကျေးလက်အင်တာနက်',
    description: 'Mobile data for rural communities',
    descriptionMm: 'ကျေးလက်ဒေသများအတွက် မိုဘိုင်းဒေတာ',
    icon: Wifi,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    percentage: 40,
    stories: [
      { name: 'Shan State Village', beneficiaries: 25, dataProvided: '5GB/month each' },
      { name: 'Sagaing Community', beneficiaries: 18, dataProvided: '3GB/month each' },
    ],
  },
  {
    id: 'community',
    name: 'Community Fund',
    nameMm: 'အသိုင်းအဝိုင်းရန်ပုံငွေ',
    description: 'Local initiatives and meetups',
    descriptionMm: 'ဒေသခံလုပ်ဆောင်မှုများနှင့် ဆုံဆည်းမှုများ',
    icon: Users,
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-500/20',
    borderColor: 'border-teal-500/30',
    textColor: 'text-teal-400',
    percentage: 25,
    stories: [
      { event: 'Youth Career Fair', location: 'Yangon', attendees: 150 },
      { event: 'Tech Workshop', location: 'Mandalay', attendees: 80 },
    ],
  },
];

// Monthly impact data
const monthlyImpact = {
  month: 'January 2025',
  totalRevenue: 5200000,
  allocatedAmount: 260000, // 5%
  beneficiaries: 47,
  projects: 3,
};

// Transparency stats
const transparencyStats = [
  { label: 'Total Platform Revenue', value: '5,200,000 MMK', icon: DollarSign },
  { label: 'Community Allocation (5%)', value: '260,000 MMK', icon: Heart },
  { label: 'Beneficiaries This Month', value: '47 people', icon: Users },
  { label: 'Active Projects', value: '3 projects', icon: Target },
];

export default function ImpactFundSection() {
  const [selectedCategory, setSelectedCategory] = useState(impactCategories[0]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="glass-card overflow-hidden border-teal-500/20 bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-purple-500/5">
        <div className="p-8 text-center relative">
          {/* Decorative hearts */}
          <div className="absolute top-4 left-8 text-pink-400/20 animate-pulse">
            <Heart className="h-8 w-8" fill="currentColor" />
          </div>
          <div className="absolute top-12 right-12 text-red-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Heart className="h-6 w-6" fill="currentColor" />
          </div>
          <div className="absolute bottom-8 left-16 text-rose-400/20 animate-pulse" style={{ animationDelay: '1s' }}>
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
          >
            <HandHeart className="h-10 w-10 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Community Impact Fund
          </h2>
          <p className="text-lg text-teal-400 burmese-text mb-4">
            အသိုင်းအဝိုင်း ထောက်ပံ့မှုရန်ပုံငွေ
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            We believe in giving back. <span className="text-teal-400 font-semibold">5-10% of our platform revenue</span> goes directly 
            to scholarships, rural internet access, and community initiatives.
          </p>
          <p className="text-slate-500 burmese-text max-w-xl mx-auto">
            ကျွန်ုပ်တို့သည် ပြန်လည်ပေးအပ်ခြင်းကို ယုံကြည်ပါသည်။ ပလက်ဖောင်းဝင်ငွေ၏ ၅-၁၀% ကို 
            ပညာထောက်ပံ့မှု၊ ကျေးလက်အင်တာနက် နှင့် အသိုင်းအဝိုင်းလုပ်ဆောင်မှုများအတွက် တိုက်ရိုက်သုံးစွဲပါသည်။
          </p>

          {/* Trust Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">100% Transparent • Monthly Reports</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {transparencyStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-4 text-center">
              <stat.icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {impactCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory.id === cat.id
                ? `${cat.bgColor} ${cat.textColor} border ${cat.borderColor}`
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <cat.icon className="h-4 w-4" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Selected Category Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card overflow-hidden">
            <div className={`p-6 bg-gradient-to-r ${selectedCategory.color} bg-opacity-10`}>
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl ${selectedCategory.bgColor} flex items-center justify-center`}>
                  <selectedCategory.icon className={`h-8 w-8 ${selectedCategory.textColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{selectedCategory.name}</h3>
                    <Badge className={`${selectedCategory.bgColor} ${selectedCategory.textColor} border ${selectedCategory.borderColor}`}>
                      {selectedCategory.percentage}%
                    </Badge>
                  </div>
                  <p className="text-slate-400 burmese-text mb-2">{selectedCategory.nameMm}</p>
                  <p className="text-slate-300">{selectedCategory.description}</p>
                  <p className="text-slate-500 text-sm burmese-text">{selectedCategory.descriptionMm}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {Math.round(monthlyImpact.allocatedAmount * selectedCategory.percentage / 100).toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">MMK this month</div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Monthly Allocation</span>
                  <span className={selectedCategory.textColor}>
                    {Math.round(monthlyImpact.allocatedAmount * selectedCategory.percentage / 100).toLocaleString()} / {monthlyImpact.allocatedAmount.toLocaleString()} MMK
                  </span>
                </div>
                <Progress value={selectedCategory.percentage} className="h-3 bg-slate-700" />
              </div>

              {/* Stories/Impact */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Real Impact Stories / အမှန်တကယ် အကျိုးသက်ရောက်မှု
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCategory.stories.map((story: any, i: number) => (
                    <div key={i} className={`p-4 rounded-xl ${selectedCategory.bgColor} border ${selectedCategory.borderColor}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${selectedCategory.bgColor} flex items-center justify-center text-lg`}>
                          {selectedCategory.id === 'scholarship' && '👨‍🎓'}
                          {selectedCategory.id === 'internet' && '📡'}
                          {selectedCategory.id === 'community' && '🎉'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{story.name || story.event}</p>
                          <p className="text-xs text-slate-500">{story.location}</p>
                        </div>
                        {story.impact && (
                          <Badge className={`ml-auto ${selectedCategory.bgColor} ${selectedCategory.textColor}`}>
                            {story.impact}
                          </Badge>
                        )}
                        {story.beneficiaries && (
                          <p className={`text-sm ${selectedCategory.textColor}`}>{story.beneficiaries} beneficiaries</p>
                        )}
                        {story.attendees && (
                          <Badge className={`ml-auto ${selectedCategory.bgColor} ${selectedCategory.textColor}`}>
                            {story.attendees} attended
                          </Badge>
                        )}
                      </div>
                      {(story.course || story.dataProvided) && (
                        <p className="text-sm text-slate-400 mt-2">{story.course || story.dataProvided}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <Card className="glass-card border-pink-500/20 bg-gradient-to-r from-pink-500/5 to-red-500/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Heart className="h-12 w-12 text-pink-400" fill="currentColor" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Every Action Counts</h3>
              <p className="text-slate-400">
                Every job you refer, every course you complete, every friend you invite - contributes to the community fund.
              </p>
              <p className="text-slate-500 burmese-text text-sm mt-2">
                သင်ရည်ညွှန်းသော အလုပ်တိုင်း၊ သင်ပြီးမြောက်သော သင်ခန်းစာတိုင်း - အသိုင်းအဝိုင်းရန်ပုံငွေအတွက် ပါဝင်ကူညီပါသည်။
              </p>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white">
              <Heart className="mr-2 h-4 w-4" />
              Start Helping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
