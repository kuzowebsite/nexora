"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="text-center">
        <div className="mb-8">
          <Image
            src="/images/crypto-case-logo.png"
            alt="Linkups Logo"
            width={120}
            height={120}
            className="mx-auto rounded-2xl shadow-2xl"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Linkups</h1>
        <p className="text-xl text-blue-100 mb-8">Платформ</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
