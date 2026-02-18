'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Flame,
  Star,
  Users,
  Crown,
  Target,
  TrendingUp,
  Gift,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  value: number;
  streak?: number;
  referrals?: number;
  points?: number;
  badge?: string;
  isCurrentUser?: boolean;
}

const tabs = [
  { id: 'referrers', label: 'Top Referrers', labelMm: 'ထိပ်တန်း ရည်ညွှန်းသူများ', icon: Users },
  { id: 'learners', label: 'Top Learners', labelMm: 'ထိပ်တန်း သင်ယူသူများ', icon: Star },
  { id: 'streak', label: 'Streak Champions', labelMm: 'ဆက်တိုက် အောင်မြင်သူများ', icon: Flame },
];

const periods = [
  { id: 'weekly', label: 'This Week', labelMm: 'ယခုသီတင်းပတ်' },
  { id: 'monthly', label: 'This Month', labelMm: 'ယခုလ' },
  { id: 'alltime', label: 'All Time', labelMm: 'အချိန်အားလုံး' },
];

// Generate period-specific data
const generatePeriodData = (baseData: LeaderboardUser[], period: string) => {
  const multiplier = period === 'weekly' ? 0.25 : period === 'monthly' ? 0.6 : 1;
  return baseData.map(user => ({
    ...user,
    value: Math.round(user.value * multiplier),
    referrals: user.referrals ? Math.round(user.referrals * multiplier) : undefined,
    points: user.points ? Math.round(user.points * multiplier) : undefined,
    streak: period === 'alltime' ? user.streak : Math.round((user.streak || 0) * multiplier * 0.8),
  })).sort((a, b) => b.value - a.value).map((user, index) => ({ ...user, rank: index + 1 }));
};

// Mock leaderboard data
const topReferrers: LeaderboardUser[] = [
  { rank: 1, id: '1', name: 'Thidar Aung', avatar: '👩‍💼', value: 12, referrals: 12, points: 2450, badge: '🥇' },
  { rank: 2, id: '2', name: 'Zaw Min', avatar: '👨‍💼', value: 10, referrals: 10, points: 2100, badge: '🥈' },
  { rank: 3, id: '3', name: 'Mya Thein', avatar: '👩‍💻', value: 8, referrals: 8, points: 1850, badge: '🥉' },
  { rank: 4, id: '4', name: 'Aung Ko', avatar: '👨‍🔧', value: 6, referrals: 6, points: 1500 },
  { rank: 5, id: '5', name: 'Su Lwin', avatar: '👩‍🎓', value: 5, referrals: 5, points: 1200 },
  { rank: 6, id: '6', name: 'Than Htike', avatar: '👨‍🎨', value: 4, referrals: 4, points: 950 },
  { rank: 7, id: '7', name: 'Khin Myat', avatar: '👩‍🏫', value: 3, referrals: 3, points: 700 },
  { rank: 8, id: '8', name: 'Hla Win', avatar: '👨‍⚕️', value: 2, referrals: 2, points: 450 },
];

const topLearners: LeaderboardUser[] = [
  { rank: 1, id: '1', name: 'Mya Thein', avatar: '👩‍💻', value: 2850, points: 2850, badge: '🥇' },
  { rank: 2, id: '2', name: 'Zaw Min', avatar: '👨‍💼', value: 2450, points: 2450, badge: '🥈' },
  { rank: 3, id: '3', name: 'Thidar Aung', avatar: '👩‍💼', value: 2100, points: 2100, badge: '🥉' },
  { rank: 4, id: '4', name: 'Pyae Sone', avatar: '👨‍🎓', value: 1800, points: 1800 },
  { rank: 5, id: '5', name: 'Aye Myat', avatar: '👩‍🎨', value: 1550, points: 1550 },
  { rank: 6, id: '6', name: 'Min Thant', avatar: '👨‍💻', value: 1300, points: 1300 },
  { rank: 7, id: '7', name: 'Su Lwin', avatar: '👩‍🎓', value: 1200, points: 1200 },
  { rank: 8, id: '8', name: 'Than Htike', avatar: '👨‍🎨', value: 950, points: 950 },
];

const streakChampions: LeaderboardUser[] = [
  { rank: 1, id: '1', name: 'Mya Thein', avatar: '👩‍💻', value: 45, streak: 45, points: 2850, badge: '🥇' },
  { rank: 2, id: '2', name: 'Zaw Min', avatar: '👨‍💼', value: 38, streak: 38, points: 2450, badge: '🥈' },
  { rank: 3, id: '3', name: 'Aye Myat', avatar: '👩‍🎨', value: 32, streak: 32, points: 1550, badge: '🥉' },
  { rank: 4, id: '4', name: 'Pyae Sone', avatar: '👨‍🎓', value: 28, streak: 28, points: 1800 },
  { rank: 5, id: '5', name: 'Thidar Aung', avatar: '👩‍💼', value: 21, streak: 21, points: 2100 },
  { rank: 6, id: '6', name: 'Min Thant', avatar: '👨‍💻', value: 17, streak: 17, points: 1300 },
  { rank: 7, id: '7', name: 'Su Lwin', avatar: '👩‍🎓', value: 14, streak: 14, points: 1200 },
  { rank: 8, id: '8', name: 'Aung Ko', avatar: '👨‍🔧', value: 10, streak: 10, points: 1500 },
];

const prizePool = {
  total: 300000,
  currency: 'MMK',
  distribution: [
    { rank: 1, amount: 150000, percent: 50 },
    { rank: 2, amount: 90000, percent: 30 },
    { rank: 3, amount: 60000, percent: 20 },
  ],
  daysLeft: 18,
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-lg shadow-amber-500/30';
    case 2:
      return 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900';
    case 3:
      return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    default:
      return 'bg-slate-700 text-slate-300';
  }
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('referrers');
  const [activePeriod, setActivePeriod] = useState('monthly');

  // Generate period-specific leaderboard data
  const getLeaderboardData = useMemo(() => {
    let baseData: LeaderboardUser[];
    switch (activeTab) {
      case 'referrers':
        baseData = topReferrers;
        break;
      case 'learners':
        baseData = topLearners;
        break;
      case 'streak':
        baseData = streakChampions;
        break;
      default:
        baseData = topReferrers;
    }
    return generatePeriodData(baseData, activePeriod);
  }, [activeTab, activePeriod]);

  const getValueLabel = () => {
    switch (activeTab) {
      case 'referrers':
        return 'Successful Referrals';
      case 'learners':
        return 'Total Points';
      case 'streak':
        return 'Day Streak';
      default:
        return 'Value';
    }
  };

  const getValueIcon = () => {
    switch (activeTab) {
      case 'referrers':
        return Users;
      case 'learners':
        return Star;
      case 'streak':
        return Flame;
      default:
        return Trophy;
    }
  };

  const ValueIcon = getValueIcon();
  const leaderboardData = getLeaderboardData;

  // Calculate user's rank based on period
  const userRank = activePeriod === 'weekly' ? 23 : activePeriod === 'monthly' ? 15 : 42;
  const userValue = activeTab === 'referrers' 
    ? Math.round((user?.successfulReferrals || 1) * (activePeriod === 'weekly' ? 0.25 : activePeriod === 'monthly' ? 0.6 : 1))
    : activeTab === 'learners' 
    ? Math.round((user?.points || 450) * (activePeriod === 'weekly' ? 0.25 : activePeriod === 'monthly' ? 0.6 : 1))
    : Math.round((user?.streak || 7) * (activePeriod === 'weekly' ? 0.25 : activePeriod === 'monthly' ? 0.6 : 1));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="h-7 w-7 text-amber-400" />
            Leaderboard
          </h1>
          <p className="text-slate-400 burmese-text">ခေါင်းဆောင်ဘုတ် - အဆောက်အဦများ</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm">
            <Gift className="h-4 w-4 mr-1" />
            {prizePool.total.toLocaleString()} {prizePool.currency} Prize Pool
          </Badge>
        </div>
      </div>

      {/* Prize Pool Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass-card bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-amber-500/20 overflow-hidden relative">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0"
            />
          </div>
          
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Gift className="h-6 w-6 text-amber-400" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white">Monthly Prize Pool</h2>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 ml-2 animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm mb-2">
                  Win real cash rewards! Top performers each month win MMK prizes.
                </p>
                <div className="text-slate-500 text-xs burmese-text">
                  လစဉ်ဆုကြေးဖြင့် အောင်မြင်သူများကို ဆုချီးမြှင့်ပါသည်
                </div>
              </div>
              
              <div className="text-center">
                <motion.div 
                  className="text-4xl font-bold text-amber-400 mb-1"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {prizePool.total.toLocaleString()}
                </motion.div>
                <div className="text-slate-400">MMK Total</div>
                <Badge className="mt-2 bg-red-500/20 text-red-400 border-red-500/30">
                  🔥 {prizePool.daysLeft} days left
                </Badge>
              </div>
            </div>

            {/* Prize Distribution */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {prizePool.distribution.map((prize, index) => (
                <motion.div
                  key={prize.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center p-4 rounded-xl ${
                    prize.rank === 1 
                      ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30' 
                      : prize.rank === 2 
                        ? 'bg-gradient-to-br from-slate-400/10 to-slate-500/10 border border-slate-400/20'
                        : 'bg-gradient-to-br from-amber-700/10 to-orange-700/10 border border-amber-700/20'
                  }`}
                >
                  <motion.div 
                    className="text-2xl mb-1"
                    animate={prize.rank === 1 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {prize.rank === 1 ? '🥇' : prize.rank === 2 ? '🥈' : '🥉'}
                  </motion.div>
                  <div className="text-white font-bold text-lg">{prize.amount.toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">MMK</div>
                  <div className="text-xs text-slate-500 mt-1">{prize.percent}% of pool</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-slate-900'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 ml-auto">
          {periods.map((period) => (
            <motion.button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePeriod === period.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Your Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{user?.avatar || '🧑'}</div>
              <div>
                <div className="text-white font-medium">{user?.displayName || 'You'}</div>
                <div className="text-slate-400 text-sm">
                  Rank #{userRank} • {userValue} {getValueLabel().toLowerCase()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-teal-400 font-bold">#{userRank}</div>
              <div className="text-slate-500 text-xs">
                {userRank <= 3 ? '🏆 Prize winner!' : `${userRank - 3} spots to prize`}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboardData.map((leaderUser, index) => (
          <motion.div
            key={leaderUser.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`glass-card-hover ${
              leaderUser.rank <= 3 
                ? 'bg-gradient-to-r from-slate-800/50 to-slate-900/50' 
                : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${getRankStyle(leaderUser.rank)}`}>
                    {leaderUser.rank <= 3 ? leaderUser.badge : leaderUser.rank}
                  </div>

                  {/* Avatar */}
                  <div className="text-3xl">{leaderUser.avatar}</div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium truncate">{leaderUser.name}</span>
                      {leaderUser.rank <= 3 && (
                        <Crown className="h-4 w-4 text-amber-400" />
                      )}
                    </div>
                    <div className="text-slate-500 text-sm flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      {leaderUser.points?.toLocaleString() || 0} total points
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold">
                      {activeTab === 'streak' && <Flame className="h-5 w-5 text-orange-400" />}
                      {activeTab === 'referrers' && <Users className="h-5 w-5 text-green-400" />}
                      {activeTab === 'learners' && <Star className="h-5 w-5 text-amber-400" />}
                      <span className={activeTab === 'streak' ? 'text-orange-400' : activeTab === 'referrers' ? 'text-green-400' : 'text-amber-400'}>
                        {leaderUser.value}
                      </span>
                    </div>
                    <div className="text-slate-500 text-xs">{getValueLabel()}</div>
                  </div>

                  {/* Prize indicator */}
                  {leaderUser.rank <= 3 && (
                    <div className="hidden sm:block">
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        {prizePool.distribution[leaderUser.rank - 1].amount.toLocaleString()} MMK
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* How to Climb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-400" />
              How to Climb the Leaderboard
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50">
                <Users className="h-8 w-8 text-green-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Refer More</h4>
                <p className="text-slate-400 text-sm">Every successful referral earns you points and climbs your rank.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50">
                <Star className="h-8 w-8 text-amber-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Complete Courses</h4>
                <p className="text-slate-400 text-sm">Finish modules and tracks to earn more points daily.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50">
                <Flame className="h-8 w-8 text-orange-400 mb-2" />
                <h4 className="text-white font-medium mb-1">Keep Your Streak</h4>
                <p className="text-slate-400 text-sm">Login daily to maintain and grow your streak bonus.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
