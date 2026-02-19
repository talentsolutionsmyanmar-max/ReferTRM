'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { 
  supabase,
  isSupabaseConfigured,
  signUpWithEmail,
  signInWithEmail,
  signInAsGuest,
  signOut as supabaseSignOut,
  getUserProfile,
  updateUserProfile as updateSupabaseProfile,
  createUserProfile,
  onAuthStateChange,
  UserProfile as SupabaseProfile
} from '@/lib/supabase';

// Check if we're on client side
const isClient = typeof window !== 'undefined';

interface PointTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: Date;
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  name: string | null;
  isGuest: boolean;
  points: number;
  totalPointsEarned: number;
  streak: number;
  maxStreak: number;
  completedModules: string[];
  level: string;
  avatar: string;
  avatarType: 'male' | 'female' | 'neutral';
  avatarUrl: string | null;
  referralCode: string;
  totalEarnings: number;
  successfulReferrals: number;
  totalReferrals: number;
  lastLoginAt: string | null;
  lastBonusClaim: string | null;
  purchasedItems: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSupabaseMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  addPoints: (points: number, reason: string) => void;
  deductPoints: (points: number, reason: string) => boolean;
  completeModule: (moduleId: string, points: number) => void;
  incrementStreak: () => void;
  claimDailyBonus: () => { success: boolean; points: number; message: string };
  purchaseItem: (itemId: string, cost: number) => boolean;
  canClaimDailyBonus: () => boolean;
  getPointTransactions: () => PointTransaction[];
  updateAvatar: (avatarType: 'male' | 'female' | 'neutral', avatar: string) => void;
  updateProfilePhoto: (photoUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LEVEL_THRESHOLDS = [
  { level: 'Amateur', minPoints: 0, icon: '🌱' },
  { level: 'Professional', minPoints: 300, icon: '💼' },
  { level: 'Expert', minPoints: 600, icon: '⭐' },
  { level: 'Master', minPoints: 1000, icon: '👑' },
];

const STREAK_MILESTONES = [
  { days: 3, bonus: 5 },
  { days: 7, bonus: 10 },
  { days: 14, bonus: 20 },
  { days: 30, bonus: 35 },
  { days: 60, bonus: 50 },
  { days: 100, bonus: 75 },
];

function calculateLevel(points: number): string {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i].minPoints) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 'Amateur';
}

function generateId(): string {
  return 'txn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

function generateReferralCode(): string {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Convert Supabase profile to local User type
function profileToUser(profile: SupabaseProfile): User {
  return {
    uid: profile.id,
    email: profile.email,
    displayName: profile.name,
    name: profile.name,
    isGuest: profile.id.startsWith('guest_'),
    points: profile.points,
    totalPointsEarned: profile.total_points_earned,
    streak: profile.streak,
    maxStreak: profile.max_streak,
    completedModules: profile.completed_modules || [],
    level: profile.level,
    avatar: profile.avatar || '🧑',
    avatarType: (profile.avatar_type as 'male' | 'female' | 'neutral') || 'neutral',
    avatarUrl: profile.avatar_url,
    referralCode: profile.referral_code,
    totalEarnings: profile.total_earned,
    successfulReferrals: profile.successful_referrals,
    totalReferrals: profile.total_referrals,
    lastLoginAt: profile.last_login_at,
    lastBonusClaim: profile.last_bonus_claim,
    purchasedItems: profile.purchased_items || [],
  };
}

// Demo mode functions (localStorage fallback)
function getSavedTransactions(): PointTransaction[] {
  if (!isClient) return [];
  try {
    const saved = localStorage.getItem('refertrm_transactions');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading transactions:', e);
  }
  return [];
}

function getSavedUser(): User | null {
  if (!isClient) return null;
  try {
    const saved = localStorage.getItem('refertrm_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading user:', e);
  }
  return null;
}

function saveUserToStorage(user: User | null) {
  if (!isClient) return;
  if (user) {
    localStorage.setItem('refertrm_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('refertrm_user');
  }
}

// Get initials from name (Design System: gender-neutral avatars with initials only)
function getInitials(name: string | null): string {
  if (!name) return 'GU';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function createGuestUser(): User {
  return {
    uid: 'guest_' + Date.now(),
    email: null,
    displayName: 'Guest User',
    name: 'Guest User',
    isGuest: true,
    points: 50,
    totalPointsEarned: 50,
    streak: 1,
    maxStreak: 1,
    completedModules: [],
    level: 'Amateur',
    avatar: '', // No emoji - use initials from name
    avatarType: 'neutral',
    avatarUrl: null,
    referralCode: generateReferralCode(),
    totalEarnings: 0,
    successfulReferrals: 0,
    totalReferrals: 0,
    lastLoginAt: new Date().toISOString(),
    lastBonusClaim: null,
    purchasedItems: [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSupabaseMode, setIsSupabaseMode] = useState(false);

  // Initialize auth
  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;
    
    const initAuth = async () => {
      try {
        const useSupabase = isSupabaseConfigured();
        console.log('🚀 Auth Mode:', useSupabase ? 'Supabase' : 'Demo (localStorage)');
        
        if (!mounted) return;
        setIsSupabaseMode(useSupabase);
        
        if (useSupabase && supabase) {
          // Get initial session
          const { data: { session } } = await supabase.auth.getSession();
          console.log('📋 Initial session:', session?.user?.id || 'No session');
          
          if (!mounted) return;
          
          if (session?.user) {
            try {
              let profile = await getUserProfile(session.user.id);
              
              // If profile doesn't exist, create it
              if (!profile) {
                console.log('📝 Creating missing profile for:', session.user.id);
                await createUserProfile(session.user.id, {
                  email: session.user.email,
                  name: session.user.user_metadata?.name || 'User',
                });
                // Fetch again
                profile = await getUserProfile(session.user.id);
              }
              
              if (profile && mounted) {
                console.log('✅ User profile loaded:', profile.name);
                setUser(profileToUser(profile));
              } else {
                console.log('⚠️ Profile still null after creation attempt');
              }
            } catch (profileError) {
              console.error('❌ Profile fetch error:', profileError);
            }
          }
          
          // Set loading false after initial check
          if (mounted) setLoading(false);
          
          // Listen for auth changes
          const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('🔐 Auth event:', event, session?.user?.id);
            if (!mounted) return;
            
            if (event === 'SIGNED_IN' && session?.user) {
              try {
                let profile = await getUserProfile(session.user.id);
                
                if (!profile) {
                  console.log('📝 Creating profile on SIGNED_IN');
                  await createUserProfile(session.user.id, {
                    email: session.user.email,
                    name: session.user.user_metadata?.name || 'User',
                  });
                  profile = await getUserProfile(session.user.id);
                }
                
                if (profile && mounted) {
                  setUser(profileToUser(profile));
                }
              } catch (e) {
                console.error('Error in SIGNED_IN:', e);
              }
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          });
          
          subscription = data.subscription;
        } else {
          // Demo mode
          const savedUser = getSavedUser();
          if (savedUser && mounted) setUser(savedUser);
          if (mounted) setLoading(false);
        }
      } catch (error) {
        console.error('Auth init error:', error);
        if (mounted) setLoading(false);
      }
    };
    
    initAuth();
    
    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Persist user to Supabase or localStorage
  const persistUser = useCallback(async (updatedUser: User) => {
    setUser(updatedUser);
    
    if (isSupabaseMode && !updatedUser.isGuest) {
      try {
        await updateSupabaseProfile(updatedUser.uid, {
          points: updatedUser.points,
          total_points_earned: updatedUser.totalPointsEarned,
          streak: updatedUser.streak,
          max_streak: updatedUser.maxStreak,
          level: updatedUser.level,
          completed_modules: updatedUser.completedModules,
          purchased_items: updatedUser.purchasedItems,
          last_bonus_claim: updatedUser.lastBonusClaim,
          avatar: updatedUser.avatar,
          avatar_type: updatedUser.avatarType,
          avatar_url: updatedUser.avatarUrl,
          total_earned: updatedUser.totalEarnings,
          successful_referrals: updatedUser.successfulReferrals,
          total_referrals: updatedUser.totalReferrals,
        });
      } catch (error) {
        console.error('Error updating Supabase profile:', error);
      }
    } else {
      saveUserToStorage(updatedUser);
    }
  }, [isSupabaseMode]);

  const addTransaction = useCallback((amount: number, type: string, description: string) => {
    const txn: PointTransaction = {
      id: generateId(),
      amount,
      type,
      description,
      createdAt: new Date(),
    };
    setTransactions(prev => {
      const updated = [txn, ...prev].slice(0, 100);
      if (isClient) {
        localStorage.setItem('refertrm_transactions', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    console.log('🔐 Login attempt:', email);
    
    try {
      if (isSupabaseMode) {
        console.log('🚀 Using Supabase login...');
        const authUser = await signInWithEmail(email, password);
        console.log('✅ Supabase auth successful:', authUser?.id);
        if (authUser) {
          const profile = await getUserProfile(authUser.id);
          console.log('📋 Got user profile:', profile);
          if (profile) {
            setUser(profileToUser(profile));
          }
          addTransaction(10, 'login', 'Welcome back!');
        }
      } else {
        // Demo mode login
        const newUser: User = {
          uid: 'user_' + Date.now(),
          email,
          displayName: email.split('@')[0],
          name: email.split('@')[0],
          isGuest: false,
          points: 50,
          totalPointsEarned: 50,
          streak: 1,
          maxStreak: 1,
          completedModules: [],
          level: 'Amateur',
          avatar: '🧑',
          avatarType: 'neutral',
          avatarUrl: null,
          referralCode: generateReferralCode(),
          totalEarnings: 0,
          successfulReferrals: 0,
          totalReferrals: 0,
          lastLoginAt: new Date().toISOString(),
          lastBonusClaim: null,
          purchasedItems: [],
        };
        setUser(newUser);
        saveUserToStorage(newUser);
        addTransaction(10, 'login', 'Welcome back!');
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.message?.includes('Email not confirmed')) {
        throw new Error('Please confirm your email first. Check your inbox for the confirmation link.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isSupabaseMode, addTransaction]);

  // Guest login
  const loginAsGuest = useCallback(async () => {
    setLoading(true);
    try {
      if (isSupabaseMode) {
        const authUser = await signInAsGuest();
        if (authUser) {
          const profile = await getUserProfile(authUser.id);
          if (profile) {
            setUser(profileToUser(profile));
          }
        }
      } else {
        const guestUser = createGuestUser();
        setUser(guestUser);
        saveUserToStorage(guestUser);
      }
      addTransaction(50, 'guest_login', 'Welcome to ReferTRM!');
    } catch (error) {
      console.error('Guest login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isSupabaseMode, addTransaction]);

  // Signup
  const signup = useCallback(async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      if (isSupabaseMode) {
        const result = await signUpWithEmail(email, password, displayName);
        
        // Check if email confirmation is required
        if (result.needsEmailConfirmation) {
          // Store signup info temporarily for the confirmation page
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('pending_signup_email', email);
            sessionStorage.setItem('pending_signup_name', displayName);
          }
          throw new Error('EMAIL_CONFIRMATION_REQUIRED');
        }
        
        // User is immediately signed in (email confirmation disabled)
        if (result.user && result.session) {
          const profile = await getUserProfile(result.user.id);
          if (profile) {
            setUser(profileToUser(profile));
          }
        }
      } else {
        // Demo mode signup
        const newUser: User = {
          uid: 'user_' + Date.now(),
          email,
          displayName,
          name: displayName,
          isGuest: false,
          points: 50,
          totalPointsEarned: 50,
          streak: 1,
          maxStreak: 1,
          completedModules: [],
          level: 'Amateur',
          avatar: '🧑',
          avatarType: 'neutral',
          avatarUrl: null,
          referralCode: generateReferralCode(),
          totalEarnings: 0,
          successfulReferrals: 0,
          totalReferrals: 0,
          lastLoginAt: new Date().toISOString(),
          lastBonusClaim: null,
          purchasedItems: [],
        };
        setUser(newUser);
        saveUserToStorage(newUser);
      }
      addTransaction(50, 'signup', 'Welcome bonus for creating account!');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message === 'EMAIL_CONFIRMATION_REQUIRED') {
        throw error; // Let the UI handle this special case
      }
      if (error.message?.includes('already registered')) {
        throw new Error('This email is already registered. Please login instead.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isSupabaseMode, addTransaction]);

  // Logout
  const logout = useCallback(async () => {
    if (isSupabaseMode) {
      await supabaseSignOut();
    }
    setUser(null);
    saveUserToStorage(null);
  }, [isSupabaseMode]);

  // Password reset
  const resetPassword = useCallback(async (email: string) => {
    if (isSupabaseMode && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } else {
      console.log('Demo mode: Password reset requested for:', email);
    }
  }, [isSupabaseMode]);

  // Add points
  const addPoints = useCallback((points: number, reason: string) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const newPoints = prevUser.points + points;
      const newTotalEarned = prevUser.totalPointsEarned + points;
      const newLevel = calculateLevel(newPoints);
      const updated = { 
        ...prevUser, 
        points: newPoints, 
        totalPointsEarned: newTotalEarned,
        level: newLevel 
      };
      
      persistUser(updated);
      addTransaction(points, 'earn', reason);
      return updated;
    });
  }, [addTransaction, persistUser]);

  // Deduct points
  const deductPoints = useCallback((points: number, reason: string): boolean => {
    let success = false;
    setUser(prevUser => {
      if (!prevUser || prevUser.points < points) return prevUser;
      
      success = true;
      const newPoints = prevUser.points - points;
      const newLevel = calculateLevel(newPoints);
      const updated = { 
        ...prevUser, 
        points: newPoints,
        level: newLevel
      };
      
      persistUser(updated);
      addTransaction(-points, 'spend', reason);
      return updated;
    });
    return success;
  }, [addTransaction, persistUser]);

  // Complete module
  const completeModule = useCallback((moduleId: string, points: number) => {
    setUser(prevUser => {
      if (!prevUser || prevUser.completedModules.includes(moduleId)) return prevUser;
      
      const newCompletedModules = [...prevUser.completedModules, moduleId];
      const newPoints = prevUser.points + points;
      const newTotalEarned = prevUser.totalPointsEarned + points;
      const newLevel = calculateLevel(newPoints);
      const updated = { 
        ...prevUser, 
        points: newPoints, 
        totalPointsEarned: newTotalEarned,
        level: newLevel, 
        completedModules: newCompletedModules 
      };
      
      persistUser(updated);
      addTransaction(points, 'module_complete', `Completed module: ${moduleId}`);
      return updated;
    });
  }, [addTransaction, persistUser]);

  // Increment streak
  const incrementStreak = useCallback(() => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const newStreak = prevUser.streak + 1;
      const newMaxStreak = Math.max(newStreak, prevUser.maxStreak);
      
      let streakBonus = 5;
      for (const milestone of STREAK_MILESTONES) {
        if (newStreak >= milestone.days) {
          streakBonus = milestone.bonus;
        }
      }
      
      const newPoints = prevUser.points + streakBonus;
      const newTotalEarned = prevUser.totalPointsEarned + streakBonus;
      const newLevel = calculateLevel(newPoints);
      const updated = { 
        ...prevUser, 
        streak: newStreak,
        maxStreak: newMaxStreak,
        points: newPoints,
        totalPointsEarned: newTotalEarned,
        level: newLevel
      };
      
      persistUser(updated);
      addTransaction(streakBonus, 'streak_bonus', `${newStreak}-day streak bonus!`);
      return updated;
    });
  }, [addTransaction, persistUser]);

  // Can claim daily bonus
  const canClaimDailyBonus = useCallback((): boolean => {
    if (!user) return false;
    
    const today = new Date().toDateString();
    const lastClaim = user.lastBonusClaim ? new Date(user.lastBonusClaim).toDateString() : null;
    
    return lastClaim !== today;
  }, [user]);

  // Claim daily bonus
  const claimDailyBonus = useCallback((): { success: boolean; points: number; message: string } => {
    if (!user) {
      return { success: false, points: 0, message: 'Please log in first' };
    }
    
    const today = new Date().toDateString();
    const lastClaim = user.lastBonusClaim ? new Date(user.lastBonusClaim).toDateString() : null;
    
    if (lastClaim === today) {
      return { success: false, points: 0, message: 'Already claimed today!' };
    }
    
    const baseBonus = 10;
    const streakMultiplier = Math.min(user.streak * 0.1, 1);
    const bonus = Math.round(baseBonus * (1 + streakMultiplier));
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasClaimedYesterday = lastClaim === yesterday.toDateString();
    
    let newStreak: number;
    if (wasClaimedYesterday || !user.lastBonusClaim) {
      newStreak = user.streak + 1;
    } else {
      newStreak = 1;
    }
    
    const newMaxStreak = Math.max(newStreak, user.maxStreak);
    const newPoints = user.points + bonus;
    const newTotalEarned = user.totalPointsEarned + bonus;
    const newLevel = calculateLevel(newPoints);
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updated = { 
        ...prevUser, 
        streak: newStreak,
        maxStreak: newMaxStreak,
        points: newPoints,
        totalPointsEarned: newTotalEarned,
        level: newLevel,
        lastBonusClaim: new Date().toISOString()
      };
      
      persistUser(updated);
      addTransaction(bonus, 'daily_bonus', `Daily login bonus (${newStreak}-day streak)`);
      return updated;
    });
    
    return { 
      success: true, 
      points: bonus, 
      message: `+${bonus} points! ${newStreak}-day streak 🔥` 
    };
  }, [user, addTransaction, persistUser]);

  // Purchase item
  const purchaseItem = useCallback((itemId: string, cost: number): boolean => {
    let success = false;
    
    setUser(prevUser => {
      if (!prevUser || prevUser.points < cost || prevUser.purchasedItems?.includes(itemId)) {
        return prevUser;
      }
      
      success = true;
      const newPoints = prevUser.points - cost;
      const newLevel = calculateLevel(newPoints);
      const purchasedItems = [...(prevUser.purchasedItems || []), itemId];
      const updated = { 
        ...prevUser, 
        points: newPoints,
        level: newLevel,
        purchasedItems
      };
      
      persistUser(updated);
      addTransaction(-cost, 'shop_purchase', `Purchased: ${itemId}`);
      return updated;
    });
    
    return success;
  }, [addTransaction, persistUser]);

  // Get point transactions
  const getPointTransactions = useCallback((): PointTransaction[] => {
    return transactions;
  }, [transactions]);

  // Update avatar
  const updateAvatar = useCallback((avatarType: 'male' | 'female' | 'neutral', avatar: string) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updated = { 
        ...prevUser, 
        avatarType,
        avatar
      };
      
      persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  // Update profile photo
  const updateProfilePhoto = useCallback((photoUrl: string) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updated = { 
        ...prevUser, 
        avatarUrl: photoUrl,
        avatar: '',
      };
      
      persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isSupabaseMode,
      login, 
      loginAsGuest, 
      signup, 
      logout, 
      resetPassword,
      addPoints, 
      deductPoints,
      completeModule, 
      incrementStreak,
      claimDailyBonus,
      canClaimDailyBonus,
      purchaseItem,
      getPointTransactions,
      updateAvatar,
      updateProfilePhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export { LEVEL_THRESHOLDS, STREAK_MILESTONES };
