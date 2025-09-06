"use client"

import { useState, useMemo, useEffect } from "react" // Added useEffect
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SurveyCard } from "@/components/survey-card" // Corrected import path
import { surveysData } from "@/lib/survey-data"
import { getCompletedSurveyIds } from "@/lib/utils" // Import the helper function

export default function RegularSurveysPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [minReward, setMinReward] = useState<number | string>("")
  const [completedSurveyIds, setCompletedSurveyIds] = useState<string[]>([]) // State for completed IDs

  useEffect(() => {
    setCompletedSurveyIds(getCompletedSurveyIds())
  }, [])

  const regularSurveys = useMemo(() => {
    return surveysData.filter((survey) => survey.type === "regular")
  }, [])

  const filteredSurveys = useMemo(() => {
    return regularSurveys.filter((survey) => {
      const matchesSearchTerm = survey.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesMinReward = minReward === "" || survey.reward >= Number(minReward)
      return matchesSearchTerm && matchesMinReward
    })
  }, [regularSurveys, searchTerm, minReward])

  const handleClearFilters = () => {
    setSearchTerm("")
    setMinReward("")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center mb-2">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white -ml-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Буцах</span>
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold leading-tight ml-2">Энгийн судалгаанууд</CardTitle>
          </div>
          <CardDescription className="text-zinc-600 dark:text-zinc-300">
            Манай энгийн судалгаануудын жагсаалт.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <Input
                type="text"
                placeholder="Нэрээр хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <Input
                type="number"
                placeholder="Хамгийн бага шагнал (₮)"
                value={minReward}
                onChange={(e) => setMinReward(e.target.value)}
                className="pl-8 w-full bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
              />
            </div>
            {(searchTerm !== "" || minReward !== "") && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                Шүүлтүүрийг цэвэрлэх
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  isCompleted={completedSurveyIds.includes(survey.id)} // Pass isCompleted prop
                />
              ))
            ) : (
              <p className="col-span-full text-center text-zinc-600 dark:text-zinc-400 py-8">
                Хайлт болон шүүлтүүрт тохирох судалгаа олдсонгүй.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
