'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Download, X, Smartphone, Share, Plus, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const installCountRef = useRef(0);

  useEffect(() => {
    // Check install prompt dismiss count
    installCountRef.current = parseInt(localStorage.getItem('pwa-install-dismissed') || '0');
    
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone = ('standalone' in window.navigator) && 
      (window.navigator as Navigator & { standalone: boolean }).standalone;
    
    if (standalone || iosStandalone) return;

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      installPromptRef.current = e as BeforeInstallPromptEvent;
      
      if (installCountRef.current < 3) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show prompt after delay
    if (isIOSDevice && installCountRef.current < 3) {
      setTimeout(() => setShowPrompt(true), 5000);
    }

    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      installPromptRef.current = null;
      localStorage.setItem('pwa-installed', 'true');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!installPromptRef.current) return;

    try {
      await installPromptRef.current.prompt();
      const { outcome } = await installPromptRef.current.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
        localStorage.setItem('pwa-installed', 'true');
      } else {
        installCountRef.current += 1;
        localStorage.setItem('pwa-install-dismissed', installCountRef.current.toString());
      }
      
      installPromptRef.current = null;
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    installCountRef.current += 1;
    localStorage.setItem('pwa-install-dismissed', installCountRef.current.toString());
  }, []);

  if (!showPrompt) return null;

  return (
    <>
      <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Install ReferTRM</h3>
                  <p className="text-sm text-white/80">Add to home screen</p>
                </div>
              </div>
              <button onClick={handleDismiss} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Install ReferTRM for a better experience:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 text-teal-500" />
                Offline access to jobs
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 text-teal-500" />
                Push notifications
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 text-teal-500" />
                Faster loading
              </li>
            </ul>
            
            <button
              onClick={handleInstallClick}
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Install Now
            </button>
            
            <button onClick={handleDismiss} className="w-full py-2 text-sm text-slate-500 mt-2">
              Not now
            </button>
          </div>
        </div>
      </div>

      {showIOSInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Install on iOS
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <Share className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Step 1</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Tap the Share button</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Step 2</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Tap &quot;Add to Home Screen&quot;</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setShowIOSInstructions(false); handleDismiss(); }}
              className="w-full mt-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
