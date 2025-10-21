import { TripCard } from '@/components/TripCard'

const demo = [
  { id: '1', title: 'Laos Loop', start_loc: 'Hatyai', end_loc: 'Luang Prabang', start_at: '2025-01-10', end_at: '2025-01-18' },
  { id: '2', title: 'Batam Sprint', start_loc: 'Johor', end_loc: 'Batam', start_at: '2025-02-20', end_at: '2025-02-22' },
]

export default function Trips(){
  return (
    <div>
      <h2 className="text-3xl font-bold">My Trips</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {demo.map(t => <TripCard key={t.id} trip={t as any} />)}
      </div>
    </div>
  )
}
