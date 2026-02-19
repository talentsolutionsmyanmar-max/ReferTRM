// Supabase Configuration for ReferTRM
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log configuration status (only on client side)
if (typeof window !== 'undefined') {
  console.log('🔧 Supabase URL:', supabaseUrl ? supabaseUrl : 'NOT SET');
  console.log('🔧 Supabase Key:', supabaseAnonKey ? 'SET (length: ' + supabaseAnonKey.length + ')' : 'NOT SET');
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const configured = Boolean(supabaseUrl && supabaseAnonKey);
  if (typeof window !== 'undefined') {
    console.log('🔧 Supabase configured:', configured);
  }
  return configured;
}

// Create Supabase client with auto-refresh
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

// User profile interface
export interface UserProfile {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatar_url: string | null;
  avatar_type: string;
  avatar: string;
  points: number;
  total_points_earned: number;
  streak: number;
  max_streak: number;
  referral_code: string;
  total_referrals: number;
  successful_referrals: number;
  total_earned: number;
  level: string;
  completed_modules: string[];
  purchased_items: string[];
  last_login_at: string | null;
  last_bonus_claim: string | null;
  created_at: string;
  updated_at: string;
}

// Generate referral code
function generateReferralCode(): string {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Sign up with email and password
export async function signUpWithEmail(email: string, password: string, name: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  console.log('🔐 Signing up user:', email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    console.error('❌ Auth signup error:', error);
    throw error;
  }

  console.log('✅ Auth signup successful, user ID:', data.user?.id);

  // Create user profile
  if (data.user) {
    try {
      await createUserProfile(data.user.id, { email, name });
      console.log('✅ User profile created successfully');
    } catch (profileError) {
      console.error('❌ Error creating user profile:', profileError);
      // Don't throw - user is already created in auth
    }
  }

  return data.user;
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  console.log('🔐 Signing in user:', email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('❌ Auth signin error:', error);
    throw error;
  }

  console.log('✅ Auth signin successful, user ID:', data.user?.id);

  // Update last login
  if (data.user) {
    try {
      await updateUserProfile(data.user.id, { last_login_at: new Date().toISOString() });
    } catch (e) {
      console.error('Error updating last login:', e);
    }
  }

  return data.user;
}

// Sign in as guest (anonymous)
export async function signInAsGuest() {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) throw error;

  // Create guest profile
  if (data.user) {
    await createUserProfile(data.user.id, { name: 'Guest User' });
  }

  return data.user;
}

// Sign out
export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

// Get current user
export async function getCurrentUser() {
  if (!supabase) return null;
  
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// Create user profile
export async function createUserProfile(uid: string, data: Partial<UserProfile> = {}): Promise<void> {
  if (!supabase) {
    console.error('❌ createUserProfile: Supabase not configured');
    return;
  }

  const now = new Date().toISOString();
  
  const profile = {
    id: uid,
    email: data.email || null,
    phone: data.phone || null,
    name: data.name || null,
    avatar_url: data.avatar_url || null,
    avatar_type: data.avatar_type || 'neutral',
    avatar: data.avatar || '🧑',
    points: data.points || 50,
    total_points_earned: data.total_points_earned || 50,
    streak: data.streak || 1,
    max_streak: data.max_streak || 1,
    referral_code: data.referral_code || generateReferralCode(),
    total_referrals: 0,
    successful_referrals: 0,
    total_earned: 0,
    level: data.level || 'Amateur',
    completed_modules: data.completed_modules || [],
    purchased_items: data.purchased_items || [],
    last_login_at: now,
    last_bonus_claim: null,
    created_at: now,
    updated_at: now,
  };

  console.log('📝 Creating user profile for:', uid);
  console.log('📋 Profile data:', JSON.stringify(profile, null, 2));

  const { error } = await supabase
    .from('User')
    .upsert(profile, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error creating user profile:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    throw error;
  }

  console.log('✅ User profile saved to database successfully');
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) {
      console.error('❌ Error getting user profile:', error.message || error);
      console.error('❌ Error code:', error.code);
      
      // If profile doesn't exist, create it
      if (error.code === 'PGRST116') {
        console.log('📝 Profile not found, creating new profile...');
        await createUserProfile(uid, { name: 'User' });
        // Try again
        const { data: newData } = await supabase
          .from('User')
          .select('*')
          .eq('id', uid)
          .single();
        return newData as UserProfile;
      }
      return null;
    }

    console.log('✅ Got user profile:', data?.name);
    return data as UserProfile;
  } catch (e) {
    console.error('❌ Exception getting profile:', e);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from('User')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', uid);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Reset password
export async function resetPassword(email: string) {
  if (!supabase) return;
  
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

// Auth state listener
export function onAuthStateChange(callback: (user: any) => void) {
  if (!supabase) {
    callback(null);
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔐 Auth state changed:', event, session?.user?.id);
    callback(session?.user || null);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

// Get leaderboard
export async function getLeaderboard(limitCount: number = 10): Promise<UserProfile[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('User')
    .select('*')
    .order('total_points_earned', { ascending: false })
    .limit(limitCount);

  if (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }

  return data as UserProfile[];
}

// Referral interface
export interface Referral {
  id: string;
  referrer_id: string;
  referrer_code: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  job_id: string;
  job_title: string;
  company_id: string;
  company_name: string;
  status: 'pending' | 'applied' | 'interview' | 'hired' | 'rejected' | 'withdrawn';
  reward_amount: number;
  reward_paid: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Create referral
export async function createReferral(data: {
  referrer_id: string;
  referrer_code: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  job_id: string;
  job_title: string;
  company_id: string;
  company_name: string;
  reward_amount: number;
}): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');

  const { data: result, error } = await supabase
    .from('Referral')
    .insert({
      ...data,
      status: 'pending',
      reward_paid: false,
    })
    .select('id')
    .single();

  if (error) throw error;
  return result.id;
}

// Get user referrals
export async function getUserReferrals(userId: string): Promise<Referral[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('Referral')
    .select('*')
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting referrals:', error);
    return [];
  }

  return data as Referral[];
}

// Job Listing interface
export interface JobListing {
  id: string;
  title: string;
  title_mm?: string;
  company: string;
  company_id: string;
  location: string;
  salary: string;
  salary_min?: number;
  salary_max?: number;
  reward: number;
  reward_full?: number;
  skills: string[];
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  urgent: boolean;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  status: 'active' | 'closed' | 'draft';
  posted_by: string;
  posted_at: string;
  expires_at?: string;
}

// Get active jobs
export async function getActiveJobs(): Promise<JobListing[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('Job')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false });

  if (error) {
    console.error('Error getting jobs:', error);
    return [];
  }

  return data as JobListing[];
}
