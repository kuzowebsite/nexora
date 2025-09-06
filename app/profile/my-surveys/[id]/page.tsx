import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Users, CalendarDays } from "lucide-react"

// Жишээ судалгааны мэдээлэл (бодит байдал дээр мэдээллийн сангаас авна)
const createdSurveysData = [
  {
    id: "cs1",
    title: "Онлайн худалдааны хэрэглээний судалгаа",
    status: "Идэвхтэй",
    responses: 15,
    totalResponses: 50,
    genderStats: { male: 8, female: 7 },
    ageDistribution: [
      { range: "18-24", count: 5 },
      { range: "25-34", count: 7 },
      { range: "35-44", count: 3 },
      { range: "45+", count: 0 },
    ],
  },
  {
    id: "cs2",
    title: "Бүтээгдэхүүний шинэчлэл",
    status: "Хүлээгдэж байна",
    responses: 0,
    totalResponses: 100,
    genderStats: { male: 0, female: 0 },
    ageDistribution: [],
  },
  {
    id: "cs3",
    title: "Зах зээлийн судалгаа",
    status: "Дууссан",
    responses: 75,
    totalResponses: 75,
    genderStats: { male: 30, female: 45 },
    ageDistribution: [
      { range: "18-24", count: 20 },
      { range: "25-34", count: 30 },
      { range: "35-44", count: 15 },
      { range: "45+", count: 10 },
    ],
  },
  {
    id: "cs4",
    title: "Ажилтны сэтгэл ханамж",
    status: "Идэвхтэй",
    responses: 20,
    totalResponses: 40,
    genderStats: { male: 12, female: 8 },
    ageDistribution: [
      { range: "18-24", count: 2 },
      { range: "25-34", count: 10 },
      { range: "35-44", count: 6 },
      { range: "45+", count: 2 },
    ],
  },
]

export default function MySurveyDetailPage({ params }: { params: { id: string } }) {
  const survey = createdSurveysData.find((s) => s.id === params.id)

  if (!survey) {
    return (
      <div className="text-center py-10 text-zinc-900 dark:text-white">
        <h1 className="text-2xl font-bold">Судалгаа олдсонгүй</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Таны хайсан судалгаа байхгүй байна.</p>
        <Link href="/profile/my-surveys" passHref>
          <Button variant="link" className="text-yellow-600 dark:text-yellow-400 hover:underline mt-4">
            Буцах
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <Link href="/profile/my-surveys" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white -ml-2"
              >
                <ArrowLeft className="h-5 w-5" /> {/* Зөвхөн сум үлдээв */}
                <span className="sr-only">Буцах</span> {/* Дэлгэц уншигчид зориулж нэмэв */}
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-2">{survey.title}</h1> {/* Нэрийг сумын ард байрлуулав */}
          </div>
          <CardTitle className="text-2xl">Судалгааны статистик</CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-300">
            Энэ судалгааны дэлгэрэнгүй мэдээлэл болон оролцогчдын статистик.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Ерөнхий мэдээлэл */}
          <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Төлөв:</span>
              <span
                className={`font-bold ${
                  survey.status === "Идэвхтэй"
                    ? "text-green-600 dark:text-green-400"
                    : survey.status === "Дууссан"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {survey.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Нийт хариулт:</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {survey.responses}/{survey.totalResponses}
              </span>
            </div>
          </div>

          {/* Хүйсний статистик */}
          <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-zinc-700 dark:text-white" /> Хүйсний статистик
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg">Эрэгтэй:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{survey.genderStats.male}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">Эмэгтэй:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{survey.genderStats.female}</span>
            </div>
          </div>

          {/* Насны индекс */}
          <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-zinc-700 dark:text-white" /> Насны индекс
            </h3>
            {survey.ageDistribution.length > 0 ? (
              survey.ageDistribution.map((age, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-lg">{age.range}:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{age.count}</span>
                </div>
              ))
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">Насны мэдээлэл байхгүй байна.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
