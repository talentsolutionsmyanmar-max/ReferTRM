'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Play, 
  Lock, 
  CheckCircle,
  BookOpen,
  Target,
  Award,
  Volume2,
  Wifi,
  Eye,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: string;
  icon: React.ElementType;
  title: string;
  titleMm: string;
  description: string;
  modules: number;
  completedModules: number;
  duration: string;
  points: number;
  color: string;
  level: string;
}

const tracks: Track[] = [
  {
    id: 'recruitment',
    icon: Users,
    title: 'Recruitment Fundamentals',
    titleMm: 'အလုပ်စုံရှာဖွေရေး အခြေခံများ',
    description: 'Master the art of finding and placing top talent',
    modules: 8,
    completedModules: 2,
    duration: '2 hours',
    points: 300,
    color: 'from-teal-500 to-emerald-500',
    level: 'Beginner',
  },
  {
    id: 'sales-marketing',
    icon: TrendingUp,
    title: 'Sales & Marketing',
    titleMm: 'အရောင်းနှင့် မာကတ်တင်း',
    description: 'Learn to promote jobs and attract candidates effectively',
    modules: 6,
    completedModules: 0,
    duration: '1.5 hours',
    points: 250,
    color: 'from-blue-500 to-indigo-500',
    level: 'Intermediate',
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Communication Skills',
    titleMm: 'ဆက်သွယ်ရေး ကျွမ်းကျင်မှုများ',
    description: 'Build rapport with candidates and companies',
    modules: 5,
    completedModules: 0,
    duration: '1 hour',
    points: 200,
    color: 'from-purple-500 to-pink-500',
    level: 'Beginner',
  },
  {
    id: 'ai-ml',
    icon: Brain,
    title: 'AI & Technology',
    titleMm: 'AI နှင့် နည်းပညာ',
    description: 'Understand AI fundamentals for tech recruitment',
    modules: 10,
    completedModules: 0,
    duration: '3 hours',
    points: 400,
    color: 'from-amber-500 to-orange-500',
    level: 'Advanced',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Academy() {
  const [textMode, setTextMode] = useState(false);
  const [lowData, setLowData] = useState(false);

  return (
    <section id="academy" className="py-20 px-4 relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">
            <GraduationCap className="h-4 w-4 mr-1" />
            Learning Hub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-white">Learning </span>
            <span className="text-gradient-teal">Tracks</span>
          </h2>
          <p className="text-slate-400 burmese-text text-lg">
            သင်ကြားရေးလမ်းကြောင်းများ
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-teal-400">4</div>
            <div className="text-sm text-slate-400">Tracks</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">29</div>
            <div className="text-sm text-slate-400">Modules</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">1,150</div>
            <div className="text-sm text-slate-400">Points</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">2/8</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
        </motion.div>

        {/* Learning Tracks Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {tracks.map((track) => {
            const progress = Math.round((track.completedModules / track.modules) * 100);
            
            return (
              <motion.div key={track.id} variants={itemVariants}>
                <Card className="glass-card-hover h-full group bg-slate-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <track.icon className="h-7 w-7 text-white" />
                      </div>

                      {/* Title & Level */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                            {track.title}
                          </h3>
                        </div>
                        <p className="text-slate-500 text-sm burmese-text">
                          {track.titleMm}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${
                            track.level === 'Beginner' ? 'border-green-500/50 text-green-400' :
                            track.level === 'Intermediate' ? 'border-amber-500/50 text-amber-400' :
                            'border-red-500/50 text-red-400'
                          }`}
                        >
                          {track.level}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4">
                      {track.description}
                    </p>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-400">
                          <BookOpen className="h-4 w-4 inline mr-1" />
                          {track.completedModules}/{track.modules} modules
                        </span>
                        <span className="text-sm font-medium text-teal-400">
                          {progress}%
                        </span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2 bg-slate-700"
                      />
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {track.duration}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Award className="h-4 w-4" />
                        +{track.points} pts
                      </span>
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        track.completedModules > 0 ? 'btn-teal' : 'btn-outline-teal'
                      }`}
                    >
                      {track.completedModules > 0 ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Track
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Level Progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="glass-card bg-slate-800/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                Level Progression & Rewards
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { level: 'Amateur', points: '0-299', bonus: '1x', icon: '🌱', color: 'text-green-400' },
                  { level: 'Professional', points: '300-599', bonus: '1.25x', icon: '⭐', color: 'text-blue-400' },
                  { level: 'Expert', points: '600-899', bonus: '1.5x', icon: '🏆', color: 'text-purple-400' },
                  { level: 'Master', points: '900+', bonus: '2x', icon: '👑', color: 'text-amber-400' },
                ].map((item) => (
                  <div key={item.level} className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className={`font-bold ${item.color}`}>{item.level}</div>
                    <div className="text-sm text-slate-400">{item.points} pts</div>
                    <div className="text-amber-400 font-semibold mt-1">{item.bonus} Bonus</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-500 text-sm burmese-text mt-4">
                သင်ခန်းစာများ ပြီးမြောက်ပါက အဆင့်မြှင့်တင်ပြီး ဆုကြေးများ ပိုမိုရရှိပါမည်
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Utility Buttons - Text Mode & Low Data */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="fixed bottom-6 right-6 flex flex-col gap-2 z-40"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTextMode(!textMode)}
            className={`${textMode ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-slate-800/80 border-white/10 text-slate-300'} backdrop-blur-xl`}
          >
            <Eye className="h-4 w-4 mr-2" />
            Text Mode
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLowData(!lowData)}
            className={`${lowData ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-slate-800/80 border-white/10 text-slate-300'} backdrop-blur-xl`}
          >
            <Wifi className="h-4 w-4 mr-2" />
            Low Data
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
