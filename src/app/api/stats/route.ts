// API Route: Platform Stats
// Fetch real data counts from Supabase

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Supabase not configured',
        stats: {
          jobs: 0,
          leads: 0,
          totalRewards: 0
        }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get jobs count
    const { count: jobsCount, error: jobsError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (jobsError) {
      console.error('Error fetching jobs count:', jobsError);
    }

    // Get leads count
    const { count: leadsCount, error: leadsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (leadsError) {
      console.error('Error fetching leads count:', leadsError);
    }

    // Get total rewards available (sum of all job rewards)
    const { data: jobsData, error: rewardsError } = await supabase
      .from('jobs')
      .select('reward')
      .eq('status', 'active');

    let totalRewards = 0;
    if (jobsData) {
      totalRewards = jobsData.reduce((sum, job) => sum + (job.reward || 0), 0);
    }

    if (rewardsError) {
      console.error('Error calculating rewards:', rewardsError);
    }

    // Get sample jobs for preview
    const { data: sampleJobs, error: sampleError } = await supabase
      .from('jobs')
      .select('id, title, company, location, salary, reward, urgent')
      .eq('status', 'active')
      .order('posted_at', { ascending: false })
      .limit(5);

    if (sampleError) {
      console.error('Error fetching sample jobs:', sampleError);
    }

    // Get sample leads for preview
    const { data: sampleLeads, error: leadsSampleError } = await supabase
      .from('leads')
      .select('id, name, email, phone, current_position, skills, status')
      .limit(5);

    if (leadsSampleError) {
      console.error('Error fetching sample leads:', leadsSampleError);
    }

    return NextResponse.json({
      success: true,
      stats: {
        jobs: jobsCount || 0,
        leads: leadsCount || 0,
        totalRewards: totalRewards
      },
      sampleJobs: sampleJobs || [],
      sampleLeads: sampleLeads || [],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stats',
      stats: {
        jobs: 0,
        leads: 0,
        totalRewards: 0
      }
    }, { status: 500 });
  }
}
