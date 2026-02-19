'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Target,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Briefcase,
  Building2,
  Globe,
  Star,
  PieChart,
  Activity,
  Zap,
  Brain,
  ChevronRight,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Metric card component
function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color,
  description 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {changeType === 'up' && <ArrowUp className="h-4 w-4 text-green-400" />}
        {changeType === 'down' && <ArrowDown className="h-4 w-4 text-red-400" />}
        {changeType === 'neutral' && <Minus className="h-4 w-4 text-slate-400" />}
        <span className={`text-sm ${
          changeType === 'up' ? 'text-green-400' : 
          changeType === 'down' ? 'text-red-400' : 'text-slate-400'
        }`}>
          {change}
        </span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>
    </motion.div>
  );
}

// Funnel stage component
function FunnelStage({ 
  stage, 
  count, 
  percentage, 
  color,
  avgDays 
}: { 
  stage: string; 
  count: number; 
  percentage: number;
  color: string;
  avgDays?: number;
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300">{stage}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white">{count}</span>
          {avgDays && <span className="text-xs text-slate-500">{avgDays} days avg</span>}
        </div>
      </div>
      <div className="h-8 bg-slate-800 rounded-lg overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} flex items-center justify-end pr-3`}
        >
          <span className="text-xs font-medium text-white">{percentage}%</span>
        </motion.div>
      </div>
    </div>
  );
}

// Predictive insight card
function PredictiveInsightCard({
  type,
  title,
  prediction,
  confidence,
  recommendation,
  icon: Icon,
}: {
  type: 'opportunity' | 'warning' | 'info';
  title: string;
  prediction: string;
  confidence: number;
  recommendation: string;
  icon: React.ElementType;
}) {
  const colors = {
    opportunity: 'border-green-500/20 bg-green-500/5',
    warning: 'border-amber-500/20 bg-amber-500/5',
    info: 'border-blue-500/20 bg-blue-500/5',
  };

  const iconColors = {
    opportunity: 'text-green-400',
    warning: 'text-amber-400',
    info: 'text-blue-400',
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[type]}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-slate-800`}>
          <Icon className={`h-5 w-5 ${iconColors[type]}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-white">{title}</h4>
            <Badge variant="outline" className="text-xs border-white/10 text-slate-400">
              {confidence}% confidence
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mb-2">{prediction}</p>
          <p className="text-xs text-slate-400">
            <span className="text-slate-500">Recommendation:</span> {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock analytics data
  const metrics = {
    timeToHire: { value: '18 days', change: '-12%', changeType: 'up' as const },
    costPerHire: { value: '₱245K', change: '-8%', changeType: 'up' as const },
    applicationsPerJob: { value: '47', change: '+23%', changeType: 'up' as const },
    offerAcceptRate: { value: '82%', change: '+5%', changeType: 'up' as const },
    referralHireRate: { value: '34%', change: '+15%', changeType: 'up' as const },
    retention90Day: { value: '94%', change: '+2%', changeType: 'up' as const },
  };

  const funnelData = [
    { stage: 'Applications', count: 284, percentage: 100, color: 'bg-teal-500', avgDays: null },
    { stage: 'Screened', count: 142, percentage: 50, color: 'bg-cyan-500', avgDays: 2 },
    { stage: 'Interviewed', count: 68, percentage: 24, color: 'bg-purple-500', avgDays: 5 },
    { stage: 'Offers Made', count: 28, percentage: 10, color: 'bg-amber-500', avgDays: 3 },
    { stage: 'Hired', count: 23, percentage: 8, color: 'bg-green-500', avgDays: 2 },
  ];

  const sourceData = [
    { source: 'ReferTRM Referrals', hires: 45, percentage: 34, cost: '₱50K' },
    { source: 'Job Boards', hires: 38, percentage: 29, cost: '₱120K' },
    { source: 'Direct Applications', hires: 28, percentage: 21, cost: '₱0' },
    { source: 'Social Media', hires: 15, percentage: 11, cost: '₱45K' },
    { source: 'Recruitment Agency', hires: 6, percentage: 5, cost: '₱180K' },
  ];

  const predictiveInsights = [
    {
      type: 'opportunity' as const,
      title: 'Hiring Surge Prediction',
      prediction: 'Based on historical patterns, expect 40% increase in applications during Q2.',
      confidence: 87,
      recommendation: 'Consider pre-scheduling additional screening capacity for April-May.',
      icon: TrendingUp,
    },
    {
      type: 'warning' as const,
      title: 'Offer Acceptance Risk',
      prediction: '3 candidates with pending offers show declining engagement patterns.',
      confidence: 72,
      recommendation: 'Reach out immediately with counter-offers or accelerated timelines.',
      icon: AlertTriangle,
    },
    {
      type: 'info' as const,
      title: 'Skill Gap Identified',
      prediction: 'Data Analyst applications decreased 35% while demand increased 20%.',
      confidence: 91,
      recommendation: 'Expand sourcing channels or adjust salary benchmarks for this role.',
      icon: Target,
    },
    {
      type: 'opportunity' as const,
      title: 'Referral Quality Spike',
      prediction: 'Referral hires this quarter show 23% higher retention than other sources.',
      confidence: 94,
      recommendation: 'Increase referral bonus by 15% to incentivize quality referrals.',
      icon: Star,
    },
  ];

  const departmentMetrics = [
    { name: 'Engineering', open: 12, inProgress: 8, hired: 5, avgTimeToHire: 22 },
    { name: 'Sales', open: 8, inProgress: 12, hired: 9, avgTimeToHire: 14 },
    { name: 'Marketing', open: 5, inProgress: 4, hired: 3, avgTimeToHire: 16 },
    { name: 'Operations', open: 6, inProgress: 5, hired: 4, avgTimeToHire: 12 },
    { name: 'HR', open: 2, inProgress: 1, hired: 2, avgTimeToHire: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-teal-400" />
            HR Analytics Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Insights, metrics, and predictive analytics for data-driven hiring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-white/10 hover:bg-white/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Time to Hire"
          value={metrics.timeToHire.value}
          change={metrics.timeToHire.change}
          changeType={metrics.timeToHire.changeType}
          icon={Clock}
          color="bg-teal-500"
          description="Average days from application to offer"
        />
        <MetricCard
          title="Cost per Hire"
          value={metrics.costPerHire.value}
          change={metrics.costPerHire.change}
          changeType={metrics.costPerHire.changeType}
          icon={DollarSign}
          color="bg-green-500"
          description="Total hiring cost / hires"
        />
        <MetricCard
          title="Applications per Job"
          value={metrics.applicationsPerJob.value}
          change={metrics.applicationsPerJob.change}
          changeType={metrics.applicationsPerJob.changeType}
          icon={Users}
          color="bg-purple-500"
          description="Average applications per posting"
        />
        <MetricCard
          title="Offer Acceptance Rate"
          value={metrics.offerAcceptRate.value}
          change={metrics.offerAcceptRate.change}
          changeType={metrics.offerAcceptRate.changeType}
          icon={CheckCircle2}
          color="bg-amber-500"
          description="Offers accepted / offers made"
        />
        <MetricCard
          title="Referral Hire Rate"
          value={metrics.referralHireRate.value}
          change={metrics.referralHireRate.change}
          changeType={metrics.referralHireRate.changeType}
          icon={Star}
          color="bg-pink-500"
          description="Hires from referrals / total hires"
        />
        <MetricCard
          title="90-Day Retention"
          value={metrics.retention90Day.value}
          change={metrics.retention90Day.change}
          changeType={metrics.retention90Day.changeType}
          icon={Award}
          color="bg-cyan-500"
          description="Employees retained after 90 days"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-400" />
              Hiring Funnel
            </CardTitle>
            <CardDescription>Conversion rates at each stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelData.map((stage, idx) => (
              <FunnelStage key={stage.stage} {...stage} />
            ))}
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Overall Conversion</span>
                <span className="font-medium text-teal-400">8.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Effectiveness */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-400" />
              Source Effectiveness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sourceData.map((source) => (
              <div key={source.source} className="p-3 rounded-lg bg-slate-800/50 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{source.source}</span>
                  <span className="text-sm font-medium text-teal-400">{source.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{source.hires} hires</span>
                  <span>Cost: {source.cost}/hire</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Predictive Insights
            </CardTitle>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Zap className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </div>
          <CardDescription>AI-powered predictions based on your hiring data</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictiveInsights.map((insight, idx) => (
            <PredictiveInsightCard key={idx} {...insight} />
          ))}
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card className="glass-card border-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-amber-400" />
              Department Breakdown
            </CardTitle>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-white/10 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Department</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Open Roles</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">In Progress</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Hired</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Avg Time to Hire</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentMetrics.map((dept) => (
                  <tr key={dept.name} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{dept.name}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                        {dept.open} open
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{dept.inProgress}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{dept.hired}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{dept.avgTimeToHire} days</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant="outline"
                        className={
                          dept.open <= 5 ? 'border-green-500/50 text-green-400' :
                          dept.open <= 10 ? 'border-amber-500/50 text-amber-400' :
                          'border-red-500/50 text-red-400'
                        }
                      >
                        {dept.open <= 5 ? 'On Track' : dept.open <= 10 ? 'Moderate' : 'Needs Attention'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-white/5 hover:border-teal-500/50 transition-all cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-teal-500/20">
              <Users className="h-6 w-6 text-teal-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">View All Candidates</p>
              <p className="text-sm text-slate-400">284 total applicants</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5 hover:border-purple-500/50 transition-all cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Briefcase className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Manage Job Postings</p>
              <p className="text-sm text-slate-400">33 active positions</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="glass-card border-white/5 hover:border-amber-500/50 transition-all cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20">
              <Calendar className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Interview Schedule</p>
              <p className="text-sm text-slate-400">12 interviews this week</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
