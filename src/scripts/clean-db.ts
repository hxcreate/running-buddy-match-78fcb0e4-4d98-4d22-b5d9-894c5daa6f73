import { supabase } from '../lib/supabase'

async function cleanDatabase() {
  try {
    // Delete all records from participants table first (due to foreign key constraints)
    const { error: participantsError } = await supabase
      .from('activity_participants_e7d6c5b4')
      .delete()
      .neq('id', '') // This will match all records

    if (participantsError) {
      console.error('Error deleting participants:', participantsError)
      return
    }

    // Delete all records from activities table
    const { error: activitiesError } = await supabase
      .from('activities_e7d6c5b4')
      .delete()
      .neq('id', '') // This will match all records

    if (activitiesError) {
      console.error('Error deleting activities:', activitiesError)
      return
    }

    console.log('Database cleaned successfully')

    // Insert fresh sample data
    const { error: insertError } = await supabase
      .from('activities_e7d6c5b4')
      .insert([
        {
          id: 'act_sample1',
          title: 'Weekend Morning Run',
          description: 'Join us for a refreshing morning run around the lake. Perfect for intermediate runners looking to improve their endurance.',
          location: 'Central Park Lake',
          activity_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          distance: 8.00,
          pace_requirement: '5:30-6:00 min/km',
          creator_id: 'user_2wz8WuLexeFHGAwMF8Gaq8HouPa',
          current_participants: 1,
          max_participants: 50,
          status: 'active',
          image_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8'
        },
        {
          id: 'act_sample2',
          title: 'Hill Training Session',
          description: 'Challenging hill training session for experienced runners. We will focus on building strength and improving uphill technique.',
          location: 'Highland Park',
          activity_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          distance: 6.00,
          pace_requirement: '5:00-5:30 min/km',
          creator_id: 'user_2wz8WuLexeFHGAwMF8Gaq8HouPa',
          current_participants: 1,
          max_participants: 30,
          status: 'active',
          image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256'
        },
        {
          id: 'act_sample3',
          title: 'Easy Social Run',
          description: 'A casual, social run perfect for beginners and those looking to meet new running buddies. No pace requirements!',
          location: 'Riverside Park',
          activity_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          distance: 5.00,
          pace_requirement: 'All paces welcome',
          creator_id: 'user_2wz8WuLexeFHGAwMF8Gaq8HouPa',
          current_participants: 1,
          max_participants: 100,
          status: 'active',
          image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5'
        }
      ])

    if (insertError) {
      console.error('Error inserting sample data:', insertError)
      return
    }

    console.log('Sample data inserted successfully')
  } catch (error) {
    console.error('Error:', error)
  }
}

cleanDatabase()
