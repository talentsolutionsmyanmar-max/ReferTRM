'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  onClick: () => void;
  language?: 'en' | 'my';
}

export default function NotificationBadge({ onClick, language = 'en' }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/notifications?unreadOnly=true&limit=0');
        const data = await response.json();
        
        if (data.success && mountedRef.current) {
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };
    
    // Initial fetch
    fetchUnreadCount();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
      title={language === 'my' ? 'အသိပေးချက်များ' : 'Notifications'}
    >
      <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}
