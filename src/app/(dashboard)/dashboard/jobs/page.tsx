'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Banknote,
  Send,
  Clock,
  Building2,
  Flame,
  Search,
  X,
  Star,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  FileText,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { jobs, Job, getJobStats, getUrgentJobs } from '@/data/jobs';

const levelColors: Record<string, string> = {
  Entry: 'text-green-400 border-green-500/30 bg-green-500/10',
  Mid: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  Senior: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
};

// Reward Tier System (70% to 85% max)
const rewardTiers = [
  { name: 'New', minHires: 0, userShare: 70, icon: '🌱' },
  { name: 'Bronze', minHires: 1, userShare: 75, icon: '🥉' },
  { name: 'Silver', minHires: 4, userShare: 80, icon: '🥈' },
  { name: 'Gold', minHires: 10, userShare: 85, icon: '🥇' },
];

// Calculate user's tier based on successful hires
function getUserTier(successfulHires: number) {
  for (let i = rewardTiers.length - 1; i >= 0; i--) {
    if (successfulHires >= rewardTiers[i].minHires) {
      return rewardTiers[i];
    }
  }
  return rewardTiers[0];
}

// Calculate reward share based on tier and job level
function calculateRewardShare(baseReward: number, successfulHires: number, isManagerRole: boolean) {
  const tier = getUserTier(successfulHires);
  let userShare = tier.userShare;
  
  // Manager+ roles get +5% bonus (but max 85%)
  if (isManagerRole) {
    userShare = Math.min(userShare + 5, 85);
  }
  
  const userEarning = Math.round(baseReward * userShare / 100);
  const platformFee = baseReward - userEarning;
  
  return { userShare, userEarning, platformFee, tier };
}

// Get guarantee period based on role
function getGuaranteePeriod(jobTitle: string, jobLevel: string): number {
  const isManager = jobTitle.toLowerCase().includes('manager') || 
                    jobTitle.toLowerCase().includes('supervisor') || 
                    jobTitle.toLowerCase().includes('director') ||
                    jobTitle.toLowerCase().includes('head') ||
                    jobLevel === 'Senior' || jobLevel === 'Lead';
  return isManager ? 90 : 60;
}

interface ReferralFormData {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateResume?: string;
  notes: string;
  // Qualification checklist
  hasExperience: boolean;
  hasSkills: boolean;
  isAvailable: boolean;
  agreedSalary: boolean;
}

export default function JobsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<{
    exists: boolean;
    referrerName?: string;
    referrerCode?: string;
    referredDate?: string;
    status?: string;
  } | null>(null);
  const [referralData, setReferralData] = useState<ReferralFormData>({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    notes: '',
    hasExperience: false,
    hasSkills: false,
    isAvailable: false,
    agreedSalary: false,
  });

  const jobStats = getJobStats();
  
  // Get user's successful hires count
  const successfulHires = user?.successfulReferrals || 0;
  const userTier = getUserTier(successfulHires);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || job.level === filterLevel;
    const matchesUrgent = !filterUrgent || job.urgent;
    return matchesSearch && matchesLevel && matchesUrgent;
  });

  // Check for duplicate candidate
  const checkDuplicateCandidate = async (email: string, phone: string) => {
    if (!supabase) return null;
    
    setCheckingDuplicate(true);
    try {
      // Check by email
      const { data: emailMatch } = await supabase
        .from('referrals')
        .select('referrer_code, created_at, status')
        .eq('candidate_email', email.toLowerCase())
        .limit(1)
        .single();

      if (emailMatch) {
        return {
          exists: true,
          referrerCode: emailMatch.referrer_code,
          referredDate: emailMatch.created_at,
          status: emailMatch.status
        };
      }

      // Check by phone
      const { data: phoneMatch } = await supabase
        .from('referrals')
        .select('referrer_code, created_at, status')
        .eq('candidate_phone', phone)
        .limit(1)
        .single();

      if (phoneMatch) {
        return {
          exists: true,
          referrerCode: phoneMatch.referrer_code,
          referredDate: phoneMatch.created_at,
          status: phoneMatch.status
        };
      }

      return { exists: false };
    } catch (error) {
      // No match found is expected, so this is OK
      return { exists: false };
    } finally {
      setCheckingDuplicate(false);
    }
  };

  // Handle email/phone change to check duplicates
  const handleCandidateEmailChange = async (email: string) => {
    setReferralData({...referralData, candidateEmail: email});
    setDuplicateInfo(null);
    
    if (email.includes('@') && referralData.candidatePhone.length >= 9) {
      const result = await checkDuplicateCandidate(email, referralData.candidatePhone);
      setDuplicateInfo(result);
    }
  };

  const handleCandidatePhoneChange = async (phone: string) => {
    setReferralData({...referralData, candidatePhone: phone});
    setDuplicateInfo(null);
    
    if (phone.length >= 9 && referralData.candidateEmail.includes('@')) {
      const result = await checkDuplicateCandidate(referralData.candidateEmail, phone);
      setDuplicateInfo(result);
    }
  };

  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedJob || !supabase) {
      alert('Please login to submit a referral');
      return;
    }

    setSubmitting(true);

    try {
      const referral = {
        referrer_id: user.uid,
        referrer_code: user.referralCode || 'GUEST',
        candidate_name: referralData.candidateName,
        candidate_email: referralData.candidateEmail,
        candidate_phone: referralData.candidatePhone,
        job_id: selectedJob.id,
        job_title: selectedJob.title,
        company_name: selectedJob.company,
        reward_amount: Math.round(selectedJob.reward * 0.83) * 1000, // User's 83% share
        status: 'pending',
        notes: referralData.notes || '',
        // Qualification checklist
        has_experience: referralData.hasExperience,
        has_skills: referralData.hasSkills,
        is_available: referralData.isAvailable,
        agreed_salary: referralData.agreedSalary,
      };

      console.log('📤 Submitting referral:', referral);

      const { data, error } = await supabase.from('referrals').insert([referral]).select();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      console.log('✅ Referral saved:', data);
      setSubmitted(true);
      setReferralData({ 
        candidateName: '', 
        candidateEmail: '', 
        candidatePhone: '', 
        notes: '',
        hasExperience: false,
        hasSkills: false,
        isAvailable: false,
        agreedSalary: false,
      });
      
    } catch (error: any) {
      console.error('Error submitting referral:', error);
      alert('Failed to submit referral: ' + (error?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  const totalRewards = filteredJobs.reduce((sum, job) => sum + job.reward, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-teal-400" />
            Job Listings
          </h1>
          <p className="text-muted-foreground">Refer candidates and earn rewards!</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-sm">
            <Briefcase className="h-4 w-4 mr-1" />{jobStats.total} Open Positions
          </Badge>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-sm">
            <Flame className="h-4 w-4 mr-1" />{jobStats.urgent} Urgent
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm">
            <Star className="h-4 w-4 mr-1" />{jobStats.totalRewards}K Total Rewards
          </Badge>
        </div>
      </div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, locations..."
              className="form-input pl-12 w-full"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="form-input px-4 py-2 rounded-xl bg-secondary border-border text-foreground"
            >
              <option value="all">All Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
            <Button
              variant={filterUrgent ? 'default' : 'outline'}
              className={filterUrgent ? 'bg-red-500 text-foreground' : 'border-border'}
              onClick={() => setFilterUrgent(!filterUrgent)}
            >
              <Flame className="h-4 w-4 mr-2" />
              Urgent Only
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredJobs.length}</span> jobs
        </p>
        <p className="text-muted-foreground text-sm">
          Potential earnings: <span className="text-amber-400 font-medium">{filteredJobs.reduce((s, j) => s + j.reward, 0)}K MMK</span>
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job, index) => (
          <motion.div 
            key={job.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.03 }}
          >
            <Card 
              className="glass-card-hover h-full group cursor-pointer"
              onClick={() => {
                setSelectedJob(job);
                setShowReferralForm(false);
                setSubmitted(false);
              }}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-teal-400 transition-colors truncate">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 shrink-0">
                          <Flame className="h-3 w-3 mr-1" />Urgent
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Building2 className="h-4 w-4 shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                  </div>
                  <Badge className={`shrink-0 ${levelColors[job.level]}`}>
                    {job.level}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="h-4 w-4 text-teal-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Banknote className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{job.salary} MMK</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary text-slate-300 text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="secondary" className="bg-secondary text-muted-foreground text-xs">
                      +{job.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-amber-400 font-bold text-lg">
                      💰 {job.reward}K MMK Total
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{userTier.icon}</span>
                      <span className="text-xs text-teal-400 font-medium">
                        {userTier.name} Tier
                      </span>
                    </div>
                  </div>
                  {(() => {
                    const isManager = job.title.toLowerCase().includes('manager') || job.title.toLowerCase().includes('supervisor') || job.level === 'Senior';
                    const { userShare, userEarning, platformFee } = calculateRewardShare(job.reward, successfulHires, isManager);
                    return (
                      <div className="flex gap-2 text-xs">
                        <span className="text-green-400">🎁 You: {userEarning}K ({userShare}%)</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-teal-400">🏢 Fee: {platformFee}K</span>
                        {isManager && <span className="text-purple-400">• +5% Manager</span>}
                      </div>
                    );
                  })()}
                </div>

                <Button className="w-full btn-primary">
                  View Details & Refer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Job Detail Modal with Referral Form */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-card p-6 bg-card my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>

              {!showReferralForm && !submitted ? (
                <>
                  {/* Job Details */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-2xl font-bold text-foreground">{selectedJob.title}</h2>
                          {selectedJob.urgent && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <Flame className="h-3 w-3 mr-1" />Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-1">{selectedJob.company}</p>
                        <Badge className={`mt-2 ${levelColors[selectedJob.level]}`}>
                          {selectedJob.level} Level
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-4">
                      <div className="text-muted-foreground text-sm mb-1">Location</div>
                      <div className="text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-400" />
                        {selectedJob.location}
                      </div>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-muted-foreground text-sm mb-1">Salary</div>
                      <div className="text-foreground flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-amber-400" />
                        {selectedJob.salary} MMK
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} className="bg-secondary text-foreground">
                          <Check className="h-3 w-3 mr-1 text-teal-400" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Reward Display */}
                  {(() => {
                    const isManager = selectedJob.title.toLowerCase().includes('manager') || selectedJob.title.toLowerCase().includes('supervisor') || selectedJob.level === 'Senior';
                    const { userShare, userEarning, platformFee, tier } = calculateRewardShare(selectedJob.reward, successfulHires, isManager);
                    
                    return (
                      <div className="mb-6">
                        {/* User Tier Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{tier.icon}</span>
                            <span className="text-sm font-medium text-foreground">{tier.name} Tier</span>
                            <span className="text-xs text-muted-foreground">({successfulHires} successful hires)</span>
                          </div>
                          {isManager && (
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              +5% Manager Bonus
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                          <div className="text-center mb-3">
                            <div className="text-muted-foreground text-sm">Total Reward When Hired</div>
                            <div className="text-3xl font-bold text-amber-400">{selectedJob.reward}K MMK</div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                              <div className="text-green-400 font-bold text-lg">{userEarning}K MMK</div>
                              <div className="text-xs text-muted-foreground">🎁 Your Earning</div>
                              <div className="text-xs text-green-400">({userShare}%)</div>
                            </div>
                            <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20 text-center">
                              <div className="text-teal-400 font-bold text-lg">{platformFee}K MMK</div>
                              <div className="text-xs text-muted-foreground">🏢 Platform Fee</div>
                              <div className="text-xs text-teal-400">({100 - userShare}%)</div>
                            </div>
                          </div>
                          <div className="mt-3 text-center text-xs text-muted-foreground">
                            Your Referral Code: <span className="text-teal-400 font-mono">{user?.referralCode || 'GUEST'}</span>
                          </div>
                        </div>

                        {/* Tier Progress */}
                        {tier.name !== 'Gold' && (
                          <div className="mt-3 p-3 rounded-lg bg-secondary/50 text-xs">
                            <div className="flex justify-between text-muted-foreground mb-1">
                              <span>Progress to next tier</span>
                              <span>{successfulHires}/{rewardTiers[rewardTiers.findIndex(t => t.name === tier.name) + 1]?.minHires || '∞'} hires</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full"
                                style={{ width: `${Math.min((successfulHires / (rewardTiers[rewardTiers.findIndex(t => t.name === tier.name) + 1]?.minHires || successfulHires)) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <Button 
                    className="w-full btn-primary text-lg py-6"
                    onClick={() => setShowReferralForm(true)}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit a Referral
                  </Button>
                </>
              ) : submitted ? (
                /* Success Screen */
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-10 w-10 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Referral Submitted!</h2>
                  <p className="text-muted-foreground mb-4">
                    You referred <span className="text-teal-400">{referralData.candidateName}</span> for {selectedJob.title}
                  </p>
                  
                  {(() => {
                    const isManager = selectedJob.title.toLowerCase().includes('manager') || 
                                      selectedJob.title.toLowerCase().includes('supervisor') || 
                                      selectedJob.level === 'Senior';
                    const guaranteeDays = getGuaranteePeriod(selectedJob.title, selectedJob.level);
                    const { userEarning } = calculateRewardShare(selectedJob.reward, successfulHires, isManager);
                    
                    return (
                      <div className="p-4 rounded-xl bg-secondary/50 mb-4 text-left">
                        <h4 className="font-medium text-foreground mb-2">📋 What Happens Next:</h4>
                        <ol className="text-sm text-muted-foreground space-y-2">
                          <li>1. We'll contact your candidate within 24 hours</li>
                          <li>2. If hired, they must complete <span className="text-amber-400 font-medium">{guaranteeDays}-day guarantee period</span></li>
                          <li>3. After guarantee, you'll receive <span className="text-green-400 font-medium">{userEarning}K MMK</span></li>
                        </ol>
                        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                          💡 <span className="text-teal-400">First referrer gets priority!</span> Your referral was submitted on {new Date().toLocaleDateString()}.
                        </div>
                      </div>
                    );
                  })()}

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                    <p className="text-xs text-muted-foreground">
                      💡 <span className="text-amber-400">Track your referral status</span> in the Referrals page
                    </p>
                  </div>
                  <Button onClick={() => setSelectedJob(null)} className="btn-primary">
                    Continue Browsing Jobs
                  </Button>
                </div>
              ) : (
                /* Referral Form */
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground">Refer a Candidate</h2>
                    <p className="text-muted-foreground">for {selectedJob.title} at {selectedJob.company}</p>
                  </div>

                  <form onSubmit={handleSubmitReferral} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Candidate Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={referralData.candidateName}
                          onChange={(e) => setReferralData({...referralData, candidateName: e.target.value})}
                          className="form-input pl-10 w-full"
                          placeholder="Enter candidate's full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={referralData.candidateEmail}
                          onChange={(e) => handleCandidateEmailChange(e.target.value)}
                          className={`form-input pl-10 w-full ${duplicateInfo?.exists ? 'border-red-500' : ''}`}
                          placeholder="candidate@email.com"
                        />
                        {checkingDuplicate && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          value={referralData.candidatePhone}
                          onChange={(e) => handleCandidatePhoneChange(e.target.value)}
                          className={`form-input pl-10 w-full ${duplicateInfo?.exists ? 'border-red-500' : ''}`}
                          placeholder="09xxxxxxxxx"
                        />
                      </div>
                    </div>

                    {/* Duplicate Candidate Warning */}
                    {duplicateInfo?.exists && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-amber-400 font-medium text-sm">📋 Candidate Already in Our System</p>
                            <p className="text-muted-foreground text-xs mt-1">
                              This candidate was referred before. First referrer gets priority for this job.
                            </p>
                            <div className="mt-2 p-2 rounded bg-secondary/50 text-xs text-muted-foreground">
                              <p>📅 First referred: {duplicateInfo.referredDate ? new Date(duplicateInfo.referredDate).toLocaleDateString() : 'N/A'}</p>
                              <p>📊 Status: <span className={`${
                                duplicateInfo.status === 'hired' ? 'text-green-400' :
                                duplicateInfo.status === 'interview' ? 'text-blue-400' :
                                duplicateInfo.status === 'rejected' ? 'text-red-400' : 'text-amber-400'
                              }`}>{duplicateInfo.status || 'pending'}</span></p>
                            </div>
                            <div className="mt-2 space-y-1">
                              <p className="text-teal-400 text-xs">
                                ✅ You can still submit - we'll save for future opportunities!
                              </p>
                              <p className="text-muted-foreground text-xs">
                                💡 If this candidate fits other jobs later, we'll contact them and you may earn rewards.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Qualification Checklist */}
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                      <label className="block text-sm font-medium text-foreground mb-3">
                        ✅ Minimum Requirements Checklist
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Please confirm the candidate meets these requirements:
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={referralData.hasExperience}
                            onChange={(e) => setReferralData({...referralData, hasExperience: e.target.checked})}
                            className="w-5 h-5 rounded border-border bg-secondary"
                          />
                          <span className="text-sm text-foreground">Has relevant experience for this role</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={referralData.hasSkills}
                            onChange={(e) => setReferralData({...referralData, hasSkills: e.target.checked})}
                            className="w-5 h-5 rounded border-border bg-secondary"
                          />
                          <span className="text-sm text-foreground">Has required skills (see job description)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={referralData.isAvailable}
                            onChange={(e) => setReferralData({...referralData, isAvailable: e.target.checked})}
                            className="w-5 h-5 rounded border-border bg-secondary"
                          />
                          <span className="text-sm text-foreground">Available to start within 2 weeks</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={referralData.agreedSalary}
                            onChange={(e) => setReferralData({...referralData, agreedSalary: e.target.checked})}
                            className="w-5 h-5 rounded border-border bg-secondary"
                          />
                          <span className="text-sm text-foreground">Agreed to salary range: {selectedJob.salary} MMK</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={referralData.notes}
                        onChange={(e) => setReferralData({...referralData, notes: e.target.value})}
                        className="form-input w-full h-24"
                        placeholder="Why is this candidate a good fit?"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
                      <p>Your referral code: <span className="text-teal-400 font-mono">{user?.referralCode}</span></p>
                      <p className="mt-1">Reward: <span className="text-amber-400">{selectedJob.reward}K MMK</span> when hired</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowReferralForm(false)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 btn-primary"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Referral
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
