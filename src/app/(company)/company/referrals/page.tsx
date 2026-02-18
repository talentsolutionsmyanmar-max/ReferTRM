'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  Gift,
  Copy,
  Share2,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Referral status stages
const statusStages = [
  { id: 'registered', label: 'Registered', labelMm: 'မှတ်ပုံတင်ပြီ', color: 'bg-blue-500' },
  { id: 'applied', label: 'Applied', labelMm: 'လျှောက်လွှာတင်ပြီ', color: 'bg-purple-500' },
  { id: 'interviewed', label: 'Interviewed', labelMm: 'အင်တာဗျူးပြီ', color: 'bg-amber-500' },
  { id: 'hired', label: 'Hired', labelMm: 'အလုပ်ရရှိ', color: 'bg-green-500' },
];

// Mock referral data
const mockReferrals = [
  {
    id: '1',
    candidateName: 'Mya Myint',
    phone: '+95 9 123 456 789',
    position: 'Software Engineer',
    referralCode: 'REF-2025-001',
    status: 'hired',
    reward: '200,000 MMK',
    paid: true,
    date: '2025-01-10',
    hiredDate: '2025-01-20',
  },
  {
    id: '2',
    candidateName: 'Aung Ko',
    phone: '+95 9 234 567 890',
    position: 'Sales Manager',
    referralCode: 'REF-2025-002',
    status: 'interviewed',
    reward: '150,000 MMK',
    paid: false,
    date: '2025-01-12',
    hiredDate: null,
  },
  {
    id: '3',
    candidateName: 'Su Lwin',
    phone: '+95 9 345 678 901',
    position: 'Data Analyst',
    referralCode: 'REF-2025-003',
    status: 'applied',
    reward: '100,000 MMK',
    paid: false,
    date: '2025-01-14',
    hiredDate: null,
  },
  {
    id: '4',
    candidateName: 'Thura Aung',
    phone: '+95 9 456 789 012',
    position: 'Software Engineer',
    referralCode: 'REF-2025-004',
    status: 'registered',
    reward: '200,000 MMK',
    paid: false,
    date: '2025-01-15',
    hiredDate: null,
  },
];

export default function CompanyReferralsPage() {
  const [copied, setCopied] = useState(false);

  const companyReferralCode = 'RKYS-2025';

  const totalEarned = mockReferrals.filter(r => r.paid).reduce((sum, r) => {
    return sum + parseInt(r.reward.replace(/,/g, '').replace(' MMK', ''));
  }, 0);

  const pendingRewards = mockReferrals.filter(r => r.status === 'hired' && !r.paid).reduce((sum, r) => {
    return sum + parseInt(r.reward.replace(/,/g, '').replace(' MMK', ''));
  }, 0);

  const copyCode = () => {
    navigator.clipboard.writeText(companyReferralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserPlus className="h-7 w-7 text-teal-400" />
            Company Referrals
            <span className="text-lg text-slate-400 font-normal">/ ကုမ္ပဏီရည်ညွှန်းမှုများ</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Track candidates referred to your company through ReferTRM
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Share2 className="h-4 w-4 mr-2" />
            Share Link
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-teal-500/20">
              <Users className="h-5 w-5 text-teal-400" />
            </div>
            <span className="text-sm text-slate-400">Total Referrals</span>
          </div>
          <p className="text-2xl font-bold text-white">{mockReferrals.length}</p>
          <p className="text-xs text-slate-500">စုစုပေါင်းရည်ညွှန်းမှု</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-sm text-slate-400">Hired</span>
          </div>
          <p className="text-2xl font-bold text-white">{mockReferrals.filter(r => r.status === 'hired').length}</p>
          <p className="text-xs text-slate-500">အလုပ်ရရှိပြီ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <span className="text-sm text-slate-400">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-white">{mockReferrals.filter(r => r.status !== 'hired').length}</p>
          <p className="text-xs text-slate-500">လုပ်ဆောင်နေသည်</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-sm text-slate-400">Rewards Paid</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalEarned.toLocaleString()} MMK</p>
          <p className="text-xs text-slate-500">ပေးချေပြီးဆုကြေး</p>
        </motion.div>
      </div>

      {/* Referral Code Card */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Your Company Referral Code</h3>
              <p className="text-sm text-slate-400">Share this code with candidates / ဤကုဒ်ကို အလုပ်လျှောက်သူများနှင့် မျှဝေပါ</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-6 py-3 rounded-xl bg-slate-800 border border-white/10">
                <span className="text-xl font-mono font-bold text-teal-400">{companyReferralCode}</span>
              </div>
              <Button
                onClick={copyCode}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Overview */}
      <Card className="glass-card border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Referral Pipeline / ရည်ညွှန်းမှုပိုက်လိုင်း</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {statusStages.map((stage, idx) => {
              const count = mockReferrals.filter(r => r.status === stage.id).length;
              return (
                <div key={stage.id} className="flex items-center flex-shrink-0">
                  <div className="text-center px-4 py-3 rounded-xl bg-slate-800/50 border border-white/5 min-w-[100px]">
                    <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`} />
                    <p className="text-lg font-bold text-white">{count}</p>
                    <p className="text-xs text-slate-400">{stage.label}</p>
                    <p className="text-xs text-slate-500">{stage.labelMm}</p>
                  </div>
                  {idx < statusStages.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-slate-600 mx-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Conversion Rate */}
          <div className="p-4 rounded-xl bg-slate-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Hire Conversion Rate / အလုပ်ရရှိနှုန်း</span>
              <span className="text-sm font-bold text-teal-400">
                {Math.round((mockReferrals.filter(r => r.status === 'hired').length / mockReferrals.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={(mockReferrals.filter(r => r.status === 'hired').length / mockReferrals.length) * 100} 
              className="h-2 bg-slate-700" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <Card className="glass-card border-white/5">
        <CardHeader>
          <CardTitle className="text-white">All Referrals / ရည်ညွှန်းမှုအားလုံး</CardTitle>
          <CardDescription>Track candidate progress and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Candidate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Position</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Referral Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Reward</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockReferrals.map((referral) => {
                  const stage = statusStages.find(s => s.id === referral.status);
                  return (
                    <tr key={referral.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-white">{referral.candidateName}</p>
                          <p className="text-xs text-slate-400">{referral.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{referral.position}</td>
                      <td className="py-3 px-4">
                        <code className="text-xs text-teal-400 bg-slate-800 px-2 py-1 rounded">
                          {referral.referralCode}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`${stage?.color} text-white border-0`}
                        >
                          {stage?.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-white">{referral.reward}</p>
                          {referral.paid ? (
                            <p className="text-xs text-green-400">Paid</p>
                          ) : referral.status === 'hired' ? (
                            <p className="text-xs text-amber-400">Pending</p>
                          ) : (
                            <p className="text-xs text-slate-500">On hire</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400">{referral.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
