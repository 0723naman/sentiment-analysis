"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Word {
  text: string
  value: number
  sentiment: "positive" | "neutral" | "negative"
}

interface WordCloudProps {
  words: Word[]
}

export default function WordCloud({ words }: WordCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Position words in a spiral pattern
  const positionWords = () => {
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const maxRadius = Math.min(centerX, centerY) - 20

    const sortedWords = [...words].sort((a, b) => b.value - a.value)
    const positions: Array<{ word: Word; x: number; y: number; size: number }> = []

    sortedWords.forEach((word, i) => {
      const angle = (i * 0.5) % (2 * Math.PI)
      const radius = 10 + (i * maxRadius) / sortedWords.length
      const size = 12 + (word.value / Math.max(...words.map((w) => w.value))) * 24

      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      positions.push({ word, x, y, size })
    })

    return positions
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 dark:text-green-400"
      case "negative":
        return "text-red-600 dark:text-red-400"
      case "neutral":
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <>
          {positionWords().map(({ word, x, y, size }, i) => (
            <motion.div
              key={word.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: hoveredWord === word.text || !hoveredWord ? 1 : 0.3,
                scale: 1,
                x,
                y,
              }}
              transition={{
                delay: i * 0.03,
                duration: 0.5,
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-colors
                ${getSentimentColor(word.sentiment)}
                ${hoveredWord === word.text ? "font-bold" : "font-medium"}
              `}
              style={{
                fontSize: `${size}px`,
                top: 0,
                left: 0,
              }}
              onMouseEnter={() => setHoveredWord(word.text)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              {word.text}
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}

