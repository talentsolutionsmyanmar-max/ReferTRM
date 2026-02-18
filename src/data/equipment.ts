// Equipment System for Avatar Gamification
// Final Fantasy VII inspired equipment upgrade system

export type EquipmentSlot = 'head' | 'body' | 'accessory' | 'background';
export type EquipmentRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface EquipmentItem {
  id: string;
  name: string;
  nameMm: string;
  image: string;
  slot: EquipmentSlot;
  rarity: EquipmentRarity;
  cost: number;
  description: string;
  descriptionMm: string;
  stats?: {
    luck?: number;      // Increases referral bonus chance
    charm?: number;     // Increases profile visibility
    wisdom?: number;    // Increases learning point bonus
    power?: number;     // Increases overall score
  };
  upgradeCost?: number;
  maxLevel?: number;
}

export const rarityInfo = {
  common: { 
    label: 'Common', 
    labelMm: 'သာမန်', 
    color: 'from-slate-400 to-slate-500', 
    bgColor: 'bg-slate-500/20', 
    borderColor: 'border-slate-500/30', 
    textColor: 'text-slate-300',
    glow: 'shadow-slate-500/20' 
  },
  rare: { 
    label: 'Rare', 
    labelMm: 'ရှားပါး', 
    color: 'from-blue-400 to-cyan-500', 
    bgColor: 'bg-blue-500/20', 
    borderColor: 'border-blue-500/30', 
    textColor: 'text-blue-400',
    glow: 'shadow-blue-500/20' 
  },
  epic: { 
    label: 'Epic', 
    labelMm: 'ကြီးကျယ်', 
    color: 'from-purple-400 to-pink-500', 
    bgColor: 'bg-purple-500/20', 
    borderColor: 'border-purple-500/30', 
    textColor: 'text-purple-400',
    glow: 'shadow-purple-500/20' 
  },
  legendary: { 
    label: 'Legendary', 
    labelMm: 'ဒဏ္ဍာရီ', 
    color: 'from-amber-400 to-orange-500', 
    bgColor: 'bg-amber-500/20', 
    borderColor: 'border-amber-500/30', 
    textColor: 'text-amber-400',
    glow: 'shadow-amber-500/20' 
  },
};

export const slotInfo = {
  head: { 
    label: 'Head', 
    labelMm: 'ခေါင်း', 
    icon: '🎓', 
    description: 'Headgear and hats',
    descriptionMm: 'ခေါင်းစွပ်များ' 
  },
  body: { 
    label: 'Body', 
    labelMm: 'ကိုယ်', 
    icon: '👕', 
    description: 'Outfits and armor',
    descriptionMm: 'အဝတ်အစားများ' 
  },
  accessory: { 
    label: 'Accessory', 
    labelMm: 'ပစ္စည်း', 
    icon: '💎', 
    description: 'Jewelry and items',
    descriptionMm: 'လက်ဝတ်ရတနာများ' 
  },
  background: { 
    label: 'Background', 
    labelMm: 'နောက်ခံ', 
    icon: '🌈', 
    description: 'Special backgrounds',
    descriptionMm: 'နောက်ခံအထူးများ' 
  },
};

export const equipmentCollection: EquipmentItem[] = [
  // ===== HEAD GEAR =====
  {
    id: 'head-graduation',
    name: 'Graduation Cap',
    nameMm: 'ဘွဲ့တပ်ဆင်သောဦးထုပ်',
    image: '/equipment/head-graduation.png',
    slot: 'head',
    rarity: 'common',
    cost: 50,
    description: 'Symbol of education achievement',
    descriptionMm: 'ပညာရေးဆိုင်ရာ အောင်မြင်မှု၏ ပြယုဂ်',
    stats: { wisdom: 5 },
    maxLevel: 5,
    upgradeCost: 30,
  },
  {
    id: 'head-wizard',
    name: 'Wizard Hat',
    nameMm: 'မှော်ဆရာဦးထုပ်',
    image: '/equipment/head-wizard-hat.png',
    slot: 'head',
    rarity: 'rare',
    cost: 150,
    description: 'Magical knowledge amplifier',
    descriptionMm: 'မှော်ပညာ အသိဉာဏ် တိုးတက်စေသည်',
    stats: { wisdom: 10, power: 5 },
    maxLevel: 5,
    upgradeCost: 80,
  },
  {
    id: 'head-samurai',
    name: 'Samurai Kabuto',
    nameMm: 'ဆာမူရိုင်းဦးထုပ်',
    image: '/equipment/head-samurai.png',
    slot: 'head',
    rarity: 'epic',
    cost: 400,
    description: 'Warrior spirit and discipline',
    descriptionMm: 'စစ်သားစိတ်ဓာတ်နှင့် စည်းကမ်း',
    stats: { power: 15, luck: 5 },
    maxLevel: 5,
    upgradeCost: 200,
  },
  {
    id: 'head-crown',
    name: 'Golden Crown',
    nameMm: 'ရွှေသရဖူ',
    image: '/equipment/head-crown-gold.png',
    slot: 'head',
    rarity: 'legendary',
    cost: 1000,
    description: 'Rule the referral kingdom',
    descriptionMm: 'ရည်ညွှန်းဘုရင်နိုင်ငံကို အုပ်ချုပ်ပါ',
    stats: { luck: 20, charm: 15, power: 10 },
    maxLevel: 5,
    upgradeCost: 500,
  },

  // ===== BODY GEAR =====
  {
    id: 'body-tech-hoodie',
    name: 'Tech Hoodie',
    nameMm: 'နည်းပညာဟူဒီ',
    image: '/equipment/body-tech-hoodie.png',
    slot: 'body',
    rarity: 'common',
    cost: 75,
    description: 'Modern tech professional look',
    descriptionMm: 'မော်ဒန်နည်းပညာ ပရော်ဖက်ရှင်နယ် ပုံစံ',
    stats: { wisdom: 5, charm: 3 },
    maxLevel: 5,
    upgradeCost: 40,
  },
  {
    id: 'body-business',
    name: 'Business Suit',
    nameMm: 'စီးပွားရေးအင်္ကျီ',
    image: '/equipment/body-business-suit.png',
    slot: 'body',
    rarity: 'rare',
    cost: 200,
    description: 'Professional corporate style',
    descriptionMm: 'ပရော်ဖက်ရှင်နယ် ကော်ပိုရိတ် ပုံစံ',
    stats: { charm: 10, luck: 5 },
    maxLevel: 5,
    upgradeCost: 100,
  },
  {
    id: 'body-armor',
    name: 'Golden Armor',
    nameMm: 'ရွှေချပ်ဝတ်တန်ဆာ',
    image: '/equipment/body-armor-gold.png',
    slot: 'body',
    rarity: 'epic',
    cost: 500,
    description: 'Legendary warrior protection',
    descriptionMm: 'ဒဏ္ဍာရီ စစ်သား ကာကွယ်မှု',
    stats: { power: 20, luck: 5 },
    maxLevel: 5,
    upgradeCost: 250,
  },
  {
    id: 'body-angel-wings',
    name: 'Angel Wings',
    nameMm: 'ကောင်းကင်တံ翅膀',
    image: '/equipment/body-angel-wings.png',
    slot: 'body',
    rarity: 'legendary',
    cost: 1500,
    description: 'Divine presence and aura',
    descriptionMm: 'ကောင်းကင်ဘုံ တည်ရှိမှုနှင့် ထင်ရှားမှု',
    stats: { charm: 25, wisdom: 10, power: 15, luck: 10 },
    maxLevel: 5,
    upgradeCost: 750,
  },

  // ===== ACCESSORIES =====
  {
    id: 'accessory-trophy',
    name: 'Champion Trophy',
    nameMm: 'ချန်ပီယံဖလား',
    image: '/equipment/accessory-trophy.png',
    slot: 'accessory',
    rarity: 'common',
    cost: 60,
    description: 'Symbol of victory',
    descriptionMm: 'အောင်ပွဲ၏ ပြယုဂ်',
    stats: { luck: 5 },
    maxLevel: 5,
    upgradeCost: 30,
  },
  {
    id: 'accessory-cyber-visor',
    name: 'Cyber Visor',
    nameMm: 'ဆိုက်ဘာမျက်မှန်',
    image: '/equipment/accessory-cyber-visor.png',
    slot: 'accessory',
    rarity: 'rare',
    cost: 180,
    description: 'See opportunities everywhere',
    descriptionMm: 'အခွင့်အလမ်းများကို အနီကျင့်တွေ့ပါ',
    stats: { luck: 10, wisdom: 5 },
    maxLevel: 5,
    upgradeCost: 90,
  },
  {
    id: 'accessory-diamond',
    name: 'Diamond Necklace',
    nameMm: 'စွန်းလွန်းရတနာ',
    image: '/equipment/accessory-diamond-necklace.png',
    slot: 'accessory',
    rarity: 'legendary',
    cost: 1200,
    description: 'Ultimate luxury and prestige',
    descriptionMm: 'အဆင့်အတန်းမြင့် ခမ်းနားမှု',
    stats: { charm: 30, luck: 15 },
    maxLevel: 5,
    upgradeCost: 600,
  },

  // ===== BACKGROUNDS =====
  {
    id: 'bg-beach',
    name: 'Beach Sunset',
    nameMm: 'ကမ်းခြေနေဝင်ချိန်',
    image: '/equipment/bg-beach-sunset.png',
    slot: 'background',
    rarity: 'rare',
    cost: 250,
    description: 'Relaxing tropical paradise',
    descriptionMm: 'သက်တောင့်သက်သာ ပင်လယ်ကမ်းခြေ',
    stats: { charm: 8 },
    maxLevel: 1,
  },
  {
    id: 'bg-magical',
    name: 'Magical Aura',
    nameMm: 'မှော်ဆန်သောအန်နာ',
    image: '/equipment/bg-magical-aura.png',
    slot: 'background',
    rarity: 'epic',
    cost: 450,
    description: 'Mystical energy surrounds you',
    descriptionMm: 'မှော်ဆန်သော စွမ်းအင်ဖြင့် ဝန်းရံ',
    stats: { power: 10, wisdom: 5 },
    maxLevel: 1,
  },
  {
    id: 'bg-cyber',
    name: 'Cyber City',
    nameMm: 'ဆိုက်ဘာမြို့',
    image: '/equipment/bg-cyber-city.png',
    slot: 'background',
    rarity: 'legendary',
    cost: 800,
    description: 'Futuristic neon metropolis',
    descriptionMm: 'အနာဂတ် နီယွန်မြို့ကြီး',
    stats: { charm: 15, power: 10, luck: 5 },
    maxLevel: 1,
  },
];

// Helper functions
export const getEquipmentBySlot = (slot: EquipmentSlot): EquipmentItem[] => 
  equipmentCollection.filter(item => item.slot === slot);

export const getEquipmentByRarity = (rarity: EquipmentRarity): EquipmentItem[] => 
  equipmentCollection.filter(item => item.rarity === rarity);

export const getEquipmentById = (id: string): EquipmentItem | undefined => 
  equipmentCollection.find(item => item.id === id);

export const getTotalStats = (equippedItems: string[]): Record<string, number> => {
  const stats = { luck: 0, charm: 0, wisdom: 0, power: 0 };
  
  equippedItems.forEach(itemId => {
    const item = getEquipmentById(itemId);
    if (item?.stats) {
      stats.luck += item.stats.luck || 0;
      stats.charm += item.stats.charm || 0;
      stats.wisdom += item.stats.wisdom || 0;
      stats.power += item.stats.power || 0;
    }
  });
  
  return stats;
};

// Upgrade cost calculator
export const getUpgradeCost = (item: EquipmentItem, currentLevel: number): number => {
  if (!item.upgradeCost || currentLevel >= (item.maxLevel || 5)) return 0;
  return Math.floor(item.upgradeCost * Math.pow(1.5, currentLevel - 1));
};

// Power level calculator for display
export const getPowerLevel = (equippedItems: string[]): number => {
  const stats = getTotalStats(equippedItems);
  return stats.luck + stats.charm + stats.wisdom + stats.power;
};
