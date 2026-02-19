import { NextRequest, NextResponse } from 'next/server';

// In-memory message storage (in production, use database)
// For Vercel, this will reset on each deployment, but works for demo
const messageStore = new Map<string, Array<{
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'referrer' | 'hr' | 'candidate';
  content: string;
  timestamp: string;
  read: boolean;
}>>();

// Generate unique ID
function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// GET - Fetch messages for a conversation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const userId = searchParams.get('userId');
    const lastMessageId = searchParams.get('lastMessageId'); // For polling new messages

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'Conversation ID required' },
        { status: 400 }
      );
    }

    const messages = messageStore.get(conversationId) || [];

    // If lastMessageId provided, only return new messages (polling)
    let filteredMessages = messages;
    if (lastMessageId) {
      const lastIndex = messages.findIndex(m => m.id === lastMessageId);
      if (lastIndex !== -1) {
        filteredMessages = messages.slice(lastIndex + 1);
      }
    }

    // Mark messages as read if userId provided
    if (userId) {
      messages.forEach(msg => {
        if (msg.senderId !== userId) {
          msg.read = true;
        }
      });
    }

    return NextResponse.json({
      success: true,
      messages: filteredMessages,
      totalMessages: messages.length,
      hasMore: false,
    });
  } catch (error) {
    console.error('Chat GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      conversationId,
      senderId,
      senderName,
      senderRole,
      content,
    } = body;

    if (!conversationId || !senderId || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const message = {
      id: generateId(),
      senderId,
      senderName: senderName || 'Anonymous',
      senderRole: senderRole || 'referrer',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Get or create conversation
    if (!messageStore.has(conversationId)) {
      messageStore.set(conversationId, []);
    }

    messageStore.get(conversationId)!.push(message);

    return NextResponse.json({
      success: true,
      message,
      conversationId,
    });
  } catch (error) {
    console.error('Chat POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// PUT - Mark messages as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationId, messageIds, userId } = body;

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'Conversation ID required' },
        { status: 400 }
      );
    }

    const messages = messageStore.get(conversationId) || [];
    let markedCount = 0;

    messages.forEach(msg => {
      if (messageIds ? messageIds.includes(msg.id) : msg.senderId !== userId) {
        if (!msg.read) {
          msg.read = true;
          markedCount++;
        }
      }
    });

    return NextResponse.json({
      success: true,
      markedAsRead: markedCount,
    });
  } catch (error) {
    console.error('Chat PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update messages' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a conversation or message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const messageId = searchParams.get('messageId');

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: 'Conversation ID required' },
        { status: 400 }
      );
    }

    if (messageId) {
      // Delete specific message
      const messages = messageStore.get(conversationId);
      if (messages) {
        const index = messages.findIndex(m => m.id === messageId);
        if (index !== -1) {
          messages.splice(index, 1);
        }
      }
    } else {
      // Delete entire conversation
      messageStore.delete(conversationId);
    }

    return NextResponse.json({
      success: true,
      deleted: messageId ? 'message' : 'conversation',
    });
  } catch (error) {
    console.error('Chat DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete' },
      { status: 500 }
    );
  }
}
