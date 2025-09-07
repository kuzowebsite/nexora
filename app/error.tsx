"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Алдаа гарлаа</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Уучлаарай, системд алдаа гарлаа. Дахин оролдоно уу.</p>
        <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white">
          Дахин оролдох
        </Button>
      </div>
    </div>
  )
}
