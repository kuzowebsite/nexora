"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, XCircle, Star } from "lucide-react" // Added icons
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Added Select
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog" // Added Dialog components
import { useToast } from "@/hooks/use-toast" // Added useToast

// Updated Question interface
interface Question {
  id: number
  text: string
  questionContentType: "text" | "image" | "video" // What content does the question prompt have
  mediaUrl?: string // URL for image/video content (if URL chosen)
  mediaFile?: File | null // For file upload option (if File chosen)
  useFileUpload?: boolean // New: true if user chose file upload, false for URL
  answerType: "text" | "radio" | "checkbox" | "rating" // How the user responds
  options?: { id: number; value: string; label: string }[]
}

export default function CreateSurveyPage() {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [rewardPerParticipant, setRewardPerParticipant] = useState<number | string>("")
  const [maxParticipants, setMaxParticipants] = useState<number | string>("")
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", questionContentType: "text", answerType: "text", useFileUpload: false },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  const { toast } = useToast()

  const totalCost = (Number(rewardPerParticipant) || 0) * (Number(maxParticipants) || 0)

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, text: "", questionContentType: "text", answerType: "text", useFileUpload: false },
    ])
  }

  const removeQuestion = (id: number) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id))
  }

  const handleQuestionChange = (
    id: number,
    field: keyof Question,
    value: string | boolean | File | FileList | { id: number; value: string; label: string }[] | undefined,
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === id) {
          if (field === "questionContentType") {
            const newQ: Question = { ...q, questionContentType: value as "text" | "image" | "video" }
            if (newQ.questionContentType === "text") {
              newQ.mediaUrl = undefined
              newQ.mediaFile = null
              newQ.useFileUpload = false
            }
            return newQ
          } else if (field === "answerType") {
            const newQ: Question = { ...q, answerType: value as "text" | "radio" | "checkbox" | "rating" }
            if (newQ.answerType === "radio" || newQ.answerType === "checkbox") {
              newQ.options = [{ id: 1, value: "", label: "" }]
            } else {
              newQ.options = undefined
            }
            return newQ
          } else if (field === "useFileUpload") {
            return { ...q, useFileUpload: value as boolean, mediaUrl: undefined, mediaFile: null }
          } else if (field === "mediaFile" && value instanceof FileList) {
            return { ...q, mediaFile: value[0] || null }
          }
          return { ...q, [field]: value }
        }
        return q
      }),
    )
  }

  const addOption = (questionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId && (q.answerType === "radio" || q.answerType === "checkbox")) {
          const newOptions = q.options
            ? [...q.options, { id: q.options.length + 1, value: "", label: "" }]
            : [{ id: 1, value: "", label: "" }]
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  const removeOption = (questionId: number, optionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId && (q.answerType === "radio" || q.answerType === "checkbox") && q.options) {
          const filteredOptions = q.options.filter((opt) => opt.id !== optionId)
          return { ...q, options: filteredOptions.length > 0 ? filteredOptions : undefined } // Changed to undefined if no options left
        }
        return q
      }),
    )
  }

  const handleOptionChange = (questionId: number, optionId: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId && (q.answerType === "radio" || q.answerType === "checkbox") && q.options) {
          const updatedOptions = q.options.map(
            (opt) => (opt.id === optionId ? { ...opt, value: value, label: value } : opt), // Label and value are same for simplicity
          )
          return { ...q, options: updatedOptions }
        }
        return q
      }),
    )
  }

  const handlePayment = async () => {
    // Basic validation
    if (!surveyTitle || !surveyDescription || !rewardPerParticipant || !maxParticipants) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Судалгааны үндсэн мэдээллийг бүрэн бөглөнө үү.",
      })
      return
    }

    if (Number(rewardPerParticipant) <= 0 || Number(maxParticipants) <= 0) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Шагнал болон оролцогчийн тоо 0-ээс их байх ёстой.",
      })
      return
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        toast({
          variant: "destructive",
          title: "Алдаа",
          description: "Бүх асуултын текстийг бөглөнө үү.",
        })
        return
      }
      if (
        (q.answerType === "radio" || q.answerType === "checkbox") &&
        (!q.options || q.options.some((opt) => !opt.value.trim()))
      ) {
        toast({
          variant: "destructive",
          title: "Алдаа",
          description: `Асуулт ${q.id}: Сонголтот асуултуудын бүх сонголтыг бөглөнө үү.`,
        })
        return
      }
      if (q.questionContentType === "image" || q.questionContentType === "video") {
        if (q.useFileUpload && !q.mediaFile) {
          toast({
            variant: "destructive",
            title: "Алдаа",
            description: `Асуулт ${q.id}: Файлаар оруулах зураг/видеог сонгоно уу.`,
          })
          return
        }
        if (!q.useFileUpload && !q.mediaUrl?.trim()) {
          toast({
            variant: "destructive",
            title: "Алдаа",
            description: `Асуулт ${q.id}: Зураг/видео асуултуудын URL-ийг оруулна уу.`,
          })
          return
        }
      }
    }

    setShowPaymentDialog(true)
  }

  const confirmPayment = async () => {
    setIsSubmitting(true)
    setShowPaymentDialog(false)

    // Simulate payment deduction from wallet
    // In a real application, you would call a Server Action here
    // that interacts with your database to deduct the balance and create the survey.
    // For example: const result = await createSurveyAndDeductBalance({ totalCost, surveyData });
    // And then handle success/failure based on the result.

    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network request

    const currentBalance = 15000 // This should come from a global state or backend
    if (currentBalance >= totalCost) {
      toast({
        title: "Амжилттай",
        description: `Судалгаа амжилттай үүсгэгдлээ! Таны түрүүвчнээс ${totalCost}₮ хасагдлаа.`,
      })
      // Reset form after successful payment
      setSurveyTitle("")
      setSurveyDescription("")
      setRewardPerParticipant("")
      setMaxParticipants("")
      setQuestions([{ id: 1, text: "", questionContentType: "text", answerType: "text", useFileUpload: false }])
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: `Түрүүвчний үлдэгдэл хүрэлцэхгүй байна. Таны дансанд ${currentBalance}₮ байна.`,
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
        <CardHeader>
          <CardTitle>Шинэ судалгаа үүсгэх</CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-300">
            Таны судалгааны мэдээлэл болон асуултуудыг оруулна уу.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="survey-title">Судалгааны гарчиг</Label>
              <Input
                id="survey-title"
                placeholder="Жишээ: Хэрэглэгчийн сэтгэл ханамжийн судалгаа"
                required
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="survey-description">Тайлбар</Label>
              <Textarea
                id="survey-description"
                placeholder="Судалгааны зорилго, агуулгыг товч тайлбарлана уу."
                required
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="survey-reward">Нэг бөглөлтөд олгох шагнал (₮)</Label>
                <Input
                  id="survey-reward"
                  type="number"
                  placeholder="500"
                  min="0"
                  required
                  value={rewardPerParticipant}
                  onChange={(e) => setRewardPerParticipant(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-participants">Оролцох хүний тоо</Label>
                <Input
                  id="max-participants"
                  type="number"
                  placeholder="100"
                  min="1"
                  required
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                />
              </div>
            </div>
            <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
              <span className="text-lg font-medium">Нийт төлбөр:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{totalCost}₮</span>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Асуултууд</h3>
              {questions.map((q, index) => (
                <Card key={q.id} className="p-4 bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600">
                  <CardContent className="p-0 grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`question-text-${q.id}`} className="font-medium">
                        Асуулт {index + 1}
                      </Label>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(q.id)}
                          aria-label={`Асуулт ${index + 1}-ийг устгах`}
                          className="text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                    <Input
                      id={`question-text-${q.id}`}
                      placeholder={`Асуулт ${index + 1}`}
                      value={q.text}
                      onChange={(e) => handleQuestionChange(q.id, "text", e.target.value)}
                      required
                      className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                    />

                    <div className="grid gap-2">
                      <Label htmlFor={`question-content-type-${q.id}`}>Асуултын агуулгын төрөл</Label>
                      <Select
                        value={q.questionContentType}
                        onValueChange={(value: "text" | "image" | "video") =>
                          handleQuestionChange(q.id, "questionContentType", value)
                        }
                      >
                        <SelectTrigger
                          id={`question-content-type-${q.id}`}
                          className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white"
                        >
                          <SelectValue placeholder="Агуулгын төрөл сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                          <SelectItem value="text">Зөвхөн текст</SelectItem>
                          <SelectItem value="image">Зурагтай</SelectItem>
                          <SelectItem value="video">Видеотэй</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(q.questionContentType === "image" || q.questionContentType === "video") && (
                      <div className="grid gap-2 border p-3 rounded-md border-zinc-300 dark:border-zinc-600">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={!q.useFileUpload ? "default" : "outline"}
                            onClick={() => handleQuestionChange(q.id, "useFileUpload", false)}
                            className="flex-1"
                          >
                            URL-ээр оруулах
                          </Button>
                          <Button
                            type="button"
                            variant={q.useFileUpload ? "default" : "outline"}
                            onClick={() => handleQuestionChange(q.id, "useFileUpload", true)}
                            className="flex-1"
                          >
                            Файлаар оруулах
                          </Button>
                        </div>
                        {q.useFileUpload ? (
                          <>
                            <Label htmlFor={`media-file-${q.id}`}>
                              {q.questionContentType === "image" ? "Зураг файл" : "Видео файл"}
                            </Label>
                            <Input
                              id={`media-file-${q.id}`}
                              type="file"
                              accept={q.questionContentType === "image" ? "image/*" : "video/*"}
                              onChange={(e) => handleQuestionChange(q.id, "mediaFile", e.target.files)}
                              className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white"
                            />
                            {q.mediaFile && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Файл сонгогдлоо: {q.mediaFile.name} (Урьдчилан харах боломжгүй)
                              </p>
                            )}
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              Жич: Бодит аппликейшнд энэ файлыг серверт байршуулна.
                            </p>
                          </>
                        ) : (
                          <>
                            <Label htmlFor={`media-url-${q.id}`}>
                              {q.questionContentType === "image" ? "Зургийн URL" : "Видео URL"}
                            </Label>
                            <Input
                              id={`media-url-${q.id}`}
                              type="url"
                              placeholder={
                                q.questionContentType === "image"
                                  ? "https://example.com/image.jpg"
                                  : "https://example.com/video.mp4"
                              }
                              value={q.mediaUrl || ""}
                              onChange={(e) => handleQuestionChange(q.id, "mediaUrl", e.target.value)}
                              className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                            />
                          </>
                        )}
                      </div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor={`answer-type-${q.id}`}>Асуултын хариултын төрөл</Label>
                      <Select
                        value={q.answerType}
                        onValueChange={(value: "text" | "radio" | "checkbox" | "rating") =>
                          handleQuestionChange(q.id, "answerType", value)
                        }
                      >
                        <SelectTrigger
                          id={`answer-type-${q.id}`}
                          className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white"
                        >
                          <SelectValue placeholder="Хариултын төрөл сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                          <SelectItem value="text">Текст хариулт</SelectItem>
                          <SelectItem value="radio">Нэг сонголттой</SelectItem>
                          <SelectItem value="checkbox">Олон сонголттой</SelectItem>
                          <SelectItem value="rating">Үнэлгээ (1-5 од)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(q.answerType === "radio" || q.answerType === "checkbox") && (
                      <div className="grid gap-2">
                        <Label>Сонголтууд</Label>
                        {q.options?.map((option, optIndex) => (
                          <div key={option.id} className="flex items-center gap-2">
                            <Input
                              placeholder={`Сонголт ${optIndex + 1}`}
                              value={option.value}
                              onChange={(e) => handleOptionChange(q.id, option.id, e.target.value)}
                              className="bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                            />
                            {q.options &&
                              q.options.length > 0 && ( // Allow removing only if there's at least one option
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(q.id, option.id)}
                                  aria-label={`Сонголт ${optIndex + 1}-ийг устгах`}
                                  className="text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addOption(q.id)}
                          className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-600"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Сонголт нэмэх
                        </Button>
                      </div>
                    )}

                    {q.answerType === "rating" && (
                      <div className="grid gap-2">
                        <Label>Үнэлгээний хэлбэр (Урьдчилан харах)</Label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-6 w-6 text-yellow-400 fill-yellow-400" // Static filled stars for preview
                            />
                          ))}
                          <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">1-5 одны үнэлгээ</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Асуулт нэмэх
              </Button>
            </div>
            <Button
              type="button"
              onClick={handlePayment}
              disabled={isSubmitting}
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {isSubmitting ? "Төлбөр төлж байна..." : "Төлбөр төлөх"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle>Төлбөр баталгаажуулах</DialogTitle>
            <DialogDescription>
              Та энэ судалгааг үүсгэхийн тулд нийт{" "}
              <span className="font-bold text-green-600 dark:text-green-400">{totalCost}₮</span> төлөх гэж байна.
              Үргэлжлүүлэх үү?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
              className="bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              Цуцлах
            </Button>
            <Button
              onClick={confirmPayment}
              disabled={isSubmitting}
              className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {isSubmitting ? "Төлбөр төлж байна..." : "Төлбөр төлөх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
