// Knowledge Buddy AI Chat API
// AI-powered assistant for rural Myanmar youth education

import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// System prompt for the Knowledge Buddy
const SYSTEM_PROMPT = `You are "Knowledge Buddy" - a friendly, helpful AI assistant for young people in Myanmar who want to learn.

Your personality:
- Friendly and encouraging, like a supportive older sibling
- Use simple language that anyone can understand
- Always provide practical, actionable advice
- Include Myanmar translations when helpful
- Focus on education, career, business, and life skills

Your rules:
- NEVER discuss politics or political issues in Myanmar
- NEVER discuss cryptocurrency or crypto trading (this is important - it's prohibited in Myanmar)
- Always be positive and encouraging
- If you don't know something, say so honestly
- Keep responses concise but helpful (2-4 sentences for simple questions, more for complex)
- Always think about how your advice can help someone with limited resources

Topics you can help with:
- Technology (AI, internet, apps, smartphones)
- Business (entrepreneurship, marketing, sales, customer service)
- Economy (inflation, savings, money management)
- Career (jobs, interviews, resume, skills)
- Life skills (communication, time management, habits)
- Learning (study tips, online resources, self-improvement)

When explaining concepts:
1. Start with a simple definition
2. Give a real-world example from Myanmar context
3. Explain how they can apply it in their daily life
4. Keep it practical and actionable

Format your responses using simple markdown when needed.
Always be supportive and encouraging!`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Content safety check
    const unsafeKeywords = ['politics', 'crypto', 'bitcoin', 'election', 'gambling', 'casino'];
    const lowerMessage = message.toLowerCase();
    
    for (const keyword of unsafeKeywords) {
      if (lowerMessage.includes(keyword)) {
        return NextResponse.json({
          success: true,
          data: {
            response: "I'm sorry, I can't help with that topic. I'm here to help you learn about technology, business, career, and life skills. Is there something else I can help you with? 🙏",
            topic: 'safety',
          }
        });
      }
    }
    
    const zai = await ZAI.create();
    
    // Build messages array with history
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];
    
    // Add conversation history
    for (const msg of conversationHistory) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }
    
    // Add current message
    messages.push({ role: 'user', content: message });
    
    const completion = await zai.chat.completions.create({
      messages,
      temperature: 0.8,
      max_tokens: 1000,
    });
    
    const response = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.';
    
    // Detect topic for categorization
    let topic = 'general';
    if (lowerMessage.includes('ai') || lowerMessage.includes('tech') || lowerMessage.includes('computer') || lowerMessage.includes('app')) {
      topic = 'technology';
    } else if (lowerMessage.includes('business') || lowerMessage.includes('sell') || lowerMessage.includes('market')) {
      topic = 'business';
    } else if (lowerMessage.includes('money') || lowerMessage.includes('save') || lowerMessage.includes('invest')) {
      topic = 'economy';
    } else if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('interview')) {
      topic = 'career';
    } else if (lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('skill')) {
      topic = 'skills';
    }
    
    return NextResponse.json({
      success: true,
      data: {
        response,
        topic,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
