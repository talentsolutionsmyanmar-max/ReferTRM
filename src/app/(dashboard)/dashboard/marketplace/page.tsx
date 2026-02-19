'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Clock, Users, Play, BookOpen, Award, TrendingUp, Search, ChevronRight, Heart, Check, Briefcase, Code, Palette, BarChart3, Globe, CreditCard, Wallet, Sparkles, Flame, Zap, ArrowRight, Bell, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MarketplacePage() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    if (email) {
      setNotified(true);
      // In production, this would save to Firebase
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Coming Soon Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative overflow-hidden glass-card p-8 md:p-12"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6"
          >
            <Bell className="h-4 w-4 text-amber-400" />
            <span className="text-amber-400 font-medium">Coming Q4 2025</span>
          </motion.div>

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
            <ShoppingCart className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Edu-Marketplace
          </h1>
          <p className="text-xl text-muted-foreground burmese-text mb-2">
            ပညာရေး ဈေးကွက် • Learn. Grow. Succeed.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A curated marketplace for professional courses, certifications, and learning resources. 
            Connect with expert instructors and advance your career with Myanmar&apos;s premier education platform.
          </p>

          {/* Notify Me */}
          <div className="max-w-md mx-auto">
            {!notified ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  className="flex-1 px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <Button 
                  onClick={handleNotify}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 px-6"
                >
                  Notify Me
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-green-500/20 border border-green-500/30"
              >
                <Check className="h-5 w-5 text-green-400 inline mr-2" />
                <span className="text-green-400">You&apos;ll be notified when we launch!</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* What's Coming */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, title: 'Premium Courses', desc: 'Industry-leading courses from expert instructors', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, title: 'Certifications', desc: 'Recognized credentials to boost your career', color: 'from-amber-500 to-orange-500' },
          { icon: Users, title: 'Expert Instructors', desc: 'Learn from Myanmar&apos;s top professionals', color: 'from-green-500 to-teal-500' },
          { icon: CreditCard, title: 'Easy Payment', desc: 'KBZ Pay, Wave Money, and bank transfer', color: 'from-purple-500 to-pink-500' },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-6 text-center"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}>
              <feature.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Planned Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-400" />
          Planned Course Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: 'Technology', icon: '💻', count: '15+ courses' },
            { name: 'Marketing', icon: '📊', count: '10+ courses' },
            { name: 'Business', icon: '💼', count: '12+ courses' },
            { name: 'Design', icon: '🎨', count: '8+ courses' },
            { name: 'Languages', icon: '🌍', count: '6+ courses' },
            { name: 'Finance', icon: '💰', count: '8+ courses' },
          ].map((cat) => (
            <div key={cat.name} className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <span className="font-medium text-foreground text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground block mt-1">{cat.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Become Instructor CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Award className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Want to be an Instructor?</h3>
              <p className="text-muted-foreground">Share your expertise and earn. Only 15% platform fee - you keep 85%!</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
            Apply to Teach
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Planned Courses', value: '48+', icon: BookOpen, color: 'text-violet-400' },
          { label: 'Target Students', value: '12,500+', icon: Users, color: 'text-teal-400' },
          { label: 'Expert Instructors', value: '32+', icon: Award, color: 'text-amber-400' },
          { label: 'Platform Fee', value: '15%', icon: Wallet, color: 'text-green-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="p-4 rounded-xl bg-secondary/50 border border-border text-center"
          >
            <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-6"
      >
        <p className="text-muted-foreground text-sm">
          Made with <Heart className="h-4 w-4 text-red-400 inline" fill="currentColor" /> for Myanmar&apos;s learners
        </p>
      </motion.div>
    </div>
  );
}
