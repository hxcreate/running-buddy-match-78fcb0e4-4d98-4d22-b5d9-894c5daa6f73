import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { RegistrationModal } from './registration-modal'

type Race = {
  id: string
  race_name: string
  race_date: string
  location: string
  distance: number
  registration_deadline: string
  max_participants: number
  current_participants: number
  price: number
  description: string
  image_url: string
}

export function UpcomingRaces() {
  const [races, setRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRace, setSelectedRace] = useState<Race | null>(null)

  const fetchRaces = async () => {
    try {
      const { data, error } = await supabase
        .from('upcoming_races_a8b7c6d5')
        .select('*')
        .order('race_date', { ascending: true })
        .limit(10)

      if (error) throw error
      setRaces(data || [])
    } catch (error) {
      console.error('Error fetching races:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRaces()
  }, [])

  const handleRegistrationSuccess = () => {
    fetchRaces() // Refresh the races list to update participant count
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Upcoming Races</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {races.map((race) => (
          <div
            key={race.id}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={race.image_url}
                alt={race.race_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{race.race_name}</h3>
                <p className="text-white/90">{race.location}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Date: {format(new Date(race.race_date), 'PPP')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Distance: {race.distance}km
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${race.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {race.current_participants}/{race.max_participants} registered
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {race.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Registration deadline:{' '}
                  {format(new Date(race.registration_deadline), 'PPP')}
                </p>
                <button
                  onClick={() => setSelectedRace(race)}
                  className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={race.current_participants >= race.max_participants}
                >
                  {race.current_participants >= race.max_participants
                    ? 'Race Full'
                    : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRace && (
        <RegistrationModal
          race={selectedRace}
          isOpen={true}
          onClose={() => setSelectedRace(null)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  )
}
