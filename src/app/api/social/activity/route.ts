import { NextRequest, NextResponse } from 'next/server';

// Activity types
type ActivityType = 
  | 'job_applied' 
  | 'job_posted' 
  | 'referral_made' 
  | 'referral_success' 
  | 'achievement_earned'
  | 'badge_unlocked'
  | 'profile_updated'
  | 'course_completed'
  | 'review_posted'
  | 'connection_made'
  | 'milestone_reached';

// Activity interface
interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: ActivityType;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

// Mock activity generator
function generateMockActivities(count: number = 20): Activity[] {
  const activityTemplates = [
    {
      type: 'job_applied' as ActivityType,
      title: 'Applied for a new job',
      description: 'Applied for Software Engineer at KBZ Bank',
      metadata: { jobId: 'job-1', company: 'KBZ Bank', role: 'Software Engineer' },
    },
    {
      type: 'referral_made' as ActivityType,
      title: 'Referred a friend',
      description: 'Referred Mya Aye for Marketing Specialist position',
      metadata: { referralId: 'ref-1', candidate: 'Mya Aye' },
    },
    {
      type: 'achievement_earned' as ActivityType,
      title: 'Earned a new achievement',
      description: 'Unlocked "Job Hunter" badge for applying to 10 jobs',
      metadata: { achievement: 'Job Hunter', icon: 'target' },
    },
    {
      type: 'course_completed' as ActivityType,
      title: 'Completed a course',
      description: 'Finished "Digital Marketing Fundamentals" with 95% score',
      metadata: { courseId: 'course-1', score: 95 },
    },
    {
      type: 'milestone_reached' as ActivityType,
      title: 'Reached a milestone',
      description: 'Earned 1,000 points on ReferTRM!',
      metadata: { milestone: '1000_points', points: 1000 },
    },
    {
      type: 'connection_made' as ActivityType,
      title: 'New connection',
      description: 'Connected with Zaw Win, Senior Developer at Wave Money',
      metadata: { connectionId: 'user-1', connectionName: 'Zaw Win' },
    },
    {
      type: 'review_posted' as ActivityType,
      title: 'Shared a review',
      description: 'Reviewed interview experience at Ooredoo Myanmar',
      metadata: { companyId: 'comp-1', company: 'Ooredoo' },
    },
  ];

  const users = [
    { id: 'u1', name: 'Aung Myat', avatar: undefined },
    { id: 'u2', name: 'Su Myat Khine', avatar: undefined },
    { id: 'u3', name: 'Zaw Win', avatar: undefined },
    { id: 'u4', name: 'Mya Aye', avatar: undefined },
    { id: 'u5', name: 'Thiri Kyaw', avatar: undefined },
  ];

  const activities: Activity[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const timestamp = new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000);

    activities.push({
      id: `act-${i}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      type: template.type,
      title: template.title,
      description: template.description,
      metadata: template.metadata,
      createdAt: timestamp.toISOString(),
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 10),
      isLiked: Math.random() > 0.7,
    });
  }

  return activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// GET endpoint for activity feed
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  let activities = generateMockActivities(50);

  // Filter by type if specified
  if (type) {
    activities = activities.filter(a => a.type === type);
  }

  // Filter by user if specified
  if (userId) {
    activities = activities.filter(a => a.userId === userId);
  }

  const paginatedActivities = activities.slice(offset, offset + limit);

  return NextResponse.json({
    success: true,
    activities: paginatedActivities,
    pagination: {
      total: activities.length,
      limit,
      offset,
      hasMore: offset + limit < activities.length,
    },
    activityTypes: [
      { type: 'job_applied', label: 'Job Applications', icon: 'Briefcase' },
      { type: 'referral_made', label: 'Referrals', icon: 'Users' },
      { type: 'achievement_earned', label: 'Achievements', icon: 'Trophy' },
      { type: 'course_completed', label: 'Learning', icon: 'GraduationCap' },
      { type: 'connection_made', label: 'Connections', icon: 'UserPlus' },
      { type: 'milestone_reached', label: 'Milestones', icon: 'Target' },
    ],
  });
}

// POST endpoint for creating activities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, description, metadata } = body;

    if (!userId || !type || !title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const activity: Activity = {
      id: `act-${Date.now()}`,
      userId,
      userName: 'Current User',
      type,
      title,
      description: description || '',
      metadata: metadata || {},
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    return NextResponse.json({
      success: true,
      activity,
      message: 'Activity created successfully',
    });
  } catch (error) {
    console.error('Create activity error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}

// PUT endpoint for liking/unliking activities
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { activityId, action, userId } = body;

    if (!activityId || !action || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      activityId,
      action,
      message: action === 'like' ? 'Activity liked' : 'Activity unliked',
    });
  } catch (error) {
    console.error('Update activity error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}
