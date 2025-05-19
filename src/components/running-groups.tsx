import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type RunningGroup = {
  id: string
  group_name: string
  description: string
  location: string
  preferred_distance: number
  preferred_pace: string
  meeting_time: string
  member_count: number
  max_members: number
  image_url: string
}

export function RunningGroups() {
  const { user, isSignedIn } = useUser()
  const { toast } = useToast()
  const [groups, setGroups] = useState<RunningGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [joiningGroup, setJoiningGroup] = useState<string | null>(null)

  useEffect(() => {
    fetchGroups()
  }, [])

  async function fetchGroups() {
    try {
      const { data, error } = await supabase
        .from('running_groups_f9e8d7c6')
        .select('*')
        .order('member_count', { ascending: false })

      if (error) throw error
      setGroups(data || [])
    } catch (error) {
      console.error('Error fetching groups:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load running groups. Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleJoinGroup(groupId: string) {
    if (!isSignedIn || !user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to join running groups.'
      })
      return
    }

    setJoiningGroup(groupId)

    try {
      // Check if already a member
      const { data: existingMembership } = await supabase
        .from('group_members_f9e8d7c6')
        .select('id')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single()

      if (existingMembership) {
        toast({
          variant: 'default',
          title: 'Already a Member',
          description: 'You are already a member of this group'
        })
        return
      }

      // Add member
      const { error: membershipError } = await supabase
        .from('group_members_f9e8d7c6')
        .insert({
          group_id: groupId,
          user_id: user.id,
        })

      if (membershipError) throw membershipError

      // Update member count
      const { error: updateError } = await supabase
        .from('running_groups_f9e8d7c6')
        .update({ member_count: groups.find(g => g.id === groupId)?.member_count + 1 })
        .eq('id', groupId)

      if (updateError) throw updateError

      toast({
        title: 'Success',
        description: 'You have successfully joined the group!'
      })

      // Refresh groups
      fetchGroups()
    } catch (error) {
      console.error('Error joining group:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to join group. Please try again.'
      })
    } finally {
      setJoiningGroup(null)
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
      <h2 className="text-3xl font-bold mb-8">Running Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={group.image_url}
                alt={group.group_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{group.group_name}</h3>
                <p className="text-white/90">{group.location}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {group.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Preferred Distance</p>
                  <p>{group.preferred_distance}km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preferred Pace</p>
                  <p>{group.preferred_pace}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Meeting Time</p>
                  <p>{group.meeting_time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Members</p>
                  <p>{group.member_count}/{group.max_members}</p>
                </div>
              </div>

              <Button
                onClick={() => handleJoinGroup(group.id)}
                disabled={joiningGroup === group.id || group.member_count >= group.max_members}
                className="w-full"
                variant={group.member_count >= group.max_members ? 'secondary' : 'default'}
              >
                {joiningGroup === group.id
                  ? 'Joining...'
                  : group.member_count >= group.max_members
                  ? 'Group Full'
                  : 'Join Group'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
