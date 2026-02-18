'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Briefcase,
  Users,
  UserPlus,
  BarChart3,
  DollarSign,
  MapPin,
  Banknote,
  Clock,
  Eye,
  Check,
  X,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Star,
  TrendingUp,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Award,
  Target,
  Zap,
  CreditCard,
  Calendar,
  Globe,
  Mail,
  Phone,
  Building,
  User,
  Flame,
  Upload,
  Image as ImageIcon,
  Settings,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Mock Data
const mockCompany = {
  id: 'comp_1',
  name: 'RK Yangon Steel',
  nameMm: 'RK ရန်ကုန်စတီး',
  logo: 'R',
  coverImage: '/company-cover.jpg',
  description: 'Leading steel manufacturing company in Myanmar, specializing in construction materials and industrial steel products.',
  descriptionMm: 'မြန်မာနိုင်ငံ၏ ထိပ်တန်း သံမဏိထုတ်လုပ်မှု ကုမ္ပဏီ၊ ဆောက်လုပ်ရေးပစ္စည်းများနှင့် စက်မှုသံမဏိထုတ်ကုန်များတွင် စီးပွားရေးလုပ်ငန်း။',
  industry: 'Manufacturing',
  size: '201-500',
  location: 'Thanlyin, Yangon',
  website: 'https://rkyangonsteel.com',
  email: 'hr@rkyangonsteel.com',
  phone: '+95 1 234 5678',
  founded: '2008',
  headquarters: 'Yangon, Myanmar',
  totalJobs: 12,
  totalApplicants: 47,
  totalHires: 8,
  plan: 'gold',
};

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
  },
];

const mockApplicants = [
  {
    id: 'app_1',
    jobId: 'job_1',
    jobTitle: 'Senior Supervisor',
    candidateName: 'U Myint Swe',
    candidatePhone: '+95 9 123 456 789',
    candidateEmail: 'myintswe@email.com',
    cvUrl: '/cvs/cv_myint_swe.pdf',
    status: 'pending',
    referralCode: 'REFABC12',
    referrerName: 'Ko Aung',
    appliedAt: '2024-01-17',
  },
  {
    id: 'app_2',
    jobId: 'job_1',
    jobTitle: 'Senior Supervisor',
    candidateName: 'Daw Khin Hla',
    candidatePhone: '+95 9 234 567 890',
    candidateEmail: 'khinhla@email.com',
    cvUrl: '/cvs/cv_khin_hla.pdf',
    status: 'reviewed',
    referralCode: 'REFDEF34',
    referrerName: 'Ma Mya',
    appliedAt: '2024-01-16',
  },
  {
    id: 'app_3',
    jobId: 'job_1',
    jobTitle: 'Senior Supervisor',
    candidateName: 'U Tun Aung',
    candidatePhone: '+95 9 345 678 901',
    candidateEmail: 'tunaung@email.com',
    cvUrl: '/cvs/cv_tun_aung.pdf',
    status: 'interviewed',
    referralCode: 'REFGHI56',
    referrerName: 'Ko Zaw',
    appliedAt: '2024-01-15',
  },
  {
    id: 'app_4',
    jobId: 'job_2',
    jobTitle: 'Warehouse Supervisor',
    candidateName: 'Mg Htet Naing',
    candidatePhone: '+95 9 456 789 012',
    candidateEmail: 'htetnaing@email.com',
    cvUrl: '/cvs/cv_htet_naing.pdf',
    status: 'hired',
    referralCode: 'REFJKL78',
    referrerName: 'Ko Win',
    appliedAt: '2024-01-12',
    hiredAt: '2024-01-18',
    rewardPaid: true,
    rewardAmount: 200000,
  },
  {
    id: 'app_5',
    jobId: 'job_1',
    jobTitle: 'Senior Supervisor',
    candidateName: 'Daw Su Su',
    candidatePhone: '+95 9 567 890 123',
    candidateEmail: 'susu@email.com',
    cvUrl: '/cvs/cv_su_su.pdf',
    status: 'rejected',
    referralCode: 'REFMNO90',
    referrerName: 'Ma Lwin',
    appliedAt: '2024-01-14',
  },
];

const mockReferrals = [
  {
    id: 'ref_1',
    referrerName: 'Ko Aung',
    referrerCode: 'REFABC12',
    candidateName: 'U Myint Swe',
    jobTitle: 'Senior Supervisor',
    status: 'pending',
    rewardAmount: 300000,
    paidAt: null,
    appliedAt: '2024-01-17',
  },
  {
    id: 'ref_2',
    referrerName: 'Ko Win',
    referrerCode: 'REFJKL78',
    candidateName: 'Mg Htet Naing',
    jobTitle: 'Warehouse Supervisor',
    status: 'paid',
    rewardAmount: 200000,
    paidAt: '2024-01-20',
    appliedAt: '2024-01-12',
  },
  {
    id: 'ref_3',
    referrerName: 'Ma Mya',
    referrerCode: 'REFDEF34',
    candidateName: 'Daw Khin Hla',
    jobTitle: 'Senior Supervisor',
    status: 'pending',
    rewardAmount: 300000,
    paidAt: null,
    appliedAt: '2024-01-16',
  },
];

const mockAnalytics = {
  totalViews: 1250,
  totalApplications: 47,
  totalHires: 8,
  totalSpent: 2400000,
  avgCostPerHire: 300000,
  conversionRate: 17.02,
  jobsByStatus: { active: 2, closed: 1, draft: 1 },
  applicationsByStatus: { pending: 15, reviewed: 12, interviewed: 8, hired: 8, rejected: 4 },
  viewsOverTime: [
    { date: 'Jan 1', views: 45 },
    { date: 'Jan 5', views: 78 },
    { date: 'Jan 10', views: 92 },
    { date: 'Jan 15', views: 156 },
    { date: 'Jan 20', views: 234 },
  ],
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  draft: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  pending: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  reviewed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  interviewed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  hired: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  paid: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

const levelColors: Record<string, string> = {
  Entry: 'text-green-400 border-green-500/30 bg-green-500/10',
  Mid: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  Senior: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
};

const industryOptions = [
  'Manufacturing', 'Technology', 'Finance', 'Healthcare', 'Education', 
  'Retail', 'Construction', 'Hospitality', 'Logistics', 'Other'
];

const sizeOptions = ['1-50', '51-200', '201-500', '500+'];

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPostJob, setShowPostJob] = useState(false);
  const [editingJob, setEditingJob] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [profileForm, setProfileForm] = useState(mockCompany);
  const [jobForm, setJobForm] = useState({
    title: '',
    titleMm: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    reward: '',
    skills: '',
    type: 'Full-time',
    level: 'Mid',
    description: '',
    urgent: false,
    featured: false,
  });

  const handleSaveProfile = () => {
    // Save profile logic here
    setEditingProfile(false);
  };

  const handlePostJob = () => {
    // Post job logic here
    setShowPostJob(false);
    setJobForm({
      title: '',
      titleMm: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      reward: '',
      skills: '',
      type: 'Full-time',
      level: 'Mid',
      description: '',
      urgent: false,
      featured: false,
    });
  };

  const handleUpdateApplicantStatus = (applicantId: string, newStatus: string) => {
    // Update status logic here
    console.log(`Updating applicant ${applicantId} to ${newStatus}`);
  };

  const handleDeleteJob = (jobId: string) => {
    // Delete job logic here
    console.log(`Deleting job ${jobId}`);
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredApplicants = mockApplicants.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="h-7 w-7 text-teal-400" />
            Company Dashboard
          </h1>
          <p className="text-slate-400 burmese-text">ကုမ္ပဏီ ဒယ်ရှ်ဘုတ် - အလုပ်ကြော်ငြာများနှင့် လျှောက်လွှာများ စီမံခန့်ခွဲပါ</p>
        </div>
        <div className="flex gap-3">
          <Button
            className="btn-primary"
            onClick={() => setShowPostJob(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: mockCompany.totalJobs, icon: Briefcase, color: 'teal', change: '+2 this month' },
          { label: 'Total Applicants', value: mockCompany.totalApplicants, icon: Users, color: 'blue', change: '+15 this week' },
          { label: 'Total Hires', value: mockCompany.totalHires, icon: Check, color: 'green', change: '+3 this month' },
          { label: 'Total Spent', value: '2.4M', suffix: 'MMK', icon: DollarSign, color: 'amber', change: 'This month' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card-hover bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-500/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
                  <Badge className={`bg-${stat.color}-500/20 text-${stat.color}-400 border-${stat.color}-500/30 text-xs`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix && <span className="text-lg text-slate-400 ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-card p-1 mb-6 grid grid-cols-3 lg:grid-cols-6 gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Overview
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Profile
          </TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="applicants" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Applicants
          </TabsTrigger>
          <TabsTrigger value="referrals" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Referrals
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-teal-400" />
                    Company Info
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                      {mockCompany.logo}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{mockCompany.name}</h4>
                      <p className="text-sm text-slate-400 burmese-text">{mockCompany.nameMm}</p>
                      <Badge className="mt-1 bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <Star className="h-3 w-3 mr-1" />
                        {mockCompany.plan} Plan
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="h-4 w-4 text-teal-400" />
                      {mockCompany.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Globe className="h-4 w-4 text-teal-400" />
                      {mockCompany.website}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="h-4 w-4 text-teal-400" />
                      {mockCompany.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="h-4 w-4 text-teal-400" />
                      {mockCompany.phone}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-400 line-clamp-3">{mockCompany.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-teal-400" />
                    Recent Jobs
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-400 hover:text-teal-300"
                    onClick={() => setActiveTab('jobs')}
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockJobs.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-white flex items-center gap-2">
                              {job.title}
                              {job.urgent && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                  <Flame className="h-3 w-3 mr-1" />Urgent
                                </Badge>
                              )}
                              {job.featured && (
                                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                  <Star className="h-3 w-3 mr-1" />Featured
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-slate-400">{job.location}</p>
                          </div>
                          <Badge className={statusColors[job.status]}>
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-amber-400 flex items-center gap-1">
                            <Banknote className="h-3 w-3" />
                            {(job.salaryMin / 100000).toFixed(1)}-{(job.salaryMax / 100000).toFixed(1)}L
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {job.views} views
                          </span>
                          <span className="text-teal-400 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applications} applicants
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Applicants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-400" />
                  Recent Applicants
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal-400 hover:text-teal-300"
                  onClick={() => setActiveTab('applicants')}
                >
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Candidate</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Position</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Referrer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockApplicants.slice(0, 5).map((applicant) => (
                        <tr
                          key={applicant.id}
                          className="border-b border-white/5 hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedApplicant(applicant.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                                {applicant.candidateName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{applicant.candidateName}</p>
                                <p className="text-xs text-slate-500">{applicant.candidateEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{applicant.jobTitle}</td>
                          <td className="py-3 px-4">
                            <span className="text-teal-400">{applicant.referrerName}</span>
                            <span className="text-slate-500 text-xs ml-1">({applicant.referralCode})</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={statusColors[applicant.status]}>
                              {applicant.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-sm">{applicant.appliedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-teal-400" />
                  Company Profile
                </h3>
                {!editingProfile ? (
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => setEditingProfile(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-white/10"
                      onClick={() => {
                        setEditingProfile(false);
                        setProfileForm(mockCompany);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button className="btn-primary" onClick={handleSaveProfile}>
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Logo & Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-white">
                        {profileForm.logo}
                      </div>
                      {editingProfile && (
                        <Button variant="outline" className="border-white/10">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400 mb-2 block">Company Name</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white font-medium">{profileForm.name}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-400 mb-2 block">Burmese Name</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.nameMm || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, nameMm: e.target.value })}
                            className="form-input burmese-text"
                          />
                        ) : (
                          <p className="text-white font-medium burmese-text">{profileForm.nameMm}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-400 mb-2 block">Description</Label>
                      {editingProfile ? (
                        <Textarea
                          value={profileForm.description || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                          className="form-input min-h-24"
                        />
                      ) : (
                        <p className="text-slate-300">{profileForm.description}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-slate-400 mb-2 block">Burmese Description</Label>
                      {editingProfile ? (
                        <Textarea
                          value={profileForm.descriptionMm || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, descriptionMm: e.target.value })}
                          className="form-input min-h-20 burmese-text"
                        />
                      ) : (
                        <p className="text-slate-300 burmese-text">{profileForm.descriptionMm}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact & Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400 mb-2 block">Industry</Label>
                        {editingProfile ? (
                          <select
                            value={profileForm.industry}
                            onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })}
                            className="form-input w-full"
                          >
                            {industryOptions.map((ind) => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-white">{profileForm.industry}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-400 mb-2 block">Company Size</Label>
                        {editingProfile ? (
                          <select
                            value={profileForm.size}
                            onChange={(e) => setProfileForm({ ...profileForm, size: e.target.value })}
                            className="form-input w-full"
                          >
                            {sizeOptions.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-white">{profileForm.size} employees</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400 mb-2 block">Location</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.location}
                            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-teal-400" />
                            {profileForm.location}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-400 mb-2 block">Headquarters</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.headquarters || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, headquarters: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white">{profileForm.headquarters}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400 mb-2 block">Website</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.website || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white flex items-center gap-2">
                            <Globe className="h-4 w-4 text-teal-400" />
                            {profileForm.website}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-400 mb-2 block">Founded</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.founded || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, founded: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white">{profileForm.founded}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400 mb-2 block">Contact Email</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.email || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white flex items-center gap-2">
                            <Mail className="h-4 w-4 text-teal-400" />
                            {profileForm.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-400 mb-2 block">Contact Phone</Label>
                        {editingProfile ? (
                          <Input
                            value={profileForm.phone || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="form-input"
                          />
                        ) : (
                          <p className="text-white flex items-center gap-2">
                            <Phone className="h-4 w-4 text-teal-400" />
                            {profileForm.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-teal-400" />
                  Job Listings
                </h3>
                <Button className="btn-primary" onClick={() => setShowPostJob(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </CardHeader>
              <CardContent>
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jobs..."
                      className="form-input pl-12 w-full"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="form-input px-4 py-2 rounded-xl bg-slate-800 border-white/10 text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Jobs List */}
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="text-lg font-bold text-white">{job.title}</h4>
                            <Badge className={statusColors[job.status]}>
                              {job.status}
                            </Badge>
                            {job.urgent && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                <Flame className="h-3 w-3 mr-1" />Urgent
                              </Badge>
                            )}
                            {job.featured && (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                <Star className="h-3 w-3 mr-1" />Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 burmese-text mb-3">{job.titleMm}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                            <span className="text-slate-300 flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-teal-400" />
                              {job.location}
                            </span>
                            <span className="text-amber-400 flex items-center gap-1">
                              <Banknote className="h-4 w-4" />
                              {(job.salaryMin / 100000).toFixed(1)}-{(job.salaryMax / 100000).toFixed(1)} Lakhs
                            </span>
                            <span className="text-purple-400 flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              {job.level}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-slate-700 text-slate-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {job.views} views
                            </span>
                            <span className="text-teal-400 flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applications} applicants
                            </span>
                            <span className="text-green-400 flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {(job.reward / 1000)}K reward
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/10"
                            onClick={() => {
                              setEditingJob(job.id);
                              setJobForm({
                                title: job.title,
                                titleMm: job.titleMm || '',
                                location: job.location,
                                salaryMin: String(job.salaryMin),
                                salaryMax: String(job.salaryMax),
                                reward: String(job.reward),
                                skills: job.skills.join(', '),
                                type: job.type,
                                level: job.level,
                                description: '',
                                urgent: job.urgent,
                                featured: job.featured,
                              });
                              setShowPostJob(true);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applicants" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-400" />
                  Applicants
                </h3>
              </CardHeader>
              <CardContent>
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search applicants..."
                      className="form-input pl-12 w-full"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="form-input px-4 py-2 rounded-xl bg-slate-800 border-white/10 text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Applicants Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Candidate</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Position</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Contact</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Referrer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplicants.map((applicant) => (
                        <tr
                          key={applicant.id}
                          className="border-b border-white/5 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                {applicant.candidateName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{applicant.candidateName}</p>
                                <p className="text-xs text-slate-500">{applicant.appliedAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{applicant.jobTitle}</td>
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              <p className="text-slate-300">{applicant.candidatePhone}</p>
                              <p className="text-slate-500">{applicant.candidateEmail}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-teal-400">{applicant.referrerName}</span>
                            <span className="text-xs text-slate-500 ml-1">({applicant.referralCode})</span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={applicant.status}
                              onChange={(e) => handleUpdateApplicantStatus(applicant.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                                statusColors[applicant.status]
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="interviewed">Interviewed</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/10"
                                onClick={() => window.open(applicant.cvUrl, '_blank')}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-teal-500/30 text-teal-400"
                                onClick={() => setSelectedApplicant(applicant.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-teal-400" />
                  Referral Tracking
                </h3>
                <div className="flex gap-3">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Total Pending: 800K MMK
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Check className="h-3 w-3 mr-1" />
                    Total Paid: 200K MMK
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Referrer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Code</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Candidate</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Position</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Reward</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReferrals.map((referral) => (
                        <tr
                          key={referral.id}
                          className="border-b border-white/5 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                                {referral.referrerName.charAt(0)}
                              </div>
                              <span className="text-white">{referral.referrerName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <code className="px-2 py-1 bg-slate-800 rounded text-teal-400 text-sm">
                              {referral.referrerCode}
                            </code>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{referral.candidateName}</td>
                          <td className="py-4 px-4 text-slate-300">{referral.jobTitle}</td>
                          <td className="py-4 px-4">
                            <span className="text-amber-400 font-medium">
                              {(referral.rewardAmount / 1000)}K MMK
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={statusColors[referral.status]}>
                              {referral.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-slate-400 text-sm">
                            {referral.paidAt || referral.appliedAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-400" />
                  Hiring Analytics
                </h3>
              </CardHeader>
              <CardContent>
                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-teal-400" />
                      <span className="text-slate-400">Total Views</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{mockAnalytics.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />+12% from last month
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <span className="text-slate-400">Applications</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{mockAnalytics.totalApplications}</div>
                    <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />+8 from last month
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-slate-400">Total Hires</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{mockAnalytics.totalHires}</div>
                    <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />+3 this month
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-amber-400" />
                      <span className="text-slate-400">Conversion Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{mockAnalytics.conversionRate}%</div>
                    <div className="text-sm text-slate-400 mt-1">Applications to Hires</div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Applications by Status */}
                  <div className="p-5 rounded-xl bg-slate-800/50">
                    <h4 className="text-white font-medium mb-4">Applications by Status</h4>
                    <div className="space-y-3">
                      {Object.entries(mockAnalytics.applicationsByStatus).map(([status, count]) => (
                        <div key={status}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-400 capitalize">{status}</span>
                            <span className="text-white">{count}</span>
                          </div>
                          <Progress
                            value={(count / mockAnalytics.totalApplications) * 100}
                            className="h-2 bg-slate-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="p-5 rounded-xl bg-slate-800/50">
                    <h4 className="text-white font-medium mb-4">Cost Breakdown</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Spent</span>
                        <span className="text-xl font-bold text-amber-400">
                          {(mockAnalytics.totalSpent / 1000000).toFixed(1)}M MMK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Avg Cost per Hire</span>
                        <span className="text-lg font-medium text-teal-400">
                          {(mockAnalytics.avgCostPerHire / 1000)}K MMK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Referral Rewards Paid</span>
                        <span className="text-lg font-medium text-green-400">200K MMK</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Success Fees</span>
                        <span className="text-lg font-medium text-purple-400">400K MMK</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Views Over Time - Simple Chart */}
                <div className="mt-6 p-5 rounded-xl bg-slate-800/50">
                  <h4 className="text-white font-medium mb-4">Views Over Time</h4>
                  <div className="flex items-end gap-2 h-40">
                    {mockAnalytics.viewsOverTime.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-teal-500 to-cyan-500 rounded-t-lg transition-all hover:from-teal-400 hover:to-cyan-400"
                          style={{ height: `${(data.views / 250) * 100}%` }}
                        />
                        <span className="text-xs text-slate-500 mt-2">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => {
              setShowPostJob(false);
              setEditingJob(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-card p-6 bg-slate-900 my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowPostJob(false);
                  setEditingJob(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">
                {editingJob ? 'Edit Job' : 'Post New Job'}
              </h2>

              <div className="space-y-5">
                {/* Job Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 mb-2 block">Job Title *</Label>
                    <Input
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      placeholder="e.g., Senior Supervisor"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 mb-2 block">Burmese Title</Label>
                    <Input
                      value={jobForm.titleMm}
                      onChange={(e) => setJobForm({ ...jobForm, titleMm: e.target.value })}
                      placeholder="အကြီးတန်း ကြီးကြပ်ရေးမှူး"
                      className="form-input burmese-text"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-slate-400 mb-2 block">Location *</Label>
                  <Input
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g., Thanlyin, Yangon"
                    className="form-input"
                  />
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 mb-2 block">Min Salary (MMK) *</Label>
                    <Input
                      type="number"
                      value={jobForm.salaryMin}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                      placeholder="750000"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 mb-2 block">Max Salary (MMK) *</Label>
                    <Input
                      type="number"
                      value={jobForm.salaryMax}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                      placeholder="1000000"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Reward */}
                <div>
                  <Label className="text-slate-400 mb-2 block">Referral Reward (MMK) *</Label>
                  <Input
                    type="number"
                    value={jobForm.reward}
                    onChange={(e) => setJobForm({ ...jobForm, reward: e.target.value })}
                    placeholder="300000"
                    className="form-input"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Amount paid to referrer when candidate is hired
                  </p>
                </div>

                {/* Job Type & Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 mb-2 block">Job Type</Label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                      className="form-input w-full"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-slate-400 mb-2 block">Experience Level</Label>
                    <select
                      value={jobForm.level}
                      onChange={(e) => setJobForm({ ...jobForm, level: e.target.value })}
                      className="form-input w-full"
                    >
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label className="text-slate-400 mb-2 block">Skills Required</Label>
                  <Input
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    placeholder="e.g., Leadership, Manufacturing, Management"
                    className="form-input"
                  />
                  <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-slate-400 mb-2 block">Job Description</Label>
                  <Textarea
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="form-input min-h-24"
                  />
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={jobForm.urgent}
                      onCheckedChange={(checked) => setJobForm({ ...jobForm, urgent: checked })}
                    />
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Flame className="h-4 w-4 text-red-400" />
                      Mark as Urgent
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={jobForm.featured}
                      onCheckedChange={(checked) => setJobForm({ ...jobForm, featured: checked })}
                    />
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-400" />
                      Featured Job
                    </Label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/10"
                    onClick={() => {
                      setShowPostJob(false);
                      setEditingJob(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 btn-primary" onClick={handlePostJob}>
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applicant Detail Modal */}
      <AnimatePresence>
        {selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedApplicant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-card p-6 bg-slate-900 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const applicant = mockApplicants.find(a => a.id === selectedApplicant);
                if (!applicant) return null;
                
                return (
                  <>
                    <button
                      onClick={() => setSelectedApplicant(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white"
                    >
                      <X className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                        {applicant.candidateName.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{applicant.candidateName}</h2>
                        <p className="text-slate-400">{applicant.jobTitle}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-slate-800/50">
                          <div className="text-xs text-slate-500 mb-1">Phone</div>
                          <div className="text-white flex items-center gap-2">
                            <Phone className="h-4 w-4 text-teal-400" />
                            {applicant.candidatePhone}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/50">
                          <div className="text-xs text-slate-500 mb-1">Email</div>
                          <div className="text-white flex items-center gap-2">
                            <Mail className="h-4 w-4 text-teal-400" />
                            {applicant.candidateEmail}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/50">
                        <div className="text-xs text-slate-500 mb-1">Referred By</div>
                        <div className="text-white">
                          <span className="text-teal-400">{applicant.referrerName}</span>
                          <code className="ml-2 px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
                            {applicant.referralCode}
                          </code>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/50">
                        <div className="text-xs text-slate-500 mb-1">Status</div>
                        <select
                          value={applicant.status}
                          onChange={(e) => handleUpdateApplicantStatus(applicant.id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium border ${
                            statusColors[applicant.status]
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="text-xs text-slate-500 mb-1">Applied On</div>
                        <div className="text-amber-400">{applicant.appliedAt}</div>
                      </div>

                      <Button
                        className="w-full btn-primary"
                        onClick={() => window.open(applicant.cvUrl, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download CV
                      </Button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
