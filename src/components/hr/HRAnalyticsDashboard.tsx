'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  DollarSign,
  Target,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'improving' | 'stable' | 'needs_attention';
  target: number;
}

interface TimeSeriesData {
  month: string;
  applications: number;
  hires: number;
  turnover: number;
  satisfaction: number;
}

interface HRAnalyticsDashboardProps {
  language?: 'en' | 'my';
}

export default function HRAnalyticsDashboard({
  language = 'en',
}: HRAnalyticsDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([]);
  const [recommendations, setRecommendations] = useState<{ area: string; suggestion: string; impact: string }[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hr/analytics');
      const data = await response.json();
      
      if (data.success) {
        setKpis(data.kpis);
        setTimeSeries(data.timeSeries);
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'needs_attention': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-slate-300" />;
    }
  };

  const getChangeColor = (change: number, trend: string) => {
    if (trend === 'needs_attention') return 'text-red-500';
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-slate-500';
  };

  const texts = {
    en: {
      title: 'HR Analytics Dashboard',
      subtitle: 'Key metrics and insights',
      timeToHire: 'Avg Time to Hire',
      costPerHire: 'Cost per Hire',
      turnoverRate: 'Turnover Rate',
      retentionRate: 'Retention Rate',
      acceptanceRate: 'Offer Acceptance Rate',
      employeeSatisfaction: 'Employee Satisfaction',
      days: 'days',
      mmk: 'MMK',
      percent: '%',
      trendImproving: 'Improving',
      trendStable: 'Stable',
      trendNeedsAttention: 'Needs Attention',
      target: 'Target',
      change: 'change',
      hiringTrends: 'Hiring Trends',
      applications: 'Applications',
      hires: 'Hires',
      recommendations: 'AI Recommendations',
      impact: 'Impact',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      refresh: 'Refresh',
      lastUpdated: 'Last updated',
    },
    my: {
      title: 'HR ခွဲခြမ်းစိတ်ဖြာမှု ဒက်ရှ်ဘုတ်',
      subtitle: 'အဓိက ကိန်းဂဏန်းများနှင့် ဉာဏ်ရည်ဉာဏ်သွေးများ',
      timeToHire: 'ပျမ်းမျှ အလုပ်ခန့်အပ်ရန် အချိန်',
      costPerHire: 'တစ်ဦးခန့်အပ်ရန် ကုန်ကျစရိတ်',
      turnoverRate: 'အလုပ်ထွက်နှုန်း',
      retentionRate: 'လူထိန်းသိမ်းနှုန်း',
      acceptanceRate: 'ခန့်အပ်မှု လက်ခံနှုန်း',
      employeeSatisfaction: 'ဝန်ထမ်း ကျေနပ်မှု',
      days: 'ရက်',
      mmk: 'ကျပ်',
      percent: '%',
      trendImproving: 'တိုးတက်နေသည်',
      trendStable: 'တည်ငြိမ်သည်',
      trendNeedsAttention: 'ဂရုပြုရန်လိုသည်',
      target: 'ရည်မှန်းချက်',
      change: 'ပြောင်းလဲမှု',
      hiringTrends: 'အလုပ်ခန့်အပ်မှု လမ်းကြောင်းများ',
      applications: 'လျှောက်လွှာများ',
      hires: 'ခန့်အပ်ပြီး',
      recommendations: 'AI အကြံပြုချက်များ',
      impact: 'သက်ရောက်မှု',
      high: 'မြင့်မား',
      medium: 'အလယ်အလတ်',
      low: 'နိမ့်',
      refresh: 'ပြန်လည်ဖော်ပြပါ',
      lastUpdated: 'နောက်ဆုံးအပ်ဒိတ်',
    },
  };

  const t = texts[language];

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-500" />
            {t.title}
          </h2>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        <button
          onClick={loadAnalytics}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {t.refresh}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">
                {t[kpi.id.replace(/-/g, '') as keyof typeof t] || kpi.name}
              </span>
              {getTrendIcon(kpi.trend)}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {kpi.unit === 'MMK' ? `${(kpi.value / 1000).toFixed(0)}K` : kpi.value}
              <span className="text-sm font-normal text-slate-400 ml-1">{kpi.unit}</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className={cn(getChangeColor(kpi.change, kpi.trend))}>
                {kpi.change > 0 ? '+' : ''}{kpi.change}%
              </span>
              <span className="text-slate-400">
                {t.target}: {kpi.unit === 'MMK' ? `${(kpi.target / 1000).toFixed(0)}K` : kpi.target}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Hiring Trends Chart (Simple Bar Visualization) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-500" />
          {t.hiringTrends}
        </h3>
        
        <div className="space-y-4">
          {timeSeries.map((data, i) => (
            <div key={i} className="flex items-end gap-4">
              <div className="w-16 text-xs text-slate-500">{data.month}</div>
              <div className="flex-1 flex gap-1 h-8">
                <div 
                  className="bg-teal-500 rounded-l"
                  style={{ width: `${Math.min(data.applications / 2, 100)}%` }}
                  title={`${t.applications}: ${data.applications}`}
                />
                <div 
                  className="bg-purple-500"
                  style={{ width: `${Math.min(data.hires * 5, 100)}%` }}
                  title={`${t.hires}: ${data.hires}`}
                />
              </div>
              <div className="w-20 text-right text-xs text-slate-500">
                {data.applications} / {data.hires}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-teal-500 rounded" />
            <span className="text-slate-600 dark:text-slate-400">{t.applications}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-purple-500 rounded" />
            <span className="text-slate-600 dark:text-slate-400">{t.hires}</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200 dark:border-teal-800 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          {t.recommendations}
        </h3>
        
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                rec.impact === 'high' ? "bg-green-100 text-green-700" :
                rec.impact === 'medium' ? "bg-amber-100 text-amber-700" :
                "bg-slate-100 text-slate-700"
              )}>
                {t[rec.impact as keyof typeof t]}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white text-sm">{rec.area}</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">{rec.suggestion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
