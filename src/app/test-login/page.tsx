'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SimpleLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDemoLogin = () => {
    setLoading(true);
    setError('');
    
    try {
      // Simple demo login - just save to localStorage
      const demoUser = {
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
        avatar: '🧑',
        avatarType: 'neutral',
        avatarUrl: null,
        referralCode: 'REFDEMO123',
        totalEarnings: 0,
        successfulReferrals: 0,
        totalReferrals: 0,
        lastLoginAt: new Date().toISOString(),
        lastBonusClaim: null,
        purchasedItems: [],
      };
      
      localStorage.setItem('refertrm_user', JSON.stringify(demoUser));
      console.log('Demo user created:', demoUser);
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err: any) {
      console.error('Demo login error:', err);
      setError(err.message || 'Failed to create demo user');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            <span className="text-teal-400">Refer</span>TRM
          </h1>
          <p className="text-slate-400">Quick Login</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 text-lg rounded-xl"
        >
          {loading ? 'Loading...' : '🚀 Quick Demo Login'}
        </Button>

        <p className="text-center text-slate-500 text-sm">
          This will create a demo account stored in your browser.
        </p>
      </div>
    </div>
  );
}
