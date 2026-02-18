'use client';

import { useState, useEffect, useCallback } from 'react';

interface PWAStatus {
  isInstalled: boolean;
  isStandalone: boolean;
  canInstall: boolean;
  hasOfflineSupport: boolean;
  needsUpdate: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Helper functions - called once during initial render
function getInitialStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as Navigator & { standalone: boolean }).standalone);
}

function getInitialOfflineSupport(): boolean {
  if (typeof window === 'undefined') return false;
  return 'serviceWorker' in navigator;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  
  // Initialize with lazy initializers
  const [status, setStatus] = useState<PWAStatus>(() => ({
    isInstalled: getInitialStandalone(),
    isStandalone: getInitialStandalone(),
    canInstall: false,
    hasOfflineSupport: getInitialOfflineSupport(),
    needsUpdate: false,
  }));

  // Listen for beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setStatus(prev => ({ ...prev, canInstall: true }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Listen for app installed
  useEffect(() => {
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setStatus(prev => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
      }));
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Check for service worker updates
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let mounted = true;
    
    navigator.serviceWorker.ready.then((registration) => {
      if (!mounted) return;
      
      const handleUpdateFound = () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (mounted) {
                setStatus(prev => ({ ...prev, needsUpdate: true }));
              }
            }
          });
        }
      };

      registration.addEventListener('updatefound', handleUpdateFound);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setStatus(prev => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
      }));
      return true;
    }

    return false;
  }, [deferredPrompt]);

  const updateServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  return {
    ...status,
    install,
    updateServiceWorker,
  };
}
