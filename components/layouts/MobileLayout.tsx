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
      <main
        className="p-4"
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))'
        }}
      >
        {children}
      </main>
      <NavBottom />
      <FloatingActionButton onClick={handleFABClick} ariaLabel="Create new trip" />
    </div>
  )
}
