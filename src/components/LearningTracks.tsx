'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Play, 
  BookOpen,
  Target,
  Award,
  Eye,
  Wifi,
  GraduationCap,
  Check,
  Lock,
  Download,
  Share2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: string;
  title: string;
  titleMm: string;
  duration: string;
  points: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
}

interface Track {
  id: string;
  icon: React.ElementType;
  title: string;
  titleMm: string;
  description: string;
  modules: Module[];
  totalPoints: number;
  color: string;
  level: string;
}

const tracks: Track[] = [
  {
    id: 'ai-resilient',
    icon: Brain,
    title: 'AI-Resilient Career Skills',
    titleMm: 'AI-ခံနိုင်ရည် အသက်မွေးဝမ်းကြောင်း ကျွမ်းကျင်မှုများ',
    description: 'Learn skills that will remain valuable in the AI era',
    color: 'from-purple-500 to-pink-500',
    level: 'Intermediate',
    totalPoints: 400,
    modules: [
      { id: 'ai-1', title: 'Understanding AI Impact', titleMm: 'AI သက်ရောက်မှုကို နားလည်ခြင်း', duration: '15 min', points: 50, status: 'completed' },
      { id: 'ai-2', title: 'Critical Thinking in AI Age', titleMm: 'AI ခေတ်တွင် ဝေဖန်တွေးခေါ်မှု', duration: '20 min', points: 60, status: 'completed' },
      { id: 'ai-3', title: 'Emotional Intelligence', titleMm: 'စိတ်ခံစားမှု ဉာဏ်ရည်', duration: '25 min', points: 70, status: 'in_progress' },
      { id: 'ai-4', title: 'Creative Problem Solving', titleMm: 'ဖန်တီးရေး ပြဿနာဖြေရှင်းမှု', duration: '30 min', points: 80, status: 'available' },
      { id: 'ai-5', title: 'Future-Proof Your Career', titleMm: 'သင့်အသက်မွေးဝမ်းကြောင်းကို အနာဂတ်ခံခိုင်မှု', duration: '20 min', points: 60, status: 'locked' },
    ],
  },
  {
    id: 'recruitment',
    icon: Users,
    title: 'Recruitment Mastery',
    titleMm: 'အလုပ်စုံရှာဖွေရေး ကျွမ်းကျင်မှု',
    description: 'Master the art of finding and placing top talent',
    color: 'from-teal-500 to-emerald-500',
    level: 'Beginner',
    totalPoints: 300,
    modules: [
      { id: 'rec-1', title: 'Introduction to Recruitment', titleMm: 'အလုပ်စုံရှာဖွေရေး မိတ်ဆက်', duration: '10 min', points: 30, status: 'completed' },
      { id: 'rec-2', title: 'Sourcing Candidates', titleMm: 'ကိုယ်စားလှယ်များ ရှာဖွေခြင်း', duration: '20 min', points: 50, status: 'in_progress' },
      { id: 'rec-3', title: 'Screening & Interviewing', titleMm: 'စစ်ဆေးမှုနှင့် အင်တာဗျူး', duration: '25 min', points: 60, status: 'locked' },
      { id: 'rec-4', title: 'Matching & Placement', titleMm: 'ကိုက်ညီမှုနှင့် ချိန်ခွင်လျှော့တွက်', duration: '20 min', points: 50, status: 'locked' },
    ],
  },
  {
    id: 'sales',
    icon: TrendingUp,
    title: 'Sales & Marketing',
    titleMm: 'အရောင်းနှင့် မာကတ်တင်း',
    description: 'Learn to promote jobs and attract candidates effectively',
    color: 'from-blue-500 to-indigo-500',
    level: 'Intermediate',
    totalPoints: 250,
    modules: [
      { id: 'sales-1', title: 'Sales Fundamentals', titleMm: 'အရောင်းအခြေခံများ', duration: '15 min', points: 40, status: 'available' },
      { id: 'sales-2', title: 'Digital Marketing Basics', titleMm: 'ဒစ်ဂျစ်တယ် မာကတ်တင်း အခြေခံ', duration: '20 min', points: 50, status: 'locked' },
      { id: 'sales-3', title: 'Social Media Outreach', titleMm: 'ဆိုရှယ်မီဒီယာ ဆက်သွယ်မှု', duration: '15 min', points: 40, status: 'locked' },
    ],
  },
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Communication Skills',
    titleMm: 'ဆက်သွယ်ရေး ကျွမ်းကျင်မှုများ',
    description: 'Build rapport with candidates and companies',
    color: 'from-amber-500 to-orange-500',
    level: 'Beginner',
    totalPoints: 200,
    modules: [
      { id: 'com-1', title: 'Professional Communication', titleMm: 'ပရော်ဖက်ရှင်နယ် ဆက်သွယ်ရေး', duration: '10 min', points: 30, status: 'available' },
      { id: 'com-2', title: 'Email & Messaging Etiquette', titleMm: 'အီးမေးလ်နှင့် မက်ဆေ့ချ် ယဉ်ကျေးမှု', duration: '15 min', points: 40, status: 'locked' },
      { id: 'com-3', title: 'Negotiation Skills', titleMm: 'ညှိနှိုင်းမှု ကျွမ်းကျင်မှု', duration: '20 min', points: 50, status: 'locked' },
    ],
  },
  {
    id: 'english',
    icon: BookOpen,
    title: 'English for Job Seekers',
    titleMm: 'အလုပ်ရှာဖွေသူများအတွက် အင်္ဂလိပ်စာ',
    description: 'Improve your English for better career opportunities',
    color: 'from-green-500 to-teal-500',
    level: 'Beginner',
    totalPoints: 350,
    modules: [
      { id: 'eng-1', title: 'Basic Business English', titleMm: 'အခြေခံ စီးပွားရေး အင်္ဂလိပ်စာ', duration: '20 min', points: 50, status: 'available' },
      { id: 'eng-2', title: 'Email Writing Skills', titleMm: 'အီးမေးလ် ရေးသားမှု ကျွမ်းကျင်မှု', duration: '15 min', points: 40, status: 'locked' },
      { id: 'eng-3', title: 'Interview English', titleMm: 'အင်တာဗျူး အင်္ဂလိပ်စာ', duration: '25 min', points: 60, status: 'locked' },
    ],
  },
  {
    id: 'finance',
    icon: Target,
    title: 'Personal Finance',
    titleMm: 'ပုဂ္ဂလိက ဘဏ္ဍာရေး',
    description: 'Learn to manage and grow your income',
    color: 'from-cyan-500 to-blue-500',
    level: 'Beginner',
    totalPoints: 200,
    modules: [
      { id: 'fin-1', title: 'Budgeting Basics', titleMm: 'ဘတ်ဂျက် အခြေခံများ', duration: '10 min', points: 30, status: 'locked' },
      { id: 'fin-2', title: 'Saving Strategies', titleMm: 'စုဆောင်းမှု မဟာဗျူဟာများ', duration: '15 min', points: 40, status: 'locked' },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: 'border-green-500/50 text-green-400',
  Intermediate: 'border-amber-500/50 text-amber-400',
  Advanced: 'border-red-500/50 text-red-400',
};

export default function LearningTracks() {
  const [textMode, setTextMode] = useState(false);
  const [lowData, setLowData] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculate overall progress
  const totalModules = tracks.reduce((sum, track) => sum + track.modules.length, 0);
  const completedModules = tracks.reduce((sum, track) => 
    sum + track.modules.filter(m => m.status === 'completed').length, 0);

  const getTrackProgress = (track: Track) => {
    const completed = track.modules.filter(m => m.status === 'completed').length;
    return Math.round((completed / track.modules.length) * 100);
  };

  const handleModuleClick = (track: Track, module: Module) => {
    if (module.status === 'locked') return;
    // In production, this would navigate to the module content
    console.log('Opening module:', module.title);
  };

  return (
    <section id="academy" className="py-16 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-teal-400">{tracks.length}</div>
            <div className="text-sm text-slate-400">Tracks</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{totalModules}</div>
            <div className="text-sm text-slate-400">Modules</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {tracks.reduce((sum, t) => sum + t.totalPoints, 0)}
            </div>
            <div className="text-sm text-slate-400">Total Points</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{completedModules}/{totalModules}</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
        </motion.div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, trackIndex) => {
            const progress = getTrackProgress(track);
            const completedCount = track.modules.filter(m => m.status === 'completed').length;
            
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: trackIndex * 0.1 }}
              >
                <Card 
                  className="glass-card-hover h-full group bg-slate-800/50 cursor-pointer"
                  onClick={() => setSelectedTrack(track)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <track.icon className="h-7 w-7 text-white" />
                      </div>

                      {/* Title & Level */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-slate-500 text-sm burmese-text">
                          {track.titleMm}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${levelColors[track.level]}`}
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
                          {completedCount}/{track.modules.length} modules
                        </span>
                        <span className="text-sm font-medium text-teal-400">
                          {progress}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-2 bg-slate-700" />
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {track.modules.length} modules
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Award className="h-4 w-4" />
                        +{track.totalPoints} pts
                      </span>
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full mt-4 ${progress > 0 ? 'btn-teal' : 'btn-outline-teal'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTrack(track);
                      }}
                    >
                      {progress === 100 ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Completed - View Certificate
                        </>
                      ) : progress > 0 ? (
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
        </div>

        {/* Utility Buttons */}
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

        {/* Track Detail Modal */}
        <AnimatePresence>
          {selectedTrack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl glass-card p-6 bg-slate-900 my-8"
              >
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Track Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedTrack.color} flex items-center justify-center`}>
                    <selectedTrack.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedTrack.title}</h2>
                    <p className="text-slate-500 burmese-text">{selectedTrack.titleMm}</p>
                  </div>
                </div>

                {/* Modules List */}
                <div className="space-y-3 mb-6">
                  {selectedTrack.modules.map((module, index) => (
                    <div
                      key={module.id}
                      onClick={() => handleModuleClick(selectedTrack, module)}
                      className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-all ${
                        module.status === 'locked' ? 'opacity-50' : 'hover:border-teal-500/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        module.status === 'completed' ? 'bg-green-500' :
                        module.status === 'in_progress' ? 'bg-teal-500' :
                        module.status === 'available' ? 'bg-slate-700' : 'bg-slate-800'
                      }`}>
                        {module.status === 'completed' ? (
                          <Check className="h-5 w-5 text-white" />
                        ) : module.status === 'locked' ? (
                          <Lock className="h-5 w-5 text-slate-500" />
                        ) : (
                          <Play className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{module.title}</h4>
                        <p className="text-slate-500 text-sm burmese-text">{module.titleMm}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 text-sm">{module.duration}</div>
                        <div className="text-amber-400 text-sm">+{module.points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certificate CTA */}
                {getTrackProgress(selectedTrack) === 100 && (
                  <div className="flex gap-4">
                    <Button className="flex-1 btn-teal">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/10">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
