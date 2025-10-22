'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Settings, TrendingUp, MapPin, Users, Wrench, Award, Calendar } from 'lucide-react'

// Mock data - will be replaced with real API calls
const dashboardData = {
  totalKm: 45823,
  kmPastMonth: 1245,
  kmPastYear: 18950,
  countriesConquered: 12,
  mostRiddenCountries: [
    { name: 'Malaysia', km: 28500 },
    { name: 'Thailand', km: 8200 },
    { name: 'Indonesia', km: 4500 },
  ],
  topFriend: { name: 'Ahmad Razak', trips: 23 },
  nextService: { bike: 'Yamaha XMAX', dueKm: 2500, dueDate: '2024-12-15' },
  mostUsedBike: { name: 'Yamaha XMAX', km: 32000 },
  recentBadges: [
    { name: 'Century Rider', description: '100km in a day', date: '2024-10-15' },
    { name: 'Border Crosser', description: 'Visited 3 countries', date: '2024-09-20' },
  ],
  upcomingTrips: [
    { title: 'Thailand Border Run', date: '2024-12-01', participants: 8 },
  ],
  pastTrips: [
    { title: 'East Coast Tour', date: '2024-10-20', km: 850 },
    { title: 'Cameron Highlands', date: '2024-10-05', km: 420 },
  ]
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Rider!</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
          <Settings className="w-4 h-4" />
          Customize
        </button>
      </div>

      {/* KM Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kilometers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalKm.toLocaleString()} km</div>
            <p className="text-xs text-muted-foreground">Lifetime odometer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Past Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.kmPastMonth.toLocaleString()} km</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Past Year</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.kmPastYear.toLocaleString()} km</div>
            <p className="text-xs text-muted-foreground">2024 total</p>
          </CardContent>
        </Card>
      </div>

      {/* Countries & Friends Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Countries Conquered</CardTitle>
            <CardDescription>{dashboardData.countriesConquered} countries explored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.mostRiddenCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{country.km.toLocaleString()} km</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Riding Buddy</CardTitle>
            <CardDescription>Most trips together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">{dashboardData.topFriend.name}</div>
                <div className="text-sm text-muted-foreground">{dashboardData.topFriend.trips} trips together</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service & Bike Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Service</CardTitle>
            <CardDescription>Don't forget to maintain your ride</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{dashboardData.nextService.bike}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Due in {dashboardData.nextService.dueKm.toLocaleString()} km or {dashboardData.nextService.dueDate}
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[65%] rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Used Bike</CardTitle>
            <CardDescription>Your trusted companion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="font-semibold text-lg">{dashboardData.mostUsedBike.name}</div>
              <div className="text-sm text-muted-foreground">
                {dashboardData.mostUsedBike.km.toLocaleString()} km logged
              </div>
              <div className="text-xs text-muted-foreground">
                70% of total distance
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges & Trips */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Badges</CardTitle>
            <CardDescription>Latest achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentBadges.map((badge, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-muted-foreground">{badge.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Trips</CardTitle>
            <CardDescription>Recent adventures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.pastTrips.map((trip, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="font-medium">{trip.title}</div>
                    <div className="text-sm text-muted-foreground">{trip.date}</div>
                  </div>
                  <div className="text-sm font-medium">{trip.km} km</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
