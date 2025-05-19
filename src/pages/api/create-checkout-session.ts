import { payment } from '@/lib/payment'

export async function POST(req: Request) {
  try {
    const { priceId, planId, successUrl, cancelUrl } = await req.json()

    const result = await payment({
      provider: 'stripe',
      priceId,
      planId,
      type: 'subscription',
      successUrl,
      cancelUrl
    })

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to create checkout session'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
