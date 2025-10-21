import { MembershipCard } from '@/components/MembershipCard'

export default function Membership(){
  return (
    <div>
      <h2 className="text-3xl font-bold">Membership</h2>
      <p className="text-zinc-400">Your Overlander ID and tier.</p>
      <div className="mt-6 max-w-md">
        <MembershipCard membershipNo="OVR-000123" />
      </div>
    </div>
  )
}
