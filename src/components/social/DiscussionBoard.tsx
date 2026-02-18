'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Eye, 
  MessageCircle,
  Pin,
  Flame,
  Clock,
  Search,
  Plus,
  ChevronRight,
  RefreshCw,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Discussion {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  authorTitle?: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPinned: boolean;
  isHot: boolean;
  createdAt: string;
  lastActivityAt: string;
}

interface Category {
  id: string;
  name: string;
  nameMy: string;
  icon: string;
}

interface DiscussionBoardProps {
  language?: 'en' | 'my';
}

export default function DiscussionBoard({ language = 'en' }: DiscussionBoardProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const loadDiscussions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('sort', sortBy);
      if (searchQuery) params.append('search', searchQuery);
      params.append('limit', '20');

      const response = await fetch(`/api/social/discussions?${params}`);
      const data = await response.json();

      if (data.success) {
        setDiscussions(data.discussions);
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to load discussions:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, sortBy, searchQuery]);

  useEffect(() => {
    loadDiscussions();
  }, [loadDiscussions]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (days > 0) return language === 'my' ? `${days} ရက်ကြာ` : `${days}d`;
    if (hours > 0) return language === 'my' ? `${hours} နာရီကြာ` : `${hours}h`;
    return language === 'my' ? 'ယခု' : 'now';
  };

  const texts = {
    en: {
      title: 'Community Discussions',
      subtitle: 'Join the conversation',
      search: 'Search discussions...',
      allCategories: 'All Categories',
      latest: 'Latest',
      popular: 'Popular',
      trending: 'Trending',
      newDiscussion: 'New Discussion',
      views: 'views',
      replies: 'replies',
      pinned: 'Pinned',
      hot: 'Hot',
      refresh: 'Refresh',
      back: 'Back',
      lastActivity: 'Last activity',
    },
    my: {
      title: 'အသိုင်းအဝိုင်း ဆွေးနွေးမှုများ',
      subtitle: 'ဆွေးနွေးမှုတွင် ပါဝင်ပါ',
      search: 'ဆွေးနွေးမှုများ ရှာဖွေပါ...',
      allCategories: 'အမျိုးအစားအားလုံး',
      latest: 'နောက်ဆုံး',
      popular: 'ရေပန်းစား',
      trending: 'လူကြိုက်များ',
      newDiscussion: 'ဆွေးနွေးမှုအသစ်',
      views: 'ကြည့်ရှုမှု',
      replies: 'အဖြေများ',
      pinned: 'အရေးကြီး',
      hot: 'ပူပြင်း',
      refresh: 'ပြန်လည်ဖော်ပြပါ',
      back: 'နောက်သို့',
      lastActivity: 'နောက်ဆုံးလှုပ်ရှားမှု',
    },
  };

  const t = texts[language];

  if (selectedDiscussion) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setSelectedDiscussion(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {t.back}
          </button>
        </div>

        {/* Discussion Detail */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {selectedDiscussion.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
            <span>{selectedDiscussion.authorName}</span>
            <span>{selectedDiscussion.authorTitle}</span>
            <span>{formatTimeAgo(selectedDiscussion.createdAt)}</span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {selectedDiscussion.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedDiscussion.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-600 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {selectedDiscussion.views} {t.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {selectedDiscussion.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {selectedDiscussion.comments} {t.replies}
            </span>
          </div>
        </div>

        {/* Reply Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <textarea
              placeholder={language === 'my' ? 'သင့်အဖြေကို ရေးပါ...' : 'Write your reply...'}
              rows={3}
              className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button className="px-6 py-2 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600">
              {language === 'my' ? 'အဖြေပို့ပါ' : 'Post Reply'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">{t.title}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadDiscussions}
              disabled={loading}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-teal-600">
              <Plus className="w-4 h-4" />
              {t.newDiscussion}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              selectedCategory === 'all'
                ? "bg-teal-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
            )}
          >
            {t.allCategories}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
                selectedCategory === cat.id
                  ? "bg-teal-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              )}
            >
              {language === 'my' ? cat.nameMy : cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {[
            { id: 'latest', label: t.latest },
            { id: 'popular', label: t.popular },
            { id: 'trending', label: t.trending },
          ].map(sort => (
            <button
              key={sort.id}
              onClick={() => setSortBy(sort.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-colors",
                sortBy === sort.id
                  ? "bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
              )}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {language === 'my' ? 'ဆွေးနွေးမှုများ မရှိသေးပါ' : 'No discussions yet'}
          </div>
        ) : (
          discussions.map(discussion => (
            <button
              key={discussion.id}
              onClick={() => setSelectedDiscussion(discussion)}
              className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Badges */}
                <div className="flex flex-col gap-1 pt-1">
                  {discussion.isPinned && (
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <Pin className="w-4 h-4 text-amber-500" />
                    </div>
                  )}
                  {discussion.isHot && !discussion.isPinned && (
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Flame className="w-4 h-4 text-red-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-white line-clamp-2">
                    {discussion.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                    <span>{discussion.authorName}</span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(discussion.lastActivityAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {discussion.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {discussion.views}
                    </span>
                    <span className={cn(
                      "flex items-center gap-1",
                      discussion.isLiked && "text-red-500"
                    )}>
                      <Heart className={cn("w-4 h-4", discussion.isLiked && "fill-current")} />
                      {discussion.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {discussion.comments}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
