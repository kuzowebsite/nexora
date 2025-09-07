"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SurveyCard } from "@/components/survey-card"
import { surveysData } from "@/lib/survey-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const tabs = [
  { id: "all", label: "Бүгд" },
  { id: "surveys", label: "Судалгаа" },
  { id: "trainings", label: "Сурчилгаа" },
]

const trainings = [
  {
    id: "training-1",
    title: "JavaScript програмчлалын суурь",
    description: "Веб хөгжүүлэлтийн үндэс суурийг эзэмшээрэй",
    image: "/javascript-programming-course.png",
    duration: "4 долоо хоног",
    level: "Анхан шат",
    students: 1250,
    rating: 4.8,
    price: "Үнэгүй",
    category: "Програмчлал",
  },
  {
    id: "training-2",
    title: "UX/UI дизайны мастер класс",
    description: "Хэрэглэгчийн туршлагын дизайн сурах",
    image: "/ux-ui-masterclass.png",
    duration: "6 долоо хоног",
    level: "Дунд шат",
    students: 890,
    rating: 4.9,
    price: "₮150,000",
    category: "Дизайн",
  },
]

interface Survey {
  id: string
  title: string
  reward: number
  participants: number
  maxParticipants: number
  imageSrc: string
  creatorName: string
  creatorImageSrc: string
  isCompleted?: boolean
  description?: string
}

interface Training {
  id: string
  title: string
  duration: string
  level: "Анхан шат" | "Дунд шат" | "Ахисан шат"
  participants: number
  maxParticipants: number
  imageSrc: string
  creatorName: string
  creatorImageSrc: string
  isCompleted?: boolean
  description: string
  timeAgo: string
  mediaType: "image" | "video"
  reward: number
  videoUrl?: string
}

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    )
  }

  const filteredSurveys = surveysData.filter(
    (survey) =>
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTrainings = trainings.filter(
    (training) =>
      training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getDisplayItems = () => {
    switch (activeTab) {
      case "surveys":
        return { surveys: filteredSurveys, trainings: [] }
      case "trainings":
        return { surveys: [], trainings: filteredTrainings }
      default:
        return { surveys: filteredSurveys, trainings: filteredTrainings }
    }
  }

  const { surveys: displaySurveys, trainings: displayTrainings } = getDisplayItems()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-4 pb-0">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "secondary"}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-yellow-500 text-black hover:bg-yellow-600"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Хайх, шүүх</h2>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Нэр асвал шагналын тоогоор хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Clear Filters */}
        {(searchQuery || showFilters) && (
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setShowFilters(false)
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4 mr-1" />
              Шүүлтүүр цэвэрлэх
            </Button>
          </div>
        )}
      </div>

      {/* Surveys Section */}
      {(activeTab === "all" || activeTab === "surveys") && displaySurveys.length > 0 && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Судалгаа</h3>
            <Button variant="link" className="text-yellow-500 hover:text-yellow-400 p-0">
              Бүгдийг харах
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displaySurveys.slice(0, 6).map((survey) => (
              <SurveyCard
                key={survey.id}
                id={survey.id}
                title={survey.title}
                imageSrc={survey.imageSrc}
                reward={survey.reward}
                participants={survey.participants}
                maxParticipants={survey.maxParticipants}
                isCompleted={false}
                creatorName={survey.creatorName}
                creatorImageSrc={survey.creatorImageSrc}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trainings Section */}
      {(activeTab === "all" || activeTab === "trainings") && displayTrainings.length > 0 && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Сурчилгаа</h3>
            <Button variant="link" className="text-yellow-500 hover:text-yellow-400 p-0">
              Бүгдийг харах
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTrainings.map((training) => (
              <TrainingCard
                key={training.id}
                id={training.id}
                title={training.title}
                description={training.description}
                imageSrc={training.image}
                isCompleted={false}
                creatorName="Т. Эрдэнэ"
                creatorImageSrc="/images/male.avif"
                timeAgo="2 цаг өмнө"
                mediaType="image"
                reward={Number(training.price.replace(/[^0-9]/g, "")) || 500}
                videoUrl={undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {displaySurveys.length === 0 && displayTrainings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-2">Хайлтын үр дүн олдсонгүй</div>
          <div className="text-sm text-gray-500">Өөр түлхүүр үг ашиглан хайж үзээрэй</div>
        </div>
      )}
    </div>
  )
}

// Facebook-style Training Card Component with auto-play videos
function TrainingCard({
  id,
  title,
  description,
  imageSrc,
  isCompleted: initialCompleted,
  creatorName,
  creatorImageSrc,
  timeAgo,
  mediaType,
  reward,
  videoUrl,
}: {
  id: string
  title: string
  description: string
  imageSrc: string
  isCompleted?: boolean
  creatorName: string
  creatorImageSrc: string
  timeAgo: string
  mediaType: "image" | "video"
  reward: number
  videoUrl?: string
}) {
  const [showFullText, setShowFullText] = useState(false)
  const [countdown, setCountdown] = useState(20)
  const [isWatching, setIsWatching] = useState(false)
  const [isCompleted, setIsCompleted] = useState(initialCompleted || false)
  const [currentBalance, setCurrentBalance] = useState(15000)
  const [wasInterrupted, setWasInterrupted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const { toast } = useToast()

  // Truncate description to show "..." after certain length
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description

  // Clear countdown timer
  const clearCountdownTimer = () => {
    if (countdownTimerRef.current) {
      clearTimeout(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
  }

  // Safe video play with promise handling
  const safeVideoPlay = async () => {
    if (videoRef.current && mediaType === "video") {
      try {
        // Wait for any previous play promise to resolve
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {
            // Ignore errors from previous play attempts
          })
        }

        videoRef.current.currentTime = 0
        playPromiseRef.current = videoRef.current.play()
        await playPromiseRef.current
      } catch (error) {
        // Handle play errors gracefully
        console.log("Video play interrupted or failed:", error)
      }
    }
  }

  // Safe video pause with promise handling
  const safeVideoPause = async () => {
    if (videoRef.current && mediaType === "video") {
      try {
        // Wait for any pending play promise to resolve before pausing
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {
            // Ignore errors from play promise
          })
        }

        if (!videoRef.current.paused) {
          videoRef.current.pause()
        }
        videoRef.current.currentTime = 0
      } catch (error) {
        console.log("Video pause error:", error)
      }
    }
  }

  // Reset states when post becomes less visible
  const resetWatchingState = async () => {
    if (!isCompleted) {
      setIsWatching(false)
      setWasInterrupted(true)
      clearCountdownTimer()

      if (mediaType === "image") {
        setCountdown(20)
      } else if (mediaType === "video") {
        await safeVideoPause()
      }
    }
  }

  // Start watching when post becomes visible
  const startWatching = async () => {
    if (!isCompleted && !isWatching) {
      setIsWatching(true)
      setWasInterrupted(false)

      if (mediaType === "video") {
        await safeVideoPlay()
      }
    }
  }

  // Handle video ended
  const handleVideoEnded = () => {
    if (mediaType === "video" && !isCompleted && isWatching) {
      handleComplete()
    }
  }

  // Handle video seeking - prevent seeking
  const handleVideoSeeking = () => {
    if (videoRef.current && mediaType === "video") {
      // Reset to beginning to prevent seeking
      videoRef.current.currentTime = 0
    }
  }

  // Intersection Observer to detect visibility changes
  useEffect(() => {
    if (isCompleted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When 80% or more of the post is visible, start watching
          if (entry.intersectionRatio >= 0.8) {
            startWatching()
          }
          // When less than 80% is visible (20% or more is hidden), reset
          else if (entry.intersectionRatio < 0.8 && isWatching) {
            resetWatchingState()
          }
        })
      },
      {
        threshold: [0.8],
        rootMargin: "0px",
      },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      observer.disconnect()
      clearCountdownTimer()
      // Clean up any pending video promises
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {
          // Ignore cleanup errors
        })
      }
    }
  }, [isWatching, isCompleted, mediaType])

  // Countdown timer for images
  useEffect(() => {
    if (isWatching && mediaType === "image" && countdown > 0 && !isCompleted) {
      countdownTimerRef.current = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (isWatching && mediaType === "image" && countdown === 0 && !isCompleted) {
      handleComplete()
    }

    return () => clearCountdownTimer()
  }, [isWatching, countdown, mediaType, isCompleted])

  const handleComplete = () => {
    setIsCompleted(true)
    setCurrentBalance((prev) => prev + reward)
    clearCountdownTimer()
    toast({
      title: "Амжилттай!",
      description: `Та ${reward}₮ олж авлаа! Таны түрүүвчийн үлдэгдэл: ${currentBalance + reward}₮`,
    })
  }

  return (
    <Card
      ref={cardRef}
      className="w-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden"
    >
      {/* Post Header */}
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={creatorImageSrc || "/placeholder.svg?height=40&width=40&query=avatar"}
              alt={creatorName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{creatorName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Post Content */}
      <CardContent className="p-0">
        {/* Text Content */}
        <div className="px-4 pb-3">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h2>
          <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {showFullText ? (
              <span>
                {description}
                {description.length > 100 && (
                  <button
                    onClick={() => setShowFullText(false)}
                    className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                  >
                    Хураах
                  </button>
                )}
              </span>
            ) : (
              <span>
                {truncatedDescription}
                {description.length > 100 && (
                  <button
                    onClick={() => setShowFullText(true)}
                    className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                  >
                    Дэлгэрэнгүй
                  </button>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Post Image/Video */}
        <div className="relative w-full h-64">
          {mediaType === "image" ? (
            <>
              <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />

              {/* Countdown overlay for images */}
              {isWatching && !isCompleted && (
                <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-2 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{countdown}</div>
                  </div>
                </div>
              )}

              {/* Restart indicator for interrupted images */}
              {wasInterrupted && !isWatching && !isCompleted && (
                <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-xs">
                  Дахин эхлэх
                </div>
              )}
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                className="w-full h-full object-cover"
                controls={isWatching}
                onEnded={handleVideoEnded}
                onSeeking={handleVideoSeeking} // Prevent seeking
                controlsList="nodownload noseek" // Disable download and seeking
                onContextMenu={(e) => e.preventDefault()}
                muted
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/mp4" />
                Таны хөтөч видео дэмждэггүй байна.
              </video>

              {/* Restart indicator for interrupted videos */}
              {wasInterrupted && !isWatching && !isCompleted && (
                <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-xs">
                  Дахин эхлэх
                </div>
              )}
            </>
          )}

          {/* Completion indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">+{reward}₮</span>
            </div>
          )}

          {/* Reward indicator */}
          {!isCompleted && (
            <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              +{reward}₮
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
