export default function Profile(){
  return (
    <div>
      <h2 className="text-3xl font-bold">Profile</h2>
      <p className="text-zinc-400">Update your details & preferences.</p>
      <div className="mt-6 grid gap-4 max-w-xl">
        <div className="rounded-xl border border-white/10 p-4">Name / Handle (coming soon)</div>
        <div className="rounded-xl border border-white/10 p-4">Brand affinity: BMW / Harley</div>
      </div>
    </div>
  )
}
