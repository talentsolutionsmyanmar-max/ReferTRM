import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Translation context types
type TranslationContext = 'formal' | 'casual' | 'business' | 'technical' | 'friendly';

// Cache for translations (simple in-memory cache)
const translationCache = new Map<string, { translation: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Quality Myanmar translations for common UI elements
const uiTranslations: Record<string, string> = {
  // Navigation
  'Dashboard': 'ပင်မစာမျက်နှာ',
  'Jobs': 'အလုပ်များ',
  'Companies': 'ကုမ္ပဏီများ',
  'Academy': 'သင်ကြားရေးအကယ်ဒမီ',
  'Community': 'အသိုင်းအဝိုင်း',
  'Settings': 'ဆက်တင်များ',
  'Leaderboard': 'ခေါင်းဆောင်မှုစာရင်း',
  'Rewards': 'ဆုလာဘ်များ',
  'Safety Hub': 'လုံခြုံရေးစင်တာ',
  'Blood Network': 'သွေးလှူဒါန်းမှုကွန်ရက်',
  
  // Actions
  'Apply Now': 'ယခုလျှောက်လွှာတင်ပါ',
  'Submit': 'တင်သွင်းပါ',
  'Cancel': 'ပယ်ဖျက်ပါ',
  'Save': 'သိမ်းဆည်းပါ',
  'Edit': 'ပြုပြင်ပါ',
  'Delete': 'ဖျက်ပါ',
  'Search': 'ရှာဖွေပါ',
  'Filter': 'စစ်ထုတ်ပါ',
  'Sort': 'အတန်းအစားခွဲပါ',
  'Upload': 'တင်ပါ',
  'Download': 'ဒေါင်းလုဒ်ဆွဲပါ',
  'Share': 'မျှဝေပါ',
  'Copy': 'ကူးယူပါ',
  'Close': 'ပိတ်ပါ',
  'Continue': 'ဆက်လက်လုပ်ဆောင်ပါ',
  'Back': 'နောက်သို့',
  'Next': 'ရှေ့သို့',
  'Previous': 'ရှေ့အဆင့်',
  'Skip': 'ကျော်ပါ',
  'Complete': 'ပြီးမြောက်ပါ',
  
  // Status
  'Active': 'လှုပ်ရှားနေသည်',
  'Pending': 'စောင့်ဆိုင်းနေသည်',
  'Completed': 'ပြီးမြောက်ပြီ',
  'Approved': 'အတည်ပြုပြီ',
  'Rejected': 'ငြင်းပယ်ပြီ',
  'Expired':  'သက်တမ်းကုန်ဆုံးပြီ',
  
  // Messages
  'Welcome': 'ကြိုဆိုပါသည်',
  'Success': 'အောင်မြင်ပါသည်',
  'Error': 'အမှားအယွင်း',
  'Warning': 'သတိပေးချက်',
  'Information': 'အချက်အလက်',
  'Loading': 'တင်နေသည်',
  'No results found': 'ရလဒ်မတွေ့ပါ',
  'Coming Soon': 'မကြာမီ',
  
  // Job-related
  'Job Title': 'အလုပ်ရာထူးအမည်',
  'Company': 'ကုမ္ပဏီ',
  'Location': 'နေရာ',
  'Salary': 'လစာ',
  'Experience': 'အတွေ့အကြုံ',
  'Requirements': 'လိုအပ်ချက်များ',
  'Benefits': 'အကျိုးခံစားခွင့်များ',
  'Full-time': 'အချိန်ပြည့်',
  'Part-time': 'အချိန်ပိုင်း',
  'Remote': 'အဝေးမှအလုပ်',
  'Contract': 'စာချုပ်',
  
  // Profile
  'Profile': 'ကိုယ်ရေးအချက်အလက်',
  'Name': 'အမည်',
  'Email': 'အီးမေးလ်',
  'Phone': 'ဖုန်းနံပါတ်',
  'Address': 'လိပ်စာ',
  'Education': 'ပညာရေး',
  'Skills': 'ကျွမ်းကျင်မှုများ',
  'Experience': 'အတွေ့အကြုံ',
  
  // Time
  'Today': 'ယနေ့',
  'Yesterday': 'မနေ့',
  'This Week': 'ယခုအပတ်',
  'This Month': 'ယခုလ',
  'This Year': 'ယခုနှစ်',
  
  // Currency
  'K per month': 'ကျပ်/လ',
  'Lakh': 'သိန်း',
  'Million': 'သန်း',
  
  // Common phrases
  'Sign In': 'လော့ဂ်အင်',
  'Sign Up': 'မှတ်ပုံတင်',
  'Log Out': 'လော့ဂ်အောက်',
  'Forgot Password?': 'စကားဝှက်မေ့နေပါသလား?',
  'Reset Password': 'စကားဝှက်ပြန်လည်သတ်မှတ်ပါ',
  
  // Encouragement for youth
  'Start Your Journey': 'သင်၏ခရီးစတင်ပါ',
  'Build Your Future': 'သင့်အနာဂတ်ကိုတည်ဆောက်ပါ',
  'Learn and Grow': 'သင်ယူ၍ ကြီးထွားပါ',
  'Connect with Opportunities': 'အခွင့်အလမ်းများနှင့် ဆက်သွယ်ပါ',
};

// Context-specific translation prompts
const contextPrompts: Record<TranslationContext, string> = {
  formal: 'Translate to formal Myanmar language (use respectful terms like ကျွန်ုပ်, သင်, ပူးပေါင်းဆောင်ရွက်ပါ). Keep professional tone suitable for business documents.',
  casual: 'Translate to casual, friendly Myanmar language (use natural conversational style). Keep it warm and approachable for young users.',
  business: 'Translate to professional business Myanmar language. Use corporate terminology and formal structure. Suitable for HR documents and company communications.',
  technical: 'Translate to Myanmar with technical accuracy. Keep technical terms in English where appropriate (like API, UI, database). Add Myanmar explanations when needed.',
  friendly: 'Translate to warm, encouraging Myanmar language. Use motivational tone suitable for career development content. Inspire young users.',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      text, 
      context = 'formal',
      sourceLanguage = 'en',
      targetLanguage = 'my',
      useCache = true,
    } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    // Check if it's a common UI translation
    if (uiTranslations[text]) {
      return NextResponse.json({
        success: true,
        translation: uiTranslations[text],
        source: 'ui-cache',
      });
    }

    // Check cache
    const cacheKey = `${text}-${context}-${sourceLanguage}-${targetLanguage}`;
    if (useCache) {
      const cached = translationCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return NextResponse.json({
          success: true,
          translation: cached.translation,
          source: 'cache',
        });
      }
    }

    // Use z-ai-web-dev-sdk for translation (SEA-LION compatible approach)
    try {
      const zai = await ZAI.create();
      
      const contextPrompt = contextPrompts[context as TranslationContext] || contextPrompts.formal;
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a professional Myanmar language translator. You understand:
- Myanmar grammar (SOV structure)
- Honorific levels (formal vs casual)
- Cultural context and idioms
- Business terminology in Myanmar context
- Young generation language trends

Rules:
1. Translate naturally, not word-by-word
2. Use appropriate honorifics based on context
3. Keep technical terms in English when commonly used
4. Make it sound natural for Myanmar speakers
5. Consider the target audience (young professionals)`,
          },
          {
            role: 'user',
            content: `${contextPrompt}

Translate this text from ${sourceLanguage === 'en' ? 'English' : 'Myanmar'} to ${targetLanguage === 'my' ? 'Myanmar' : 'English'}:

"${text}"

Provide ONLY the translation, no explanations.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      let translation = completion.choices?.[0]?.message?.content || text;
      
      // Clean up the translation (remove quotes if wrapped)
      translation = translation.trim();
      if ((translation.startsWith('"') && translation.endsWith('"')) ||
          (translation.startsWith("'") && translation.endsWith("'"))) {
        translation = translation.slice(1, -1);
      }

      // Cache the result
      if (useCache) {
        translationCache.set(cacheKey, {
          translation,
          timestamp: Date.now(),
        });
      }

      return NextResponse.json({
        success: true,
        translation,
        source: 'ai',
        context,
      });
    } catch (aiError) {
      console.error('Translation AI error:', aiError);
      
      // Return original text if translation fails
      return NextResponse.json({
        success: false,
        error: 'Translation failed',
        translation: text,
        source: 'fallback',
      });
    }
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process translation' },
      { status: 500 }
    );
  }
}

// Batch translation endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { texts, context = 'formal' } = body;

    if (!Array.isArray(texts)) {
      return NextResponse.json(
        { success: false, error: 'Texts must be an array' },
        { status: 400 }
      );
    }

    const translations: Record<string, string> = {};

    for (const text of texts) {
      // Check UI cache first
      if (uiTranslations[text]) {
        translations[text] = uiTranslations[text];
        continue;
      }

      // Check translation cache
      const cacheKey = `${text}-${context}-en-my`;
      const cached = translationCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        translations[text] = cached.translation;
        continue;
      }

      // Mark for AI translation
      translations[text] = text; // Placeholder, will be translated on demand
    }

    return NextResponse.json({
      success: true,
      translations,
      cachedCount: Object.keys(translations).length,
    });
  } catch (error) {
    console.error('Batch translation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process batch translation' },
      { status: 500 }
    );
  }
}

// Export UI translations for client-side use
export async function GET() {
  return NextResponse.json({
    success: true,
    uiTranslations,
  });
}
