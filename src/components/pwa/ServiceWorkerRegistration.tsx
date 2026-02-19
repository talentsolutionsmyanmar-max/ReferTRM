'use client';

import { useEffect } from 'react';

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });
          
          console.log('SW registered:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  window.dispatchEvent(new CustomEvent('sw-update-available'));
                }
              });
            }
          });
        } catch (error) {
          console.error('SW registration failed:', error);
        }
      });
    }
  }, []);
}

export default function ServiceWorkerRegistration() {
  useServiceWorker();
  return null;
}
