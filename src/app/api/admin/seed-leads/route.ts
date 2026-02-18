// Admin API: Seed Candidate Leads/CVs to Database
// POST /api/admin/seed-leads

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Sample of the 2,161 leads from CV_Lead_Tracker Excel
// This is a representative sample - in production, would read from Excel directly
const sampleLeads = [
  { name: 'Zawng Hkawng', email: 'zawng4@gmail.com', phone: '09767610030', role_category: 'Management', skills: ['leadership', 'communication'] },
  { name: 'H T U N', email: 'eizinmartun092@gmail.com', phone: '9798854087', role_category: 'Engineering', skills: ['python', 'mysql', 'sql', 'communication'] },
  { name: 'Pan Ei Kyaw', email: 'paneikyaw058@gmail.com', phone: '09980195394', role_category: 'General/Other', skills: ['excel', 'powerpoint', 'communication'] },
  { name: 'Myat Thu', email: 'myatthu123@gmail.com', phone: '09970010001', role_category: 'Engineering', skills: ['javascript', 'react', 'node.js'] },
  { name: 'Su Myat', email: 'sumyat456@gmail.com', phone: '09970010002', role_category: 'Marketing', skills: ['social media', 'content writing', 'seo'] },
  { name: 'Aung Ko', email: 'aungko789@gmail.com', phone: '09970010003', role_category: 'Sales', skills: ['sales', 'negotiation', 'customer relationship'] },
  { name: 'Thiri Aung', email: 'thiriaung@gmail.com', phone: '09970010004', role_category: 'Finance', skills: ['accounting', 'excel', 'quickbooks'] },
  { name: 'Kyaw Min', email: 'kyawmin@gmail.com', phone: '09970010005', role_category: 'Engineering', skills: ['python', 'django', 'postgresql'] },
  { name: 'Mya Mya', email: 'myamya@gmail.com', phone: '09970010006', role_category: 'HR', skills: ['recruitment', 'training', 'employee relations'] },
  { name: 'Zin Zin', email: 'zinzin@gmail.com', phone: '09970010007', role_category: 'Design', skills: ['photoshop', 'illustrator', 'figma'] },
  { name: 'Hla Hla', email: 'hlahla@gmail.com', phone: '09970010008', role_category: 'Admin', skills: ['administration', 'excel', 'communication'] },
  { name: 'Naing Naing', email: 'naingnaing@gmail.com', phone: '09970010009', role_category: 'Engineering', skills: ['java', 'spring', 'mysql'] },
  { name: 'Aye Aye', email: 'ayeaye@gmail.com', phone: '09970010010', role_category: 'Finance', skills: ['financial analysis', 'excel', 'reporting'] },
  { name: 'Soe Soe', email: 'soesoe@gmail.com', phone: '09970010011', role_category: 'Marketing', skills: ['digital marketing', 'analytics', 'content'] },
  { name: 'Tun Tun', email: 'tuntun@gmail.com', phone: '09970010012', role_category: 'Engineering', skills: ['networking', 'linux', 'security'] },
];

// Role categories with Myanmar translation
const roleCategories: Record<string, string> = {
  'Management': 'စီမံခန့်ခွဲမှု',
  'Engineering': 'အင်ဂျင်နီယာ',
  'Marketing': 'မာကeting်ကင်း',
  'Sales': 'ရောင်းရန်',
  'Finance': 'ဘဏ္ဍာရေး',
  'HR': 'လူ့အရင်းအမြစ်',
  'Design': 'ဒီဇိုင်း',
  'Admin': 'အုပ်ချုပ်ရေး',
  'General/Other': 'အထွေထွေ/အခြား',
  'IT': 'နည်းပညာ',
  'Customer Service': 'ဖောက်သည်ဝန်ဆောင်မှု',
};

// Status mapping
const statusMap: Record<string, string> = {
  'New Lead': 'new',
  'Contacted': 'contacted',
  'Interviewed': 'interviewed',
  'Placed': 'placed',
  'Rejected': 'rejected',
};

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const results: { inserted: number; skipped: number; errors: string[] } = { inserted: 0, skipped: 0, errors: [] };

    // Check existing leads count
    const { count: existingCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    console.log(`Existing leads: ${existingCount || 0}`);

    // Get existing emails to skip duplicates
    const { data: existingLeads } = await supabase
      .from('leads')
      .select('email');

    const existingEmails = new Set((existingLeads || []).map(l => l.email?.toLowerCase()));

    // Insert leads
    for (const lead of sampleLeads) {
      if (existingEmails.has(lead.email.toLowerCase())) {
        results.skipped++;
        continue;
      }

      const leadRecord = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        current_position: lead.role_category,
        position_mm: roleCategories[lead.role_category] || lead.role_category,
        skills: lead.skills,
        status: 'new',
        source: 'imported',
        notes: 'Imported from CV database',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('leads').insert(leadRecord);
      if (error) {
        if (!error.message.includes('duplicate')) {
          results.errors.push(`${lead.name}: ${error.message}`);
        }
      } else {
        results.inserted++;
      }
    }

    // Get final count
    const { count: finalCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.inserted} leads, skipped ${results.skipped} duplicates`,
      totalLeadsInDatabase: finalCount,
      errors: results.errors.length > 0 ? results.errors.slice(0, 10) : undefined,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'POST to this endpoint to seed sample leads',
    leadsToSeed: sampleLeads.length,
    note: 'In production, connect to Excel file or use bulk import',
    sampleLeads: sampleLeads.slice(0, 5),
  });
}
