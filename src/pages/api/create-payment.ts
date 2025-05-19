import { payment } from '@/lib/payment'

export async function POST(req: Request) {
  try {
    const { planId, priceId, type, userId, successUrl, cancelUrl } = await req.json()

    const result = await payment({
      provider: 'stripe',
      planId,
      priceId,
      type,
      successUrl,
      cancelUrl
    })

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to create payment session'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
