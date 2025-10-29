'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

function isStandalonePwa() {
  if (typeof window === 'undefined') return false

  return (
    (typeof window.matchMedia === 'function' &&
      window.matchMedia('(display-mode: standalone)').matches) ||
    (window.navigator as any).standalone === true
  )
}

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function Landing() {
  const router = useRouter()
  const [showMarketing, setShowMarketing] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isIosSafari, setIsIosSafari] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    let isMounted = true

    async function handleRouting() {
      const { data } = await supabase.auth.getSession()
      if (!isMounted) return

      if (data.session) {
        router.replace('/dashboard')
        return
      }

      if (isStandalonePwa()) {
        router.replace('/login')
        return
      }

      setShowMarketing(true)
    }

    handleRouting()

    return () => {
      isMounted = false
    }
  }, [router])

  useEffect(() => {
    if (!showMarketing) {
      return
    }

    const userAgent = window.navigator.userAgent.toLowerCase()
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    )
    const standalone = isStandalonePwa()

    if (!isMobileDevice || standalone) {
      setShowInstallPrompt(false)
      setIsIosSafari(false)
      setDeferredPrompt(null)
      return
    }

    const isIos = /iphone|ipad|ipod/.test(userAgent)
    const isSafari =
      /safari/.test(userAgent) && !/crios|fxios|opios|edgios|chrome|android/.test(userAgent)

    if (isIos && isSafari) {
      setIsIosSafari(true)
      setShowInstallPrompt(true)
      return
    }

    setIsIosSafari(false)

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      const promptEvent = event as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [showMarketing])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)

    if (outcome === 'accepted') {
      setShowInstallPrompt(false)
    }
  }

  if (!showMarketing) {
    return null
  }

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
          {showInstallPrompt && (
            <div className="mt-8 mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
              {isIosSafari ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">
                    Add Overlander to your Home Screen
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Tap the share button in Safari, then choose <strong>Add to Home Screen</strong> to
                    keep Overlander just a tap away.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Install the Overlander app</h3>
                    <p className="text-sm text-zinc-300">
                      Add Overlander to your home screen for a faster, full-screen experience.
                    </p>
                  </div>
                  <Button onClick={handleInstallClick} className="sm:w-auto w-full">
                    Add to Home Screen
                  </Button>
                </div>
              )}
            </div>
          )}
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
          <h2 className="text-4xl font-bold text-center mb-12">Upcoming Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Thailand to Laos', date: 'Dec 15-22, 2024', difficulty: 'Moderate', price: 'RM 2,500' },
              { title: 'Malaysia North-South', date: 'Jan 10-14, 2025', difficulty: 'Easy', price: 'RM 1,200' },
              { title: 'Borneo Expedition', date: 'Feb 20-28, 2025', difficulty: 'Advanced', price: 'RM 3,800' }
            ].map((trip, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-6 hover:bg-white/5 transition">
                <div className="h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl mb-4"></div>
                <h3 className="text-xl font-semibold">{trip.title}</h3>
                <p className="text-sm text-zinc-400 mt-2">{trip.date}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">{trip.difficulty}</span>
                  <span className="text-lg font-bold text-yellow-400">{trip.price}</span>
                </div>
              </div>
            ))}
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
