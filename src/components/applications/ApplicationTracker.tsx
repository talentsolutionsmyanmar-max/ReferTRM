'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  Eye, 
  Search, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface StatusUpdate {
  id: string;
  status: string;
  statusMy: string;
  message: string;
  messageMy: string;
  timestamp: string;
  actor?: {
    type: string;
    name?: string;
  };
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  statusHistory: StatusUpdate[];
  updatedAt: string;
}

interface ApplicationTrackerProps {
  applicationId: string;
  language?: 'en' | 'my';
}

const statusSteps = [
  { key: 'submitted', icon: FileText, label: 'Submitted', labelMy: 'တင်သွင်းပြီး' },
  { key: 'viewed', icon: Eye, label: 'Viewed', labelMy: 'ကြည့်ရှုပြီး' },
  { key: 'screening', icon: Search, label: 'Screening', labelMy: 'စစ်ဆေးနေသည်' },
  { key: 'interview_scheduled', icon: Calendar, label: 'Interview', labelMy: 'အင်တာဗျူး' },
  { key: 'offer_sent', icon: Briefcase, label: 'Offer', labelMy: 'ကမ်းလှမ်းချက်' },
  { key: 'hired', icon: CheckCircle2, label: 'Hired', labelMy: 'အလုပ်ရရှိ' },
];

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  submitted: FileText,
  viewed: Eye,
  screening: Search,
  interview_scheduled: Calendar,
  interview_completed: MessageSquare,
  offer_sent: Briefcase,
  hired: CheckCircle2,
  rejected: XCircle,
  withdrawn: XCircle,
};

const statusColors: Record<string, string> = {
  submitted: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  viewed: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  screening: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  interview_scheduled: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  interview_completed: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  offer_sent: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  hired: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  withdrawn: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

export default function ApplicationTracker({ applicationId, language = 'en' }: ApplicationTrackerProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  const fetchApplication = useCallback(async () => {
    try {
      const url = `/api/applications?applicationId=${applicationId}${lastUpdate ? `&lastUpdate=${lastUpdate}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        if (data.hasUpdates) {
          setHasNewUpdate(true);
          setTimeout(() => setHasNewUpdate(false), 3000);
        }
        setApplication(data.application);
        setLastUpdate(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to fetch application:', error);
    } finally {
      setLoading(false);
    }
  }, [applicationId, lastUpdate]);

  useEffect(() => {
    fetchApplication();
    const interval = setInterval(fetchApplication, 10000);
    return () => clearInterval(interval);
  }, [fetchApplication]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return language === 'my' ? 'အခုပဲ' : 'Just now';
    if (diff < 3600000) return language === 'my' 
      ? `${Math.floor(diff / 60000)} မိနစ်အကြာက` 
      : `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return language === 'my'
      ? `${Math.floor(diff / 3600000)} နာရီအကြာက`
      : `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl p-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
      </div>
    );
  }

  if (!application) return null;

  const currentStepIndex = statusSteps.findIndex(s => s.key === application.status);

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all ${
      hasNewUpdate ? 'ring-2 ring-teal-500 ring-offset-2' : ''
    }`}>
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{application.jobTitle}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{application.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status] || 'bg-slate-100 text-slate-600'}`}>
              {language === 'my' 
                ? application.statusHistory[application.statusHistory.length - 1]?.statusMy || application.status
                : application.status.replace('_', ' ').toUpperCase()
              }
            </span>
            {expanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-1">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;
            
            return (
              <div key={step.key} className="flex-1 flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                } ${isCurrent ? 'ring-2 ring-teal-500 ring-offset-1' : ''}`}>
                  <Icon className="w-3 h-3" />
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded ${index < currentStepIndex ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-200 dark:border-slate-700 p-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            {language === 'my' ? 'အခြေအနေသမိုင်း' : 'Status History'}
          </h4>
          <div className="space-y-3">
            {application.statusHistory.slice().reverse().map((update) => {
              const Icon = statusIcons[update.status] || Circle;
              return (
                <div key={update.id} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[update.status] || 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {language === 'my' ? update.statusMy : update.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{formatTime(update.timestamp)}</span>
                      {update.actor?.name && (
                        <span className="text-xs text-teal-600 dark:text-teal-400">by {update.actor.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {hasNewUpdate && (
        <div className="bg-teal-500 text-white text-center py-1 text-sm">
          {language === 'my' ? 'အသစ်အပ်ဒိတ်!' : 'New update!'}
        </div>
      )}
    </div>
  );
}
