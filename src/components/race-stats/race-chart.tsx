import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { RacePerformanceChart } from './race-performance-chart'
import { useUser } from '@clerk/clerk-react'

type RaceRecord = {
  race_date: string
  finish_time: number // in minutes
  distance: number
  pace: number
  race_name: string
}

type RaceStats = {
  totalRaces: number
  totalDistance: number
  bestPace: number
  avgDistance: number
}

export function RaceChart() {
  const { user } = useUser()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [raceData, setRaceData] = useState<RaceRecord[]>([])
  const [stats, setStats] = useState<RaceStats>({
    totalRaces: 0,
    totalDistance: 0,
    bestPace: 0,
    avgDistance: 0
  })

  useEffect(() => {
    if (user) {
      fetchRaceData()
    }
  }, [user])

  useEffect(() => {
    if (raceData.length > 0) {
      calculateStats()
    }
  }, [raceData])

  async function fetchRaceData() {
    try {
      const { data, error } = await supabase
        .from('race_records_e7d6c5b4')
        .select('*')
        .eq('user_id', user?.id)
        .order('race_date', { ascending: true })

      if (error) throw error

      if (data) {
        setRaceData(data)
      }
    } catch (error) {
      console.error('Error fetching race data:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load race data. Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  function calculateStats() {
    const totalRaces = raceData.length
    const totalDistance = raceData.reduce((sum, race) => sum + race.distance, 0)
    const bestPace = Math.min(...raceData.map((race) => race.pace))
    const avgDistance = totalDistance / totalRaces

    setStats({
      totalRaces,
      totalDistance: Number(totalDistance.toFixed(1)),
      bestPace: Number(bestPace.toFixed(2)),
      avgDistance: Number(avgDistance.toFixed(1))
    })
  }

  if (!user) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground">
            Sign in to view your race performance and statistics.
          </p>
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    )
  }

  if (raceData.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-2">No Race Data</h2>
          <p className="text-muted-foreground">
            You haven't recorded any races yet. Start tracking your races to see your performance trends.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Races</p>
            <p className="text-2xl font-bold">{stats.totalRaces}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold">{stats.totalDistance}km</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Best Pace</p>
            <p className="text-2xl font-bold">{stats.bestPace}/km</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Avg Distance</p>
            <p className="text-2xl font-bold">{stats.avgDistance}km</p>
          </div>
        </Card>
      </div>

      <RacePerformanceChart data={raceData} />

      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Races</h3>
          <div className="grid gap-4">
            {raceData.map((race) => (
              <div
                key={race.race_date}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{race.race_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(race.race_date), 'PPP')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {Math.floor(race.finish_time / 60)}:{String(race.finish_time % 60).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {race.distance}km at {race.pace}/km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
