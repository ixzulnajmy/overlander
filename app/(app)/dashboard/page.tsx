export default function Dashboard(){
  return (
    <div>
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <p className="text-zinc-400">Your kilometres, bikes, and upcoming rides at a glance.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-4">Total km (YTD): 0</div>
        <div className="rounded-xl border border-white/10 p-4">Trips: 0</div>
        <div className="rounded-xl border border-white/10 p-4">Badges: 0</div>
      </div>
    </div>
  )
}
