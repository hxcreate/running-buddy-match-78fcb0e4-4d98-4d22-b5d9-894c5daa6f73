import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

type Activity = {
  id: string
  title: string
  description: string
  location: string
  activity_date: string
  distance: number
  pace_requirement: string
  current_participants: number
  max_participants: number
  image_url: string
}

export function Activities() {
  const { user, isSignedIn } = useUser()
  const { toast } = useToast()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [joiningActivity, setJoiningActivity] = useState<string | null>(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  async function fetchActivities() {
    try {
      const { data, error } = await supabase
        .from('activities_e7d6c5b4')
        .select('*')
        .order('activity_date', { ascending: true })
        .gte('activity_date', new Date().toISOString())

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load activities. Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleJoinActivity(activityId: string) {
    if (!isSignedIn || !user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to join activities.'
      })
      return
    }

    setJoiningActivity(activityId)

    try {
      // Check if already a participant
      const { data: existingParticipation } = await supabase
        .from('activity_participants_e7d6c5b4')
        .select('id')
        .eq('activity_id', activityId)
        .eq('user_id', user.id)
        .single()

      if (existingParticipation) {
        toast({
          variant: 'default',
          title: 'Already Joined',
          description: 'You are already participating in this activity'
        })
        return
      }

      // Get current activity data
      const { data: currentActivity } = await supabase
        .from('activities_e7d6c5b4')
        .select('current_participants, max_participants')
        .eq('id', activityId)
        .single()

      if (!currentActivity) {
        throw new Error('Activity not found')
      }

      if (currentActivity.current_participants >= currentActivity.max_participants) {
        toast({
          variant: 'destructive',
          title: 'Activity Full',
          description: 'Sorry, this activity is already full'
        })
        return
      }

      // Generate a unique ID for the participation record
      const participationId = `part_${Math.random().toString(36).substring(2)}`

      // Add participant
      const { error: participationError } = await supabase
        .from('activity_participants_e7d6c5b4')
        .insert({
          id: participationId,
          activity_id: activityId,
          user_id: user.id,
        })

      if (participationError) throw participationError

      // Update participant count
      const { error: updateError } = await supabase
        .from('activities_e7d6c5b4')
        .update({ 
          current_participants: currentActivity.current_participants + 1 
        })
        .eq('id', activityId)

      if (updateError) throw updateError

      toast({
        title: 'Success',
        description: 'You have successfully joined the activity!'
      })

      // Refresh activities
      fetchActivities()
    } catch (error) {
      console.error('Error joining activity:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to join activity. Please try again.'
      })
    } finally {
      setJoiningActivity(null)
    }
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
      <h2 className="text-3xl font-bold mb-8">Upcoming Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={activity.image_url}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{activity.title}</h3>
                <p className="text-white/90">{activity.location}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date & Time</p>
                  <p>{format(new Date(activity.activity_date), 'PPp')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Distance</p>
                  <p>{activity.distance}km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pace</p>
                  <p>{activity.pace_requirement}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Participants</p>
                  <p>{activity.current_participants}/{activity.max_participants}</p>
                </div>
              </div>

              <Button
                onClick={() => handleJoinActivity(activity.id)}
                disabled={joiningActivity === activity.id || activity.current_participants >= activity.max_participants}
                className="w-full"
                variant={activity.current_participants >= activity.max_participants ? 'secondary' : 'default'}
              >
                {joiningActivity === activity.id
                  ? 'Joining...'
                  : activity.current_participants >= activity.max_participants
                  ? 'Activity Full'
                  : 'Join Activity'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
