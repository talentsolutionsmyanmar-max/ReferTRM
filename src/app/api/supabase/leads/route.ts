// API Route: Leads from Supabase
// Fetch all leads/CVs

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured', leads: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const position = searchParams.get('position');
    const search = searchParams.get('search');

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (position) {
      query = query.ilike('current_position', `%${position}%`);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,skills.ilike.%${search}%`);
    }

    const { data: leads, count, error } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json({ error: error.message, leads: [], total: 0 });
    }

    return NextResponse.json({ 
      leads: leads || [], 
      total: count || 0,
      limit,
      offset
    });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads', leads: [], total: 0 });
  }
}
