'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

 const tabs = [
  { href: '/dashboard', label: 'Home' },
  { href: '/trips', label: 'Trips' },
  { href: '/membership', label: 'Card' },
  { href: '/profile', label: 'Profile' },
 ]

export default function NavBottom(){
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto grid grid-cols-4">
        {tabs.map(t => (
          <Link key={t.href} href={t.href} className={cn('text-center py-3 text-sm text-zinc-400', pathname === t.href && 'text-white font-medium')}>
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
