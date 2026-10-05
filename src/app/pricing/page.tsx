'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicHeader from '@/components/PublicHeader';
import EmployerPlansGrid from '@/components/pricing/EmployerPlansGrid';
import SeekerPlanCards from '@/components/pricing/SeekerPlanCards';
import {
  employerPlans,
  getPublicSeekerPlans,
  publicPricingSeekerPlans,
  SEEKER_PAID_PLANS_PUBLIC,
} from '@/data/pricing';

const freeSeekerIncludes = [
  'Matching and job board access',
  'Learning academy',
  'Job seeking and applications',
  'Onboarding tools',
  'Career Season Game',
  'CV / resume builder (free; generate limit ~2/week)',
];

export default function PricingPage() {
  const seekerPlans = getPublicSeekerPlans(publicPricingSeekerPlans);
  const paidSeekerHidden = !SEEKER_PAID_PLANS_PUBLIC;

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-teal-400 text-sm font-medium mb-3">Pricing</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Job seekers are always free
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Matching, learning, job seeking, onboarding, and the game cost nothing for candidates.
              Employers pay for recruitment access.
            </p>
            <p className="text-slate-500 burmese-text mt-2">အလုပ်ရှာသူများအတွက် အခမဲ့ဖြစ်သည်။</p>
          </motion.div>

          <section
            className="mb-16"
            aria-labelledby="seeker-pricing"
            data-seeker-paid-plans={paidSeekerHidden ? 'hidden' : 'visible'}
          >
            <h2 id="seeker-pricing" className="text-2xl font-bold text-white mb-2 text-center">
              For job seekers
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Create an account at no cost. There is no job-seeker subscription to buy.
            </p>

            <div className="glass-card p-6 md:p-8 mb-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-6 w-6 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-bold text-white">Always free</h3>
                  <p className="text-slate-400 text-sm">
                    Candidates keep full access to matching, learning, applications, onboarding, and the game.
                  </p>
                </div>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                {freeSeekerIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="btn-primary">Create free account</Button>
              </Link>
            </div>

            <SeekerPlanCards plans={seekerPlans} />
          </section>

          <section aria-labelledby="employer-pricing">
            <h2 id="employer-pricing" className="text-2xl font-bold text-white mb-2 text-center">
              For companies
            </h2>
            <p className="text-slate-400 text-center mb-8">
              Recruitment slots and employer billing. This is the paid path.
            </p>
            <EmployerPlansGrid plans={employerPlans} />
            <p className="text-center mt-6">
              <Link href="/company/billing" className="text-teal-400 hover:text-teal-300 text-sm">
                Employer billing portal →
              </Link>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-teal-400 text-sm font-medium flex items-center justify-center gap-1 mb-3">
            Made with <Heart className="w-4 h-4 text-red-400 inline" fill="currentColor" /> in Myanmar
          </p>
          <p className="text-slate-500 text-sm">© 2026 ReferTRM by Talent Solutions Myanmar</p>
        </div>
      </footer>
    </div>
  );
}
