'use client'
import NavBottom from '@/components/NavBottom'

export default function MobileLayout({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen pb-14">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto px-4 py-3 font-semibold">Overlander</div>
      </header>
      <main className="p-4">{children}</main>
      <NavBottom />
    </div>
  )
}
