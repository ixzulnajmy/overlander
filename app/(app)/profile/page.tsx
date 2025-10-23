'use client'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import SettingsSidebar from '@/components/SettingsSidebar'

export default function Profile(){
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div>
      {/* Header with hamburger menu */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">Profile</h2>
          <p className="text-zinc-400">Update your details & preferences.</p>
        </div>

        {/* Hamburger Menu Button - iOS 26 Liquid Glass */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Open settings"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-6 grid gap-4 max-w-xl">
        <div className="rounded-xl border border-white/10 p-4">Name / Handle (coming soon)</div>
        <div className="rounded-xl border border-white/10 p-4">Brand affinity: BMW / Harley</div>
      </div>

      {/* Settings Sidebar */}
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
