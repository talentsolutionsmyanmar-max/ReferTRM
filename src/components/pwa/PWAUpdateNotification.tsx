'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, X, Download } from 'lucide-react';

export default function PWAUpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  const handleUpdate = useCallback(() => {
    if (registrationRef.current?.waiting) {
      registrationRef.current.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowUpdate(false);
  }, []);

  const handleDismiss = useCallback(() => {
    setShowUpdate(false);
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        registrationRef.current = reg;
        
        // Check for waiting service worker
        if (reg.waiting) {
          setShowUpdate(true);
        }
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-teal-600 text-white rounded-2xl shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Update Available</h3>
            <p className="text-sm text-white/80 mb-3">
              A new version of ReferTRM is ready.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 py-2 bg-white text-teal-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Update Now
              </button>
              <button onClick={handleDismiss} className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                Later
              </button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
