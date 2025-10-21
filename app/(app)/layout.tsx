'use client'
import DesktopLayout from '@/components/layouts/DesktopLayout'
import MobileLayout from '@/components/layouts/MobileLayout'
import { useEffect, useState } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }){
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>
}
