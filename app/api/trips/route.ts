import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

async function getOrCreateProfile() {
  const sb = await supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) return { user: null, profile: null, sb }

  let { data: profile } = await sb.from('profiles').select('id').eq('user_id', user.id).single()

  if (!profile) {
    const membership_no = `OVR-${String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0')}`
    const ins = await sb.from('profiles')
      .insert({ user_id: user.id, membership_no })
      .select('id')
      .single()
    if (ins.error) return { user, profile: null, sb }
    profile = ins.data
  }
  return { user, profile, sb }
}

export async function GET() {
  const { user, profile, sb } = await getOrCreateProfile()
  if (!user || !profile) return NextResponse.json({ trips: [] })

  const { data, error } = await sb.from('trips')
    .select('*')
    .eq('owner_id', profile.id)
    .order('start_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ trips: data ?? [] })
}

export async function POST(req: NextRequest) {
  const { user, profile, sb } = await getOrCreateProfile()
  if (!user || !profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { data, error } = await sb.from('trips').insert({ ...body, owner_id: profile.id }).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ trip: data })
}
