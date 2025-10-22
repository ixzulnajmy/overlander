'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: 'https://cdn.3dicons.com/packs/3-53/free/03-home.png' },
  { href: '/explore', label: 'Explore', icon: 'https://cdn.3dicons.com/packs/3-53/free/05-compass.png' },
  { href: '/trips', label: 'Trips', icon: 'https://cdn.3dicons.com/packs/3-53/free/06-map.png' },
  { href: '/garage', label: 'Garage', icon: 'https://cdn.3dicons.com/packs/3-53/free/14-motorcycle.png' },
  { href: '/profile', label: 'Profile', icon: 'https://cdn.3dicons.com/packs/3-53/free/08-user.png' },
  { href: '/settings', label: 'Settings', icon: 'https://cdn.3dicons.com/packs/3-53/free/07-settings.png' },
]

export default function DesktopLayout({ children }: { children: React.ReactNode }){
  const pathname = usePathname()
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-zinc-950 border-r border-white/10 p-4">
        <div className="text-xl font-bold tracking-wide mb-8">Overlander</div>
        <nav className="space-y-1">
          {items.map(it => (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 transition-colors',
                pathname === it.href && 'bg-white/10 text-white'
              )}
            >
              <Image
                src={it.icon}
                alt={it.label}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span>{it.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}
