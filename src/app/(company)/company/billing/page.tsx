'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  ChevronRight,
  Check,
  Star,
  Zap,
  Crown,
  Building2,
  FileText,
  Clock,
  AlertCircle,
  CreditCard as CardIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Pricing plans
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    nameMm: 'စတင်သူ',
    price: 'Free',
    priceNote: '/month',
    description: 'For small teams getting started',
    features: [
      '3 job postings/month',
      '50 applicants tracking',
      'Basic analytics',
      'Email support',
    ],
    current: false,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    nameMm: 'ကြေးနီ',
    price: '99,000',
    priceNote: 'MMK/month',
    description: 'For growing businesses',
    features: [
      '10 job postings/month',
      '200 applicants tracking',
      'AI JD Generator',
      'Document processor',
      'Priority support',
    ],
    current: true,
  },
  {
    id: 'silver',
    name: 'Silver',
    nameMm: 'ငွေ',
    price: '299,000',
    priceNote: 'MMK/month',
    description: 'For established companies',
    features: [
      'Unlimited job postings',
      '500 applicants tracking',
      'All AI tools',
      'Assessments',
      'Interview scheduling',
      'Dedicated support',
    ],
    popular: true,
    current: false,
  },
  {
    id: 'gold',
    name: 'Gold',
    nameMm: 'ရွှေ',
    price: '799,000',
    priceNote: 'MMK/month',
    description: 'For enterprise needs',
    features: [
      'Everything in Silver',
      'Unlimited applicants',
      'Advanced analytics',
      'Custom integrations',
      'Account manager',
      'SLA guarantee',
    ],
    current: false,
  },
];

// Mock invoices
const invoices = [
  { id: 'INV-2025-001', date: '2025-01-01', amount: '99,000 MMK', status: 'paid', plan: 'Bronze' },
  { id: 'INV-2024-012', date: '2024-12-01', amount: '99,000 MMK', status: 'paid', plan: 'Bronze' },
  { id: 'INV-2024-011', date: '2024-11-01', amount: '99,000 MMK', status: 'paid', plan: 'Bronze' },
];

// Payment methods
const paymentMethods = [
  { id: 'kpay', name: 'KPay', logo: '📱', description: 'KBZ Pay Mobile Wallet' },
  { id: 'wave', name: 'Wave Money', logo: '🌊', description: 'Wave Money Transfer' },
  { id: 'bank', name: 'Bank Transfer', logo: '🏦', description: 'Direct Bank Transfer' },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-teal-400" />
            Billing
            <span className="text-lg text-slate-400 font-normal">/ ငွေပေးချေမှု</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your subscription and payment methods
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-teal-500/5 to-cyan-500/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Bronze Plan</h3>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Active</Badge>
                </div>
                <p className="text-sm text-slate-400">ကြေးနီအစီအစဉ် • Renews on Feb 1, 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">99,000 MMK</p>
              <p className="text-sm text-slate-400">per month / တစ်လလျှင်</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Available Plans / ရရှိနိုင်သောအစီအစဉ်များ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative p-5 rounded-xl border transition-all ${
                plan.current
                  ? 'bg-teal-500/10 border-teal-500/50'
                  : plan.popular
                  ? 'bg-purple-500/10 border-purple-500/50'
                  : 'bg-slate-800/50 border-white/5 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {plan.current && (
                <Badge className="absolute -top-2 right-3 bg-teal-500 text-white">
                  <Check className="h-3 w-3 mr-1" />
                  Current
                </Badge>
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400">{plan.nameMm}</p>
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-slate-400">{plan.priceNote}</span>
              </div>

              <p className="text-sm text-slate-400 mb-4">{plan.description}</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.current
                    ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Methods & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Payment Methods / ငွေပေးချေနည်း</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:border-teal-500/50 transition-all cursor-pointer"
              >
                <span className="text-2xl">{method.logo}</span>
                <div className="flex-1">
                  <p className="font-medium text-white">{method.name}</p>
                  <p className="text-sm text-slate-400">{method.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </div>
            ))}
            <p className="text-xs text-slate-500 mt-4">
              💡 Manual payment processing - Our team will contact you for payment arrangement.
              <br />လက်လီငွေပေးချေမှု - ငွေပေးချေရန် ကျွန်ုပ်တို့၏အဖွဲ့မှ ဆက်သွယ်ပေးပါမည်။
            </p>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Invoice History / ငွေတောင်းခံလွှာများ</CardTitle>
                <CardDescription>Download past invoices</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{invoice.id}</p>
                      <p className="text-xs text-slate-400">{invoice.date} • {invoice.plan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">{invoice.amount}</span>
                    <Badge
                      variant="outline"
                      className={invoice.status === 'paid' ? 'border-green-500/50 text-green-400' : 'border-amber-500/50 text-amber-400'}
                    >
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Contact */}
      <Card className="glass-card border-white/5 bg-amber-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20">
              <AlertCircle className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Need Help with Billing?</h3>
              <p className="text-sm text-slate-400 mb-3">
                Our team is here to help you with payment, invoices, or plan changes.
                <br />ငွေပေးချေမှု၊ ငွေတောင်းခံလွှာများ သို့မဟုတ် အစီအစဉ်ပြောင်းလဲမှုများအတွက် ကျွန်ုပ်တို့၏အဖွဲ့ကူညီပေးရန် ရှိပါသည်။
              </p>
              <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                Contact Support / ဆက်သွယ်ပါ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
