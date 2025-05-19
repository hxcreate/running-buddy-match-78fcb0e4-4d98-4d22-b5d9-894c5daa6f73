import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { format } from 'date-fns'

type RaceRecord = {
  race_date: string
  finish_time: number
  distance: number
  pace: number
  race_name: string
}

type RacePerformanceChartProps = {
  data: RaceRecord[]
}

declare const Chart: any

export function RacePerformanceChart({ data }: RacePerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const sortedData = [...data].sort(
      (a, b) => new Date(a.race_date).getTime() - new Date(b.race_date).getTime()
    )

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedData.map((record) =>
          format(new Date(record.race_date), 'MMM d, yyyy')
        ),
        datasets: [
          {
            label: 'Pace (min/km)',
            data: sortedData.map((record) => record.pace),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Distance (km)',
            data: sortedData.map((record) => record.distance),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Race Performance Trends',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: 20
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || ''
                const value = context.parsed.y
                if (label.includes('Pace')) {
                  return `${label}: ${value.toFixed(2)} min/km`
                }
                return `${label}: ${value.toFixed(2)} km`
              }
            }
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Pace (min/km)'
            },
            grid: {
              borderDash: [2, 4]
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Distance (km)'
            },
            grid: {
              display: false
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <Card className="p-6">
      <canvas ref={chartRef} />
    </Card>
  )
}
