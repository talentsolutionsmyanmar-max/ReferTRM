'use client';

import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Browse Jobs', href: '#jobs', labelMm: 'အလုပ်များ ကြည့်ရှုပါ' },
  { label: 'For Companies', href: '#companies', labelMm: 'ကုမ္ပဏီများအတွက်' },
  { label: 'Why Refer', href: '#why-refer', labelMm: 'အဘယ်ကြောင့် ရည်ညွှန်းသင့်သနည်း' },
  { label: 'Academy', href: '#academy', labelMm: 'သင်ကြားရေး' },
];

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/ReferTRM', icon: Send },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">R</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-gradient-teal">Refer</span>
                <span className="text-white">TRM</span>
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Myanmar's trusted referral hiring platform. Connect talent with opportunity.
            </p>
            <p className="text-slate-500 text-sm burmese-text">
              မြန်မာနိုင်ငံ၏ ယုံကြည်စိတ်ချရသော ရည်ညွှန်းခြင်းလုပ်ငန်းပလက်ဖောင်း
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <span className="text-slate-600 text-sm burmese-text">({link.labelMm})</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://t.me/ReferTRM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>@ReferTRM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4" />
                <span>contact@refertrm.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4" />
                <span>+95 9 XXX XXX XXX</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Yangon, Myanmar</span>
              </li>
            </ul>

            {/* CTA */}
            <Button className="btn-teal mt-6 w-full" asChild>
              <a href="https://t.me/ReferTRM" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" />
                Contact on Telegram
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>
              © {currentYear} ReferTRM by Talent Solutions Myanmar. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
