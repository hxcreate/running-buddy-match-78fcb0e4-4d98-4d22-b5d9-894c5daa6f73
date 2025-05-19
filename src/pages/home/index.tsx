import { UpcomingRaces } from '@/components/upcoming-races'
import { RunningGroups } from '@/components/running-groups'
import { Activities } from '@/components/activities'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Running Partner
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the community of runners, participate in exciting activities and marathons together.
            Connect with like-minded people and achieve your running goals.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      <Activities />
      <RunningGroups />
      <UpcomingRaces />
    </div>
  )
}
