'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Settings,
  LogOut,
  Crown,
  Star,
  Flame,
  BarChart3,
  LineChart,
  PieChart,
  Menu,
  X,
  Eye,
  Edit,
  Trash2,
  Check,
  XCircle,
  ChevronDown,
  Search,
  Bell,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Sidebar Navigation Items
const adminNavigation = [
  { name: 'Dashboard', nameMm: 'ပင်မစာမျက်နှာ', href: '/admin', icon: Home },
  { name: 'Manage Users', nameMm: 'အသုံးပြုသူများ', href: '/admin/users', icon: Users },
  { name: 'Manage Jobs', nameMm: 'အလုပ်များ', href: '/admin/jobs', icon: Briefcase },
  { name: 'Manage Companies', nameMm: 'ကုမ္ပဏီများ', href: '/admin/companies', icon: Building2 },
  { name: 'Analytics', nameMm: 'ခွဲခြမ်းစိတ်ဖြာမှု', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', nameMm: 'ဆက်တင်များ', href: '/admin/settings', icon: Settings },
];

// Mock Data for Dashboard
const statsData = [
  { 
    label: 'Total Users', 
    labelMm: 'စုစုပေါင်းအသုံးပြုသူ', 
    value: '12,847', 
    change: '+12.5%', 
    changeType: 'up',
    icon: Users, 
    color: 'text-teal-400',
    bgColor: 'from-teal-500/20 to-cyan-500/20',
    borderColor: 'border-teal-500/30'
  },
  { 
    label: 'Total Jobs', 
    labelMm: 'စုစုပေါင်းအလုပ်', 
    value: '384', 
    change: '+8.3%', 
    changeType: 'up',
    icon: Briefcase, 
    color: 'text-amber-400',
    bgColor: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30'
  },
  { 
    label: 'Total Companies', 
    labelMm: 'စုစုပေါင်းကုမ္ပဏီ', 
    value: '156', 
    change: '+5.2%', 
    changeType: 'up',
    icon: Building2, 
    color: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  { 
    label: 'Total Referrals', 
    labelMm: 'စုစုပေါင်းရည်ညွှန်းမှု', 
    value: '8,234', 
    change: '+23.1%', 
    changeType: 'up',
    icon: TrendingUp, 
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30'
  },
  { 
    label: 'Revenue (MMK)', 
    labelMm: 'ဝင်ငွေ', 
    value: '45.2M', 
    change: '+18.7%', 
    changeType: 'up',
    icon: DollarSign, 
    color: 'text-pink-400',
    bgColor: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30'
  },
  { 
    label: 'Active Sessions', 
    labelMm: 'အသက်ဝင်နေသော', 
    value: '1,423', 
    change: '-2.4%', 
    changeType: 'down',
    icon: Activity, 
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-500/30'
  },
];

// Mock Users Data
const usersData = [
  { id: 1, name: 'Thiri Aung', email: 'thiri@email.com', role: 'User', points: 4520, level: 'Expert', streak: 15, status: 'active', joinedAt: '2024-01-15' },
  { id: 2, name: 'Aung Min', email: 'aung.min@email.com', role: 'User', points: 3280, level: 'Professional', streak: 8, status: 'active', joinedAt: '2024-02-20' },
  { id: 3, name: 'Su Myat Khin', email: 'sumyat@email.com', role: 'Premium', points: 8920, level: 'Master', streak: 45, status: 'active', joinedAt: '2023-11-10' },
  { id: 4, name: 'Zaw Zaw', email: 'zaw.zaw@email.com', role: 'User', points: 1850, level: 'Amateur', streak: 3, status: 'inactive', joinedAt: '2024-03-05' },
  { id: 5, name: 'Mya Mya', email: 'mya.mya@email.com', role: 'Company', points: 5640, level: 'Professional', streak: 22, status: 'active', joinedAt: '2024-01-28' },
  { id: 6, name: 'Ko Ko', email: 'koko@email.com', role: 'Admin', points: 12400, level: 'Master', streak: 60, status: 'active', joinedAt: '2023-09-15' },
  { id: 7, name: 'Nilar Oo', email: 'nilar@email.com', role: 'User', points: 2980, level: 'Professional', streak: 12, status: 'active', joinedAt: '2024-02-10' },
  { id: 8, name: 'Than Htike', email: 'thanhtike@email.com', role: 'Premium', points: 6750, level: 'Expert', streak: 30, status: 'active', joinedAt: '2024-01-05' },
];

// Mock Jobs Data
const jobsData = [
  { id: 1, title: 'Senior Software Engineer', company: 'Tech Myanmar', status: 'active', applications: 24, reward: '200,000 MMK', postedAt: '2024-03-10' },
  { id: 2, title: 'Product Manager', company: 'Wave Money', status: 'active', applications: 18, reward: '150,000 MMK', postedAt: '2024-03-08' },
  { id: 3, title: 'UI/UX Designer', company: 'Yoma Bank', status: 'pending', applications: 32, reward: '100,000 MMK', postedAt: '2024-03-12' },
  { id: 4, title: 'Data Analyst', company: 'KBZ Bank', status: 'active', applications: 15, reward: '120,000 MMK', postedAt: '2024-03-05' },
  { id: 5, title: 'Marketing Manager', company: 'MPT', status: 'closed', applications: 45, reward: '80,000 MMK', postedAt: '2024-02-28' },
  { id: 6, title: 'Frontend Developer', company: 'Frontiir', status: 'active', applications: 28, reward: '180,000 MMK', postedAt: '2024-03-11' },
  { id: 7, title: 'Backend Developer', company: 'Myanma Apex', status: 'pending', applications: 12, reward: '175,000 MMK', postedAt: '2024-03-09' },
  { id: 8, title: 'HR Manager', company: 'Dagon Group', status: 'active', applications: 38, reward: '90,000 MMK', postedAt: '2024-03-07' },
];

// Mock Analytics Data
const userGrowthData = [
  { month: 'Sep', users: 4200, newUsers: 420 },
  { month: 'Oct', users: 5100, newUsers: 900 },
  { month: 'Nov', users: 6400, newUsers: 1300 },
  { month: 'Dec', users: 7800, newUsers: 1400 },
  { month: 'Jan', users: 9200, newUsers: 1400 },
  { month: 'Feb', users: 10800, newUsers: 1600 },
  { month: 'Mar', users: 12847, newUsers: 2047 },
];

const applicationsData = [
  { month: 'Sep', applications: 450, hired: 45 },
  { month: 'Oct', applications: 520, hired: 52 },
  { month: 'Nov', applications: 680, hired: 68 },
  { month: 'Dec', applications: 720, hired: 72 },
  { month: 'Jan', applications: 850, hired: 85 },
  { month: 'Feb', applications: 920, hired: 92 },
  { month: 'Mar', applications: 1100, hired: 110 },
];

const revenueData = [
  { month: 'Sep', revenue: 28.5 },
  { month: 'Oct', revenue: 32.1 },
  { month: 'Nov', revenue: 35.8 },
  { month: 'Dec', revenue: 38.2 },
  { month: 'Jan', revenue: 41.5 },
  { month: 'Feb', revenue: 43.2 },
  { month: 'Mar', revenue: 45.2 },
];

const referralSourceData = [
  { name: 'Direct', value: 35, color: '#14B8A6' },
  { name: 'Social Media', value: 28, color: '#F59E0B' },
  { name: 'Referral Links', value: 22, color: '#8b5cf6' },
  { name: 'Search', value: 15, color: '#ec4899' },
];

// Recent Activity
const recentActivity = [
  { id: 1, type: 'user', action: 'New user registered', detail: 'Khin Myat joined ReferTRM', time: '2 mins ago' },
  { id: 2, type: 'job', action: 'Job posted', detail: 'Tech Myanmar posted "Senior Developer"', time: '15 mins ago' },
  { id: 3, type: 'referral', action: 'Referral completed', detail: 'Su Myat earned 150,000 MMK', time: '1 hour ago' },
  { id: 4, type: 'company', action: 'Company verified', detail: 'Yoma Bank is now verified', time: '2 hours ago' },
  { id: 5, type: 'user', action: 'User upgraded', detail: 'Aung Min upgraded to Premium', time: '3 hours ago' },
  { id: 6, type: 'job', action: 'Job approved', detail: '"Product Manager" at Wave Money', time: '4 hours ago' },
  { id: 7, type: 'referral', action: 'Referral bonus paid', detail: 'Thiri Aung received 200,000 MMK', time: '5 hours ago' },
  { id: 8, type: 'company', action: 'New company', detail: 'Myawaddy Bank joined platform', time: '6 hours ago' },
];

// Chart Config
const chartConfig = {
  users: { label: 'Total Users', color: '#14B8A6' },
  newUsers: { label: 'New Users', color: '#F59E0B' },
  applications: { label: 'Applications', color: '#8b5cf6' },
  hired: { label: 'Hired', color: '#22c55e' },
  revenue: { label: 'Revenue (MMK)', color: '#ec4899' },
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<typeof usersData[0] | null>(null);
  const [selectedJob, setSelectedJob] = useState<typeof jobsData[0] | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showJobDialog, setShowJobDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="badge-success">Active</Badge>;
      case 'inactive':
        return <Badge className="badge-warning">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case 'closed':
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Admin</Badge>;
      case 'Premium':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Premium</Badge>;
      case 'Company':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Company</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">User</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Master':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 flex items-center gap-1"><Crown className="h-3 w-3" />Master</Badge>;
      case 'Expert':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1"><Star className="h-3 w-3" />Expert</Badge>;
      case 'Professional':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Professional</Badge>;
      default:
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Amateur</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-teal-400" />;
      case 'job':
        return <Briefcase className="h-4 w-4 text-amber-400" />;
      case 'referral':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'company':
        return <Building2 className="h-4 w-4 text-purple-400" />;
      default:
        return <Activity className="h-4 w-4 text-blue-400" />;
    }
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.role.toLowerCase() === userFilter.toLowerCase() ||
                         user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = jobFilter === 'all' || job.status === jobFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">
                  <span className="text-teal-400">Refer</span>
                  <span className="text-white">TRM</span>
                </span>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Admin Info */}
          <div className="p-4 border-b border-white/5">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
                  A
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Admin User</p>
                  <p className="text-xs text-slate-500">admin@refertrm.com</p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Crown className="h-3 w-3 mr-1" />
                  Super
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {adminNavigation.map((item) => {
                const isActive = activeSection === item.name.toLowerCase().split(' ')[0];
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveSection(item.name.toLowerCase().split(' ')[0]);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-teal-500/15 text-teal-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <div className="flex-1 text-left">
                      <span className="block">{item.name}</span>
                      <span className="text-xs text-slate-500 burmese-text">{item.nameMm}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-white/5">
            <div className="glass-card p-4">
              <p className="text-xs text-slate-500 mb-3">Today's Overview</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-teal-400">+47</div>
                  <div className="text-xs text-slate-500">New Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-400">12</div>
                  <div className="text-xs text-slate-500">New Jobs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-white/5">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-white">
                  {activeSection === 'dashboard' && 'Dashboard Overview'}
                  {activeSection === 'manage' && 'Manage Users'}
                  {activeSection === 'jobs' && 'Manage Jobs'}
                  {activeSection === 'companies' && 'Manage Companies'}
                  {activeSection === 'analytics' && 'Analytics'}
                  {activeSection === 'settings' && 'Settings'}
                </h1>
                <p className="text-xs text-slate-500 burmese-text">
                  {activeSection === 'dashboard' && 'ပင်မစာမျက်နှာ အကျဉ်းချုပ်'}
                  {activeSection === 'manage' && 'အသုံးပြုသူများ စီမံခန့်ခွဲခြင်း'}
                  {activeSection === 'jobs' && 'အလုပ်များ စီမံခန့်ခွဲခြင်း'}
                  {activeSection === 'companies' && 'ကုမ္ပဏီများ စီမံခန့်ခွဲခြင်း'}
                  {activeSection === 'analytics' && 'ခွဲခြမ်းစိတ်ဖြာမှု'}
                  {activeSection === 'settings' && 'ဆက်တင်များ'}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                  />
                </div>
              </div>

              {/* Refresh */}
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Admin Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Dashboard Section */}
            {activeSection === 'dashboard' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {statsData.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={`glass-card bg-gradient-to-br ${stat.bgColor} ${stat.borderColor}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            <div className={`flex items-center gap-1 text-xs ${stat.changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {stat.changeType === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                              {stat.change}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                          <div className="text-xs text-slate-500 burmese-text mt-1">{stat.labelMm}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Growth Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-teal-400" />
                            User Growth
                          </CardTitle>
                          <Select defaultValue="6m">
                            <SelectTrigger className="w-24 bg-slate-800/50 border-white/10 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">1 Month</SelectItem>
                              <SelectItem value="3m">3 Months</SelectItem>
                              <SelectItem value="6m">6 Months</SelectItem>
                              <SelectItem value="1y">1 Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-slate-500 text-xs burmese-text">အသုံးပြုသူ တိုးတက်မှု</p>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                          <AreaChart data={userGrowthData}>
                            <defs>
                              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="users" stroke="#14B8A6" fill="url(#colorUsers)" strokeWidth={2} />
                            <Area type="monotone" dataKey="newUsers" stroke="#F59E0B" fill="url(#colorNewUsers)" strokeWidth={2} />
                          </AreaChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Revenue Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-pink-400" />
                            Revenue (MMK Millions)
                          </CardTitle>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+18.7%</Badge>
                        </div>
                        <p className="text-slate-500 text-xs burmese-text">ဝင်ငွေ တိုးတက်မှု</p>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Activity and Referral Sources */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2"
                  >
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-teal-400" />
                            Recent Activity
                          </CardTitle>
                          <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                            View All
                          </Button>
                        </div>
                        <p className="text-slate-500 text-xs burmese-text">မကြာသေးမီက လုပ်ဆောင်ချက်များ</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                          {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">{activity.action}</p>
                                <p className="text-xs text-slate-400 truncate">{activity.detail}</p>
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {activity.time}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Referral Sources */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-amber-400" />
                          Referral Sources
                        </CardTitle>
                        <p className="text-slate-500 text-xs burmese-text">ရည်ညွှန်းအရင်းအမြစ်များ</p>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-48">
                          <RechartsPieChart>
                            <Pie
                              data={referralSourceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {referralSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </RechartsPieChart>
                        </ChartContainer>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {referralSourceData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs text-slate-400">{item.name}</span>
                              <span className="text-xs text-white ml-auto">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </>
            )}

            {/* User Management Section */}
            {activeSection === 'manage' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                          <Users className="h-5 w-5 text-teal-400" />
                          User Management
                        </CardTitle>
                        <p className="text-slate-500 text-xs burmese-text">အသုံးပြုသူများ စီမံခန့်ခွဲခြင်း</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                          />
                        </div>
                        <Select value={userFilter} onValueChange={setUserFilter}>
                          <SelectTrigger className="w-32 bg-slate-800/50 border-white/10">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="btn-primary">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-slate-400">User</TableHead>
                            <TableHead className="text-slate-400">Role</TableHead>
                            <TableHead className="text-slate-400">Points</TableHead>
                            <TableHead className="text-slate-400">Level</TableHead>
                            <TableHead className="text-slate-400">Streak</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-slate-400">Joined</TableHead>
                            <TableHead className="text-slate-400 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-slate-900">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{getRoleBadge(user.role)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-amber-400">
                                  <Star className="h-4 w-4" />
                                  <span>{user.points.toLocaleString()}</span>
                                </div>
                              </TableCell>
                              <TableCell>{getLevelBadge(user.level)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-orange-400">
                                  <Flame className="h-4 w-4" />
                                  <span>{user.streak} days</span>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(user.status)}</TableCell>
                              <TableCell className="text-slate-400 text-sm">{user.joinedAt}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="glass-card bg-slate-900 border-white/10">
                                    <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-white/5">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-white/5">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm text-slate-500">
                        Showing {filteredUsers.length} of {usersData.length} users
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-white/10">Previous</Button>
                        <Button variant="outline" size="sm" className="border-white/10 bg-teal-500/20 text-teal-400">1</Button>
                        <Button variant="outline" size="sm" className="border-white/10">2</Button>
                        <Button variant="outline" size="sm" className="border-white/10">3</Button>
                        <Button variant="outline" size="sm" className="border-white/10">Next</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Job Management Section */}
            {activeSection === 'jobs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-amber-400" />
                          Job Management
                        </CardTitle>
                        <p className="text-slate-500 text-xs burmese-text">အလုပ်များ စီမံခန့်ခွဲခြင်း</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                          <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-48 pl-10 pr-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                          />
                        </div>
                        <Select value={jobFilter} onValueChange={setJobFilter}>
                          <SelectTrigger className="w-32 bg-slate-800/50 border-white/10">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Jobs</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="btn-primary">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-slate-400">Job Title</TableHead>
                            <TableHead className="text-slate-400">Company</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-slate-400">Applications</TableHead>
                            <TableHead className="text-slate-400">Reward</TableHead>
                            <TableHead className="text-slate-400">Posted</TableHead>
                            <TableHead className="text-slate-400 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredJobs.map((job) => (
                            <TableRow key={job.id} className="border-white/5 hover:bg-white/5">
                              <TableCell>
                                <p className="font-medium text-white">{job.title}</p>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                    {job.company.charAt(0)}
                                  </div>
                                  <span className="text-slate-300">{job.company}</span>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(job.status)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-blue-400">
                                  <Users className="h-4 w-4" />
                                  <span>{job.applications}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-amber-400">{job.reward}</span>
                              </TableCell>
                              <TableCell className="text-slate-400 text-sm">{job.postedAt}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {job.status === 'pending' && (
                                    <>
                                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-green-500/10">
                                        <Check className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="glass-card bg-slate-900 border-white/10">
                                      <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-white/5">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-white/5">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Job
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-white/5" />
                                      <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Job
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm text-slate-500">
                        Showing {filteredJobs.length} of {jobsData.length} jobs
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-white/10">Previous</Button>
                        <Button variant="outline" size="sm" className="border-white/10 bg-teal-500/20 text-teal-400">1</Button>
                        <Button variant="outline" size="sm" className="border-white/10">2</Button>
                        <Button variant="outline" size="sm" className="border-white/10">Next</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Companies Section */}
            {activeSection === 'companies' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-400" />
                          Company Management
                        </CardTitle>
                        <p className="text-slate-500 text-xs burmese-text">ကုမ္ပဏီများ စီမံခန့်ခွဲခြင်း</p>
                      </div>
                      <Button className="btn-primary">
                        Add Company
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Tech Myanmar', jobs: 12, rating: 4.8, status: 'verified' },
                        { name: 'Wave Money', jobs: 8, rating: 4.6, status: 'verified' },
                        { name: 'Yoma Bank', jobs: 15, rating: 4.5, status: 'verified' },
                        { name: 'KBZ Bank', jobs: 20, rating: 4.4, status: 'verified' },
                        { name: 'MPT', jobs: 6, rating: 4.2, status: 'pending' },
                        { name: 'Frontiir', jobs: 10, rating: 4.7, status: 'verified' },
                      ].map((company) => (
                        <div key={company.name} className="glass-card p-4 hover:border-purple-500/30 cursor-pointer">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                              {company.name.charAt(0)}
                            </div>
                            {company.status === 'verified' ? (
                              <Badge className="badge-success">
                                <Check className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="badge-warning">Pending</Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-white mb-1">{company.name}</h3>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">{company.jobs} active jobs</span>
                            <span className="text-amber-400 flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {company.rating}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Analytics Section */}
            {activeSection === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-white">Conversion Rate</h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+5.2%</Badge>
                      </div>
                      <div className="text-3xl font-bold text-teal-400 mb-2">12.8%</div>
                      <Progress value={12.8} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">Applications to Hires</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-white">Avg. Time to Hire</h3>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">-2 days</Badge>
                      </div>
                      <div className="text-3xl font-bold text-amber-400 mb-2">14 days</div>
                      <Progress value={70} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">From application to offer</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-white">Referral Success</h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">+8.3%</Badge>
                      </div>
                      <div className="text-3xl font-bold text-purple-400 mb-2">68%</div>
                      <Progress value={68} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">Successful referrals rate</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-400" />
                        Job Applications Trend
                      </CardTitle>
                      <p className="text-slate-500 text-xs burmese-text">အလုပ်လျှောက်လွှာ ခံစားချက်</p>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <RechartsLineChart data={applicationsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                          <Line type="monotone" dataKey="hired" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
                        </RechartsLineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-green-400" />
                        User Engagement
                      </CardTitle>
                      <p className="text-slate-500 text-xs burmese-text">အသုံးပြုသူ ပါဝင်မှု</p>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <AreaChart data={userGrowthData}>
                          <defs>
                            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area type="monotone" dataKey="newUsers" stroke="#22c55e" fill="url(#colorEngagement)" strokeWidth={2} />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                      <Settings className="h-5 w-5 text-slate-400" />
                      Admin Settings
                    </CardTitle>
                    <p className="text-slate-500 text-xs burmese-text">တာဝန်ခံ ဆက်တင်များ</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-white border-b border-white/5 pb-2">General Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30">
                            <div>
                              <p className="text-sm text-white">Site Maintenance Mode</p>
                              <p className="text-xs text-slate-500">Disable public access</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10">Toggle</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30">
                            <div>
                              <p className="text-sm text-white">Email Notifications</p>
                              <p className="text-xs text-slate-500">Admin email alerts</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10">Enabled</Button>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30">
                            <div>
                              <p className="text-sm text-white">Auto-approve Jobs</p>
                              <p className="text-xs text-slate-500">Skip manual review</p>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10">Disabled</Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium text-white border-b border-white/5 pb-2">Reward Settings</h3>
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-slate-800/30">
                            <p className="text-sm text-white mb-2">Default Referral Bonus</p>
                            <Input type="number" defaultValue="15" className="bg-slate-800/50 border-white/10" />
                            <p className="text-xs text-slate-500 mt-1">Percentage of reward</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/30">
                            <p className="text-sm text-white mb-2">Daily Login Bonus</p>
                            <Input type="number" defaultValue="10" className="bg-slate-800/50 border-white/10" />
                            <p className="text-xs text-slate-500 mt-1">Points per day</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/30">
                            <p className="text-sm text-white mb-2">Monthly Prize Pool</p>
                            <Input type="number" defaultValue="300000" className="bg-slate-800/50 border-white/10" />
                            <p className="text-xs text-slate-500 mt-1">MMK amount</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-end gap-3">
                      <Button variant="outline" className="border-white/10">Reset to Defaults</Button>
                      <Button className="btn-primary">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </div>
        </main>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="glass-card bg-slate-900 border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">User Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              View and manage user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-slate-900">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedUser.name}</h3>
                  <p className="text-sm text-slate-400">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-800/30">
                  <p className="text-xs text-slate-500">Points</p>
                  <p className="text-lg font-bold text-amber-400">{selectedUser.points.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/30">
                  <p className="text-xs text-slate-500">Streak</p>
                  <p className="text-lg font-bold text-orange-400">{selectedUser.streak} days</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="border-white/10" onClick={() => setShowUserDialog(false)}>Close</Button>
            <Button className="btn-primary">Edit User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Detail Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="glass-card bg-slate-900 border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Job Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              View and manage job posting
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">{selectedJob.title}</h3>
                <p className="text-sm text-slate-400">{selectedJob.company}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-800/30">
                  <p className="text-xs text-slate-500">Applications</p>
                  <p className="text-lg font-bold text-blue-400">{selectedJob.applications}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/30">
                  <p className="text-xs text-slate-500">Reward</p>
                  <p className="text-lg font-bold text-amber-400">{selectedJob.reward}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="border-white/10" onClick={() => setShowJobDialog(false)}>Close</Button>
            <Button className="btn-primary">Edit Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
