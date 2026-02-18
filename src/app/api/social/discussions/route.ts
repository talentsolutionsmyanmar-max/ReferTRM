import { NextRequest, NextResponse } from 'next/server';

// Discussion category
type DiscussionCategory = 'career-advice' | 'interview-tips' | 'salary' | 'company-reviews' | 'industry-news' | 'general';

// Discussion interface
interface Discussion {
  id: string;
  title: string;
  content: string;
  category: DiscussionCategory;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorTitle?: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPinned: boolean;
  isHot: boolean;
  createdAt: string;
  updatedAt?: string;
  lastActivityAt: string;
}

// Discussion reply interface
interface DiscussionReply {
  id: string;
  discussionId: string;
  parentId?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  isLiked: boolean;
  isAcceptedAnswer: boolean;
  createdAt: string;
}

// Mock discussion generator
function generateMockDiscussions(count: number = 20): Discussion[] {
  const discussions: Discussion[] = [];
  const now = Date.now();

  const templates = [
    {
      title: 'How to negotiate salary in Myanmar?',
      content: 'I received a job offer but the salary is lower than expected. How should I negotiate without losing the opportunity? Any tips from experienced professionals?',
      category: 'salary' as DiscussionCategory,
      tags: ['salary', 'negotiation', 'tips'],
    },
    {
      title: 'Best companies for software engineers in Yangon?',
      content: 'I have 3 years of experience in web development. Looking for recommendations on companies with good culture and competitive compensation.',
      category: 'company-reviews' as DiscussionCategory,
      tags: ['software', 'yangon', 'companies'],
    },
    {
      title: 'Interview tips for fresh graduates',
      content: 'Just graduated and starting to apply for jobs. What are some common interview questions and how should I prepare? Would love advice from hiring managers.',
      category: 'interview-tips' as DiscussionCategory,
      tags: ['interview', 'fresh-graduate', 'tips'],
    },
    {
      title: 'Remote work opportunities in Myanmar',
      content: 'With the current situation, I am interested in finding remote work opportunities. Which platforms or companies are hiring remote workers from Myanmar?',
      category: 'career-advice' as DiscussionCategory,
      tags: ['remote', 'work-from-home', 'opportunities'],
    },
    {
      title: 'Career transition from accounting to data analysis',
      content: 'I have been working as an accountant for 5 years but want to switch to data analysis. Has anyone made a similar transition? What skills should I focus on?',
      category: 'career-advice' as DiscussionCategory,
      tags: ['career-change', 'data-analysis', 'skills'],
    },
    {
      title: 'Wave Money vs KBZ Pay - which is better to work for?',
      content: 'I have offers from both companies for a product role. Can anyone share insights about work culture, growth opportunities, and compensation?',
      category: 'company-reviews' as DiscussionCategory,
      tags: ['fintech', 'wave', 'kbz'],
    },
    {
      title: 'How to build a strong LinkedIn profile?',
      content: 'I noticed many recruiters use LinkedIn to find candidates. What are the key elements of a profile that gets noticed? Tips appreciated!',
      category: 'career-advice' as DiscussionCategory,
      tags: ['linkedin', 'personal-branding'],
    },
    {
      title: 'Tech industry trends in Myanmar 2024',
      content: 'What are the emerging trends in Myanmar\'s tech industry? Which skills will be most in-demand?',
      category: 'industry-news' as DiscussionCategory,
      tags: ['tech', 'trends', '2024'],
    },
  ];

  const users = [
    { id: 'u1', name: 'Aung Myat', title: 'Software Engineer' },
    { id: 'u2', name: 'Su Myat Khine', title: 'Marketing Manager' },
    { id: 'u3', name: 'Zaw Win', title: 'Product Designer' },
    { id: 'u4', name: 'Mya Aye', title: 'Data Analyst' },
    { id: 'u5', name: 'Thiri Kyaw', title: 'HR Manager' },
  ];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const user = users[Math.floor(Math.random() * users.length)];
    const timestamp = new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const lastActivity = new Date(now - Math.random() * 24 * 60 * 60 * 1000);

    discussions.push({
      id: `disc-${i}`,
      title: template.title,
      content: template.content,
      category: template.category,
      authorId: user.id,
      authorName: user.name,
      authorTitle: user.title,
      tags: template.tags,
      views: Math.floor(Math.random() * 500) + 50,
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      isLiked: Math.random() > 0.7,
      isPinned: i < 2,
      isHot: Math.random() > 0.8,
      createdAt: timestamp.toISOString(),
      lastActivityAt: lastActivity.toISOString(),
    });
  }

  return discussions.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
  });
}

// GET endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'latest'; // latest, popular, trending
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const discussionId = searchParams.get('discussionId');

  // Get single discussion with replies
  if (discussionId) {
    const discussions = generateMockDiscussions(1);
    const discussion = discussions[0];
    
    // Generate mock replies
    const replies: DiscussionReply[] = [];
    const users = [
      { id: 'u1', name: 'Aung Myat' },
      { id: 'u2', name: 'Su Myat Khine' },
      { id: 'u3', name: 'Zaw Win' },
    ];
    
    for (let i = 0; i < 5; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      replies.push({
        id: `reply-${i}`,
        discussionId,
        userId: user.id,
        userName: user.name,
        content: `This is a helpful reply to the discussion. Here are my thoughts and suggestions...`,
        likes: Math.floor(Math.random() * 20),
        isLiked: Math.random() > 0.7,
        isAcceptedAnswer: i === 0,
        createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      discussion,
      replies,
    });
  }

  let discussions = generateMockDiscussions(50);

  // Filter by category
  if (category) {
    discussions = discussions.filter(d => d.category === category);
  }

  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    discussions = discussions.filter(d => 
      d.title.toLowerCase().includes(searchLower) ||
      d.content.toLowerCase().includes(searchLower) ||
      d.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // Sort
  switch (sort) {
    case 'popular':
      discussions.sort((a, b) => b.likes - a.likes);
      break;
    case 'trending':
      discussions.sort((a, b) => (b.views + b.comments * 10) - (a.views + a.comments * 10));
      break;
    default:
      // Already sorted by latest
      break;
  }

  const paginatedDiscussions = discussions.slice(offset, offset + limit);

  return NextResponse.json({
    success: true,
    discussions: paginatedDiscussions,
    pagination: {
      total: discussions.length,
      limit,
      offset,
      hasMore: offset + limit < discussions.length,
    },
    categories: [
      { id: 'career-advice', name: 'Career Advice', nameMy: 'အလုပ်အကြံပြုချက်', icon: 'Briefcase' },
      { id: 'interview-tips', name: 'Interview Tips', nameMy: 'အင်တာဗျူးအကြံပြုချက်', icon: 'MessageSquare' },
      { id: 'salary', name: 'Salary Discussion', nameMy: 'လစာဆွေးနွေးမှု', icon: 'DollarSign' },
      { id: 'company-reviews', name: 'Company Reviews', nameMy: 'ကုမ္ပဏီသုံးသပ်ချက်', icon: 'Building' },
      { id: 'industry-news', name: 'Industry News', nameMy: 'လုပ်ငန်းသတင်းများ', icon: 'Newspaper' },
      { id: 'general', name: 'General Discussion', nameMy: 'ယေဘူယျဆွေးနွေးမှု', icon: 'MessageCircle' },
    ],
  });
}

// POST endpoint - create discussion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, tags, authorId, authorName } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const discussion: Discussion = {
      id: `disc-${Date.now()}`,
      title,
      content,
      category: category || 'general',
      authorId,
      authorName: authorName || 'User',
      tags: tags || [],
      views: 0,
      likes: 0,
      comments: 0,
      isLiked: false,
      isPinned: false,
      isHot: false,
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      discussion,
      message: 'Discussion created successfully',
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}

// PUT endpoint - update discussion or add reply
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { discussionId, action, content, replyId } = body;

    if (action === 'reply') {
      const reply: DiscussionReply = {
        id: `reply-${Date.now()}`,
        discussionId,
        userId: 'current-user',
        userName: 'Current User',
        content,
        likes: 0,
        isLiked: false,
        isAcceptedAnswer: false,
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        reply,
        message: 'Reply posted successfully',
      });
    }

    if (action === 'like') {
      return NextResponse.json({
        success: true,
        discussionId,
        message: 'Discussion liked',
      });
    }

    if (action === 'accept-answer' && replyId) {
      return NextResponse.json({
        success: true,
        replyId,
        message: 'Answer accepted',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Update discussion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update discussion' },
      { status: 500 }
    );
  }
}

// DELETE endpoint
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const discussionId = searchParams.get('discussionId');
  const replyId = searchParams.get('replyId');

  if (!discussionId && !replyId) {
    return NextResponse.json(
      { success: false, error: 'ID is required' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: discussionId ? 'Discussion deleted' : 'Reply deleted',
  });
}
