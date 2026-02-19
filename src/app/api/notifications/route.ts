import { NextRequest, NextResponse } from 'next/server';

// In-memory notification storage (in production, use database)
interface Notification {
  id: string;
  userId: string;
  type: 'job_alert' | 'application_update' | 'message' | 'referral' | 'system' | 'reward';
  title: string;
  titleMy?: string; // Myanmar translation
  content: string;
  contentMy?: string; // Myanmar translation
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const notificationStore = new Map<string, Notification[]>();

// Sample notifications for demo
const sampleNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'demo_user',
    type: 'job_alert',
    title: 'New Job Match!',
    titleMy: 'အလုပ်အသစ် တူညီမှုရှိပါသည်!',
    content: 'A new Software Developer position matches your profile at KBZ Bank.',
    contentMy: 'KBZ Bank တွင် Software Developer ရာထူးအသစ်သည် သင့်ပရိုဖိုင်နှင့် ကိုက်ညီပါသည်။',
    data: { jobId: 'job_001', company: 'KBZ Bank' },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    priority: 'high',
  },
  {
    id: 'notif_2',
    userId: 'demo_user',
    type: 'application_update',
    title: 'Application Status Updated',
    titleMy: 'လျှောက်လွှာအခြေအနေ အပ်ဒိတ်လုပ်ပြီးပါပြီ',
    content: 'Your application for Marketing Manager at Wave Money has been viewed.',
    contentMy: 'Wave Money ၏ Marketing Manager အတွက် သင့်လျှောက်လွှာကို ကြည့်ရှုပြီးပါပြီ။',
    data: { applicationId: 'app_001', status: 'viewed' },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    priority: 'medium',
  },
  {
    id: 'notif_3',
    userId: 'demo_user',
    type: 'referral',
    title: 'Referral Bonus Earned!',
    titleMy: 'ရည်ညွှန်းဆုရရှိပါပြီ!',
    content: 'Your referred candidate got hired! You earned 500,000 MMK reward.',
    contentMy: 'သင့်ရည်ညွှန်းထားသော ကျွမ်းကျင်သူကို ငှားရမ်းပြီးပါပြီ! သင် ကျပ် ၅သိန်း ဆုရရှိပါသည်။',
    data: { referralId: 'ref_001', reward: 500000 },
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    priority: 'urgent',
  },
  {
    id: 'notif_4',
    userId: 'demo_user',
    type: 'message',
    title: 'New Message from HR',
    titleMy: 'HR ဘက်ကှနေ မက်ဆေ့ချ်အသစ်',
    content: 'CB Bank HR team wants to schedule an interview with you.',
    contentMy: 'CB Bank HR အဖွဲ့သည် သင့်နှင့် အင်တာဗျူးတိုက်ချင်ပါသည်။',
    data: { conversationId: 'conv_001', fromUserId: 'hr_cbbank' },
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    priority: 'high',
  },
  {
    id: 'notif_5',
    userId: 'demo_user',
    type: 'reward',
    title: 'Daily Check-in Reward',
    titleMy: 'နေ့စဉ် Check-in ဆု',
    content: 'You earned 10 points for checking in today. Keep your streak going!',
    contentMy: 'ဒီနေ့ check-in လုပ်ထားသောကြောင့် ရမှတ် ၁၀ ရရှိပါသည်။ ဆက်လက်လုပ်ဆောင်ပါ!',
    data: { points: 10, streak: 5 },
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    priority: 'low',
  },
];

// Initialize with sample data
notificationStore.set('demo_user', [...sampleNotifications]);

// Generate unique ID
function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// GET - Fetch notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo_user';
    const type = searchParams.get('type'); // Filter by type
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const lang = searchParams.get('lang') || 'en'; // Language preference

    let notifications = notificationStore.get(userId) || [];

    // Apply filters
    if (type) {
      notifications = notifications.filter(n => n.type === type);
    }
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.read);
    }

    // Sort by date (newest first)
    notifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit
    notifications = notifications.slice(0, limit);

    // Apply language
    const localizedNotifications = notifications.map(n => ({
      ...n,
      title: lang === 'my' && n.titleMy ? n.titleMy : n.title,
      content: lang === 'my' && n.contentMy ? n.contentMy : n.content,
    }));

    const unreadCount = (notificationStore.get(userId) || [])
      .filter(n => !n.read).length;

    return NextResponse.json({
      success: true,
      notifications: localizedNotifications,
      unreadCount,
      total: (notificationStore.get(userId) || []).length,
    });
  } catch (error) {
    console.error('Notifications GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      type,
      title,
      titleMy,
      content,
      contentMy,
      data,
      priority = 'medium',
    } = body;

    if (!userId || !type || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const notification: Notification = {
      id: generateId(),
      userId,
      type,
      title,
      titleMy,
      content,
      contentMy,
      data,
      read: false,
      createdAt: new Date().toISOString(),
      priority,
    };

    if (!notificationStore.has(userId)) {
      notificationStore.set(userId, []);
    }

    notificationStore.get(userId)!.unshift(notification);

    return NextResponse.json({
      success: true,
      notification,
      unreadCount: notificationStore.get(userId)!.filter(n => !n.read).length,
    });
  } catch (error) {
    console.error('Notifications POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

// PUT - Mark notifications as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, notificationIds, markAllRead } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const notifications = notificationStore.get(userId) || [];
    let markedCount = 0;

    if (markAllRead) {
      notifications.forEach(n => {
        if (!n.read) {
          n.read = true;
          markedCount++;
        }
      });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      notifications.forEach(n => {
        if (notificationIds.includes(n.id) && !n.read) {
          n.read = true;
          markedCount++;
        }
      });
    }

    return NextResponse.json({
      success: true,
      markedAsRead: markedCount,
      unreadCount: notifications.filter(n => !n.read).length,
    });
  } catch (error) {
    console.error('Notifications PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
}

// DELETE - Delete notifications
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const notificationId = searchParams.get('notificationId');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    if (clearAll) {
      notificationStore.set(userId, []);
    } else if (notificationId) {
      const notifications = notificationStore.get(userId) || [];
      const index = notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        notifications.splice(index, 1);
      }
    }

    return NextResponse.json({
      success: true,
      deleted: clearAll ? 'all' : notificationId,
    });
  } catch (error) {
    console.error('Notifications DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete notifications' },
      { status: 500 }
    );
  }
}
