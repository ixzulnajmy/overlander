export function MembershipCard({ membershipNo }: { membershipNo: string }){
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-brand.red/20 to-black">
      <div className="text-sm text-zinc-400">Overlander ID</div>
      <div className="mt-2 text-3xl font-bold tracking-wider">{membershipNo}</div>
      <div className="mt-4 text-xs text-zinc-400">Scan QR in v2</div>
    </div>
  )
}
