import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

type Plan = {
  id: number
  name: string
  price: number
  description: string
  features: string[]
  priceId: string
  type: 'subscription' | 'one-time'
}

type PaymentDialogProps = {
  open: boolean
  onClose: () => void
  selectedPlan?: Plan
}

export function PaymentDialog({ open, onClose, selectedPlan }: PaymentDialogProps) {
  const { user } = useUser()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!selectedPlan || !user) return

    setLoading(true)
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          priceId: selectedPlan.priceId,
          type: selectedPlan.type,
          userId: user.id,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Failed to create payment session')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to process payment. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPlan) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{selectedPlan.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <div className="text-right">
                <span className="text-xl font-bold">${selectedPlan.price}</span>
                {selectedPlan.type === 'subscription' && (
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                )}
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${selectedPlan.price}${selectedPlan.type === 'subscription' ? '/month' : ''}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
