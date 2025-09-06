"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface Ad {
  id: number
  imageSrc: string
  title: string
  description: string
  backgroundColor: string
}

const ads: Ad[] = [
  {
    id: 1,
    imageSrc: "/diverse-fitness-workout.png",
    title: "Жижиг алхамууд өдөр бүр том өөрчлөлтөд хүргэнэ",
    description: "Биеийн тамирын дасгал хийж эрүүл амьдрах",
    backgroundColor: "bg-gradient-to-r from-green-400 to-green-300",
  },
  {
    id: 2,
    imageSrc: "/survey-money-coins.jpg",
    title: "Шинэ судалгаанууд таныг хүлээж байна",
    description: "Судалгаа бөглөж мөнгө олох боломж",
    backgroundColor: "bg-gradient-to-r from-blue-400 to-blue-300",
  },
  {
    id: 3,
    imageSrc: "/target-achievement.jpg",
    title: "Өнөөдөр 1000₮ цуглуулсан уу",
    description: "Өнөөдрийн зорилгодоо хүрэх цаг болжээ",
    backgroundColor: "bg-gradient-to-r from-purple-400 to-purple-300",
  },
]

export function AdBanner() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentAd = ads[currentAdIndex]

  return (
    <div
      className={`relative w-full h-32 ${currentAd.backgroundColor} rounded-xl overflow-hidden flex items-center p-4 mb-6`}
    >
      <div className="flex items-center w-full">
        <div className="w-24 h-24 relative flex-shrink-0 mr-4">
          <Image
            src={currentAd.imageSrc || "/placeholder.svg"}
            alt="Сурталчилгааны зураг"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-white">
          <h3 className="text-lg font-bold leading-tight mb-2">{currentAd.title}</h3>
          <p className="text-sm opacity-90">{currentAd.description}</p>
        </div>
      </div>
    </div>
  )
}
