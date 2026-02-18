'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Clock, Star, ChevronRight, ChevronLeft, Check, Lock, Volume2, Download, 
  Filter, Search, Bookmark, Share2, Flame, Target, Lightbulb, TrendingUp, RefreshCw,
  VolumeX, Wifi, WifiOff, Brain, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  knowledgeCards,
  categoryInfo,
  difficultyInfo,
  getCardsByCategory,
  searchCards,
  getCardStats,
  type KnowledgeCard,
  type KnowledgeCategory,
} from '@/data/knowledge-cards';

type ViewMode = 'feed' | 'card';

export default function KnowledgeFeedPage() {
  const { user, addPoints } = useAuth();
  const { toast } = useToast();
  
  // State
  const [activeCategory, setActiveCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('feed');
  // State with lazy initialization from localStorage
  const [readCards, setReadCards] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('knowledge-read');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [savedCards, setSavedCards] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('knowledge-saved');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [downloadedCards, setDownloadedCards] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('knowledge-downloaded');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('knowledge-read', JSON.stringify([...readCards]));
  }, [readCards]);

  useEffect(() => {
    localStorage.setItem('knowledge-saved', JSON.stringify([...savedCards]));
  }, [savedCards]);

  useEffect(() => {
    localStorage.setItem('knowledge-downloaded', JSON.stringify([...downloadedCards]));
  }, [downloadedCards]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filter cards
  const filteredCards = activeCategory === 'all' 
    ? (searchQuery ? searchCards(searchQuery) : knowledgeCards)
    : getCardsByCategory(activeCategory);

  // Stats
  const stats = getCardStats();
  const readCount = readCards.size;
  const progressPercent = (readCount / stats.total) * 100;

  // Handle card read
  const handleReadCard = (card: KnowledgeCard) => {
    if (!readCards.has(card.id)) {
      const success = addPoints(card.points, `Read knowledge: ${card.title}`);
      if (success) {
        setReadCards(prev => new Set([...prev, card.id]));
        toast({
          title: `+${card.points} Points Earned!`,
          description: `You learned about: ${card.title}`,
        });
      }
    }
    setSelectedCard(card);
    setViewMode('card');
  };

  // Handle save
  const handleSaveCard = (cardId: string) => {
    if (savedCards.has(cardId)) {
      setSavedCards(prev => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
      toast({ title: 'Removed from saved' });
    } else {
      setSavedCards(prev => new Set([...prev, cardId]));
      toast({ title: 'Saved for later!' });
    }
  };

  // Handle download for offline
  const handleDownload = (card: KnowledgeCard) => {
    setDownloadedCards(prev => new Set([...prev, card.id]));
    toast({
      title: 'Downloaded for offline',
      description: 'You can read this without internet',
    });
  };

  // Text-to-speech
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  // Share
  const handleShare = async (card: KnowledgeCard) => {
    const shareText = `${card.title}\n\n${card.summary}\n\nLearn more on ReferTRM Academy!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: shareText,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Daily Knowledge</h1>
            {isOnline ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Wifi className="h-3 w-3 mr-1" /> Online
              </Badge>
            ) : (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <WifiOff className="h-3 w-3 mr-1" /> Offline
              </Badge>
            )}
          </div>
          <p className="text-slate-400 burmese-text">နေ့စဉ်ဗဟုသုတ - Learn, Earn Points, Grow!</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Flame className="h-5 w-5 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400">Knowledge Streak</div>
              <div className="text-lg font-bold text-amber-400">{readCount} cards</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
            <Star className="h-5 w-5 text-teal-400" />
            <div>
              <div className="text-xs text-slate-400">Points Earned</div>
              <div className="text-lg font-bold text-teal-400">
                +{[...readCards].reduce((sum, id) => {
                  const card = knowledgeCards.find(c => c.id === id);
                  return sum + (card?.points || 0);
                }, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Learning Progress</span>
            <span className="text-sm text-teal-400">{readCount}/{stats.total} cards</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-slate-700" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Keep learning to unlock more knowledge!</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'feed' ? (
        <>
          {/* Category Filter & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search knowledge... (စာရှာဖွေရန်)"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>
            
            {/* Category Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' 
                    : 'bg-slate-800/30 text-slate-400 hover:text-white'
                }`}
              >
                All ({stats.total})
              </button>
              {(Object.keys(categoryInfo) as KnowledgeCategory[]).map((cat) => {
                const info = categoryInfo[cat];
                const count = stats.byCategory[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeCategory === cat 
                        ? `${info.bgColor} ${info.textColor} border ${info.borderColor}` 
                        : 'bg-slate-800/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{info.icon}</span>
                    {info.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats by Category */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(Object.keys(categoryInfo) as KnowledgeCategory[]).map((cat) => {
              const info = categoryInfo[cat];
              const catCards = getCardsByCategory(cat);
              const catRead = catCards.filter(c => readCards.has(c.id)).length;
              
              return (
                <motion.div
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${info.bgColor} border ${info.borderColor}`}
                >
                  <div className="text-2xl mb-1">{info.icon}</div>
                  <div className={`text-lg font-bold ${info.textColor}`}>{catRead}/{catCards.length}</div>
                  <div className="text-xs text-slate-400">{info.labelMm}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Knowledge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card, index) => {
              const catInfo = categoryInfo[card.category];
              const diffInfo = difficultyInfo[card.difficulty];
              const isRead = readCards.has(card.id);
              const isSaved = savedCards.has(card.id);
              const isDownloaded = downloadedCards.has(card.id);

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handleReadCard(card)}
                  className="relative cursor-pointer group"
                >
                  <Card className={`glass-card overflow-hidden h-full transition-all ${
                    isRead ? 'border-teal-500/30' : 'border-white/5'
                  }`}>
                    {/* Category Header */}
                    <div className={`p-3 bg-gradient-to-r ${catInfo.color} bg-opacity-10`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{catInfo.icon}</span>
                          <span className={`text-sm font-medium ${catInfo.textColor}`}>{catInfo.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isDownloaded && (
                            <Download className="h-4 w-4 text-slate-400" />
                          )}
                          {isRead && (
                            <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">
                              <Check className="h-3 w-3 mr-1" /> Read
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-500 burmese-text mb-3">{card.titleMm}</p>

                      {/* Summary Preview */}
                      <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                        {card.summary}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {card.readTime} min
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${diffInfo.bgColor} ${diffInfo.color}`}>
                            {diffInfo.labelMm}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 font-medium">
                          <Star className="h-4 w-4" />
                          <span>+{card.points}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {card.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>

                    {/* Save Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveCard(card.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                        isSaved 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'bg-slate-800/50 text-slate-400 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No cards found</h3>
              <p className="text-slate-400">Try a different search or category</p>
            </div>
          )}
        </>
      ) : (
        /* CARD DETAIL VIEW */
        selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setViewMode('feed');
                setSelectedCard(null);
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Knowledge Feed
            </button>

            {/* Card Content */}
            <Card className="glass-card overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${categoryInfo[selectedCard.category].color}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{categoryInfo[selectedCard.category].icon}</span>
                      <Badge className={`${categoryInfo[selectedCard.category].bgColor} ${categoryInfo[selectedCard.category].textColor} border ${categoryInfo[selectedCard.category].borderColor}`}>
                        {categoryInfo[selectedCard.category].label}
                      </Badge>
                      <Badge className={`${difficultyInfo[selectedCard.difficulty].bgColor} ${difficultyInfo[selectedCard.difficulty].color}`}>
                        {difficultyInfo[selectedCard.difficulty].labelMm}
                      </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedCard.title}
                    </h1>
                    <p className="text-white/80 burmese-text text-lg">{selectedCard.titleMm}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-lg px-3 py-1">
                      <Star className="h-4 w-4 mr-1" /> +{selectedCard.points} pts
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-white/70 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {selectedCard.readTime} min read
                  </span>
                  {readCards.has(selectedCard.id) && (
                    <span className="flex items-center gap-1 text-teal-300">
                      <Check className="h-4 w-4" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <CardContent className="p-6 space-y-8">
                {/* Summary Section */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">Key Concept</h2>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <p className="text-lg text-slate-200 leading-relaxed">{selectedCard.summary}</p>
                    <p className="mt-3 text-slate-400 burmese-text">{selectedCard.summaryMm}</p>
                  </div>
                  
                  {/* Audio Button */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSpeak(`${selectedCard.title}. ${selectedCard.summary}`)}
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isSpeaking ? 'Stop' : 'Listen (အသံဖြင့်နားထောင်ရန်)'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleDownload(selectedCard)}
                      disabled={downloadedCards.has(selectedCard.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {downloadedCards.has(selectedCard.id) ? 'Downloaded' : 'Save Offline'}
                    </Button>
                  </div>
                </section>

                {/* Example Section */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-teal-400" />
                    <h2 className="text-xl font-bold text-white">Real Example</h2>
                  </div>
                  <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/20">
                    <p className="text-slate-200 leading-relaxed">{selectedCard.example}</p>
                    <p className="mt-3 text-slate-400 burmese-text">{selectedCard.exampleMm}</p>
                  </div>
                </section>

                {/* Application Section */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h2 className="text-xl font-bold text-white">How to Apply Tomorrow</h2>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <p className="text-slate-200 leading-relaxed">{selectedCard.application}</p>
                    <p className="mt-3 text-slate-400 burmese-text">{selectedCard.applicationMm}</p>
                  </div>
                </section>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedCard.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                  <Button
                    onClick={() => handleSaveCard(selectedCard.id)}
                    variant={savedCards.has(selectedCard.id) ? 'default' : 'outline'}
                    className={savedCards.has(selectedCard.id) ? 'bg-amber-500 hover:bg-amber-600' : 'border-white/10'}
                  >
                    <Bookmark className="h-4 w-4 mr-2" fill={savedCards.has(selectedCard.id) ? 'currentColor' : 'none'} />
                    {savedCards.has(selectedCard.id) ? 'Saved' : 'Save for Later'}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10"
                    onClick={() => handleShare(selectedCard)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {knowledgeCards
                  .filter(c => c.category === selectedCard.category && c.id !== selectedCard.id)
                  .slice(0, 3)
                  .map((card) => (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedCard(card);
                        handleReadCard(card);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer"
                    >
                      <Card className="glass-card p-4 hover:border-teal-500/30 transition-all">
                        <h4 className="font-medium text-white mb-1">{card.title}</h4>
                        <p className="text-sm text-slate-500 burmese-text">{card.titleMm}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">{card.readTime} min</span>
                          <span className="text-amber-400 text-sm">+{card.points} pts</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )
      )}

      {/* Floating Action Button for Mobile */}
      {viewMode === 'feed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-4 md:hidden z-40"
        >
          <Button
            className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30"
            onClick={() => {
              // Get next unread card
              const nextCard = knowledgeCards.find(c => !readCards.has(c.id));
              if (nextCard) {
                handleReadCard(nextCard);
              }
            }}
          >
            <Zap className="h-6 w-6 text-white" />
          </Button>
          <p className="text-xs text-center text-slate-400 mt-1">Quick Learn</p>
        </motion.div>
      )}
    </div>
  );
}
