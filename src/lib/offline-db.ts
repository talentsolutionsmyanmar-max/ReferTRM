'use client';

/**
 * IndexedDB Helper for Offline Job Storage
 * Enables users to browse saved jobs offline
 */

const DB_NAME = 'refertrm-offline';
const DB_VERSION = 1;

// Store names
export const STORES = {
  JOBS: 'jobs',
  APPLICATIONS: 'applications',
  MESSAGES: 'messages',
  USER_DATA: 'userData',
  SYNC_QUEUE: 'syncQueue',
} as const;

// Open database connection
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Jobs store - for offline job browsing
      if (!db.objectStoreNames.contains(STORES.JOBS)) {
        const jobStore = db.createObjectStore(STORES.JOBS, { keyPath: 'id' });
        jobStore.createIndex('category', 'category', { unique: false });
        jobStore.createIndex('company', 'company', { unique: false });
        jobStore.createIndex('savedAt', 'savedAt', { unique: false });
      }
      
      // Applications store - for offline application tracking
      if (!db.objectStoreNames.contains(STORES.APPLICATIONS)) {
        const appStore = db.createObjectStore(STORES.APPLICATIONS, { keyPath: 'id' });
        appStore.createIndex('status', 'status', { unique: false });
        appStore.createIndex('appliedAt', 'appliedAt', { unique: false });
      }
      
      // Messages store - for offline messaging
      if (!db.objectStoreNames.contains(STORES.MESSAGES)) {
        const msgStore = db.createObjectStore(STORES.MESSAGES, { keyPath: 'id' });
        msgStore.createIndex('conversationId', 'conversationId', { unique: false });
        msgStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
      
      // User data store
      if (!db.objectStoreNames.contains(STORES.USER_DATA)) {
        db.createObjectStore(STORES.USER_DATA, { keyPath: 'key' });
      }
      
      // Sync queue - for offline actions to sync later
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        syncStore.createIndex('type', 'type', { unique: false });
        syncStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Generic get all items from store
export async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Generic get item by key
export async function getByKey<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Generic add/update item
export async function putItem<T extends { id?: IDBValidKey }>(storeName: string, item: T): Promise<IDBValidKey> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Generic delete item
export async function deleteItem(storeName: string, key: IDBValidKey): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Clear entire store
export async function clearStore(storeName: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Get items by index
export async function getByIndex<T>(
  storeName: string, 
  indexName: string, 
  value: IDBValidKey
): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Job-specific helpers
export interface CachedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  category: string;
  description: string;
  requirements?: string[];
  savedAt: number;
  expiresAt: number;
}

// Save jobs for offline access
export async function cacheJobs(jobs: Omit<CachedJob, 'savedAt' | 'expiresAt'>[]): Promise<void> {
  const now = Date.now();
  const expiresAt = now + (7 * 24 * 60 * 60 * 1000); // 7 days
  
  const db = await openDB();
  const transaction = db.transaction(STORES.JOBS, 'readwrite');
  const store = transaction.objectStore(STORES.JOBS);
  
  for (const job of jobs) {
    store.put({ ...job, savedAt: now, expiresAt });
  }
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Get cached jobs
export async function getCachedJobs(): Promise<CachedJob[]> {
  const jobs = await getAll<CachedJob>(STORES.JOBS);
  const now = Date.now();
  
  // Filter out expired jobs
  return jobs.filter(job => job.expiresAt > now);
}

// Sync queue helpers for offline actions
export interface SyncQueueItem {
  id?: number;
  type: 'application' | 'message' | 'referral' | 'profile_update';
  data: Record<string, unknown>;
  timestamp: number;
  retries: number;
}

export async function addToSyncQueue(
  type: SyncQueueItem['type'], 
  data: Record<string, unknown>
): Promise<number> {
  const item: SyncQueueItem = {
    type,
    data,
    timestamp: Date.now(),
    retries: 0,
  };
  
  return putItem(STORES.SYNC_QUEUE, item) as Promise<number>;
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  return getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
}

export async function removeSyncQueueItem(id: number): Promise<void> {
  return deleteItem(STORES.SYNC_QUEUE, id);
}

export async function incrementSyncRetries(id: number): Promise<void> {
  const item = await getByKey<SyncQueueItem>(STORES.SYNC_QUEUE, id);
  if (item) {
    item.retries += 1;
    await putItem(STORES.SYNC_QUEUE, item);
  }
}

// Get offline storage stats
export async function getOfflineStats(): Promise<{
  jobsCount: number;
  applicationsCount: number;
  messagesCount: number;
  pendingSync: number;
  lastSync: number | null;
}> {
  const [jobs, applications, messages, syncQueue] = await Promise.all([
    getAll(STORES.JOBS),
    getAll(STORES.APPLICATIONS),
    getAll(STORES.MESSAGES),
    getAll(STORES.SYNC_QUEUE),
  ]);
  
  const userData = await getByKey<{ key: string; value: number }>(
    STORES.USER_DATA, 
    'lastSync'
  );
  
  return {
    jobsCount: jobs.length,
    applicationsCount: applications.length,
    messagesCount: messages.length,
    pendingSync: syncQueue.length,
    lastSync: userData?.value || null,
  };
}

// Update last sync timestamp
export async function updateLastSync(): Promise<void> {
  await putItem(STORES.USER_DATA, { key: 'lastSync', value: Date.now() });
}

// Clean up expired data
export async function cleanupExpiredData(): Promise<void> {
  const db = await openDB();
  const now = Date.now();
  
  // Clean expired jobs
  const jobsTransaction = db.transaction(STORES.JOBS, 'readwrite');
  const jobsStore = jobsTransaction.objectStore(STORES.JOBS);
  const jobsRequest = jobsStore.openCursor();
  
  jobsRequest.onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
    if (cursor) {
      if (cursor.value.expiresAt < now) {
        cursor.delete();
      }
      cursor.continue();
    }
  };
}

console.log('[OfflineDB] IndexedDB helper loaded');
