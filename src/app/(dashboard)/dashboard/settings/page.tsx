'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, Globe, Save, Eye, Wifi, Check, Crown, Star, Sparkles, Lock, Zap, Award, ChevronRight, Sun, Moon, Monitor, 
  Swords, Shield as ShieldIcon, Gem, Image as ImageIcon, ArrowLeft, Plus, TrendingUp, Target, Brain, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { 
  equipmentCollection, 
  rarityInfo, 
  slotInfo, 
  getEquipmentBySlot, 
  getTotalStats, 
  getPowerLevel,
  getUpgradeCost,
  type EquipmentSlot,
  type EquipmentItem
} from '@/data/equipment';

interface AvatarOption {
  id: string;
  name: string;
  nameMm: string;
  image: string;
  category: 'starter' | 'professional' | 'champion' | 'legendary';
  cost: number;
  description: string;
  descriptionMm: string;
  gender?: 'male' | 'female' | 'neutral';
}

const avatarCollection: AvatarOption[] = [
  // Starter Avatars (Free)
  {
    id: 'default-male',
    name: 'Default Hero',
    nameMm: 'မူလသူရဲကောင်း',
    image: '/avatars/avatar-default-male.png',
    category: 'starter',
    cost: 0,
    description: 'Ready to start your journey',
    descriptionMm: 'ခရီးစကို စတင်ရန် အဆင်သင့်',
    gender: 'male',
  },
  {
    id: 'default-female',
    name: 'Default Heroine',
    nameMm: 'မူလသူရဲကောင်းမ',
    image: '/avatars/avatar-default-female.png',
    category: 'starter',
    cost: 0,
    description: 'Ready to start your journey',
    descriptionMm: 'ခရီးစကို စတင်ရန် အဆင်သင့်',
    gender: 'female',
  },
  {
    id: 'student',
    name: 'Eager Learner',
    nameMm: 'သင်ယူလိုစိတ်',
    image: '/avatars/avatar-student.png',
    category: 'starter',
    cost: 0,
    description: 'Ready to learn and grow',
    descriptionMm: 'သင်ယူဖွံ့ဖြိုးရန် အဆင်သင့်',
  },
  {
    id: 'business-1',
    name: 'Business Starter',
    nameMm: 'စီးပွားရေး စတာ',
    image: '/avatars/avatar-business-1.png',
    category: 'starter',
    cost: 0,
    description: 'Professional and ready',
    descriptionMm: 'ပရော်ဖက်ရှင်နယ်',
  },
  
  // Professional Avatars (Unlock with points)
  {
    id: 'tech-1',
    name: 'Tech Wizard',
    nameMm: 'နည်းပညာ မှော်သည်',
    image: '/avatars/avatar-tech-1.png',
    category: 'professional',
    cost: 100,
    description: 'Master of digital skills',
    descriptionMm: 'ဒစ်ဂျစ်တယ် ကျွမ်းကျင်သူ',
  },
  {
    id: 'female-pro-1',
    name: 'Career Queen',
    nameMm: 'အလုပ်အကိုင် ဘုရင်မ',
    image: '/avatars/avatar-female-pro-1.png',
    category: 'professional',
    cost: 100,
    description: 'Leading with confidence',
    descriptionMm: 'ယုံကြည်မှုဖြင့် ဦးဆောင်',
    gender: 'female',
  },
  {
    id: 'creative-1',
    name: 'Creative Mind',
    nameMm: 'ဖန်တီးစိတ်',
    image: '/avatars/avatar-creative-1.png',
    category: 'professional',
    cost: 150,
    description: 'Artistic and innovative',
    descriptionMm: 'အနုပညာနှင့် ဆန်းသစ်',
  },
  {
    id: 'recruiter',
    name: 'Super Recruiter',
    nameMm: 'ဆူပါ ရည်ညွှန်းသူ',
    image: '/avatars/avatar-recruiter.png',
    category: 'professional',
    cost: 200,
    description: 'Connecting talent with opportunities',
    descriptionMm: 'အရည်အချင်းကို အခွင့်အလမ်းနှင့် ချိတ်ဆက်',
  },
  
  // Champion Avatars (Premium)
  {
    id: 'champion',
    name: 'Referral Champion',
    nameMm: 'ရည်ညွှန်း ချန်ပီယံ',
    image: '/avatars/avatar-champion.png',
    category: 'champion',
    cost: 500,
    description: 'Top performer with golden touch',
    descriptionMm: 'ရွှေလက်ရှိ ထိပ်တန်း ဆောင်ရွက်သူ',
  },
  
  // Legendary Avatars (Exclusive) - Now includes BOTH male and female
  {
    id: 'legendary-female',
    name: 'Master Legend',
    nameMm: 'မာစတာ ဒဏ္ဍာရီ',
    image: '/avatars/avatar-legendary.png',
    category: 'legendary',
    cost: 1000,
    description: 'The ultimate referral master',
    descriptionMm: 'အဆုံးစွန် ရည်ညွှန်း မာစတာ',
    gender: 'female',
  },
  {
    id: 'legendary-male',
    name: 'Master Legend',
    nameMm: 'မာစတာ ဒဏ္ဍာရီ',
    image: '/avatars/avatar-legendary-male.png',
    category: 'legendary',
    cost: 1000,
    description: 'The ultimate referral master',
    descriptionMm: 'အဆုံးစွန် ရည်ညွှန်း မာစတာ',
    gender: 'male',
  },
];

const categoryInfo = {
  starter: { label: 'Starter', labelMm: 'စတင်သူ', color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-500/20', borderColor: 'border-slate-500/30', textColor: 'text-slate-300' },
  professional: { label: 'Professional', labelMm: 'ပရော်ဖက်ရှင်နယ်', color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-500/20', borderColor: 'border-teal-500/30', textColor: 'text-teal-400' },
  champion: { label: 'Champion', labelMm: 'ချန်ပီယံ', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30', textColor: 'text-amber-400' },
  legendary: { label: 'Legendary', labelMm: 'ဒဏ္ဍာရီ', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
};

// Premium Plans
const premiumPlans = [
  {
    id: 'free',
    name: 'Free',
    nameMm: 'အခမဲ့',
    price: 0,
    period: 'Forever',
    features: [
      'Basic job access',
      'Limited academy courses (Basic level only)',
      'Standard referral code',
      'Basic avatars',
      'Standard points earning',
    ],
    current: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    nameMm: 'ပရီမီယံ',
    price: 10000,
    period: 'MMK/month',
    features: [
      'All job access with priority',
      'Full academy access (all levels)',
      'Priority referral matching',
      'Premium avatar collection',
      '2x points on all activities',
      'Early job alerts (24h before free users)',
      'Certificate download priority',
    ],
    popular: true,
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    nameMm: 'ပရို',
    price: 25000,
    period: 'MMK/month',
    features: [
      'Everything in Premium',
      'Exclusive high-reward jobs',
      'Personal referral coach chat',
      'VIP badge on profile',
      '3x points on all activities',
      'First access to new features',
      'Diploma program discounts (coming soon)',
      'Direct company contact',
    ],
    current: false,
  },
];

type TabType = 'avatar' | 'equipment' | 'profile' | 'preferences';

export default function SettingsPage() {
  const { user, deductPoints, addPoints } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('avatar');
  const [textMode, setTextMode] = useState(false);
  const [lowData, setLowData] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('/avatars/avatar-default-male.png');
  const [ownedAvatars, setOwnedAvatars] = useState<string[]>(['default-male', 'default-female', 'student', 'business-1']);
  const [activeCategory, setActiveCategory] = useState<'all' | 'starter' | 'professional' | 'champion' | 'legendary'>('all');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  
  // Equipment state
  const [activeSlot, setActiveSlot] = useState<EquipmentSlot>('head');
  const [ownedEquipment, setOwnedEquipment] = useState<string[]>([]);
  const [equippedItems, setEquippedItems] = useState<Record<EquipmentSlot, string | null>>({
    head: null,
    body: null,
    accessory: null,
    background: null,
  });
  const [equipmentLevels, setEquipmentLevels] = useState<Record<string, number>>({});
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  // Calculate total power level
  const equippedList = Object.values(equippedItems).filter(Boolean) as string[];
  const totalStats = getTotalStats(equippedList);
  const powerLevel = getPowerLevel(equippedList);

  const handleSelectAvatar = (avatar: AvatarOption) => {
    if (ownedAvatars.includes(avatar.id)) {
      setSelectedAvatar(avatar.image);
      toast({
        title: 'Avatar equipped!',
        description: `Now wearing: ${avatar.name}`,
      });
    } else if (avatar.cost <= (user?.points || 0)) {
      const success = deductPoints(avatar.cost, `Unlocked avatar: ${avatar.name}`);
      if (success) {
        setOwnedAvatars(prev => [...prev, avatar.id]);
        setSelectedAvatar(avatar.image);
        toast({
          title: 'Avatar unlocked!',
          description: `${avatar.name} is now yours! -${avatar.cost} points`,
        });
      }
    } else {
      toast({
        title: 'Not enough points',
        description: `You need ${avatar.cost - (user?.points || 0)} more points to unlock this avatar.`,
        variant: 'destructive',
      });
    }
  };

  const handleBuyEquipment = (item: EquipmentItem) => {
    if (ownedEquipment.includes(item.id)) {
      toast({
        title: 'Already owned',
        description: `You already own ${item.name}`,
      });
      return;
    }
    
    if (item.cost <= (user?.points || 0)) {
      const success = deductPoints(item.cost, `Purchased equipment: ${item.name}`);
      if (success) {
        setOwnedEquipment(prev => [...prev, item.id]);
        setEquipmentLevels(prev => ({ ...prev, [item.id]: 1 }));
        toast({
          title: 'Equipment purchased!',
          description: `${item.name} is now yours! -${item.cost} points`,
        });
      }
    } else {
      toast({
        title: 'Not enough points',
        description: `You need ${item.cost - (user?.points || 0)} more points.`,
        variant: 'destructive',
      });
    }
  };

  const handleEquipItem = (item: EquipmentItem) => {
    if (!ownedEquipment.includes(item.id)) {
      handleBuyEquipment(item);
      return;
    }
    
    setEquippedItems(prev => ({
      ...prev,
      [item.slot]: prev[item.slot] === item.id ? null : item.id,
    }));
    
    toast({
      title: equippedItems[item.slot] === item.id ? 'Unequipped!' : 'Equipped!',
      description: equippedItems[item.slot] === item.id 
        ? `${item.name} removed` 
        : `${item.name} equipped to ${slotInfo[item.slot].label}`,
    });
  };

  const handleUpgradeEquipment = (item: EquipmentItem) => {
    const currentLevel = equipmentLevels[item.id] || 1;
    const upgradeCost = getUpgradeCost(item, currentLevel);
    
    if (currentLevel >= (item.maxLevel || 5)) {
      toast({
        title: 'Max level reached',
        description: `${item.name} is already at maximum level!`,
      });
      return;
    }
    
    if (upgradeCost <= (user?.points || 0)) {
      const success = deductPoints(upgradeCost, `Upgraded ${item.name} to level ${currentLevel + 1}`);
      if (success) {
        setEquipmentLevels(prev => ({ ...prev, [item.id]: currentLevel + 1 }));
        toast({
          title: 'Upgrade successful!',
          description: `${item.name} is now level ${currentLevel + 1}! -${upgradeCost} points`,
        });
      }
    } else {
      toast({
        title: 'Not enough points',
        description: `You need ${upgradeCost - (user?.points || 0)} more points to upgrade.`,
        variant: 'destructive',
      });
    }
  };

  const filteredAvatars = activeCategory === 'all' 
    ? avatarCollection 
    : avatarCollection.filter(a => a.category === activeCategory);

  const currentAvatarInfo = avatarCollection.find(a => a.image === selectedAvatar);
  const slotEquipment = getEquipmentBySlot(activeSlot);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Avatar & Equipment</h1>
          <p className="text-slate-400 burmese-text">Avatar နှင့် ပစ္စည်းများ</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Star className="h-4 w-4 mr-1" />{user?.points || 0} pts
          </Badge>
          <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
            <Crown className="h-4 w-4 mr-1" />{user?.level || 'Amateur'}
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Zap className="h-4 w-4 mr-1" />Power: {powerLevel}
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'avatar' as TabType, label: 'Avatars', labelMm: 'Avatar များ', icon: User },
          { id: 'equipment' as TabType, label: 'Equipment', labelMm: 'ပစ္စည်းများ', icon: Swords },
          { id: 'profile' as TabType, label: 'Profile', labelMm: 'ပရောဖိုင်', icon: User },
          { id: 'preferences' as TabType, label: 'Settings', labelMm: 'ဆက်တင်များ', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* AVATAR TAB */}
      {activeTab === 'avatar' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Avatar Collection</h3>
                    <p className="text-slate-500 text-sm burmese-text">Avatar စုစည်းမှု</p>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {ownedAvatars.length}/{avatarCollection.length} Owned
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Current Avatar Display */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Avatar Preview with Equipment */}
                <div className="flex-shrink-0">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Background */}
                    {equippedItems.background && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden -z-10">
                        <Image
                          src={equipmentCollection.find(e => e.id === equippedItems.background)?.image || ''}
                          alt="Background"
                          fill
                          className="object-cover opacity-40"
                        />
                      </div>
                    )}
                    
                    <div className={`w-40 h-40 rounded-2xl overflow-hidden border-4 ${
                      currentAvatarInfo ? categoryInfo[currentAvatarInfo.category].borderColor : 'border-white/10'
                    } bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl relative`}>
                      <Image
                        src={selectedAvatar}
                        alt="Your avatar"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Equipment overlays would go here in a more complex implementation */}
                    </div>
                    
                    {currentAvatarInfo && (
                      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full ${categoryInfo[currentAvatarInfo.category].bgColor} border ${categoryInfo[currentAvatarInfo.category].borderColor}`}>
                        <span className={`text-sm font-medium ${categoryInfo[currentAvatarInfo.category].textColor}`}>
                          {currentAvatarInfo.name}
                        </span>
                      </div>
                    )}
                    
                    {/* Power Level Badge */}
                    {powerLevel > 0 && (
                      <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                        <Zap className="h-3 w-3 inline mr-1" />
                        {powerLevel} PWR
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Stats & Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-white font-bold text-lg">{currentAvatarInfo?.name || 'Select Avatar'}</h4>
                    <p className="text-slate-400 text-sm burmese-text">{currentAvatarInfo?.nameMm || 'Avatar ရွေးပါ'}</p>
                    <p className="text-slate-500 text-sm mt-1">{currentAvatarInfo?.description}</p>
                  </div>

                  {/* Stats Display */}
                  {powerLevel > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-lg bg-green-500/10 text-center">
                        <Target className="h-4 w-4 text-green-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-400">+{totalStats.luck}</div>
                        <div className="text-xs text-slate-500">Luck</div>
                      </div>
                      <div className="p-2 rounded-lg bg-pink-500/10 text-center">
                        <Sparkles className="h-4 w-4 text-pink-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-pink-400">+{totalStats.charm}</div>
                        <div className="text-xs text-slate-500">Charm</div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-500/10 text-center">
                        <Brain className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-400">+{totalStats.wisdom}</div>
                        <div className="text-xs text-slate-500">Wisdom</div>
                      </div>
                      <div className="p-2 rounded-lg bg-red-500/10 text-center">
                        <Swords className="h-4 w-4 text-red-400 mx-auto mb-1" />
                        <div className="text-lg font-bold text-red-400">+{totalStats.power}</div>
                        <div className="text-xs text-slate-500">Power</div>
                      </div>
                    </div>
                  )}

                  {/* Collection Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Collection Progress</span>
                      <span className="text-teal-400">{ownedAvatars.length}/{avatarCollection.length}</span>
                    </div>
                    <Progress value={(ownedAvatars.length / avatarCollection.length) * 100} className="h-2 bg-slate-700" />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({avatarCollection.length})
                </button>
                {(['starter', 'professional', 'champion', 'legendary'] as const).map((cat) => {
                  const count = avatarCollection.filter(a => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                        activeCategory === cat 
                          ? `${categoryInfo[cat].bgColor} ${categoryInfo[cat].textColor} border ${categoryInfo[cat].borderColor}` 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat === 'legendary' && <Sparkles className="h-4 w-4" />}
                      {cat === 'champion' && <Award className="h-4 w-4" />}
                      {cat === 'professional' && <Zap className="h-4 w-4" />}
                      {cat === 'starter' && <Star className="h-4 w-4" />}
                      {categoryInfo[cat].label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Avatar Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredAvatars.map((avatar, index) => {
                  const owned = ownedAvatars.includes(avatar.id);
                  const equipped = selectedAvatar === avatar.image;
                  const canAfford = (user?.points || 0) >= avatar.cost;
                  const info = categoryInfo[avatar.category];

                  return (
                    <motion.div
                      key={avatar.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      onClick={() => handleSelectAvatar(avatar)}
                      className={`relative cursor-pointer group`}
                    >
                      <div className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        equipped 
                          ? `border-teal-500 shadow-lg shadow-teal-500/20` 
                          : owned 
                            ? `${info.borderColor} hover:border-teal-500/50`
                            : canAfford 
                              ? 'border-white/10 hover:border-white/30'
                              : 'border-white/5 opacity-60'
                      }`}>
                        {/* Avatar Image */}
                        <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 relative">
                          <Image
                            src={avatar.image}
                            alt={avatar.name}
                            fill
                            className="object-cover"
                          />
                          
                          {/* Lock Overlay */}
                          {!owned && (
                            <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center">
                              <Lock className="h-6 w-6 text-slate-400 mb-1" />
                              <span className="text-amber-400 font-bold text-sm">{avatar.cost} pts</span>
                            </div>
                          )}

                          {/* Equipped Badge */}
                          {equipped && (
                            <div className="absolute top-2 right-2 bg-teal-500 rounded-full p-1">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}

                          {/* Gender Badge */}
                          {avatar.gender && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-800/80 text-xs text-slate-300">
                              {avatar.gender === 'male' ? '👨' : '👩'}
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full ${info.bgColor} border ${info.borderColor}`}>
                            <span className={`text-xs font-medium ${info.textColor}`}>{info.label}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3 bg-slate-800/50">
                          <p className="text-white text-sm font-medium truncate">{avatar.name}</p>
                          <p className="text-slate-500 text-xs burmese-text truncate">{avatar.nameMm}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* EQUIPMENT TAB */}
      {activeTab === 'equipment' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <Swords className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Equipment Store</h3>
                    <p className="text-slate-500 text-sm burmese-text">ပစ္စည်းဆိုင် - Learn more, earn more, equip better!</p>
                  </div>
                </div>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  {ownedEquipment.length}/{equipmentCollection.length} Owned
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Slot Navigation */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {(Object.keys(slotInfo) as EquipmentSlot[]).map((slot) => {
                  const info = slotInfo[slot];
                  const equipped = equippedItems[slot];
                  return (
                    <button
                      key={slot}
                      onClick={() => setActiveSlot(slot)}
                      className={`p-4 rounded-xl transition-all text-center ${
                        activeSlot === slot 
                          ? 'bg-teal-500/20 border border-teal-500/30' 
                          : 'bg-slate-800/30 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="text-2xl mb-1">{info.icon}</div>
                      <div className="text-sm font-medium text-white">{info.label}</div>
                      <div className="text-xs text-slate-500 burmese-text">{info.labelMm}</div>
                      {equipped && (
                        <div className="mt-2">
                          <Check className="h-4 w-4 text-teal-400 mx-auto" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {slotEquipment.map((item, index) => {
                  const owned = ownedEquipment.includes(item.id);
                  const equipped = equippedItems[item.slot] === item.id;
                  const canAfford = (user?.points || 0) >= item.cost;
                  const level = equipmentLevels[item.id] || 1;
                  const info = rarityInfo[item.rarity];
                  const upgradeCost = getUpgradeCost(item, level);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      onClick={() => setSelectedEquipment(item)}
                      className={`relative cursor-pointer group`}
                    >
                      <div className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        equipped 
                          ? `border-teal-500 shadow-lg shadow-teal-500/20` 
                          : owned 
                            ? `${info.borderColor} hover:border-teal-500/50`
                            : canAfford 
                              ? 'border-white/10 hover:border-white/30'
                              : 'border-white/5 opacity-60'
                      }`}>
                        {/* Equipment Image */}
                        <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          
                          {/* Lock Overlay */}
                          {!owned && (
                            <div className="absolute inset-0 bg-slate-900/70 flex flex-col items-center justify-center">
                              <Lock className="h-6 w-6 text-slate-400 mb-1" />
                              <span className="text-amber-400 font-bold text-sm">{item.cost} pts</span>
                            </div>
                          )}

                          {/* Equipped Badge */}
                          {equipped && (
                            <div className="absolute top-2 right-2 bg-teal-500 rounded-full p-1">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}

                          {/* Level Badge */}
                          {owned && item.maxLevel && item.maxLevel > 1 && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-800/80 text-xs text-amber-400 font-bold">
                              Lv.{level}/{item.maxLevel}
                            </div>
                          )}

                          {/* Rarity Badge */}
                          <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full ${info.bgColor} border ${info.borderColor}`}>
                            <span className={`text-xs font-medium ${info.textColor}`}>{info.label}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3 bg-slate-800/50">
                          <p className="text-white text-sm font-medium truncate">{item.name}</p>
                          <p className="text-slate-500 text-xs burmese-text truncate">{item.nameMm}</p>
                          
                          {/* Stats Preview */}
                          {item.stats && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {item.stats.luck && <span className="text-xs text-green-400">+{item.stats.luck * level} Luck</span>}
                              {item.stats.charm && <span className="text-xs text-pink-400">+{item.stats.charm * level} Charm</span>}
                              {item.stats.wisdom && <span className="text-xs text-blue-400">+{item.stats.wisdom * level} Wis</span>}
                              {item.stats.power && <span className="text-xs text-red-400">+{item.stats.power * level} Pwr</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Equipment Detail Modal */}
              <AnimatePresence>
                {selectedEquipment && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedEquipment(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="relative max-w-md w-full glass-card p-6 bg-slate-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-4 border-white/10 mb-4">
                          <Image
                            src={selectedEquipment.image}
                            alt={selectedEquipment.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white">{selectedEquipment.name}</h3>
                        <p className="text-slate-400 text-sm burmese-text">{selectedEquipment.nameMm}</p>
                        <p className="text-slate-500 mt-2">{selectedEquipment.description}</p>
                        
                        {/* Stats */}
                        {selectedEquipment.stats && (
                          <div className="flex justify-center gap-4 mt-4">
                            {selectedEquipment.stats.luck && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-400">+{selectedEquipment.stats.luck}</div>
                                <div className="text-xs text-slate-500">Luck</div>
                              </div>
                            )}
                            {selectedEquipment.stats.charm && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-pink-400">+{selectedEquipment.stats.charm}</div>
                                <div className="text-xs text-slate-500">Charm</div>
                              </div>
                            )}
                            {selectedEquipment.stats.wisdom && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-400">+{selectedEquipment.stats.wisdom}</div>
                                <div className="text-xs text-slate-500">Wisdom</div>
                              </div>
                            )}
                            {selectedEquipment.stats.power && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-red-400">+{selectedEquipment.stats.power}</div>
                                <div className="text-xs text-slate-500">Power</div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex gap-3 mt-6">
                          <Button variant="outline" className="flex-1 border-white/10" onClick={() => setSelectedEquipment(null)}>
                            Cancel
                          </Button>
                          
                          {ownedEquipment.includes(selectedEquipment.id) ? (
                            <>
                              {equippedItems[selectedEquipment.slot] === selectedEquipment.id ? (
                                <Button 
                                  className="flex-1 bg-slate-600" 
                                  onClick={() => { handleEquipItem(selectedEquipment); setSelectedEquipment(null); }}
                                >
                                  Unequip
                                </Button>
                              ) : (
                                <Button 
                                  className="flex-1 btn-primary" 
                                  onClick={() => { handleEquipItem(selectedEquipment); setSelectedEquipment(null); }}
                                >
                                  Equip
                                </Button>
                              )}
                              
                              {selectedEquipment.maxLevel && selectedEquipment.maxLevel > 1 && 
                               (equipmentLevels[selectedEquipment.id] || 1) < selectedEquipment.maxLevel && (
                                <Button 
                                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500" 
                                  onClick={() => { handleUpgradeEquipment(selectedEquipment); }}
                                >
                                  <TrendingUp className="h-4 w-4 mr-1" />
                                  Upgrade ({getUpgradeCost(selectedEquipment, equipmentLevels[selectedEquipment.id] || 1)} pts)
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button 
                              className="flex-1 btn-primary" 
                              onClick={() => { handleBuyEquipment(selectedEquipment); setSelectedEquipment(null); }}
                            >
                              Buy ({selectedEquipment.cost} pts)
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardHeader>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-teal-400" />
                Profile
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-teal-500/50">
                  <Image
                    src={selectedAvatar}
                    alt="Your avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-white">{user?.displayName || 'Guest User'}</p>
                  <p className="text-slate-400">{user?.email || 'Not logged in'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">{user?.level || 'Amateur'}</Badge>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      <Star className="h-3 w-3 mr-1" />{user?.points || 0} pts
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div className="mt-4">
                <label className="block text-sm text-slate-400 mb-2">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-input"
                />
              </div>

              {/* Referral Code */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Your Referral Code</p>
                    <p className="text-xl font-mono text-teal-400 font-bold">{user?.referralCode || 'REFXXXXX'}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => {
                      navigator.clipboard.writeText(user?.referralCode || '');
                      toast({ title: 'Copied!', description: 'Referral code copied to clipboard' });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* PREFERENCES TAB */}
      {activeTab === 'preferences' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardHeader>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-teal-400" />
                Preferences
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="h-5 w-5 text-slate-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                  <div>
                    <p className="font-medium text-white">Appearance</p>
                    <p className="text-sm text-slate-500">Toggle light or dark mode</p>
                    <p className="text-xs text-slate-600 burmese-text">အနက်/အဖြူ မုဒ်</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                  >
                    <Sun className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Text Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-white">Text Mode</p>
                    <p className="text-sm text-slate-500">Reduce visual effects for faster loading</p>
                  </div>
                </div>
                <button
                  onClick={() => setTextMode(!textMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${textMode ? 'bg-teal-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${textMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Low Data Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-white">Low Data Mode</p>
                    <p className="text-sm text-slate-500">Reduce data usage for slower connections</p>
                    <p className="text-xs text-slate-600 burmese-text">ဒေတာသက်သာစေရန်</p>
                  </div>
                </div>
                <button
                  onClick={() => setLowData(!lowData)}
                  className={`w-12 h-6 rounded-full transition-colors ${lowData ? 'bg-teal-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${lowData ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-slate-500">Get notified about new jobs and rewards</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-teal-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Save Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Button 
          className="btn-primary w-full py-6 text-lg" 
          onClick={() => {
            toast({ 
              title: 'Settings saved!', 
              description: 'Your preferences have been updated successfully.' 
            });
          }}
        >
          <Save className="mr-2 h-5 w-5" />
          Save All Changes
        </Button>
      </motion.div>

      {/* Edutainment Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="glass-card border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Edutainment Framework</h4>
                <p className="text-slate-300 text-sm mb-3">
                  Learn more, earn more points, equip better gear! Complete courses in the Academy to earn points, 
                  then spend them on awesome equipment for your avatar. Level up your equipment to boost your stats!
                </p>
                <p className="text-slate-500 text-xs burmese-text">
                  ပိုမိုသင်ကြားပါ၊ ပိုမိုရမှတ်ရယူပါ၊ ပိုကောင်းသော ပစ္စည်းများ တပ်ဆင်ပါ! 
                  Academy တွင် သင်ခန်းစားများ ပြီးမြောက်ပါက ရမှတ်များ ရရှိပါမည်။
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge className="bg-teal-500/20 text-teal-400">Complete Course = +50 pts</Badge>
                  <Badge className="bg-purple-500/20 text-purple-400">Pass Quiz = +20 pts</Badge>
                  <Badge className="bg-amber-500/20 text-amber-400">Refer Friend = +100 pts</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
