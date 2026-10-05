import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SeekerPlan } from '@/data/pricing';

export default function SeekerPlanCards({ plans }: { plans: SeekerPlan[] }) {
  if (plans.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 gap-6 ${plans.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`glass-card p-6 ${plan.popular ? 'ring-2 ring-teal-500 relative' : ''}`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-teal-500 text-white">{plan.paid ? 'Recommended' : 'Always free'}</Badge>
            </div>
          )}
          <div className="text-xl font-bold text-white mb-1">{plan.name}</div>
          <div className="text-slate-500 text-xs burmese-text mb-4">{plan.nameMm}</div>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-white">{plan.price === '0' ? 'Free' : plan.price}</span>
            {plan.period && plan.price !== '0' && (
              <span className="text-slate-500 text-sm">{plan.period}</span>
            )}
            {plan.price === '0' && plan.period && (
              <span className="text-slate-500 text-sm ml-1">{plan.period}</span>
            )}
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                <Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          <Link href="/register">
            <Button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
              {plan.paid ? 'Subscribe Now' : 'Get Started Free'}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
