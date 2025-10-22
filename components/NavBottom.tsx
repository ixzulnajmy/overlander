'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HomeIcon, CompassIcon, MapIcon, MotorcycleIcon, UserIcon } from '@/components/icons/3DMenuIcons'

const tabs = [
  { href: '/dashboard', label: 'Home', Icon: HomeIcon },
  { href: '/explore', label: 'Explore', Icon: CompassIcon },
  { href: '/trips', label: 'Trips', Icon: MapIcon },
  { href: '/garage', label: 'Garage', Icon: MotorcycleIcon },
  { href: '/profile', label: 'Profile', Icon: UserIcon },
]

export default function NavBottom(){
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/80 backdrop-blur">
      <div className="mx-auto grid grid-cols-5">
        {tabs.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              'flex flex-col items-center py-2 text-[10px] text-muted-foreground transition-colors',
              pathname === t.href && 'text-foreground font-medium'
            )}
          >
            <t.Icon className="w-6 h-6 mb-1" />
            <span>{t.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
