import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { surveysData } from "@/lib/survey-data"

export default function SurveyDetailPage({ params }: { params: { id: string } }) {
  const survey = surveysData.find((s) => s.id === params.id)

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

  const progress = (survey.participants / survey.maxParticipants) * 100

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center md:py-8">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg w-full rounded-none md:rounded-lg md:max-w-3xl">
        <CardHeader className="pt-2 pb-4 px-4 md:px-6">
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
            <CardTitle className="text-2xl font-bold leading-tight ml-2">{survey.title}</CardTitle>{" "}
            {/* text-3xl-ийг text-2xl болгов */}
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 mt-2 text-base">{survey.description}</p>
        </CardHeader>
        <CardContent className="pt-4 border-t border-zinc-200 dark:border-zinc-700 px-4 md:px-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
              <span className="text-lg font-medium">Шагнал:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{survey.reward}₮</span>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
              <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300 mb-1">
                <span>
                  Бөглөсөн: {survey.participants}/{survey.maxParticipants}
                </span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-zinc-300 dark:bg-zinc-600 [&>*]:bg-zinc-900 dark:[&>*]:bg-white"
              />
            </div>
          </div>
          <Link href={`/surveys/${survey.id}/fill`} passHref legacyBehavior>
            <Button
              asChild
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-lg h-12 mt-6"
            >
              <a>Судалгаа бөглөх</a>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
