"use client"

import { Area, AreaChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SentimentOverTimeProps {
  data: {
    date: string
    positive: number
    neutral: number
    negative: number
  }[]
  showArea?: boolean
}

export default function SentimentOverTime({ data, showArea = false }: SentimentOverTimeProps) {
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
      className="h-[200px]"
    >
      {showArea ? (
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => {
                  const date = new Date(label)
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" })
                }}
                formatter={(value) => `${value}%`}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="positive"
            stroke="var(--color-positive)"
            fill="var(--color-positive)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stroke="var(--color-neutral)"
            fill="var(--color-neutral)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="negative"
            stroke="var(--color-negative)"
            fill="var(--color-negative)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      ) : (
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(label) => {
                  const date = new Date(label)
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit" })
                }}
                formatter={(value) => `${value}%`}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="var(--color-positive)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="var(--color-neutral)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="var(--color-negative)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      )}
    </ChartContainer>
  )
}

