type Trip = {
  id: string
  title: string
  start_at?: string
  end_at?: string
  start_loc?: string
  end_loc?: string
  cover_url?: string
}

export function TripCard({ trip }: { trip: Trip }){
  return (
    <div className="rounded-2xl border border-white/10 p-4 hover:bg-white/5 transition">
      <div className="flex items-center gap-3">
        <img src={trip.cover_url ?? '/logo.png'} alt="cover" className="h-20 w-28 object-cover rounded-xl"/>
        <div>
          <h3 className="text-lg font-semibold">{trip.title}</h3>
          <div className="mt-1 text-sm text-zinc-400">
            {trip.start_loc} → {trip.end_loc} <span className="ml-2">{trip.start_at?.slice(0,10)} → {trip.end_at?.slice(0,10)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
