'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Target,
  User,
  Palette,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Check,
  Heart,
  Brain,
  Briefcase,
  Users,
  MapPin,
  Droplets,
  GraduationCap,
  Star,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface OnboardingData {
  goal: string;
  bloodType: string;
  location: string;
  skills: string[];
  education: string;
  avatar: string;
}

const ONBOARDING_STORAGE_KEY = 'refertrm_onboarding_completed';

const goals = [
  { id: 'earn', label: 'Earn Money', labelMm: 'ငွေရှာရန်', icon: Star, color: 'from-amber-500 to-orange-500', desc: 'Make money through referrals' },
  { id: 'learn', label: 'Learn Skills', labelMm: 'ကျွမ်းကျင်မှုရယူရန်', icon: Brain, color: 'from-purple-500 to-pink-500', desc: 'Access free courses and certifications' },
  { id: 'jobs', label: 'Find Jobs', labelMm: 'အလုပ်ရှာရန်', icon: Briefcase, color: 'from-teal-500 to-cyan-500', desc: 'Discover job opportunities' },
  { id: 'network', label: 'Build Network', labelMm: 'ဆက်သွယ်ရေးတည်ဆောက်ရန်', icon: Users, color: 'from-blue-500 to-indigo-500', desc: 'Connect with professionals' },
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const myanmarRegions = [
  'Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Magway', 'Sagaing', 'Taunggyi', 'Mawlamyine',
  'Pathein', 'Monywa', 'Sittwe', 'Myitkyina', 'Hpa-an', 'Dawei', 'Meiktila', 'Pyin Oo Lwin',
];

const skillOptions = [
  'Marketing', 'Sales', 'Programming', 'Design', 'Writing', 'Teaching',
  'Healthcare', 'Finance', 'Engineering', 'Customer Service', 'Management', 'Other',
];

const educationLevels = [
  { id: 'high-school', label: 'High School', labelMm: 'အထက်တန်း' },
  { id: 'diploma', label: 'Diploma', labelMm: 'ဒီပလိုမာ' },
  { id: 'bachelor', label: 'Bachelor Degree', labelMm: 'ဘွဲ့ကြို' },
  { id: 'master', label: 'Master Degree', labelMm: 'ဘွဲ့လွန်' },
  { id: 'other', label: 'Other', labelMm: 'အခြား' },
];

const avatars = [
  { id: 'avatar-1', emoji: '👨‍💼', label: 'Professional' },
  { id: 'avatar-2', emoji: '👩‍💼', label: 'Professional' },
  { id: 'avatar-3', emoji: '🧑‍🎓', label: 'Student' },
  { id: 'avatar-4', emoji: '👨‍🏫', label: 'Teacher' },
  { id: 'avatar-5', emoji: '👩‍⚕️', label: 'Healthcare' },
  { id: 'avatar-6', emoji: '🧑‍💻', label: 'Tech' },
  { id: 'avatar-7', emoji: '👨‍🎨', label: 'Creative' },
  { id: 'avatar-8', emoji: '👩‍🔧', label: 'Engineer' },
];

const steps = [
  { id: 1, title: 'Welcome', icon: Sparkles },
  { id: 2, title: 'Your Goal', icon: Target },
  { id: 3, title: 'Profile', icon: User },
  { id: 4, title: 'Avatar', icon: Palette },
  { id: 5, title: 'Get Started', icon: Rocket },
];

interface OnboardingFlowProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

// Helper to get initial visibility state
const getInitialVisibility = (forceShow: boolean): boolean => {
  if (forceShow) return true;
  if (typeof window !== 'undefined') {
    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return !completed;
  }
  return false;
};

export default function OnboardingFlow({ onComplete, forceShow = false }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  // Derive visibility from forceShow prop and localStorage
  const isVisible = !completed && (forceShow || (typeof window !== 'undefined' && !localStorage.getItem(ONBOARDING_STORAGE_KEY)));
  const [data, setData] = useState<OnboardingData>({
    goal: '',
    bloodType: '',
    location: '',
    skills: [],
    education: '',
    avatar: '',
  });

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    localStorage.setItem('refertrm_onboarding_data', JSON.stringify(data));
    setCompleted(true);
    onComplete?.();
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'skipped');
    setCompleted(true);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill].slice(0, 3),
    }));
  };

  if (!isVisible) return null;

  const progress = (currentStep / 5) * 100;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-2xl glass-card bg-card p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        currentStep >= step.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${
                          currentStep > step.id ? 'bg-teal-500' : 'bg-secondary'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center"
                  >
                    <Sparkles className="h-12 w-12 text-white" />
                  </motion.div>
                  <h1 className="text-3xl font-bold text-foreground mb-3">
                    Welcome to ReferTRM!
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2 burmese-text">
                    ReferTRM မှကြိုဆိုပါသည်!
                  </p>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Myanmar's #1 referral platform. Earn money, learn skills, and build your career.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    {[
                      { icon: Star, label: 'Earn Rewards', color: 'text-amber-400' },
                      { icon: Brain, label: 'Free Learning', color: 'text-purple-400' },
                      { icon: Briefcase, label: 'Job Access', color: 'text-teal-400' },
                      { icon: Users, label: 'Community', color: 'text-blue-400' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-secondary"
                      >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Goal */}
              {currentStep === 2 && (
                <div className="py-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                    What's Your Main Goal?
                  </h2>
                  <p className="text-muted-foreground text-center mb-6 burmese-text">
                    သင့်အဓိကရည်မှန်းချက်ဘာလဲ။
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {goals.map((goal, index) => (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setData(prev => ({ ...prev, goal: goal.id }))}
                        className={`relative p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          data.goal === goal.id
                            ? 'border-teal-500 bg-teal-500/10'
                            : 'border-border bg-secondary hover:border-teal-500/50'
                        }`}
                      >
                        {data.goal === goal.id && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-5 w-5 text-teal-500" />
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${goal.color} flex items-center justify-center mb-3`}>
                          <goal.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-foreground">{goal.label}</h3>
                        <p className="text-xs text-muted-foreground burmese-text">{goal.labelMm}</p>
                        <p className="text-xs text-muted-foreground mt-1">{goal.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Profile Setup */}
              {currentStep === 3 && (
                <div className="py-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                    Complete Your Profile
                  </h2>
                  <p className="text-muted-foreground text-center mb-6 burmese-text">
                    သင့်ပရိုဖိုင်ဖြည့်ပါ
                  </p>
                  
                  <div className="space-y-5">
                    {/* Blood Type - CRITICAL for Blood Donor Network */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Droplets className="h-4 w-4 text-red-400" />
                        Blood Type
                        <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
                          Critical for Blood Network
                        </Badge>
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {bloodTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setData(prev => ({ ...prev, bloodType: type }))}
                            className={`py-2 rounded-lg text-sm font-medium transition-all ${
                              data.bloodType === type
                                ? 'bg-red-500 text-white'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location - CRITICAL for Safety & Blood */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <MapPin className="h-4 w-4 text-teal-400" />
                        Location/Region
                        <Badge variant="outline" className="text-xs border-teal-500/50 text-teal-400">
                          For Safety & Blood
                        </Badge>
                      </label>
                      <select
                        value={data.location}
                        onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
                      >
                        <option value="">Select your region</option>
                        {myanmarRegions.map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    {/* Skills & Interests */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <GraduationCap className="h-4 w-4 text-purple-400" />
                        Skills & Interests (Select up to 3)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              data.skills.includes(skill)
                                ? 'bg-purple-500 text-white'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Education Level */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <GraduationCap className="h-4 w-4 text-amber-400" />
                        Education Level
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {educationLevels.map((edu) => (
                          <button
                            key={edu.id}
                            onClick={() => setData(prev => ({ ...prev, education: edu.id }))}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                              data.education === edu.id
                                ? 'bg-amber-500 text-white'
                                : 'bg-secondary text-foreground hover:bg-muted'
                            }`}
                          >
                            <div>{edu.label}</div>
                            <div className="text-xs opacity-80 burmese-text">{edu.labelMm}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Avatar Creation */}
              {currentStep === 4 && (
                <div className="py-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                    Choose Your Avatar
                  </h2>
                  <p className="text-muted-foreground text-center mb-6 burmese-text">
                    သင့် Avatar ကိုရွေးပါ
                  </p>
                  
                  <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                    {avatars.map((avatar, index) => (
                      <motion.div
                        key={avatar.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setData(prev => ({ ...prev, avatar: avatar.id }))}
                        className={`relative p-4 rounded-xl cursor-pointer transition-all border-2 ${
                          data.avatar === avatar.id
                            ? 'border-teal-500 bg-teal-500/10 scale-110'
                            : 'border-border bg-secondary hover:border-teal-500/50'
                        }`}
                      >
                        <div className="text-3xl text-center">{avatar.emoji}</div>
                        {data.avatar === avatar.id && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    More avatar customization options available in settings!
                  </p>
                </div>
              )}

              {/* Step 5: Get Started */}
              {currentStep === 5 && (
                <div className="py-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                  >
                    <Rocket className="h-12 w-12 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    You're All Set!
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2 burmese-text">
                    အားလုံးအဆင်ပြေပါပြီ!
                  </p>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your profile is ready. Here's what you can do next:
                  </p>
                  
                  <div className="space-y-3 max-w-sm mx-auto">
                    {[
                      { icon: Target, label: 'Complete your profile', desc: 'Add more details to unlock features' },
                      { icon: Briefcase, label: 'Browse available jobs', desc: 'Find opportunities to refer' },
                      { icon: Sparkles, label: 'Check in daily', desc: 'Earn points and build your streak' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-teal-400" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                    <p className="text-sm text-muted-foreground">
                      <Heart className="h-4 w-4 inline text-red-400 mr-1" />
                      Made with love in Myanmar. Welcome to the community!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 5
            </div>
            
            <Button
              onClick={nextStep}
              className="gap-2 btn-primary"
              disabled={currentStep === 2 && !data.goal}
            >
              {currentStep === 5 ? 'Get Started' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
