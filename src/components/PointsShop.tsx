'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Lock, 
  Check, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Palette,
  Star,
  Crown,
  Zap,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShopItem {
  id: string;
  name: string;
  nameMm: string;
  description: string;
  descriptionMm: string;
  cost: number;
  category: 'avatar' | 'feature' | 'premium';
  icon: React.ElementType;
  image?: string;
  unlocked?: boolean;
}

const shopItems: ShopItem[] = [
  // Avatar Items
  {
    id: 'avatar-male-1',
    name: 'Business Professional',
    nameMm: 'စီးပွားရေး ပရော်ဖက်ရှင်နယ်',
    description: 'Male avatar in business attire',
    descriptionMm: 'စီးပွားရေးအဝတ်အစားဖြင့် အမျိုးသားအvata',
    cost: 50,
    category: 'avatar',
    icon: Crown,
  },
  {
    id: 'avatar-female-1',
    name: 'Career Woman',
    nameMm: 'အလုပ်အကိုင် အမျိုးသမီး',
    description: 'Female avatar in professional style',
    descriptionMm: 'ပရော်ဖက်ရှင်နယ်ပုံစံဖြင့် အမျိုးသမီးအvata',
    cost: 50,
    category: 'avatar',
    icon: Crown,
  },
  {
    id: 'avatar-premium-1',
    name: 'Golden Avatar Frame',
    nameMm: 'ရွှေအvata ဘောင်',
    description: 'Exclusive golden frame for your avatar',
    descriptionMm: 'သင့်အvataအတွက် အထူးရွှေဘောင်',
    cost: 200,
    category: 'avatar',
    icon: Star,
  },
  // Feature Unlocks
  {
    id: 'cv-template',
    name: 'Professional CV Template',
    nameMm: 'ပရော်ဖက်ရှင်နယ် CV ပုံစံ',
    description: 'Downloadable CV template designed for Myanmar job market',
    descriptionMm: 'မြန်မာအလုပ်ဈေးကွက်အတွက် ဒီဇိုင်းထုတ်ထားသော CV ပုံစံ',
    cost: 30,
    category: 'feature',
    icon: FileText,
  },
  {
    id: 'ai-cv-creator',
    name: 'AI CV Creator',
    nameMm: 'AI CV ဖန်တီးသူ',
    description: 'AI-powered CV builder with suggestions',
    descriptionMm: 'အကြံပြုချက်များပါဝင်သော AI စွမ်းအားဖြင့် CV တည်ဆောက်သူ',
    cost: 100,
    category: 'feature',
    icon: Sparkles,
  },
  {
    id: 'mentor-chat',
    name: 'Mentor Chat Access',
    nameMm: 'ဆရာများနှင့် စကားပြောခွင့်',
    description: 'Chat with experienced recruiters for career advice',
    descriptionMm: 'အလုပ်အကိုင်အကြံဉာဏ်အတွက် အတွေ့အကြုံရှိ စုံရှာဖွေသူများနှင့် စကားပြောပါ',
    cost: 150,
    category: 'feature',
    icon: MessageSquare,
  },
  // Premium Features
  {
    id: 'premium-skin',
    name: 'Premium Avatar Skins',
    nameMm: 'အထူးအvata အသားအရေများ',
    description: 'Unlock all premium avatar customization options',
    descriptionMm: 'အထူးအvata စိတ်ကြိုက်ပြင်ဆင်မှု ရွေးချယ်စရာများအားလုံး',
    cost: 300,
    category: 'premium',
    icon: Palette,
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    nameMm: 'ဦးစားပေး ပံ့ပိုးမှု',
    description: '24/7 priority support for all your questions',
    descriptionMm: 'သင့်မေးခွန်းများအားလုံးအတွက် ၂၄/၇ ဦးစားပေး ပံ့ပိုးမှု',
    cost: 200,
    category: 'premium',
    icon: Zap,
  },
];

const categoryLabels = {
  avatar: { en: 'Avatar Items', mm: 'အvata ပစ္စည်းများ' },
  feature: { en: 'Feature Unlocks', mm: 'အသွင်းအပြင် ဖွင့်လှစ်မှုများ' },
  premium: { en: 'Premium Features', mm: 'အထူးအသွင်းအပြင်များ' },
};

const categoryColors = {
  avatar: 'from-purple-500 to-pink-500',
  feature: 'from-teal-500 to-cyan-500',
  premium: 'from-amber-500 to-orange-500',
};

interface PointsShopProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
}

export default function PointsShop({ isOpen, onClose, userPoints }: PointsShopProps) {
  const [points, setPoints] = useState(userPoints);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePurchase = (item: ShopItem) => {
    if (purchasedItems.includes(item.id)) {
      showToastMessage('Already owned! ✓', 'info');
      return;
    }
    
    if (points >= item.cost) {
      setPoints(points - item.cost);
      setPurchasedItems([...purchasedItems, item.id]);
      showToastMessage(`Purchased ${item.name}! -${item.cost} points`, 'success');
    } else {
      showToastMessage('Not enough points! Keep learning 📚', 'error');
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!isOpen) return null;

  const categories = ['avatar', 'feature', 'premium'] as const;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-4xl glass-card p-6 bg-slate-900 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Points Shop</h2>
                <p className="text-slate-400 burmese-text text-sm">အမှတ်ဆိုင်</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-xl font-bold text-amber-400">{points}</span>
                <span className="text-slate-400 text-sm">pts</span>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Shop Items by Category */}
          <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center`}>
                    {category === 'avatar' && <Crown className="h-4 w-4 text-white" />}
                    {category === 'feature' && <Sparkles className="h-4 w-4 text-white" />}
                    {category === 'premium' && <Star className="h-4 w-4 text-white" />}
                  </div>
                  {categoryLabels[category].en}
                  <span className="text-slate-500 burmese-text text-sm font-normal">
                    ({categoryLabels[category].mm})
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shopItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const isPurchased = purchasedItems.includes(item.id);
                      const canAfford = points >= item.cost;
                      
                      return (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          className={`glass-card-hover p-4 ${
                            isPurchased ? 'border-green-500/30 bg-green-500/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryColors[category]} flex items-center justify-center flex-shrink-0`}>
                              <item.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white">{item.name}</h4>
                              <p className="text-slate-500 text-xs burmese-text">{item.nameMm}</p>
                            </div>
                            {isPurchased && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <Check className="h-3 w-3 mr-1" /> Owned
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                          <p className="text-slate-500 text-xs burmese-text mb-4">{item.descriptionMm}</p>
                          <Button
                            className={`w-full ${
                              isPurchased
                                ? 'bg-green-500/20 text-green-400 cursor-default'
                                : canAfford
                                ? 'btn-teal'
                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            }`}
                            onClick={() => handlePurchase(item)}
                            disabled={isPurchased}
                          >
                            {isPurchased ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Owned
                              </>
                            ) : (
                              <>
                                <Star className="mr-2 h-4 w-4" />
                                {item.cost} Points
                              </>
                            )}
                          </Button>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-6 py-3 bg-slate-800"
              >
                <p className="text-white text-center">{toastMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
