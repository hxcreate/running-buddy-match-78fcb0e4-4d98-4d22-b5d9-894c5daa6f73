import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function PaymentCancelPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    toast({
      variant: 'destructive',
      title: 'Payment Cancelled',
      description: 'Your payment was cancelled. No charges were made.',
    })
  }, [])

  return (
    <div className="container py-12">
      <Card className="max-w-lg mx-auto p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was cancelled and no charges were made to your account.
            Feel free to try again when you're ready.
          </p>
          <div className="pt-4 space-y-2">
            <Button
              onClick={() => navigate('/pricing')}
              className="w-full"
              variant="outline"
            >
              Return to Plans
            </Button>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
