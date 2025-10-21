'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { TripCard } from '@/components/TripCard'
import { Button } from '@/components/ui/Button'

type Trip = {
  id: string; title: string; start_loc?: string; end_loc?: string; start_at?: string; end_at?: string; cover_url?: string
}

export default function Trips(){
  const { data, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => (await api.get('/trips')).data.trips as Trip[]
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Trips</h2>
        <Link href="/trips/new"><Button>New Trip</Button></Link>
      </div>

      {isLoading ? <div className="mt-6 text-zinc-400">Loading…</div> : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data ?? []).map(t => <TripCard key={t.id} trip={t as any} />)}
          {(!data || data.length === 0) && <div className="text-zinc-400">No trips yet.</div>}
        </div>
      )}
    </div>
  )
}
