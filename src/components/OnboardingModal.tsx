'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, ChevronRight, Star, Users, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingStep {
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  icon: React.ElementType;
  color: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to ReferTRM Academy',
    titleMm: 'ReferTRM Academy မှ ကြိုဆိုပါသည်',
    description: 'Learn recruitment skills, earn money by referring candidates, and build your career.',
    descriptionMm: 'အလုပ်စုံရှာဖွေရေး ကျွမ်းကျင်မှုများ သင်ယူပါ၊ ကိုယ်စားလှယ်များကို ရည်ညွှန်းပြီး ငွေရှာပါ၊ သင့်အသက်မွေးဝမ်းကြောင်းကို တည်ဆောက်ပါ။',
    icon: Sparkles,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Learn & Earn Points',
    titleMm: 'သင်ယူပြီး အမှတ်များ ရယူပါ',
    description: 'Complete modules to earn points. Unlock certificates and special rewards.',
    descriptionMm: 'မော်ဂျူးများ ပြီးမြောက်ပြီး အမှတ်များ ရယူပါ။ လက်မှတ်များနှင့် အထူးဆုများကို ဖွင့်ပါ။',
    icon: Star,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Build Your Streak',
    titleMm: 'သင့်စည်းကမ်းကို တည်ဆောက်ပါ',
    description: 'Login daily to build your streak. Earn bonus points and unlock exclusive perks.',
    descriptionMm: 'နေ့စဉ် လော့ဂ်အင်လုပ်ပြီး သင့်စည်းကမ်းကို တည်ဆောက်ပါ။ အပိုဆုများနှင့် အထူးအခွင့်အရေးများ ရယူပါ။',
    icon: Trophy,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Refer & Earn Real Money',
    titleMm: 'ရည်ညွှန်းပြီး ငွေအမှန် ရှာပါ',
    description: 'Refer candidates to jobs. Earn up to 500,000 MMK per successful placement.',
    descriptionMm: 'အလုပ်အတွက် ကိုယ်စားလှယ်များကို ရည်ညွှန်းပါ။ အောင်မြင်သော ချိန်ခွင်လျှော့တွက်တိုင်း ကျပ် ၅သိန်းထိ ရရှိပါမည်။',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleVoiceGuide = () => {
    setIsPlaying(!isPlaying);
    // In production, this would play Burmese audio
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md glass-card p-6 bg-slate-900"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-teal-400'
                    : index < currentStep
                    ? 'bg-teal-400/50'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <motion.div
            key={currentStep}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6`}
          >
            <StepIcon className="h-10 w-10 text-white" />
          </motion.div>

          {/* Content */}
          <motion.div
            key={`content-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {step.title}
            </h2>
            <p className="text-teal-400 text-sm burmese-text mb-4">
              {step.titleMm}
            </p>
            <p className="text-slate-300 mb-2">
              {step.description}
            </p>
            <p className="text-slate-500 text-sm burmese-text">
              {step.descriptionMm}
            </p>
          </motion.div>

          {/* Voice Guide Button */}
          <Button
            variant="outline"
            className={`w-full mb-4 ${isPlaying ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'border-white/10 text-slate-300'}`}
            onClick={handleVoiceGuide}
          >
            <Volume2 className="mr-2 h-4 w-4" />
            {isPlaying ? 'Playing...' : 'Burmese Voice Guide - မြန်မာအသံလမ်းညွှန်'}
          </Button>

          {/* Next Button */}
          <Button className="w-full btn-teal" onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              <>
                Get Started - စတင်ပါ
              </>
            ) : (
              <>
                Next - နောက်တစ်ဆင့်
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
