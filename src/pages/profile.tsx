import { RaceChart } from '@/components/race-stats/race-chart'
import { useUser } from '@clerk/clerk-react'
import { Card } from '@/components/ui/card'

export default function ProfilePage() {
  const { user, isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <div className="container py-8">
        <Card className="p-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
            <p className="text-muted-foreground">
              Sign in to view and manage your profile.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.imageUrl}
            alt={user?.fullName || 'User'}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{user?.fullName}</h1>
            <p className="text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {new Date(user?.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Running Stats</h2>
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Races</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Distance</p>
                  <p className="text-2xl font-bold">90.3km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Pace</p>
                  <p className="text-2xl font-bold">4.6/km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Distance</p>
                  <p className="text-2xl font-bold">18.1km</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <RaceChart />
        </div>
      </div>
    </div>
  )
}
