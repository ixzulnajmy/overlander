'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/dashboard', label: 'Home', icon: 'https://cdn.3dicons.com/packs/3-53/free/03-home.png' },
  { href: '/explore', label: 'Explore', icon: 'https://cdn.3dicons.com/packs/3-53/free/05-compass.png' },
  { href: '/trips', label: 'Trips', icon: 'https://cdn.3dicons.com/packs/3-53/free/06-map.png' },
  { href: '/garage', label: 'Garage', icon: 'https://cdn.3dicons.com/packs/3-53/free/14-motorcycle.png' },
  { href: '/profile', label: 'Profile', icon: 'https://cdn.3dicons.com/packs/3-53/free/08-user.png' },
]

export default function NavBottom(){
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto grid grid-cols-5">
        {tabs.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              'flex flex-col items-center py-2 text-[10px] text-zinc-400 transition-colors',
              pathname === t.href && 'text-white'
            )}
          >
            <Image
              src={t.icon}
              alt={t.label}
              width={24}
              height={24}
              className="w-6 h-6 mb-1"
            />
            <span>{t.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
