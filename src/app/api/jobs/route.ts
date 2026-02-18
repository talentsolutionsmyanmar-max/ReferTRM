// API Route: Jobs
// Handle job listings CRUD operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/jobs - Get all jobs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'active';
    const urgent = searchParams.get('urgent');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    const where: Record<string, unknown> = { status };
    
    if (urgent === 'true') where.urgent = true;
    if (featured === 'true') where.featured = true;
    
    const jobs = await prisma.job.findMany({
      where,
      take: limit,
      orderBy: [
        { featured: 'desc' },
        { urgent: 'desc' },
        { createdAt: 'desc' },
      ],
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            industry: true,
            location: true,
            overallRating: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      titleMm,
      companyId,
      description,
      descriptionMm,
      requirements,
      location,
      locationMm,
      salaryMin,
      salaryMax,
      salaryDisplay,
      reward,
      successFee,
      type,
      level,
      skills,
      urgent,
      featured,
    } = body;
    
    // Generate slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const job = await prisma.job.create({
      data: {
        title,
        titleMm,
        slug: slug + '-' + Date.now(),
        companyId,
        description,
        descriptionMm,
        requirements,
        location,
        locationMm,
        salaryMin,
        salaryMax,
        salaryDisplay,
        reward: reward || 0,
        successFee: successFee || 50000,
        type: type || 'Full-time',
        level: level || 'Mid',
        skills,
        urgent: urgent || false,
        featured: featured || false,
      },
    });
    
    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
