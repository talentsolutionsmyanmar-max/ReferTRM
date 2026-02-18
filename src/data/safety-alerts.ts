// Safety Alerts System for Myanmar
// Life-saving alerts from neutral, international sources
// NO POLITICS - Pure scientific and humanitarian data only

export type AlertType = 'cyclone' | 'earthquake' | 'flood' | 'heat' | 'storm' | 'landslide' | 'health' | 'general';
export type AlertSeverity = 'watch' | 'warning' | 'emergency';
export type AlertStatus = 'active' | 'expired' | 'monitoring';

export interface SafetyAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  affectedRegions: string[];
  issuedAt: string;
  expiresAt?: string;
  source: string;
  sourceUrl?: string;
  safetyTips: string[];
  safetyTipsMm: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  magnitude?: number; // For earthquakes
  temperature?: number; // For heat warnings
  windSpeed?: number; // For cyclones
}

export interface EmergencyContact {
  id: string;
  name: string;
  nameMm: string;
  phone: string;
  category: 'emergency' | 'medical' | 'disaster' | 'hotline';
  description: string;
  descriptionMm: string;
  available24h: boolean;
}

export interface PreparednessGuide {
  id: string;
  type: AlertType;
  title: string;
  titleMm: string;
  season: 'year-round' | 'monsoon' | 'summer' | 'winter' | 'cyclone-season';
  content: {
    before: string[];
    beforeMm: string[];
    during: string[];
    duringMm: string[];
    after: string[];
    afterMm: string[];
  };
  checklist: string[];
  checklistMm: string[];
  emergencyKit: string[];
  emergencyKitMm: string[];
}

// Alert type information
export const alertTypeInfo = {
  cyclone: {
    label: 'Cyclone Warning',
    labelMm: 'မုန်တိုင်းသတိပေးချက်',
    icon: '🌀',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
  },
  earthquake: {
    label: 'Earthquake Alert',
    labelMm: 'ငလျင်သတိပေးချက်',
    icon: '🌍',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
  },
  flood: {
    label: 'Flood Warning',
    labelMm: 'ရေလွမ်းမိုးသတိပေးချက်',
    icon: '🌊',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  heat: {
    label: 'Extreme Heat',
    labelMm: 'အပူချိန်မြင့်သတိပေးချက်',
    icon: '🌡️',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
  },
  storm: {
    label: 'Storm Warning',
    labelMm: 'မိုးကြိုးမုန်တိုင်းသတိပေးချက်',
    icon: '⛈️',
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/30',
    textColor: 'text-slate-400',
  },
  landslide: {
    label: 'Landslide Risk',
    labelMm: 'မြေပြိုကျဆင်းသတိပေးချက်',
    icon: '⛰️',
    color: 'from-stone-500 to-amber-500',
    bgColor: 'bg-stone-500/20',
    borderColor: 'border-stone-500/30',
    textColor: 'text-stone-400',
  },
  health: {
    label: 'Health Advisory',
    labelMm: 'ကျန်းမာရေးအကြံပြုချက်',
    icon: '🏥',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
  },
  general: {
    label: 'Safety Alert',
    labelMm: 'လုံခြုံရေးသတိပေးချက်',
    icon: '⚠️',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
  },
};

// Severity levels
export const severityInfo = {
  watch: {
    label: 'Watch',
    labelMm: 'စောင့်ကြည့်',
    description: 'Conditions possible - stay alert',
    descriptionMm: 'ဖြစ်နိုင်ချေရှိ - သတိထားပါ',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
  },
  warning: {
    label: 'Warning',
    labelMm: 'သတိပေးချက်',
    description: 'Event expected - prepare now',
    descriptionMm: 'ဖြစ်နိုင်ချေမြင့် - ပြင်ဆင်ပါ',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
  },
  emergency: {
    label: 'Emergency',
    labelMm: 'အရေးပေါ်',
    description: 'Immediate danger - take action',
    descriptionMm: 'အချက်ချင်းအန္တရာယ် - လုပ်ဆောင်ပါ',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
  },
};

// Myanmar regions/states
export const myanmarRegions = [
  { id: 'yangon', name: 'Yangon', nameMm: 'ရန်ကုန်' },
  { id: 'mandalay', name: 'Mandalay', nameMm: 'မန္တလေး' },
  { id: 'rakhine', name: 'Rakhine', nameMm: 'ရခိုင်' },
  { id: 'ayeyarwady', name: 'Ayeyarwady', nameMm: 'ဧရာဝတီ' },
  { id: 'bago', name: 'Bago', nameMm: 'ပဲခူး' },
  { id: 'magway', name: 'Magway', nameMm: 'မကွေး' },
  { id: 'sagaing', name: 'Sagaing', nameMm: 'စစ်ကိုင်း' },
  { id: 'tanintharyi', name: 'Tanintharyi', nameMm: 'တနင်္သာရီ' },
  { id: 'mon', name: 'Mon', nameMm: 'မွန်' },
  { id: 'kayin', name: 'Kayin', nameMm: 'ကရင်' },
  { id: 'kayah', name: 'Kayah', nameMm: 'ကယား' },
  { id: 'shan', name: 'Shan', nameMm: 'ရှမ်း' },
  { id: 'kachin', name: 'Kachin', nameMm: 'ကချင်' },
  { id: 'chin', name: 'Chin', nameMm: 'ချင်း' },
  { id: 'naypyidaw', name: 'Naypyidaw', nameMm: 'နေပြည်တော်' },
];

// Emergency Contacts for Myanmar
export const emergencyContacts: EmergencyContact[] = [
  // Emergency Services
  {
    id: 'police',
    name: 'Police Emergency',
    nameMm: 'ရဲတပ်ဖွဲ့အရေးပေါ်',
    phone: '199',
    category: 'emergency',
    description: 'Police emergency hotline',
    descriptionMm: 'ရဲတပ်ဖွဲ့အရေးပေါ်ဖုန်းလိုင်း',
    available24h: true,
  },
  {
    id: 'fire',
    name: 'Fire Department',
    nameMm: 'မီးသတ်တပ်ဖွဲ့',
    phone: '191',
    category: 'emergency',
    description: 'Fire emergency and rescue',
    descriptionMm: 'မီးလောင်မှုအရေးပေါ်နှင့်ကယ်ဆယ်ရေး',
    available24h: true,
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    nameMm: 'အမ်ဘူလင်စ်',
    phone: '192',
    category: 'emergency',
    description: 'Medical emergency ambulance',
    descriptionMm: 'ဆေးဘက်ဆိုင်ရာအရေးပေါ်အမ်ဘူလင်စ်',
    available24h: true,
  },
  // Medical
  {
    id: 'yangon-general',
    name: 'Yangon General Hospital',
    nameMm: 'ရန်ကုန်ပြည်သူ့ဆေးရုံကြီး',
    phone: '01-252-386',
    category: 'medical',
    description: 'Main public hospital Yangon',
    descriptionMm: 'ရန်ကုန်အဓိကအစိုးရဆေးရုံ',
    available24h: true,
  },
  {
    id: 'mandalay-general',
    name: 'Mandalay General Hospital',
    nameMm: 'မန္တလေးပြည်သူ့ဆေးရုံကြီး',
    phone: '02-331-014',
    category: 'medical',
    description: 'Main public hospital Mandalay',
    descriptionMm: 'မန္တလေးအဓိကအစိုးရဆေးရုံ',
    available24h: true,
  },
  {
    id: 'myanmar-red-cross',
    name: 'Myanmar Red Cross',
    nameMm: 'မြန်မာနိုင်ငံကြက်ခြေနီအသင်း',
    phone: '01-381-127',
    category: 'disaster',
    description: 'Disaster response and first aid',
    descriptionMm: 'ဘေးအန္တရာယ်တုံ့ပြန်ရေးနှင့်အကူအညီ',
    available24h: true,
  },
  // Disaster Management
  {
    id: 'disaster-management',
    name: 'Disaster Management Centre',
    nameMm: 'သဘာဝဘေးအန္တရာယ်စီမံခန့်ခွဲမှုဌာနချုပ်',
    phone: '067-410-162',
    category: 'disaster',
    description: 'National disaster coordination',
    descriptionMm: 'အမျိုးသားဘေးအန္တရာယ်ညှိနှိုင်းမှု',
    available24h: true,
  },
  // Weather and Information
  {
    id: 'weather-hotline',
    name: 'Weather Information',
    nameMm: 'မိုးလေဝသသတင်းအချက်အလက်',
    phone: '01-667-544',
    category: 'hotline',
    description: 'Weather forecasts and warnings',
    descriptionMm: 'မိုးလေဝသခန့်မှန်းချက်နှင့်သတိပေးချက်များ',
    available24h: false,
  },
  {
    id: 'earthquake-info',
    name: 'Earthquake Information',
    nameMm: 'ငလျင်သတင်းအချက်အလက်',
    phone: '067-418-066',
    category: 'hotline',
    description: 'Earthquake monitoring and information',
    descriptionMm: 'ငလျင်စောင့်ကြည့်နှင့်သတင်းအချက်အလက်',
    available24h: true,
  },
];

// Preparedness Guides
export const preparednessGuides: PreparednessGuide[] = [
  {
    id: 'cyclone-guide',
    type: 'cyclone',
    title: 'Cyclone Preparedness Guide',
    titleMm: 'မုန်တိုင်းပြင်ဆင်မှုလမ်းညွှန်',
    season: 'cyclone-season',
    content: {
      before: [
        'Know your evacuation route and nearest shelter',
        'Prepare an emergency kit with food, water, and medicine for 3 days',
        'Reinforce your home - secure loose objects, cover windows',
        'Charge all phones and power banks fully',
        'Store important documents in waterproof bags',
        'Know the cyclone warning signals in your area',
      ],
      beforeMm: [
        'သင့်ထွက်ခွာရမည့်လမ်းကြောင်းနှင့်အနီးဆုံးဘေးကာကွယ်ရေးနေရာကိုသိပါ',
        'အစားအသောက်၊ ရေနှင့်ဆေးဝါးများပါဝင်သောအရေးပေါ်အထုပ်ပြင်ဆင်ပါ (၃ရက်စာ)',
        'အိမ်ကိုခိုင်ခံ့အောင်လုပ်ပါ - လွတ်လပ်စွာလှုပ်ရှသောပစ္စည်းများတိတိကျကျချိတ်ဆက်ပါ',
        'ဖုန်းများနှင့်ပါဝါဘဏ်များအပြည့်အ၀လျှပ်စစ်ဖြည့်ပါ',
        'အရေးကြီးသောစာရွက်စာတမ်းများကိုရေမဝင်သောအိတ်တွင်သိမ်းဆည်းပါ',
        'သင့်နေရာတွင်မုန်တိုင်းသတိပေးသင်္ကေတများကိုသိပါ',
      ],
      during: [
        'Stay indoors away from windows and doors',
        'Go to the strongest room in your house',
        'Do not go outside during the eye of the storm',
        'Listen to radio/phone for updates',
        'If flooding occurs, move to higher ground immediately',
        'Keep your emergency kit with you at all times',
      ],
      duringMm: [
        'ပြတင်းပေါက်နှင့်တံခါးများမှဝေးသောအိမ်တွင်းနေပါ',
        'အိမ်၏အခိုင်မာဆုံးအခန်းသို့သွားပါ',
        'မုန်တိုင်းမျက်လုံးအချိန်တွင်အပြင်မသွားပါ',
        'အသစ်ဆုံးသတင်းအတွက်ရေဒီယို/ဖုန်းနားထောင်ပါ',
        'ရေလွမ်းမိုးပါက ချက်ချင်းမြင့်မားသောနေရာသို့ရွှေ့ပါ',
        'အရေးပေါ်အထုပ်ကိုအမြဲတမ်းသင့်နှင့်အတူထားပါ',
      ],
      after: [
        'Wait for official all-clear before going outside',
        'Watch for downed power lines and flooded areas',
        'Check for structural damage before re-entering buildings',
        'Do not drink tap water until declared safe',
        'Help neighbors who may need assistance',
        'Document damage for insurance/assistance purposes',
      ],
      afterMm: [
        'တရားဝင်ဘေးကင်းကြောင်းကြေညာမှမပြုလုပ်မီအပြင်မသွားပါ',
        'လျှပ်စစ်ကြိုးများကျနေသည်နှင့်ရေလွမ်းမိုးနေသောနေရာများကိုသတိထားပါ',
        'အဆောက်အဦးများအတွင်းပြန်မဝင်မီတည်ဆောက်မှုပျက်စီးမှုရှိမရှိစစ်ဆေးပါ',
        'ဘေးကင်းကြောင်းကြေညာမချိန်အထိရေစက်ရေမသောက်ပါ',
        'အကူအညီလိုနိုင်သောအိမ်နီးချင်းများကိုကူညီပါ',
        'အာမခံ/အကူအညီအတွက်ပျက်စီးမှုမှတ်တမ်းတင်ပါ',
      ],
    },
    checklist: [
      'Emergency kit prepared (food, water, medicine)',
      'Important documents in waterproof bag',
      'Phone and power bank charged',
      'Evacuation route known',
      'Home secured (windows, loose items)',
      'Radio/communication device ready',
      'Cash on hand (ATMs may not work)',
    ],
    checklistMm: [
      'အရေးပေါ်အထုပ်ပြင်ဆင်ပြီး (အစာ၊ ရေ၊ ဆေးဝါး)',
      'အရေးကြီးစာရွက်စာတမ်းများရေမဝင်အိတ်တွင်ထားပါ',
      'ဖုန်းနှင့်ပါဝါဘဏ်လျှပ်စစ်ဖြည့်ပြီး',
      'ထွက်ခွာရမည့်လမ်းကြောင်းသိပြီး',
      'အိမ်လုံခြုံပြီး (ပြတင်းပေါက်၊ လှုပ်ရှပစ္စည်းများ)',
      'ရေဒီယို/ဆက်သွယ်ရေးပစ္စည်းအဆင်သင့်',
      'ငွေသားထားပါ (ဘဏ်အေတီအမ်များအလုပ်မလုပ်နိုင်ပါ)',
    ],
    emergencyKit: [
      'Water (3 liters per person per day)',
      'Non-perishable food (canned goods, biscuits)',
      'First aid kit',
      'Flashlight with extra batteries',
      'Battery-powered radio',
      'Whistle for signaling',
      'Dust masks',
      'Plastic sheeting and rope',
      'Moist towelettes and garbage bags',
      'Local maps',
      'Phone chargers and power banks',
    ],
    emergencyKitMm: [
      'ရေ (တစ်ဦးလျှင်တစ်ရက်လျှင် ၃လီတာ)',
      'မပျက်စီးနိုင်သောအစာ (ထောပတ်ဗူး၊ မုန့်များ)',
      'အရေးပေါ်ကုသမှုအထုပ်',
      'အပိုဘက်ထရီပါသောမီးရှူးတံ',
      'ဘက်ထရီဖြင့်လည်ပတ်သောရေဒီယို',
      'အသံပေးခေါင်းလောင်း',
      'ဖုန်ကာများ',
      'ပလတ်စတစ်စားပွဲတင်အကာနှင့်ကြိုး',
      'စိတ်ချယ်များနှင့်သဲပုံးများ',
      'ဒေသဆိုင်ရာမြေပုံများ',
      'ဖုန်းအားသွင်းကိရိယာများနှင့်ပါဝါဘဏ်များ',
    ],
  },
  {
    id: 'earthquake-guide',
    type: 'earthquake',
    title: 'Earthquake Safety Guide',
    titleMm: 'ငလျင်လုံခြုံရေးလမ်းညွှန်',
    season: 'year-round',
    content: {
      before: [
        'Secure heavy furniture to walls',
        'Know safe spots in each room (under sturdy furniture, against interior walls)',
        'Prepare emergency kit',
        'Know how to shut off gas, water, and electricity',
        'Practice "Drop, Cover, Hold On" with family',
        'Identify safe outdoor areas away from buildings and power lines',
      ],
      beforeMm: [
        'လေးလံသောပစ္စည်းများကိုနံရံတွင်ခိုင်ခံ့စွာချိတ်ဆက်ပါ',
        'အခန်းတိုင်းတွင်ဘေးကင်းရာနေရာများသိပါ (ခိုင်ခံ့သောပစ္စည်းအောက်၊ အတွင်းနံရံနှင့်ကပ်)',
        'အရေးပေါ်အထုပ်ပြင်ဆင်ပါ',
        'ဓာတ်ငွေ့၊ ရေနှင့်လျှပ်စစ်ပိတ်နည်းသိပါ',
        'မိသားစုနှင့်အတူ "ကိုယ်ထား၊ ချုပ်ထား၊ ကိုင်ထား" လေ့ကျင့်ပါ',
        'အဆောက်အဦးနှင့်လျှပ်စစ်ကြိုးများမှဝေးသောဘေးကင်းသောအပြင်နေရာများရှာပါ',
      ],
      during: [
        'DROP to hands and knees immediately',
        'Take COVER under sturdy furniture or against interior wall',
        'HOLD ON until shaking stops',
        'Stay away from windows, outside doors, and things that can fall',
        'If outdoors, move to open area away from buildings and power lines',
        'If in a vehicle, stop in clear area and stay inside',
      ],
      duringMm: [
        'ချက်ချင်းလက်နှင့်ဒူးဂူးချပါ',
        'ခိုင်ခံ့သောပစ္စည်းအောက်သို့ဝင်ပါ သို့မဟုတ်အတွင်းနံရံကပ်ပါ',
        'လှုပ်ရှမှုရပ်သည်အထိကိုင်ထားပါ',
        'ပြတင်းပေါက်၊ တံခါးများနှင့်ကျနိုင်သောပစ္စည်းများမှဝေးပါ',
        'အပြင်တွင်ရှိပါက အဆောက်အဦးနှင့်လျှပ်စစ်ကြိုးများမှဝေးသောနေရာသို့သွားပါ',
        'ယာဉ်တွင်းရှိပါက ဗလာနေရာတွင်ရပ်ပြီးအတွင်းမှာပဲနေပါ',
      ],
      after: [
        'Check yourself and others for injuries',
        'Check for gas leaks - do not use matches or lighters',
        'Expect aftershocks and be ready to drop, cover, hold on',
        'Check for structural damage before re-entering buildings',
        'Listen to emergency broadcasts for information',
        'Stay away from damaged buildings and power lines',
      ],
      afterMm: [
        'သင့်ကိုယ်သင်နှင့်အခြားသူများထိခိုက်မှုရှိမရှိစစ်ဆေးပါ',
        'ဓာတ်ငွေ့ leak ရှိမရှိစစ်ဆေးပါ - မီးခြစ်မသုံးပါ',
        'နောက်ဆက်တွဲငလျင်များဖြစ်နိုင်သဖြင့် ကိုယ်ထား၊ ချုပ်ထား၊ ကိုင်ထား အဆင်သင့်နေပါ',
        'အဆောက်အဦးများအတွင်းပြန်မဝင်မီတည်ဆောက်မှုပျက်စီးမှုစစ်ဆေးပါ',
        'အချက်အလက်အတွက်အရေးပေါ်ထုတ်လွှင့်မှုနားထောင်ပါ',
        'ပျက်စီးသောအဆောက်အဦးနှင့်လျှပ်စစ်ကြိုးများမှဝေးပါ',
      ],
    },
    checklist: [
      'Heavy furniture secured to walls',
      'Safe spots identified in each room',
      'Emergency kit ready',
      'Gas/water/electricity shutoff tools accessible',
      'Family evacuation plan practiced',
      'Outdoor meeting spot identified',
    ],
    checklistMm: [
      'လေးလံသောပစ္စည်းများနံရံတွင်ခိုင်ခံ့စွာချိတ်ဆက်ပြီး',
      'အခန်းတိုင်းတွင်ဘေးကင်းနေရာများရှာပြီး',
      'အရေးပေါ်အထုပ်အဆင်သင့်',
      'ဓာတ်ငွေ့/ရေ/လျှပ်စစ်ပိတ်ကိရိယာများလွယ်ကူစွာရယူနိုင်',
      'မိသားစုထွက်ခွာမှုအစီအစဉ်လေ့ကျင့်ပြီး',
      'အပြင်ဆုံမှာနေရာသတ်မှတ်ပြီး',
    ],
    emergencyKit: [
      'Water and non-perishable food for 3 days',
      'First aid kit',
      'Flashlight and extra batteries',
      'Dust masks',
      'Whistle',
      'Basic tools (wrench, pliers)',
      'Sturdy shoes',
      'Important documents copies',
      'Cash',
    ],
    emergencyKitMm: [
      '၃ရက်စာရေနှင့်မပျက်စီးနိုင်သောအစာ',
      'အရေးပေါ်ကုသမှုအထုပ်',
      'မီးရှူးတံနှင့်အပိုဘက်ထရီ',
      'ဖုန်ကာများ',
      'ခေါင်းလောင်း',
      'အခြေခံကိရိယာများ (စပနယ်၊ ညှပ်',
      'ခိုင်ခံ့သောဖိနပ်များ',
      'အရေးကြီးစာရွက်စာတမ်းများဓာတ်ပုံ',
      'ငွေသား',
    ],
  },
  {
    id: 'flood-guide',
    type: 'flood',
    title: 'Flood Safety Guide',
    titleMm: 'ရေလွမ်းမိုးဘေးလုံခြုံရေးလမ်းညွှန်',
    season: 'monsoon',
    content: {
      before: [
        'Know your area\'s flood risk and evacuation routes',
        'Move valuable items to higher floors',
        'Clear drains and gutters around your home',
        'Prepare waterproof containers for important items',
        'Know the location of higher ground near you',
        'Have a family communication plan',
      ],
      beforeMm: [
        'သင့်ဒေသ၏ရေလွမ်းမိုးအန္တရာယ်နှင့်ထွက်ခွာလမ်းကြောင်းများသိပါ',
        'တန်ဖိုးရှိပစ္စည်းများကိုအထက်ထပ်သို့ရွှေ့ပါ',
        'အိမ်ပတ်လည်ရေဆင်းပေါက်နှင့်မိုးရေပြွန်များရှင်းလင်းပါ',
        'အရေးကြီးပစ္စည်းများအတွက်ရေမဝင်ကွန်တိန်နာများပြင်ဆင်ပါ',
        'သင့်နေရာအနီးမြင့်မားသောမြေနေရာသိပါ',
        'မိသားစုဆက်သွယ်ရေးအစီအစဉ်ရှိပါ',
      ],
      during: [
        'Move to higher ground immediately when advised',
        'Never walk, swim, or drive through flood water',
        'Just 6 inches of moving water can knock you down',
        'Stay off bridges over fast-moving water',
        'If trapped in building, go to highest level',
        'Avoid contact with flood water - it may be contaminated',
      ],
      duringMm: [
        'အကြံပြုခံရပါကချက်ချင်းမြင့်မားသောမြေသို့ရွှေ့ပါ',
        'ရေလွမ်းမိုးရေထဲမလမ်းလျှောက်၊ မဆက်သွား၊ မကူးခရပါ',
        'ရေလှုပ်ရှားမှု ၆လက်မသာရှိပါကလဲကျနိုင်သည်',
        'အလျင်စီးဆင်းနေသောရေရှိတံတားပေါ်မနေပါ',
        'အဆောက်အဦးတွင်ပိတ်မိပါကအမြင့်ဆုံးအဆင့်သို့သွားပါ',
        'ရေလွမ်းမိုးရေနှင့်မထိတွေ့ပါ - ညစ်ပတ်နေနိုင်သည်',
      ],
      after: [
        'Return home only when authorities say it is safe',
        'Avoid driving through flooded roads',
        'Wear protective clothing when cleaning',
        'Do not drink tap water until declared safe',
        'Document damage for insurance/assistance',
        'Clean and disinfect everything that got wet',
      ],
      afterMm: [
        'အာဏာပိုင်များဘေးကင်းကြောင်းပြောမှသာအိမ်ပြန်ပါ',
        'ရေလွမ်းမိုးနေသောလမ်းများဖြတ်မမောင်းပါ',
        'ရှင်းလင်းသည့်အခါကာကွယ်မှုအဝတ်စားဝတ်ပါ',
        'ဘေးကင်းကြောင်းကြေညာမချိန်အထိရေစက်ရေမသောက်ပါ',
        'အာမခံ/အကူအညီအတွက်ပျက်စီးမှုမှတ်တမ်းတင်ပါ',
        'ရေစိုထားသမျှအရာခပ်သုတ်ပြီးပိုးသတ်ပါ',
      ],
    },
    checklist: [
      'Evacuation route planned',
      'Valuables moved to high ground',
      'Emergency kit waterproofed',
      'Communication plan with family',
      'Charged phones and power banks',
      'Important documents in waterproof bag',
    ],
    checklistMm: [
      'ထွက်ခွာလမ်းကြောင်းစီစဉ်ပြီး',
      'တန်ဖိုးရှိပစ္စည်းများမြင့်မားသောနေရာသို့ရွှေ့ပြီး',
      'အရေးပေါ်အထုပ်ရေမဝင်အောင်ပြုလုပ်ပြီး',
      'မိသားစုဆက်သွယ်ရေးအစီအစဉ်ရှိပြီး',
      'ဖုန်းများနှင့်ပါဝါဘဏ်များလျှပ်စစ်ဖြည့်ပြီး',
      'အရေးကြီးစာရွက်စာတမ်းများရေမဝင်အိတ်တွင်ထားပြီး',
    ],
    emergencyKit: [
      'Waterproof bags for electronics',
      'Bottled water (3 liters per person per day)',
      'Non-perishable food',
      'Waterproof flashlight',
      'Whistle',
      'Life jacket if available',
      'First aid kit',
      'Waterproof matches',
      'Rope',
    ],
    emergencyKitMm: [
      'လျှပ်စစ်ပစ္စည်းများအတွက်ရေမဝင်အိတ်များ',
      'ရေပုလင်း (တစ်ဦးလျှင်တစ်ရက်လျှင် ၃လီတာ)',
      'မပျက်စီးနိုင်သောအစာ',
      'ရေမဝင်မီးရှူးတံ',
      'ခေါင်းလောင်း',
      'ရှိပါကအသက်ကယ်ဂါင်္',
      'အရေးပေါ်ကုသမှုအထုပ်',
      'ရေမဝင်မီးခြစ်',
      'ကြိုး',
    ],
  },
  {
    id: 'heat-guide',
    type: 'heat',
    title: 'Extreme Heat Safety Guide',
    titleMm: 'အပူချိန်မြင့်ဘေးလုံခြုံရေးလမ်းညွှန်',
    season: 'summer',
    content: {
      before: [
        'Install or check air conditioning if available',
        'Prepare fans and ensure good ventilation',
        'Stock up on water and electrolyte drinks',
        'Identify coolest rooms in your home',
        'Know the signs of heat exhaustion and heat stroke',
        'Plan to check on elderly neighbors and relatives',
      ],
      beforeMm: [
        'ရှိပါကအဲကွန်းဒိုင်းတပ်ဆင်ပါ သို့မဟုတ်စစ်ဆေးပါ',
        'ပန်ကာများပြင်ဆင်ပြီးလေဝင်လေထွက်ကောင်းမွန်စေပါ',
        'ရေနှင့်အီလက်ထရိုလိုက်အဖျော်ယမကာများသိုမှီးပါ',
        'အိမ်တွင်အအေးဆုံးအခန်းများရှာပါ',
        'အပူနှင့်ပတ်သက်သောပြဿနာနှင့်အပူ ударရောဂလက္ခဏာများသိပါ',
        'အသက်ကြီးသူအိမ်နီးချင်းနှင့်ဆွေမျိုးများကိုစစ်ဆေးရန်စီစဉ်ပါ',
      ],
      during: [
        'Stay in air-conditioned spaces as much as possible',
        'Drink water frequently, even if not thirsty',
        'Avoid outdoor activities during 10am-4pm',
        'Wear lightweight, light-colored, loose clothing',
        'Take cool showers or baths',
        'Never leave children or pets in parked vehicles',
      ],
      duringMm: [
        'ဖြစ်နိုင်သမျှအဲကွန်းဒိုင်းရှိနေရာများတွင်နေပါ',
        'နှလုံးမသာပါကပဲရေမကြာမကြာသောက်ပါ',
        'နံနက် ၁၀နာရီမှ ၄နာရီအတွင်းအပြင်လှုပ်ရှားမှုရှောင်ကြဉ်ပါ',
        'ပေါ့ပါး၊ အရောင်ဖြူ၊ လွတ်လပ်သောအဝတ်စားဝတ်ပါ',
        'အေးသောရေချိုးချိန်သို့မဟုတ်ရေကန်သွားပါ',
        'ကလေးများနှင့်အိမ်မွေးတိရစ္ဆာန်များကိုကားထဲတွင်မထားပါ',
      ],
      after: [
        'Continue hydrating even after temperature drops',
        'Check on neighbors, especially elderly',
        'Watch for signs of heat illness for several days',
        'Let your body recover before resuming normal activities',
        'If someone shows heat stroke signs, call emergency immediately',
      ],
      afterMm: [
        'အပူချိန်ကျပြီးသည့်နောက်ပါရေဆက်သောက်ပါ',
        'အိမ်နီးချင်းများအထူးသဖြင့်အသက်ကြီးသူများစစ်ဆေးပါ',
        ' 며칀ကြာအပူရောဂလက္ခဏာများစောင့်ကြည့်ပါ',
        'ပုံမှန်လှုပ်ရှားမှုပြန်စမပါကခန္ဓာကိုယ်ပြန်လည်သက်သာပါ',
        'တစ်ဦးဦးတွင်အပူ ударရောဂလက္ခဏာပြပါကချက်ချင်းအရေးပေါ်ခေါ်ပါ',
      ],
    },
    checklist: [
      'Water and electrolyte drinks stocked',
      'Fans and cooling equipment ready',
      'Lightweight clothing prepared',
      'Coolest room identified',
      'Emergency contacts saved',
      'Plan to check on elderly neighbors',
    ],
    checklistMm: [
      'ရေနှင့်အီလက်ထရိုလိုက်အဖျော်ယမကာများသိုမှီးပြီး',
      'ပန်ကာနှင့်အေးစက်စေသောကိရိယာများအဆင်သင့်',
      'ပေါ့ပါးသောအဝတ်စားများပြင်ဆင်ပြီး',
      'အအေးဆုံးအခန်းသတ်မှတ်ပြီး',
      'အရေးပေါ်ဆက်သွယ်ရေးနံပါတ်များသိမ်းဆည်းပြီး',
      'အသက်ကြီးသူအိမ်နီးချင်းများစစ်ဆေးရန်စီစဉ်ပြီး',
    ],
    emergencyKit: [
      'Extra water bottles',
      'Electrolyte powder or drinks',
      'Cooling towels or bandanas',
      'Portable fan (battery)',
      'Spray bottle for misting',
      'Sunscreen SPF 30+',
      'Hat and sunglasses',
      'First aid kit with burn treatment',
    ],
    emergencyKitMm: [
      'ရေပုလင်းအပိုများ',
      'အီလက်ထရိုလိုက်မှုန့် သို့မဟုတ်အဖျော်ယမကာ',
      'အေးစက်စေသောခြောက်များ သို့မဟုတ်လည်ပတ်ကြိုးများ',
      'အမြဲတမ်းပန်ကာ (ဘက်ထရီ)',
      'မှုန့်ပက်ရန်ဆေးဘူး',
      'နေကာနှင့်နေမျက်မှန်',
      'ထိပ်တောင်များ',
      'အရေးပေါ်ကုသမှုအထုပ် (ပူဒဏ်ရှိုင်းမှုအတွက်)',
    ],
  },
];

// Seasonal information
export const seasonalInfo = {
  'cyclone-season': {
    label: 'Cyclone Season',
    labelMm: 'မုန်တိုင်းရာသီ',
    months: 'April - May, October - November',
    monthsMm: 'ဧပြီ - မေ၊ အောက်တိုဘာ - နိုဝင်ဘာ',
    description: 'Peak cyclone risk period for Myanmar coastal areas',
    descriptionMm: 'မြန်မာကမ်းရိုးတန်းဒေသများအတွက်မုန်တိုင်းအန္တရာယ်မြင့်မားသောကာလ',
  },
  'monsoon': {
    label: 'Monsoon Season',
    labelMm: 'မုတ်သုန်ရာသီ',
    months: 'May - October',
    monthsMm: 'မေ - အောက်တိုဘာ',
    description: 'Heavy rains and flooding risk across Myanmar',
    descriptionMm: 'မြန်မာနိုင်ငံတစ်ဝန်းလုံးတွင်မိုးသားများပြီးရေလွမ်းမိုးအန္တရာယ်',
  },
  'summer': {
    label: 'Summer/Hot Season',
    labelMm: 'နွေရာသီ',
    months: 'March - May',
    monthsMm: 'မတ် - မေ',
    description: 'Extreme heat temperatures, especially in central Myanmar',
    descriptionMm: 'အပူချိန်မြင့်မား၊ အထူးသဖြင့်အလယ်ပိုင်းမြန်မာ',
  },
  'winter': {
    label: 'Winter/Cool Season',
    labelMm: 'ဆောင်းရာသီ',
    months: 'November - February',
    monthsMm: 'နိုဝင်ဘာ - ဖေဖော်ဝါရီ',
    description: 'Cooler temperatures, lower disaster risk',
    descriptionMm: 'အေးမြသောအပူချိန်၊ ဘေးအန္တရာယ်နိမ့်',
  },
  'year-round': {
    label: 'Year-Round',
    labelMm: 'တစ်နှစ်ပတ်လုံး',
    months: 'All months',
    monthsMm: 'လုံးဝ',
    description: 'Relevant throughout the year',
    descriptionMm: 'တစ်နှစ်လုံးဆိုင်သည်',
  },
};

// Helper functions
export const getAlertsByType = (type: AlertType): SafetyAlert[] => [];
export const getAlertsByRegion = (region: string): SafetyAlert[] => [];
export const getActiveAlerts = (): SafetyAlert[] => [];
export const getContactsByCategory = (category: EmergencyContact['category']): EmergencyContact[] => 
  emergencyContacts.filter(c => c.category === category);
export const getGuideByType = (type: AlertType): PreparednessGuide | undefined => 
  preparednessGuides.find(g => g.type === type);
export const getGuidesBySeason = (season: PreparednessGuide['season']): PreparednessGuide[] => 
  preparednessGuides.filter(g => g.season === season || g.season === 'year-round');
