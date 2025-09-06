"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Mock training data - in real app this would come from API
const trainingData = {
  "1": {
    id: "1",
    title: "JavaScript програмчлалын үндэс",
    description: `JavaScript хэлний үндсийг сурч, веб хөгжүүлэлтийн анхны алхмуудыг хийнэ үү. 

Энэхүү курс нь JavaScript-ийн үндсэн ойлголтууд, синтакс, функцүүд болон объектуудыг заана. Та энэ курсыг дуусгасны дараа өөрийн веб хуудас бүтээж чадах болно.

Курсын агуулга:
• JavaScript-ийн үндсэн синтакс
• Хувьсагч болон өгөгдлийн төрөл
• Функцүүд болон объектууд
• DOM манипуляци
• Event handling
• Асинхрон програмчлал

Энэ курс нь анхан шатны түвшинд зориулагдсан бөгөөд програмчлалын өмнөх туршлага шаардлагагүй.`,
    duration: "4 долоо хоног",
    level: "Анхан шат",
    participants: 45,
    maxParticipants: 60,
    imageSrc: "/javascript-programming-course.png",
    creatorName: "Д. Батбаяр",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
    mediaType: "image" as const,
    reward: 500,
    modules: [
      { title: "JavaScript-ийн танилцуулга", duration: "30 мин", completed: false },
      { title: "Хувьсагч болон өгөгдлийн төрөл", duration: "45 мин", completed: false },
      { title: "Функцүүд", duration: "60 мин", completed: false },
      { title: "Объектууд болон массивууд", duration: "50 мин", completed: false },
      { title: "DOM манипуляци", duration: "40 мин", completed: false },
    ],
  },
  "2": {
    id: "2",
    title: "Дижитал маркетингийн стратеги",
    description: `Дижитал маркетингийн кампайн зохион байгуулах, удирдах арга барилыг сурна.

Facebook Ads, Google Ads болон SEO-ийн үндсийг эзэмшинэ. Энэ курс нь таныг дижитал маркетингийн мэргэжилтэн болгоход туслах болно.

Курсын агуулга:
• Дижитал маркетингийн үндэс
• Facebook Ads кампайн
• Google Ads удирдлага
• SEO оптимизаци
• Контент маркетинг
• Аналитик болон тайлагналт

Энэ курс нь дунд шатны түвшинд зориулагдсан бөгөөд маркетингийн үндсэн мэдлэг шаардлагатай.`,
    duration: "6 долоо хоног",
    level: "Дунд шат",
    participants: 30,
    maxParticipants: 40,
    imageSrc: "/healthcare-satisfaction-survey.png",
    creatorName: "С. Оюунаа",
    creatorImageSrc: "/images/female.avif",
    isCompleted: false,
    mediaType: "video" as const,
    reward: 800,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    modules: [
      { title: "Дижитал маркетингийн үндэс", duration: "40 мин", completed: false },
      { title: "Facebook Ads кампайн", duration: "60 мин", completed: false },
      { title: "Google Ads удирдлага", duration: "55 мин", completed: false },
      { title: "SEO оптимизаци", duration: "50 мин", completed: false },
      { title: "Контент маркетинг", duration: "45 мин", completed: false },
    ],
  },
  "3": {
    id: "3",
    title: "UX/UI дизайны мастер класс",
    description: `Хэрэглэгчийн туршлага болон интерфейс дизайн хийх арга барилыг сурна.

Figma, Adobe XD ашиглан жинхэнэ төсөл хийнэ. Энэ курс нь таныг мэргэжлийн UX/UI дизайнер болгоход туслах болно.

Курсын агуулга:
• UX дизайны үндэс
• UI дизайны зарчмууд
• Figma ашиглах арга
• Wireframe болон prototype
• Хэрэглэгчийн судалгаа
• Дизайн системийн бүтээл

Энэ курс нь ахисан шатны түвшинд зориулагдсан бөгөөд дизайны үндсэн мэдлэг шаардлагатай.`,
    duration: "8 долоо хоног",
    level: "Ахисан шат",
    participants: 20,
    maxParticipants: 25,
    imageSrc: "/ux-ui-masterclass.png",
    creatorName: "Ж. Энхбаяр",
    creatorImageSrc: "/images/male.avif",
    isCompleted: false,
    mediaType: "image" as const,
    reward: 600,
    modules: [
      { title: "UX дизайны үндэс", duration: "50 мин", completed: false },
      { title: "UI дизайны зарчмууд", duration: "45 мин", completed: false },
      { title: "Figma ашиглах арга", duration: "60 мин", completed: false },
      { title: "Wireframe болон prototype", duration: "55 мин", completed: false },
      { title: "Хэрэглэгчийн судалгаа", duration: "40 мин", completed: false },
    ],
  },
}

export default function TrainingDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const trainingId = params.id as string
  const training = trainingData[trainingId as keyof typeof trainingData]

  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(15000)

  if (!training) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Сурчилгаа олдсонгүй</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Таны хайж буй сурчилгаа олдсонгүй.</p>
            <Link href="/jobs">
              <Button>Буцах</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progress = (training.participants / training.maxParticipants) * 100

  const handleEnroll = () => {
    setIsEnrolled(true)
    toast({
      title: "Амжилттай бүртгэгдлээ!",
      description: `Та "${training.title}" сурчилгаанд амжилттай бүртгэгдлээ.`,
    })
  }

  const handleComplete = () => {
    setCurrentBalance((prev) => prev + training.reward)
    toast({
      title: "Амжилттай дууслаа!",
      description: `Та ${training.reward}₮ олж авлаа! Таны түрүүвчийн үлдэгдэл: ${currentBalance + training.reward}₮`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/jobs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Буцах
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Training Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={training.creatorImageSrc || "/placeholder.svg"}
                    alt={training.creatorName}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{training.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {training.creatorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {training.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="secondary">{training.level}</Badge>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <BookOpen className="h-4 w-4" />
                        {training.modules.length} модуль
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {training.description}
                </p>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Курсын агуулга</h3>
                  <div className="space-y-4">
                    {training.modules.map((module, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{module.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{module.duration}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {module.completed && (
                              <Badge variant="default" className="bg-green-600">
                                Дууссан
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={training.imageSrc || "/placeholder.svg"}
                    alt={training.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Enrollment Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    <Award className="h-6 w-6" />
                    {training.reward}₮
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Шагнал</p>
                </div>

                {!isEnrolled ? (
                  <Button onClick={handleEnroll} className="w-full mb-4">
                    Бүртгүүлэх
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="w-full mb-4" variant="default">
                    Дуусгах
                  </Button>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Элсэлт:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {training.participants}/{training.maxParticipants}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Түвшин</p>
                      <p className="font-medium text-gray-900 dark:text-white">{training.level}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Хугацаа</p>
                      <p className="font-medium text-gray-900 dark:text-white">{training.duration}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Энэ сурчилгааг дуусгасны дараа та сертификат авах боломжтой.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
