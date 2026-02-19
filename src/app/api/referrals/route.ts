// API Route: Referrals
// Handle referral operations and tracking

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/referrals - Get referrals
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const referrerId = searchParams.get('referrerId');
    const referredId = searchParams.get('referredId');
    
    const where: Record<string, unknown> = {};
    if (referrerId) where.referrerId = referrerId;
    if (referredId) where.referredId = referredId;
    
    const referrals = await prisma.referral.findMany({
      where,
      include: {
        referrer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            referralCode: true,
          },
        },
        referred: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ referrals });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    );
  }
}

// POST /api/referrals - Create new referral
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referrerId, referredId, level, bonusEarned } = body;
    
    // Check if referral already exists
    const existingReferral = await prisma.referral.findFirst({
      where: { referrerId, referredId },
    });
    
    if (existingReferral) {
      return NextResponse.json(
        { error: 'Referral already exists' },
        { status: 400 }
      );
    }
    
    const referral = await prisma.referral.create({
      data: {
        referrerId,
        referredId,
        level: level || 1,
        bonusEarned,
      },
    });
    
    // Update referrer stats
    await prisma.user.update({
      where: { id: referrerId },
      data: {
        totalReferrals: { increment: 1 },
      },
    });
    
    return NextResponse.json({ referral });
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json(
      { error: 'Failed to create referral' },
      { status: 500 }
    );
  }
}
