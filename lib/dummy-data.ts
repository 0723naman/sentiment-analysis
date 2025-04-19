// Types for our dummy data
export interface SentimentData {
  username: string
  postUrl: string
  totalComments: number
  overallSentiment: number
  engagementRate: number
  engagementChange: number
  avgResponseTime: number
  analysisTime: number
  sentimentOverTime: {
    date: string
    positive: number
    neutral: number
    negative: number
  }[]
  sentimentDistribution: {
    name: string
    value: number
    color: string
  }[]
  comments: {
    id: string
    username: string
    avatar: string
    content: string
    date: string
    sentiment: "positive" | "neutral" | "negative"
    sentimentScore: number
    likes: number
  }[]
  insights: string[]
  keywords: {
    text: string
    value: number
    sentiment: "positive" | "neutral" | "negative"
  }[]
  keywordsBySentiment: {
    positive: string[]
    neutral: string[]
    negative: string[]
  }
  trends: {
    positive: string
    negative: string
  }
  totalMentions: number
  mentionChange: number
  topPlatform: string
  topPlatformPercentage: number
  sentimentByPlatform: {
    platform: string
    positive: number
    neutral: number
    negative: number
  }[]
  recentMentions: {
    id: string
    platform: string
    username: string
    avatar: string
    content: string
    date: string
    sentiment: "positive" | "neutral" | "negative"
    sentimentScore: number
  }[]
}

// Helper function to generate random number within a range
const randomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to generate random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

// Extract username from Instagram URL
const extractUsername = (url: string): string => {
  // This is a very simplified extraction - in reality would need more robust parsing
  const parts = url.split("/")
  // Try to find username in URL structure
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "instagram.com" && i + 1 < parts.length) {
      if (parts[i + 1] !== "p") {
        return parts[i + 1]
      }
    }
  }
  // If we can't extract, return some popular accounts
  const popularAccounts = ["natgeo", "instagram", "nike", "arianagrande", "beyonce", "cristiano"]
  return popularAccounts[Math.floor(Math.random() * popularAccounts.length)]
}

// Generate random comments
const generateComments = (count: number) => {
  const usernames = [
    "user123",
    "social_butterfly",
    "tech_enthusiast",
    "coffee_lover",
    "travel_addict",
    "fitness_guru",
    "foodie_central",
    "music_fan",
    "book_worm",
    "movie_buff",
    "nature_explorer",
    "art_appreciator",
  ]

  const positiveContent = [
    "I absolutely love this! 😍 The colors are amazing and the composition is perfect.",
    "This is so inspiring! Keep up the great work! 👏",
    "Wow, this is incredible! You're so talented! ✨",
    "This made my day! Thank you for sharing such beautiful content! 💖",
    "I can't get enough of your posts! Always brightens my feed! 🌟",
    "This is exactly what I needed to see today. So uplifting! 🙌",
    "Your creativity never ceases to amaze me! Fantastic work! 👌",
    "This is pure art! You have such a unique perspective! 🎨",
    "I've been following you for years and you never disappoint! 💯",
    "This deserves way more likes! Absolutely stunning! ⭐",
  ]

  const neutralContent = [
    "Interesting perspective. Makes me think.",
    "I see what you're going for here. Nice concept.",
    "This reminds me of something I saw recently.",
    "The lighting is good in this one.",
    "I've been meaning to try something like this.",
    "This is different from your usual style.",
    "How long did this take you to create?",
    "What equipment did you use for this?",
    "Is this a new series you're working on?",
    "The details are quite intricate here.",
  ]

  const negativeContent = [
    "I don't really get the point of this. 🤔",
    "This seems a bit overprocessed for my taste.",
    "I preferred your earlier work, to be honest.",
    "The colors feel a bit off in this one.",
    "This concept has been done so many times before.",
    "I expected something more original from you.",
    "The quality seems lower than your usual posts.",
    "This feels rushed compared to your other work.",
    "I'm not sure this is your best effort.",
    "The composition is a bit awkward here.",
  ]

  const comments = []

  for (let i = 0; i < count; i++) {
    const sentimentType = Math.random() < 0.6 ? "positive" : Math.random() < 0.7 ? "neutral" : "negative"

    let content = ""
    let sentimentScore = 0

    switch (sentimentType) {
      case "positive":
        content = positiveContent[randomInRange(0, positiveContent.length - 1)]
        sentimentScore = randomInRange(70, 95) / 10
        break
      case "neutral":
        content = neutralContent[randomInRange(0, neutralContent.length - 1)]
        sentimentScore = randomInRange(40, 60) / 10
        break
      case "negative":
        content = negativeContent[randomInRange(0, negativeContent.length - 1)]
        sentimentScore = randomInRange(10, 35) / 10
        break
    }

    const username = usernames[randomInRange(0, usernames.length - 1)]
    const date = randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date())

    comments.push({
      id: `comment-${i}`,
      username,
      avatar: `/placeholder.svg?height=40&width=40`,
      content,
      date,
      sentiment: sentimentType,
      sentimentScore,
      likes: randomInRange(0, 50),
    })
  }

  // Sort by date (newest first)
  return comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate sentiment over time data
const generateSentimentOverTime = (timeRange: string) => {
  const data = []
  let days = 7
  if (timeRange === "24h") {
    days = 1
  } else if (timeRange === "30d") {
    days = 30
  } else if (timeRange === "90d") {
    days = 90
  }
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(now.getDate() - i)

    // Generate random sentiment percentages that sum to 100
    const positive = randomInRange(20, 60)
    const negative = randomInRange(5, 30)
    const neutral = 100 - positive - negative

    data.push({
      date: date.toISOString(),
      positive,
      neutral,
      negative,
    })
  }

  return data
}

// Generate keywords for word cloud
const generateKeywords = () => {
  const positiveWords = [
    "amazing",
    "beautiful",
    "awesome",
    "love",
    "great",
    "perfect",
    "stunning",
    "incredible",
    "excellent",
    "fantastic",
    "wonderful",
    "brilliant",
    "superb",
    "outstanding",
    "fabulous",
  ]

  const neutralWords = [
    "interesting",
    "okay",
    "decent",
    "fine",
    "alright",
    "neutral",
    "average",
    "standard",
    "typical",
    "common",
    "regular",
    "normal",
    "moderate",
    "fair",
    "reasonable",
  ]

  const negativeWords = [
    "disappointing",
    "overrated",
    "mediocre",
    "boring",
    "basic",
    "unoriginal",
    "repetitive",
    "ordinary",
    "dull",
    "uninspired",
    "bland",
    "forgettable",
    "underwhelming",
    "predictable",
    "meh",
  ]

  const keywords = []

  // Add positive keywords
  for (let i = 0; i < positiveWords.length; i++) {
    if (Math.random() < 0.7) {
      // Only include some words
      keywords.push({
        text: positiveWords[i],
        value: randomInRange(5, 30),
        sentiment: "positive" as const,
      })
    }
  }

  // Add neutral keywords
  for (let i = 0; i < neutralWords.length; i++) {
    if (Math.random() < 0.6) {
      // Only include some words
      keywords.push({
        text: neutralWords[i],
        value: randomInRange(3, 20),
        sentiment: "neutral" as const,
      })
    }
  }

  // Add negative keywords
  for (let i = 0; i < negativeWords.length; i++) {
    if (Math.random() < 0.5) {
      // Only include some words
      keywords.push({
        text: negativeWords[i],
        value: randomInRange(2, 15),
        sentiment: "negative" as const,
      })
    }
  }

  return keywords
}

// Generate insights based on the data
const generateInsights = (sentimentData: any) => {
  const insights = [
    `${sentimentData.overallSentiment}% of comments express positive sentiment, indicating good audience reception.`,
    `The engagement rate of ${sentimentData.engagementRate}% is ${sentimentData.engagementChange > 0 ? "above" : "below"} your average.`,
    `Most comments are received within the first ${sentimentData.avgResponseTime} hours of posting.`,
    `The most common positive keywords are "${sentimentData.keywordsBySentiment.positive.slice(0, 3).join('", "')}"`,
    `Consider responding to negative comments that mention "${sentimentData.keywordsBySentiment.negative[0]}" to address concerns.`,
  ]

  return insights
}

// Generate keywords by sentiment
const generateKeywordsBySentiment = (keywords: any[]) => {
  const positive = keywords
    .filter((k) => k.sentiment === "positive")
    .sort((a, b) => b.value - a.value)
    .map((k) => k.text)
    .slice(0, 5)

  const neutral = keywords
    .filter((k) => k.sentiment === "neutral")
    .sort((a, b) => b.value - a.value)
    .map((k) => k.text)
    .slice(0, 5)

  const negative = keywords
    .filter((k) => k.sentiment === "negative")
    .sort((a, b) => b.value - a.value)
    .map((k) => k.text)
    .slice(0, 5)

  return { positive, neutral, negative }
}

// Generate trends analysis
const generateTrends = () => {
  const positiveTrends = [
    "Comments are becoming more positive over time",
    "Engagement is increasing with each new post",
    "Positive sentiment has grown by 12% this week",
    "Your audience responds well to your recent content style",
    "Morning posts receive more positive engagement",
  ]

  const negativeTrends = [
    "Some recurring criticism about editing style",
    "Slight decrease in engagement compared to last month",
    "Weekend posts receive less interaction",
    "Some followers mention content repetition",
    "Video content receives more mixed reactions than photos",
  ]

  return {
    positive: positiveTrends[randomInRange(0, positiveTrends.length - 1)],
    negative: negativeTrends[randomInRange(0, negativeTrends.length - 1)],
  }
}

const generateSentimentByPlatform = () => {
  const platforms = ["Twitter", "Facebook", "Instagram", "LinkedIn"]
  const data = platforms.map((platform) => ({
    platform,
    positive: randomInRange(30, 70),
    neutral: randomInRange(10, 40),
    negative: randomInRange(5, 25),
  }))
  return data
}

const generateRecentMentions = () => {
  const platforms = ["Twitter", "Facebook", "Instagram", "LinkedIn"]
  const mentions = []
  for (let i = 0; i < 5; i++) {
    const platform = platforms[randomInRange(0, platforms.length - 1)]
    const sentiment = ["positive", "neutral", "negative"][randomInRange(0, 2)]
    mentions.push({
      id: `mention-${i}`,
      platform,
      username: `user${randomInRange(100, 999)}`,
      avatar: `/placeholder.svg?height=40&width=40`,
      content: `This is a sample mention on ${platform} with a ${sentiment} sentiment.`,
      date: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
      sentiment: sentiment as "positive" | "neutral" | "negative",
      sentimentScore: randomInRange(1, 10),
    })
  }
  return mentions
}

// Generate analysis from Instagram URL
export const generateAnalysisFromUrl = (url: string): SentimentData => {
  // Extract username from URL (simplified)
  const username = extractUsername(url)

  // Generate random overall sentiment (0-100)
  const overallSentiment = randomInRange(50, 85)

  // Generate random total comments
  const totalComments = randomInRange(20, 150)

  // Generate random engagement rate
  const engagementRate = randomInRange(3, 12)

  // Generate random engagement change percentage
  const engagementChange = randomInRange(-5, 15)

  // Generate random average response time
  const avgResponseTime = randomInRange(1, 24)

  // Generate random analysis time (seconds)
  const analysisTime = (randomInRange(15, 45) / 10).toFixed(1)

  // Generate sentiment over time data
  const sentimentOverTime = generateSentimentOverTime("7d")

  // Generate sentiment distribution data
  const positivePercentage = overallSentiment
  const negativePercentage = randomInRange(5, 20)
  const neutralPercentage = 100 - positivePercentage - negativePercentage

  const sentimentDistribution = [
    {
      name: "Positive",
      value: positivePercentage,
      color: "hsl(142.1 76.2% 36.3%)",
    },
    {
      name: "Neutral",
      value: neutralPercentage,
      color: "hsl(217.2 32.6% 17.5%)",
    },
    {
      name: "Negative",
      value: negativePercentage,
      color: "hsl(0 84.2% 60.2%)",
    },
  ]

  // Generate comments
  const comments = generateComments(totalComments)

  // Generate keywords
  const keywords = generateKeywords()

  // Generate keywords by sentiment
  const keywordsBySentiment = generateKeywordsBySentiment(keywords)

  // Generate trends
  const trends = generateTrends()

  // Generate insights
  const insights = generateInsights({
    overallSentiment,
    engagementRate,
    engagementChange,
    avgResponseTime,
    keywordsBySentiment,
  })

  return {
    username,
    postUrl: url,
    totalComments,
    overallSentiment,
    engagementRate,
    engagementChange,
    avgResponseTime,
    analysisTime: Number.parseFloat(analysisTime),
    sentimentOverTime,
    sentimentDistribution,
    comments,
    insights,
    keywords,
    keywordsBySentiment,
    trends,
  }
}

export const generateDummyData = (timeRange: string): any => {
  const overallSentiment = randomInRange(50, 85)
  const totalMentions = randomInRange(100, 1000)
  const mentionChange = randomInRange(-10, 20)
  const engagementRate = randomInRange(1, 10)
  const engagementChange = randomInRange(-5, 5)
  const topPlatform = ["Twitter", "Facebook", "Instagram", "LinkedIn"][randomInRange(0, 3)]
  const topPlatformPercentage = randomInRange(30, 70)
  const sentimentOverTime = generateSentimentOverTime(timeRange)
  const sentimentByPlatform = generateSentimentByPlatform()
  const sentimentDistribution = [
    { name: "Positive", value: randomInRange(30, 70), color: "hsl(142.1 76.2% 36.3%)" },
    { name: "Neutral", value: randomInRange(10, 40), color: "hsl(217.2 32.6% 17.5%)" },
    { name: "Negative", value: randomInRange(5, 25), color: "hsl(0 84.2% 60.2%)" },
  ]
  const recentMentions = generateRecentMentions()

  return {
    overallSentiment,
    totalMentions,
    mentionChange,
    engagementRate,
    engagementChange,
    topPlatform,
    topPlatformPercentage,
    sentimentOverTime,
    sentimentByPlatform,
    sentimentDistribution,
    recentMentions,
  }
}

