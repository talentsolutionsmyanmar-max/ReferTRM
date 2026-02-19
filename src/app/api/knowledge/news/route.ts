// News Aggregation API Route
// Fetches news from trusted sources, filters content, and generates knowledge cards

import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Content filtering rules
const BLOCKED_KEYWORDS = [
  // Politics
  'politics', 'election', 'government', 'military', 'coup', 'protest', 'democracy', 'political',
  'president', 'minister', 'parliament', 'vote', 'campaign',
  // Crypto (prohibited in Myanmar)
  'crypto', 'bitcoin', 'ethereum', 'nft', 'blockchain', 'cryptocurrency', 'ico', 'defi',
  'binance', 'coinbase', 'mining', 'token sale',
  // Adult content
  'adult', 'xxx', 'nsfw',
  // Gambling
  'casino', 'betting', 'gambling', 'lottery', 'poker',
];

const SAFE_KEYWORDS = [
  'technology', 'business', 'economy', 'education', 'learning', 'skills', 'career',
  'startup', 'entrepreneurship', 'ai', 'software', 'app', 'internet', 'digital',
  'marketing', 'finance', 'savings', 'investment', 'job', 'work', 'productivity'
];

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  publishedAt: string;
}

interface GeneratedKnowledgeCard {
  id: string;
  title: string;
  titleMm: string;
  summary: string;
  summaryMm: string;
  example: string;
  exampleMm: string;
  application: string;
  applicationMm: string;
  category: string;
  source: string;
  sourceUrl: string;
}

// Check if content is safe
function isContentSafe(content: string): boolean {
  const lowerContent = content.toLowerCase();
  
  // Check for blocked keywords
  for (const keyword of BLOCKED_KEYWORDS) {
    if (lowerContent.includes(keyword)) {
      return false;
    }
  }
  
  return true;
}

// Check if content is relevant
function isContentRelevant(content: string): boolean {
  const lowerContent = content.toLowerCase();
  
  // Check for at least one safe keyword
  for (const keyword of SAFE_KEYWORDS) {
    if (lowerContent.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}

// Generate knowledge card from news using AI
async function generateKnowledgeCard(newsItem: NewsItem): Promise<GeneratedKnowledgeCard | null> {
  try {
    const zai = await ZAI.create();
    
    const prompt = `You are an educational content creator for rural Myanmar youth. Transform this news into a simple, actionable knowledge card.

News Title: ${newsItem.title}
News Summary: ${newsItem.summary}

Create a knowledge card with these fields (keep it simple and practical):

1. Title: Simple, clear title (max 60 chars)
2. TitleMm: Myanmar translation of title
3. Summary: Explain the core concept in simple terms (max 150 chars)
4. SummaryMm: Myanmar translation
5. Example: Real-world example from daily life in Myanmar (max 200 chars)
6. ExampleMm: Myanmar translation
7. Application: How can a young person apply this knowledge tomorrow? (max 200 chars)
8. ApplicationMm: Myanmar translation

Format as JSON:
{
  "title": "",
  "titleMm": "",
  "summary": "",
  "summaryMm": "",
  "example": "",
  "exampleMm": "",
  "application": "",
  "applicationMm": ""
}

Rules:
- NO politics, NO cryptocurrency
- Keep it practical and applicable
- Use simple language that anyone can understand
- Focus on how this knowledge helps someone's daily life or career`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an educational content creator. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: parsed.title,
      titleMm: parsed.titleMm,
      summary: parsed.summary,
      summaryMm: parsed.summaryMm,
      example: parsed.example,
      exampleMm: parsed.exampleMm,
      application: parsed.application,
      applicationMm: parsed.applicationMm,
      category: newsItem.category,
      source: newsItem.source,
      sourceUrl: newsItem.url,
    };
  } catch (error) {
    console.error('Error generating knowledge card:', error);
    return null;
  }
}

// Search for news using web search
async function searchForNews(query: string): Promise<NewsItem[]> {
  try {
    const zai = await ZAI.create();
    
    const searchResult = await zai.functions.invoke('web_search', {
      query: `${query} technology business education`,
      num: 10
    });
    
    if (!Array.isArray(searchResult)) return [];
    
    return searchResult
      .filter((item: any) => {
        const title = item.name || '';
        const snippet = item.snippet || '';
        return isContentSafe(title) && isContentSafe(snippet) && 
               (isContentRelevant(title) || isContentRelevant(snippet));
      })
      .map((item: any) => ({
        title: item.name || 'Untitled',
        summary: item.snippet || '',
        source: item.host_name || 'Unknown',
        url: item.url || '',
        category: 'tech',
        publishedAt: new Date().toISOString()
      }));
  } catch (error) {
    console.error('Error searching for news:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Search queries for different categories
    const queries = {
      tech: ['artificial intelligence basics', 'technology trends 2024', 'how apps work', 'internet safety'],
      business: ['small business tips', 'entrepreneurship basics', 'marketing for beginners'],
      economy: ['inflation explained', 'how money works', 'saving money tips'],
      skills: ['time management', 'communication skills', 'learning faster'],
      career: ['job interview tips', 'career development', 'resume writing'],
    };
    
    const categoriesToSearch = category === 'all' 
      ? Object.keys(queries) 
      : [category];
    
    let allNews: NewsItem[] = [];
    
    // Search for news in each category
    for (const cat of categoriesToSearch) {
      const searchQueries = queries[cat as keyof typeof queries] || [];
      for (const query of searchQueries.slice(0, 1)) { // Limit to 1 query per category
        const news = await searchForNews(query);
        allNews = [...allNews, ...news.map(n => ({ ...n, category: cat }))];
      }
    }
    
    // Remove duplicates and limit
    const uniqueNews = allNews
      .filter((news, index, self) => 
        index === self.findIndex(n => n.title === news.title)
      )
      .slice(0, limit);
    
    // Generate knowledge cards from news
    const knowledgeCards: GeneratedKnowledgeCard[] = [];
    for (const news of uniqueNews.slice(0, 5)) { // Limit to 5 to avoid rate limits
      const card = await generateKnowledgeCard(news);
      if (card) {
        knowledgeCards.push(card);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        cards: knowledgeCards,
        total: knowledgeCards.length,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error: any) {
    console.error('News aggregation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, customQuery } = body;
    
    if (!topic && !customQuery) {
      return NextResponse.json(
        { success: false, error: 'Topic or customQuery is required' },
        { status: 400 }
      );
    }
    
    // Search for specific topic
    const query = customQuery || `${topic} explained for beginners`;
    const news = await searchForNews(query);
    
    // Generate knowledge card
    const cards: GeneratedKnowledgeCard[] = [];
    for (const item of news.slice(0, 3)) {
      const card = await generateKnowledgeCard(item);
      if (card) {
        card.category = topic || 'general';
        cards.push(card);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        topic,
        cards,
        total: cards.length,
      }
    });
  } catch (error: any) {
    console.error('Topic search error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
