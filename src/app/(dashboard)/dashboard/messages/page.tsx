'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Send, 
  User, 
  Building2, 
  RefreshCw,
  CheckCheck,
  Clock,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'referrer' | 'hr' | 'candidate';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  company?: string;
  lastMessage: string;
  unread: number;
  avatar?: string;
}

// Demo conversations
const demoConversations: Conversation[] = [
  {
    id: 'conv_001',
    name: 'KBZ Bank HR',
    role: 'hr',
    company: 'KBZ Bank',
    lastMessage: 'Interview scheduled for Feb 20, 2025',
    unread: 2,
  },
  {
    id: 'conv_002',
    name: 'Wave Money Recruitment',
    role: 'hr',
    company: 'Wave Money',
    lastMessage: 'Thank you for your application',
    unread: 0,
  },
  {
    id: 'conv_003',
    name: 'MPT HR Team',
    role: 'hr',
    company: 'MPT',
    lastMessage: 'We reviewed your profile',
    unread: 1,
  },
];

export default function MessagesPage() {
  const params = useParams();
  const conversationId = params.conversationId as string;
  
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [userId] = useState('demo_user');
  const [userName] = useState('Demo User');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    
    try {
      const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : '';
      const response = await fetch(
        `/api/chat?conversationId=${conversationId}&userId=${userId}${lastMessageId ? `&lastMessageId=${lastMessageId}` : ''}`
      );
      const data = await response.json();
      
      if (data.success) {
        if (data.messages.length > 0) {
          setMessages(prev => [...prev, ...data.messages]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, [conversationId, userId, messages]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          senderId: userId,
          senderName: userName,
          senderRole: 'candidate',
          content: newMessage.trim(),
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Start polling for new messages
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;
    
    setPolling(true);
    pollingRef.current = setInterval(() => {
      fetchMessages();
    }, 5000); // Poll every 5 seconds
  }, [fetchMessages]);

  // Stop polling
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setPolling(false);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start/stop polling based on conversation
  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      startPolling();
    }
    
    return () => stopPolling();
  }, [conversationId, startPolling, fetchMessages]);

  // Format time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Conversation list view
  if (!conversationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto p-4 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">သတင်းစကားများ</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm px-3 py-1 rounded-full">
                {conversations.reduce((acc, c) => acc + c.unread, 0)} unread
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Conversations List */}
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/dashboard/messages/${conv.id}`}
                className="block p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                    {conv.role === 'hr' ? <Building2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                        {conv.name}
                      </h3>
                      {conv.unread > 0 && (
                        <span className="bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {conv.lastMessage}
                    </p>
                    {conv.company && (
                      <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                        {conv.company}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chat view
  const currentConversation = conversations.find(c => c.id === conversationId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/dashboard/messages" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {currentConversation?.name || 'Chat'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentConversation?.company} • {polling ? 'Online' : 'Offline'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchMessages}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <RefreshCw className={`w-5 h-5 text-slate-600 dark:text-slate-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <Phone className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <Video className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Start a conversation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Send a message to begin chatting with {currentConversation?.name}
              </p>
            </div>
          )}
          
          {messages.map((msg) => {
            const isOwn = msg.senderId === userId;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwn ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      isOwn
                        ? 'bg-teal-500 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{formatTime(msg.timestamp)}</span>
                    {isOwn && (
                      <CheckCheck className={`w-3 h-3 ${msg.read ? 'text-teal-500' : 'text-slate-400'}`} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message... သတင်းစကားရေးပါ..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={1}
            />
          </div>
          <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || loading}
            className="p-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-xl transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
