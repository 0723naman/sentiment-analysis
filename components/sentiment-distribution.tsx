"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"

interface SentimentDistributionProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

export default function SentimentDistribution({ data }: SentimentDistributionProps) {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border bg-background p-2 shadow-md"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full" style={{ background: payload[0].payload.color }} />
                        <span className="text-sm font-medium">{payload[0].name}</span>
                      </div>
                      <div className="text-right text-sm font-medium">{payload[0].value}%</div>
                    </div>
                  </motion.div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

