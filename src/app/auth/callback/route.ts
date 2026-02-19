import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('🔐 Auth callback received, code:', code ? 'present' : 'missing')

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('❌ Auth callback error:', error.message)
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
    }

    console.log('✅ Session established for user:', data.user?.id)

    // Create user profile if it doesn't exist
    if (data.user) {
      const { error: profileError } = await supabase
        .from('User')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || 'User',
          points: 50,
          total_points_earned: 50,
          streak: 1,
          max_streak: 1,
          level: 'Amateur',
          avatar: '🧑',
          avatar_type: 'neutral',
          referral_code: 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          total_referrals: 0,
          successful_referrals: 0,
          total_earned: 0,
          completed_modules: [],
          purchased_items: [],
          last_login_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' })

      if (profileError) {
        console.error('❌ Profile creation error:', profileError)
      } else {
        console.log('✅ User profile created/updated')
      }
    }
  }

  // Redirect to dashboard
  return NextResponse.redirect(`${origin}${next}`)
}
