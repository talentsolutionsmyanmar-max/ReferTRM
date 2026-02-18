'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuickLoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleQuickLogin = () => {
    setStatus('loading');
    
    try {
      // Create demo user directly in localStorage
      const user = {
        uid: 'demo_' + Date.now(),
        email: 'demo@refertrm.com',
        displayName: 'Demo User',
        name: 'Demo User',
        isGuest: true,
        points: 50,
        totalPointsEarned: 50,
        streak: 1,
        maxStreak: 1,
        completedModules: [],
        level: 'Amateur',
        avatar: '',
        avatarType: 'neutral',
        avatarUrl: null,
        referralCode: 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        totalEarnings: 0,
        successfulReferrals: 0,
        totalReferrals: 0,
        lastLoginAt: new Date().toISOString(),
        lastBonusClaim: null,
        purchasedItems: [],
      };

      localStorage.setItem('refertrm_user', JSON.stringify(user));
      setStatus('success');

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Quick login error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700 text-center">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">
              <span className="text-teal-400">Refer</span>
              <span className="text-white">TRM</span>
            </h1>
            <p className="text-slate-400 text-sm">Demo Quick Login</p>
          </div>

          {/* Status Messages */}
          {status === 'success' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30">
                <p className="text-green-400 font-medium">Login Successful!</p>
                <p className="text-slate-400 text-sm mt-1">Logged in as: Demo User</p>
              </div>
              <p className="text-teal-400">Redirecting to Dashboard...</p>
            </div>
          ) : status === 'error' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                <p className="text-red-400">An error occurred. Please try again.</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="text-slate-400 hover:text-white underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Login Button */}
              <button
                onClick={handleQuickLogin}
                disabled={status === 'loading'}
                className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 mb-4"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Quick Demo Login'
                )}
              </button>

              <p className="text-slate-500 text-xs mb-4">
                Creates a demo account stored in your browser
              </p>

              {/* Benefits */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left mb-4">
                <p className="text-amber-400 text-sm font-medium mb-2">What you get:</p>
                <ul className="text-slate-400 text-xs space-y-1">
                  <li>+ 50 starting points</li>
                  <li>+ Access to all job listings</li>
                  <li>+ Free Academy courses</li>
                  <li>+ Your unique referral code</li>
                </ul>
              </div>

              {/* Links */}
              <div className="flex gap-4 justify-center text-sm">
                <Link href="/login" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Regular Login
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/register" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          2025 ReferTRM by Talent Solutions Myanmar
        </p>
      </div>
    </div>
  );
}
