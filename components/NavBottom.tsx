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
    <nav
      className="fixed left-3 right-3 bottom-3 z-[1000] animate-slide-up rounded-[28px] liquid-glass-nav"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="mx-auto grid grid-cols-5">
        {tabs.map(t => {
          const isActive = pathname === t.href
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                'flex flex-col items-center pt-3 pb-2 text-[10px] transition-all duration-200',
                'hover:scale-105 active:scale-95',
                isActive
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground/80'
              )}
            >
              <div className={cn(
                'mb-0.5 transition-transform duration-200',
                isActive && 'scale-110'
              )}>
                <t.Icon className="w-6 h-6" />
              </div>
              <span className="tracking-tight">{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
