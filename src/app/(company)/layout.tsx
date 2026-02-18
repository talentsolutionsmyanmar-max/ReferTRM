'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Briefcase,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  FileText,
  DollarSign,
  Sparkles,
  Target,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/company', icon: Building2, labelMm: 'ပင်မစာမျက်နှာ' },
  { name: 'Job Postings', href: '/company/jobs', icon: Briefcase, labelMm: 'အလုပ်ကြော်ငြာများ' },
  { name: 'AI Tools', href: '/company/ai-tools', icon: Sparkles, labelMm: 'AI ကိရိယာများ' },
  { name: 'Assessments', href: '/company/assessments', icon: Target, labelMm: 'အဆင့်အတန်း စစ်ဆေးမှု' },
  { name: 'Interviews', href: '/company/interview-scheduling', icon: Calendar, labelMm: 'အင်တာဗျူး အစီအစဉ်' },
  { name: 'Applicants', href: '/company/applicants', icon: Users, labelMm: 'လျှောက်လွှာများ' },
  { name: 'Referrals', href: '/company/referrals', icon: UserPlus, labelMm: 'ရည်ညွှန်းမှုများ' },
  { name: 'Analytics', href: '/company/analytics', icon: BarChart3, labelMm: 'သုတေသန' },
  { name: 'Billing', href: '/company/billing', icon: DollarSign, labelMm: 'ငွေပေးချေမှု' },
  { name: 'Settings', href: '/company/settings', icon: Settings, labelMm: 'ဆက်တင်များ' },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <Link href="/company" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">
                  <span className="text-teal-400">Company</span>
                  <span className="text-white"> Portal</span>
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Company Quick Info */}
          <div className="p-4 border-b border-white/5">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-xl font-bold text-white">
                  R
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">RK Yangon Steel</p>
                  <p className="text-xs text-slate-500">Manufacturing Industry</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-teal-500/10">
                  <div className="text-lg font-bold text-teal-400">12</div>
                  <div className="text-xs text-slate-500">Jobs</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <div className="text-lg font-bold text-amber-400">47</div>
                  <div className="text-xs text-slate-500">Applicants</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <div className="flex-1">
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-lg font-bold text-white">
                    R
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">RK Yangon Steel</p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 glass-card p-2 bg-slate-900"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="font-medium text-white">Company Settings</p>
                        <p className="text-sm text-slate-500">Manage your account</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/company/settings"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
