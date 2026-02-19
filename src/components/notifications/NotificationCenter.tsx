'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck, 
  Trash2, 
  Briefcase, 
  MessageSquare, 
  UserPlus, 
  Gift, 
  AlertCircle,
  ChevronRight,
  Clock
} from 'lucide-react';

interface Notification {
  id: string;
  userId: string;
  type: 'job_alert' | 'application_update' | 'message' | 'referral' | 'system' | 'reward';
  title: string;
  content: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'my';
}

const typeIcons = {
  job_alert: Briefcase,
  application_update: Clock,
  message: MessageSquare,
  referral: UserPlus,
  reward: Gift,
  system: AlertCircle,
};

const priorityColors = {
  low: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  medium: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  urgent: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

export default function NotificationCenter({ isOpen, onClose, language = 'en' }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(`/api/notifications?lang=${language}${filter === 'unread' ? '&unreadOnly=true' : ''}`);
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [language, filter]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  // Mark as read
  const markAsRead = async (notificationIds?: string[]) => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo_user',
          notificationIds,
          markAllRead: !notificationIds,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setUnreadCount(data.unreadCount);
        fetchNotifications();
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications?userId=demo_user&notificationId=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Format time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return language === 'my' ? 'အခုပဲ' : 'Just now';
    if (diff < 3600000) return language === 'my' 
      ? `${Math.floor(diff / 60000)} မိနစ်အကြာက` 
      : `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return language === 'my'
      ? `${Math.floor(diff / 3600000)} နာရီအကြာက`
      : `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return language === 'my'
      ? `${Math.floor(diff / 86400000)} ရက်အကြာက`
      : `${Math.floor(diff / 86400000)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[80vh] flex flex-col mt-16">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {language === 'my' ? 'အသိပေးချက်များ' : 'Notifications'}
              </h2>
              {unreadCount > 0 && (
                <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          
          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'my' ? 'အားလုံး' : 'All'}
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'my' ? 'မဖတ်ရသေး' : 'Unread'}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={() => markAsRead()}
                disabled={loading}
                className="px-3 py-1 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-auto"
              >
                <CheckCheck className="w-4 h-4 inline mr-1" />
                {language === 'my' ? 'အားလုံးဖတ်ပြီး' : 'Mark all read'}
              </button>
            )}
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                {language === 'my' ? 'အသိပေးချက်မရှိသေးပါ' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notification) => {
                const Icon = typeIcons[notification.type] || Bell;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                      !notification.read ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        priorityColors[notification.priority]
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-medium text-sm ${
                            notification.read 
                              ? 'text-slate-600 dark:text-slate-400' 
                              : 'text-slate-900 dark:text-white'
                          }`}>
                            {notification.title}
                          </h3>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3 h-3 text-slate-400" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {notification.content}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">
                            {formatTime(notification.createdAt)}
                          </span>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead([notification.id])}
                              className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                            >
                              {language === 'my' ? 'ဖတ်ပြီး' : 'Mark read'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <button className="w-full py-2 text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors">
            {language === 'my' ? 'အသိပေးချက်အားလုံးကိုကြည့်ပါ' : 'View all notifications'}
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
