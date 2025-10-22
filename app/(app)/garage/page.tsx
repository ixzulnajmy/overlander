'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/Button'
import { BikeCard } from '@/components/BikeCard'
import { cn } from '@/lib/utils'

type Bike = {
  id: string
  make?: string
  model?: string
  year?: number
  plate_no?: string
  nickname?: string
  photo_url?: string
  status: 'current' | 'past' | 'wishlist'
  odo_start_km?: number
}

type Tab = 'current' | 'past' | 'wishlist'

export default function Garage() {
  const [activeTab, setActiveTab] = useState<Tab>('current')

  const { data, isLoading } = useQuery({
    queryKey: ['bikes'],
    queryFn: async () => (await api.get('/bikes')).data.bikes as Bike[]
  })

  const filteredBikes = (data ?? []).filter(b => b.status === activeTab)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'current', label: 'Current' },
    { key: 'past', label: 'Past' },
    { key: 'wishlist', label: 'Wishlist' }
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Garage</h2>
        <Link href="/garage/new">
          <Button>Add Bike</Button>
        </Link>
      </div>

      <div className="mt-6 flex gap-4 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'pb-3 px-1 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.key
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-6 text-zinc-400">Loading…</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
          {filteredBikes.length === 0 && (
            <div className="text-zinc-400">
              No {activeTab === 'current' ? 'current bikes' : activeTab === 'past' ? 'past bikes' : 'bikes in your wishlist'}.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
