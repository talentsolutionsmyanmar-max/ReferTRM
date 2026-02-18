'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sun,
  Moon,
  Sparkles,
  MessageCircle,
  Phone,
  BookOpen,
  Users,
  RotateCcw,
  Volume2,
  VolumeX,
  Shield,
  Wind,
  Waves,
  Coffee,
  AlertTriangle,
  Lock,
  Lightbulb,
  Calendar,
  EyeOff,
  Globe,
  Clock,
  Send,
  HandHeart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Myanmar Mental Health Resources
const myanmarResources = [
  { name: 'Aung Clinic Mental Health', phone: '+95 1 123 4567', description: 'Professional counseling services in Yangon', hours: '9AM - 6PM' },
  { name: 'Mental Health Myanmar', phone: '+95 9 123 456 789', description: '24/7 crisis support hotline', hours: '24/7' },
  { name: 'Telenor Light Line', phone: '0800 12345', description: 'Free emotional support calls', hours: '8AM - 10PM' },
];

const breathingExercises = [
  { name: 'Calm Mind', duration: '4 min', description: 'Simple breathing for stress relief', pattern: '4-4-4', icon: Wind, color: 'from-cyan-500 to-teal-500' },
  { name: 'Deep Relax', duration: '6 min', description: 'Extended breath for anxiety', pattern: '4-7-8', icon: Waves, color: 'from-blue-500 to-indigo-500' },
  { name: 'Energize', duration: '3 min', description: 'Morning energy boost', pattern: '6-0-6', icon: Sun, color: 'from-amber-500 to-orange-500' },
  { name: 'Sleep Well', duration: '8 min', description: 'Evening relaxation for better sleep', pattern: '4-6-8', icon: Moon, color: 'from-purple-500 to-violet-500' },
];

const supportGroups = [
  { name: 'Youth Support Circle', members: 234, description: 'Safe space for young people to share and support each other', language: 'Myanmar & English', schedule: 'Every Sunday 7PM', icon: Users },
  { name: 'Job Seekers Wellness', members: 156, description: 'Mental support during job search journey', language: 'Myanmar', schedule: 'Wednesday 8PM', icon: BriefcaseIcon },
  { name: 'Survivors Together', members: 89, description: 'Support for those who have experienced trauma', language: 'Myanmar', schedule: 'Private - Contact Admin', icon: Shield },
];

const inspiringStories = [
  { name: 'Thiri', role: 'Software Developer', story: 'After losing my job during the crisis, I fell into depression. The wellness community here helped me find hope again. Now I have a new job and mentor others.', avatar: '👩‍💻', color: 'from-teal-500 to-cyan-500' },
  { name: 'Min Khant', role: 'Fresh Graduate', story: 'The breathing exercises became my daily ritual. They helped me manage anxiety during exams and job interviews. I got my dream job!', avatar: '👨‍🎓', color: 'from-purple-500 to-pink-500' },
  { name: 'Su Myat', role: 'Teacher', story: 'I thought asking for help was weakness. The anonymous chat showed me it takes courage to seek support. Now I volunteer to help others.', avatar: '👩‍🏫', color: 'from-amber-500 to-orange-500' },
];

const dailyAffirmations = [
  'Today, I choose peace over worry. ဒီနေ့ ငါစိတ်ပူစရာအစား ငြိမ်းချမ်းရေးကို ရွေးချယ်မည်။',
  'I am stronger than my challenges. ငါ့စိန်ခေါ်မှုများထက် ငါပိုမိုအားကောင်းသည်။',
  'Every step forward is progress. ရှေ့သို့သွားသော ခြေလှမ်းတိုင်းသည် တိုးတက်မှုဖြစ်သည်။',
  'I deserve peace and happiness. ငြိမ်းချမ်းမှုနှင့် ပျော်ရွှင်မှုကို ငါထိုက်တန်သည်။',
  'My feelings are valid. ငါ့စိတ်ခံစားချက်များသည် တရားသက်သက်ဖြစ်သည်။',
];

function BriefcaseIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}

function CheckIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
}

export default function WellnessPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathTimer, setBreathTimer] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<typeof breathingExercises[0] | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'support'; message: string }[]>([
    { type: 'support', message: 'Welcome to the anonymous support space. You are safe here. How are you feeling today?' },
  ]);
  
  const dailyAffirmation = dailyAffirmations[Math.floor(Math.random() * dailyAffirmations.length)];

  const moods = [
    { emoji: '😊', label: 'Great', color: 'from-green-500 to-emerald-500' },
    { emoji: '🙂', label: 'Good', color: 'from-teal-500 to-cyan-500' },
    { emoji: '😐', label: 'Okay', color: 'from-blue-500 to-indigo-500' },
    { emoji: '😔', label: 'Low', color: 'from-purple-500 to-violet-500' },
    { emoji: '😢', label: 'Hard', color: 'from-pink-500 to-rose-500' },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([...chatMessages, { type: 'user', message: chatMessage }]);
    setChatMessage('');
    setTimeout(() => {
      const responses = ['Thank you for sharing. Your feelings are completely valid.', 'I hear you. It takes courage to express how you feel.', 'You are not alone. Many people feel this way, and there is support available.'];
      setChatMessages(prev => [...prev, { type: 'support', message: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1500);
  };

  const startExercise = (exercise: typeof breathingExercises[0]) => {
    setSelectedExercise(exercise);
    setBreathingActive(true);
    setBreathTimer(0);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden glass-card p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Heart className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Mental Wellness Corner</h1>
              <p className="text-muted-foreground burmese-text text-lg">စိတ်ကျန်းမာရေး ထောက်ပံ့ရေး ခန်းမ</p>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
            A safe space for Myanmar&apos;s youth. We understand the challenges you face, and we&apos;re here with 
            heart and soul to support you. Remember: seeking help is a sign of strength, not weakness.
          </p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Today&apos;s Affirmation</span>
            </div>
            <p className="text-lg text-foreground italic">&quot;{dailyAffirmation}&quot;</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Emergency Support Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card bg-gradient-to-r from-rose-500/10 to-red-500/10 border-rose-500/20 p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground">24/7 crisis support available • ၂၄ နာရီ ပြည့် အကူအညီ</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600"><Phone className="h-4 w-4 mr-2" />Call Now</Button>
            <Button variant="outline" className="border-rose-500/30 text-rose-400"><MessageCircle className="h-4 w-4 mr-2" />Chat Support</Button>
          </div>
        </div>
      </motion.div>

      {/* Mood Check-in */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-foreground">How are you feeling today?</h3>
                <p className="text-sm text-muted-foreground burmese-text">ဒီနေ့ ဘယ်လိုခံစားနေသလဲ</p>
              </div>
            </div>
            {selectedMood !== null && <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30"><CheckIcon className="h-3 w-3 mr-1" />Logged</Badge>}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-3">
            {moods.map((mood, index) => (
              <motion.button key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedMood(index)} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${selectedMood === index ? `bg-gradient-to-br ${mood.color} shadow-lg` : 'bg-secondary hover:bg-muted'}`}>
                <span className="text-3xl">{mood.emoji}</span>
                <span className={`text-sm font-medium ${selectedMood === index ? 'text-white' : 'text-muted-foreground'}`}>{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Breathing Exercises */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-3">
                <Wind className="h-5 w-5 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Breathing Exercises</h3>
                  <p className="text-sm text-muted-foreground burmese-text">အသက်ရှူလေ့ကျင့်ခန်းများ</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {breathingExercises.map((exercise, index) => (
                  <motion.button key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => startExercise(exercise)} className={`p-4 rounded-xl text-left transition-all ${selectedExercise?.name === exercise.name ? `bg-gradient-to-br ${exercise.color} shadow-lg` : 'bg-secondary hover:bg-muted'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <exercise.icon className="h-5 w-5 text-white" />
                      <span className={`font-medium ${selectedExercise?.name === exercise.name ? 'text-white' : 'text-foreground'}`}>{exercise.name}</span>
                    </div>
                    <p className={`text-xs ${selectedExercise?.name === exercise.name ? 'text-white/80' : 'text-muted-foreground'}`}>{exercise.duration} • {exercise.pattern}</p>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {breathingActive && selectedExercise && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-center">
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${selectedExercise.color} mx-auto flex items-center justify-center shadow-lg`}>
                      <span className="text-3xl font-bold text-white capitalize">{breathingPhase}</span>
                    </div>
                    <p className="mt-6 text-lg text-muted-foreground">
                      {breathingPhase === 'inhale' && 'Breathe in slowly...'}
                      {breathingPhase === 'hold' && 'Hold your breath...'}
                      {breathingPhase === 'exhale' && 'Breathe out gently...'}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <Button variant="outline" size="sm" onClick={() => setAudioEnabled(!audioEnabled)}>{audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</Button>
                      <Button variant="outline" size="sm" onClick={() => { setBreathingActive(false); setSelectedExercise(null); }}><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </motion.div>

          {/* Anonymous Chat */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative"><MessageCircle className="h-5 w-5 text-purple-400" /><Lock className="h-3 w-3 text-green-400 absolute -bottom-1 -right-1" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Anonymous Support Chat</h3>
                    <p className="text-sm text-muted-foreground burmese-text">မည်သူမှ သင့်ကို မသိပါ</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><Shield className="h-3 w-3 mr-1" />Private</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-64 overflow-y-auto rounded-xl bg-secondary/50 p-4 mb-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl ${msg.type === 'user' ? 'bg-teal-500 text-white' : 'bg-secondary text-foreground'}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                <Button className="btn-primary" onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2"><EyeOff className="h-3 w-3" />Your identity is completely anonymous.</p>
            </CardContent>
          </motion.div>

          {/* Inspiring Stories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Stories of Hope</h3>
                  <p className="text-sm text-muted-foreground burmese-text">မျှော်လင့်ချက် ပုံပြင်များ</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                {inspiringStories.map((story, index) => (
                  <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-teal-500/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center text-2xl`}>{story.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{story.name}</span>
                          <span className="text-xs text-muted-foreground">• {story.role}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">&quot;{story.story}&quot;</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Myanmar Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-teal-400" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Myanmar Resources</h3>
                  <p className="text-sm text-muted-foreground burmese-text">မြန်မာပြည် အရင်းအမြစ်များ</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3">
                {myanmarResources.map((resource, index) => (
                  <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-teal-500/30 transition-all cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{resource.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                        <div className="flex items-center gap-2 mt-2"><Clock className="h-3 w-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">{resource.hours}</span></div>
                      </div>
                      <Button size="sm" variant="outline" className="border-teal-500/30 text-teal-400"><Phone className="h-3 w-3 mr-1" />Call</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>

          {/* Support Groups */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-400" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Support Groups</h3>
                  <p className="text-sm text-muted-foreground burmese-text">အဖွဲ့အစည်းများ</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3">
                {supportGroups.map((group, index) => (
                  <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-green-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"><group.icon className="h-4 w-4 text-green-400" /></div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.members} members</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{group.language}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{group.schedule}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-green-500/30 text-green-400"><HandHeart className="h-4 w-4 mr-2" />Join a Group</Button>
            </CardContent>
          </motion.div>

          {/* Daily Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20 p-6">
            <div className="flex items-center gap-3 mb-4"><Coffee className="h-5 w-5 text-amber-400" /><h3 className="text-lg font-bold text-foreground">Daily Wellness Tips</h3></div>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs text-amber-400">1</span></div><p className="text-sm text-muted-foreground">Take 5 minutes for yourself today. Even a short break can refresh your mind.</p></div>
              <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs text-amber-400">2</span></div><p className="text-sm text-muted-foreground">Connect with someone you trust. Sharing your feelings can lighten the burden.</p></div>
              <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs text-amber-400">3</span></div><p className="text-sm text-muted-foreground">Remember: It&apos;s okay to not be okay. Every step forward matters.</p></div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center py-8">
        <p className="text-muted-foreground mb-2">Made with <Heart className="h-4 w-4 text-red-400 inline" fill="currentColor" /> for Myanmar&apos;s youth</p>
        <p className="text-sm text-muted-foreground burmese-text">မြန်မာလူငယ်များအတွက် ချစ်ခြင်းဖြင့် ပြုလုပ်ထားပါသည်</p>
      </motion.div>
    </div>
  );
}
