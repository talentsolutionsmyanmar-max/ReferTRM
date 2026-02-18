// API Route: Authentication
// Handle user authentication and session management

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/auth/register - Register new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, name, password, firebaseUid, authProvider, referralCode } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
          { firebaseUid },
        ].filter(Boolean),
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists', user: existingUser },
        { status: 400 }
      );
    }
    
    // Generate referral code
    const newReferralCode = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Check if there's a referrer
    let referredBy = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referredBy = referrer.id;
      }
    }
    
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        password, // Should be hashed in production
        firebaseUid,
        authProvider: authProvider || 'email',
        referralCode: newReferralCode,
        referredBy,
        points: 50, // Welcome bonus
        totalPointsEarned: 50,
        streak: 1,
        lastLoginAt: new Date(),
      },
    });
    
    // Create referral record if referred
    if (referredBy) {
      await prisma.referral.create({
        data: {
          referrerId: referredBy,
          referredId: user.id,
          level: 1,
        },
      });
      
      // Update referrer stats
      await prisma.user.update({
        where: { id: referredBy },
        data: {
          totalReferrals: { increment: 1 },
          points: { increment: 10 }, // Referral bonus
          totalPointsEarned: { increment: 10 },
        },
      });
    }
    
    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        referralCode: user.referralCode,
        points: user.points,
        level: user.level,
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        avatarUrl: true,
        avatarType: true,
        points: true,
        totalPointsEarned: true,
        streak: true,
        maxStreak: true,
        level: true,
        referralCode: true,
        totalReferrals: true,
        successfulReferrals: true,
        totalEarned: true,
        lastLoginAt: true,
        lastBonusClaim: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
