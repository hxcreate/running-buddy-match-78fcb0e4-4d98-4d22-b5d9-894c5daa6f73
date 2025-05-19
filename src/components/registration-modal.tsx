import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

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
}

type RegistrationModalProps = {
  race: Race
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function RegistrationModal({ race, isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const { user, isSignedIn } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setError('')
      setLoading(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleRegistration = async () => {
    if (!isSignedIn || !user) {
      setError('Please sign in to register for the race')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Check if user is already registered
      const { data: existingRegistration } = await supabase
        .from('race_registrations_b7c8d9e0')
        .select('id')
        .eq('race_id', race.id)
        .eq('user_id', user.id)
        .single()

      if (existingRegistration) {
        setError('You are already registered for this race')
        return
      }

      // Check if race is full
      if (race.current_participants >= race.max_participants) {
        setError('This race is already full')
        return
      }

      // Create registration
      const { error: registrationError } = await supabase
        .from('race_registrations_b7c8d9e0')
        .insert({
          race_id: race.id,
          user_id: user.id,
        })

      if (registrationError) throw registrationError

      // Update participant count
      const { error: updateError } = await supabase
        .from('upcoming_races_a8b7c6d5')
        .update({ current_participants: race.current_participants + 1 })
        .eq('id', race.id)

      if (updateError) throw updateError

      onSuccess()
      onClose()
    } catch (err) {
      console.error('Registration error:', err)
      setError('Failed to register for the race. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
        <div className="bg-card border rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Race Registration</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-lg">{race.race_name}</h3>
              <p className="text-muted-foreground">{race.location}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p>{format(new Date(race.race_date), 'PPP')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Distance</p>
                <p>{race.distance}km</p>
              </div>
              <div>
                <p className="text-muted-foreground">Registration Fee</p>
                <p>${race.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Available Spots</p>
                <p>{race.max_participants - race.current_participants} remaining</p>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border hover:bg-accent transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleRegistration}
              disabled={loading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Confirm Registration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
