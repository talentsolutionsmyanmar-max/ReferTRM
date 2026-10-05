'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/jobs', label: 'Jobs' },
  { href: '/dashboard/academy', label: 'Academy' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/company', label: 'For Companies' },
];

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col items-start gap-0">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ReferTRM Logo" className="h-10 w-auto rounded-lg" />
              <span className="text-lg font-bold">
                <span className="text-teal-400">Refer</span>
                <span className="text-white">TRM</span>
              </span>
            </div>
            <span className="text-[10px] text-teal-400/80 flex items-center gap-1 ml-12">
              Made with <Heart className="w-3 h-3 text-red-400 inline" fill="currentColor" /> in Myanmar <span className="text-slate-500">(မြန်မာပြည်)</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href ? 'text-teal-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden bg-slate-900 border-b border-white/5">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block ${pathname === link.href ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="block btn-primary text-center text-sm">
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
