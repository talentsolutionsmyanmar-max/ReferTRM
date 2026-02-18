'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Target,
  Brain,
  Lightbulb,
  Check,
  Clock,
  DollarSign,
  Star,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  Code,
  BarChart3,
  Heart,
  Search,
  Filter,
  Layers,
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  careerTracks,
  CareerTrack,
  CareerLevel,
  SkillRequirement,
  getCareerTrack,
  calculateProgress,
} from '@/data/careerRoadmap';

// Category icons and colors
const categoryConfig = {
  technology: { icon: Code, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  recruitment: { icon: Users, color: 'from-green-500 to-teal-500', bg: 'bg-green-500/10', text: 'text-green-400' },
  marketing: { icon: BarChart3, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-500/10', text: 'text-pink-400' },
  sales: { icon: TrendingUp, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  hr: { icon: Shield, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  finance: { icon: DollarSign, color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  operations: { icon: Layers, color: 'from-slate-500 to-gray-500', bg: 'bg-slate-500/10', text: 'text-slate-400' },
  design: { icon: Sparkles, color: 'from-fuchsia-500 to-pink-500', bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400' },
};

// Skill level colors
const levelColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  expert: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

// Format salary
const formatSalary = (amount: number) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M MMK`;
  }
  return `${(amount / 100000).toFixed(0)}L MMK`;
};

export default function CareerRoadmapPage() {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CareerLevel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'knowledge' | 'competence' | 'attitude'>('knowledge');

  // Filter tracks
  const filteredTracks = careerTracks.filter(track =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.nameMm.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden glass-card p-8"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Career Roadmaps</h1>
              <p className="text-muted-foreground burmese-text text-lg">
                အလုပ်အကိုင်လမ်းကြောင်း လမ်းညွှန်များ • Plan Your Professional Journey
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-teal-400">{careerTracks.length}</div>
              <div className="text-sm text-muted-foreground">Career Tracks</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-400">
                {careerTracks.reduce((sum, t) => sum + t.levels.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Career Levels</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-400">50+</div>
              <div className="text-sm text-muted-foreground">Linked Courses</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-400">AI</div>
              <div className="text-sm text-muted-foreground">Personalized Path</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search career tracks..."
          className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-teal-400" />
            Select Career Track
          </h2>
          
          <div className="space-y-3">
            {filteredTracks.map((track, index) => {
              const config = categoryConfig[track.category];
              const CategoryIcon = config.icon;
              const isSelected = selectedTrack?.id === track.id;
              
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setSelectedTrack(track);
                    setSelectedLevel(null);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-500/50'
                      : 'bg-card border-border hover:border-teal-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center text-2xl`}>
                      {track.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{track.name}</h3>
                      <p className="text-xs text-muted-foreground burmese-text">{track.nameMm}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-[10px] ${config.bg} ${config.text} border-0`}>
                          {track.levels.length} Levels
                        </Badge>
                        <Badge className={`text-[10px] ${
                          track.demandLevel === 'high' ? 'bg-green-500/20 text-green-400' :
                          track.demandLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        } border-0`}>
                          {track.demandLevel} demand
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${isSelected ? 'text-teal-400' : 'text-muted-foreground'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Roadmap View */}
        <div className="lg:col-span-2">
          {!selectedTrack ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex items-center justify-center p-12 glass-card"
            >
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-12 w-12 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Select a Career Track</h3>
                <p className="text-muted-foreground max-w-md">
                  Choose a career path to explore the roadmap, required skills, and connected learning resources.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Track Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedTrack.color} flex items-center justify-center text-3xl`}>
                      {selectedTrack.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{selectedTrack.name}</h2>
                      <p className="text-muted-foreground burmese-text">{selectedTrack.nameMm}</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedTrack.description}</p>
                    </div>
                  </div>
                  <Badge className={`bg-green-500/20 text-green-400 border-green-500/30`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {selectedTrack.avgSalaryGrowth} growth
                  </Badge>
                </div>
              </motion.div>

              {/* Levels Roadmap */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-400" />
                  Career Progression
                </h3>
                
                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-green-500 via-yellow-500 via-orange-500 to-red-500" />
                  
                  <div className="space-y-4">
                    {selectedTrack.levels.map((level, index) => {
                      const isSelected = selectedLevel?.id === level.id;
                      const progress = calculateProgress(level, []);
                      
                      return (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedLevel(level)}
                          className={`relative pl-16 p-4 rounded-xl cursor-pointer transition-all border ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                              : 'bg-secondary/50 border-border hover:border-purple-500/30'
                          }`}
                        >
                          {/* Level Icon */}
                          <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-lg shadow-lg`}>
                            {level.icon}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-foreground">{level.title}</h4>
                                <Badge variant="outline" className="text-[10px] border-border">
                                  Level {level.level}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {level.yearsOfExperience.min}-{level.yearsOfExperience.max} years • {formatSalary(level.salaryRange.min)} - {formatSalary(level.salaryRange.max)}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-amber-400">{level.courses.filter(c => c.type === 'required').length} courses</div>
                              <div className="text-xs text-muted-foreground">required</div>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-1.5" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Level Detail */}
              {selectedLevel && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedLevel.color} flex items-center justify-center text-2xl`}>
                        {selectedLevel.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{selectedLevel.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatSalary(selectedLevel.salaryRange.min)} - {formatSalary(selectedLevel.salaryRange.max)} / month
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedLevel.yearsOfExperience.min}-{selectedLevel.yearsOfExperience.max} years
                    </Badge>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-6">
                    {[
                      { id: 'knowledge', label: 'Knowledge', icon: BookOpen, color: 'teal' },
                      { id: 'competence', label: 'Competence', icon: Target, color: 'purple' },
                      { id: 'attitude', label: 'Attitude', icon: Brain, color: 'amber' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? `bg-${tab.color}-500/20 text-${tab.color}-400 border border-${tab.color}-500/30`
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Knowledge Tab */}
                  {activeTab === 'knowledge' && (
                    <div className="space-y-4">
                      {selectedLevel.knowledge.map((category, index) => (
                        <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border">
                          <h4 className="font-bold text-foreground mb-3">{category.category}</h4>
                          <div className="space-y-2">
                            {category.skills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                                <div className="flex items-center gap-2">
                                  <Circle className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <span className="text-foreground">{skill.name}</span>
                                    {skill.description && (
                                      <p className="text-xs text-muted-foreground">{skill.description}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={`text-[10px] ${levelColors[skill.level]} border`}>
                                    {skill.level}
                                  </Badge>
                                  <Badge className={`text-[10px] ${
                                    skill.importance === 'required' ? 'bg-red-500/20 text-red-400' :
                                    skill.importance === 'recommended' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-green-500/20 text-green-400'
                                  } border-0`}>
                                    {skill.importance}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Competence Tab */}
                  {activeTab === 'competence' && (
                    <div className="space-y-4">
                      {selectedLevel.competence.map((category, index) => (
                        <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border">
                          <h4 className="font-bold text-foreground mb-3">{category.category}</h4>
                          <div className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="flex-1">
                                  <span className="text-foreground">{item.description}</span>
                                  {item.metric && (
                                    <Badge variant="outline" className="ml-2 text-[10px] border-border">
                                      {item.metric}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Attitude Tab */}
                  {activeTab === 'attitude' && (
                    <div className="space-y-4">
                      {selectedLevel.attitude.map((category, index) => (
                        <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border">
                          <h4 className="font-bold text-foreground mb-3">{category.category}</h4>
                          <div className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="p-3 rounded-lg bg-background/50">
                                <div className="flex items-center gap-2 mb-2">
                                  <Heart className="h-4 w-4 text-red-400" />
                                  <span className="font-medium text-foreground">{item.trait}</span>
                                  {item.traitMm && (
                                    <span className="text-xs text-muted-foreground burmese-text">({item.traitMm})</span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.indicators.map((indicator, indIndex) => (
                                    <Badge key={indIndex} variant="outline" className="text-[10px] border-border">
                                      {indicator}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Connected Courses */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-teal-400" />
                        Connected Academy Courses
                      </h4>
                      <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                        {selectedLevel.courses.filter(c => c.type === 'required').length} Required
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedLevel.courses.map((course, index) => (
                        <Link key={index} href={course.academyLink || '/dashboard/academy'}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-3 rounded-xl bg-card border border-border hover:border-teal-500/30 transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Play className="h-4 w-4 text-teal-400" />
                                <span className="font-medium text-foreground text-sm">{course.title}</span>
                              </div>
                              {course.type === 'required' ? (
                                <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px]">Required</Badge>
                              ) : (
                                <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px]">Recommended</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{course.estimatedHours} hours</span>
                              <ExternalLink className="h-3 w-3 ml-auto" />
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                    
                    <Link href="/dashboard/academy">
                      <Button className="w-full mt-4 btn-primary">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Go to Academy
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Tools */}
                  <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-400" />
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLevel.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="border-border">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Next Level Tips */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-purple-400" />
                      Tips for Next Level
                    </h4>
                    <ul className="space-y-2">
                      {selectedLevel.nextLevelTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-6"
      >
        <p className="text-muted-foreground text-sm">
          Made with <Heart className="h-4 w-4 text-red-400 inline" fill="currentColor" /> for Myanmar&apos;s professionals
        </p>
      </motion.div>
    </div>
  );
}
