# ReferTRM V1 — Complete Design System
# Hand this to GLM 5 to maintain and improve V1
# while Claude builds V2 from scratch.

═══════════════════════════════════════════════════════════════
  PLATFORM IDENTITY
═══════════════════════════════════════════════════════════════

  Name:        ReferTRM (by Talent Resources Myanmar)
  Mission:     Myanmar's first referral-based hiring platform
  Tagline:     "Refer Friends. Earn Rewards."
  Audience:    Myanmar youth, HR professionals, companies
  Language:    English + Myanmar (Burmese) bilingual
  Payment:     KBZ Pay, Wave Money
  Revenue:     80% to referrer, 20-30% to platform

═══════════════════════════════════════════════════════════════
  V1 COLOR PALETTE
═══════════════════════════════════════════════════════════════

  Primary Background:    #0F172A  (dark navy)
  Card Background:       #1E293B
  Border:                #334155
  Primary Accent:        #14B8A6  (teal)
  Gold Accent:           #F59E0B
  Text Primary:          #F1F5F9
  Text Secondary:        #94A3B8
  Text Muted:            #64748B

  Tier Colors:
  - Bronze:    #92400E
  - Silver:    #94A3B8
  - Gold:      #F59E0B
  - Diamond:   #22D3EE
  - Legendary: #A78BFA

═══════════════════════════════════════════════════════════════
  V1 TYPOGRAPHY
═══════════════════════════════════════════════════════════════

  Primary Font:    DM Sans (Google Fonts)
  Myanmar Font:    Pyidaungsu → Padauk → Myanmar Text
  Myanmar CSS:     font-family: Pyidaungsu, Padauk, 'Myanmar Text', sans-serif;
                   line-height: 1.9;  ← CRITICAL for Myanmar script
                   letter-spacing: 0.01em;

═══════════════════════════════════════════════════════════════
  V1 PAGES (All Built)
═══════════════════════════════════════════════════════════════

  /                    Landing page
  /login               Login (gender-neutral, 3 role options)
  /signup              Signup
  /dashboard           Main dashboard
  /dashboard/jobs      Job board (26 real jobs)
  /dashboard/referrals Referral tracking
  /dashboard/academy   Learning platform
  /dashboard/leaderboard Rankings
  /dashboard/rewards   Rewards shop
  /dashboard/community Community features
  /dashboard/wellness  Wellness corner
  /dashboard/mentorship Mentorship hub
  /dashboard/blood     Blood donor network
  /dashboard/weather   Weather hub
  /dashboard/zodiac    Zodiac career insights

═══════════════════════════════════════════════════════════════
  V1 FEATURES
═══════════════════════════════════════════════════════════════

  Referral System:
  - Unique referral codes per user
  - 60,000 - 500,000 MMK bonus per placement
  - 80% to referrer, 20% platform fee
  - KBZ Pay / Wave Money payouts
  - 60-90 day replacement warranty

  Gamification:
  - Points system (XP for every action)
  - Streak counter (daily login)
  - Tier system: Bronze → Silver → Gold → Diamond → Legendary
  - Level system: Amateur → Professional → Expert → Master
  - Monthly Victory Fund: 300,000 MMK shared by top referrers
  - Leaderboard (real-time)

  Academy (Free):
  - 10+ courses, 80+ modules
  - AI & Technology
  - English Language
  - Digital Marketing
  - Business Skills
  - Job Interview
  - Financial Literacy
  - Microsoft Office
  - Entrepreneurship
  - Soft Skills
  - Resume Writing
  - Free certificates

  User Roles:
  - Job Seeker (အလုပ်ရှာဖွေသူ)
  - Referrer (ညွှန်းပို့သူ)
  - Company / HR (ကုမ္ပဏီ / HR)
  - Admin

  Membership Tiers:
  - Free: Basic access
  - Premium: 5,000 MMK/month — full academy, priority matching
  - Pro: 15,000 MMK/month — exclusive jobs, personal coach

  Company Plans:
  - Bronze:  99,000 MMK/month — 5 job postings
  - Silver:  299,000 MMK/month — 15 job postings
  - Gold:    799,000 MMK/month — unlimited
  - Diamond: Custom pricing

═══════════════════════════════════════════════════════════════
  V1 TECH STACK
═══════════════════════════════════════════════════════════════

  Framework:   Next.js 14 (App Router)
  Language:    TypeScript
  Styling:     Tailwind CSS v3
  Database:    Supabase (PostgreSQL)
  Auth:        Supabase Auth
  Icons:       Lucide React (NO emojis)
  Fonts:       DM Sans + Pyidaungsu
  Hosting:     Vercel
  Payments:    KBZ Pay / Wave Money integration

═══════════════════════════════════════════════════════════════
  V1 DESIGN RULES (Critical for GLM 5)
═══════════════════════════════════════════════════════════════

  1. ZERO emojis anywhere — SVG icons only (Lucide React)
  2. Gender-neutral avatars — initials only (like Notion/Linear)
  3. Myanmar text always needs line-height: 1.9 minimum
  4. Dark theme only — no light mode
  5. Teal (#14B8A6) is primary — use for CTAs, active states
  6. Gold (#F59E0B) is accent — use for rewards, achievements
  7. Cards: bg-slate-900 border border-slate-800 rounded-xl
  8. Mobile-first — must work on low-end Android
  9. All strings bilingual: { en: '...', mm: '...' }
  10. Professional tone — not playful, not childish

═══════════════════════════════════════════════════════════════
  V1 COMPONENT PATTERNS
═══════════════════════════════════════════════════════════════

  Avatar (gender-neutral):
    <div className="w-10 h-10 rounded-full bg-slate-800
                    border border-slate-700 flex items-center
                    justify-center font-semibold text-slate-300">
      AK  {/* initials only, never a face icon */}
    </div>

  Tier Badge:
    Bronze:    bg-amber-900/20 text-amber-600 border-amber-700/30
    Silver:    bg-slate-700/20 text-slate-400 border-slate-600/30
    Gold:      bg-yellow-500/10 text-yellow-400 border-yellow-500/30
    Diamond:   bg-cyan-500/10 text-cyan-400 border-cyan-500/30
    Legendary: bg-purple-500/10 text-purple-400 border-purple-500/30

  Streak Counter (replaces 🔥):
    <Flame size={14} className="text-orange-400" /> 7 days

  Points Display (replaces ⭐):
    <Zap size={14} className="text-yellow-400" /> 1,250 pts

  Status (replaces ✅❌):
    Active:  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
    Pending: <span className="w-2 h-2 rounded-full bg-yellow-400" />
    Closed:  <span className="w-2 h-2 rounded-full bg-slate-600" />

═══════════════════════════════════════════════════════════════
  V1 NAVIGATION STRUCTURE
═══════════════════════════════════════════════════════════════

  MAIN
  ├── Dashboard        (LayoutDashboard icon)
  ├── Jobs             (Briefcase icon)
  ├── Companies        (Building2 icon)
  └── Referrals        (Users icon)

  LEARNING
  ├── Academy          (BookOpen icon)
  ├── Roadmap          (TrendingUp icon)
  ├── Marketplace      (ShoppingBag icon)
  ├── Zodiac Insights  (Star icon)
  └── AI Tutor         (Brain icon)

  COMMUNITY
  ├── Community        (MessageSquare icon)
  ├── Leaderboard      (Trophy icon)
  └── Rewards          (Gift icon)

  LIFE
  ├── Weather Hub      (Sun icon)
  ├── Mentorship       (Target icon)
  └── Wellness         (Heart icon)

  SAFETY
  ├── Safety Net       (Shield icon)
  ├── Blood Donors     (Droplets icon)
  └── Impact Map       (Map icon)

═══════════════════════════════════════════════════════════════
  DATA (Real numbers as of Feb 2026)
═══════════════════════════════════════════════════════════════

  Candidates in system:  2,161 (imported from Excel)
  Active job listings:   26 real jobs
  Partner companies:     50+
  Total bonuses paid:    15M+ MMK
  Successful placements: 200+

═══════════════════════════════════════════════════════════════
  INSTRUCTIONS FOR GLM 5
═══════════════════════════════════════════════════════════════

  You are maintaining ReferTRM V1.
  Claude is building V2 from scratch in parallel.

  Your job on V1:
  1. Keep all existing pages working
  2. Fix any bugs reported by users
  3. Add small improvements to existing features
  4. Keep the design system consistent (colors, fonts, icons above)
  5. NEVER add emojis — always use Lucide React icons
  6. ALWAYS keep Myanmar language strings updated
  7. Test on mobile (low-end Android) before deploying

  When in doubt about design decisions, refer to this document.
  The goal: V1 stays stable while V2 is built better.

═══════════════════════════════════════════════════════════════
  LOGO
═══════════════════════════════════════════════════════════════

  File: trm-logo.png (transparent background version)
  Usage: 
    Navbar:  h-8 w-auto object-contain
    Hero:    w-64 md:w-80 object-contain
    Footer:  h-6 w-auto object-contain
  
  Glow effect for dark backgrounds:
    style={{ filter: 'drop-shadow(0 0 20px rgba(20,184,166,0.5))' }}

═══════════════════════════════════════════════════════════════
  "Built with heart for Myanmar's youth · 2026"
═══════════════════════════════════════════════════════════════
