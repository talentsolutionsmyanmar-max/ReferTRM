'use client';

import { useState, useCallback } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  Mail, 
  CheckSquare, 
  BarChart3,
  Filter,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Clock,
  TrendingUp,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: number;
  education: string;
  appliedRole: string;
  appliedDate: string;
  status: 'new' | 'screening' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  matchScore?: number;
  notes?: string;
}

interface ScreeningStats {
  totalCandidates: number;
  screenedCandidates: number;
  shortlistedCandidates: number;
  averageMatchScore: number;
}

interface HRCandidateScreeningProps {
  jobId?: string;
  jobTitle?: string;
  language?: 'en' | 'my';
}

export default function HRCandidateScreening({
  jobId,
  jobTitle,
  language = 'en',
}: HRCandidateScreeningProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<ScreeningStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demo
  const mockCandidates: Candidate[] = [
    {
      id: 'c1',
      name: 'Aung Myat',
      email: 'aung.myat@email.com',
      phone: '+95 912 345 678',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: 3,
      education: 'B.Sc. Computer Science, University of Yangon',
      appliedRole: 'Software Engineer',
      appliedDate: '2024-01-15',
      status: 'new',
      matchScore: 85,
    },
    {
      id: 'c2',
      name: 'Su Myat Khine',
      email: 'sumyat.k@email.com',
      phone: '+95 923 456 789',
      skills: ['Marketing', 'Social Media', 'Content Writing', 'SEO'],
      experience: 2,
      education: 'B.A. Marketing, Yangon University of Economics',
      appliedRole: 'Marketing Specialist',
      appliedDate: '2024-01-14',
      status: 'screening',
      matchScore: 78,
    },
    {
      id: 'c3',
      name: 'Zaw Win',
      email: 'zaw.win@email.com',
      phone: '+95 934 567 890',
      skills: ['Sales', 'CRM', 'Negotiation', 'Communication'],
      experience: 5,
      education: 'B.B.A, Mandalay University',
      appliedRole: 'Sales Manager',
      appliedDate: '2024-01-13',
      status: 'shortlisted',
      matchScore: 92,
    },
  ];

  const loadCandidates = useCallback(async () => {
    setLoading(true);
    // In production, fetch from API
    setTimeout(() => {
      setCandidates(mockCandidates);
      setStats({
        totalCandidates: mockCandidates.length,
        screenedCandidates: mockCandidates.filter(c => c.status !== 'new').length,
        shortlistedCandidates: mockCandidates.filter(c => c.status === 'shortlisted').length,
        averageMatchScore: Math.round(
          mockCandidates.reduce((sum, c) => sum + (c.matchScore || 0), 0) / mockCandidates.length
        ),
      });
      setLoading(false);
    }, 500);
  }, []);

  const updateCandidateStatus = useCallback(async (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(prev => 
      prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
    );
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
    }
  }, [selectedCandidate]);

  const filteredCandidates = candidates.filter(c => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'screening': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'shortlisted': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'interview': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'offered': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400';
      case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const texts = {
    en: {
      title: 'Candidate Screening',
      subtitle: 'Screen and manage job applicants',
      search: 'Search candidates...',
      filterAll: 'All',
      filterNew: 'New',
      filterScreening: 'Screening',
      filterShortlisted: 'Shortlisted',
      filterInterview: 'Interview',
      filterOffered: 'Offered',
      filterRejected: 'Rejected',
      total: 'Total Candidates',
      screened: 'Screened',
      shortlisted: 'Shortlisted',
      avgScore: 'Avg Match Score',
      candidate: 'Candidate',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      appliedRole: 'Applied Role',
      appliedDate: 'Applied Date',
      matchScore: 'Match Score',
      status: 'Status',
      actions: 'Actions',
      shortlist: 'Shortlist',
      reject: 'Reject',
      schedule: 'Schedule Interview',
      notes: 'Notes',
      addNote: 'Add a note...',
      export: 'Export',
      refresh: 'Refresh',
    },
    my: {
      title: 'ကိစ္စလက်ခံသူများ စိစစ်ခြင်း',
      subtitle: 'အလုပ်လျှောက်လွှာတင်သူများကို စိစစ်၍ စီမံပါ',
      search: 'ကိစ္စလက်ခံသူများ ရှာဖွေပါ...',
      filterAll: 'အားလုံး',
      filterNew: 'အသစ်',
      filterScreening: 'စိစစ်နေသည်',
      filterShortlisted: 'ရွေးချယ်ထားသည်',
      filterInterview: 'အင်တာဗျူး',
      filterOffered: 'ခန့်အပ်ပြီ',
      filterRejected: 'ငြင်းပယ်ပြီ',
      total: 'စုစုပေါင်း ကိစ္စလက်ခံသူများ',
      screened: 'စိစစ်ပြီး',
      shortlisted: 'ရွေးချယ်ထားသည်',
      avgScore: 'ပျမ်းမျှ ကိုက်ညီမှုရမှတ်',
      candidate: 'ကိစ္စလက်ခံသူ',
      skills: 'ကျွမ်းကျင်မှုများ',
      experience: 'အတွေ့အကြုံ',
      education: 'ပညာရေး',
      appliedRole: 'လျှောက်ထားသော ရာထူး',
      appliedDate: 'လျှောက်လွှာတင်သည့်ရက်စွဲ',
      matchScore: 'ကိုက်ညီမှုရမှတ်',
      status: 'အဆင့်အတန်း',
      actions: 'လုပ်ဆောင်ချက်များ',
      shortlist: 'ရွေးချယ်ပါ',
      reject: 'ငြင်းပယ်ပါ',
      schedule: 'အင်တာဗျူး ချိန်းဆိုပါ',
      notes: 'မှတ်ချက်များ',
      addNote: 'မှတ်ချက်ထည့်ပါ...',
      export: 'တင်ပို့ပါ',
      refresh: 'ပြန်လည်ဖော်ပြပါ',
    },
  };

  const t = texts[language];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-sm text-white/80">{t.subtitle}</p>
          </div>
        </div>
        {jobTitle && (
          <div className="mt-2 text-sm text-white/80">
            {jobTitle}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalCandidates}</div>
              <div className="text-sm text-slate-500">{t.total}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.screenedCandidates}</div>
              <div className="text-sm text-slate-500">{t.screened}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-2xl font-bold text-green-500">{stats.shortlistedCandidates}</div>
              <div className="text-sm text-slate-500">{t.shortlisted}</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-2xl font-bold text-purple-500">{stats.avgScore}%</div>
              <div className="text-sm text-slate-500">{t.avgScore}</div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'new', 'screening', 'shortlisted', 'interview', 'offered', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg transition-colors",
                  filterStatus === status
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                {t[`filter${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof typeof t]}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadCandidates}
              disabled={loading}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 flex items-center gap-2"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              {t.refresh}
            </button>
            <button className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t.export}
            </button>
          </div>
        </div>

        {/* Load Button */}
        {candidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 mb-4">
              {language === 'my' ? 'ကိစ္စလက်ခံသူများကို ဖော်ပြရန် စိစစ်ပါ' : 'Load candidates to start screening'}
            </p>
            <button
              onClick={loadCandidates}
              disabled={loading}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {language === 'my' ? 'ဖော်ပြနေသည်...' : 'Loading...'}
                </>
              ) : (
                <>
                  <Filter className="w-5 h-5" />
                  {language === 'my' ? 'စိစစ်ပါ' : 'Screen Candidates'}
                </>
              )}
            </button>
          </div>
        )}

        {/* Candidates List */}
        {filteredCandidates.length > 0 && (
          <div className="space-y-3">
            {filteredCandidates.map(candidate => (
              <div key={candidate.id}>
                <button
                  onClick={() => setSelectedCandidate(selectedCandidate?.id === candidate.id ? null : candidate)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    selectedCandidate?.id === candidate.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-indigo-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{candidate.name}</div>
                          <div className="text-sm text-slate-500">{candidate.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(candidate.status)
                      )}>
                        {t[`filter${candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}` as keyof typeof t]}
                      </span>
                      
                      {candidate.matchScore && (
                        <div className={cn("text-lg font-bold", getMatchScoreColor(candidate.matchScore))}>
                          {candidate.matchScore}%
                        </div>
                      )}
                      
                      {selectedCandidate?.id === candidate.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {selectedCandidate?.id === candidate.id && (
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{t.skills}</div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{t.experience}</div>
                        <div className="text-slate-700 dark:text-slate-300">
                          {candidate.experience} {language === 'my' ? 'နှစ်' : 'years'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{t.education}</div>
                        <div className="text-slate-700 dark:text-slate-300">{candidate.education}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{t.appliedRole}</div>
                        <div className="text-slate-700 dark:text-slate-300">{candidate.appliedRole}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {candidate.status === 'new' && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'screening')}
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200"
                        >
                          {t.filterScreening}
                        </button>
                      )}
                      {(candidate.status === 'new' || candidate.status === 'screening') && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'shortlisted')}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          {t.shortlist}
                        </button>
                      )}
                      {candidate.status === 'shortlisted' && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'interview')}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 flex items-center gap-1"
                        >
                          <Calendar className="w-4 h-4" />
                          {t.schedule}
                        </button>
                      )}
                      {candidate.status !== 'rejected' && candidate.status !== 'offered' && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'rejected')}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          {t.reject}
                        </button>
                      )}
                      {candidate.status === 'interview' && (
                        <button
                          onClick={() => updateCandidateStatus(candidate.id, 'offered')}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600"
                        >
                          {t.filterOffered}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
