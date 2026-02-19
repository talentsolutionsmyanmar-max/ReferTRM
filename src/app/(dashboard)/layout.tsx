'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  GraduationCap,
  Users,
  Gift,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Flame,
  Heart,
  BookOpen,
  Trophy,
  MessageSquare,
  Shield,
  AlertTriangle,
  Droplets,
  Sparkles,
  Compass,
  Bot,
  Lightbulb,
  BarChart3,
  Zap,
  Target,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Navigation items
const mainNav = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Companies', href: '/dashboard/companies', icon: BarChart3 },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
];

const learningNav = [
  { name: 'Academy', href: '/dashboard/academy', icon: GraduationCap },
  { name: 'Career Roadmaps', href: '/dashboard/careers', icon: Target },
  { name: 'Edu-Marketplace', href: '/dashboard/marketplace', icon: ShoppingCart },
  { name: 'Daily Knowledge', href: '/dashboard/academy/knowledge', icon: Lightbulb },
  { name: 'AI Tutor', href: '/dashboard/academy/buddy', icon: Bot },
  { name: 'Zodiac Career', href: '/dashboard/zodiac', icon: Sparkles },
];

const communityNav = [
  { name: 'Community', href: '/dashboard/community', icon: MessageSquare },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { name: 'Rewards', href: '/dashboard/rewards', icon: Gift },
];

const safetyNav = [
  { name: 'Safety Hub', href: '/dashboard/safety', icon: AlertTriangle },
  { name: 'Blood Network', href: '/dashboard/blood', icon: Droplets },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Use AuthContext instead of localStorage
  const { user, loading, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 No user found, redirecting to login');
      router.replace('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show redirect state if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const displayName = user.displayName || user.name || 'Demo User';

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
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
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3">
                <img src="/logo.png" alt="ReferTRM" className="h-10 w-auto rounded-lg" />
                <span className="text-lg font-bold">
                  <span className="text-teal-400">Refer</span>
                  <span className="text-foreground">TRM</span>
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-[10px] text-teal-400/80 flex items-center gap-1 mt-1 pl-[52px]">
              Made with <Heart className="w-3 h-3 text-red-400 inline" fill="currentColor" /> in Myanmar
            </p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-teal-500/50 bg-teal-500/20 flex items-center justify-center">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{user.avatar || '🧑'}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user.level || 'Amateur'}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10">
                <Flame className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">{user.streak || 1}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-amber-400 font-bold">{user.points || 50} pts</span>
              <span className="text-muted-foreground">{user.referralCode || 'REFXXXXX'}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto">
            {/* Main */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Compass className="h-3 w-3" /> Main
              </p>
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    pathname === item.href
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Learning */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <GraduationCap className="h-3 w-3" /> Learning
              </p>
              {learningNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    pathname === item.href
                      ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Community */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users className="h-3 w-3" /> Community
              </p>
              {communityNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    pathname === item.href
                      ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Safety */}
            <div className="mb-4">
              <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Shield className="h-3 w-3" /> Safety
              </p>
              {safetyNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    pathname === item.href
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Settings */}
            <div className="pt-2 border-t border-border">
              <Link
                href="/dashboard/settings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  pathname === '/dashboard/settings'
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </Link>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
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
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden md:flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal-500/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-teal-500/50 bg-teal-500/20 flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg">{user.avatar || '🧑'}</span>
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.level || 'Amateur'}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-3 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
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
