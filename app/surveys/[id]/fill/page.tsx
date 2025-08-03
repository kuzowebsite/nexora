"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { surveysData } from "@/lib/survey-data"
import { Star } from "lucide-react"
import { addCompletedSurveyId } from "@/lib/utils" // Corrected import

export default function FillSurveyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const survey = surveysData.find((s) => s.id === params.id)
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] | number }>({})

  if (!survey) {
    return (
      <div className="text-center py-10 text-zinc-900 dark:text-white">
        <h1 className="text-2xl font-bold">Судалгаа олдсонгүй</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Таны хайсан судалгаа байхгүй байна.</p>
        <Link href="/" passHref>
          <Button variant="link" className="text-yellow-600 dark:text-yellow-400 hover:underline mt-4">
            Буцах
          </Button>
        </Link>
      </div>
    )
  }

  const handleAnswerChange = (
    questionId: string,
    value: string | string[] | number,
    type: "text" | "radio" | "checkbox" | "rating",
  ) => {
    if (type === "checkbox") {
      setAnswers((prevAnswers) => {
        const currentValues = (prevAnswers[questionId] || []) as string[]
        if (currentValues.includes(value as string)) {
          return { ...prevAnswers, [questionId]: currentValues.filter((item) => item !== value) }
        } else {
          return { ...prevAnswers, [questionId]: [...currentValues, value] }
        }
      })
    } else {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Судалгааны хариултууд:", answers)
    alert("Судалгааг амжилттай бөглөлөө! Баярлалаа.")
    addCompletedSurveyId(survey.id) // Corrected function call
    router.push(`/surveys/${survey.id}`)
  }

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center md:py-8">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg w-full rounded-none md:rounded-lg md:max-w-3xl">
        <CardHeader className="pt-2 pb-4 px-4 md:px-6">
          <div className="flex items-center mb-2">
            <Link href={`/surveys/${survey.id}`} passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white -ml-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Буцах</span>
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold leading-tight ml-2">{survey.title}</CardTitle>
          </div>
          <CardDescription className="text-zinc-600 dark:text-zinc-300 mt-2 text-base">
            {survey.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 border-t border-zinc-200 dark:border-zinc-700 px-4 md:px-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Added optional chaining to prevent error if questions is undefined */}
            {survey.questions?.map((question, index) => (
              <div key={question.id} className="grid gap-2 p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                <Label htmlFor={question.id} className="text-base font-medium">
                  {index + 1}. {question.text}
                </Label>
                {question.questionContentType === "image" && question.mediaUrl && (
                  <img
                    src={question.mediaUrl || "/placeholder.svg"}
                    alt="Асуултын зураг"
                    className="w-full h-auto object-contain rounded-md mb-2"
                  />
                )}
                {question.questionContentType === "video" && question.mediaUrl && (
                  <video src={question.mediaUrl} controls className="w-full h-auto rounded-md mb-2" />
                )}
                {question.answerType === "text" && (
                  <Input
                    id={question.id}
                    type="text"
                    placeholder="Хариултаа оруулна уу..."
                    value={(answers[question.id] as string) || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value, "text")}
                    className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                  />
                )}
                {question.answerType === "radio" && question.options && (
                  <RadioGroup
                    onValueChange={(value) => handleAnswerChange(question.id, value, "radio")}
                    value={(answers[question.id] as string) || ""}
                    className="grid gap-2"
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`${question.id}-${option.value}`}
                          className="text-zinc-900 dark:text-white"
                        />
                        <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {question.answerType === "checkbox" && question.options && (
                  <div className="grid gap-2">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${question.id}-${option.value}`}
                          checked={((answers[question.id] as string[]) || []).includes(option.value)}
                          onCheckedChange={() => handleAnswerChange(question.id, option.value, "checkbox")}
                          className="text-zinc-900 dark:text-white"
                        />
                        <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </div>
                )}
                {question.answerType === "rating" && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-7 w-7 cursor-pointer transition-colors ${
                          ((answers[question.id] as number) || 0) >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-zinc-400 fill-zinc-200 dark:fill-zinc-600"
                        }`}
                        onClick={() => handleAnswerChange(question.id, star, "rating")}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              type="submit"
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-lg h-12 mt-4"
            >
              Судалгааг илгээх
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
