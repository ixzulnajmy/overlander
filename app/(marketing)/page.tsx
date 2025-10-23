'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

export default function Landing() {
  const router = useRouter()
  const [popularTrips, setPopularTrips] = useState<any[]>([])

  useEffect(() => {
    // Check auth status - if logged in, go to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard')
        return
      }
    })

    // Detect PWA mode (not just mobile device)
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true

    // If PWA mode, redirect to login immediately
    if (isPWA) {
      router.push('/login')
    }

    // Fetch popular public trips
    async function fetchTrips() {
      const { data, error} = await supabase
        .from('trips')
        .select(`
          id,
          title,
          start_at,
          end_at,
          start_loc,
          end_loc,
          distance_km,
          cover_url,
          trip_participants (count)
        `)
        .eq('visibility', 'public')
        .eq('is_overlander_official', true)
        .order('created_at', { ascending: false })
        .limit(3)

      if (data && !error) {
        setPopularTrips(data)
      }
    }
    fetchTrips()
  }, [router])

  // Desktop: show marketing page
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-500/20 ring-2 ring-red-500 flex items-center justify-center">
              <Image alt="Overlander" src="/logo.png" width={32} height={32}/>
            </div>
            <span className="text-yellow-400 text-2xl font-bold tracking-wide">OVERLANDER</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-zinc-300 hover:text-white transition">Login</Link>
            <Link href="/login">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Ride. Record. Relive.
          </h1>
          <p className="mt-6 text-xl text-zinc-300 max-w-3xl mx-auto">
            The ultimate membership and trip logbook for cross-border motorcycle adventurers.
            Built for BMW GS riders, Harley tourers, and every long-haul machine.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/login">
              <Button className="px-8 py-6 text-lg">Join the Community</Button>
            </Link>
            <Button className="px-8 py-6 text-lg bg-white/10 hover:bg-white/20">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-yellow-400">2,847</div>
              <div className="mt-2 text-zinc-400">Active Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-500">1,234</div>
              <div className="mt-2 text-zinc-400">Trips Organized</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-500">47</div>
              <div className="mt-2 text-zinc-400">Countries Conquered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Trips */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularTrips.length > 0 ? (
              popularTrips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                  <div className="rounded-2xl border border-white/10 p-6 hover:bg-white/5 transition cursor-pointer">
                    {trip.cover_url ? (
                      <div className="h-40 rounded-xl mb-4 overflow-hidden">
                        <Image
                          src={trip.cover_url}
                          alt={trip.title}
                          width={400}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl mb-4"></div>
                    )}
                    <h3 className="text-xl font-semibold">{trip.title}</h3>
                    {trip.start_at && (
                      <p className="text-sm text-zinc-400 mt-2">
                        {new Date(trip.start_at).toLocaleDateString('en-MY', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        {trip.end_at && ` - ${new Date(trip.end_at).toLocaleDateString('en-MY', {
                          month: 'short',
                          day: 'numeric'
                        })}`}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-zinc-500">
                        {trip.start_loc} → {trip.end_loc}
                      </span>
                      {trip.distance_km && (
                        <span className="text-sm font-bold text-yellow-400">{trip.distance_km} km</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback to placeholder if no trips in database
              [
                { title: 'Thailand to Laos', date: 'Dec 15-22, 2024', route: 'Bangkok → Vientiane', distance: '850 km' },
                { title: 'Malaysia North-South', date: 'Jan 10-14, 2025', route: 'Perlis → Johor', distance: '1,200 km' },
                { title: 'Borneo Expedition', date: 'Feb 20-28, 2025', route: 'Kuching → Kota Kinabalu', distance: '1,800 km' }
              ].map((trip, i) => (
                <div key={i} className="rounded-2xl border border-white/10 p-6 hover:bg-white/5 transition">
                  <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl mb-4"></div>
                  <h3 className="text-xl font-semibold">{trip.title}</h3>
                  <p className="text-sm text-zinc-400 mt-2">{trip.date}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-zinc-500">{trip.route}</span>
                    <span className="text-sm font-bold text-yellow-400">{trip.distance}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Previous Events */}
      <section className="py-20 px-6 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Recent Expeditions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Rider Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ahmad Razak', bike: 'BMW R1250GS', review: 'Best riding community in Malaysia. The trips are well-organized and the camaraderie is unmatched.' },
              { name: 'Sarah Lee', bike: 'Triumph Tiger 900', review: 'Finally found a group that takes safety seriously while still having tons of fun on the road.' },
              { name: 'David Tan', bike: 'Harley Road Glide', review: 'From beginner rides to epic cross-border adventures, Overlander has it all.' }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-red-500"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-zinc-400">{testimonial.bike}</div>
                  </div>
                </div>
                <p className="text-zinc-300">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-900/20 to-yellow-900/20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Join the Ride?</h2>
          <p className="text-xl text-zinc-300 mb-10">
            Become an Overlander member and get access to exclusive trips, community events, and rider benefits.
          </p>
          <Link href="/login">
            <Button className="px-12 py-6 text-xl">Register for Membership</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl text-center text-zinc-400 text-sm">
          <p>&copy; 2024 Overlander. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
