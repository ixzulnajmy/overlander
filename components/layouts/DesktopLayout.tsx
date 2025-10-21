'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/trips', label: 'Trips' },
  { href: '/membership', label: 'Membership' },
  { href: '/profile', label: 'Profile' },
]

export default function DesktopLayout({ children }: { children: React.ReactNode }){
  const pathname = usePathname()
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-zinc-950 border-r border-white/10 p-4">
        <div className="text-xl font-bold tracking-wide">Overlander</div>
        <nav className="mt-6 space-y-2">
          {items.map(it => (
            <Link key={it.href} href={it.href} className={cn('block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5', pathname === it.href && 'bg-white/10 text-white')}>
              {it.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}
