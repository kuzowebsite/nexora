"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

const surveys: Survey[] = [
  {
    id: "1",
    title: "Фитнес аппликейшний судалгаа",
    reward: 800,
    participants: 30,
    maxParticipants: 50,
    imageSrc: "/fitness-app-survey.png",
    creatorName: "Т. Эрдэнэ",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Эрүүл мэндийн үйлчилгээний сэтгэл ханамжийн судалгаа",
    reward: 700,
    participants: 50,
    maxParticipants: 100,
    imageSrc: "/healthcare-satisfaction-survey.png",
    creatorName: "Г. Дорж",
    creatorImageSrc: "/images/female.avif",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Хоол хүнсний хэрэглээний судалгаа",
    reward: 600,
    participants: 25,
    maxParticipants: 40,
    imageSrc: "/food-consumption-survey.png",
    creatorName: "Б. Цэцэг",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
  },
  {
    id: "4",
    title: "Онлайн худалдааны хэрэглээний судалгаа",
    reward: 500,
    participants: 40,
    maxParticipants: 60,
    imageSrc: "/online-shopping-survey.png",
    creatorName: "А. Бат",
    creatorImageSrc: "/images/female.avif",
    isCompleted: false,
  },
  {
    id: "5",
    title: "Технологийн хэрэглээний судалгаа",
    reward: 900,
    participants: 15,
    maxParticipants: 30,
    imageSrc: "/fitness-app-survey.png",
    creatorName: "Н. Болд",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
  },
]

const trainings: Training[] = [
  {
    id: "1",
    title: "JavaScript програмчлалын үндэс",
    description: "JavaScript хэлний үндсэн ойлголтууд, синтакс, функцүүд болон объектуудыг заана.",
    duration: "4 долоо хоног",
    level: "Анхан шат",
    participants: 45,
    maxParticipants: 60,
    imageSrc: "/javascript-programming-course.png",
    creatorName: "Д. Батбаяр",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
    timeAgo: "2 цаг өмнө",
    mediaType: "image",
    reward: 500,
  },
  {
    id: "2",
    title: "Дижитал маркетингийн стратеги",
    description:
      "Дижитал маркетингийн кампайн зохион байгуулах, удирдах арга барилыг сурна... Facebook Ads, Google Ads болон SEO-ийн үндсийг эзэмшинэ.",
    duration: "6 долоо хоног",
    level: "Дунд шат",
    participants: 30,
    maxParticipants: 40,
    imageSrc: "/healthcare-satisfaction-survey.png",
    creatorName: "С. Оюунаа",
    creatorImageSrc: "/images/female.avif",
    isCompleted: false,
    timeAgo: "4 цаг өмнө",
    mediaType: "video",
    reward: 800,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "3",
    title: "UX/UI дизайны мастер класс",
    description:
      "Хэрэглэгчийн туршлага болон интерфейс дизайн хийх арга барилыг сурна... Figma, Adobe XD ашиглан жинхэнэ төсөл хийнэ.",
    duration: "8 долоо хоног",
    level: "Ахисан шат",
    participants: 20,
    maxParticipants: 25,
    imageSrc: "/ux-ui-masterclass.png",
    creatorName: "Ж. Энхбаяр",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
    timeAgo: "1 өдөр өмнө",
    mediaType: "image",
    reward: 600,
  },
  {
    id: "4",
    title: "Бизнес аналитикийн үндэс",
    description:
      "Бизнес аналитикийн үндсийг сурч, өгөгдөл дүн шинжилгээ хийх арга барилыг эзэмшинэ... Excel, Power BI ашиглан тайлан бэлтгэнэ.",
    duration: "5 долоо хоног",
    level: "Анхан шат",
    participants: 35,
    maxParticipants: 50,
    imageSrc: "/food-consumption-survey.png",
    creatorName: "М. Сайханаа",
    creatorImageSrc: "/images/female.avif",
    isCompleted: false,
    timeAgo: "3 өдөр өмнө",
    mediaType: "video",
    reward: 700,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "5",
    title: "React хөгжүүлэлтийн курс",
    description:
      "React library ашиглан орчин үеийн веб аппликейшн хөгжүүлэх арга барилыг сурна... Hooks, Context API болон бусад орчин үеийн технологиудыг эзэмшинэ.",
    duration: "10 долоо хоног",
    level: "Дунд шат",
    participants: 25,
    maxParticipants: 35,
    imageSrc: "/javascript-programming-course.png",
    creatorName: "Б. Мөнхбат",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
    timeAgo: "5 цаг өмнө",
    mediaType: "image",
    reward: 450,
  },
]

// Survey Card Component
function SurveyCard({
  id,
  imageSrc,
  title,
  reward,
  participants,
  maxParticipants,
  isCompleted,
  creatorName,
  creatorImageSrc,
}: {
  id: string
  imageSrc: string
  title: string
  reward: number
  participants: number
  maxParticipants: number
  isCompleted?: boolean
  creatorName: string
  creatorImageSrc: string
}) {
  const progress = (participants / maxParticipants) * 100

  return (
    <Link href={`/surveys/${id}`} className="block">
      <Card className="relative w-full aspect-square overflow-hidden rounded-lg bg-zinc-100 text-zinc-900 shadow-md hover:shadow-lg transition-shadow cursor-pointer dark:bg-zinc-800 dark:text-white">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
            <CheckCircle className="h-3 w-3" />
          </div>
        )}

        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Image
            src={creatorImageSrc || "/placeholder.svg?height=30&width=30&query=avatar"}
            alt={creatorName}
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <span>{creatorName}</span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <CardHeader className="p-0 pt-8">
            <CardTitle className="text-sm font-bold leading-tight">{title}</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Шагнал:</span>
              <span className="text-base font-bold text-green-600 dark:text-green-400">{reward}₮</span>
            </div>
            <div className="grid gap-0.5">
              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
                <span>
                  Бөглөсөн: {participants}/{maxParticipants}
                </span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-1.5 bg-zinc-300 dark:bg-zinc-700 [&>*]:bg-zinc-900 dark:[&>*]:bg-white"
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
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

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "not-completed">("all")
  const [contentType, setContentType] = useState<"all" | "surveys" | "trainings">("all")

  const applyFiltersToSurveys = (surveyList: typeof surveys) => {
    return surveyList.filter((survey) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const searchAsNumber = Number.parseFloat(searchTerm)

      const matchesSearchTerm =
        survey.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (!isNaN(searchAsNumber) && survey.reward === searchAsNumber)

      const matchesCompletionStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && survey.isCompleted) ||
        (filterStatus === "not-completed" && !survey.isCompleted)
      return matchesSearchTerm && matchesCompletionStatus
    })
  }

  const applyFiltersToTrainings = (trainingList: typeof trainings) => {
    return trainingList.filter((training) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()

      const matchesSearchTerm =
        training.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        training.duration.toLowerCase().includes(lowerCaseSearchTerm) ||
        training.description.toLowerCase().includes(lowerCaseSearchTerm)

      const matchesCompletionStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && training.isCompleted) ||
        (filterStatus === "not-completed" && !training.isCompleted)
      return matchesSearchTerm && matchesCompletionStatus
    })
  }

  const filteredSurveys = useMemo(() => applyFiltersToSurveys(surveys), [searchTerm, filterStatus])
  const filteredTrainings = useMemo(() => applyFiltersToTrainings(trainings), [searchTerm, filterStatus])

  const handleClearFilters = () => {
    setSearchTerm("")
    setFilterStatus("all")
    setContentType("all")
  }

  const showSurveys = contentType === "all" || contentType === "surveys"
  const showTrainings = contentType === "all" || contentType === "trainings"

  return (
    <div className="relative pb-16 px-4 md:px-6 pt-6">
      {/* Content Type Selection */}
      <section className="mb-6">
        <div className="flex gap-2">
          <Button
            variant={contentType === "all" ? "default" : "outline"}
            onClick={() => setContentType("all")}
            className={
              contentType === "all"
                ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-600"
                : "bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
            }
          >
            Бүгд
          </Button>
          <Button
            variant={contentType === "surveys" ? "default" : "outline"}
            onClick={() => setContentType("surveys")}
            className={
              contentType === "surveys"
                ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-600"
                : "bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
            }
          >
            Судалгаа
          </Button>
          <Button
            variant={contentType === "trainings" ? "default" : "outline"}
            onClick={() => setContentType("trainings")}
            className={
              contentType === "trainings"
                ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-600"
                : "bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
            }
          >
            Сурчилгаа
          </Button>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Хайх, шүүх</h2>
        <div className="flex gap-2 mb-6 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              type="text"
              placeholder="Нэр эсвэл шагналын тоогоор хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-800 shadow-lg">
              <DropdownMenuLabel>Төлөв</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={filterStatus === "all"} onCheckedChange={() => setFilterStatus("all")}>
                Бүгд
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "completed"}
                onCheckedChange={() => setFilterStatus("completed")}
              >
                Дууссан
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "not-completed"}
                onCheckedChange={() => setFilterStatus("not-completed")}
              >
                Дуусаагүй
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {(searchTerm !== "" || filterStatus !== "all" || contentType !== "all") && (
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <X className="h-4 w-4 mr-2" /> Шүүлтүүрийг цэвэрлэх
          </Button>
        )}
      </section>

      {/* Surveys Section */}
      {showSurveys && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Судалгаа</h2>
            <Link href="/surveys" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
              Бүгдийг харах
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSurveys.length > 0 ? (
              filteredSurveys.map((survey) => (
                <SurveyCard
                  key={survey.id}
                  id={survey.id}
                  title={survey.title}
                  imageSrc={survey.imageSrc}
                  reward={survey.reward}
                  participants={survey.participants}
                  maxParticipants={survey.maxParticipants}
                  isCompleted={survey.isCompleted}
                  creatorName={survey.creatorName}
                  creatorImageSrc={survey.creatorImageSrc}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-zinc-600 dark:text-zinc-400 py-8">
                Хайлт болон шүүлтүүрт тохирох судалгаа олдсонгүй.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Training Section - Facebook Style with Auto-play Videos */}
      {showTrainings && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Сурчилгаа</h2>
            <Link href="/trainings" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
              Бүгдийг харах
            </Link>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {filteredTrainings.length > 0 ? (
              filteredTrainings.map((training) => (
                <TrainingCard
                  key={training.id}
                  id={training.id}
                  title={training.title}
                  description={training.description}
                  imageSrc={training.imageSrc}
                  isCompleted={training.isCompleted}
                  creatorName={training.creatorName}
                  creatorImageSrc={training.creatorImageSrc}
                  timeAgo={training.timeAgo}
                  mediaType={training.mediaType}
                  reward={training.reward}
                  videoUrl={training.videoUrl}
                />
              ))
            ) : (
              <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
                Хайлт болон шүүлтүүрт тохирох сурчилгаа олдсонгүй.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
