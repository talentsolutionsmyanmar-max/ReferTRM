'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Sparkles, RefreshCw, Volume2, Copy, Check, 
  MessageCircle, Lightbulb, HelpCircle, BookOpen, Briefcase, 
  TrendingUp, Heart, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  topic?: string;
}

// Suggested questions for quick start
const SUGGESTED_QUESTIONS = [
  { icon: Lightbulb, text: 'What is AI and how can I use it?', category: 'tech' },
  { icon: Briefcase, text: 'How do I start a small business?', category: 'business' },
  { icon: TrendingUp, text: 'How can I save money with low income?', category: 'economy' },
  { icon: BookOpen, text: 'How do I write a resume?', category: 'career' },
  { icon: Heart, text: 'How can I manage stress?', category: 'life' },
  { icon: Zap, text: 'How can I learn faster?', category: 'skills' },
];

export default function KnowledgeBuddyPage() {
  const { user, addPoints } = useAuth();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello! 👋 I'm your Knowledge Buddy!

I'm here to help you learn about technology, business, money, careers, and life skills. Ask me anything!

**Things I can help with:**
- 💻 Technology & AI
- 📈 Business & Entrepreneurship  
- 💰 Money & Savings
- 🚀 Career & Jobs
- 🎯 Life Skills & Learning

What would you like to learn today?

မင်္ဂလာပါ! ကျွန်တော် သင့်ဗဟုသုတ ဘာဒီဖြစ်ပါတယ်! ဘာသိချင်လဲ?`,
        timestamp: new Date(),
        topic: 'welcome'
      }]);
    }
  }, []);

  // Send message
  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/knowledge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.data.response,
          timestamp: new Date(),
          topic: data.data.topic
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Award points for asking questions
        if (addPoints) {
          addPoints(2, `Asked Knowledge Buddy: ${text.substring(0, 50)}...`);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Copy message
  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: 'Copied to clipboard!' });
  };

  // Text to speech
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '').replace(/[#*]/g, ''));
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clear conversation
  const handleClear = () => {
    setMessages([{
      id: 'welcome-new',
      role: 'assistant',
      content: `Conversation cleared! 🔄

What would you like to learn about? Ask me anything!`,
      timestamp: new Date(),
      topic: 'welcome'
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Knowledge Buddy</h1>
            <p className="text-slate-400 text-sm burmese-text">ဗဟုသုတ ဘာဒီ - ဘာသိချင်လဲ မေးပါ!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10"
            onClick={handleClear}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Clear
          </Button>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="glass-card flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-amber-500/20' 
                    : 'bg-teal-500/20'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Bot className="h-4 w-4 text-teal-400" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[85%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-amber-500/20 text-white rounded-tr-sm'
                      : 'bg-slate-800/50 text-slate-200 rounded-tl-sm'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('\n').map((line, i) => {
                        // Handle bold text
                        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <span key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Actions */}
                  <div className={`flex gap-2 mt-1 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.role === 'assistant' && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCopy(message.content, message.id)}
                          className="p-1 rounded hover:bg-white/5"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-slate-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleSpeak(message.content)}
                          className="p-1 rounded hover:bg-white/5"
                        >
                          <Volume2 className="h-3 w-3 text-slate-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-teal-400" />
              </div>
              <div className="bg-slate-800/50 rounded-2xl rounded-tl-sm p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Suggested Questions (show when few messages) */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.text)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/5 text-sm text-slate-300 hover:border-teal-500/30 hover:text-teal-400 transition-all"
                >
                  <q.icon className="h-3 w-3" />
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... (ဘာသိချင်လဲ မေးပါ)"
              className="flex-1 bg-slate-800/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-teal-500/50"
              rows={1}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>+2 points per question</span>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-white text-sm">Tips for best results</h4>
            <p className="text-slate-400 text-xs mt-1">
              Ask specific questions for better answers. Example: "How can I start selling online?" instead of "Tell me about business."
              I can help with technology, business, money, career, and life skills. I don't discuss politics or cryptocurrency.
            </p>
            <p className="text-slate-500 text-xs mt-2 burmese-text">
              သီးခြားမေးခွန်းများ မေးပါက ပိုကောင်းသောအဖြေများ ရမည်။ နည်းပညာ၊ စီးပွားရေး၊ ပိုက်ဆံ၊ အသက်မွေးဝမ်းကြောင်းနှင့် ဘဝကျွမ်းကျင်မှုများကို ကူညီပေးနိုင်သည်။
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
