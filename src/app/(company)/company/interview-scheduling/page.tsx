'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Mail,
  Phone,
  Send,
  RefreshCw,
  Brain,
  Timer,
  Globe,
  User,
  Briefcase,
  MessageSquare,
  Bell,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Interview types
const interviewTypes = [
  { value: 'phone', label: 'Phone Screen', duration: 30, icon: Phone },
  { value: 'video', label: 'Video Interview', duration: 45, icon: Video },
  { value: 'onsite', label: 'On-site Interview', duration: 60, icon: MapPin },
  { value: 'technical', label: 'Technical Assessment', duration: 90, icon: Brain },
  { value: 'panel', label: 'Panel Interview', duration: 60, icon: Users },
  { value: 'final', label: 'Final Round', duration: 60, icon: Check },
];

// Interviewers (mock data)
const interviewers = [
  { id: '1', name: 'Daw Mya Myint', role: 'HR Manager', avatar: 'M' },
  { id: '2', name: 'U Thura Aung', role: 'Tech Lead', avatar: 'T' },
  { id: '3', name: 'Daw Su Lwin', role: 'Department Head', avatar: 'S' },
  { id: '4', name: 'U Kyaw Min', role: 'Senior Developer', avatar: 'K' },
];

// Mock scheduled interviews
const mockInterviews = [
  {
    id: '1',
    candidateName: 'Mya Myint',
    position: 'Software Engineer',
    type: 'video',
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    time: '10:00',
    duration: 45,
    interviewer: 'U Thura Aung',
    status: 'confirmed',
    notes: 'Technical round - focus on React skills',
  },
  {
    id: '2',
    candidateName: 'Aung Ko',
    position: 'Sales Manager',
    type: 'onsite',
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    time: '14:00',
    duration: 60,
    interviewer: 'Daw Mya Myint',
    status: 'pending',
    notes: 'Final interview with department head',
  },
  {
    id: '3',
    candidateName: 'Su Lwin',
    position: 'Data Analyst',
    type: 'technical',
    date: new Date(Date.now() + 259200000).toISOString(), // 3 days
    time: '11:00',
    duration: 90,
    interviewer: 'U Kyaw Min',
    status: 'confirmed',
    notes: 'SQL and Python assessment',
  },
];

// Generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days: (number | null)[] = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
};

// AI suggested time slots
const generateAISlots = () => {
  const slots = [];
  const baseDate = new Date();
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date(baseDate.getTime() + i * 86400000);
    slots.push({
      date: date.toISOString(),
      time: '09:00',
      score: 95 - i * 3,
      reason: 'High availability - minimal conflicts',
    });
    slots.push({
      date: date.toISOString(),
      time: '14:00',
      score: 90 - i * 2,
      reason: 'Good slot - interviewer available',
    });
    slots.push({
      date: date.toISOString(),
      time: '16:00',
      score: 85 - i,
      reason: 'Afternoon slot - lower energy but available',
    });
  }
  
  return slots.sort((a, b) => b.score - a.score).slice(0, 5);
};

export default function InterviewSchedulingPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviews, setInterviews] = useState(mockInterviews);
  const [aiSlots] = useState(generateAISlots());
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  // Schedule form state
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
    interviewType: 'video',
    date: '',
    time: '10:00',
    duration: 45,
    interviewer: '',
    notes: '',
    sendReminder: true,
    timezone: 'Asia/Yangon',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
  };

  const getInterviewsForDate = (day: number) => {
    const dateStr = new Date(year, month, day).toDateString();
    return interviews.filter(i => new Date(i.date).toDateString() === dateStr);
  };

  const handleScheduleInterview = () => {
    const newInterview = {
      id: Date.now().toString(),
      candidateName: formData.candidateName,
      position: formData.position,
      type: formData.interviewType,
      date: new Date(formData.date).toISOString(),
      time: formData.time,
      duration: formData.duration,
      interviewer: interviewers.find(i => i.id === formData.interviewer)?.name || '',
      status: 'pending',
      notes: formData.notes,
    };

    setInterviews([...interviews, newInterview]);
    setShowScheduleModal(false);
    setFormData({
      candidateName: '',
      candidateEmail: '',
      position: '',
      interviewType: 'video',
      date: '',
      time: '10:00',
      duration: 45,
      interviewer: '',
      notes: '',
      sendReminder: true,
      timezone: 'Asia/Yangon',
    });
  };

  const selectedDateInterviews = selectedDate
    ? interviews.filter(i => new Date(i.date).toDateString() === selectedDate.toDateString())
    : [];

  const upcomingInterviews = interviews
    .filter(i => new Date(i.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-7 w-7 text-teal-400" />
            Interview Scheduling
          </h1>
          <p className="text-slate-400 mt-1">
            AI-powered scheduling with smart time suggestions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button
            onClick={() => setShowScheduleModal(true)}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'This Week', value: '8', color: 'text-teal-400' },
          { icon: Clock, label: 'Today', value: '2', color: 'text-amber-400' },
          { icon: Users, label: 'Pending', value: '5', color: 'text-purple-400' },
          { icon: Check, label: 'Confirmed', value: '12', color: 'text-green-400' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {monthNames[month]} {year}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="border-white/10 hover:bg-white/5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                  className="border-white/10 hover:bg-white/5 text-xs"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="border-white/10 hover:bg-white/5"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                const dayInterviews = day ? getInterviewsForDate(day) : [];
                const isToday = day && new Date(year, month, day).toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day && new Date(year, month, day).toDateString() === selectedDate.toDateString();

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: day ? 1.05 : 1 }}
                    onClick={() => day && setSelectedDate(new Date(year, month, day))}
                    className={`min-h-[80px] p-2 rounded-lg transition-all ${
                      day
                        ? isSelected
                          ? 'bg-teal-500/20 border border-teal-500/50'
                          : isToday
                          ? 'bg-amber-500/20 border border-amber-500/50'
                          : 'bg-slate-800/50 hover:bg-slate-700/50 border border-transparent'
                        : ''
                    }`}
                    disabled={!day}
                  >
                    {day && (
                      <>
                        <span className={`text-sm font-medium ${isToday ? 'text-amber-400' : 'text-white'}`}>
                          {day}
                        </span>
                        {dayInterviews.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {dayInterviews.slice(0, 2).map((interview) => (
                              <div
                                key={interview.id}
                                className={`text-xs px-1.5 py-0.5 rounded truncate ${
                                  interview.status === 'confirmed'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                }`}
                              >
                                {interview.time} - {interview.candidateName.split(' ')[0]}
                              </div>
                            ))}
                            {dayInterviews.length > 2 && (
                              <div className="text-xs text-slate-400 px-1">
                                +{dayInterviews.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions Panel */}
          <AnimatePresence>
            {showAISuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="glass-card border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      AI Recommended Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            date: new Date(slot.date).toISOString().split('T')[0],
                            time: slot.time,
                          });
                          setShowScheduleModal(true);
                          setShowAISuggestions(false);
                        }}
                        className="w-full p-3 rounded-lg bg-slate-800/50 border border-white/5 hover:border-purple-500/50 transition-all text-left"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">
                            {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                            {slot.score}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {slot.time}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{slot.reason}</p>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Date Details */}
          {selectedDate && (
            <Card className="glass-card border-white/5">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedDateInterviews.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No interviews scheduled</p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          date: selectedDate.toISOString().split('T')[0],
                        });
                        setShowScheduleModal(true);
                      }}
                      className="mt-3 bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                ) : (
                  selectedDateInterviews.map((interview) => {
                    const typeInfo = interviewTypes.find(t => t.value === interview.type);
                    return (
                      <div
                        key={interview.id}
                        className="p-3 rounded-lg bg-slate-800/50 border border-white/5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-white">{interview.candidateName}</p>
                            <p className="text-xs text-slate-400">{interview.position}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              interview.status === 'confirmed'
                                ? 'border-green-500/50 text-green-400'
                                : 'border-amber-500/50 text-amber-400'
                            }
                          >
                            {interview.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {interview.time} ({interview.duration}min)
                          </span>
                          {typeInfo && <typeInfo.icon className="h-3 w-3" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Interviewer: {interview.interviewer}
                        </p>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          )}

          {/* Upcoming Interviews */}
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-teal-400">
                      {interview.candidateName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{interview.candidateName}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {interview.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-card p-6 bg-slate-900 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-400" />
                  Schedule Interview
                </h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Candidate Name</Label>
                    <Input
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      placeholder="Full name"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <Input
                      type="email"
                      value={formData.candidateEmail}
                      onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                      placeholder="email@example.com"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Position</Label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Job title"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Interview Type</Label>
                    <Select value={formData.interviewType} onValueChange={(v) => setFormData({ ...formData, interviewType: v })}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {interviewTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-800">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Interviewer</Label>
                    <Select value={formData.interviewer} onValueChange={(v) => setFormData({ ...formData, interviewer: v })}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {interviewers.map((interviewer) => (
                          <SelectItem key={interviewer.id} value={interviewer.id} className="text-white hover:bg-slate-800">
                            {interviewer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Interview focus, special instructions..."
                    className="bg-slate-800/50 border-white/10 text-white min-h-[80px]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-400" />
                    Send reminder to candidate
                  </Label>
                  <Switch
                    checked={formData.sendReminder}
                    onCheckedChange={(v) => setFormData({ ...formData, sendReminder: v })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 border-white/10 hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleScheduleInterview}
                    disabled={!formData.candidateName || !formData.date || !formData.interviewer}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pro Tips */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Brain className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">AI Scheduling Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  Morning slots (9-11 AM) have 23% higher attendance
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  Avoid Monday mornings for better candidate energy
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  Schedule 48-72 hours in advance for best preparation
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  Video interviews have 15% lower no-show rate
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
