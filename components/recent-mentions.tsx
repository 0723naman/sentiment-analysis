"use client"

import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MinusIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Mention {
  id: string
  platform: string
  username: string
  avatar: string
  content: string
  date: string
  sentiment: "positive" | "neutral" | "negative"
  sentimentScore: number
}

interface RecentMentionsProps {
  data: Mention[]
}

export default function RecentMentions({ data }: RecentMentionsProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Twitter":
        return <TwitterIcon className="h-4 w-4" />
      case "Facebook":
        return <FacebookIcon className="h-4 w-4" />
      case "Instagram":
        return <InstagramIcon className="h-4 w-4" />
      case "LinkedIn":
        return <LinkedinIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUpIcon className="h-4 w-4 text-green-500" />
      case "negative":
        return <ThumbsDownIcon className="h-4 w-4 text-red-500" />
      case "neutral":
        return <MinusIcon className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Positive
          </Badge>
        )
      case "negative":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Negative
          </Badge>
        )
      case "neutral":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Neutral
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {data.map((mention) => (
        <div key={mention.id} className="flex items-start space-x-4 rounded-lg border p-4">
          <Avatar>
            <AvatarImage src={mention.avatar} alt={mention.username} />
            <AvatarFallback>{mention.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{mention.username}</span>
                <Badge variant="outline" className="flex items-center space-x-1">
                  {getPlatformIcon(mention.platform)}
                  <span>{mention.platform}</span>
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(mention.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm">{mention.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getSentimentIcon(mention.sentiment)}
                <span className="text-sm">Score: {mention.sentimentScore.toFixed(1)}</span>
              </div>
              {getSentimentBadge(mention.sentiment)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

