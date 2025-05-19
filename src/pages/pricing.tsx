import { PricingPlans } from '@/components/payment/pricing-plans'

export default function PricingPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to enhance your running experience. Whether you're a
            casual runner or a competitive athlete, we have a plan that fits your needs.
          </p>
        </div>

        <PricingPlans />
      </div>
    </div>
  )
}
