import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { PaymentDialog } from './payment-dialog'

const plans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 9.99,
    description: 'Perfect for casual runners',
    features: [
      'Track up to 10 races per month',
      'Basic performance analytics',
      'Community access',
      'Email support'
    ],
    priceId: 'price_basic_monthly',
    type: 'subscription' as const
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: 19.99,
    description: 'For serious runners and athletes',
    features: [
      'Unlimited race tracking',
      'Advanced analytics and insights',
      'Priority support',
      'Training plans',
      'Group running features',
      'Custom race reports'
    ],
    priceId: 'price_pro_monthly',
    type: 'subscription' as const
  },
  {
    id: 3,
    name: 'Race Entry Package',
    price: 49.99,
    description: 'One-time payment for race entry',
    features: [
      'Single race entry',
      'Official race timing',
      'Race day support',
      'Finisher certificate',
      'Race photos',
      'Medal and t-shirt'
    ],
    priceId: 'price_race_entry',
    type: 'one-time' as const
  }
]

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setDialogOpen(true)
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your running goals. Whether you're a casual runner
          or a serious athlete, we have options for everyone.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.type === 'subscription' && (
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                )}
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-4"
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.type === 'subscription' ? 'Subscribe Now' : 'Purchase Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <PaymentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  )
}
