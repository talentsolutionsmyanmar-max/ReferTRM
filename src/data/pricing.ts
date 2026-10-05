/**
 * Public pricing catalogs and FID Stage 1 seeker-billing gate.
 *
 * Job seekers are always free (matching, learning, job seeking, onboarding, game).
 * Paid seeker SKUs stay in this file so the change is reversible, but they are
 * hidden from public UI unless NEXT_PUBLIC_SEEKER_PAID_PLANS_PUBLIC=true.
 *
 * Live refertrm.com/pricing historically listed Foundation / Starter (unpaid)
 * plus Mover / Flyer / Pro Max (MMK/month). This repo's homepage used Free /
 * Premium / Pro. Both paid families are gated the same way.
 *
 * Employer / recruitment fees are NOT gated.
 */

export const SEEKER_PAID_PLANS_PUBLIC =
  process.env.NEXT_PUBLIC_SEEKER_PAID_PLANS_PUBLIC === 'true';

export type EmployerPlan = {
  name: string;
  nameMm: string;
  price?: string;
  priceMonthly?: string;
  priceAnnual?: string;
  period: string;
  periodAnnual?: string;
  slots: string;
  features: string[];
  popular: boolean;
  color: string;
  annualNote?: string;
};

export type SeekerPlan = {
  id: string;
  name: string;
  nameMm: string;
  /** Display price. "0" / 0 means free. Points-gated is still unpaid. */
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  /** Money SKU sold to job seekers (MMK/month). Hidden when the flag is off. */
  paid: boolean;
};

/** Homepage membership cards (this repo). */
export const homepageSeekerPlans: SeekerPlan[] = [
  {
    id: 'free',
    name: 'Free',
    nameMm: 'အခမဲ့',
    price: '0',
    features: ['Basic job access', 'Limited academy courses', 'Standard referral code', 'Basic avatar'],
    popular: false,
    paid: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    nameMm: 'ပရီမီယံ',
    price: '5,000',
    period: 'MMK/month',
    features: ['All job access', 'Full academy access', 'Priority referral matching', 'Premium avatars', 'Double points', 'Early job alerts'],
    popular: true,
    paid: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    nameMm: 'ပရို',
    price: '15,000',
    period: 'MMK/month',
    features: ['Everything in Premium', 'Exclusive high-reward jobs', 'Personal referral coach', 'VIP badge', 'Triple points', 'First access to new features', 'Diploma discounts'],
    popular: false,
    paid: true,
  },
];

/**
 * Public /pricing seeker catalog matching live refertrm.com/pricing names.
 * Unpaid rows may still render; paid MMK/month rows are gated.
 */
export const publicPricingSeekerPlans: SeekerPlan[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    nameMm: 'အခြေခံ',
    price: '0',
    period: 'Free Forever',
    features: [
      'Job board access (all active positions)',
      'Academy Foundation modules',
      'Career Season Game',
      'Matching, learning, job seeking, and onboarding',
      'CV Builder (free; generate limit ~2/week)',
    ],
    popular: true,
    paid: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    nameMm: 'စတင်',
    price: '0',
    period: 'Points-gated',
    features: [
      'Everything in Foundation',
      'Intermediate Academy modules',
      'Enhanced CV Builder',
      'Job match notifications',
      'Community forum access',
    ],
    paid: false,
  },
  {
    id: 'mover',
    name: 'Mover',
    nameMm: 'ရွေ့လျားသူ',
    price: '10,000',
    period: 'MMK/month',
    features: [
      'Everything in Starter',
      'Advanced Academy modules',
      'Priority job matching',
      'Career Season Game higher levels',
      'Mock interview practice',
    ],
    paid: true,
  },
  {
    id: 'flyer',
    name: 'Flyer',
    nameMm: 'ပျံသန်းသူ',
    price: '20,000',
    period: 'MMK/month',
    features: [
      'Everything in Mover',
      'AI career coaching',
      'Salary negotiation tools',
      'Priority placement',
    ],
    paid: true,
  },
  {
    id: 'pro-max',
    name: 'Pro Max',
    nameMm: 'ပရို မက်စ်',
    price: '35,000',
    period: 'MMK/month',
    features: ['Everything in Flyer', 'Highest referrer reward share', 'Priority support'],
    paid: true,
  },
];

export const employerPlans: EmployerPlan[] = [
  {
    name: 'Starter',
    nameMm: 'စတင်သူ',
    price: 'Free',
    period: 'Forever',
    slots: '3 Job Slots',
    features: ['3 active job postings', 'Basic job visibility', 'Email support', 'Standard listing', '1 week visibility per post'],
    popular: false,
    color: 'from-slate-500 to-slate-600',
  },
  {
    name: 'Bronze',
    nameMm: 'ကြေးနီ',
    priceMonthly: '150K',
    priceAnnual: '99K',
    period: '/month',
    periodAnnual: '/month (billed annually)',
    slots: '5 Job Slots',
    features: ['5 active job postings', 'Featured job listings', 'Priority support', 'Applicant tracking', 'Company branding', '2 week visibility per post'],
    popular: false,
    color: 'from-amber-600 to-orange-600',
    annualNote: 'Save 34%',
  },
  {
    name: 'Silver',
    nameMm: 'ငွေ',
    priceMonthly: '350K',
    priceAnnual: '299K',
    period: '/month',
    periodAnnual: '/month (billed annually)',
    slots: '15 Job Slots',
    features: ['15 active job postings', 'Premium job listings', 'Dedicated account manager', 'Advanced analytics & reports', 'Bulk job posting', 'Social media promotion', '30 day visibility per post'],
    popular: true,
    color: 'from-gray-400 to-slate-500',
    annualNote: 'Save 14%',
  },
  {
    name: 'Gold',
    nameMm: 'ရွှေ',
    priceMonthly: '950K',
    priceAnnual: '799K',
    period: '/month',
    periodAnnual: '/month (billed annually)',
    slots: 'Unlimited Slots',
    features: ['Unlimited job postings', 'Top of search results', '24/7 priority support', 'Full analytics dashboard', 'Custom branding', 'API access', 'Talent pool access', 'Salary market reports', 'Company profile premium'],
    popular: false,
    color: 'from-yellow-500 to-amber-500',
    annualNote: 'Save 16%',
  },
  {
    name: 'Diamond',
    nameMm: 'စိန်',
    price: 'Custom',
    period: 'Enterprise',
    slots: 'Unlimited+ Priority',
    features: ['Negotiated pricing', 'Everything in Gold', 'White-label solution', 'Custom integrations', 'SLA guarantee', 'Dedicated success team', 'Training sessions', 'Exclusive salary data'],
    popular: false,
    color: 'from-cyan-400 to-teal-500',
  },
];

export function getPublicSeekerPlans(plans: SeekerPlan[]): SeekerPlan[] {
  if (SEEKER_PAID_PLANS_PUBLIC) return plans;
  return plans.filter((plan) => !plan.paid);
}
