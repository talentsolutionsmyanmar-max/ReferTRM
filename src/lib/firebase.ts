// Firebase Configuration for ReferTRM
// Initialized with user's Firebase project

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail,
  Auth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Firestore
} from 'firebase/firestore';

// Firebase configuration from environment variables
const getFirebaseConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
});

// Check if Firebase config is available at runtime
function hasValidFirebaseConfig(): boolean {
  const config = getFirebaseConfig();
  const isValid = Boolean(config.apiKey && config.projectId);
  
  // Log configuration status
  if (!isValid) {
    console.log('Firebase config not valid. Demo mode will be used.');
  } else {
    console.log('Firebase enabled for project:', config.projectId);
  }
  
  // Firebase is now ENABLED for production use!
  return isValid;
}

// Lazy-loaded Firebase instances
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Initialize Firebase only on client side and when config is available
function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null; // Server-side, don't initialize
  if (!hasValidFirebaseConfig()) return null; // No config, don't initialize
  
  if (!app) {
    try {
      const config = getFirebaseConfig();
      app = getApps().length === 0 ? initializeApp(config) : getApp();
      console.log('Firebase initialized successfully for project:', config.projectId);
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      return null;
    }
  }
  return app;
}

function getFirebaseAuth(): Auth | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  
  if (!auth) {
    auth = getAuth(firebaseApp);
  }
  return auth;
}

function getFirebaseDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  
  if (!db) {
    db = getFirestore(firebaseApp);
  }
  return db;
}

// User data interface
export interface UserProfile {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatarUrl: string | null;
  avatarType: string;
  avatar: string;
  points: number;
  totalPointsEarned: number;
  streak: number;
  maxStreak: number;
  referralCode: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarned: number;
  level: string;
  completedModules: string[];
  purchasedItems: string[];
  lastLoginAt: string | null;
  lastBonusClaim: string | null;
  createdAt: string;
  updatedAt: string;
}

// Generate referral code
function generateReferralCode(): string {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Create user profile in Firestore
export async function createUserProfile(uid: string, data: Partial<UserProfile> = {}): Promise<void> {
  const database = getFirebaseDb();
  if (!database) return;
  
  const userRef = doc(database, 'users', uid);
  const now = new Date().toISOString();
  
  await setDoc(userRef, {
    id: uid,
    email: data.email || null,
    phone: data.phone || null,
    name: data.name || null,
    avatarUrl: data.avatarUrl || null,
    avatarType: data.avatarType || 'neutral',
    avatar: data.avatar || '🧑',
    points: data.points || 50,
    totalPointsEarned: data.totalPointsEarned || 50,
    streak: data.streak || 1,
    maxStreak: data.maxStreak || 1,
    referralCode: data.referralCode || generateReferralCode(),
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarned: 0,
    level: data.level || 'Amateur',
    completedModules: data.completedModules || [],
    purchasedItems: data.purchasedItems || [],
    lastLoginAt: now,
    lastBonusClaim: null,
    createdAt: now,
    updatedAt: now,
  }, { merge: true });
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const database = getFirebaseDb();
  if (!database) return null;
  
  try {
    const userRef = doc(database, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// Update user profile in Firestore
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const database = getFirebaseDb();
  if (!database) return;
  
  const userRef = doc(database, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

// Register with email and password
export async function registerWithEmail(email: string, password: string, name: string): Promise<FirebaseUser | null> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured. Please use demo mode or contact support.');
  }
  
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    
    // Update display name
    await updateProfile(result.user, { displayName: name });
    
    // Create user profile in Firestore
    await createUserProfile(result.user.uid, {
      email,
      name,
    });
    
    return result.user;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Sign in with email and password
export async function loginWithEmail(email: string, password: string): Promise<FirebaseUser | null> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) {
    throw new Error('Firebase is not configured. Please use demo mode or contact support.');
  }
  
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
    
    // Update last login
    await updateUserProfile(result.user.uid, {
      lastLoginAt: new Date().toISOString(),
    });
    
    return result.user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
}

// Anonymous sign-in
export async function signInAnonymous(): Promise<FirebaseUser | null> {
  const firebaseAuth = getFirebaseAuth();
  
  // If Firebase is not configured, return null (demo mode will be used)
  if (!firebaseAuth) {
    console.log('Firebase not available, using demo mode');
    return null;
  }
  
  try {
    const result = await signInAnonymously(firebaseAuth);
    
    // Create user profile
    await createUserProfile(result.user.uid, {
      name: 'Guest User',
    });
    
    return result.user;
  } catch (error) {
    console.error('Anonymous sign-in error:', error);
    throw error;
  }
}

// Sign out
export async function signOutUser(): Promise<void> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) return;
  
  await signOut(firebaseAuth);
}

// Password reset
export async function resetPassword(email: string): Promise<void> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) return;
  
  await sendPasswordResetEmail(firebaseAuth, email);
}

// Auth state listener
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) {
    callback(null);
    return () => {};
  }
  
  return onAuthStateChanged(firebaseAuth, callback);
}

// Get leaderboard from Firestore
export async function getLeaderboard(limitCount: number = 10): Promise<UserProfile[]> {
  const database = getFirebaseDb();
  if (!database) return [];
  
  const usersRef = collection(database, 'users');
  const q = query(usersRef, orderBy('totalPointsEarned', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as UserProfile);
}

// Google Sign-In
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  const firebaseAuth = getFirebaseAuth();
  if (!firebaseAuth) return null;
  
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(firebaseAuth, provider);
  
  // Check if user profile exists, if not create one
  const existingProfile = await getUserProfile(result.user.uid);
  if (!existingProfile) {
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      name: result.user.displayName,
      avatarUrl: result.user.photoURL,
    });
  }
  
  return result.user;
}

// Update profile photo URL
export async function updateProfilePhotoUrl(uid: string, photoUrl: string): Promise<void> {
  await updateUserProfile(uid, {
    avatarUrl: photoUrl,
    avatar: '', // Clear emoji when using photo
  });
}

// Export functions for getting Firebase instances
export { getFirebaseApp as getApp, getFirebaseAuth as getAuth, getFirebaseDb as getDb };

// Debug function to check Firebase status
export function getFirebaseStatus(): { configured: boolean; projectId: string | null } {
  const config = getFirebaseConfig();
  return {
    configured: hasValidFirebaseConfig(),
    projectId: config.projectId || null,
  };
}

// ===========================================
// REFERRAL TRACKING SYSTEM
// ===========================================

export interface Referral {
  id: string;
  referrerId: string;          // User who made the referral
  referrerCode: string;         // Referral code used
  candidateName: string;        // Person being referred
  candidateEmail: string;       // Candidate's email
  candidatePhone?: string;      // Candidate's phone
  jobId: string;                // Job being referred for
  jobTitle: string;             // Job title
  companyId: string;            // Company ID
  companyName: string;          // Company name
  status: 'pending' | 'applied' | 'interview' | 'hired' | 'rejected' | 'withdrawn';
  rewardAmount: number;         // Reward amount in MMK
  rewardPaid: boolean;          // Whether reward has been paid
  notes?: string;               // Any notes
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: string;
    date: string;
    note?: string;
  }[];
}

// Create a new referral
export async function createReferral(data: {
  referrerId: string;
  referrerCode: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  rewardAmount: number;
}): Promise<string> {
  const database = getFirebaseDb();
  if (!database) throw new Error('Firebase not configured');
  
  const referralRef = doc(collection(database, 'referrals'));
  const now = new Date().toISOString();
  
  const referral: Referral = {
    id: referralRef.id,
    ...data,
    status: 'pending',
    rewardPaid: false,
    createdAt: now,
    updatedAt: now,
    statusHistory: [{ status: 'pending', date: now }],
  };
  
  await setDoc(referralRef, referral);
  return referralRef.id;
}

// Update referral status
export async function updateReferralStatus(
  referralId: string, 
  status: Referral['status'],
  note?: string
): Promise<void> {
  const database = getFirebaseDb();
  if (!database) return;
  
  const referralRef = doc(database, 'referrals', referralId);
  const now = new Date().toISOString();
  
  // Get current referral
  const snap = await getDoc(referralRef);
  if (!snap.exists()) throw new Error('Referral not found');
  
  const referral = snap.data() as Referral;
  
  await updateDoc(referralRef, {
    status,
    updatedAt: now,
    statusHistory: [...referral.statusHistory, { status, date: now, note }],
    ...(status === 'hired' ? { rewardPaid: false } : {}),
  });
}

// Get referrals by user
export async function getUserReferrals(userId: string): Promise<Referral[]> {
  const database = getFirebaseDb();
  if (!database) return [];
  
  const referralsRef = collection(database, 'referrals');
  const q = query(referralsRef, where('referrerId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as Referral);
}

// Get referrals by company
export async function getCompanyReferrals(companyId: string): Promise<Referral[]> {
  const database = getFirebaseDb();
  if (!database) return [];
  
  const referralsRef = collection(database, 'referrals');
  const q = query(referralsRef, where('companyId', '==', companyId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as Referral);
}

// ===========================================
// JOB LISTINGS
// ===========================================

export interface JobListing {
  id: string;
  title: string;
  titleMm?: string;
  company: string;
  companyId: string;
  location: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  reward: number;           // Referral reward in thousands (MMK)
  rewardFull?: number;      // Full reward amount
  skills: string[];
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  urgent: boolean;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  status: 'active' | 'closed' | 'draft';
  postedBy: string;         // Company user ID
  postedAt: string;
  expiresAt?: string;
}

// Create job listing
export async function createJobListing(data: Omit<JobListing, 'id' | 'postedAt'>): Promise<string> {
  const database = getFirebaseDb();
  if (!database) throw new Error('Firebase not configured');
  
  const jobRef = doc(collection(database, 'jobs'));
  
  const job: JobListing = {
    ...data,
    id: jobRef.id,
    postedAt: new Date().toISOString(),
  };
  
  await setDoc(jobRef, job);
  return jobRef.id;
}

// Get active jobs
export async function getActiveJobs(): Promise<JobListing[]> {
  const database = getFirebaseDb();
  if (!database) return [];
  
  const jobsRef = collection(database, 'jobs');
  const q = query(jobsRef, where('status', '==', 'active'), orderBy('postedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as JobListing);
}

// Get jobs by company
export async function getCompanyJobs(companyId: string): Promise<JobListing[]> {
  const database = getFirebaseDb();
  if (!database) return [];
  
  const jobsRef = collection(database, 'jobs');
  const q = query(jobsRef, where('companyId', '==', companyId), orderBy('postedAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => doc.data() as JobListing);
}
// Build: 1771196417
