'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Gift,
  Calendar,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Sparkles,
  Zap,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CheckinData {
  lastCheckin: string | null;
  streak: number;
  maxStreak: number;
  totalCheckins: number;
  checkinDates: string[];
  rewards: { date: string; points: number; type: string }[];
}

const CHECKIN_STORAGE_KEY = 'refertrm_daily_checkin';

const DAILY_REWARDS = [
  { day: 1, points: 10, label: 'Day 1', icon: Star },
  { day: 2, points: 15, label: 'Day 2', icon: Star },
  { day: 3, points: 25, label: 'Day 3', icon: Gift, bonus: true },
  { day: 4, points: 15, label: 'Day 4', icon: Star },
  { day: 5, points: 20, label: 'Day 5', icon: Star },
  { day: 6, points: 25, label: 'Day 6', icon: Star },
  { day: 7, points: 50, label: 'Week!', icon: Trophy, bonus: true },
  { day: 14, points: 100, label: '2 Weeks!', icon: Award, bonus: true },
  { day: 30, points: 200, label: 'Month!', icon: Crown, bonus: true, special: true },
];

const MILESTONES = [3, 7, 14, 30];

const MOTIVATIONAL_MESSAGES = [
  "Keep going! You're building a great habit! 🔥",
  "Consistency is key! Stay strong! 💪",
  "Amazing streak! Don't break it now! ⭐",
  "You're on fire! Keep it up! 🔥",
  "Incredible dedication! You're crushing it! 🏆",
];

const Crown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L9 9L1 8L6 14L4 22H20L18 14L23 8L15 9L12 1Z" />
  </svg>
);

const getInitialData = (): CheckinData => {
  // Initialize from localStorage if available (client-side only)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(CHECKIN_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Check if streak is broken
        const today = new Date().toDateString();
        if (data.lastCheckin && data.lastCheckin !== today) {
          const lastCheckinDate = new Date(data.lastCheckin);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastCheckinDate.toDateString() !== yesterday.toDateString()) {
            // Streak broken - reset in initial data
            const updatedData = { ...data, streak: 0 };
            localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(updatedData));
            return updatedData;
          }
        }
        return data;
      } catch {
        // Invalid data, return defaults
      }
    }
  }
  return {
    lastCheckin: null,
    streak: 0,
    maxStreak: 0,
    totalCheckins: 0,
    checkinDates: [],
    rewards: [],
  };
};

// Get whether we should show modal on mount
const shouldShowModalOnMount = (data: CheckinData): boolean => {
  const today = new Date().toDateString();
  return data.lastCheckin !== today;
};

export default function DailyCheckin() {
  const [checkinData, setCheckinData] = useState<CheckinData>(getInitialData);
  const [showModal, setShowModal] = useState(() => shouldShowModalOnMount(getInitialData()));
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Delay showing modal for better UX
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        // Modal is already set to show, just need the delay
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleCheckin = () => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak = 1;
    if (checkinData.lastCheckin === yesterday.toDateString()) {
      newStreak = checkinData.streak + 1;
    }
    
    // Calculate points
    let points = 10 + Math.round(newStreak * 0.5);
    
    // Check for milestone bonuses
    if (MILESTONES.includes(newStreak)) {
      const milestone = DAILY_REWARDS.find(r => r.day === newStreak);
      if (milestone) {
        points += milestone.points;
      }
    }
    
    const newData: CheckinData = {
      lastCheckin: today,
      streak: newStreak,
      maxStreak: Math.max(checkinData.maxStreak, newStreak),
      totalCheckins: checkinData.totalCheckins + 1,
      checkinDates: [...checkinData.checkinDates, today],
      rewards: [...checkinData.rewards, { date: today, points, type: 'daily' }],
    };
    
    setCheckinData(newData);
    localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(newData));
    setJustCheckedIn(true);
    setEarnedPoints(points);
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
      setShowModal(false);
    }, 3000);
  };

  const canCheckinToday = () => {
    const today = new Date().toDateString();
    return checkinData.lastCheckin !== today;
  };

  const isStreakBroken = () => {
    if (!checkinData.lastCheckin) return false;
    
    const lastCheckin = new Date(checkinData.lastCheckin);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return lastCheckin.toDateString() !== yesterday.toDateString() && lastCheckin.toDateString() !== new Date().toDateString();
  };

  const getNextMilestone = () => {
    const nextMilestone = MILESTONES.find(m => m > checkinData.streak);
    return nextMilestone || MILESTONES[MILESTONES.length - 1];
  };

  const getMotivationalMessage = () => {
    return MOTIVATIONAL_MESSAGES[Math.min(checkinData.streak, MOTIVATIONAL_MESSAGES.length - 1)];
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentMonth);
    const today = new Date();
    const days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = date.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      const isChecked = checkinData.checkinDates.includes(dateStr);
      const isFuture = date > today;
      
      days.push(
        <div
          key={day}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
            isToday
              ? 'ring-2 ring-teal-500 ring-offset-1 ring-offset-background'
              : ''
          } ${
            isChecked
              ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white'
              : isFuture
              ? 'text-muted-foreground/30'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          {isChecked ? <Check className="h-4 w-4" /> : day}
        </div>
      );
    }
    
    return days;
  };

  const streak = checkinData.streak;
  const nextMilestone = getNextMilestone();
  const progressToNextMilestone = ((streak % nextMilestone) / nextMilestone) * 100;

  return (
    <>
      {/* Mini Card for Dashboard */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-bold text-foreground">Daily Check-in</h3>
            </div>
            {canCheckinToday() && (
              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 animate-pulse">
                Available!
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Streak Counter */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-orange-400">{streak}</span>
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">{checkinData.totalCheckins}</div>
              <p className="text-sm text-muted-foreground">Total Check-ins</p>
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Next Milestone</span>
              <span className="text-teal-400">{nextMilestone} days</span>
            </div>
            <Progress value={progressToNextMilestone} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {nextMilestone - (streak % nextMilestone)} more days to bonus!
            </p>
          </div>

          {/* Streak Warning */}
          {isStreakBroken() && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">
                ⚠️ Your streak was broken! Start a new one today!
              </p>
            </div>
          )}

          {/* Motivational Message */}
          {streak > 0 && !isStreakBroken() && (
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {getMotivationalMessage()}
            </p>
          )}

          {/* Check-in Button */}
          <Button
            onClick={() => setShowModal(true)}
            className="w-full btn-primary gap-2"
            disabled={!canCheckinToday()}
          >
            {canCheckinToday() ? (
              <>
                <Zap className="h-4 w-4" />
                Check In Now
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Checked In Today
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Full Check-in Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-card bg-card p-6"
            >
              {/* Celebration Animation */}
              <AnimatePresence>
                {showCelebration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-card/95 z-10 rounded-xl"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center"
                      >
                        <Sparkles className="h-10 w-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">+{earnedPoints} Points!</h3>
                      <p className="text-muted-foreground">
                        {streak === 1 ? "You've started a new streak!" : `${streak} day streak! Keep it up!`}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Daily Check-in</h2>
                <p className="text-muted-foreground burmese-text">နေ့စဉ်စစ်ဆေးမှု</p>
              </div>

              {/* Streak Display */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <span className="text-4xl font-bold text-orange-400">{streak}</span>
                    <Flame className="h-8 w-8 text-orange-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400">{checkinData.maxStreak}</div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-medium text-foreground">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="w-8 h-6 text-xs text-muted-foreground font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>
              </div>

              {/* Reward Tiers */}
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">Reward Milestones</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {DAILY_REWARDS.filter(r => r.bonus).map((reward) => {
                    const isAchieved = streak >= reward.day;
                    return (
                      <div
                        key={reward.day}
                        className={`flex-shrink-0 p-2 rounded-lg text-center min-w-[60px] ${
                          isAchieved
                            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30'
                            : 'bg-secondary'
                        }`}
                      >
                        <reward.icon className={`h-4 w-4 mx-auto mb-1 ${isAchieved ? 'text-amber-400' : 'text-muted-foreground'}`} />
                        <div className={`text-xs font-bold ${isAchieved ? 'text-amber-400' : 'text-foreground'}`}>
                          +{reward.points}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{reward.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Check-in Button */}
              <Button
                onClick={handleCheckin}
                className="w-full btn-primary gap-2"
                disabled={!canCheckinToday()}
              >
                {canCheckinToday() ? (
                  <>
                    <Gift className="h-4 w-4" />
                    Check In & Earn Points
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Already Checked In Today
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
