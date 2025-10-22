'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HomeIcon, CompassIcon, MapIcon, MotorcycleIcon, UserIcon, SettingsIcon } from '@/components/icons/3DMenuIcons'

const items = [
  { href: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
  { href: '/explore', label: 'Explore', Icon: CompassIcon },
  { href: '/trips', label: 'Trips', Icon: MapIcon },
  { href: '/garage', label: 'Garage', Icon: MotorcycleIcon },
  { href: '/profile', label: 'Profile', Icon: UserIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
]

export default function DesktopLayout({ children }: { children: React.ReactNode }){
  const pathname = usePathname()
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="bg-card border-r border-border p-4">
        <div className="text-xl font-bold tracking-wide mb-8">Overlander</div>
        <nav className="space-y-1">
          {items.map(it => (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
                pathname === it.href && 'bg-accent text-accent-foreground font-medium'
              )}
            >
              <it.Icon className="w-5 h-5" />
              <span>{it.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6 bg-background">{children}</main>
    </div>
  )
}
