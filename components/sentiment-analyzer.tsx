"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Instagram,
  Search,
  Loader2,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  BarChart3,
  PieChart,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

import SentimentOverTime from "@/components/sentiment-over-time"
import SentimentDistribution from "@/components/sentiment-distribution"
import CommentAnalysis from "@/components/comment-analysis"
import WordCloud from "@/components/word-cloud"
import { generateAnalysisFromUrl } from "@/lib/dummy-data"

export default function SentimentAnalyzer() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleAnalyze = async () => {
    if (!url) return

    setIsAnalyzing(true)
    setAnalysisError(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 300)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Validate URL (basic check)
      if (!url.includes("instagram.com")) {
        throw new Error("Please enter a valid Instagram post URL")
      }

      // Generate dummy data based on the URL
      const data = generateAnalysisFromUrl(url)
      setAnalysisData(data)

      // Complete progress
      setProgress(100)
      setTimeout(() => clearInterval(progressInterval), 200)
    } catch (error) {
      setAnalysisError((error as Error).message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze()
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Instagram className="h-6 w-6 text-pink-500" />
          <h1 className="text-lg font-semibold">Instagram Sentiment Analyzer</h1>
          <Badge variant="outline" className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
            LIVE
          </Badge>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8 max-w-6xl mx-auto w-full">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
          <CardHeader>
            <CardTitle className="text-2xl">Analyze Instagram Post Sentiment</CardTitle>
            <CardDescription>Enter an Instagram post URL to analyze the sentiment of comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="https://www.instagram.com/p/..."
                  className="pl-9"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Sentiment
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="mt-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Analyzing comments...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {analysisError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{analysisError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <AnimatePresence>
          {analysisData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
                <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span>Analysis Results</span>
                        <Badge variant="outline" className="ml-2">
                          {analysisData.totalComments} comments
                        </Badge>
                      </CardTitle>
                      <CardDescription>Post by @{analysisData.username}</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => handleAnalyze()} className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Refresh analysis</span>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b">
                    <motion.div
                      className="p-4 border-r flex flex-col items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-sm font-medium text-muted-foreground mb-1">Overall Sentiment</div>
                      <div className="text-3xl font-bold mb-1">{analysisData.overallSentiment}%</div>
                      <div
                        className={`text-sm px-2 py-1 rounded-full ${
                          analysisData.overallSentiment > 65
                            ? "bg-green-100 text-green-800"
                            : analysisData.overallSentiment > 45
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {analysisData.overallSentiment > 65
                          ? "Positive"
                          : analysisData.overallSentiment > 45
                            ? "Neutral"
                            : "Negative"}
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-4 border-r flex flex-col items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-sm font-medium text-muted-foreground mb-1">Engagement Rate</div>
                      <div className="text-3xl font-bold mb-1">{analysisData.engagementRate}%</div>
                      <div
                        className={`text-sm px-2 py-1 rounded-full ${
                          analysisData.engagementChange > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {analysisData.engagementChange > 0
                          ? `+${analysisData.engagementChange}% vs avg`
                          : `${analysisData.engagementChange}% vs avg`}
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-4 flex flex-col items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-sm font-medium text-muted-foreground mb-1">Response Time</div>
                      <div className="text-3xl font-bold mb-1">{analysisData.avgResponseTime}h</div>
                      <div className="text-sm text-muted-foreground">Average comment delay</div>
                    </motion.div>
                  </div>

                  <Tabs defaultValue="overview" className="p-4">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="overview" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="hidden sm:inline">Overview</span>
                      </TabsTrigger>
                      <TabsTrigger value="comments" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Comments</span>
                      </TabsTrigger>
                      <TabsTrigger value="trends" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="hidden sm:inline">Trends</span>
                      </TabsTrigger>
                      <TabsTrigger value="keywords" className="flex items-center gap-2">
                        <PieChart className="h-4 w-4" />
                        <span className="hidden sm:inline">Keywords</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Sentiment Distribution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <SentimentDistribution data={analysisData.sentimentDistribution} />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Sentiment Over Time</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <SentimentOverTime data={analysisData.sentimentOverTime} />
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Key Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysisData.insights.map((insight: string, i: number) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start gap-2"
                              >
                                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center text-xs">
                                  {i + 1}
                                </div>
                                <span>{insight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="comments">
                      <CommentAnalysis comments={analysisData.comments} />
                    </TabsContent>

                    <TabsContent value="trends">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Sentiment Trends</CardTitle>
                          <CardDescription>How sentiment has evolved over time for this post</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <SentimentOverTime data={analysisData.sentimentOverTime} showArea={true} />
                          </div>

                          <div className="mt-6 space-y-4">
                            <h4 className="font-medium">Trend Analysis</h4>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="rounded-lg border p-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium">Positive Trend</div>
                                    <div className="text-sm text-muted-foreground">{analysisData.trends.positive}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-lg border p-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />
                                  </div>
                                  <div>
                                    <div className="font-medium">Negative Trend</div>
                                    <div className="text-sm text-muted-foreground">{analysisData.trends.negative}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="keywords">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Keyword Analysis</CardTitle>
                          <CardDescription>Most common words and phrases in comments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center">
                            <WordCloud words={analysisData.keywords} />
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium mb-3">Top Keywords by Sentiment</h4>
                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="rounded-lg border p-3 bg-green-50 dark:bg-green-950/20">
                                <div className="font-medium text-green-700 dark:text-green-400 mb-2">Positive</div>
                                <div className="flex flex-wrap gap-2">
                                  {analysisData.keywordsBySentiment.positive.map((word: string, i: number) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    >
                                      {word}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-lg border p-3 bg-gray-50 dark:bg-gray-800/20">
                                <div className="font-medium text-gray-700 dark:text-gray-400 mb-2">Neutral</div>
                                <div className="flex flex-wrap gap-2">
                                  {analysisData.keywordsBySentiment.neutral.map((word: string, i: number) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                      {word}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-lg border p-3 bg-red-50 dark:bg-red-950/20">
                                <div className="font-medium text-red-700 dark:text-red-400 mb-2">Negative</div>
                                <div className="flex flex-wrap gap-2">
                                  {analysisData.keywordsBySentiment.negative.map((word: string, i: number) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    >
                                      {word}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 py-3 px-4">
                  <div className="text-sm text-muted-foreground">
                    Analysis completed in {analysisData.analysisTime} seconds • {new Date().toLocaleString()}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

