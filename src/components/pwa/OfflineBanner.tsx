'use client';

import { useState, useEffect, useCallback } from 'react';
import { Wifi, WifiOff, RefreshCw, CloudOff, Check, X, Database, ArrowDown } from 'lucide-react';
import { getOfflineStats, cleanupExpiredData } from '@/lib/offline-db';

interface OfflineBannerProps {
  language?: 'en' | 'my';
  onRetry?: () => void;
}

interface OfflineStats {
  jobsCount: number;
  applicationsCount: number;
  messagesCount: number;
  pendingSync: number;
  lastSync: number | null;
}

export default function OfflineBanner({ language = 'en', onRetry }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [wasOffline, setWasOffline] = useState(false);
  const [showBackOnline, setShowBackOnline] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState<OfflineStats | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load offline stats function
  const loadStats = useCallback(async () => {
    try {
      const offlineStats = await getOfflineStats();
      setStats(offlineStats);
    } catch (error) {
      console.error('Failed to load offline stats:', error);
    }
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setShowBackOnline(true);
        setTimeout(() => setShowBackOnline(false), 3000);
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setShowBackOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  // Load offline stats when offline - direct fetch in effect
  useEffect(() => {
    if (!isOnline) {
      // Fetch stats directly in effect for proper cleanup
      let cancelled = false;
      
      async function fetchStats() {
        try {
          const offlineStats = await getOfflineStats();
          if (!cancelled) {
            setStats(offlineStats);
          }
        } catch (error) {
          if (!cancelled) {
            console.error('Failed to load offline stats:', error);
          }
        }
      }
      
      fetchStats();
      
      return () => {
        cancelled = true;
      };
    }
  }, [isOnline]);

  const handleCleanup = useCallback(async () => {
    await cleanupExpiredData();
    await loadStats();
  }, [loadStats]);

  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }, [onRetry]);

  const texts = {
    // English
    en: {
      offline: 'You are offline',
      backOnline: 'Back online!',
      limitedFeatures: 'Some features may be limited',
      cachedJobs: 'cached jobs available',
      pendingSync: 'pending sync',
      lastSync: 'Last synced',
      never: 'Never',
      retry: 'Retry',
      viewOfflineData: 'View offline data',
      hideDetails: 'Hide details',
      jobs: 'Jobs',
      applications: 'Applications',
      messages: 'Messages',
      pending: 'Pending sync',
      cleanup: 'Cleanup expired',
    },
    // Myanmar
    my: {
      offline: 'အော့ဖ်လိုင်းဖြစ်နေသည်',
      backOnline: 'အွန်လိုင်းပြန်ရောက်ပါပြီ!',
      limitedFeatures: 'အချို့အသွင်္အပြင်များ ကန့်သတ်ချက်ရှိနိုင်သည်',
      cachedJobs: 'ဂိုသိမ်းထားသော အလုပ်များရှိသည်',
      pendingSync: 'ဆင့်ကို စောင့်ဆိုင်းနေသည်',
      lastSync: 'နောက်ဆုံး ဆင့်ကို',
      never: 'မရှိသေး',
      retry: 'ပြန်ကြိုးစားပါ',
      viewOfflineData: 'အော့ဖ်လိုင်းဒေတာ ကြည့်ရှုရန်',
      hideDetails: 'အသေးစိတ် ဖျောက်ပါ',
      jobs: 'အလုပ်များ',
      applications: 'လျှောက်လွှာများ',
      messages: 'စာများ',
      pending: 'ဆင့်စောင့်ဆိုင်း',
      cleanup: 'သက်တမ်းကုန်ငွေ့ရှင်းလင်းပါ',
    },
  };

  const t = texts[language];

  // Show "Back online" message
  if (showBackOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
        <div className="bg-teal-500 text-white px-4 py-3 flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-medium">{t.backOnline}</span>
        </div>
      </div>
    );
  }

  // Don't show if online
  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        {/* Main banner */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{t.offline}</p>
                <p className="text-sm text-white/80">{t.limitedFeatures}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={isExpanded ? t.hideDetails : t.viewOfflineData}
              >
                <Database className="w-5 h-5" />
              </button>
              <button
                onClick={handleRetry}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={t.retry}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        {stats && stats.jobsCount > 0 && (
          <div className="px-4 py-2 bg-black/10 flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <ArrowDown className="w-4 h-4" />
              {stats.jobsCount} {t.cachedJobs}
            </span>
            {stats.pendingSync > 0 && (
              <span className="flex items-center gap-1">
                <RefreshCw className="w-4 h-4" />
                {stats.pendingSync} {t.pendingSync}
              </span>
            )}
          </div>
        )}

        {/* Expanded details */}
        {isExpanded && stats && (
          <div className="px-4 py-4 bg-black/20 border-t border-white/10">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{stats.jobsCount}</div>
                <div className="text-sm text-white/80">{t.jobs}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{stats.applicationsCount}</div>
                <div className="text-sm text-white/80">{t.applications}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{stats.messagesCount}</div>
                <div className="text-sm text-white/80">{t.messages}</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{stats.pendingSync}</div>
                <div className="text-sm text-white/80">{t.pending}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">
                {t.lastSync}: {stats.lastSync 
                  ? new Date(stats.lastSync).toLocaleString(language === 'my' ? 'my-MM' : 'en-US')
                  : t.never
                }
              </span>
              <button
                onClick={handleCleanup}
                className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                {t.cleanup}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mini offline badge for headers
export function OfflineMiniBadge({ language = 'en' }: { language?: 'en' | 'my' }) {
  // Initialize with current online status
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
      <WifiOff className="w-3.5 h-3.5" />
      <span>{language === 'my' ? 'အော့ဖ်လိုင်း' : 'Offline'}</span>
    </div>
  );
}
