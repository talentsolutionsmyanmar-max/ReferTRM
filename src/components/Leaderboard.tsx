'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users, Flame, Crown, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardEntry {
  rank: number;
  name: string;
  nameMm: string;
  avatar: string;
  value: number;
  change: number; // Position change
  level: string;
  isYou?: boolean;
}

const leaderboardData = {
  points: [
    { rank: 1, name: 'Myat Thu', nameMm: 'မြတ်သူ', avatar: '👨‍💼', value: 2450, change: 0, level: 'Master' },
    { rank: 2, name: 'Su Hlaing', nameMm: 'စုလှိုင်', avatar: '👩‍💼', value: 2180, change: 2, level: 'Expert' },
    { rank: 3, name: 'Aung Min', nameMm: 'အောင်မင်း', avatar: '👨‍💻', value: 1950, change: -1, level: 'Expert' },
    { rank: 4, name: 'Thiri Aung', nameMm: 'သီရိအောင်', avatar: '👩‍🎨', value: 1650, change: 1, level: 'Professional', isYou: true },
    { rank: 5, name: 'Kyaw Zin', nameMm: 'ကျော်ဇင်', avatar: '👨‍🔬', value: 1520, change: 0, level: 'Professional' },
    { rank: 6, name: 'Nwe Nwe', nameMm: 'နွဲ့နွဲ့', avatar: '👩‍🏫', value: 1380, change: 3, level: 'Professional' },
    { rank: 7, name: 'Zaw Zaw', nameMm: 'ဇော်ဇော်', avatar: '👨‍🔧', value: 1250, change: -2, level: 'Professional' },
    { rank: 8, name: 'Hla Hla', nameMm: 'လှလှ', avatar: '👩‍⚕️', value: 1180, change: 0, level: 'Professional' },
    { rank: 9, name: 'Min Min', nameMm: 'မင်းမင်း', avatar: '👨‍🎤', value: 1050, change: 1, level: 'Professional' },
    { rank: 10, name: 'Yu Yu', nameMm: 'ယုယု', avatar: '👩‍🚀', value: 980, change: -1, level: 'Professional' },
  ],
  referrals: [
    { rank: 1, name: 'Aung Min', nameMm: 'အောင်မင်း', avatar: '👨‍💻', value: 15, change: 0, level: 'Master' },
    { rank: 2, name: 'Myat Thu', nameMm: 'မြတ်သူ', avatar: '👨‍💼', value: 12, change: 1, level: 'Expert' },
    { rank: 3, name: 'Thiri Aung', nameMm: 'သီရိအောင်', avatar: '👩‍🎨', value: 8, change: 2, level: 'Professional', isYou: true },
    { rank: 4, name: 'Su Hlaing', nameMm: 'စုလှိုင်', avatar: '👩‍💼', value: 7, change: -2, level: 'Expert' },
    { rank: 5, name: 'Zaw Zaw', nameMm: 'ဇော်ဇော်', avatar: '👨‍🔧', value: 6, change: 0, level: 'Professional' },
  ],
  streak: [
    { rank: 1, name: 'Myat Thu', nameMm: 'မြတ်သူ', avatar: '👨‍💼', value: 45, change: 0, level: 'Master' },
    { rank: 2, name: 'Su Hlaing', nameMm: 'စုလှိုင်', avatar: '👩‍💼', value: 38, change: 0, level: 'Expert' },
    { rank: 3, name: 'Thiri Aung', nameMm: 'သီရိအောင်', avatar: '👩‍🎨', value: 7, change: 5, level: 'Professional', isYou: true },
    { rank: 4, name: 'Aung Min', nameMm: 'အောင်မင်း', avatar: '👨‍💻', value: 21, change: -1, level: 'Expert' },
    { rank: 5, name: 'Nwe Nwe', nameMm: 'နွဲ့နွဲ့', avatar: '👩‍🏫', value: 18, change: 2, level: 'Professional' },
  ],
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return { icon: Crown, color: 'text-amber-400', bg: 'bg-amber-500/20' };
  if (rank === 2) return { icon: Medal, color: 'text-slate-300', bg: 'bg-slate-400/20' };
  if (rank === 3) return { icon: Award, color: 'text-orange-400', bg: 'bg-orange-500/20' };
  return null;
};

const levelColors: Record<string, string> = {
  Amateur: 'text-green-400',
  Professional: 'text-blue-400',
  Expert: 'text-purple-400',
  Master: 'text-amber-400',
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('points');

  const renderLeaderboard = (data: LeaderboardEntry[], unit: string) => (
    <div className="space-y-3">
      {data.map((entry, index) => {
        const badge = getRankBadge(entry.rank);
        
        return (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-card p-4 flex items-center gap-4 ${
              entry.isYou ? 'border-teal-500/50 bg-teal-500/5' : ''
            }`}
          >
            {/* Rank */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              badge ? badge.bg : 'bg-slate-800'
            }`}>
              {badge ? (
                <badge.icon className={`h-6 w-6 ${badge.color}`} />
              ) : (
                <span className="text-slate-400 font-bold">#{entry.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-2xl">
              {entry.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">
                  {entry.name}
                  {entry.isYou && (
                    <Badge className="ml-2 bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">
                      You
                    </Badge>
                  )}
                </span>
              </div>
              <p className="text-slate-500 text-sm burmese-text">{entry.nameMm}</p>
              <Badge className={`${levelColors[entry.level]} bg-white/5 border-current text-xs mt-1`}>
                {entry.level}
              </Badge>
            </div>

            {/* Value */}
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {entry.value.toLocaleString()}
                <span className="text-slate-400 text-sm ml-1">{unit}</span>
              </div>
              {entry.change !== 0 && (
                <div className={`text-xs flex items-center justify-end gap-1 ${
                  entry.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`h-3 w-3 ${entry.change < 0 ? 'rotate-180' : ''}`} />
                  {entry.change > 0 ? '+' : ''}{entry.change}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section id="leaderboard" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-amber-400" />
            <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
          </div>
          <p className="text-slate-400 burmese-text">အဆင့်သတ်မှတ်ချက်</p>
        </motion.div>

        <Tabs defaultValue="points" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-800/50">
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Points
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Streak
            </TabsTrigger>
          </TabsList>

          <TabsContent value="points">
            {renderLeaderboard(leaderboardData.points, 'pts')}
          </TabsContent>
          <TabsContent value="referrals">
            {renderLeaderboard(leaderboardData.referrals, 'hires')}
          </TabsContent>
          <TabsContent value="streak">
            {renderLeaderboard(leaderboardData.streak, 'days')}
          </TabsContent>
        </Tabs>

        {/* Monthly Prize Pool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="glass-card bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
            <CardContent className="p-6 text-center">
              <Crown className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Monthly Prize Pool: 300,000 MMK
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Top 10 referrers each month share the prize pool!
              </p>
              <p className="text-slate-500 text-xs burmese-text">
                တစ်လလျှင် ထိပ်တန်း ရည်ညွှန်းသူ ၁၀ ဦးသည် ဆုကြေးကို ဝေမျှရမည်!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
