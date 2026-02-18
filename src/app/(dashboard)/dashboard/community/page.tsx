'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  MessageSquare,
  Calendar,
  Star,
  Heart,
  Send,
  Clock,
  Pin,
  Lock,
  Award,
  Sparkles,
  TrendingUp,
  BookOpen,
  Briefcase,
  Target,
  Gift,
  ChevronRight,
  X,
  Video,
  Check,
  Bookmark,
  Coins,
  Sparkle,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  category: string;
  likes: number;
  comments: number;
  views: number;
  isPinned: boolean;
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tipAmount?: number;
}

interface Meetup {
  id: string;
  title: string;
  titleMm?: string;
  description: string;
  host: {
    name: string;
    avatar: string;
  };
  scheduledAt: string;
  duration: number;
  platform: string;
  attendees: number;
  maxAttendees?: number;
  pointCost: number;
  pointReward: number;
  status: 'upcoming' | 'live' | 'completed';
}

interface ForumCategory {
  id: string;
  name: string;
  nameMm?: string;
  icon: React.ElementType;
  description: string;
  postCount: number;
  color: string;
}

const forumCategories: ForumCategory[] = [
  {
    id: 'career',
    name: 'Career Advice',
    nameMm: 'အသက်မွေးဝမ်းကြောင်း အကြံပြုချက်',
    icon: Target,
    description: 'Get advice on career development and job searching',
    postCount: 45,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'interview',
    name: 'Interview Tips',
    nameMm: 'အင်တာဗျူး အကြံပြုချက်',
    icon: BookOpen,
    description: 'Share and learn interview techniques',
    postCount: 32,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'success',
    name: 'Success Stories',
    nameMm: 'အောင်မြင်မှု ဇာတ်ကြောင်းများ',
    icon: Award,
    description: 'Share your referral success stories',
    postCount: 28,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'jobs',
    name: 'Job Tips',
    nameMm: 'အလုပ် အကြံပြုချက်',
    icon: Briefcase,
    description: 'Discuss job opportunities and companies',
    postCount: 67,
    color: 'from-green-500 to-emerald-500',
  },
];

const recentPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How I earned 500K MMK in my first month as a referrer!',
    content: 'Want to share my journey and tips for success...',
    author: { name: 'Thidar Aung', avatar: '👩‍💼', level: 'Expert' },
    category: 'success',
    likes: 45,
    comments: 23,
    views: 234,
    isPinned: true,
    createdAt: '2 hours ago',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Best practices for interviewing at Myanmar tech companies',
    content: 'After interviewing at 5 companies, here are my tips...',
    author: { name: 'Zaw Min', avatar: '👨‍💻', level: 'Professional' },
    category: 'interview',
    likes: 32,
    comments: 15,
    views: 156,
    isPinned: false,
    createdAt: '5 hours ago',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'CV template that got me 3 interviews this week',
    content: 'I modified my CV using tips from the Academy...',
    author: { name: 'Mya Thein', avatar: '👩‍🎓', level: 'Master' },
    category: 'career',
    likes: 67,
    comments: 34,
    views: 445,
    isPinned: true,
    createdAt: '1 day ago',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Which companies are hiring urgently in Yangon?',
    content: 'Looking for urgent positions to refer candidates...',
    author: { name: 'Aung Ko', avatar: '👨‍🔧', level: 'Amateur' },
    category: 'jobs',
    likes: 12,
    comments: 28,
    views: 89,
    isPinned: false,
    createdAt: '3 hours ago',
    isLiked: false,
    isBookmarked: false,
  },
];

const upcomingMeetups: Meetup[] = [
  {
    id: '1',
    title: 'Referral Success Masterclass',
    titleMm: 'ရည်ညွှန်းအောင်မြင်မှု မာစတာကလပ်စ်',
    description: 'Learn top strategies from our most successful referrers. Live Q&A session included!',
    host: { name: 'Thidar Aung', avatar: '👩‍💼' },
    scheduledAt: 'Tomorrow, 7:00 PM',
    duration: 60,
    platform: 'Zoom',
    attendees: 45,
    maxAttendees: 100,
    pointCost: 50,
    pointReward: 20,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'CV Workshop with HR Expert',
    titleMm: 'HR ကျွမ်းကျင်သူနှင့် CV ပရိုဂရမ်',
    description: 'Get your CV reviewed by an experienced HR professional from a top company.',
    host: { name: 'Zaw Min', avatar: '👨‍💻' },
    scheduledAt: 'Saturday, 3:00 PM',
    duration: 90,
    platform: 'Google Meet',
    attendees: 23,
    maxAttendees: 30,
    pointCost: 100,
    pointReward: 30,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Weekly Community Hangout',
    titleMm: 'အပတ်စဉ် အသိုင်းအဝိုင်း တွေ့ဆုံပွဲ',
    description: 'Casual chat with fellow referrers. Share tips and make connections!',
    host: { name: 'Mya Thein', avatar: '👩‍🎓' },
    scheduledAt: 'Every Sunday, 5:00 PM',
    duration: 45,
    platform: 'Telegram',
    attendees: 67,
    pointCost: 0,
    pointReward: 10,
    status: 'upcoming',
  },
];

export default function CommunityPage() {
  const { user, deductPoints, addPoints } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'forum' | 'meetups'>('forum');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tippingPost, setTippingPost] = useState<ForumPost | null>(null);
  const [tipAmount, setTipAmount] = useState(10);
  const [posts, setPosts] = useState<ForumPost[]>(recentPosts);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'career',
  });

  const points = user?.points || 0;

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmarkPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
    toast({
      title: post?.isBookmarked ? 'Bookmark removed' : 'Post bookmarked!',
      description: post?.isBookmarked
        ? 'Post removed from your bookmarks'
        : 'You can find this post in your saved items',
    });
  };

  const handleOpenTipModal = (post: ForumPost) => {
    setTippingPost(post);
    setTipAmount(10);
    setShowTipModal(true);
  };

  const handleTipPost = () => {
    if (!tippingPost) return;

    if (!deductPoints(tipAmount, `Tipped post: ${tippingPost.title}`)) {
      toast({
        title: 'Not enough points',
        description: `You need ${tipAmount - points} more points to tip this post.`,
        variant: 'destructive',
        action: <ToastAction altText="Earn points">Earn points</ToastAction>,
      });
      return;
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === tippingPost.id
          ? { ...post, tipAmount: (post.tipAmount || 0) + tipAmount }
          : post
      )
    );

    toast({
      title: 'Tip sent! 🎁',
      description: `You tipped ${tipAmount} points to ${tippingPost.author.name}`,
    });

    setShowTipModal(false);
    setTippingPost(null);
  };

  const handleSubmitNewPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in the title and content.',
        variant: 'destructive',
      });
      return;
    }

    const newPostData: ForumPost = {
      id: `post_${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: user?.displayName || 'Anonymous',
        avatar: user?.avatar || '🧑',
        level: user?.level || 'Amateur',
      },
      category: newPost.category,
      likes: 0,
      comments: 0,
      views: 1,
      isPinned: false,
      createdAt: 'Just now',
      isLiked: false,
      isBookmarked: false,
    };

    setPosts([newPostData, ...posts]);
    addPoints(5, 'Created forum post');
    setShowNewPostModal(false);
    setNewPost({ title: '', content: '', category: 'career' });

    toast({
      title: 'Post created! 🎉',
      description: 'Your post is now live. +5 points for contributing!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-teal-400" />
            Community
          </h1>
          <p className="text-slate-400 burmese-text">အသိုင်းအဝိုင်း - ဆက်သွယ်ပါ၊ သင်ယူပါ</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            {recentPosts.length} Discussions
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm">
            <Video className="h-4 w-4 mr-1" />
            {upcomingMeetups.length} Meetups
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('forum')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'forum'
              ? 'bg-teal-500 text-slate-900'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Forum
        </button>
        <button
          onClick={() => setActiveTab('meetups')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'meetups'
              ? 'bg-teal-500 text-slate-900'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Video className="h-4 w-4" />
          Virtual Meetups
        </button>
      </div>

      {activeTab === 'forum' ? (
        <>
          {/* Forum Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-bold text-white mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {forumCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass-card-hover cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-3`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-1">{category.name}</h3>
                      <p className="text-slate-500 text-xs burmese-text">{category.nameMm}</p>
                      <p className="text-slate-400 text-xs mt-2">{category.postCount} posts</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Discussions</h2>
              <Button variant="outline" className="border-white/10 text-sm" onClick={() => setShowNewPostModal(true)}>
                <Send className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <div className="space-y-3">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="glass-card-hover cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{post.author.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {post.isPinned && (
                              <Pin className="h-4 w-4 text-amber-400" />
                            )}
                            <h3 className="text-white font-medium truncate">{post.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-slate-400">{post.author.name}</span>
                            <Badge variant="outline" className="border-white/10 text-slate-400 text-xs">
                              {post.author.level}
                            </Badge>
                            <span className="text-slate-500">{post.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLikePost(post.id);
                            }}
                            className={`flex items-center gap-1 hover:text-pink-400 transition-colors ${
                              post.isLiked ? 'text-pink-400' : ''
                            }`
                            }
                          >
                            <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-pink-400' : ''}`} />
                            {post.likes}
                          </button>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.views}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookmarkPost(post.id);
                            }}
                            className={`flex items-center gap-1 hover:text-teal-400 transition-colors ${
                              post.isBookmarked ? 'text-teal-400' : ''
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-teal-400' : ''}`} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenTipModal(post);
                            }}
                            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                            title="Tip this post"
                          >
                            <Coins className="h-4 w-4" />
                          </button>
                          {post.tipAmount && post.tipAmount > 0 && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                              <Gift className="h-3 w-3 mr-1" />
                              {post.tipAmount} tipped
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ask a Mentor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Ask a Mentor</h3>
                      <p className="text-slate-400 text-sm">Get personalized advice from experienced referrers</p>
                    </div>
                  </div>
                  <Button className="btn-primary">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat (150 pts)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        <>
          {/* Virtual Meetups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Upcoming Meetups</h2>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Gift className="h-3 w-3 mr-1" />
                Earn points by attending!
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMeetups.map((meetup, index) => (
                <motion.div
                  key={meetup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="glass-card-hover cursor-pointer h-full"
                    onClick={() => setSelectedMeetup(meetup)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {meetup.status === 'upcoming' ? 'Upcoming' : meetup.status}
                        </Badge>
                        <Badge variant="outline" className="border-white/10 text-slate-300">
                          {meetup.platform}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1">{meetup.title}</h3>
                      <p className="text-slate-500 text-xs burmese-text mb-3">{meetup.titleMm}</p>

                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">{meetup.description}</p>

                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{meetup.scheduledAt}</span>
                        <span className="text-slate-600">•</span>
                        <span>{meetup.duration} min</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-xl">{meetup.host.avatar}</div>
                        <span className="text-slate-300 text-sm">{meetup.host.name}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-slate-400">
                          {meetup.attendees} / {meetup.maxAttendees || '∞'} attendees
                        </span>
                        <div className="flex items-center gap-2">
                          {meetup.pointCost > 0 ? (
                            <span className="text-amber-400">{meetup.pointCost} pts</span>
                          ) : (
                            <span className="text-green-400">Free</span>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full btn-primary"
                        disabled={meetup.pointCost > points}
                      >
                        {meetup.pointCost > points ? (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Need {meetup.pointCost - points} more pts
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            RSVP Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Point Tipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-amber-400" />
                  Community Rewards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <Heart className="h-6 w-6 text-pink-400 mb-2" />
                    <h4 className="text-white font-medium mb-1">Tip Helpful Posts</h4>
                    <p className="text-slate-400 text-sm">Give points to members who help you</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <Award className="h-6 w-6 text-purple-400 mb-2" />
                    <h4 className="text-white font-medium mb-1">Earn from Tips</h4>
                    <p className="text-slate-400 text-sm">Receive points when others tip your content</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <TrendingUp className="h-6 w-6 text-teal-400 mb-2" />
                    <h4 className="text-white font-medium mb-1">Level Up Faster</h4>
                    <p className="text-slate-400 text-sm">Active community members rank higher</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* Meetup Detail Modal */}
      <AnimatePresence>
        {selectedMeetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedMeetup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg glass-card p-6 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMeetup(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                {selectedMeetup.platform} Meeting
              </Badge>

              <h2 className="text-2xl font-bold text-white mb-1">{selectedMeetup.title}</h2>
              <p className="text-slate-500 text-sm burmese-text mb-4">{selectedMeetup.titleMm}</p>

              <p className="text-slate-300 mb-6">{selectedMeetup.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-slate-800/50">
                  <div className="text-slate-500 text-sm">When</div>
                  <div className="text-white">{selectedMeetup.scheduledAt}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50">
                  <div className="text-slate-500 text-sm">Duration</div>
                  <div className="text-white">{selectedMeetup.duration} minutes</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50">
                  <div className="text-slate-500 text-sm">Host</div>
                  <div className="text-white flex items-center gap-2">
                    {selectedMeetup.host.avatar} {selectedMeetup.host.name}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50">
                  <div className="text-slate-500 text-sm">Attendees</div>
                  <div className="text-white">{selectedMeetup.attendees} / {selectedMeetup.maxAttendees || '∞'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-sm">Cost</div>
                    <div className="text-amber-400 font-bold text-lg">
                      {selectedMeetup.pointCost > 0 ? `${selectedMeetup.pointCost} points` : 'Free'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm">You'll earn</div>
                    <div className="text-green-400 font-bold text-lg">+{selectedMeetup.pointReward} pts</div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full btn-primary"
                disabled={selectedMeetup.pointCost > points}
              >
                {selectedMeetup.pointCost > points ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Need {selectedMeetup.pointCost - points} more points
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    RSVP - {selectedMeetup.pointCost > 0 ? `${selectedMeetup.pointCost} pts` : 'Free'}
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
