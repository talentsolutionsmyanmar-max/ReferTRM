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
  Phone,
  User,
  Check,
  Sparkles,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const benefits = [
  'Earn up to 500,000 MMK per referral',
  'Free learning courses with certificates',
  'Daily streak rewards & bonuses',
  'Exclusive avatar customization',
];

export default function RegisterPage() {
  const router = useRouter();
  const { signup, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    zodiac: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const zodiacSigns = [
    '♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer',
    '♌ Leo', '♍ Virgo', '♎ Libra', '♏ Scorpio',
    '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!agreedToTerms) {
        setError('Please agree to the Terms of Service and Privacy Policy');
        return;
      }
      
      setIsLoading(true);
      try {
        await signup(formData.email, formData.password, formData.name);
        router.push('/dashboard');
      } catch (err: unknown) {
        console.error('Registration error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to create account. Please try again.';
        if (errorMessage.includes('email-already-in-use')) {
          setError('This email is already registered. Please login instead.');
        } else if (errorMessage.includes('invalid-email')) {
          setError('Please enter a valid email address.');
        } else if (errorMessage.includes('weak-password')) {
          setError('Password is too weak. Please use a stronger password.');
        } else if (errorMessage.includes('network')) {
          setError('Network error. Please check your connection.');
        } else {
          setError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        </div>

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

            <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your Journey{' '}
              <span className="text-gradient-primary">Today</span>
            </h2>

            <p className="text-xl text-slate-300 mb-8">
              Join thousands of Myanmar youth building their careers through referrals and learning.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Burmese Text */}
            <p className="mt-8 text-slate-500 burmese-text">
              ယနေ့ပင် စတင်ပါ။ သင့်အနာဂတ်ကို တည်ဆောက်ပါ။
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background overflow-y-auto">
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
            <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-slate-400">
              {step === 1 ? 'Enter your details to get started' : 'Complete your profile'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                  s <= step
                    ? 'bg-teal-500 text-slate-900'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                {/* Name Field */}
                <div>
                  <label className="form-label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input pl-12"
                      placeholder="Thiri Aung"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="form-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input pl-12"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="form-label">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input pl-12"
                      placeholder="+95 9 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input pl-12 pr-12"
                      placeholder="Min. 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="form-label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input pl-12"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label className="form-label">Referral Code (Optional)</label>
                  <div className="relative">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className="form-input pl-12"
                      placeholder="REFXXXXXX"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Have a referral code? Get +50 bonus points!</p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Zodiac Selection */}
                <div>
                  <label className="form-label">Your Zodiac Sign (Optional)</label>
                  <select
                    name="zodiac"
                    value={formData.zodiac}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select your zodiac sign</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign} value={sign}>{sign}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Get personalized traits and recommendations</p>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-400">
                    I agree to the{' '}
                    <Link href="/terms" className="text-teal-400 hover:text-teal-300">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-teal-400 hover:text-teal-300">Privacy Policy</Link>
                  </label>
                </div>

                {/* Bonus Info */}
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                  <h4 className="font-medium text-teal-400 mb-2">🎉 Welcome Bonus!</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• 50 points for signing up</li>
                    <li>• +15% permanent referral bonus</li>
                    <li>• Access to free learning tracks</li>
                  </ul>
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-primary py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : step === 1 ? (
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <Sparkles className="h-5 w-5" />
                </span>
              )}
            </Button>

            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            )}
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-slate-400">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>

          {/* Burmese */}
          <p className="mt-4 text-center text-slate-600 text-sm burmese-text">
            အကောင့်ရှိပြီးသားလား? လော့ဂ်အင်လုပ်ပါ။
          </p>
        </motion.div>
      </div>
    </div>
  );
}
