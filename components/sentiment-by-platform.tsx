"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SentimentByPlatformProps {
  data: {
    platform: string
    positive: number
    neutral: number
    negative: number
  }[]
}

export default function SentimentByPlatform({ data }: SentimentByPlatformProps) {
  return (
    <ChartContainer
      config={{
        positive: {
          label: "Positive",
          color: "hsl(142.1 76.2% 36.3%)",
        },
        neutral: {
          label: "Neutral",
          color: "hsl(217.2 32.6% 17.5%)",
        },
        negative: {
          label: "Negative",
          color: "hsl(0 84.2% 60.2%)",
        },
      }}
      className="h-[300px]"
    >
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <XAxis dataKey="platform" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value}%`} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value}%`} />} />
        <Bar dataKey="positive" fill="var(--color-positive)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="neutral" fill="var(--color-neutral)" />
        <Bar dataKey="negative" fill="var(--color-negative)" radius={[0, 0, 4, 4]} />
      </BarChart>
    </ChartContainer>
  )
}

