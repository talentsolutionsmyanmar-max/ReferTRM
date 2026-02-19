'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('✅ SW registered:', reg.scope))
        .catch((err) => console.log('❌ SW failed:', err));
    }

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Check if iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after delay
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('✅ PWA installed');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Check if iOS (client-side only)
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white">Install ReferTRM</h3>
                  <button onClick={handleDismiss} className="p-1 rounded-lg hover:bg-white/10">
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
                
                {isIOS ? (
                  <div className="text-sm text-slate-400">
                    <p className="mb-2">Install for best experience:</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Tap</span>
                      <Share2 className="h-4 w-4 text-teal-400" />
                      <span>→ "Add to Home Screen"</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    Add to home screen for quick access.
                  </p>
                )}
                
                {!isIOS && deferredPrompt && (
                  <Button
                    onClick={handleInstall}
                    className="w-full mt-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Install App
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Check if standalone (client-side only)
  const isStandalone = typeof window !== 'undefined' && 
    window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone || !deferredPrompt) return null;

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      size="sm"
      className="fixed bottom-20 right-4 z-40 bg-teal-500/10 border-teal-500/30 text-teal-400 hover:bg-teal-500/20 md:hidden"
    >
      <Download className="h-4 w-4 mr-2" />
      Install
    </Button>
  );
}
