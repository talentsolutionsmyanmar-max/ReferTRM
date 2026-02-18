/// <reference lib="webworker" />

const CACHE_NAME = 'refertrm-v3';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/logo.png',
  '/logo.svg',
  '/manifest.json',
  '/fonts/Padauk-Regular.ttf',
  '/fonts/Padauk-Bold.ttf',
];

// Dynamic cache patterns
const CACHE_PATTERNS = [
  /\/api\/jobs/,
  /\/api\/stats/,
  /\/api\/notifications/,
  /\/api\/applications/,
  /\/_next\/static/,
  /\/fonts\//,
  /\.woff2?$/,
  /\.png$/,
  /\.jpg$/,
  /\.svg$/,
];

// IndexedDB helper functions
const DB_NAME = 'refertrm-offline';
const DB_VERSION = 1;

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('jobs')) {
        db.createObjectStore('jobs', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('userData')) {
        db.createObjectStore('userData', { keyPath: 'key' });
      }
    };
  });
}

async function saveJobsToIndexedDB(jobs) {
  const db = await openDB();
  const transaction = db.transaction('jobs', 'readwrite');
  const store = transaction.objectStore('jobs');
  
  const now = Date.now();
  const expiresAt = now + (7 * 24 * 60 * 60 * 1000); // 7 days
  
  for (const job of jobs) {
    store.put({ ...job, savedAt: now, expiresAt });
  }
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getPendingSyncItems() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('syncQueue', 'readonly');
    const store = transaction.objectStore('syncQueue');
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function removeSyncItem(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('syncQueue', 'readwrite');
    const store = transaction.objectStore('syncQueue');
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function updateLastSync() {
  const db = await openDB();
  const transaction = db.transaction('userData', 'readwrite');
  const store = transaction.objectStore('userData');
  store.put({ key: 'lastSync', value: Date.now() });
}

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching core assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Check if URL matches cache patterns
  const shouldCache = CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname));

  // Special handling for jobs API
  if (url.pathname === '/api/jobs') {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const clone = response.clone();
            const data = await clone.json();
            
            // Save jobs to IndexedDB for offline access
            if (data.jobs && Array.isArray(data.jobs)) {
              await saveJobsToIndexedDB(data.jobs);
              await updateLastSync();
            }
            
            // Cache the response
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(async () => {
          // Try cache first
          const cached = await caches.match(request);
          if (cached) return cached;
          
          // Return offline response
          return new Response(JSON.stringify({ 
            error: 'offline',
            message: 'You are offline. Showing cached jobs.'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        // Fetch fresh version in background
        if (shouldCache) {
          fetchAndCache(request);
        }
        return cachedResponse;
      }

      // Fetch from network
      return fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok && shouldCache) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

// Fetch and cache in background
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response);
    }
  } catch (error) {
    // Network failed, that's okay
  }
}

// Push notification event
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      id: data.id,
    },
    actions: data.actions || [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Close' },
    ],
    tag: data.tag || 'refertrm-notification',
    renotify: true,
    requireInteraction: data.priority === 'urgent',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'ReferTRM', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const url = event.notification.data?.url || '/';

  if (action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Background sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-applications') {
    event.waitUntil(syncApplications());
  }
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
  if (event.tag === 'sync-pending') {
    event.waitUntil(syncPendingItems());
  }
});

// Sync applications data
async function syncApplications() {
  try {
    const pending = await getPendingSyncItems();
    const applications = pending.filter(item => item.type === 'application');
    
    for (const app of applications) {
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(app.data),
        });
        
        if (response.ok) {
          await removeSyncItem(app.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync application:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync applications:', error);
  }
}

// Sync messages data
async function syncMessages() {
  try {
    const pending = await getPendingSyncItems();
    const messages = pending.filter(item => item.type === 'message');
    
    for (const msg of messages) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(msg.data),
        });
        
        if (response.ok) {
          await removeSyncItem(msg.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync message:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync messages:', error);
  }
}

// Sync all pending items
async function syncPendingItems() {
  await syncApplications();
  await syncMessages();
}

// Message event - communicate with main thread
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
    );
  }
  
  if (event.data.type === 'CACHE_JOBS') {
    event.waitUntil(
      saveJobsToIndexedDB(event.data.jobs)
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-jobs') {
    event.waitUntil(updateJobsCache());
  }
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkNotifications());
  }
});

async function updateJobsCache() {
  try {
    const response = await fetch('/api/jobs?limit=50');
    if (response.ok) {
      const data = await response.json();
      if (data.jobs) {
        await saveJobsToIndexedDB(data.jobs);
        await updateLastSync();
      }
      
      const cache = await caches.open(CACHE_NAME);
      cache.put('/api/jobs?limit=50', new Response(JSON.stringify(data)));
    }
  } catch (error) {
    console.error('[SW] Failed to update jobs cache:', error);
  }
}

async function checkNotifications() {
  try {
    const response = await fetch('/api/notifications?unreadOnly=true');
    const data = await response.json();
    
    if (data.unreadCount > 0) {
      self.registration.showNotification('ReferTRM', {
        body: `You have ${data.unreadCount} unread notifications`,
        icon: '/logo.png',
        badge: '/logo.png',
      });
    }
  } catch (error) {
    console.error('[SW] Failed to check notifications:', error);
  }
}

console.log('[SW] Service Worker loaded - v3 with IndexedDB support');
