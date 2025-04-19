"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ThumbsUp, ThumbsDown, Minus, ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  username: string
  avatar: string
  content: string
  date: string
  sentiment: "positive" | "neutral" | "negative"
  sentimentScore: number
  likes: number
}

interface CommentAnalysisProps {
  comments: Comment[]
}

export default function CommentAnalysis({ comments }: CommentAnalysisProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedComment, setExpandedComment] = useState<string | null>(null)
  const [sentimentFilter, setSentimentFilter] = useState<string[]>(["positive", "neutral", "negative"])

  const toggleComment = (id: string) => {
    setExpandedComment(expandedComment === id ? null : id)
  }

  const toggleSentimentFilter = (sentiment: string) => {
    setSentimentFilter((prev) =>
      prev.includes(sentiment) ? prev.filter((s) => s !== sentiment) : [...prev, sentiment],
    )
  }

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSentiment = sentimentFilter.includes(comment.sentiment)
    return matchesSearch && matchesSentiment
  })

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      case "neutral":
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Positive
          </Badge>
        )
      case "negative":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Negative
          </Badge>
        )
      case "neutral":
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Neutral
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={sentimentFilter.includes("positive")}
              onCheckedChange={() => toggleSentimentFilter("positive")}
            >
              <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
              Positive
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sentimentFilter.includes("neutral")}
              onCheckedChange={() => toggleSentimentFilter("neutral")}
            >
              <Minus className="h-4 w-4 text-gray-500 mr-2" />
              Neutral
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sentimentFilter.includes("negative")}
              onCheckedChange={() => toggleSentimentFilter("negative")}
            >
              <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
              Negative
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredComments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-muted-foreground"
            >
              No comments match your search criteria
            </motion.div>
          ) : (
            filteredComments.map((comment) => (
              <motion.div
                key={comment.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar} alt={comment.username} />
                    <AvatarFallback>{comment.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">@{comment.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <p className={`text-sm ${expandedComment === comment.id ? "" : "line-clamp-2"}`}>
                      {comment.content}
                    </p>

                    {comment.content.length > 120 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => toggleComment(comment.id)}
                      >
                        {expandedComment === comment.id ? (
                          <span className="flex items-center gap-1">
                            <ChevronUp className="h-3 w-3" />
                            Show less
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <ChevronDown className="h-3 w-3" />
                            Show more
                          </span>
                        )}
                      </Button>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        {getSentimentIcon(comment.sentiment)}
                        <div className="text-sm">Score: {comment.sentimentScore.toFixed(1)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSentimentBadge(comment.sentiment)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Sentiment score</span>
                    <span>{comment.sentimentScore.toFixed(1)}/10</span>
                  </div>
                  <Progress
                    value={comment.sentimentScore * 10}
                    className="h-1.5 mt-1"
                    indicatorClassName={
                      comment.sentiment === "positive"
                        ? "bg-green-500"
                        : comment.sentiment === "negative"
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }
                  />
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

