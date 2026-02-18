'use client';

import { useEffect, useRef } from 'react';
import { WifiOff, Cloud, CloudOff } from 'lucide-react';

interface OfflineIndicatorProps {
  language?: 'en' | 'my';
}

export default function OfflineIndicator({ language = 'en' }: OfflineIndicatorProps) {
  const wasOfflineRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      if (wasOfflineRef.current) {
        // Show reconnected message
        document.body.setAttribute('data-online-status', 'reconnected');
        timeoutRef.current = setTimeout(() => {
          document.body.setAttribute('data-online-status', 'online');
        }, 3000);
      }
      wasOfflineRef.current = false;
    };

    const handleOffline = () => {
      wasOfflineRef.current = true;
      document.body.setAttribute('data-online-status', 'offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return null; // This component only sets up listeners
}

// Mini offline badge for header/sidebar
export function OfflineBadge({ language = 'en' }: OfflineIndicatorProps) {
  const isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  if (isOnline) return null;

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs">
      <WifiOff className="w-3 h-3" />
      <span>{language === 'my' ? 'အော့ဖ်လိုင်း' : 'Offline'}</span>
    </div>
  );
}

// Connection status indicator
export function ConnectionStatus({ language = 'en' }: OfflineIndicatorProps) {
  const isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  return (
    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      {isOnline ? (
        <>
          <Cloud className="w-3 h-3 text-teal-500" />
          <span>{language === 'my' ? 'အွန်လိုင်း' : 'Online'}</span>
        </>
      ) : (
        <>
          <CloudOff className="w-3 h-3 text-amber-500" />
          <span>{language === 'my' ? 'အော့ဖ်လိုင်း' : 'Offline'}</span>
        </>
      )}
    </div>
  );
}
