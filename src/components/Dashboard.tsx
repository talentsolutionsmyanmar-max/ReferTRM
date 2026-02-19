'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Star, 
  Trophy, 
  Gift, 
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock user data - in production, this would come from Firebase/API
const mockUser = {
  name: 'Thiri Aung',
  nameMm: 'သီရိအောင်',
  points: 450,
  streak: 7,
  maxStreak: 12,
  level: 'Professional',
  experience: 650,
  nextLevelAt: 1000,
  totalReferrals: 3,
  totalEarned: 125000,
  avatar: '👩‍💼',
  zodiac: '♌ Leo',
  traits: ['Leadership', 'Creative', 'Persistent'],
  completedModules: 8,
  totalModules: 24,
};

const levelColors: Record<string, string> = {
  Amateur: 'text-green-400',
  Professional: 'text-blue-400',
  Expert: 'text-purple-400',
  Master: 'text-amber-400',
};

const streakMilestones = [3, 7, 14, 30, 60, 100];

export default function Dashboard() {
  const [showTraits, setShowTraits] = useState(false);
  const [showPointsShop, setShowPointsShop] = useState(false);

  const levelProgress = (mockUser.experience / mockUser.nextLevelAt) * 100;
  const nextStreakMilestone = streakMilestones.find(m => m > mockUser.streak) || 100;

  return (
    <section id="dashboard" className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-5xl">
                {mockUser.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full px-2 py-1 text-xs font-bold text-slate-900">
                Lv.{mockUser.level === 'Amateur' ? 1 : mockUser.level === 'Professional' ? 2 : mockUser.level === 'Expert' ? 3 : 4}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">
                Welcome back, {mockUser.name}! 👋
              </h2>
              <p className="text-slate-400 burmese-text mb-2">
                နောက်တစ်ကြိမ် ကြိုဆိုပါသည်၊ {mockUser.nameMm}!
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Badge className={`${levelColors[mockUser.level]} bg-white/5 border-current`}>
                  <Star className="h-3 w-3 mr-1" />
                  {mockUser.level}
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Flame className="h-3 w-3 mr-1" />
                  {mockUser.streak} Day Streak
                </Badge>
                <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                  <ZodiacSign className="h-3 w-3 mr-1" />
                  {mockUser.zodiac}
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">{mockUser.points}</div>
                <div className="text-xs text-slate-400">Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">{mockUser.completedModules}</div>
                <div className="text-xs text-slate-400">Modules</div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Level Progress</span>
              <span className="text-teal-400">{mockUser.experience}/{mockUser.nextLevelAt} XP</span>
            </div>
            <Progress value={levelProgress} className="h-2 bg-slate-700" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card-hover bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-400">{mockUser.points}</div>
                <div className="text-xs text-slate-400">Total Points</div>
                <Button 
                  variant="link" 
                  className="text-amber-400 text-xs p-0 mt-2"
                  onClick={() => setShowPointsShop(true)}
                >
                  Spend Points →
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card-hover bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">{mockUser.streak}</div>
                <div className="text-xs text-slate-400">Day Streak</div>
                <div className="text-xs text-slate-500 mt-2">
                  Next: {nextStreakMilestone} days 🔥
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referrals Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card-hover bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{mockUser.totalReferrals}</div>
                <div className="text-xs text-slate-400">Referrals</div>
                <div className="text-xs text-green-400 mt-2">
                  +{(mockUser.totalEarned / 1000).toFixed(0)}K MMK earned
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card-hover bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">{mockUser.completedModules}</div>
                <div className="text-xs text-slate-400">/{mockUser.totalModules} Modules</div>
                <div className="text-xs text-slate-500 mt-2">
                  {Math.round((mockUser.completedModules / mockUser.totalModules) * 100)}% complete
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Streak Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            Streak Progress
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {streakMilestones.map((milestone) => (
              <div
                key={milestone}
                className={`flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
                  mockUser.streak >= milestone
                    ? 'bg-gradient-to-br from-orange-500 to-red-500'
                    : mockUser.streak >= milestone - 2
                    ? 'bg-orange-500/20 border border-orange-500/30'
                    : 'bg-slate-800'
                }`}
              >
                <span className={`text-lg font-bold ${
                  mockUser.streak >= milestone ? 'text-white' : 'text-slate-400'
                }`}>
                  {milestone}
                </span>
                <span className="text-xs text-slate-300">days</span>
                {mockUser.streak >= milestone && (
                  <Trophy className="h-3 w-3 text-amber-300 mt-1" />
                )}
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm mt-4">
            🎯 {nextStreakMilestone - mockUser.streak} more days to unlock +{(nextStreakMilestone / 2) * 5} bonus points!
          </p>
        </motion.div>

        {/* Traits & Zodiac */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Your Traits & Zodiac
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400"
              onClick={() => setShowTraits(!showTraits)}
            >
              View Details
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-base px-4 py-2">
              {mockUser.zodiac}
            </Badge>
            {mockUser.traits.map((trait) => (
              <Badge
                key={trait}
                className="bg-teal-500/20 text-teal-300 border-teal-500/30"
              >
                {trait}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Daily Bonus CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-card bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/30">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                  <Gift className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Daily Bonus Available!</h3>
                  <p className="text-slate-400 text-sm burmese-text">
                    နေ့စဉ်အပိုဆုကြေးရယူပါ
                  </p>
                </div>
              </div>
              <Button className="btn-teal">
                <Zap className="mr-2 h-4 w-4" />
                Claim +10 Points
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Simple zodiac icon component
function ZodiacSign({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
