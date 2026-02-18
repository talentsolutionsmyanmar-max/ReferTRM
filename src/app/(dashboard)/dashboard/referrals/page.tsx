'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Copy,
  Share2,
  ExternalLink,
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  Link2,
  Send,
  Crown,
  Star,
  ChevronRight,
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  Target,
  Award,
  Eye,
  UserCheck,
  FileText,
  ArrowUpRight,
  Info,
  Check,
  AlertTriangle,
  Trophy,
  X,
  Phone,
  Mail,
  User,
  Plus,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

// Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  reward: number;
}

// Mock data for referrals with detailed tracking
const mockReferrals = [
  { id: '1', name: 'Thiha Aung', email: 'thiha@email.com', job: 'Senior Supervisor', company: 'RK Yangon Steel', status: 'hired', date: '2024-01-10', reward: 300000, yourEarnings: 240000, stage: 4 },
  { id: '2', name: 'Su Myat', email: 'sumyat@email.com', job: 'Brand Executive', company: 'Unicharm Myanmar', status: 'interview', date: '2024-01-08', reward: 250000, yourEarnings: 0, stage: 3 },
  { id: '3', name: 'Aung Min', email: 'aungmin@email.com', job: 'Data Collector', company: 'NielsenIQ', status: 'applied', date: '2024-01-05', reward: 100000, yourEarnings: 0, stage: 2 },
  { id: '4', name: 'Mya Thein', email: 'mya@email.com', job: 'Accountant', company: 'Universal Energy', status: 'registered', date: '2024-01-03', reward: 200000, yourEarnings: 0, stage: 1 },
];

const sharePlatforms = [
  { name: 'Telegram', icon: Send, color: 'bg-blue-500 hover:bg-blue-600', url: 'https://t.me/share/url?url=' },
  { name: 'Facebook', icon: Share2, color: 'bg-blue-600 hover:bg-blue-700', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
  { name: 'LinkedIn', icon: Building2, color: 'bg-sky-600 hover:bg-sky-700', url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
];

const statusStages = [
  { id: 1, name: 'Registered', icon: UserCheck, color: 'text-blue-500' },
  { id: 2, name: 'Applied', icon: FileText, color: 'text-amber-500' },
  { id: 3, name: 'Interview', icon: Calendar, color: 'text-purple-500' },
  { id: 4, name: 'Hired', icon: CheckCircle, color: 'text-green-500' },
];

export default function ReferralsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    jobId: '',
    notes: '',
  });

  // Fetch available jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/supabase/jobs?limit=50');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  const referralLink = `https://refertrm.com/ref/${user?.referralCode || 'REFABC12'}`;

  const copyToClipboard = (text: string, isLink = false) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: typeof sharePlatforms[0]) => {
    window.open(platform.url + encodeURIComponent(referralLink), '_blank');
  };

  // Handle form submission
  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.jobId) return;
    
    setSubmitting(true);
    try {
      const selectedJob = jobs.find(j => j.id === formData.jobId);
      
      const res = await fetch('/api/supabase/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrer_id: user.uid,
          referrer_code: user.referralCode,
          candidate_name: formData.candidateName,
          candidate_email: formData.candidateEmail,
          candidate_phone: formData.candidatePhone,
          job_id: formData.jobId,
          job_title: selectedJob?.title || '',
          company_id: selectedJob?.company || '',
          company_name: selectedJob?.company || '',
          reward_amount: selectedJob?.reward || 0,
          notes: formData.notes,
        }),
      });
      
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ candidateName: '', candidateEmail: '', candidatePhone: '', jobId: '', notes: '' });
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to submit referral');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit referral. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Stats calculations
  const totalReferrals = mockReferrals.length;
  const successfulHires = mockReferrals.filter(r => r.status === 'hired').length;
  const totalEarnings = mockReferrals.reduce((sum, r) => sum + r.yourEarnings, 0);
  const pendingRewards = mockReferrals.filter(r => r.status !== 'hired').reduce((sum, r) => sum + r.reward, 0);
  const successRate = totalReferrals > 0 ? Math.round((successfulHires / totalReferrals) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Professional Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Referral Dashboard</h1>
              <p className="text-muted-foreground text-sm">Professional Referral Tracking & Analytics</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Submit Referral Button */}
          <Button 
            onClick={() => setShowSubmitModal(true)}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold gap-2"
          >
            <Plus className="h-5 w-5" />
            Submit Referral
          </Button>
          
          {/* Quick Stats Row */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
              <div className="text-2xl font-bold text-amber-500">{totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">MMK Earned</div>
            </div>
            <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
              <div className="text-2xl font-bold text-green-500">{successfulHires}</div>
              <div className="text-xs text-muted-foreground">Hires</div>
            </div>
            <div className="text-center px-4 py-2 rounded-xl bg-card border border-border">
              <div className="text-2xl font-bold text-teal-500">{successRate}%</div>
              <div className="text-xs text-muted-foreground">Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid - Corporate Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Referrals', value: totalReferrals, color: 'teal', trend: '+3 this week' },
          { icon: CheckCircle, label: 'Successful Hires', value: successfulHires, color: 'green', trend: `${successRate}% rate` },
          { icon: DollarSign, label: 'Total Earnings', value: `${(totalEarnings/1000).toFixed(0)}K`, suffix: 'MMK', color: 'amber', trend: 'Via KPay' },
          { icon: Clock, label: 'Pending Potential', value: `${(pendingRewards/1000).toFixed(0)}K`, suffix: 'MMK', color: 'purple', trend: 'In progress' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-card border border-border hover:border-teal-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                  <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-border">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                  {stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Referral Code Section - Corporate Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-card to-muted/30 border border-border">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Side - Code Display */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Your Referral Code</h3>
                    <p className="text-xs text-muted-foreground">Share to earn up to 80% of referral rewards</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {/* Code */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={user?.referralCode || 'REFABC12'}
                        readOnly
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-center text-2xl font-mono tracking-widest text-teal-500 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="shrink-0 border-border hover:bg-teal-500/10 hover:border-teal-500/30"
                      onClick={() => copyToClipboard(user?.referralCode || 'REFABC12')}
                    >
                      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  
                  {/* Link */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-muted-foreground focus:outline-none"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={() => copyToClipboard(referralLink, true)}
                    >
                      {copiedLink ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Share Buttons */}
              <div className="flex flex-row lg:flex-col gap-2">
                {sharePlatforms.map((platform) => (
                  <Button
                    key={platform.name}
                    className={`${platform.color} text-white gap-2`}
                    onClick={() => handleShare(platform)}
                  >
                    <platform.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{platform.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works - Professional Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">How Referrals Work</CardTitle>
            <CardDescription>Simple 4-step process to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Share Code', desc: 'Send your unique code to qualified candidates', icon: Share2, color: 'from-blue-500 to-cyan-500' },
                { step: 2, title: 'They Register', desc: 'Candidate signs up with your referral code', icon: UserCheck, color: 'from-teal-500 to-emerald-500' },
                { step: 3, title: 'Get Interview', desc: 'Candidate applies and gets interviewed', icon: Calendar, color: 'from-purple-500 to-pink-500' },
                { step: 4, title: 'You Earn!', desc: 'When hired, receive up to 80% reward', icon: DollarSign, color: 'from-amber-500 to-orange-500' },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">Step {item.step}</div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-2 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Tracking Table - Corporate Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-card border border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Referral Tracking</CardTitle>
                <CardDescription>Monitor your referral pipeline in real-time</CardDescription>
              </div>
              <Badge variant="outline" className="border-border text-muted-foreground">
                {mockReferrals.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Status Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-4 p-3 rounded-lg bg-muted/30">
              {statusStages.map((stage) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <stage.icon className={`h-4 w-4 ${stage.color}`} />
                  <span className="text-sm text-muted-foreground">{stage.name}</span>
                </div>
              ))}
            </div>

            {/* Referrals List */}
            <div className="space-y-3">
              {mockReferrals.map((referral, index) => {
                const currentStage = statusStages.find(s => s.id === referral.stage);
                
                return (
                  <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-muted/20 border border-border hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left - Candidate Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                          {referral.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">{referral.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{referral.job}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{referral.company}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Center - Progress */}
                      <div className="flex items-center gap-2 flex-1 justify-center">
                        {statusStages.map((stage, i) => (
                          <div key={stage.id} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                referral.stage >= stage.id
                                  ? 'bg-teal-500 text-white'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {referral.stage > stage.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <stage.icon className="h-4 w-4" />
                              )}
                            </div>
                            {i < statusStages.length - 1 && (
                              <div
                                className={`w-6 h-0.5 ${
                                  referral.stage > stage.id ? 'bg-teal-500' : 'bg-muted'
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Right - Status & Reward */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge className={`
                            ${referral.status === 'hired' ? 'bg-green-500/10 text-green-500 border-green-500/30' : ''}
                            ${referral.status === 'interview' ? 'bg-purple-500/10 text-purple-500 border-purple-500/30' : ''}
                            ${referral.status === 'applied' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : ''}
                            ${referral.status === 'registered' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' : ''}
                            border font-medium capitalize
                          `}>
                            {referral.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">{referral.date}</div>
                        </div>
                        
                        <div className="text-right min-w-[100px]">
                          {referral.status === 'hired' ? (
                            <>
                              <div className="text-lg font-bold text-green-500">
                                +{referral.yourEarnings.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Earned</div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm font-medium text-muted-foreground">
                                {referral.reward.toLocaleString()} MMK
                              </div>
                              <div className="text-xs text-muted-foreground">Potential</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Pro Tips for Maximizing Referrals</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Share jobs with candidates who closely match the requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Follow up with your referrals to help them prepare for interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Use Telegram groups and Facebook communities to reach more candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Build your network - your referral bonus increases by 15% with successful hires!</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/jobs">
          <Card className="bg-card border border-border hover:border-teal-500/30 transition-all cursor-pointer">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-6 w-6 text-teal-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Browse Jobs</p>
              <p className="text-xs text-muted-foreground">26 open positions</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/companies">
          <Card className="bg-card border border-border hover:border-teal-500/30 transition-all cursor-pointer">
            <CardContent className="p-4 text-center">
              <Building2 className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Companies</p>
              <p className="text-xs text-muted-foreground">View hiring partners</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/leaderboard">
          <Card className="bg-card border border-border hover:border-teal-500/30 transition-all cursor-pointer">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Leaderboard</p>
              <p className="text-xs text-muted-foreground">300K MMK prizes</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/settings">
          <Card className="bg-card border border-border hover:border-teal-500/30 transition-all cursor-pointer">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Profile</p>
              <p className="text-xs text-muted-foreground">Complete setup</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Submit Referral Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSubmitModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Submit Referral</h3>
                    <p className="text-sm text-muted-foreground">Recommend a candidate for a job</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              {submitSuccess ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Referral Submitted!</h4>
                  <p className="text-muted-foreground">We'll notify you when the candidate progresses.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReferral} className="p-6 space-y-4">
                  {/* Candidate Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Candidate Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.candidateName}
                        onChange={e => setFormData({ ...formData, candidateName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={formData.candidateEmail}
                        onChange={e => setFormData({ ...formData, candidateEmail: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.candidatePhone}
                        onChange={e => setFormData({ ...formData, candidatePhone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                        placeholder="09XXXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* Job Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Job *
                    </label>
                    <select
                      required
                      value={formData.jobId}
                      onChange={e => setFormData({ ...formData, jobId: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      <option value="">Choose a job...</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.company} ({job.reward?.toLocaleString() || 0} MMK reward)
                        </option>
                      ))}
                    </select>
                    {jobs.length === 0 && (
                      <p className="text-xs text-amber-500 mt-1">Loading jobs...</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 resize-none"
                      rows={3}
                      placeholder="Why is this candidate a good fit?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting || !formData.jobId}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity:75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Referral'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
