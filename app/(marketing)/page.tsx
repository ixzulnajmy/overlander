import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Landing(){
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand.ink to-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand.red/20 ring-2 ring-brand.red flex items-center justify-center">
            <Image alt="Overlanders" src="/logo.png" width={48} height={48}/>
          </div>
          <span className="text-brand.yellow text-4xl font-semibold tracking-wider">OVERLANDERS</span>
        </div>
        <h1 className="mt-8 text-6xl font-extrabold leading-tight">Ride. Record. Relive.</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">Membership + trip logbook for cross‑border riders. Built for BMW RT, Harley, and every long‑haul machine.</p>
        <div className="mt-8 flex gap-4">
          <Button><Link href="/dashboard">Enter App</Link></Button>
          <Button className="bg-transparent border border-white/20"><Link href="/trips">Explore Trips</Link></Button>
          <Button className="bg-white/10"><Link href="/login">Login</Link></Button>
        </div>
      </div>
    </main>
  )
}
