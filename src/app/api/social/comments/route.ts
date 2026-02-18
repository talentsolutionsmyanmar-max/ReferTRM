import { NextRequest, NextResponse } from 'next/server';

// Reaction types
type ReactionType = 'like' | 'love' | 'celebrate' | 'support' | 'insightful' | 'curious';

// Comment interface
interface Comment {
  id: string;
  parentId?: string; // for nested comments
  targetId: string; // job, post, discussion, etc.
  targetType: 'job' | 'activity' | 'discussion' | 'review';
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

// Reaction interface
interface Reaction {
  id: string;
  targetId: string;
  targetType: 'job' | 'activity' | 'comment' | 'discussion';
  userId: string;
  userName: string;
  type: ReactionType;
  createdAt: string;
}

// Mock comment generator
function generateMockComments(targetId: string, count: number = 10): Comment[] {
  const users = [
    { id: 'u1', name: 'Aung Myat' },
    { id: 'u2', name: 'Su Myat Khine' },
    { id: 'u3', name: 'Zaw Win' },
    { id: 'u4', name: 'Mya Aye' },
    { id: 'u5', name: 'Thiri Kyaw' },
  ];

  const commentTemplates = [
    'Great opportunity! Thanks for sharing.',
    'I applied for this role last month. Good luck everyone!',
    'Does anyone know what the salary range is?',
    'The company culture here is amazing.',
    'I have a friend who works here. They love it!',
    'Make sure to highlight your soft skills in the interview.',
    'The referral bonus for this position is quite good.',
    'Any tips for the technical interview?',
    'I heard they are expanding the team significantly.',
    'Thanks for posting! This is exactly what I was looking for.',
  ];

  const comments: Comment[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const timestamp = new Date(now - Math.random() * 24 * 60 * 60 * 1000);

    comments.push({
      id: `comment-${i}`,
      targetId,
      targetType: 'job',
      userId: user.id,
      userName: user.name,
      content: commentTemplates[Math.floor(Math.random() * commentTemplates.length)],
      createdAt: timestamp.toISOString(),
      likes: Math.floor(Math.random() * 20),
      replies: Math.floor(Math.random() * 5),
      isLiked: Math.random() > 0.7,
    });
  }

  return comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Mock reaction generator
function generateMockReactions(targetId: string): { reactions: Reaction[]; summary: Record<ReactionType, number> } {
  const users = [
    { id: 'u1', name: 'Aung Myat' },
    { id: 'u2', name: 'Su Myat Khine' },
    { id: 'u3', name: 'Zaw Win' },
    { id: 'u4', name: 'Mya Aye' },
    { id: 'u5', name: 'Thiri Kyaw' },
  ];

  const reactionTypes: ReactionType[] = ['like', 'love', 'celebrate', 'support', 'insightful', 'curious'];
  const reactions: Reaction[] = [];

  const summary: Record<ReactionType, number> = {
    like: 0,
    love: 0,
    celebrate: 0,
    support: 0,
    insightful: 0,
    curious: 0,
  };

  for (const user of users) {
    if (Math.random() > 0.4) {
      const type = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];
      reactions.push({
        id: `react-${user.id}`,
        targetId,
        targetType: 'job',
        userId: user.id,
        userName: user.name,
        type,
        createdAt: new Date().toISOString(),
      });
      summary[type]++;
    }
  }

  return { reactions, summary };
}

// GET endpoint - get comments or reactions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get('targetId');
  const targetType = searchParams.get('targetType') || 'job';
  const type = searchParams.get('type') || 'comments'; // comments, reactions
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  if (!targetId) {
    return NextResponse.json(
      { success: false, error: 'Target ID is required' },
      { status: 400 }
    );
  }

  if (type === 'reactions') {
    const { reactions, summary } = generateMockReactions(targetId);
    return NextResponse.json({
      success: true,
      reactions,
      summary,
      totalReactions: reactions.length,
    });
  }

  const comments = generateMockComments(targetId, 30);
  const paginatedComments = comments.slice(offset, offset + limit);

  return NextResponse.json({
    success: true,
    comments: paginatedComments,
    pagination: {
      total: comments.length,
      limit,
      offset,
      hasMore: offset + limit < comments.length,
    },
  });
}

// POST endpoint - create comment or reaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, targetId, targetType, userId, userName, content, reactionType } = body;

    if (!targetId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (type === 'comment') {
      if (!content) {
        return NextResponse.json(
          { success: false, error: 'Comment content is required' },
          { status: 400 }
        );
      }

      const comment: Comment = {
        id: `comment-${Date.now()}`,
        targetId,
        targetType: targetType || 'job',
        userId,
        userName: userName || 'User',
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: 0,
        isLiked: false,
      };

      return NextResponse.json({
        success: true,
        comment,
        message: 'Comment posted successfully',
      });
    }

    if (type === 'reaction') {
      if (!reactionType) {
        return NextResponse.json(
          { success: false, error: 'Reaction type is required' },
          { status: 400 }
        );
      }

      const reaction: Reaction = {
        id: `react-${Date.now()}`,
        targetId,
        targetType: targetType || 'job',
        userId,
        userName: userName || 'User',
        type: reactionType,
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        reaction,
        message: 'Reaction added successfully',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Create comment/reaction error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create' },
      { status: 500 }
    );
  }
}

// PUT endpoint - update comment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, content, action } = body;

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    if (action === 'like') {
      return NextResponse.json({
        success: true,
        commentId,
        message: 'Comment liked',
      });
    }

    if (content) {
      return NextResponse.json({
        success: true,
        commentId,
        content,
        message: 'Comment updated',
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: false, error: 'No action specified' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Update comment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE endpoint - delete comment or remove reaction
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get('commentId');
  const reactionId = searchParams.get('reactionId');

  if (!commentId && !reactionId) {
    return NextResponse.json(
      { success: false, error: 'Comment ID or Reaction ID is required' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: commentId ? 'Comment deleted' : 'Reaction removed',
  });
}

// Reaction type definitions for frontend
export const reactionTypes: { type: ReactionType; emoji: string; label: string; labelMy: string }[] = [
  { type: 'like', emoji: '👍', label: 'Like', labelMy: 'နှစ်သက်' },
  { type: 'love', emoji: '❤️', label: 'Love', labelMy: 'ချစ်မှတ်' },
  { type: 'celebrate', emoji: '🎉', label: 'Celebrate', labelMy: 'ဆင်နွဲ' },
  { type: 'support', emoji: '👏', label: 'Support', labelMy: 'ထောက်ခံ' },
  { type: 'insightful', emoji: '💡', label: 'Insightful', labelMy: 'အသိဉာဏ်ဖွင့်' },
  { type: 'curious', emoji: '🤔', label: 'Curious', labelMy: 'စူးစမ်း' },
];
