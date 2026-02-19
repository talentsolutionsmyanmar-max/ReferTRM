# SEA-LION v4 Burmese Language Integration Guide

## What is SEA-LION v4?

SEA-LION (Southeast Asian Languages In One Network) is built by **AI Singapore** and 
**explicitly supports Burmese (Myanmar)** — unlike ChatGPT or other generic models 
which treat Burmese as an afterthought.

Model: `aisingapore/sea-lion-v4-instruct`  
Hugging Face: https://huggingface.co/aisingapore/sea-lion-v4-instruct

---

## Step 1: Get Free API Key (5 minutes)

1. Go to https://huggingface.co/join — create a free account
2. Go to https://huggingface.co/settings/tokens
3. Click **New Token** → Name it `refertrm` → Role: **Read** → Create
4. Copy the token (starts with `hf_...`)

---

## Step 2: Add to Vercel

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
HUGGINGFACE_API_KEY = hf_your_token_here
```

---

## Step 3: Files to copy into your project

| File | Destination |
|------|-------------|
| `api/translation/route.ts` | `src/app/api/translation/route.ts` |
| `hooks/useBurmese.ts` | `src/hooks/useBurmese.ts` |
| `page-final.tsx` | `src/app/page.tsx` |

---

## How it Works

```
User visits page
      ↓
Static Burmese strings show instantly (no delay)
      ↓
useBurmese() hook calls /api/translation
      ↓
/api/translation calls SEA-LION v4 on Hugging Face
      ↓
SEA-LION v4 generates natural, fluent Burmese
      ↓
Page updates with better Burmese text
      ↓
Results cached in sessionStorage (no repeat calls)
```

---

## Changes in the New page.tsx

### Emojis → Professional Icons

| Old (emoji) | New (Lucide icon) |
|-------------|-------------------|
| 💰 salary   | `<Banknote />` |
| 🔐 security | `<Lock />` |
| 📊 stats    | `<BarChart2 />` |
| ✓ checkmark | `<Check />` |
| Ministry badge | `<Landmark />` |
| Money earned | `<HandCoins />` |
| Trust/verify | `<ShieldCheck />` |

### Design Improvements
- **Dark, refined corporate aesthetic** — feels like Stripe or Linear
- **Subtle grid background** — professional depth
- **Proper typography hierarchy** — clear information architecture
- **Progress bar** for the early adopter spots
- **Natural Burmese bi-lingual layout** — English primary + Burmese subtitle pattern
- No emoji anywhere in the UI

---

## Expanding the Academy (Your Mission)

To add more courses, just add to the `academyCourses` array in `page.tsx`:

```ts
{ name: 'Data Science', mm: 'ဒေတာသိပ္ပံ', Icon: LineChart, color: '#8b5cf6' },
{ name: 'Graphic Design', mm: 'ဂရပ်ဖစ် ဒီဇိုင်း', Icon: PenTool, color: '#ec4899' },
{ name: 'Web Development', mm: 'ဝဘ်ဖွံ့ဖြိုးတိုးတက်ရေး', Icon: Globe2, color: '#0ea5e9' },
```

Each course links to `/dashboard/academy` where you can build full course pages.

---

## Free Education Mission Statement (for your About page)

Consider adding this to your site:

> ReferTRM was built with a simple belief: **every young person in Myanmar 
> deserves access to world-class education and economic opportunity**, 
> regardless of their background or financial situation.
>
> Our Academy is 100% free — forever. Our referral system creates real income 
> for people who work hard. We are licensed, transparent, and accountable.
>
> မြန်မာလူငယ်တိုင်းသည် ၎င်းတို့၏ နောက်ခံမည်သို့ပင်ဆိုစေ ကမ္ဘာ့အဆင့်မီ ပညာရေးနှင့် 
> စီးပွားရေးအခွင့်အလမ်းများ ရရှိရမည်ဟု ကျွနု်ပ်တို့ ယုံကြည်ပါသည်။
