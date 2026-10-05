import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | ReferTRM',
  description:
    'Job seekers use ReferTRM for free. Employers pay for recruitment slots and hiring access.',
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
