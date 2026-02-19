'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Flame,
  Trophy,
  Users,
  BookOpen,
  Gift,
  Zap,
  Copy,
  Share2,
  Crown,
  Briefcase,
  Check,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const quickActions = [
  { icon: BookOpen, label: 'Continue Learning', href: '/dashboard/academy', color: 'from-purple-500 to-pink-500' },
  { icon: Briefcase, label: 'Browse Jobs', href: '/dashboard/jobs', color: 'from-teal-500 to-emerald-500' },
  { icon: Users, label: 'Invite Friends', href: '/dashboard/referrals', color: 'from-amber-500 to-orange-500' },
  { icon: Gift, label: 'Redeem Points', href: '/dashboard/rewards', color: 'from-cyan-500 to-blue-500' },
];

const levelColors: Record<string, string> = {
  Amateur: 'text-green-400',
  Professional: 'text-blue-400',
  Expert: 'text-purple-400',
  Master: 'text-amber-400',
};

const levelIcons: Record<string, string> = {
  Amateur: '🌱',
  Professional: '💼',
  Expert: '⭐',
  Master: '👑',
};

const STREAK_MILESTONES = [
  { days: 3, bonus: 5 },
  { days: 7, bonus: 10 },
  { days: 14, bonus: 20 },
  { days: 30, bonus: 35 },
  { days: 60, bonus: 50 },
  { days: 100, bonus: 75 },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const { user, loading } = useAuth();
  
  const streak = user?.streak || 1;
  const points = user?.points || 50;
  const maxStreak = user?.maxStreak || 1;
  const level = user?.level || 'Amateur';
  const displayName = user?.displayName || user?.name || 'Demo User';
  const referralCode = user?.referralCode || 'REFXXXXX';

  const nextMilestone = STREAK_MILESTONES.find(m => m.days > streak) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];
  const nextBonus = STREAK_MILESTONES.find(m => m.days > streak)?.bonus || 75;

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <Link href="/dashboard/settings" className="relative group">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-teal-500/50 shadow-lg shadow-teal-500/25 group-hover:border-teal-400 transition-colors bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl">
                🧑
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 shadow">
                Lv.{level === 'Amateur' ? 1 : level === 'Professional' ? 2 : level === 'Expert' ? 3 : 4}
              </div>
            </Link>

            {/* User Info */}
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Welcome back, {displayName}! 👋
              </h1>
              <p className="text-muted-foreground mb-3">
                ကောင်းသောနေ့လေးပါ
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${levelColors[level]} bg-white/5 border-current`}>
                  <Crown className="h-3 w-3 mr-1" />
                  {level} {levelIcons[level]}
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  <Flame className="h-3 w-3 mr-1" />
                  {streak} Day Streak
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Star className="h-3 w-3 mr-1" />
                  {points.toLocaleString()} pts
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{points.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">{user?.completedModules?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{user?.successfulReferrals || 0}</div>
              <div className="text-sm text-muted-foreground">Referrals</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Level Progress</span>
            <span className="text-teal-400">{points} / {level === 'Master' ? '∞' : (level === 'Expert' ? 1000 : level === 'Professional' ? 600 : 300)} XP</span>
          </div>
          <Progress value={level === 'Master' ? 100 : (level === 'Expert' ? ((points - 600) / 400) * 100 : level === 'Professional' ? ((points - 300) / 300) * 100 : (points / 300) * 100)} className="h-3 bg-secondary" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Points Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card-hover bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
            <CardContent className="p-5">
              <Star className="h-8 w-8 text-amber-400 mb-4" />
              <div className="text-3xl font-bold text-amber-400 mb-1">{points.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Streak Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card-hover bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardContent className="p-5">
              <Flame className="h-8 w-8 text-orange-400 mb-4" />
              <div className="text-3xl font-bold text-orange-400 mb-1">{streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
              <p className="text-xs text-muted-foreground mt-2">Best: {maxStreak}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referrals Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card-hover bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-5">
              <Users className="h-8 w-8 text-green-400 mb-4" />
              <div className="text-3xl font-bold text-green-400 mb-1">{user?.totalReferrals || 0}</div>
              <div className="text-sm text-muted-foreground">Total Referrals</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card-hover bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-5">
              <BookOpen className="h-8 w-8 text-purple-400 mb-4" />
              <div className="text-3xl font-bold text-purple-400 mb-1">{user?.completedModules?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Modules Done</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Streak Milestones */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-400" />
                  Streak Milestones
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {STREAK_MILESTONES.map((milestone, index) => {
                    const isCompleted = streak >= milestone.days;
                    const isCurrent = streak < milestone.days && (STREAK_MILESTONES[index - 1]?.days || 0) <= streak;
                    
                    return (
                      <div
                        key={milestone.days}
                        className={`flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center relative ${
                          isCompleted
                            ? 'bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25'
                            : isCurrent
                            ? 'bg-orange-500/20 border-2 border-orange-500/50'
                            : 'bg-secondary'
                        }`}
                      >
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2">
                            <Trophy className="h-5 w-5 text-amber-300" />
                          </div>
                        )}
                        <span className={`text-2xl font-bold ${isCompleted ? 'text-white' : 'text-muted-foreground'}`}>
                          {milestone.days}
                        </span>
                        <span className="text-xs text-slate-300">days</span>
                        <span className={`text-xs mt-1 ${isCompleted ? 'text-amber-200' : 'text-muted-foreground'}`}>
                          +{milestone.bonus} pts
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  🎯 <span className="text-teal-400">{nextMilestone.days - streak} more days</span> to unlock +{nextBonus} bonus points!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referral Code */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="glass-card bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-teal-400" />
                  Share & Earn
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">Your unique referral code</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-4 py-3 bg-secondary rounded-xl text-teal-400 font-mono text-lg">
                        {referralCode}
                      </code>
                      <Button variant="outline" className="border-border" onClick={copyReferralCode}>
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="btn-primary">
                      Share on Telegram
                    </Button>
                    <Button variant="outline" className="border-border">
                      Copy Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Explore Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-foreground">Explore Features</h3>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/dashboard/leaderboard">
                  <div className="p-4 rounded-xl bg-secondary hover:bg-muted transition-colors cursor-pointer text-center">
                    <Trophy className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                    <span className="text-sm text-foreground">Leaderboard</span>
                  </div>
                </Link>
                <Link href="/dashboard/companies">
                  <div className="p-4 rounded-xl bg-secondary hover:bg-muted transition-colors cursor-pointer text-center">
                    <Building2 className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                    <span className="text-sm text-foreground">Companies</span>
                  </div>
                </Link>
                <Link href="/dashboard/community">
                  <div className="p-4 rounded-xl bg-secondary hover:bg-muted transition-colors cursor-pointer text-center">
                    <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <span className="text-sm text-foreground">Community</span>
                  </div>
                </Link>
                <Link href="/dashboard/jobs">
                  <div className="p-4 rounded-xl bg-secondary hover:bg-muted transition-colors cursor-pointer text-center">
                    <Briefcase className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <span className="text-sm text-foreground">Jobs</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-foreground">Quick Actions</h3>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 border-border hover:border-primary/50 bg-secondary/30">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs text-foreground/80">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Prize Pool */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Card className="glass-card bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="p-5 text-center">
                <Trophy className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-400 mb-1">300,000 MMK</div>
                <div className="text-sm text-muted-foreground">Monthly Prize Pool</div>
                <Link href="/dashboard/leaderboard">
                  <Button className="mt-4 btn-primary w-full" size="sm">
                    View Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
