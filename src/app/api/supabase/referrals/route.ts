// API Route: Referrals
// Match leads to jobs and track referral status

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// GET - Fetch all referrals
export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured', referrals: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const referrerId = searchParams.get('referrer_id');

    let query = supabase
      .from('referrals')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (referrerId) {
      query = query.eq('referrer_id', referrerId);
    }

    const { data: referrals, error } = await query;

    if (error) {
      console.error('Error fetching referrals:', error);
      return NextResponse.json({ error: error.message, referrals: [] });
    }

    return NextResponse.json({ referrals: referrals || [] });
  } catch (error) {
    console.error('Referrals API error:', error);
    return NextResponse.json({ error: 'Failed to fetch referrals', referrals: [] });
  }
}

// POST - Create a new referral (match lead to job)
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();
    
    const {
      lead_id,
      job_id,
      referrer_id,
      referrer_code,
      notes
    } = body;

    // Get lead details
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', job_id)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Create referral record
    const { data: referral, error: insertError } = await supabase
      .from('referrals')
      .insert({
        lead_id,
        job_id,
        referrer_id,
        referrer_code,
        candidate_name: lead.name,
        candidate_email: lead.email,
        candidate_phone: lead.phone,
        job_title: job.title,
        company_name: job.company,
        reward_amount: job.reward,
        status: 'pending',
        notes
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating referral:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Update lead status
    await supabase
      .from('leads')
      .update({ status: 'referred' })
      .eq('id', lead_id);

    return NextResponse.json({ 
      success: true, 
      referral,
      message: 'Referral created successfully!' 
    });
  } catch (error) {
    console.error('Create referral error:', error);
    return NextResponse.json({ error: 'Failed to create referral' }, { status: 500 });
  }
}
