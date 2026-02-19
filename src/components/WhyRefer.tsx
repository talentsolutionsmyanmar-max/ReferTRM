'use client';

import { motion } from 'framer-motion';
import { Wallet, Percent, Trophy, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Benefit {
  icon: React.ElementType;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  highlight?: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: Percent,
    title: 'Keep 85% of the Reward',
    titleMm: 'ဆုကြေး၏ ၈၅% ကို သိမ်းဆည်းပါ',
    description: 'Earn up to 425,000 - 500,000 MMK per successful referral',
    descriptionMm: 'အောင်မြင်သော ရည်ညွှန်းမှုတစ်ခုလျှင် ကျပ် ၄.၂၅သိန်း - ၅သိန်း ရရှိပါမည်',
    highlight: '425,000 - 500,000 MMK',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    icon: Wallet,
    title: 'Instant KPay Payment',
    titleMm: 'KPay မှတဆင့် ချက်ချင်းပေးချေမှု',
    description: 'Get paid directly to your KBZ Pay wallet within 24 hours',
    descriptionMm: '၂၄ နာရီအတွင်း KBZ Pay ပိုက်ဆံအိတ်သို့ တိုက်ရိုက်ရရှိပါမည်',
    color: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Trophy,
    title: 'Bonus Multipliers',
    titleMm: 'အပိုဆုကြေးများ',
    description: 'Complete quick skill lessons to unlock bonus reward multipliers',
    descriptionMm: 'ကျွမ်းကျင်မှုသင်ခန်းစာများ ပြီးမြောက်ပါက အပိုဆုကြေးများ ရရှိပါမည်',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Trusted Platform',
    titleMm: 'ယုံကြည်စိတ်ချရသော ပလက်ဖောင်း',
    description: 'Powered by real recruitment agency with proven track record',
    descriptionMm: 'အထောက်အထားမှန်ကန်သော အလုပ်စုံရှာဖွေရေးအေဂျင်စီမှ စီမံခန့်ခွဲပါသည်',
    color: 'from-blue-400 to-indigo-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function WhyRefer() {
  const handleJoin = () => {
    window.open('https://t.me/ReferTRM', '_blank');
  };

  return (
    <section id="why-refer" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-teal">Why Refer Friends</span>{' '}
            <span className="text-white">With ReferTRM?</span>
          </h2>
          <p className="text-xl text-slate-400">
            ကျွန်ုပ်တို့နှင့် အဘယ်ကြောင့် ရည်ညွှန်းသင့်သနည်း။
          </p>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={benefit.title} variants={itemVariants}>
              <Card className="glass-card-hover group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-500 text-sm burmese-text mb-2">
                        {benefit.titleMm}
                      </p>
                      <p className="text-slate-300">
                        {benefit.description}
                      </p>
                      <p className="text-slate-500 text-sm burmese-text mt-1">
                        {benefit.descriptionMm}
                      </p>

                      {benefit.highlight && (
                        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                          <span className="text-amber-400 font-bold">{benefit.highlight}</span>
                        </div>
                      )}
                    </div>

                    {/* Number */}
                    <div className="text-4xl font-bold text-slate-700 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="btn-teal text-lg px-8 py-6" onClick={handleJoin}>
            Join as Referrer Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-slate-500 text-sm burmese-text mt-3">
            ယနေ့ပဲ ရည်ညွှန်းသူအဖြစ် စတင်ပါ
          </p>
        </motion.div>
      </div>
    </section>
  );
}
