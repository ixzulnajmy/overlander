'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { supabase } from '@/lib/supabaseClient'
import { X } from 'lucide-react'

interface SettingsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsSidebar({ isOpen, onClose }: SettingsSidebarProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    await supabase.auth.signOut()

    // Detect PWA mode
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true

    // PWA: redirect to login, Browser: redirect to landing page
    router.push(isPWA ? '/login' : '/')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-[2001] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full liquid-glass border-l border-white/20 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme */}
          <section className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              Appearance
            </h3>
            <div className="liquid-glass rounded-2xl p-4">
              <label className="block mb-2 font-medium text-sm">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </section>

          {/* Account */}
          <section className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              Account
            </h3>
            <button
              onClick={handleLogout}
              className="w-full liquid-glass rounded-2xl p-4 text-red-400 hover:bg-red-500/10 border border-red-500/20 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Sign Out
            </button>
          </section>

          {/* Footer */}
          <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
            Overlander v1.0.0
          </div>
        </div>
      </div>
    </>
  )
}
