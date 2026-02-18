import { NextRequest, NextResponse } from 'next/server';

// Connection status
type ConnectionStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

// Connection interface
interface Connection {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  requesterTitle?: string;
  requesterCompany?: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt?: string;
}

// User profile for suggestions
interface UserSuggestion {
  id: string;
  name: string;
  avatar?: string;
  title?: string;
  company?: string;
  mutualConnections: number;
  skills: string[];
  isFollowing: boolean;
}

// Mock data generators
function generateMockConnections(): Connection[] {
  const users = [
    { id: 'u1', name: 'Aung Myat', title: 'Software Engineer', company: 'KBZ Bank' },
    { id: 'u2', name: 'Su Myat Khine', title: 'Marketing Manager', company: 'Wave Money' },
    { id: 'u3', name: 'Zaw Win', title: 'Product Designer', company: 'Grab' },
    { id: 'u4', name: 'Mya Aye', title: 'Data Analyst', company: 'MPT' },
    { id: 'u5', name: 'Thiri Kyaw', title: 'HR Manager', company: 'Ooredoo' },
    { id: 'u6', name: 'Kyaw Min', title: 'Sales Executive', company: 'Telenor' },
    { id: 'u7', name: 'Nandar Aung', title: 'Finance Analyst', company: 'City Mart' },
    { id: 'u8', name: 'Pyae Sone', title: 'Operations Lead', company: 'Foodpanda' },
  ];

  const connections: Connection[] = [];
  const now = Date.now();

  for (let i = 0; i < users.length; i++) {
    const timestamp = new Date(now - Math.random() * 30 * 24 * 60 * 60 * 1000);
    connections.push({
      id: `conn-${i}`,
      requesterId: users[i].id,
      requesterName: users[i].name,
      requesterTitle: users[i].title,
      requesterCompany: users[i].company,
      receiverId: 'current-user',
      receiverName: 'Current User',
      status: Math.random() > 0.2 ? 'accepted' : 'pending',
      createdAt: timestamp.toISOString(),
    });
  }

  return connections;
}

function generateUserSuggestions(): UserSuggestion[] {
  const users = [
    { id: 's1', name: 'Htet Naing', title: 'Full Stack Developer', company: 'Tech Startup', skills: ['React', 'Node.js', 'Python'] },
    { id: 's2', name: 'Ei Mon', title: 'UX Designer', company: 'Digital Agency', skills: ['Figma', 'UI Design', 'Research'] },
    { id: 's3', name: 'Aye Myat', title: 'Content Writer', company: 'Media House', skills: ['Writing', 'SEO', 'Social Media'] },
    { id: 's4', name: 'Min Thu', title: 'DevOps Engineer', company: 'Cloud Solutions', skills: ['AWS', 'Docker', 'Kubernetes'] },
    { id: 's5', name: 'Khine Zar', title: 'Business Analyst', company: 'Consulting Firm', skills: ['Analysis', 'Strategy', 'Excel'] },
  ];

  return users.map(u => ({
    ...u,
    mutualConnections: Math.floor(Math.random() * 15) + 1,
    isFollowing: Math.random() > 0.6,
  }));
}

// GET endpoint - get connections or suggestions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'connections'; // connections, followers, following, suggestions
  const userId = searchParams.get('userId');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search');

  switch (type) {
    case 'suggestions':
      return NextResponse.json({
        success: true,
        suggestions: generateUserSuggestions().slice(0, limit),
        type: 'suggestions',
      });

    case 'followers':
      const followers = generateMockConnections().filter(c => c.status === 'accepted');
      return NextResponse.json({
        success: true,
        connections: followers.slice(0, limit),
        total: followers.length,
        type: 'followers',
      });

    case 'following':
      const following = generateMockConnections().filter(c => c.status === 'accepted');
      return NextResponse.json({
        success: true,
        connections: following.slice(0, limit),
        total: following.length,
        type: 'following',
      });

    case 'pending':
      const pending = generateMockConnections().filter(c => c.status === 'pending');
      return NextResponse.json({
        success: true,
        connections: pending.slice(0, limit),
        total: pending.length,
        type: 'pending',
      });

    default:
      let connections = generateMockConnections();
      
      if (search) {
        connections = connections.filter(c => 
          c.requesterName.toLowerCase().includes(search.toLowerCase()) ||
          c.requesterCompany?.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      return NextResponse.json({
        success: true,
        connections: connections.filter(c => c.status === 'accepted').slice(0, limit),
        pendingCount: connections.filter(c => c.status === 'pending').length,
        totalConnections: connections.filter(c => c.status === 'accepted').length,
        type: 'connections',
      });
  }
}

// POST endpoint - send connection request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { requesterId, receiverId, message } = body;

    if (!requesterId || !receiverId) {
      return NextResponse.json(
        { success: false, error: 'Both user IDs are required' },
        { status: 400 }
      );
    }

    const connection: Connection = {
      id: `conn-${Date.now()}`,
      requesterId,
      requesterName: 'Current User',
      receiverId,
      receiverName: 'Target User',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      connection,
      message: 'Connection request sent successfully',
    });
  } catch (error) {
    console.error('Create connection error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send connection request' },
      { status: 500 }
    );
  }
}

// PUT endpoint - accept/reject connection
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { connectionId, action } = body; // action: accept, reject, block, unfollow

    if (!connectionId || !action) {
      return NextResponse.json(
        { success: false, error: 'Connection ID and action are required' },
        { status: 400 }
      );
    }

    let status: ConnectionStatus;
    let message: string;

    switch (action) {
      case 'accept':
        status = 'accepted';
        message = 'Connection request accepted';
        break;
      case 'reject':
        status = 'rejected';
        message = 'Connection request declined';
        break;
      case 'block':
        status = 'blocked';
        message = 'User blocked';
        break;
      case 'unfollow':
        status = 'rejected';
        message = 'Unfollowed successfully';
        break;
      default:
        status = 'pending';
        message = 'Action completed';
    }

    return NextResponse.json({
      success: true,
      connectionId,
      status,
      message,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update connection error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update connection' },
      { status: 500 }
    );
  }
}

// DELETE endpoint - remove connection
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const connectionId = searchParams.get('connectionId');

  if (!connectionId) {
    return NextResponse.json(
      { success: false, error: 'Connection ID is required' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Connection removed successfully',
  });
}
