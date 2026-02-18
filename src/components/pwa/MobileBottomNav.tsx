'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  User, 
  Bell,
  Gift,
  Menu,
  X,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-touch-gestures';
import { OfflineMiniBadge } from './OfflineBanner';

interface NavItem {
  id: string;
  label: string;
  labelMy: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    labelMy: 'ပင်မ',
    icon: Home,
    path: '/dashboard',
  },
  {
    id: 'jobs',
    label: 'Jobs',
    labelMy: 'အလုပ်',
    icon: Briefcase,
    path: '/dashboard/jobs',
  },
  {
    id: 'messages',
    label: 'Messages',
    labelMy: 'စာများ',
    icon: MessageSquare,
    path: '/dashboard/messages',
  },
  {
    id: 'rewards',
    label: 'Rewards',
    labelMy: 'ဆုများ',
    icon: Gift,
    path: '/dashboard/rewards',
  },
];

interface MobileBottomNavProps {
  language?: 'en' | 'my';
  unreadMessages?: number;
  unreadNotifications?: number;
}

export default function MobileBottomNav({ 
  language = 'en',
  unreadMessages = 0,
  unreadNotifications = 0,
}: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const haptic = useHapticFeedback();
  
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Derive active item from pathname (no state needed)
  const activeItem = useMemo(() => {
    const matchingItem = mainNavItems.find(item => pathname?.includes(item.path));
    return matchingItem?.id || 'home';
  }, [pathname]);

  const handleNavClick = useCallback((item: NavItem) => {
    haptic.light();
    router.push(item.path);
  }, [haptic, router]);

  const handleMoreClick = useCallback(() => {
    haptic.medium();
    setShowMoreMenu(prev => !prev);
  }, [haptic]);

  const moreItems: NavItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      labelMy: 'အသိပေးချက်',
      icon: Bell,
      path: '/dashboard/notifications',
      badge: unreadNotifications,
    },
    {
      id: 'profile',
      label: 'Profile',
      labelMy: 'ပရိုဖိုင်',
      icon: User,
      path: '/dashboard/settings',
    },
  ];

  return (
    <>
      {/* More menu overlay */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
          onClick={() => setShowMoreMenu(false)}
        />
      )}

      {/* More menu sheet */}
      <div 
        className={cn(
          "fixed bottom-16 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl transform transition-transform duration-300",
          showMoreMenu ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="p-4">
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />
          
          <div className="grid grid-cols-2 gap-3">
            {moreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item);
                  setShowMoreMenu(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all",
                  "active:scale-95",
                  activeItem === item.id
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {language === 'my' ? item.labelMy : item.label}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <OfflineMiniBadge language={language} />
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all",
                "active:scale-90 active:bg-slate-100 dark:active:bg-slate-800",
                activeItem === item.id
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              <div className="relative">
                <item.icon className={cn(
                  "w-6 h-6 transition-transform",
                  activeItem === item.id && "scale-110"
                )} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">
                {language === 'my' ? item.labelMy : item.label}
              </span>
              
              {/* Active indicator */}
              {activeItem === item.id && (
                <div className="absolute bottom-1 w-1 h-1 bg-teal-500 rounded-full" />
              )}
            </button>
          ))}
          
          {/* More button */}
          <button
            onClick={handleMoreClick}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all",
              "active:scale-90 active:bg-slate-100 dark:active:bg-slate-800",
              "text-slate-500 dark:text-slate-400",
              showMoreMenu && "text-teal-600 dark:text-teal-400"
            )}
          >
            {showMoreMenu ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
            <span className="text-xs font-medium">
              {language === 'my' ? 'ပိုမို' : 'More'}
            </span>
          </button>
        </div>
      </nav>

      {/* Safe area spacer for iOS */}
      <style jsx global>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
    </>
  );
}

// Desktop sidebar version
export function DesktopSidebar({ 
  language = 'en',
  unreadMessages = 0,
  unreadNotifications = 0,
}: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Derive active item from pathname
  const activeItem = useMemo(() => {
    const matchingItem = mainNavItems.find(item => pathname?.includes(item.path));
    return matchingItem?.id || 'home';
  }, [pathname]);

  const allItems = [...mainNavItems, {
    id: 'notifications',
    label: 'Notifications',
    labelMy: 'အသိပေးချက်',
    icon: Bell,
    path: '/dashboard/notifications',
    badge: unreadNotifications,
  }, {
    id: 'profile',
    label: 'Settings',
    labelMy: 'ဆက်တင်များ',
    icon: User,
    path: '/dashboard/settings',
  }];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold text-teal-600 dark:text-teal-400">
          ReferTRM
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {allItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              activeItem === item.id
                ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                : "text-slate-600 dark:text-slate-400"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">
              {language === 'my' ? item.labelMy : item.label}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Offline indicator */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <OfflineMiniBadge language={language} />
      </div>
    </aside>
  );
}
