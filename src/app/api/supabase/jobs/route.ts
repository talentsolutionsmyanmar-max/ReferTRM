// API Route: Jobs from Supabase
// Fetch all active jobs

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured', jobs: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const urgent = searchParams.get('urgent');

    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .order('posted_at', { ascending: false })
      .limit(limit);

    if (urgent === 'true') {
      query = query.eq('urgent', true);
    }

    const { data: jobs, error } = await query;

    if (error) {
      console.error('Error fetching jobs:', error);
      return NextResponse.json({ error: error.message, jobs: [] });
    }

    return NextResponse.json({ jobs: jobs || [] });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs', jobs: [] });
  }
}
