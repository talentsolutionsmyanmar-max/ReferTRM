'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  MapPin,
  Banknote,
  Clock,
  Users,
  Flame,
  Star,
  X,
  Check,
  Calendar,
  AlertCircle,
  ChevronRight,
  Copy,
  ExternalLink,
  Send,
  Award,
  Globe,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Mock job data
const mockJobs = [
  {
    id: 'job_1',
    title: 'Senior Supervisor',
    titleMm: 'အကြီးတန်း ကြီးကြပ်ရေးမှူး',
    location: 'Thanlyin',
    salaryMin: 750000,
    salaryMax: 1000000,
    reward: 300000,
    skills: ['Leadership', 'Manufacturing', 'Management'],
    type: 'Full-time',
    level: 'Senior',
    status: 'active',
    urgent: true,
    featured: true,
    views: 234,
    applications: 12,
    createdAt: '2024-01-15',
    expiresAt: '2024-02-15',
    description: 'We are looking for an experienced Senior Supervisor to manage our production team...',
    requirements: ['5+ years experience', 'Leadership skills', 'Manufacturing background'],
  },
  {
    id: 'job_2',
    title: 'Warehouse Supervisor',
    titleMm: 'ကုန်စုံထိန်းသိမ်းရေး ကြီးကြပ်မှု',
    location: 'Thingangyun',
    salaryMin: 500000,
    salaryMax: 700000,
    reward: 200000,
    skills: ['Inventory', 'Logistics', 'Team Management'],
    type: 'Full-time',
    level: 'Mid',
    status: 'active',
    urgent: false,
    featured: false,
    views: 156,
    applications: 8,
    createdAt: '2024-01-10',
    expiresAt: '2024-02-10',
    description: 'Manage warehouse operations and inventory control...',
    requirements: ['3+ years experience', 'Logistics knowledge', 'Team management'],
  },
  {
    id: 'job_3',
    title: 'Quality Control Inspector',
    titleMm: 'အရည်အသွေး ထိန်းချုပ်ရေး စစ်ဆေးသူ',
    location: 'Thanlyin',
    salaryMin: 400000,
    salaryMax: 600000,
    reward: 150000,
    skills: ['Quality Control', 'Inspection', 'Manufacturing'],
    type: 'Full-time',
    level: 'Mid',
    status: 'closed',
    urgent: false,
    featured: false,
    views: 89,
    applications: 5,
    createdAt: '2023-12-20',
    expiresAt: '2024-01-20',
    description: 'Inspect products for quality assurance...',
    requirements: ['2+ years experience', 'Attention to detail', 'QC certification'],
  },
  {
    id: 'job_4',
    title: 'Machine Operator',
    titleMm: 'စက်ကိရိယာ လည်ပတ်သူ',
    location: 'Thanlyin',
    salaryMin: 300000,
    salaryMax: 450000,
    reward: 100000,
    skills: ['Machine Operation', 'Safety', 'Manufacturing'],
    type: 'Full-time',
    level: 'Entry',
    status: 'draft',
    urgent: false,
    featured: false,
    views: 0,
    applications: 0,
    createdAt: '2024-01-18',
    expiresAt: null,
    description: 'Operate manufacturing machinery...',
    requirements: ['Basic technical skills', 'Safety awareness', 'Willingness to learn'],
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500 border-green-500/30',
  closed: 'bg-slate-500/10 text-slate-500 border-slate-500/30',
  draft: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
};

const levelColors: Record<string, string> = {
  Entry: 'text-green-500 border-green-500/30 bg-green-500/10',
  Mid: 'text-blue-500 border-blue-500/30 bg-blue-500/10',
  Senior: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
};

const skillOptions = [
  'Leadership', 'Management', 'Communication', 'Problem Solving',
  'Manufacturing', 'Quality Control', 'Logistics', 'Sales',
  'Marketing', 'Finance', 'IT', 'Customer Service',
];

const myanmarLocations = [
  'Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Magway',
  'Sagaing', 'Taunggyi', 'Mawlamyine', 'Pathein', 'Other',
];

export default function JobsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [editingJob, setEditingJob] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    titleMm: '',
    location: 'Yangon',
    salaryMin: '',
    salaryMax: '',
    reward: '',
    skills: [] as string[],
    type: 'Full-time',
    level: 'Mid',
    description: '',
    requirements: '',
    urgent: false,
    featured: false,
  });

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateJob = () => {
    // Create job logic
    setShowCreateJob(false);
    resetForm();
  };

  const handleUpdateJob = () => {
    // Update job logic
    setEditingJob(null);
    resetForm();
  };

  const handleDeleteJob = (jobId: string) => {
    // Delete job logic
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setJobForm({
      title: '',
      titleMm: '',
      location: 'Yangon',
      salaryMin: '',
      salaryMax: '',
      reward: '',
      skills: [],
      type: 'Full-time',
      level: 'Mid',
      description: '',
      requirements: '',
      urgent: false,
      featured: false,
    });
  };

  const toggleSkill = (skill: string) => {
    setJobForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill].slice(0, 5),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-teal-500" />
            Job Postings
          </h1>
          <p className="text-muted-foreground">Manage your job listings and track performance</p>
        </div>
        <Button className="btn-primary" onClick={() => setShowCreateJob(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: mockJobs.filter(j => j.status === 'active').length, icon: Briefcase, color: 'teal' },
          { label: 'Total Views', value: mockJobs.reduce((s, j) => s + j.views, 0), icon: Eye, color: 'blue' },
          { label: 'Applications', value: mockJobs.reduce((s, j) => s + j.applications, 0), icon: Users, color: 'purple' },
          { label: 'Total Rewards', value: `${(mockJobs.reduce((s, j) => s + j.reward, 0) / 1000).toFixed(0)}K`, icon: Banknote, color: 'amber' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="bg-card border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title or location..."
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border border-border hover:border-teal-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left - Job Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                      <Badge className={statusColors[job.status]}>
                        {job.status}
                      </Badge>
                      {job.urgent && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/30">
                          <Flame className="h-3 w-3 mr-1" />Urgent
                        </Badge>
                      )}
                      {job.featured && (
                        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                          <Star className="h-3 w-3 mr-1" />Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground burmese-text mb-3">{job.titleMm}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-teal-500" />
                        {job.location}
                      </span>
                      <span className="text-amber-500 flex items-center gap-1">
                        <Banknote className="h-4 w-4" />
                        {(job.salaryMin / 100000).toFixed(1)}-{(job.salaryMax / 100000).toFixed(1)} Lakhs MMK
                      </span>
                      <Badge className={levelColors[job.level]}>
                        {job.level} Level
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-border text-muted-foreground text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {job.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applications} applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Expires: {job.expiresAt || 'Not set'}
                      </span>
                    </div>
                  </div>

                  {/* Right - Reward & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Referral Reward</div>
                      <div className="text-xl font-bold text-amber-500">{(job.reward / 1000).toFixed(0)}K MMK</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={() => setSelectedJob(job.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={() => {
                          setEditingJob(job.id);
                          setJobForm({
                            title: job.title,
                            titleMm: job.titleMm,
                            location: job.location,
                            salaryMin: (job.salaryMin / 1000).toString(),
                            salaryMax: (job.salaryMax / 1000).toString(),
                            reward: (job.reward / 1000).toString(),
                            skills: job.skills,
                            type: job.type,
                            level: job.level,
                            description: job.description,
                            requirements: job.requirements.join(', '),
                            urgent: job.urgent,
                            featured: job.featured,
                          });
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        onClick={() => setShowDeleteConfirm(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Job Modal */}
      <AnimatePresence>
        {(showCreateJob || editingJob) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => { setShowCreateJob(false); setEditingJob(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowCreateJob(false); setEditingJob(null); }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingJob ? 'Edit Job' : 'Post New Job'}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Job Title (English)</Label>
                    <Input
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      placeholder="e.g., Senior Supervisor"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Job Title (Burmese)</Label>
                    <Input
                      value={jobForm.titleMm}
                      onChange={(e) => setJobForm({ ...jobForm, titleMm: e.target.value })}
                      placeholder="မြန်မာလို ခေါင်းစဉ်"
                      className="bg-background border-border burmese-text"
                    />
                  </div>
                </div>

                {/* Location & Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Location</Label>
                    <select
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      {myanmarLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Job Level</Label>
                    <select
                      value={jobForm.level}
                      onChange={(e) => setJobForm({ ...jobForm, level: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Min Salary (K MMK)</Label>
                    <Input
                      type="number"
                      value={jobForm.salaryMin}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                      placeholder="500"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Max Salary (K MMK)</Label>
                    <Input
                      type="number"
                      value={jobForm.salaryMax}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                      placeholder="700"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-2 block">Referral Reward (K MMK)</Label>
                    <Input
                      type="number"
                      value={jobForm.reward}
                      onChange={(e) => setJobForm({ ...jobForm, reward: e.target.value })}
                      placeholder="200"
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label className="text-muted-foreground mb-2 block">Required Skills (Select up to 5)</Label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          jobForm.skills.includes(skill)
                            ? 'bg-teal-500 text-white'
                            : 'bg-background border border-border text-foreground hover:border-teal-500/30'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-muted-foreground mb-2 block">Job Description</Label>
                  <Textarea
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="bg-background border-border min-h-24"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <Label className="text-muted-foreground mb-2 block">Requirements (comma separated)</Label>
                  <Textarea
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    placeholder="e.g., 5+ years experience, Leadership skills, Manufacturing background"
                    className="bg-background border-border min-h-20"
                  />
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobForm.urgent}
                      onChange={(e) => setJobForm({ ...jobForm, urgent: e.target.checked })}
                      className="w-5 h-5 rounded border-border text-teal-500 focus:ring-teal-500/30"
                    />
                    <span className="text-foreground">Mark as Urgent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobForm.featured}
                      onChange={(e) => setJobForm({ ...jobForm, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-border text-teal-500 focus:ring-teal-500/30"
                    />
                    <span className="text-foreground">Feature this Job</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="flex-1 border-border"
                    onClick={() => { setShowCreateJob(false); setEditingJob(null); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 btn-primary"
                    onClick={editingJob ? handleUpdateJob : handleCreateJob}
                  >
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Delete Job?</h3>
                <p className="text-muted-foreground mb-6">
                  This action cannot be undone. All applications for this job will also be removed.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-border"
                    onClick={() => setShowDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => showDeleteConfirm && handleDeleteJob(showDeleteConfirm)}
                  >
                    Delete Job
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
