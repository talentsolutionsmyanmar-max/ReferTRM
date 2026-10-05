import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { EmployerPlan } from '@/data/pricing';

export default function EmployerPlansGrid({ plans }: { plans: EmployerPlan[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card p-6 relative ${plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-teal-500 text-white">Most Popular</Badge>
              </div>
            )}
            {plan.annualNote && (
              <div className="absolute -top-3 right-2">
                <Badge className="bg-teal-500/20 text-teal-400 text-xs">{plan.annualNote}</Badge>
              </div>
            )}
            <div className={`text-xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-1`}>
              {plan.name}
            </div>
            <div className="text-slate-500 text-xs burmese-text mb-4">{plan.nameMm}</div>

            {plan.price ? (
              <div>
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-slate-500 text-sm mb-4">{plan.period}</div>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">{plan.priceAnnual}</span>
                  <span className="text-slate-500 text-sm line-through">{plan.priceMonthly}</span>
                </div>
                <div className="text-teal-400 text-xs mb-2">{plan.periodAnnual}</div>
                <div className="text-slate-500 text-sm mb-4">
                  or {plan.priceMonthly}
                  {plan.period}
                </div>
              </div>
            )}

            <div className="text-teal-400 text-sm font-medium mb-4">{plan.slots}</div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                  <Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/company" className="block mt-6">
              <Button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>Get Started</Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
          <Check className="h-4 w-4 text-teal-400" />
          <span className="text-teal-400 text-sm">Save up to 34% with annual billing</span>
        </div>
      </div>
    </>
  );
}
