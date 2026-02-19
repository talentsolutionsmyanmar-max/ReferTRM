import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for push subscriptions
const pushSubscriptions = new Map<string, {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userId: string;
  subscribedAt: string;
}>();

// POST - Subscribe to push notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, keys, userId = 'demo_user' } = body;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ success: false, error: 'Invalid subscription data' }, { status: 400 });
    }

    const subscriptionId = Buffer.from(endpoint).toString('base64');
    
    pushSubscriptions.set(subscriptionId, {
      endpoint,
      keys,
      userId,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to push notifications',
      subscriptionId,
    });
  } catch (error) {
    console.error('Push subscription error:', error);
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 });
  }
}

// DELETE - Unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json({ success: false, error: 'Endpoint required' }, { status: 400 });
    }

    const subscriptionId = Buffer.from(endpoint).toString('base64');
    pushSubscriptions.delete(subscriptionId);

    return NextResponse.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Push unsubscription error:', error);
    return NextResponse.json({ success: false, error: 'Failed to unsubscribe' }, { status: 500 });
  }
}

// GET - Check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'demo_user';

    const userSubscriptions = Array.from(pushSubscriptions.values())
      .filter(sub => sub.userId === userId);

    return NextResponse.json({
      success: true,
      subscribed: userSubscriptions.length > 0,
      subscriptionCount: userSubscriptions.length,
    });
  } catch (error) {
    console.error('Push subscription check error:', error);
    return NextResponse.json({ success: false, error: 'Failed to check subscription' }, { status: 500 });
  }
}

export { pushSubscriptions };
