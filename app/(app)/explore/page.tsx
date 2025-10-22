'use client'
import { useState } from 'react'
import { TripCard } from '@/components/TripCard'

type Tab = 'official' | 'community'

// Mock data - will be replaced with real API calls
const officialTrips = [
  { id: '1', title: 'Thailand to Laos Expedition', start_loc: 'Chiang Mai', end_loc: 'Luang Prabang', start_at: '2024-12-15', end_at: '2024-12-22', is_overlander_official: true },
  { id: '2', title: 'Malaysia North-South', start_loc: 'Perlis', end_loc: 'Johor', start_at: '2025-01-10', end_at: '2025-01-14', is_overlander_official: true },
  { id: '3', title: 'Borneo Wilderness', start_loc: 'Kota Kinabalu', end_loc: 'Kuching', start_at: '2025-02-20', end_at: '2025-02-28', is_overlander_official: true },
]

const communityTrips = [
  { id: '4', title: 'Cameron Highlands Weekend', start_loc: 'KL', end_loc: 'Cameron', start_at: '2024-11-30', end_at: '2024-12-01', is_overlander_official: false },
  { id: '5', title: 'East Coast Tour', start_loc: 'Kuantan', end_loc: 'Kota Bharu', start_at: '2024-12-08', end_at: '2024-12-10', is_overlander_official: false },
]

export default function Explore() {
  const [activeTab, setActiveTab] = useState<Tab>('official')

  const tabs = [
    { key: 'official' as Tab, label: 'Overlander Official', count: officialTrips.length },
    { key: 'community' as Tab, label: 'Community Rides', count: communityTrips.length },
  ]

  const displayTrips = activeTab === 'official' ? officialTrips : communityTrips

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Explore</h2>
          <p className="text-zinc-400 mt-1">Discover upcoming rides and adventures</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label} <span className="ml-1 text-zinc-500">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Trip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayTrips.map(trip => (
          <div key={trip.id} className="relative">
            <TripCard trip={trip} />
            {trip.is_overlander_official && (
              <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                OFFICIAL
              </div>
            )}
          </div>
        ))}
      </div>

      {displayTrips.length === 0 && (
        <div className="text-center py-12 text-zinc-400">
          No {activeTab === 'official' ? 'official' : 'community'} trips available at the moment.
        </div>
      )}
    </div>
  )
}
