'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Check, X, Smartphone } from 'lucide-react';

interface PushNotificationSetupProps {
  language?: 'en' | 'my';
}

export default function PushNotificationSetup({ language = 'en' }: PushNotificationSetupProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    setIsSupported('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window);
    
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setIsSubscribed(Notification.permission === 'granted');
    }

    // Check if user has dismissed setup
    const dismissed = localStorage.getItem('push-setup-dismissed');
    if (!dismissed && Notification.permission === 'default') {
      setTimeout(() => setShowSetup(true), 10000);
    }
  }, []);

  const requestPermission = async () => {
    setLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        setIsSubscribed(true);
        
        // Subscribe to push notifications
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            // This would be your VAPID public key
            'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
          ),
        });
        
        // Send subscription to server
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        });
        
        setShowSetup(false);
      }
    } catch (error) {
      console.error('Push notification setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Notify server
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      }
      
      setIsSubscribed(false);
    } catch (error) {
      console.error('Unsubscribe error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissSetup = () => {
    setShowSetup(false);
    localStorage.setItem('push-setup-dismissed', 'true');
  };

  // Convert VAPID key
  function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) return null;

  // Setup prompt
  if (showSetup && permission === 'default') {
    return (
      <div className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto animate-slide-up">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {language === 'my' ? 'အသိပေးချက်များ ခွင့်ပြုပါ' : 'Enable Notifications'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {language === 'my' 
                  ? 'အလုပ်အသစ်များနှင့် လျှောက်လွှာအပ်ဒိတ်များကို အချိန်မီလက်ခံရယူပါ'
                  : 'Get instant alerts for new jobs and application updates'
                }
              </p>
              <div className="flex gap-2">
                <button
                  onClick={requestPermission}
                  disabled={loading}
                  className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : language === 'my' ? 'ခွင့်ပြုပါ' : 'Enable'}
                </button>
                <button
                  onClick={dismissSetup}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {language === 'my' ? 'နောက်မှ' : 'Later'}
                </button>
              </div>
            </div>
            <button onClick={dismissSetup} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Toggle button (for settings page)
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isSubscribed 
            ? 'bg-teal-100 dark:bg-teal-900/30' 
            : 'bg-slate-100 dark:bg-slate-700'
        }`}>
          {isSubscribed ? (
            <Bell className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          ) : (
            <BellOff className="w-5 h-5 text-slate-400" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-white">
            {language === 'my' ? 'ပုဒ်အသိပေးချက်များ' : 'Push Notifications'}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isSubscribed 
              ? (language === 'my' ? 'ဖွင့်ထားသည်' : 'Enabled')
              : (language === 'my' ? 'ပိတ်ထားသည်' : 'Disabled')
            }
          </p>
        </div>
      </div>
      <button
        onClick={isSubscribed ? unsubscribe : requestPermission}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isSubscribed
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
            : 'bg-teal-500 text-white hover:bg-teal-600'
        }`}
      >
        {loading 
          ? '...' 
          : isSubscribed 
            ? (language === 'my' ? 'ပိတ်ပါ' : 'Disable')
            : (language === 'my' ? 'ဖွင့်ပါ' : 'Enable')
        }
      </button>
    </div>
  );
}
