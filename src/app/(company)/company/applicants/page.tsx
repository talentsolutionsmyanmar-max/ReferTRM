'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  FileText,
  Download,
  MoreHorizontal,
  UserCheck,
  UserX,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// Pipeline stages
const pipelineStages = [
  { id: 'new', label: 'New', labelMm: 'အသစ်', color: 'bg-blue-500' },
  { id: 'screening', label: 'Screening', labelMm: 'စစ်ဆေးနေသည်', color: 'bg-purple-500' },
  { id: 'interview', label: 'Interview', labelMm: 'အင်တာဗျူး', color: 'bg-amber-500' },
  { id: 'assessment', label: 'Assessment', labelMm: 'အဆင့်အတန်းစစ်ဆေး', color: 'bg-teal-500' },
  { id: 'offer', label: 'Offer', labelMm: 'အလုပ်ကမ်းလှမ်း', color: 'bg-green-500' },
  { id: 'hired', label: 'Hired', labelMm: 'အလုပ်ရရှိ', color: 'bg-emerald-500' },
];

// Mock applicants
const mockApplicants = [
  {
    id: '1',
    name: 'Mya Myint',
    email: 'mya.myint@email.com',
    phone: '+95 9 123 456 789',
    position: 'Software Engineer',
    appliedDate: '2025-01-15',
    stage: 'interview',
    matchScore: 92,
    avatar: 'M',
    experience: '5 years',
    location: 'Yangon',
    expectedSalary: '800,000 MMK',
    notes: 'Strong technical background, good culture fit',
  },
  {
    id: '2',
    name: 'Aung Ko',
    email: 'aung.ko@email.com',
    phone: '+95 9 234 567 890',
    position: 'Sales Manager',
    appliedDate: '2025-01-14',
    stage: 'screening',
    matchScore: 78,
    avatar: 'A',
    experience: '3 years',
    location: 'Yangon',
    expectedSalary: '600,000 MMK',
    notes: 'Previous experience in FMCG sales',
  },
  {
    id: '3',
    name: 'Su Lwin',
    email: 'su.lwin@email.com',
    phone: '+95 9 345 678 901',
    position: 'Data Analyst',
    appliedDate: '2025-01-13',
    stage: 'assessment',
    matchScore: 85,
    avatar: 'S',
    experience: '4 years',
    location: 'Mandalay',
    expectedSalary: '700,000 MMK',
    notes: 'Python & SQL proficient',
  },
  {
    id: '4',
    name: 'Thura Aung',
    email: 'thura.aung@email.com',
    phone: '+95 9 456 789 012',
    position: 'Software Engineer',
    appliedDate: '2025-01-12',
    stage: 'offer',
    matchScore: 95,
    avatar: 'T',
    experience: '7 years',
    location: 'Yangon',
    expectedSalary: '1,000,000 MMK',
    notes: 'Senior candidate, excellent track record',
  },
  {
    id: '5',
    name: 'Khin Myat',
    email: 'khin.myat@email.com',
    phone: '+95 9 567 890 123',
    position: 'HR Manager',
    appliedDate: '2025-01-11',
    stage: 'new',
    matchScore: 70,
    avatar: 'K',
    experience: '6 years',
    location: 'Yangon',
    expectedSalary: '900,000 MMK',
    notes: '',
  },
];

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);

  const filteredApplicants = mockApplicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || applicant.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getApplicantsByStage = (stageId: string) => {
    return mockApplicants.filter(a => a.stage === stageId).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-teal-400" />
            Applicants
            <span className="text-lg text-slate-400 font-normal">/ လျှောက်လွှာတင်သူများ</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Track and manage candidate applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {pipelineStages.map((stage) => {
          const count = getApplicantsByStage(stage.id);
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl bg-slate-800/50 border border-white/5 cursor-pointer hover:border-white/20 transition-all ${
                stageFilter === stage.id ? 'ring-2 ring-teal-500/50' : ''
              }`}
              onClick={() => setStageFilter(stageFilter === stage.id ? 'all' : stage.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <span className="text-xs text-slate-400">{stage.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className="text-xs text-slate-500">{stage.labelMm}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="glass-card border-white/5">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applicants... / ရှာဖွေပါ..."
                className="pl-10 bg-slate-800/50 border-white/10 text-white"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-white/10 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Stages / အားလုံး</SelectItem>
                {pipelineStages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.label} ({stage.labelMm})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants List */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">
              {filteredApplicants.length} Applicants
            </CardTitle>
            <CardDescription>
              Click on an applicant to view details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredApplicants.map((applicant) => {
                const stage = pipelineStages.find(s => s.id === applicant.stage);
                return (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedApplicant(applicant)}
                    className={`p-4 rounded-xl bg-slate-800/30 border cursor-pointer transition-all ${
                      selectedApplicant?.id === applicant.id
                        ? 'border-teal-500/50 bg-teal-500/5'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-lg font-bold text-teal-400">
                        {applicant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-white">{applicant.name}</h3>
                          <Badge
                            variant="outline"
                            className={`${stage?.color} text-white border-0`}
                          >
                            {stage?.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{applicant.position}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {applicant.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {applicant.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {applicant.appliedDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-teal-400">{applicant.matchScore}%</div>
                        <div className="text-xs text-slate-500">Match</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Applicant Details */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedApplicant ? 'Applicant Details' : 'Select an Applicant'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedApplicant ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Click on an applicant to view their details</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-2xl font-bold text-teal-400 mx-auto mb-3">
                    {selectedApplicant.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-white">{selectedApplicant.name}</h3>
                  <p className="text-sm text-slate-400">{selectedApplicant.position}</p>
                </div>

                {/* Match Score */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Match Score / ကိုက်ညီမှု</span>
                    <span className="text-lg font-bold text-teal-400">{selectedApplicant.matchScore}%</span>
                  </div>
                  <Progress value={selectedApplicant.matchScore} className="h-2 bg-slate-700" />
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{selectedApplicant.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{selectedApplicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{selectedApplicant.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-800/30">
                    <p className="text-xs text-slate-500">Experience / အတွေ့အကြုံ</p>
                    <p className="text-sm font-medium text-white">{selectedApplicant.experience}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/30">
                    <p className="text-xs text-slate-500">Expected Salary / မျှော်မှန်းလစာ</p>
                    <p className="text-sm font-medium text-white">{selectedApplicant.expectedSalary}</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedApplicant.notes && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-400 mb-1">Notes / မှတ်ချက်များ</p>
                    <p className="text-sm text-slate-300">{selectedApplicant.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Move to Next Stage
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
