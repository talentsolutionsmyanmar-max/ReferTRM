'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Heart, 
  MessageCircle, 
  Share2, 
  Briefcase, 
  Users, 
  Trophy,
  GraduationCap,
  Target,
  UserPlus,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: string;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface ActivityFeedProps {
  userId?: string;
  language?: 'en' | 'my';
}

export default function ActivityFeed({ userId, language = 'en' }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (selectedType !== 'all') params.append('type', selectedType);
      params.append('limit', '20');

      const response = await fetch(`/api/social/activity?${params}`);
      const data = await response.json();

      if (data.success) {
        setActivities(data.activities);
      }
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, selectedType]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const handleLike = async (activityId: string, isLiked: boolean) => {
    // Optimistic update
    setActivities(prev => 
      prev.map(a => a.id === activityId 
        ? { ...a, isLiked: !isLiked, likes: isLiked ? a.likes - 1 : a.likes + 1 }
        : a
      )
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job_applied': return <Briefcase className="w-5 h-5" />;
      case 'referral_made': return <Users className="w-5 h-5" />;
      case 'achievement_earned': return <Trophy className="w-5 h-5" />;
      case 'course_completed': return <GraduationCap className="w-5 h-5" />;
      case 'milestone_reached': return <Target className="w-5 h-5" />;
      case 'connection_made': return <UserPlus className="w-5 h-5" />;
      case 'review_posted': return <Star className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'job_applied': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'referral_made': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'achievement_earned': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'course_completed': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'milestone_reached': return 'text-teal-500 bg-teal-100 dark:bg-teal-900/30';
      case 'connection_made': return 'text-pink-500 bg-pink-100 dark:bg-pink-900/30';
      default: return 'text-slate-500 bg-slate-100 dark:bg-slate-700';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return language === 'my' ? `${days} ရက်ကြာ` : `${days}d ago`;
    if (hours > 0) return language === 'my' ? `${hours} နာရီကြာ` : `${hours}h ago`;
    if (minutes > 0) return language === 'my' ? `${minutes} မိနစ်ကြာ` : `${minutes}m ago`;
    return language === 'my' ? 'ယခု' : 'Just now';
  };

  const texts = {
    en: {
      title: 'Activity Feed',
      subtitle: 'See what others are doing',
      all: 'All',
      refresh: 'Refresh',
      like: 'Like',
      liked: 'Liked',
      comment: 'Comment',
      share: 'Share',
    },
    my: {
      title: 'လုပ်ဆောင်ချက်များ',
      subtitle: 'အခြားသူများ ဘာလုပ်နေကြသည်ကို ကြည့်ပါ',
      all: 'အားလုံး',
      refresh: 'ပြန်လည်ဖော်ပြပါ',
      like: 'နှစ်သက်',
      liked: 'နှစ်သက်ပြီ',
      comment: 'မှတ်ချက်',
      share: 'မျှဝေ',
    },
  };

  const t = texts[language];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">{t.title}</h2>
          </div>
          <button
            onClick={loadActivities}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedType('all')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedType === 'all'
                ? "bg-teal-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            )}
          >
            {t.all}
          </button>
          <button className="px-4 py-2 rounded-full text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 whitespace-nowrap flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {language === 'my' ? 'စစ်ထုတ်ပါ' : 'Filter'}
          </button>
        </div>
      </div>

      {/* Activities */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {language === 'my' ? 'လုပ်ဆောင်ချက်များ မရှိသေးပါ' : 'No activities yet'}
          </div>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="p-4">
              <div className="flex gap-3">
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  getActivityColor(activity.type)
                )}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {activity.userName}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {' '}{activity.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {activity.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleLike(activity.id, activity.isLiked)}
                      className={cn(
                        "flex items-center gap-1 text-sm",
                        activity.isLiked ? "text-red-500" : "text-slate-400 hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", activity.isLiked && "fill-current")} />
                      <span>{activity.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                      className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{activity.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-teal-500">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Expanded Comments */}
                  {expandedActivity === activity.id && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={language === 'my' ? 'မှတ်ချက်ရေးပါ...' : 'Write a comment...'}
                          className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium">
                          {language === 'my' ? 'ပို့ပါ' : 'Post'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
