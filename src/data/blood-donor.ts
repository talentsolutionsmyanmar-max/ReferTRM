// Blood Donor Network System for Myanmar
// LIFE-SAVING FEATURE - Connect blood donors with those in need
// NON-POLITICAL - Pure humanitarian service

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';

export type UrgencyLevel = 'critical' | 'urgent' | 'normal';

export type BloodRequestStatus = 'active' | 'fulfilled' | 'expired' | 'cancelled';

export interface BloodRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterPhone: string;
  bloodType: BloodType;
  urgency: UrgencyLevel;
  hospital: string;
  hospitalAddress: string;
  region: string;
  notes?: string;
  status: BloodRequestStatus;
  createdAt: string;
  expiresAt: string;
  requiredUnits: number;
  fulfilledUnits: number;
  donors?: BloodDonation[];
}

export interface BloodDonation {
  donorId: string;
  donorName: string;
  donorPhone: string;
  bloodType: BloodType;
  donatedAt: string;
}

export interface BloodDonor {
  userId: string;
  displayName: string;
  phone: string;
  bloodType: BloodType;
  region: string;
  available: boolean;
  lastDonation?: string;
  donationCount: number;
  registeredAt: string;
  // Health info
  age?: number;
  weight?: number;
  conditions?: string[];
  medications?: string[];
  verified: boolean;
}

// Blood type compatibility chart
export const bloodTypeCompatibility = {
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
  },
  'A-': {
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-'],
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
  },
  'B-': {
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-'],
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal recipient
  },
  'AB-': {
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
  },
  'O-': {
    canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal donor
    canReceiveFrom: ['O-'],
  },
  'unknown': {
    canDonateTo: [],
    canReceiveFrom: ['O-'], // Safe default
  },
};

// Blood type info with Burmese translations
export const bloodTypeInfo = {
  'A+': { 
    label: 'A+', 
    labelMm: 'A+', 
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    percentage: 27, // Approximate percentage in Myanmar
  },
  'A-': { 
    label: 'A-', 
    labelMm: 'A-', 
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/20',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    percentage: 6,
  },
  'B+': { 
    label: 'B+', 
    labelMm: 'B+', 
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    percentage: 32,
  },
  'B-': { 
    label: 'B-', 
    labelMm: 'B-', 
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-500/20',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    percentage: 2,
  },
  'AB+': { 
    label: 'AB+', 
    labelMm: 'AB+', 
    color: 'from-purple-500 to-fuchsia-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    percentage: 5,
    special: 'Universal Recipient',
    specialMm: 'Universal လက်ခံသူ',
  },
  'AB-': { 
    label: 'AB-', 
    labelMm: 'AB-', 
    color: 'from-fuchsia-500 to-pink-500',
    bgColor: 'bg-fuchsia-500/20',
    borderColor: 'border-fuchsia-500/30',
    textColor: 'text-fuchsia-400',
    percentage: 1,
  },
  'O+': { 
    label: 'O+', 
    labelMm: 'O+', 
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/20',
    borderColor: 'border-teal-500/30',
    textColor: 'text-teal-400',
    percentage: 26,
  },
  'O-': { 
    label: 'O-', 
    labelMm: 'O-', 
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    percentage: 1,
    special: 'Universal Donor',
    specialMm: 'Universal ပေးသူ',
  },
  'unknown': { 
    label: 'Unknown', 
    labelMm: 'မသိ', 
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/30',
    textColor: 'text-slate-400',
    percentage: 0,
  },
};

// Urgency levels
export const urgencyInfo = {
  critical: {
    label: 'Critical',
    labelMm: 'အလွန်အရေးပေါ်',
    description: 'Life-threatening - need blood within hours',
    descriptionMm: 'အသက်အန္တရာယ်ရှိ - နာရီအတွင်းလိုသည်',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: '🚨',
    hoursToExpiry: 6,
  },
  urgent: {
    label: 'Urgent',
    labelMm: 'အရေးပေါ်',
    description: 'Need blood within 24 hours',
    descriptionMm: '၂၄နာရီအတွင်းလိုသည်',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    icon: '⚠️',
    hoursToExpiry: 24,
  },
  normal: {
    label: 'Normal',
    labelMm: 'ပုံမှန်',
    description: 'Scheduled procedure - need blood within 3 days',
    descriptionMm: 'ချိန်းဆိုထားသောလုပ်ငန်း - ၃ရက်အတွင်းလိုသည်',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    icon: '📋',
    hoursToExpiry: 72,
  },
};

// Myanmar major hospitals
export const myanmarHospitals = [
  { id: 'yangon-general', name: 'Yangon General Hospital', nameMm: 'ရန်ကုန်ပြည်သူ့ဆေးရုံကြီး', region: 'yangon' },
  { id: 'yangon-children', name: 'Yangon Children Hospital', nameMm: 'ရန်ကုန်ကလေးဆေးရုံကြီး', region: 'yangon' },
  { id: 'yangon-women', name: 'Central Women Hospital', nameMm: 'အမျိုးသမီးဆေးရုံ', region: 'yangon' },
  { id: 'mandalay-general', name: 'Mandalay General Hospital', nameMm: 'မန္တလေးပြည်သူ့ဆေးရုံကြီး', region: 'mandalay' },
  { id: 'mandalay-children', name: 'Mandalay Children Hospital', nameMm: 'မန္တလေးကလေးဆေးရုံ', region: 'mandalay' },
  { id: 'naypyidaw-general', name: 'Naypyidaw General Hospital', nameMm: 'နေပြည်တော်ပြည်သူ့ဆေးရုံကြီး', region: 'naypyidaw' },
  { id: 'taunggyi-hospital', name: 'Taunggyi Hospital', nameMm: 'တောင်ကြီးဆေးရုံ', region: 'shan' },
  { id: 'mawlamyine-hospital', name: 'Mawlamyine Hospital', nameMm: 'မော်လမြိုင်ဆေးရုံ', region: 'mon' },
  { id: 'pathein-hospital', name: 'Pathein Hospital', nameMm: 'ဘသီးဆေးရုံ', region: 'ayeyarwady' },
  { id: 'sittwe-hospital', name: 'Sittwe Hospital', nameMm: 'စစ်တွေဆေးရုံ', region: 'rakhine' },
  { id: 'other', name: 'Other Hospital', nameMm: 'အခြားဆေးရုံ', region: 'all' },
];

// Myanmar regions for blood donor network
export const myanmarRegions = [
  { id: 'yangon', name: 'Yangon', nameMm: 'ရန်ကုန်' },
  { id: 'mandalay', name: 'Mandalay', nameMm: 'မန္တလေး' },
  { id: 'naypyidaw', name: 'Naypyidaw', nameMm: 'နေပြည်တော်' },
  { id: 'bago', name: 'Bago', nameMm: 'ပဲခူး' },
  { id: 'magway', name: 'Magway', nameMm: 'မကွေး' },
  { id: 'sagaing', name: 'Sagaing', nameMm: 'စစ်ကိုင်း' },
  { id: 'shan', name: 'Shan State', nameMm: 'ရှမ်းပြည်နယ်' },
  { id: 'mon', name: 'Mon State', nameMm: 'မွန်ပြည်နယ်' },
  { id: 'ayeyarwady', name: 'Ayeyarwady', nameMm: 'ဧရာဝတီ' },
  { id: 'rakhine', name: 'Rakhine State', nameMm: 'ရခိုင်ပြည်နယ်' },
  { id: 'kachin', name: 'Kachin State', nameMm: 'ကချင်ပြည်နယ်' },
  { id: 'kayin', name: 'Kayin State', nameMm: 'ကရင်ပြည်နယ်' },
  { id: 'kayah', name: 'Kayah State', nameMm: 'ကယားပြည်နယ်' },
  { id: 'chin', name: 'Chin State', nameMm: 'ချင်းပြည်နယ်' },
  { id: 'tanintharyi', name: 'Tanintharyi', nameMm: 'တနင်္သာရီ' },
];

// Helper functions
export const canDonateTo = (donorType: BloodType, recipientType: BloodType): boolean => {
  return bloodTypeCompatibility[donorType].canDonateTo.includes(recipientType);
};

export const canReceiveFrom = (recipientType: BloodType, donorType: BloodType): boolean => {
  return bloodTypeCompatibility[recipientType].canReceiveFrom.includes(donorType);
};

export const getCompatibleDonors = (bloodType: BloodType): BloodType[] => {
  return bloodTypeCompatibility[bloodType].canReceiveFrom;
};

export const getUrgencyExpiry = (urgency: UrgencyLevel): Date => {
  const now = new Date();
  const hours = urgencyInfo[urgency].hoursToExpiry;
  return new Date(now.getTime() + hours * 60 * 60 * 1000);
};

// Health eligibility for blood donation
export const donationEligibilityCriteria = {
  minAge: 18,
  maxAge: 65,
  minWeight: 45, // kg
  minDaysSinceLastDonation: 90,
  conditions: [
    'No current illness or fever',
    'Not pregnant or breastfeeding',
    'No recent surgery (within 6 months)',
    'No recent tattoo or piercing (within 6 months)',
    'Not taking antibiotics',
  ],
  conditionsMm: [
    'လက်ရှိဖြစ်ပွားနေသောရောဂါ သို့မဟုတ် အဖျားမရှိခြင်း',
    'ကိုယ်ဝန်မရှိခြင်း သို့မဟုတ် နို့တိုက်ခြင်းမဟုတ်ခြင်း',
    'မကြာသေးမီ ခွဲစိတ်မှုမရှိခြင်း (၆လအတွင်း)',
    'မကြာသေးမီ တကူနှင့် ပါးစပ်မပြုလုပ်ရခြင်း (၆လအတွင်း)',
    'ပဋိဇီဝဆေးမသောက်ရခြင်း',
  ],
};

// Sample blood requests for demo
export const sampleBloodRequests: BloodRequest[] = [
  {
    id: 'req-001',
    requesterId: 'user-123',
    requesterName: 'Aung Myint',
    requesterPhone: '09xxxxxxxxx',
    bloodType: 'O-',
    urgency: 'critical',
    hospital: 'Yangon General Hospital',
    hospitalAddress: 'Bogyoke Aung San Road, Yangon',
    region: 'yangon',
    notes: 'Emergency surgery - accident victim',
    status: 'active',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    requiredUnits: 3,
    fulfilledUnits: 1,
  },
];
