'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  Heart,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  console.log('🔑 Login page rendered, loading:', loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 handleSubmit called!');
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password.length);
    
    setError('');
    setIsLoading(true);

    try {
      console.log('📞 Calling login function...');
      await login(email, password);
      console.log('✅ Login returned successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('❌ Login caught error:', err);
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    console.log('👤 Guest login clicked');
    setIsLoading(true);
    setError('');
    try {
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
        avatarType: 'neutral' as const,
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
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Guest login error:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-teal-500/50 shadow-lg shadow-teal-500/20">
                  <img 
                    src="/avatars/avatar-default-male.png" 
                    alt="ReferTRM" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-teal-400">Refer</span>
                    <span className="text-white">TRM</span>
                  </h1>
                </div>
              </div>
              <p className="text-[10px] text-teal-400/80 flex items-center gap-1 pl-[60px]">
                Made with <Heart className="w-3 h-3 text-red-400 inline" fill="currentColor" /> in Myanmar <span className="text-slate-500">(မြန်မာပြည်)</span>
              </p>
            </div>

            {/* Headline */}
            <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Turn Your Network Into{' '}
              <span className="text-gradient-primary">Real Income</span>
            </h2>

            <p className="text-xl text-slate-300 mb-8">
              Myanmar's #1 referral hiring platform. Refer friends, earn rewards, and build your career.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-teal-400">25+</div>
                <div className="text-slate-400">Active Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">500K+</div>
                <div className="text-slate-400">MMK Rewards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">150+</div>
                <div className="text-slate-400">Referrers</div>
              </div>
            </div>

            {/* Burmese Text */}
            <p className="mt-8 text-slate-500 burmese-text">
              သူငယ်ချင်းများကို ရည်ညွှန်းပါ။ ဆုကြေးရယူပါ။
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center gap-1 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-teal-500/50 shadow-lg shadow-teal-500/20">
                <img 
                  src="/avatars/avatar-default-male.png" 
                  alt="ReferTRM" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-teal-400">Refer</span>
                <span className="text-white">TRM</span>
              </h1>
            </div>
            <p className="text-[10px] text-teal-400/80 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 inline" fill="currentColor" /> in Myanmar <span className="text-slate-500">(မြန်မာပြည်)</span>
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {showForgotPassword ? 'Reset Password' : 'Welcome back'}
            </h2>
            <p className="text-slate-400">
              {showForgotPassword 
                ? 'Enter your email to receive a password reset link' 
                : 'Sign in to your account to continue'}
            </p>
          </div>

          {/* System Upgrade Notice */}
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-amber-400">System Upgrade Notice</p>
                <p className="text-sm text-amber-300/80 mt-1">
                  We've upgraded our database system. If you cannot login, please create a new account.
                </p>
                <p className="text-xs text-amber-200/60 mt-1">
                  Your referral history will be restored manually. Contact support if needed.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Reset Email Sent Success */}
          {resetEmailSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Password reset email sent! Check your inbox.</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                စာတိုက်ပုံးထဲသို့ စာကိုစစ်ပါ။
              </p>
            </motion.div>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword && !resetEmailSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input pl-12"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-primary py-6 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity:25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity:75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Reset Link
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                }}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </button>
            </form>
          ) : resetEmailSent ? (
            <div className="space-y-4">
              <Button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setError('');
                }}
                className="w-full btn-primary py-6 text-base"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            // Login Form
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input pl-12"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="form-label mb-0">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setError('');
                    }}
                    className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input pl-12 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-primary py-6 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity:25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity:75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* Divider - Only show on login form */}
          {!showForgotPassword && !resetEmailSent && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-slate-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-6"
                  onClick={handleGuestLogin}
                >
                  <User className="mr-2 h-5 w-5" />
                  Quick Demo Login (No Account Needed)
                </Button>
              </div>
              <p className="text-center text-slate-500 text-xs mt-2">
                Demo account stored in your browser only
              </p>
            </>
          )}

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Sign up for free
            </Link>
          </p>

          {/* Burmese */}
          <p className="mt-4 text-center text-slate-600 text-sm burmese-text">
            အကောင့်မရှိသေးဘူးလား? အခမဲ့မှတ်ပါ။
          </p>
        </motion.div>
      </div>
    </div>
  );
}
