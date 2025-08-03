"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface Ad {
  id: number
  imageSrc: string
  title: string
  progressValue: number
  progressText: string
}

const ads: Ad[] = [
  {
    id: 1,
    imageSrc: "/placeholder.svg?height=100&width=100",
    title: "Жижиг алхамууд өдөр бүр том өөрчлөлтөд хүргэнэ 🏋️",
    progressValue: 75,
    progressText: "3/4 дасгал энэ долоо хоногт",
  },
  {
    id: 2,
    imageSrc: "/placeholder.svg?height=100&width=100",
    title: "Шинэ судалгаанууд таныг хүлээж байна! 💰",
    progressValue: 50,
    progressText: "5 шинэ судалгаа нэмэгдлээ",
  },
  {
    id: 3,
    imageSrc: "/placeholder.svg?height=100&width=100",
    title: "Өнөөдөр 1000₮ цуглуулсан уу? 🚀",
    progressValue: 100,
    progressText: "Өнөөдрийн зорилго биелсэн!",
  },
]

export function AdBanner() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 3000) // 3 секунд тутамд солигдоно

    return () => clearInterval(interval)
  }, [])

  const currentAd = ads[currentAdIndex]

  return (
    <div className="relative w-full h-32 md:h-40 bg-[#A7F300] rounded-lg overflow-hidden flex items-center p-4 shadow-md mb-8">
      <div className="absolute inset-0">
        <Image
          src={currentAd.imageSrc || "/placeholder.svg"}
          alt="Сурталчилгааны зураг"
          width={100}
          height={100}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-auto object-cover"
        />
      </div>
      <div className="flex-1 pl-[110px] md:pl-[130px] text-zinc-900 dark:text-zinc-900">
        <h3 className="text-lg md:text-xl font-bold leading-tight mb-2">{currentAd.title}</h3>
        <Progress value={currentAd.progressValue} className="h-2 bg-zinc-300 [&>*]:bg-zinc-900" />
        <p className="text-sm md:text-base mt-1">{currentAd.progressText}</p>
      </div>
    </div>
  )
}
