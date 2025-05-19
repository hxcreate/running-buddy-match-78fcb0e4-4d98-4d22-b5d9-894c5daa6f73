import { generate_chart } from '@/lib/chart'

export async function POST(req: Request) {
  try {
    const { data, config } = await req.json()

    const result = await generate_chart({
      userPrompt: config.userPrompt,
      chartType: config.chartType,
      chartTitle: config.chartTitle,
      dataStructure: config.dataStructure,
      chartDescription: config.chartDescription,
      stylePreferences: config.stylePreferences
    })

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error generating chart:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate chart'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
