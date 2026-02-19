// Auth Configuration for ReferTRM
// Switch between Demo Mode (localStorage) and Supabase

export const AUTH_MODE = 'supabase'; // 'demo' | 'supabase' | 'firebase'

// Supabase Configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check which auth mode to use
export function getAuthMode(): 'demo' | 'supabase' {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    return 'supabase';
  }
  return 'demo';
}

export function isSupabaseEnabled(): boolean {
  return getAuthMode() === 'supabase';
}
