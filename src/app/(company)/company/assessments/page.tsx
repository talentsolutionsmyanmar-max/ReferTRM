'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Target,
  Award,
  Clock,
  CheckCircle2,
  X,
  Play,
  BarChart2,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  FileText,
  Download,
  Send,
  Sparkles,
  Layers,
  Heart,
  MessageSquare,
  User,
  Briefcase,
  Timer,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Assessment categories
const assessmentCategories = [
  { id: 'technical', label: 'Technical Skills', icon: Brain, color: 'purple' },
  { id: 'personality', label: 'Personality', icon: Heart, color: 'pink' },
  { id: 'culture', label: 'Culture Fit', icon: Users, color: 'teal' },
  { id: 'cognitive', label: 'Cognitive', icon: Target, color: 'amber' },
];

// Pre-built assessments
const assessments = [
  {
    id: 'js-fundamentals',
    name: 'JavaScript Fundamentals',
    category: 'technical',
    duration: 30,
    questions: 20,
    difficulty: 'intermediate',
    description: 'Test core JavaScript concepts including ES6+, async programming, and DOM manipulation.',
    roles: ['software-engineer', 'frontend-developer', 'full-stack-developer'],
  },
  {
    id: 'python-basics',
    name: 'Python Basics',
    category: 'technical',
    duration: 25,
    questions: 15,
    difficulty: 'beginner',
    description: 'Evaluate Python fundamentals, data structures, and basic algorithms.',
    roles: ['data-analyst', 'backend-developer', 'software-engineer'],
  },
  {
    id: 'sql-proficiency',
    name: 'SQL Proficiency',
    category: 'technical',
    duration: 20,
    questions: 15,
    difficulty: 'intermediate',
    description: 'Assess SQL querying skills, joins, aggregations, and database design.',
    roles: ['data-analyst', 'backend-developer', 'database-admin'],
  },
  {
    id: 'big-five',
    name: 'Big Five Personality',
    category: 'personality',
    duration: 15,
    questions: 50,
    difficulty: 'standard',
    description: 'Comprehensive personality assessment measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    roles: ['all'],
  },
  {
    id: 'leadership-style',
    name: 'Leadership Style Assessment',
    category: 'personality',
    duration: 10,
    questions: 25,
    difficulty: 'standard',
    description: 'Identify leadership tendencies and management style preferences.',
    roles: ['manager', 'team-lead', 'executive'],
  },
  {
    id: 'culture-match',
    name: 'Culture Fit Evaluation',
    category: 'culture',
    duration: 10,
    questions: 20,
    difficulty: 'standard',
    description: 'Assess alignment with company values, work style, and team dynamics.',
    roles: ['all'],
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving Test',
    category: 'cognitive',
    duration: 20,
    questions: 12,
    difficulty: 'advanced',
    description: 'Evaluate analytical thinking, logical reasoning, and creative problem-solving.',
    roles: ['all'],
  },
  {
    id: 'verbal-reasoning',
    name: 'Verbal Reasoning',
    category: 'cognitive',
    duration: 15,
    questions: 20,
    difficulty: 'intermediate',
    description: 'Test comprehension, critical analysis, and verbal logic skills.',
    roles: ['all'],
  },
];

// Sample questions for demo
const sampleQuestions = {
  'js-fundamentals': [
    {
      question: 'What will be the output of: console.log(typeof null)?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correct: 2,
      explanation: 'In JavaScript, typeof null returns "object" due to a historical bug that has been maintained for backward compatibility.',
    },
    {
      question: 'Which method creates a new array with elements that pass a test?',
      options: ['map()', 'filter()', 'reduce()', 'forEach()'],
      correct: 1,
      explanation: 'The filter() method creates a new array with all elements that pass the test implemented by the provided function.',
    },
    {
      question: 'What is the output of: Promise.resolve(1).then(() => 2).then(console.log)?',
      options: ['1', '2', 'undefined', 'Promise { 2 }'],
      correct: 1,
      explanation: 'The then() chain passes values through, so the final console.log receives 2.',
    },
  ],
  'big-five': [
    {
      question: 'I enjoy meeting new people and trying new experiences.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      type: 'openness',
    },
    {
      question: 'I prefer to have a clear plan and stick to it.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      type: 'conscientiousness',
    },
    {
      question: 'I feel energized after spending time with a group of people.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      type: 'extraversion',
    },
  ],
};

// Mock assessment results
const mockResults = [
  {
    id: '1',
    candidateName: 'Mya Myint',
    assessment: 'JavaScript Fundamentals',
    score: 85,
    date: '2025-01-15',
    status: 'completed',
    duration: '28 min',
    percentile: 78,
  },
  {
    id: '2',
    candidateName: 'Aung Ko',
    assessment: 'Big Five Personality',
    score: 92,
    date: '2025-01-14',
    status: 'completed',
    duration: '14 min',
    percentile: 85,
  },
  {
    id: '3',
    candidateName: 'Su Lwin',
    assessment: 'SQL Proficiency',
    score: 78,
    date: '2025-01-14',
    status: 'completed',
    duration: '19 min',
    percentile: 65,
  },
  {
    id: '4',
    candidateName: 'Thura Aung',
    assessment: 'Problem Solving Test',
    score: 45,
    date: '2025-01-13',
    status: 'in-progress',
    duration: '12 min',
    percentile: null,
  },
];

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState('assessments');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  // Filter assessments by category
  const filteredAssessments = selectedCategory
    ? assessments.filter(a => a.category === selectedCategory)
    : assessments;

  const handleStartAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setIsTakingTest(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestComplete(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const assessment = assessments.find(a => a.id === selectedAssessment);
    const questions = sampleQuestions[selectedAssessment as keyof typeof sampleQuestions] || [];
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTestComplete(true);
    }
  };

  const calculateScore = () => {
    const questions = sampleQuestions[selectedAssessment as keyof typeof sampleQuestions] || [];
    const correctCount = answers.reduce((count, answer, idx) => {
      const question = questions[idx] as { correct?: number };
      if ('correct' in question && question.correct === answer) {
        return count + 1;
      }
      return count;
    }, 0);
    return Math.round((correctCount / questions.length) * 100);
  };

  const currentAssessment = assessments.find(a => a.id === selectedAssessment);
  const questions = sampleQuestions[selectedAssessment as keyof typeof sampleQuestions] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="h-7 w-7 text-purple-400" />
            Candidate Assessments
          </h1>
          <p className="text-slate-400 mt-1">
            Skill tests, personality assessments, and culture fit evaluation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Scored
          </Badge>
          <Badge variant="outline" className="border-teal-500/50 text-teal-400">
            8 Assessments
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Assessments', value: '8', color: 'text-purple-400' },
          { icon: Users, label: 'Completed', value: '45', color: 'text-teal-400' },
          { icon: Clock, label: 'Avg Duration', value: '18m', color: 'text-amber-400' },
          { icon: TrendingUp, label: 'Avg Score', value: '76%', color: 'text-green-400' },
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-card p-1 mb-6">
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Assessment Library
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Custom
          </TabsTrigger>
        </TabsList>

        {/* Assessment Library */}
        <TabsContent value="assessments">
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? 'bg-teal-500 text-white' : 'border-white/10 text-slate-400'}
              >
                All Assessments
              </Button>
              {assessmentCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id 
                    ? `bg-${cat.color}-500 text-white` 
                    : 'border-white/10 text-slate-400'}
                >
                  <cat.icon className="h-4 w-4 mr-2" />
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Assessment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssessments.map((assessment, idx) => {
                const category = assessmentCategories.find(c => c.id === assessment.category);
                return (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="glass-card border-white/5 h-full hover:border-white/20 transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg bg-${category?.color}-500/20`}>
                            {category && <category.icon className={`h-5 w-5 text-${category.color}-400`} />}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              assessment.difficulty === 'beginner' ? 'border-green-500/50 text-green-400' :
                              assessment.difficulty === 'intermediate' ? 'border-amber-500/50 text-amber-400' :
                              assessment.difficulty === 'advanced' ? 'border-red-500/50 text-red-400' :
                              'border-slate-500/50 text-slate-400'
                            }
                          >
                            {assessment.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-lg mt-3">{assessment.name}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {assessment.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {assessment.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {assessment.questions} questions
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/10 hover:bg-white/5"
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStartAssessment(assessment.id)}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Start Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Results */}
        <TabsContent value="results">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-white">Assessment Results</CardTitle>
              <CardDescription>View and analyze candidate performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Candidate</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Assessment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Percentile</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Duration</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.map((result) => (
                      <tr key={result.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                              <span className="text-sm font-medium text-teal-400">{result.candidateName.charAt(0)}</span>
                            </div>
                            <span className="text-white font-medium">{result.candidateName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{result.assessment}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  result.score >= 80 ? 'bg-green-500' :
                                  result.score >= 60 ? 'bg-teal-500' :
                                  result.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${result.score}%` }}
                              />
                            </div>
                            <span className="text-white font-medium">{result.score}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {result.percentile ? `Top ${100 - result.percentile}%` : '-'}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{result.duration}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              result.status === 'completed' 
                                ? 'border-green-500/50 text-green-400'
                                : 'border-amber-500/50 text-amber-400'
                            }
                          >
                            {result.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Custom */}
        <TabsContent value="create">
          <Card className="glass-card border-white/5">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Create Custom Assessment</h3>
                <p className="text-slate-400 max-w-md mb-6">
                  Build your own assessments with AI-powered question generation tailored to your specific requirements.
                </p>
                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate with AI
                  </Button>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    Coming Soon
                  </Badge>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
                  {[
                    { icon: Brain, label: 'AI Question Gen', desc: 'Auto-generate questions from job description' },
                    { icon: Target, label: 'Custom Scoring', desc: 'Define your own scoring criteria' },
                    { icon: BarChart2, label: 'Analytics', desc: 'Detailed performance insights' },
                  ].map((feature) => (
                    <div key={feature.label} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                      <feature.icon className="h-6 w-6 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white text-sm">{feature.label}</h4>
                      <p className="text-xs text-slate-500">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Modal */}
      <AnimatePresence>
        {isTakingTest && selectedAssessment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass-card p-6 bg-slate-900 border border-white/10"
            >
              {!testComplete ? (
                <>
                  {/* Test Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">{currentAssessment?.name}</h2>
                      <p className="text-sm text-slate-400">
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                        <Timer className="h-3 w-3 mr-1" />
                        {currentAssessment?.duration} min
                      </Badge>
                      <button
                        onClick={() => setIsTakingTest(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress */}
                  <Progress 
                    value={((currentQuestion + 1) / questions.length) * 100} 
                    className="h-2 bg-slate-700 mb-6" 
                  />

                  {/* Question */}
                  {questions[currentQuestion] && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                        <p className="text-lg text-white">{(questions[currentQuestion] as { question: string }).question}</p>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {(questions[currentQuestion] as { options: string[] }).options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:border-purple-500/50 text-left transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-300">
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <span className="text-slate-300">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Test Complete */
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Assessment Complete!</h2>
                  <p className="text-slate-400 mb-6">Your responses have been recorded.</p>
                  
                  <div className="p-6 rounded-xl bg-slate-800/50 border border-white/5 mb-6">
                    <p className="text-sm text-slate-400 mb-2">Your Score</p>
                    <p className="text-5xl font-bold text-white mb-4">{calculateScore()}%</p>
                    <Progress value={calculateScore()} className="h-3 bg-slate-700" />
                    <p className="text-sm text-slate-400 mt-4">
                      {calculateScore() >= 80 ? 'Excellent! You performed above average.' :
                       calculateScore() >= 60 ? 'Good job! You met the passing threshold.' :
                       'Keep practicing! There\'s room for improvement.'}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setIsTakingTest(false)}
                      className="border-white/10 hover:bg-white/5"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers([]);
                        setTestComplete(false);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pro Tips */}
      <Card className="glass-card border-white/5 bg-gradient-to-r from-teal-500/5 to-cyan-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-teal-500/20">
              <MessageSquare className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Assessment Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  Combine technical + personality for complete picture
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  Allow 24-48 hours for assessment completion
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  Use scores as one data point, not sole criteria
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  Customize difficulty based on role seniority
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Missing import
function Plus({ className }: { className?: string }) {
  return <span className={className}>+</span>;
}
