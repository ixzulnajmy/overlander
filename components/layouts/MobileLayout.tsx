'use client'
import NavBottom from '@/components/NavBottom'
import FloatingActionButton from '@/components/FloatingActionButton'

export default function MobileLayout({ children }: { children: React.ReactNode }){
  const handleFABClick = () => {
    // TODO: Implement primary action (e.g., create new trip)
    console.log('FAB clicked')
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto px-4 py-3 font-semibold">Overlander</div>
      </header>
      <main className="p-4">{children}</main>
      <NavBottom />
      <FloatingActionButton onClick={handleFABClick} ariaLabel="Create new trip" />
    </div>
  )
}
