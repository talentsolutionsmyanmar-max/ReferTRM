'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Star, Sparkles, Lock, Check, 
  Sprout, BookOpen, Search, Briefcase, 
  Monitor, GraduationCap, Palette, Target, 
  Gem, Trophy, Rocket, Zap, Flame, Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Design System: NO emojis - use Lucide icons and initials only
type IconName = 'Sprout' | 'BookOpen' | 'Search' | 'Briefcase' | 'Monitor' | 
  'GraduationCap' | 'Palette' | 'Star' | 'Crown' | 'Target' | 
  'Gem' | 'Trophy' | 'Rocket' | 'Zap' | 'Flame' | 'Heart';

const iconMap: Record<IconName, typeof Sprout> = {
  Sprout, BookOpen, Search, Briefcase, Monitor, 
  GraduationCap, Palette, Star, Crown, Target, 
  Gem, Trophy, Rocket, Zap, Flame, Heart,
};

// Avatar Style System - Design System compliant (NO emojis)
interface AvatarStyle {
  id: string;
  name: string;
  nameMm: string;
  icon: IconName;
  gradient: string; // Tailwind gradient classes
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';
  cost: number;
  unlocked: boolean;
}

const avatarStyles: AvatarStyle[] = [
  // Bronze Tier (Free - Starter)
  { id: 'starter-1', name: 'Beginner', nameMm: 'စတင်သူ', icon: 'Sprout', gradient: 'from-green-500 to-emerald-600', tier: 'bronze', cost: 0, unlocked: true },
  { id: 'starter-2', name: 'Learner', nameMm: 'သင်ယူသူ', icon: 'BookOpen', gradient: 'from-blue-500 to-indigo-600', tier: 'bronze', cost: 0, unlocked: true },
  { id: 'starter-3', name: 'Explorer', nameMm: 'စူးစမ်းသူ', icon: 'Search', gradient: 'from-purple-500 to-violet-600', tier: 'bronze', cost: 0, unlocked: true },

  // Silver Tier (5,000 pts)
  { id: 'pro-1', name: 'Professional', nameMm: 'ပရော်ဖက်ရှင်နယ်', icon: 'Briefcase', gradient: 'from-slate-400 to-slate-600', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-2', name: 'Tech Star', nameMm: 'နည်းပညာကျွမ်းကျင်', icon: 'Monitor', gradient: 'from-cyan-500 to-blue-600', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-3', name: 'Scholar', nameMm: 'ပညာရှင်', icon: 'GraduationCap', gradient: 'from-indigo-500 to-purple-600', tier: 'silver', cost: 5000, unlocked: false },
  { id: 'pro-4', name: 'Creative', nameMm: 'ဖန်တီးသူ', icon: 'Palette', gradient: 'from-pink-500 to-rose-600', tier: 'silver', cost: 5000, unlocked: false },

  // Gold Tier (10,000 pts)
  { id: 'expert-1', name: 'Expert', nameMm: 'ကျွမ်းကျင်သူ', icon: 'Star', gradient: 'from-yellow-400 to-amber-500', tier: 'gold', cost: 10000, unlocked: false },
  { id: 'expert-2', name: 'Leader', nameMm: 'ခေါင်းဆောင်', icon: 'Crown', gradient: 'from-amber-400 to-orange-500', tier: 'gold', cost: 10000, unlocked: false },
  { id: 'expert-3', name: 'Mentor', nameMm: 'နည်းပြ', icon: 'Target', gradient: 'from-orange-400 to-red-500', tier: 'gold', cost: 10000, unlocked: false },

  // Diamond Tier (25,000 pts)
  { id: 'master-1', name: 'Master', nameMm: 'မာစတာ', icon: 'Gem', gradient: 'from-cyan-300 to-blue-400', tier: 'diamond', cost: 25000, unlocked: false },
  { id: 'master-2', name: 'Champion', nameMm: 'ချန်ပီယံ', icon: 'Trophy', gradient: 'from-teal-400 to-cyan-500', tier: 'diamond', cost: 25000, unlocked: false },
  { id: 'master-3', name: 'Innovator', nameMm: 'ဆန်းသစ်တီထွင်သူ', icon: 'Rocket', gradient: 'from-blue-400 to-indigo-500', tier: 'diamond', cost: 25000, unlocked: false },

  // Legendary Tier (50,000 pts)
  { id: 'legend-1', name: 'Legend', nameMm: 'ထူးချွန်သူ', icon: 'Zap', gradient: 'from-purple-500 to-pink-500', tier: 'legendary', cost: 50000, unlocked: false },
  { id: 'legend-2', name: 'Phoenix', nameMm: 'ဇာဂနာ', icon: 'Flame', gradient: 'from-orange-500 to-red-600', tier: 'legendary', cost: 50000, unlocked: false },
  { id: 'legend-3', name: 'Beloved', nameMm: 'ချစ်ခြင်း', icon: 'Heart', gradient: 'from-rose-500 to-pink-600', tier: 'legendary', cost: 50000, unlocked: false },
];

// Avatar Accessories - Design System compliant (NO emojis)
interface Accessory {
  id: string;
  name: string;
  nameMm: string;
  icon: IconName;
  cost: number;
  slot: 'head' | 'body' | 'background';
}

const accessories: Accessory[] = [
  { id: 'acc-1', name: 'Crown', nameMm: 'သရဖူ', icon: 'Crown', cost: 5000, slot: 'head' },
  { id: 'acc-2', name: 'Graduation', nameMm: 'ဘွဲ့ဆောင်သီး', icon: 'GraduationCap', cost: 3000, slot: 'head' },
  { id: 'acc-3', name: 'Fire Aura', nameMm: 'မီးနောက်ခံ', icon: 'Flame', cost: 8000, slot: 'background' },
  { id: 'acc-4', name: 'Sparkles', nameMm: 'တလက်လက်', icon: 'Sparkles', cost: 2000, slot: 'background' },
  { id: 'acc-5', name: 'Briefcase', nameMm: 'လုပ်ငန်းအိတ်', icon: 'Briefcase', cost: 4000, slot: 'body' },
];

// Tier colors - Design System compliant
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
  userName?: string;
  onAvatarSelect?: (avatar: AvatarStyle) => void;
}

export default function AvatarSystem({ currentPoints = 7500, userName = 'User', onAvatarSelect }: AvatarSystemProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarStyle | null>(null);
  const [selectedTab, setSelectedTab] = useState<'avatars' | 'accessories'>('avatars');
  
  // Get initials for avatar display (Design System: gender-neutral initials only)
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const userInitials = getInitials(userName);

  const handleAvatarClick = (avatar: AvatarStyle) => {
    if (avatar.unlocked || avatar.cost <= currentPoints) {
      setSelectedAvatar(avatar);
      onAvatarSelect?.(avatar);
    }
  };

  const IconComponent = ({ name, className }: { name: IconName; className?: string }) => {
    const Icon = iconMap[name];
    return <Icon className={className} />;
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

      {/* Preview Area - Design System: Initials only */}
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
                  selectedAvatar ? selectedAvatar.gradient : 'from-teal-500 to-cyan-500'
                } flex items-center justify-center shadow-xl ${
                  selectedAvatar ? tierColors[selectedAvatar.tier].glow : 'shadow-teal-500/30'
                }`}
              >
                {selectedAvatar ? (
                  <IconComponent name={selectedAvatar.icon} className="w-16 h-16 text-white" />
                ) : (
                  <span className="text-4xl font-bold text-white">{userInitials}</span>
                )}
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
              {selectedAvatar?.name || 'Choose Your Style'}
            </h3>
            <p className="text-slate-400 burmese-text text-sm mb-3">
              {selectedAvatar?.nameMm || 'သင့် Avatar စတိုင်ကို ရွေးချယ်ပါ'}
            </p>
            {selectedAvatar && (
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <Badge className={`${tierColors[selectedAvatar.tier].text} bg-white/5 border-current`}>
                  <Crown className="h-3 w-3 mr-1" />
                  {selectedAvatar.tier}
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
          Avatar Styles
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
              const tierAvatars = avatarStyles.filter((a) => a.tier === tier);
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
                              ? `bg-gradient-to-br ${avatar.gradient} ${colors.border} border-2 shadow-lg ${colors.glow}`
                              : canUnlock || avatar.unlocked
                              ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                              : 'bg-slate-900 opacity-50 cursor-not-allowed border border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <IconComponent name={avatar.icon} className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                          </div>
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
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent name={acc.icon} className="w-10 h-10 text-teal-400" />
                  </div>
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
