'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/Button'

export default function Settings() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    tripInvites: true,
    upcomingEvents: true,
    newMembers: false,
    newsletter: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showGarage: true,
    showTrips: true,
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      {/* Theme Preferences */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Theme Preferences</h3>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Appearance</div>
              <div className="text-sm text-muted-foreground">Choose your preferred theme</div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Trip Invites</div>
              <div className="text-sm text-muted-foreground">Get notified when invited to trips</div>
            </div>
            <button
              onClick={() => setNotifications({...notifications, tripInvites: !notifications.tripInvites})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.tripInvites ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.tripInvites ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Upcoming Events</div>
              <div className="text-sm text-muted-foreground">Reminders for events you're attending</div>
            </div>
            <button
              onClick={() => setNotifications({...notifications, upcomingEvents: !notifications.upcomingEvents})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.upcomingEvents ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.upcomingEvents ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">New Members</div>
              <div className="text-sm text-muted-foreground">Get notified about new community members</div>
            </div>
            <button
              onClick={() => setNotifications({...notifications, newMembers: !notifications.newMembers})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.newMembers ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.newMembers ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Newsletter</div>
              <div className="text-sm text-muted-foreground">Monthly updates and riding tips</div>
            </div>
            <button
              onClick={() => setNotifications({...notifications, newsletter: !notifications.newsletter})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.newsletter ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.newsletter ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Privacy</h3>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Profile Visibility</div>
              <div className="text-sm text-muted-foreground">Who can see your profile</div>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="public">Public</option>
              <option value="members">Members Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show Garage</div>
              <div className="text-sm text-muted-foreground">Display your bikes publicly</div>
            </div>
            <button
              onClick={() => setPrivacy({...privacy, showGarage: !privacy.showGarage})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                privacy.showGarage ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                privacy.showGarage ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show Trips</div>
              <div className="text-sm text-muted-foreground">Make your trips visible to others</div>
            </div>
            <button
              onClick={() => setPrivacy({...privacy, showTrips: !privacy.showTrips})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                privacy.showTrips ? 'bg-green-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                privacy.showTrips ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Account</h3>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
          >
            Sign Out
          </Button>
        </div>
      </section>
    </div>
  )
}
