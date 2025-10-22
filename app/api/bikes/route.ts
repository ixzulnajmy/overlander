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
  if (!user || !profile) return NextResponse.json({ bikes: [] })

  const { data, error } = await sb.from('bikes')
    .select('*')
    .eq('owner_id', profile.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ bikes: data ?? [] })
}

export async function POST(req: NextRequest) {
  const { user, profile, sb } = await getOrCreateProfile()
  if (!user || !profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { data, error } = await sb.from('bikes').insert({ ...body, owner_id: profile.id }).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ bike: data })
}

export async function PUT(req: NextRequest) {
  const { user, profile, sb } = await getOrCreateProfile()
  if (!user || !profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'Bike ID required' }, { status: 400 })

  const { data, error } = await sb
    .from('bikes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', profile.id)
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ bike: data })
}

export async function DELETE(req: NextRequest) {
  const { user, profile, sb } = await getOrCreateProfile()
  if (!user || !profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'Bike ID required' }, { status: 400 })

  const { error } = await sb
    .from('bikes')
    .delete()
    .eq('id', id)
    .eq('owner_id', profile.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
