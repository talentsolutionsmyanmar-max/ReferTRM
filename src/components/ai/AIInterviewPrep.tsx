'use client';

import { useState, useCallback } from 'react';
import { 
  MessageSquare, 
  Send, 
  RefreshCw, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Check,
  AlertCircle,
  Mic,
  FileText,
  Clock,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational' | 'common';
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  sampleAnswer: string;
  followUpQuestions?: string[];
}

interface AnswerFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestedAnswer: string;
  keyPoints: string[];
  tone: string;
  length: string;
}

interface AIInterviewPrepProps {
  jobRole: string;
  company?: string;
  experienceLevel?: 'entry' | 'junior' | 'mid' | 'senior';
  language?: 'en' | 'my';
}

export default function AIInterviewPrep({
  jobRole,
  company,
  experienceLevel = 'mid',
  language = 'en',
}: AIInterviewPrepProps) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preparationTips, setPreparationTips] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const generateQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setUserAnswer('');
    
    try {
      const response = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole,
          company,
          experienceLevel,
          interviewType: 'mixed',
          difficulty: 'medium',
          count: 5,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
        setCurrentQuestion(data.questions[0]);
        setPreparationTips(data.preparationTips || []);
        setQuestionIndex(0);
      } else {
        setError(data.error || 'Failed to generate questions');
      }
    } catch (err) {
      setError('Failed to generate questions');
    } finally {
      setLoading(false);
    }
  }, [jobRole, company, experienceLevel]);

  const submitAnswer = useCallback(async () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    
    setFeedbackLoading(true);
    
    try {
      const response = await fetch('/api/ai/interview-prep', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer,
          jobRole,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFeedback(data.feedback);
      }
    } catch (err) {
      console.error('Failed to get feedback:', err);
    } finally {
      setFeedbackLoading(false);
    }
  }, [currentQuestion, userAnswer, jobRole]);

  const nextQuestion = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setUserAnswer('');
      setFeedback(null);
      setShowHints(false);
      setShowSampleAnswer(false);
    }
  }, [questionIndex, questions]);

  const prevQuestion = useCallback(() => {
    const prevIndex = questionIndex - 1;
    if (prevIndex >= 0) {
      setQuestionIndex(prevIndex);
      setCurrentQuestion(questions[prevIndex]);
      setUserAnswer('');
      setFeedback(null);
      setShowHints(false);
      setShowSampleAnswer(false);
    }
  }, [questionIndex, questions]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'behavioral': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'technical': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'situational': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      default: return 'text-green-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const texts = {
    en: {
      title: 'AI Interview Prep',
      subtitle: 'Practice with AI-generated questions',
      startPractice: 'Start Practice',
      generating: 'Generating questions...',
      question: 'Question',
      of: 'of',
      hints: 'Need a hint?',
      showHints: 'Show Hints',
      hideHints: 'Hide Hints',
      sampleAnswer: 'Sample Answer',
      showAnswer: 'Show Sample Answer',
      hideAnswer: 'Hide Sample Answer',
      yourAnswer: 'Your Answer',
      placeholder: 'Type your answer here...',
      submitAnswer: 'Submit Answer',
      submitting: 'Analyzing...',
      feedback: 'AI Feedback',
      strengths: 'Strengths',
      improvements: 'Areas for Improvement',
      suggestedAnswer: 'Suggested Answer',
      keyPoints: 'Key Points to Include',
      score: 'Score',
      previous: 'Previous',
      next: 'Next',
      completed: 'Completed',
      preparationTips: 'Preparation Tips',
    },
    my: {
      title: 'AI အင်တာဗျူး ပြင်ဆင်မှု',
      subtitle: 'AI မေးခွန်းများဖြင့် လေ့ကျင့်ပါ',
      startPractice: 'လေ့ကျင့်မှုစတင်ပါ',
      generating: 'မေးခွန်းများ ပြင်ဆင်နေသည်...',
      question: 'မေးခွန်း',
      of: '၏',
      hints: 'အကူအညီလိုပါသလား?',
      showHints: 'အကြံပြုချက်များပြပါ',
      hideHints: 'အကြံပြုချက်များဖျောက်ပါ',
      sampleAnswer: 'နမူနာအဖြေ',
      showAnswer: 'နမူနာအဖြေပြပါ',
      hideAnswer: 'နမူနာအဖြေဖျောက်ပါ',
      yourAnswer: 'သင့်အဖြေ',
      placeholder: 'သင့်အဖြေကို ဤနေရာတွင်ရိုက်ပါ...',
      submitAnswer: 'အဖြေတင်သွင်းပါ',
      submitting: 'ခွဲခြမ်းစိတ်ဖြာနေသည်...',
      feedback: 'AI တုံ့ပြန်ချက်',
      strengths: 'အားသာချက်များ',
      improvements: 'တိုးတက်ရန်နေရာများ',
      suggestedAnswer: 'အကြံပြုအဖြေ',
      keyPoints: 'ထည့်သွင်းသင့်သော အချက်များ',
      score: 'ရမှတ်',
      previous: 'နောက်သို့',
      next: 'ရှေ့သို့',
      completed: 'ပြီးပြီ',
      preparationTips: 'ပြင်ဆင်မှု အကြံပြုချက်များ',
    },
  };

  const t = texts[language];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-sm text-white/80">{t.subtitle}</p>
          </div>
        </div>
        
        {jobRole && (
          <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
            <Target className="w-4 h-4" />
            <span>{jobRole}</span>
            {company && <span className="text-white/60">@ {company}</span>}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Start Practice Button */}
        {questions.length === 0 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-10 h-10 text-purple-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {language === 'my'
                ? 'သင့်ရာထူးအတွက် သင့်တော်သော မေးခွန်းများကို လေ့ကျင့်ပါမည်။'
                : 'We\'ll generate practice questions tailored to your target role.'}
            </p>
            <button
              onClick={generateQuestions}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {t.generating}
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  {t.startPractice}
                </>
              )}
            </button>
            {error && (
              <p className="mt-4 text-red-500 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>
        )}

        {/* Questions */}
        {currentQuestion && (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                {t.question} {questionIndex + 1} {t.of} {questions.length}
              </span>
              <div className="flex gap-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  getCategoryColor(currentQuestion.category)
                )}>
                  {currentQuestion.category}
                </span>
                <span className={cn("text-xs font-medium", getDifficultyColor(currentQuestion.difficulty))}>
                  {currentQuestion.difficulty}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-lg font-medium text-slate-900 dark:text-white">
                {currentQuestion.question}
              </p>
            </div>

            {/* Hints */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700"
              >
                <Lightbulb className="w-4 h-4" />
                {showHints ? t.hideHints : t.showHints}
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showHints && (
                <ul className="mt-2 space-y-1">
                  {currentQuestion.hints.map((hint, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5" />
                      {hint}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.yourAnswer}
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={t.placeholder}
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim() || feedbackLoading}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {feedbackLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.submitAnswer}
                  </>
                )}
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                    {t.feedback}
                  </h3>
                  <div className={cn("text-2xl font-bold", getScoreColor(feedback.score))}>
                    {feedback.score}%
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">
                      {t.strengths}
                    </h4>
                    <ul className="space-y-1">
                      {feedback.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                      {t.improvements}
                    </h4>
                    <ul className="space-y-1">
                      {feedback.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {feedback.keyPoints.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-slate-500 mb-2">{t.keyPoints}</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.keyPoints.map((point, i) => (
                        <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sample Answer (revealed after feedback) */}
            {(feedback || showSampleAnswer) && currentQuestion.sampleAnswer && (
              <div>
                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  <FileText className="w-4 h-4" />
                  {showSampleAnswer ? t.hideAnswer : t.showAnswer}
                </button>
                
                {showSampleAnswer && (
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {currentQuestion.sampleAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={prevQuestion}
                disabled={questionIndex === 0}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 disabled:opacity-50 flex items-center gap-1"
              >
                <ChevronUp className="w-4 h-4 rotate-[-90deg]" />
                {t.previous}
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={questionIndex === questions.length - 1}
                className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 disabled:opacity-50 flex items-center gap-1"
              >
                {t.next}
                <ChevronUp className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        )}

        {/* Preparation Tips */}
        {preparationTips.length > 0 && questions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              {t.preparationTips}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {preparationTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-purple-500 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
