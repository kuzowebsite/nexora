"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { SurveyCard } from "@/components/survey-card"
import { AdBanner } from "@/components/ad-banner"
import { PartnerLogos } from "@/components/partner-logos"
import { surveysData } from "@/lib/survey-data"
import { getCompletedSurveyIds } from "@/lib/utils"

// UI components for search/filter
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export default function HomePage() {
  const [completedSurveyIds, setCompletedSurveyIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCompleted, setFilterCompleted] = useState<"all" | "completed" | "not-completed">("all")

  useEffect(() => {
    setCompletedSurveyIds(getCompletedSurveyIds())
  }, [])

  const allSurveys = useMemo(() => {
    return surveysData.map((survey) => ({
      ...survey,
      isCompleted: completedSurveyIds.includes(survey.id),
    }))
  }, [completedSurveyIds])

  const featuredSurveys = useMemo(() => {
    return allSurveys.filter((survey) => survey.type === "featured").sort((a, b) => b.reward - a.reward)
  }, [allSurveys])

  const regularSurveys = useMemo(() => {
    return allSurveys.filter((survey) => survey.type === "regular").sort((a, b) => b.reward - a.reward)
  }, [allSurveys])

  const applyFilters = (surveys: typeof surveysData) => {
    return surveys.filter((survey) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const searchAsNumber = Number.parseFloat(searchTerm)

      const matchesSearchTerm =
        survey.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (!isNaN(searchAsNumber) && survey.reward === searchAsNumber)

      const matchesCompletionStatus =
        filterCompleted === "all" ||
        (filterCompleted === "completed" && survey.isCompleted) ||
        (filterCompleted === "not-completed" && !survey.isCompleted)
      return matchesSearchTerm && matchesCompletionStatus
    })
  }

  const filteredFeaturedSurveys = useMemo(
    () => applyFilters(featuredSurveys),
    [featuredSurveys, searchTerm, filterCompleted],
  )
  const filteredRegularSurveys = useMemo(
    () => applyFilters(regularSurveys),
    [regularSurveys, searchTerm, filterCompleted],
  )

  const handleClearFilters = () => {
    setSearchTerm("")
    setFilterCompleted("all")
  }

  return (
    <div className="relative pb-16 px-4 md:px-6 pt-6">
      <PartnerLogos />
      <AdBanner className="mt-4" />

      {/* Search and Filter Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Судалгаа хайх, шүүх</h2>
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
              <DropdownMenuLabel>Бөглөсөн эсэх</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterCompleted === "all"}
                onCheckedChange={() => setFilterCompleted("all")}
              >
                Бүгд
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCompleted === "completed"}
                onCheckedChange={() => setFilterCompleted("completed")}
              >
                Бөглөсөн
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterCompleted === "not-completed"}
                onCheckedChange={() => setFilterCompleted("not-completed")}
              >
                Бөглөөгүй
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {(searchTerm !== "" || filterCompleted !== "all") && (
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <X className="h-4 w-4 mr-2" /> Шүүлтүүрийг цэвэрлэх
          </Button>
        )}
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Онцгой судалгаа</h2>
          <Link href="/surveys/featured" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
            Бүгдийг харах
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFeaturedSurveys.length > 0 ? (
            filteredFeaturedSurveys.map((survey) => (
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
              Хайлт болон шүүлтүүрт тохирох онцгой судалгаа олдсонгүй.
            </p>
          )}
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Энгийн Судалгаа</h2>
          <Link href="/surveys/regular" className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
            Бүгдийг харах
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredRegularSurveys.length > 0 ? (
            filteredRegularSurveys.map((survey) => (
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
              Хайлт болон шүүлтүүрт тохирох энгийн судалгаа олдсонгүй.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
