// API Route: Users
// Handle user CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/users - Get all users (for leaderboard)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const orderBy = searchParams.get('orderBy') || 'points';
    
    const users = await prisma.user.findMany({
      take: limit,
      orderBy: {
        [orderBy]: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        totalPointsEarned: true,
        streak: true,
        maxStreak: true,
        level: true,
        avatarUrl: true,
        avatarType: true,
        referralCode: true,
        totalReferrals: true,
        successfulReferrals: true,
        totalEarned: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, name, firebaseUid, authProvider, referredBy } = body;
    
    // Generate referral code
    const referralCode = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        firebaseUid,
        authProvider: authProvider || 'email',
        referralCode,
        referredBy,
        points: 50, // Welcome bonus
        totalPointsEarned: 50,
        streak: 1,
        lastLoginAt: new Date(),
      },
    });
    
    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    
    // Check for unique constraint violations
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
