import { NextRequest, NextResponse } from 'next/server'
import { serverSupabase } from '@/lib/serverSupabase'

export async function GET() {
  // Placeholder: return empty list for now
  return NextResponse.json({ trips: [] })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const sb = serverSupabase()
  const { data, error } = await sb.from('trips').insert(body).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ trip: data })
}
