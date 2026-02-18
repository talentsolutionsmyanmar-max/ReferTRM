'use client';

import { motion } from 'framer-motion';
import { Check, Send, Zap, Building, Users, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface PricingPlan {
  name: string;
  nameMm: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Free Trial',
    nameMm: 'အခမဲ့ စမ်းသပ်',
    price: '0',
    period: 'forever',
    description: 'Try our platform with 3 free hires',
    features: [
      '3 free successful hires',
      'Basic job posting',
      'Email support',
      'Standard referral tracking',
    ],
    icon: Zap,
    color: 'from-slate-500 to-slate-600',
  },
  {
    name: 'Bronze',
    nameMm: 'ကြေးနီ',
    price: '100,000',
    period: '/month',
    description: 'Perfect for small businesses',
    features: [
      '10 job postings/month',
      '5 successful hires included',
      'Priority support',
      'Basic analytics dashboard',
      'Direct referrer messaging',
    ],
    icon: Building,
    color: 'from-amber-600 to-amber-700',
  },
  {
    name: 'Silver',
    nameMm: 'ငွေ',
    price: '250,000',
    period: '/month',
    description: 'Most popular for growing companies',
    features: [
      '25 job postings/month',
      '15 successful hires included',
      'Premium support',
      'Advanced analytics & reports',
      'Featured job listings',
      'Dedicated account manager',
    ],
    highlight: true,
    badge: 'Most Popular',
    icon: Star,
    color: 'from-slate-400 to-slate-500',
  },
  {
    name: 'Gold',
    nameMm: 'ရွှေ',
    price: '500,000',
    period: '/month',
    description: 'For established enterprises',
    features: [
      'Unlimited job postings',
      '30 successful hires included',
      '24/7 priority support',
      'Full analytics suite',
      'Custom branding',
      'API access',
      'Bulk referrals',
    ],
    icon: Briefcase,
    color: 'from-amber-400 to-yellow-500',
  },
  {
    name: 'Diamond',
    nameMm: 'စိန်',
    price: 'Custom',
    period: '',
    description: 'Enterprise solutions',
    features: [
      'Everything in Gold',
      'Unlimited hires',
      'White-label solution',
      'Custom integrations',
      'On-site training',
      'SLA guarantee',
      'Dedicated success team',
    ],
    icon: Users,
    color: 'from-cyan-400 to-teal-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ForCompanies() {
  const handleContact = () => {
    window.open('https://t.me/ReferTRM', '_blank');
  };

  return (
    <section id="companies" className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
            For Companies
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Hire Smarter & Cheaper</span>
          </h2>
          <p className="text-xl text-slate-300 mb-2">
            Get 3 free successful hires to try the platform
          </p>
          <p className="text-slate-400 mb-4">
            After that, pay only <span className="text-amber-400 font-semibold">50,000 MMK</span> flat success fee per hire – any position
          </p>
          <p className="text-slate-500 burmese-text">
            အောင်မြင်မှုအတွက် ကျပ် ၅သောင်းသာ ပေးဆောင်ရပါမည် – မည်သည့်ရာထူးအတွက်မဆို
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={itemVariants} className="relative">
              {plan.highlight && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-30" />
              )}
              <Card
                className={`glass-card-hover h-full relative ${
                  plan.highlight
                    ? 'border-teal-500/50 ring-2 ring-teal-500/30'
                    : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-semibold">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-500 burmese-text">{plan.nameMm}</p>
                </CardHeader>
                <CardContent className="text-center">
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">
                      {plan.price === 'Custom' ? plan.price : `${plan.price} MMK`}
                    </span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      plan.highlight ? 'btn-teal' : 'btn-outline-teal'
                    }`}
                    onClick={handleContact}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Start Hiring?
            </h3>
            <p className="text-slate-400 mb-4">
              Contact us on Telegram for exclusive beta pricing and personalized onboarding
            </p>
            <p className="text-slate-500 text-sm burmese-text mb-6">
              အထူးဈေးနှုန်းများနှင့် ကိုယ်ပိုင်ဝန်ဆောင်မှုအတွက် Telegram တွင် ဆက်သွယ်ပါ
            </p>
            <Button size="lg" className="btn-teal" onClick={handleContact}>
              <Send className="mr-2 h-5 w-5" />
              Contact Us on Telegram
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
