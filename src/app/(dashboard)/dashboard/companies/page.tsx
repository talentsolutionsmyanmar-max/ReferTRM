'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Star,
  Users,
  MapPin,
  Briefcase,
  X,
  ExternalLink,
  DollarSign,
  Clock,
  Heart,
  Trophy,
  Crown,
  Medal,
  Vote,
  Search,
  Verified,
  PenSquare,
  Check,
  Sparkles,
  TrendingUp,
  Eye,
  Shield,
  Leaf,
  UsersRound,
  Coffee,
  Calendar,
  GraduationCap,
  Target,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { companies, industries, getFeaturedCompanies, getTopRatedCompanies, getAwardWinners } from '@/data/companies';
import type { Company } from '@/data/companies';

// Myanmar-specific rating factors (Glassdoor style with Myanmar vibe)
const myanmarRatingFactors = [
  { id: 'learnGrow', label: 'Great place to learn & grow', labelMm: 'သင်ယူဖွံ့ဖြိုးရန် နေရာကောင်း', icon: GraduationCap },
  { id: 'professional', label: 'Professional environment', labelMm: 'ပရော်ဖက်ရှင်နယ် ပတ်ဝန်းကျင်', icon: Briefcase },
  { id: 'greenWorkplace', label: 'Green & clean workplace', labelMm: 'စိမ်းလန်းသန့်ရှင်းသော ရုံးခန်း', icon: Leaf },
  { id: 'workLife', label: 'Good work-life balance', labelMm: 'အလုပ်-ဘဝ ညီမျှမှုကောင်း', icon: Calendar },
  { id: 'fairPay', label: 'Fair compensation', labelMm: 'လစာမျှတမှု', icon: DollarSign },
  { id: 'supportive', label: 'Supportive management', labelMm: 'ထောက်ပံ့သည့် မန်နေဂျာများ', icon: UsersRound },
  { id: 'teaCulture', label: 'Tea shop friendly culture', labelMm: 'လက်ဖက်ရည်ဆိုင် ယဉ်ကျေးမှု', icon: Coffee },
  { id: 'festivalFlex', label: 'Festival & holiday flexibility', labelMm: 'ပွဲတော် အားလပ်ရက် ပေါ့ပါးမှု', icon: Calendar },
];

// Quick Pros tags (Myanmar style)
const prosTags = [
  'Good salary',
  'Friendly colleagues',
  'Learning opportunities',
  'Modern office',
  'Free lunch/snacks',
  'Flexible hours',
  'Good location',
  'Training provided',
  'Career growth',
  'Team outings',
  'Health insurance',
  'Transportation',
];

// Quick Cons tags
const consTags = [
  'Low salary',
  'Long working hours',
  'No overtime pay',
  'Micromanagement',
  'Limited growth',
  'Poor communication',
  'Heavy workload',
  'No work-life balance',
  'Old systems',
  'Limited benefits',
];

// Job levels
const jobLevels = [
  { value: 'intern', label: 'Intern', labelMm: 'အလုပ်သင်' },
  { value: 'junior', label: 'Junior (1-2 yrs)', labelMm: 'ဂျူနီယာ (၁-၂ နှစ်)' },
  { value: 'mid', label: 'Mid-Level (3-5 yrs)', labelMm: 'အလတ်စား (၃-၅ နှစ်)' },
  { value: 'senior', label: 'Senior (5-10 yrs)', labelMm: 'ဆီနီယာ (၅-၁၀ နှစ်)' },
  { value: 'lead', label: 'Team Lead/Manager', labelMm: 'ခေါင်းဆောင်/မန်နေဂျာ' },
  { value: 'director', label: 'Director/VP', labelMm: 'ဒါရိုက်တာ/VP' },
  { value: 'c-level', label: 'C-Level/Executive', labelMm: 'C-Level/အမှုဆောင်' },
];

// Salary ranges (MMK)
const salaryRanges = [
  { value: 'below-300', label: 'Below 300,000 MMK', labelMm: 'သိန်း ၃ အောက်' },
  { value: '300-500', label: '300,000 - 500,000 MMK', labelMm: 'သိန်း ၃ - ၅' },
  { value: '500-800', label: '500,000 - 800,000 MMK', labelMm: 'သိန်း ၅ - ၈' },
  { value: '800-1200', label: '800,000 - 1,200,000 MMK', labelMm: 'သိန်း ၈ - ၁၂' },
  { value: '1200-2000', label: '1,200,000 - 2,000,000 MMK', labelMm: 'သိန်း ၁၂ - ၂၀' },
  { value: '2000-3000', label: '2,000,000 - 3,000,000 MMK', labelMm: 'သိန်း ၂၀ - ၃၀' },
  { value: '3000-5000', label: '3,000,000 - 5,000,000 MMK', labelMm: 'သိန်း ၃၀ - ၅၀' },
  { value: 'above-5000', label: 'Above 5,000,000 MMK', labelMm: 'သိန်း ၅၀ အထက်' },
];

const jobTitles = [
  'Software Developer',
  'Marketing Executive',
  'Sales Representative',
  'HR Manager',
  'Accountant',
  'Operations Manager',
  'Customer Service',
  'IT Support',
  'Business Analyst',
  'Project Manager',
  'Graphic Designer',
  'Content Writer',
  'Finance Analyst',
  'Administrative Assistant',
  'Other',
];

interface ReviewFormData {
  // Anonymous reviewer info
  jobTitle: string;
  jobLevel: string;
  salaryRange: string;
  employmentType: 'current' | 'former';
  yearsAtCompany: string;
  
  // Review content
  title: string;
  pros: string;
  cons: string;
  advice: string;
  
  // Quick tags
  prosTags: string[];
  consTags: string[];
  
  // Myanmar-specific ratings
  ratings: Record<string, number>;
  
  // Overall recommendation
  recommend: 'yes' | 'no' | 'neutral';
  ceoApproval: boolean | null;
}

const initialReviewForm: ReviewFormData = {
  jobTitle: '',
  jobLevel: '',
  salaryRange: '',
  employmentType: 'current',
  yearsAtCompany: '',
  title: '',
  pros: '',
  cons: '',
  advice: '',
  prosTags: [],
  consTags: [],
  ratings: {
    learnGrow: 3,
    professional: 3,
    greenWorkplace: 3,
    workLife: 3,
    fairPay: 3,
    supportive: 3,
    teaCulture: 3,
    festivalFlex: 3,
  },
  recommend: 'neutral',
  ceoApproval: null,
};

const StarRating = ({ rating, size = 'sm', interactive = false, onChange }: { 
  rating: number; 
  size?: 'sm' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onChange?.(star)}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
      >
        <Star
          className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${
            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'
          }`}
        />
      </button>
    ))}
    {size === 'lg' && <span className="ml-2 text-muted-foreground">{rating.toFixed(1)}</span>}
  </div>
);

export default function CompaniesPage() {
  const { toast } = useToast();
  const [companiesList, setCompaniesList] = useState<Company[]>(companies);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>(initialReviewForm);
  const [showCelebration, setShowCelebration] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'featured' | 'awards'>('all');
  const [votedCompanies, setVotedCompanies] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('votedCompanies');
      if (saved) return new Set(JSON.parse(saved));
    }
    return new Set();
  });
  const [sortBy, setSortBy] = useState<'rating' | 'votes' | 'name'>('rating');

  // Filter and sort companies
  const filteredCompanies = companiesList
    .filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.nameMm?.includes(searchQuery);
      const matchesIndustry = selectedIndustry === 'All' || company.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'votes') return (b.voteCount || 0) - (a.voteCount || 0);
      return a.name.localeCompare(b.name);
    });

  const featuredCompanies = getFeaturedCompanies();
  const topRatedCompanies = getTopRatedCompanies(10);
  const awardWinners2024 = getAwardWinners(2024);

  const handleVote = (companyId: string) => {
    const newVoted = new Set(votedCompanies);
    if (newVoted.has(companyId)) {
      newVoted.delete(companyId);
      setCompaniesList(prev => prev.map(c => c.id === companyId ? { ...c, voteCount: Math.max(0, (c.voteCount || 0) - 1) } : c));
      toast({ title: 'Vote removed', description: 'Your vote has been removed.' });
    } else {
      newVoted.add(companyId);
      setCompaniesList(prev => prev.map(c => c.id === companyId ? { ...c, voteCount: (c.voteCount || 0) + 1 } : c));
      toast({ title: 'Vote submitted!', description: '+5 points earned!' });
    }
    setVotedCompanies(newVoted);
    localStorage.setItem('votedCompanies', JSON.stringify([...newVoted]));
  };

  const handleTagToggle = (tag: string, type: 'pros' | 'cons') => {
    const key = type === 'pros' ? 'prosTags' : 'consTags';
    const current = reviewForm[key];
    if (current.includes(tag)) {
      setReviewForm({ ...reviewForm, [key]: current.filter(t => t !== tag) });
    } else {
      setReviewForm({ ...reviewForm, [key]: [...current, tag] });
    }
  };

  const handleSubmitReview = () => {
    if (!selectedCompany || !reviewForm.title || !reviewForm.jobTitle || !reviewForm.jobLevel || !reviewForm.salaryRange) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    // Here you would save to Firebase/database
    // For salary market survey data collection
    
    setShowReviewModal(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);

    toast({
      title: 'Review submitted!',
      description: 'Thank you! Your anonymous review helps others. +15 points earned!',
    });
    
    setReviewForm(initialReviewForm);
  };

  const getAwardIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-amber-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <Trophy className="h-5 w-5 text-amber-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-7 w-7 text-teal-400" />
            Company Profiles
          </h1>
          <p className="text-muted-foreground">ကုမ္ပဏီ ပရိုဖိုင်များ • Anonymous Reviews • Salary Insights</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
            <Building2 className="h-4 w-4 mr-1" />
            {companies.length} Companies
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Briefcase className="h-4 w-4 mr-1" />
            {companies.reduce((sum, c) => sum + c.openJobs, 0)} Jobs
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Vote className="h-4 w-4 mr-1" />
            {companies.reduce((sum, c) => sum + (c.voteCount || 0), 0).toLocaleString()} Votes
          </Badge>
        </div>
      </div>

      {/* People's Award 2024 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5"
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-amber-400" />
          <div>
            <h2 className="text-xl font-bold text-foreground">People's Award 2024</h2>
            <p className="text-muted-foreground text-sm">မြန်မာပြည်သူ့ဆု - Voted by real employees</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {awardWinners2024.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`relative p-4 rounded-xl bg-gradient-to-r cursor-pointer ${
                company.awardRank === 1 ? 'from-amber-500/20 to-yellow-500/20 border-amber-500/50' :
                company.awardRank === 2 ? 'from-slate-400/20 to-slate-300/20 border-slate-400/50' :
                'from-amber-700/20 to-amber-600/20 border-amber-700/50'
              } border`}
            >
              {company.awardRank === 1 && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 rounded-full px-2 py-0.5 text-xs font-bold">
                  WINNER
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="text-3xl">{company.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground truncate">{company.name}</h3>
                    {company.verified && <Verified className="h-4 w-4 text-teal-400" />}
                  </div>
                  <p className="text-muted-foreground text-xs">{company.industry}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getAwardIcon(company.awardRank || 0)}
                    <span className="text-amber-400 font-medium text-sm">#{company.awardRank} • {(company.voteCount || 0).toLocaleString()} votes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { mode: 'all', label: 'All Companies', count: companies.length },
          { mode: 'featured', label: 'Featured', count: featuredCompanies.length, icon: Star },
          { mode: 'awards', label: 'Top Voted', count: topRatedCompanies.length, icon: Trophy },
        ].map(({ mode, label, count, icon: Icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as typeof viewMode)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              viewMode === mode ? 'bg-teal-500 text-slate-900' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="form-input w-full pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="votes">Sort by Votes</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
        <div className="flex gap-2 overflow-x-auto py-3 mt-2">
          {industries.slice(0, 12).map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedIndustry === industry ? 'bg-teal-500 text-slate-900' : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Company List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(viewMode === 'featured' ? featuredCompanies : viewMode === 'awards' ? topRatedCompanies : filteredCompanies).map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card className="glass-card-hover cursor-pointer h-full" onClick={() => setSelectedCompany(company)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-3xl">{company.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground truncate">{company.name}</h3>
                      {company.verified && <Verified className="h-4 w-4 text-teal-400 flex-shrink-0" />}
                    </div>
                    <p className="text-muted-foreground text-sm">{company.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={company.rating} />
                  <span className="text-muted-foreground text-sm">({company.reviewCount})</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{company.size}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Salary: </span>
                    <span className="text-green-400 font-medium">
                      {(company.salaryMin / 100000).toFixed(1)}-{(company.salaryMax / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {company.openJobs} jobs
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleVote(company.id); }}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      votedCompanies.has(company.id) ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${votedCompanies.has(company.id) ? 'fill-red-400' : ''}`} />
                    {(company.voteCount || 0).toLocaleString()}
                  </button>
                  <div className="text-teal-400 text-sm font-medium">{company.recommendPercent}% recommend</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Company Detail Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl glass-card bg-card my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm p-6 border-b border-border z-10">
                <button onClick={() => setSelectedCompany(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>

                <div className="flex items-start gap-4">
                  <div className="text-5xl">{selectedCompany.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-foreground">{selectedCompany.name}</h2>
                      {selectedCompany.verified && <Verified className="h-5 w-5 text-teal-400" />}
                      {selectedCompany.featured && <Badge className="bg-amber-500/20 text-amber-400">Featured</Badge>}
                      {selectedCompany.awardYear && (
                        <Badge className="bg-purple-500/20 text-purple-400">
                          <Trophy className="h-3 w-3 mr-1" /> Award #{selectedCompany.awardRank}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground burmese-text">{selectedCompany.nameMm}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <StarRating rating={selectedCompany.rating} size="lg" />
                      <span className="text-muted-foreground">({selectedCompany.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge variant="outline" className="border-border">{selectedCompany.industry}</Badge>
                  <Badge variant="outline" className="border-border"><MapPin className="h-3 w-3 mr-1" />{selectedCompany.location}</Badge>
                  <Badge variant="outline" className="border-border"><Users className="h-3 w-3 mr-1" />{selectedCompany.size}</Badge>
                  <Badge className="bg-green-500/20 text-green-400">{selectedCompany.openJobs} jobs</Badge>
                  {selectedCompany.founded && <Badge variant="outline" className="border-border">Est. {selectedCompany.founded}</Badge>}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Vote Section */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-400" /> Vote for People's Award
                      </h3>
                      <p className="text-muted-foreground text-sm">Help this company win!</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400">{(selectedCompany.voteCount || 0).toLocaleString()}</div>
                      <p className="text-muted-foreground text-sm">votes</p>
                    </div>
                  </div>
                  <Button
                    className={`mt-3 w-full ${votedCompanies.has(selectedCompany.id) ? 'bg-red-500 hover:bg-red-600' : 'btn-primary'}`}
                    onClick={() => handleVote(selectedCompany.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${votedCompanies.has(selectedCompany.id) ? 'fill-white' : ''}`} />
                    {votedCompanies.has(selectedCompany.id) ? 'Voted! Click to Remove' : 'Vote for this Company'}
                  </Button>
                </div>

                {/* About */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground">{selectedCompany.description}</p>
                </div>

                {/* Ratings */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Ratings Breakdown</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(selectedCompany.ratings).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-xl bg-secondary/50">
                        <div className="text-muted-foreground text-sm capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="flex items-center gap-2">
                          <Progress value={value * 20} className="h-2 flex-1 bg-slate-700" />
                          <span className="text-foreground font-medium">{value.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" /> Salary Range
                  </h3>
                  <div className="text-2xl font-bold text-green-400">
                    {(selectedCompany.salaryMin / 100000).toFixed(1)} - {(selectedCompany.salaryMax / 100000).toFixed(1)} Lakhs MMK
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">Based on {selectedCompany.reviewCount} anonymous employee reports</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 btn-primary" onClick={() => setShowReviewModal(true)}>
                    <PenSquare className="mr-2 h-4 w-4" /> Write Anonymous Review
                  </Button>
                  {selectedCompany.website && (
                    <Button variant="outline" className="border-border" asChild>
                      <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl glass-card bg-card my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm p-6 border-b border-border z-10">
                <button onClick={() => setShowReviewModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedCompany.logo}</div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Write Anonymous Review</h2>
                    <p className="text-muted-foreground">Your identity will remain anonymous</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  <span className="text-teal-400 text-sm">Your review is anonymous. We collect salary data to build Myanmar's first salary market survey.</span>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-6">
                {/* Anonymous Info Section */}
                <div className="p-4 bg-secondary/50 rounded-xl space-y-4">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4 text-teal-400" />
                    Your Information (Anonymous)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Job Title *</label>
                      <select
                        value={reviewForm.jobTitle}
                        onChange={(e) => setReviewForm({ ...reviewForm, jobTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
                      >
                        <option value="">Select your position</option>
                        {jobTitles.map((title) => <option key={title} value={title}>{title}</option>)}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Job Level *</label>
                      <select
                        value={reviewForm.jobLevel}
                        onChange={(e) => setReviewForm({ ...reviewForm, jobLevel: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
                      >
                        <option value="">Select level</option>
                        {jobLevels.map((level) => <option key={level.value} value={level.value}>{level.label}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Salary Range (MMK) *</label>
                      <select
                        value={reviewForm.salaryRange}
                        onChange={(e) => setReviewForm({ ...reviewForm, salaryRange: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
                      >
                        <option value="">Select salary range</option>
                        {salaryRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Employment Status *</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, employmentType: 'current' })}
                          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                            reviewForm.employmentType === 'current' ? 'bg-green-500 text-foreground' : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          Current Employee
                        </button>
                        <button
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, employmentType: 'former' })}
                          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                            reviewForm.employmentType === 'former' ? 'bg-teal-500 text-foreground' : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          Former Employee
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-muted-foreground mb-2">Years at Company</label>
                      <select
                        value={reviewForm.yearsAtCompany}
                        onChange={(e) => setReviewForm({ ...reviewForm, yearsAtCompany: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground focus:border-teal-500 focus:outline-none"
                      >
                        <option value="">Select duration</option>
                        <option value="less-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Myanmar-Specific Ratings */}
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Rate This Company (Myanmar Style)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myanmarRatingFactors.map((factor) => (
                      <div key={factor.id} className="p-3 bg-secondary/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <factor.icon className="h-4 w-4 text-teal-400" />
                            <div>
                              <div className="text-sm text-foreground">{factor.label}</div>
                              <div className="text-xs text-muted-foreground burmese-text">{factor.labelMm}</div>
                            </div>
                          </div>
                          <StarRating
                            rating={reviewForm.ratings[factor.id] || 3}
                            interactive
                            onChange={(r) => setReviewForm({
                              ...reviewForm,
                              ratings: { ...reviewForm.ratings, [factor.id]: r }
                            })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Review Title *</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    placeholder="Sum up your experience in one sentence"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none"
                  />
                </div>

                {/* Quick Pros Tags */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Quick Pros (Click to select)</label>
                  <div className="flex flex-wrap gap-2">
                    {prosTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag, 'pros')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          reviewForm.prosTags.includes(tag)
                            ? 'bg-green-500 text-foreground'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {reviewForm.prosTags.includes(tag) && <Check className="h-3 w-3 inline mr-1" />}
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Cons Tags */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Quick Cons (Click to select)</label>
                  <div className="flex flex-wrap gap-2">
                    {consTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag, 'cons')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          reviewForm.consTags.includes(tag)
                            ? 'bg-red-500 text-foreground'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {reviewForm.consTags.includes(tag) && <Check className="h-3 w-3 inline mr-1" />}
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed Pros */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Pros (Detailed)</label>
                  <textarea
                    value={reviewForm.pros}
                    onChange={(e) => setReviewForm({ ...reviewForm, pros: e.target.value })}
                    placeholder="What do you like about working here?"
                    rows={3}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Detailed Cons */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Cons (Detailed)</label>
                  <textarea
                    value={reviewForm.cons}
                    onChange={(e) => setReviewForm({ ...reviewForm, cons: e.target.value })}
                    placeholder="What could be improved?"
                    rows={3}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <label className="block text-sm text-muted-foreground mb-3">Would you recommend this company to a friend?</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'yes', icon: Smile, label: 'Yes', color: 'green' },
                      { value: 'no', icon: Frown, label: 'No', color: 'red' },
                      { value: 'neutral', icon: Meh, label: 'Neutral', color: 'slate' },
                    ].map(({ value, icon: Icon, label, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, recommend: value as 'yes' | 'no' | 'neutral' })}
                        className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                          reviewForm.recommend === value
                            ? color === 'green' ? 'bg-green-500 text-foreground' :
                              color === 'red' ? 'bg-red-500 text-foreground' : 'bg-slate-600 text-foreground'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-border" onClick={() => setShowReviewModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 btn-primary" onClick={handleSubmitReview}>
                    <PenSquare className="mr-2 h-4 w-4" />
                    Submit Anonymous Review
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-center">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground">Your anonymous review helps build Myanmar's salary database!</p>
              <Badge className="mt-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Sparkles className="h-4 w-4 mr-1" /> +15 Points!
              </Badge>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
