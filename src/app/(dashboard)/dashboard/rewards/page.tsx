'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Lock, Check, Star, Crown, FileText, MessageSquare, 
  Palette, Sparkles, Zap, Eye, X, Download, Users, Award, 
  Flame, Trophy, Heart, Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface ShopItem {
  id: string;
  name: string;
  nameMm: string;
  description: string;
  cost: number;
  category: 'avatar' | 'feature' | 'premium' | 'skin';
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  preview?: string;
}

const shopItems: ShopItem[] = [
  // Avatar Items
  { 
    id: 'avatar-male-pro', 
    name: 'Business Professional (Male)', 
    nameMm: 'စီးပွားရေး ပရော်ဖက်ရှင်နယ် (ကျား)', 
    description: 'Professional male avatar in business attire', 
    cost: 50, 
    category: 'avatar', 
    icon: Crown,
    rarity: 'common',
    preview: '👨‍💼'
  },
  { 
    id: 'avatar-female-pro', 
    name: 'Career Woman', 
    nameMm: 'အလုပ်အကိုင် အမျိုးသမီး', 
    description: 'Professional female avatar in elegant style', 
    cost: 50, 
    category: 'avatar', 
    icon: Crown,
    rarity: 'common',
    preview: '👩‍💼'
  },
  { 
    id: 'avatar-frame-gold', 
    name: 'Golden Avatar Frame', 
    nameMm: 'ရွှေ Avatar ဘောင်', 
    description: 'Exclusive golden frame for your avatar', 
    cost: 200, 
    category: 'avatar', 
    icon: Star,
    rarity: 'rare'
  },
  { 
    id: 'avatar-frame-diamond', 
    name: 'Diamond Avatar Frame', 
    nameMm: 'စိန် Avatar ဘောင်', 
    description: 'Premium diamond frame with sparkle effect', 
    cost: 500, 
    category: 'avatar', 
    icon: Sparkles,
    rarity: 'legendary'
  },
  
  // Feature Unlocks
  { 
    id: 'cv-template', 
    name: 'Professional CV Template', 
    nameMm: 'CV ပုံစံ', 
    description: 'Downloadable CV template designed for Myanmar job market', 
    cost: 30, 
    category: 'feature', 
    icon: FileText,
    rarity: 'common'
  },
  { 
    id: 'ai-cv-creator', 
    name: 'AI CV Creator', 
    nameMm: 'AI CV ဖန်တီးသူ', 
    description: 'AI-powered CV builder with smart suggestions for your industry', 
    cost: 100, 
    category: 'feature', 
    icon: Sparkles,
    rarity: 'rare'
  },
  { 
    id: 'mentor-chat', 
    name: 'Mentor Chat Access', 
    nameMm: 'ဆရာနှင့် စကားပြောခွင့်', 
    description: '1-on-1 chat with experienced recruiters for career advice', 
    cost: 150, 
    category: 'feature', 
    icon: MessageSquare,
    rarity: 'epic'
  },
  { 
    id: 'priority-jobs', 
    name: 'Priority Job Alerts', 
    nameMm: 'ဦးစားပေး အလုပ်အသိပေးချက်', 
    description: 'Get notified first when high-reward jobs are posted', 
    cost: 80, 
    category: 'feature', 
    icon: Zap,
    rarity: 'rare'
  },
  
  // Premium Skins
  { 
    id: 'skin-chibi', 
    name: 'Chibi Avatar Pack', 
    nameMm: 'Chibi Avatar Pack', 
    description: 'Cute chibi-style avatar skins (5 variations)', 
    cost: 150, 
    category: 'skin', 
    icon: Heart,
    rarity: 'rare'
  },
  { 
    id: 'skin-executive', 
    name: 'Executive Collection', 
    nameMm: 'Executive စုစည်းမှု', 
    description: 'Premium executive avatar skins for professionals', 
    cost: 300, 
    category: 'skin', 
    icon: Crown,
    rarity: 'epic'
  },
  { 
    id: 'skin-limited', 
    name: 'Limited Edition 2025', 
    nameMm: 'ကန့်သတ်ထုတ် ၂၀၂၅', 
    description: 'Exclusive limited edition avatar - only 100 available!', 
    cost: 1000, 
    category: 'skin', 
    icon: Trophy,
    rarity: 'legendary'
  },
  
  // Premium Features
  { 
    id: 'premium-support', 
    name: 'Priority Support', 
    nameMm: 'ဦးစားပေး ပံ့ပိုးမှု', 
    description: '24/7 priority support for all your questions', 
    cost: 200, 
    category: 'premium', 
    icon: Zap,
    rarity: 'epic'
  },
  { 
    id: 'referral-boost', 
    name: 'Referral Boost', 
    nameMm: 'ရည်ညွှန်း အားသွင်းမှု', 
    description: '+5% bonus on all referral rewards for 30 days', 
    cost: 250, 
    category: 'premium', 
    icon: Gift,
    rarity: 'epic'
  },
];

const categoryLabels = {
  avatar: { en: 'Avatar Items', mm: 'Avatar ပစ္စည်းများ', color: 'from-purple-500 to-pink-500', icon: Crown },
  feature: { en: 'Feature Unlocks', mm: 'Feature ဖွင့်လှစ်မှုများ', color: 'from-teal-500 to-cyan-500', icon: Sparkles },
  skin: { en: 'Premium Skins', mm: 'Premium Skins', color: 'from-pink-500 to-rose-500', icon: Palette },
  premium: { en: 'Premium Features', mm: 'Premium Features', color: 'from-amber-500 to-orange-500', icon: Zap },
};

const rarityColors = {
  common: 'border-slate-500/30 bg-slate-500/5',
  rare: 'border-blue-500/30 bg-blue-500/5',
  epic: 'border-purple-500/30 bg-purple-500/5',
  legendary: 'border-amber-500/30 bg-amber-500/5',
};

const rarityBadgeColors = {
  common: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function RewardsPage() {
  const { user, purchaseItem, deductPoints } = useAuth();
  const [activeCategory, setActiveCategory] = useState<'avatar' | 'feature' | 'premium' | 'skin' | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });

  const purchasedItems = user?.purchasedItems || [];
  const points = user?.points || 0;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handlePurchase = (item: ShopItem) => {
    if (purchasedItems.includes(item.id)) {
      showToast('You already own this item!', 'error');
      return;
    }
    
    if (points < item.cost) {
      showToast('Not enough points!', 'error');
      return;
    }

    const success = purchaseItem(item.id, item.cost);
    
    if (success) {
      showToast(`Successfully purchased ${item.name}! 🎉`, 'success');
      setSelectedItem(null);
    } else {
      showToast('Purchase failed. Please try again.', 'error');
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? shopItems 
    : shopItems.filter(i => i.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-teal-400" />
            Points Shop
          </h1>
          <p className="text-slate-400 burmese-text">အမှတ်ဆိုင် - သင့်အမှတ်များကို သုံးပါ</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="glass-card px-6 py-3 flex items-center gap-3">
            <Star className="h-6 w-6 text-amber-400 animate-pulse" />
            <div>
              <span className="text-2xl font-bold text-amber-400">{points}</span>
              <span className="text-slate-400 ml-2">points</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveCategory('all')} 
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === 'all' 
              ? 'bg-teal-500 text-slate-900' 
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All Items
        </button>
        {(['avatar', 'feature', 'skin', 'premium'] as const).map((cat) => {
          const IconComponent = categoryLabels[cat].icon;
          return (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === cat 
                  ? 'bg-teal-500 text-slate-900' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              {categoryLabels[cat].en}
            </button>
          );
        })}
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => {
          const isPurchased = purchasedItems.includes(item.id);
          const canAfford = points >= item.cost;
          
          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={`glass-card-hover h-full cursor-pointer transition-all ${rarityColors[item.rarity]} ${
                  isPurchased ? 'border-green-500/30 bg-green-500/5' : ''
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${categoryLabels[item.category].color} flex items-center justify-center text-2xl`}>
                      {item.preview || <item.icon className="h-7 w-7 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white truncate">{item.name}</h3>
                      </div>
                      <p className="text-slate-500 text-sm burmese-text truncate">{item.nameMm}</p>
                      <Badge className={`mt-2 ${rarityBadgeColors[item.rarity]} capitalize`}>
                        {item.rarity}
                      </Badge>
                    </div>
                    {isPurchased && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Check className="h-3 w-3 mr-1" />Owned
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className={`font-bold ${canAfford ? 'text-amber-400' : 'text-red-400'}`}>
                        {item.cost}
                      </span>
                      <span className="text-slate-500 text-sm">pts</span>
                    </div>
                    
                    <Button
                      size="sm"
                      className={`${isPurchased 
                        ? 'bg-green-500/20 text-green-400 cursor-default' 
                        : canAfford 
                          ? 'btn-primary' 
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                      disabled={isPurchased || !canAfford}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(item);
                      }}
                    >
                      {isPurchased ? (
                        <><Check className="mr-1 h-4 w-4" />Owned</>
                      ) : canAfford ? (
                        <><ShoppingBag className="mr-1 h-4 w-4" />Buy</>
                      ) : (
                        <><Lock className="mr-1 h-4 w-4" />Locked</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Earn More Points */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              How to Earn More Points
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { action: 'Complete modules', points: '+10-80', icon: Award },
                { action: 'Daily login', points: '+10-20', icon: Gift },
                { action: 'Streak bonus', points: '+5-75', icon: Flame },
                { action: 'Referral signup', points: '+25', icon: Users },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                  <item.icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300 mb-1">{item.action}</div>
                  <div className="text-lg font-bold text-amber-400">{item.points}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-card p-6 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${categoryLabels[selectedItem.category].color} flex items-center justify-center text-4xl mx-auto mb-4`}>
                  {selectedItem.preview || <selectedItem.icon className="h-10 w-10 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedItem.name}</h2>
                <p className="text-slate-500 burmese-text">{selectedItem.nameMm}</p>
                <Badge className={`mt-2 ${rarityBadgeColors[selectedItem.rarity]} capitalize`}>
                  {selectedItem.rarity}
                </Badge>
              </div>

              <p className="text-slate-300 text-center mb-6">{selectedItem.description}</p>

              <div className="flex items-center justify-center gap-2 mb-6 p-4 rounded-xl bg-slate-800/50">
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-2xl font-bold text-amber-400">{selectedItem.cost}</span>
                <span className="text-slate-400">points</span>
              </div>

              {purchasedItems.includes(selectedItem.id) ? (
                <Button className="w-full bg-green-500/20 text-green-400" disabled>
                  <Check className="mr-2 h-4 w-4" />You Own This Item
                </Button>
              ) : points >= selectedItem.cost ? (
                <Button 
                  className="w-full btn-primary"
                  onClick={() => handlePurchase(selectedItem)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Purchase for {selectedItem.cost} Points
                </Button>
              ) : (
                <div className="text-center">
                  <Button className="w-full bg-slate-700 text-slate-400 cursor-not-allowed" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Need {selectedItem.cost - points} More Points
                  </Button>
                  <p className="text-slate-500 text-sm mt-2">
                    Complete more modules or login daily to earn points!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
