'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Sparkles, Lock, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Myanmar-style Chibi Avatar System
interface AvatarOption {
  id: string;
  name: string;
  nameMm: string;
  emoji: string;
  style: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
  cost: number;
  unlocked: boolean;
}

const avatarOptions: AvatarOption[] = [
  // Bronze Tier (Free - Starter)
  { id: 'starter-1', name: 'Beginner', nameMm: 'စတင်သူ', emoji: '🌱', style: 'Nature', tier: 'bronze', cost: 0, unlocked: true },
  { id: 'starter-2', name: 'Learner', nameMm: 'သင်ယူသူ', emoji: '📚', style: 'Academic', tier: 'bronze', cost: 0, unlocked: true },
  { id: 'starter-3', name: 'Explorer', nameMm: 'စူးစမ်းသူ', emoji: '🔍', style: 'Curious', tier: 'bronze', cost: 0, unlocked: true },

  // Silver Tier (5,000 pts)
  { id: 'pro-1', name: 'Professional', nameMm: 'ပရော်ဖက်ရှင်နယ်', emoji: '💼', style: 'Business', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-2', name: 'Tech Star', nameMm: 'နည်းပညာကျွမ်းကျင်', emoji: '💻', style: 'Tech', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-3', name: 'Scholar', nameMm: 'ပညာရှင်', emoji: '🎓', style: 'Academic', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-4', name: 'Creative', nameMm: 'ဖန်တီးသူ', emoji: '🎨', style: 'Arts', tier: 'silver', cost: 5000, unlocked: false },

  // Gold Tier (10,000 pts)
  { id: 'expert-1', name: 'Expert', nameMm: 'ကျွမ်းကျင်သူ', emoji: '⭐', style: 'Elite', tier: 'gold', cost: 10000, unlocked: false },
  { id: 'expert-2', name: 'Leader', nameMm: 'ခေါင်းဆောင်', emoji: '👑', style: 'Command', tier: 'gold', cost: 10000, unlocked: false },
  { id: 'expert-3', name: 'Mentor', nameMm: 'နည်းပြ', emoji: '🎯', style: 'Guide', tier: 'gold', cost: 10000, unlocked: false },

  // Diamond Tier (25,000 pts)
  { id: 'master-1', name: 'Master', nameMm: 'မာစတာ', emoji: '💎', style: 'Prestige', tier: 'diamond', cost: 25000, unlocked: false },
  { id: 'master-2', name: 'Champion', nameMm: 'ချန်ပီယံ', emoji: '🏆', style: 'Victory', tier: 'diamond', cost: 25000, unlocked: false },
  { id: 'master-3', name: 'Innovator', nameMm: 'ဆန်းသစ်တီထွင်သူ', emoji: '🚀', style: 'Visionary', tier: 'diamond', cost: 25000, unlocked: false },

  // Legendary Tier (50,000 pts)
  { id: 'legend-1', name: 'Legend', nameMm: 'ထူးချွန်သူ', emoji: '🌟', style: 'Mythic', tier: 'legendary', cost: 50000, unlocked: false },
  { id: 'legend-2', name: 'Unicorn', nameMm: 'ယူနီကorn', emoji: '🦄', style: 'Rare', tier: 'legendary', cost: 50000, unlocked: false },
  { id: 'legend-3', name: 'Phoenix', nameMm: 'ဇာဂနာ', emoji: '🔥', style: 'Rebirth', tier: 'legendary', cost: 50000, unlocked: false },
];

// Avatar Accessories
interface Accessory {
  id: string;
  name: string;
  nameMm: string;
  emoji: string;
  cost: number;
  slot: 'head' | 'body' | 'background';
}

const accessories: Accessory[] = [
  { id: 'acc-1', name: 'Crown', nameMm: 'သရဖူ', emoji: '👑', cost: 5000, slot: 'head' },
  { id: 'acc-2', name: 'Graduation Cap', nameMm: 'ဘွဲ့ဆောင်သီး', emoji: '🎓', cost: 3000, slot: 'head' },
  { id: 'acc-3', name: 'Fire Aura', nameMm: 'မီးနောက်ခံ', emoji: '🔥', cost: 8000, slot: 'background' },
  { id: 'acc-4', name: 'Sparkles', nameMm: 'တလက်လက်', emoji: '✨', cost: 2000, slot: 'background' },
  { id: 'acc-5', name: 'Briefcase', nameMm: 'လုပ်ငန်းအိတ်', emoji: '💼', cost: 4000, slot: 'body' },
];

// Tier colors
const tierColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  bronze: { bg: 'from-amber-700 to-amber-900', border: 'border-amber-600', text: 'text-amber-400', glow: 'shadow-amber-500/30' },
  silver: { bg: 'from-slate-400 to-slate-600', border: 'border-slate-400', text: 'text-slate-300', glow: 'shadow-slate-400/30' },
  gold: { bg: 'from-yellow-400 to-amber-500', border: 'border-yellow-400', text: 'text-yellow-300', glow: 'shadow-yellow-500/50' },
  diamond: { bg: 'from-cyan-300 to-blue-400', border: 'border-cyan-300', text: 'text-cyan-300', glow: 'shadow-cyan-400/50' },
  legendary: { bg: 'from-purple-500 to-pink-500', border: 'border-purple-400', text: 'text-purple-300', glow: 'shadow-purple-500/50' },
};

const tierLabels: Record<string, { en: string; mm: string }> = {
  bronze: { en: 'Bronze', mm: 'ကြေးနီ' },
  silver: { en: 'Silver', mm: 'ငွေ' },
  gold: { en: 'Gold', mm: 'ရွှေ' },
  diamond: { en: 'Diamond', mm: 'စိန်' },
  legendary: { en: 'Legendary', mm: 'ထူးချွန်' },
};

interface AvatarSystemProps {
  currentPoints?: number;
  onAvatarSelect?: (avatar: AvatarOption) => void;
}

export default function AvatarSystem({ currentPoints = 7500, onAvatarSelect }: AvatarSystemProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption | null>(null);
  const [selectedTab, setSelectedTab] = useState<'avatars' | 'accessories'>('avatars');

  const handleAvatarClick = (avatar: AvatarOption) => {
    if (avatar.unlocked || avatar.cost <= currentPoints) {
      setSelectedAvatar(avatar);
      onAvatarSelect?.(avatar);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Avatar <span className="text-gradient-primary">Customization</span>
        </h2>
        <p className="text-slate-400 burmese-text">
          Avatar စိတ်ကြိုက်ပြင်ဆင်မှု - သင့်ရည်ညွှန်းခေါင်းဆောင်
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Star className="h-5 w-5 text-amber-400" />
          <span className="text-amber-400 font-bold">{currentPoints.toLocaleString()} Points</span>
          <span className="text-slate-500">available</span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Preview */}
          <div className="flex-shrink-0">
            <div className="relative">
              <motion.div
                key={selectedAvatar?.id || 'default'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${
                  selectedAvatar ? tierColors[selectedAvatar.tier].bg : 'from-teal-500 to-cyan-500'
                } flex items-center justify-center text-6xl shadow-xl ${
                  selectedAvatar ? tierColors[selectedAvatar.tier].glow : 'shadow-teal-500/30'
                }`}
              >
                {selectedAvatar?.emoji || '🧑'}
              </motion.div>
              
              {/* Tier Badge */}
              {selectedAvatar && (
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-800 border ${
                  tierColors[selectedAvatar.tier].border
                }`}>
                  <span className={`text-xs font-bold ${tierColors[selectedAvatar.tier].text}`}>
                    {tierLabels[selectedAvatar.tier].en}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Selected Avatar Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">
              {selectedAvatar?.name || 'Choose Your Avatar'}
            </h3>
            <p className="text-slate-400 burmese-text text-sm mb-3">
              {selectedAvatar?.nameMm || 'သင့် Avatar ကို ရွေးချယ်ပါ'}
            </p>
            {selectedAvatar && (
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <Badge className={`${tierColors[selectedAvatar.tier].text} bg-white/5 border-current`}>
                  <Crown className="h-3 w-3 mr-1" />
                  {selectedAvatar.style}
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Star className="h-3 w-3 mr-1" />
                  {selectedAvatar.cost > 0 ? `${selectedAvatar.cost.toLocaleString()} pts` : 'Free'}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setSelectedTab('avatars')}
          className={`px-6 py-3 rounded-xl font-medium transition-all touch-target ${
            selectedTab === 'avatars' ? 'btn-primary' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Avatars
        </button>
        <button
          onClick={() => setSelectedTab('accessories')}
          className={`px-6 py-3 rounded-xl font-medium transition-all touch-target ${
            selectedTab === 'accessories' ? 'btn-primary' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Accessories
        </button>
      </div>

      {/* Avatar Grid */}
      <AnimatePresence mode="wait">
        {selectedTab === 'avatars' && (
          <motion.div
            key="avatars"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {Object.keys(tierLabels).map((tier) => {
              const tierAvatars = avatarOptions.filter((a) => a.tier === tier);
              const colors = tierColors[tier];
              
              return (
                <div key={tier} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold ${colors.text}`}>
                      {tierLabels[tier].en}
                    </h4>
                    <span className="text-slate-500 text-sm burmese-text">
                      ({tierLabels[tier].mm})
                    </span>
                    <div className="flex-1 h-px bg-slate-800" />
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {tierAvatars.map((avatar) => {
                      const isSelected = selectedAvatar?.id === avatar.id;
                      const canUnlock = avatar.cost <= currentPoints;
                      
                      return (
                        <motion.button
                          key={avatar.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAvatarClick(avatar)}
                          disabled={!canUnlock && !avatar.unlocked}
                          className={`relative p-3 rounded-xl transition-all touch-target haptic ${
                            isSelected
                              ? `bg-gradient-to-br ${colors.bg} ${colors.border} border-2 shadow-lg ${colors.glow}`
                              : canUnlock || avatar.unlocked
                              ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                              : 'bg-slate-900 opacity-50 cursor-not-allowed border border-slate-800'
                          }`}
                        >
                          <div className="text-3xl mb-2">{avatar.emoji}</div>
                          <div className="text-xs text-white font-medium truncate">{avatar.name}</div>
                          <div className="text-[10px] text-slate-500 truncate burmese-text">{avatar.nameMm}</div>
                          
                          {/* Selected Check */}
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          
                          {/* Lock Icon */}
                          {!canUnlock && !avatar.unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 rounded-xl">
                              <Lock className="h-6 w-6 text-slate-500" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {selectedTab === 'accessories' && (
          <motion.div
            key="accessories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {accessories.map((acc) => (
                <motion.button
                  key={acc.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center touch-target haptic"
                >
                  <div className="text-3xl mb-2">{acc.emoji}</div>
                  <div className="text-sm text-white font-medium">{acc.name}</div>
                  <div className="text-xs text-slate-500 burmese-text">{acc.nameMm}</div>
                  <div className="mt-2 text-amber-400 text-xs font-bold">{acc.cost.toLocaleString()} pts</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!selectedAvatar}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all touch-target ${
            selectedAvatar
              ? 'btn-primary'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Sparkles className="inline mr-2 h-5 w-5" />
          Save Avatar
        </motion.button>
      </div>
    </div>
  );
}
