"use client"

import { useState } from "react"
import {
  CalendarIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  RefreshCwIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import SentimentOverTime from "@/components/sentiment-over-time"
import SentimentByPlatform from "@/components/sentiment-by-platform"
import SentimentDistribution from "@/components/sentiment-distribution"
import RecentMentions from "@/components/recent-mentions"
import { generateDummyData } from "@/lib/dummy-data"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [data, setData] = useState(() => generateDummyData(timeRange))

  const refreshData = () => {
    setData(generateDummyData(timeRange))
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    setData(generateDummyData(value))
  }

  const overallSentiment = data.overallSentiment
  const sentimentClass =
    overallSentiment > 65
      ? "bg-green-100 text-green-800"
      : overallSentiment > 45
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Social Media Sentiment Analysis</h1>
            <Badge variant="outline" className="ml-2">
              DEMO
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[120px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={refreshData}>
              <RefreshCwIcon className="h-4 w-4" />
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Sentiment</CardDescription>
                <CardTitle className="text-2xl">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${sentimentClass}`}
                  >
                    {overallSentiment}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {overallSentiment > 65
                    ? "Positive sentiment dominates"
                    : overallSentiment > 45
                      ? "Mixed sentiment detected"
                      : "Negative sentiment dominates"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Mentions</CardDescription>
                <CardTitle className="text-2xl">{data.totalMentions.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {data.mentionChange > 0
                    ? `+${data.mentionChange}% from previous period`
                    : `${data.mentionChange}% from previous period`}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Engagement Rate</CardDescription>
                <CardTitle className="text-2xl">{data.engagementRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {data.engagementChange > 0
                    ? `+${data.engagementChange}% from previous period`
                    : `${data.engagementChange}% from previous period`}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Top Platform</CardDescription>
                <CardTitle className="text-2xl flex items-center">
                  {data.topPlatform === "Twitter" && <TwitterIcon className="h-5 w-5 mr-2" />}
                  {data.topPlatform === "Facebook" && <FacebookIcon className="h-5 w-5 mr-2" />}
                  {data.topPlatform === "Instagram" && <InstagramIcon className="h-5 w-5 mr-2" />}
                  {data.topPlatform === "LinkedIn" && <LinkedinIcon className="h-5 w-5 mr-2" />}
                  {data.topPlatform}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{data.topPlatformPercentage}% of all mentions</div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="mentions">Mentions</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Sentiment Over Time</CardTitle>
                      <CardDescription>Tracking sentiment trends across the selected time period</CardDescription>
                    </div>
                    <LineChartIcon className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <SentimentOverTime data={data.sentimentOverTime} />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Sentiment Distribution</CardTitle>
                      <CardDescription>Breakdown of positive, neutral, and negative sentiment</CardDescription>
                    </div>
                    <PieChartIcon className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <SentimentDistribution data={data.sentimentDistribution} />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-1">
                    <CardTitle>Sentiment by Platform</CardTitle>
                    <CardDescription>Comparing sentiment across different social media platforms</CardDescription>
                  </div>
                  <BarChart3Icon className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <SentimentByPlatform data={data.sentimentByPlatform} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="platforms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Detailed analysis of sentiment across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-sm text-muted-foreground py-10">
                    Platform-specific analysis would be shown here in a real implementation
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mentions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Mentions</CardTitle>
                  <CardDescription>Latest social media posts with sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentMentions data={data.recentMentions} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

