import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function PaymentSuccessPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Payment Successful',
      description: 'Thank you for your purchase!',
    })
  }, [])

  return (
    <div className="container py-12">
      <Card className="max-w-lg mx-auto p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          <div className="pt-4">
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
