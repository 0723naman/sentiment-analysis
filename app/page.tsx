import type { Metadata } from "next"
import SentimentAnalyzer from "@/components/sentiment-analyzer"

export const metadata: Metadata = {
  title: "Instagram Sentiment Analyzer",
  description: "Analyze sentiment from Instagram post comments in real-time",
}

export default function Page() {
  return <SentimentAnalyzer />
}

