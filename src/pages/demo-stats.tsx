import { RacePerformanceChart } from '@/components/race-stats/race-performance-chart'
import { Card } from '@/components/ui/card'

// Sample race data
const sampleRaceData = [
  {
    race_date: '2023-03-15',
    finish_time: 245,
    distance: 42.20,
    pace: 5.80,
    race_name: 'Spring City Marathon'
  },
  {
    race_date: '2023-05-20',
    finish_time: 118,
    distance: 21.10,
    pace: 5.59,
    race_name: 'Summer Beach Run'
  },
  {
    race_date: '2023-07-08',
    finish_time: 92,
    distance: 15.00,
    pace: 6.13,
    race_name: 'Mountain Trail Challenge'
  },
  {
    race_date: '2023-09-12',
    finish_time: 115,
    distance: 21.10,
    pace: 5.45,
    race_name: 'Autumn Park Half Marathon'
  },
  {
    race_date: '2023-12-03',
    finish_time: 52,
    distance: 10.00,
    pace: 5.20,
    race_name: 'Winter Wonderland 10K'
  },
  {
    race_date: '2024-01-01',
    finish_time: 54,
    distance: 10.00,
    pace: 5.40,
    race_name: 'New Year Resolution Run'
  },
  {
    race_date: '2024-02-14',
    finish_time: 236,
    distance: 42.20,
    pace: 5.59,
    race_name: 'Valentine Day Marathon'
  },
  {
    race_date: '2024-03-01',
    finish_time: 86,
    distance: 15.00,
    pace: 5.73,
    race_name: 'Spring Festival 15K'
  }
]

// Calculate statistics
const stats = {
  totalRaces: sampleRaceData.length,
  totalDistance: Number(sampleRaceData.reduce((sum, race) => sum + race.distance, 0).toFixed(1)),
  bestPace: Number(Math.min(...sampleRaceData.map(race => race.pace)).toFixed(2)),
  avgDistance: Number((sampleRaceData.reduce((sum, race) => sum + race.distance, 0) / sampleRaceData.length).toFixed(1))
}

export default function DemoStatsPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Race Performance Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A demonstration of race performance tracking and visualization using sample data.
          </p>
        </div>

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

        <RacePerformanceChart data={sampleRaceData} />

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Race History</h3>
            <div className="grid gap-4">
              {sampleRaceData.map((race) => (
                <div
                  key={race.race_date}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{race.race_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(race.race_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
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
    </div>
  )
}
