import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Жишээ судалгааны мэдээлэл (бодит байдал дээр мэдээллийн сангаас авна)
const createdSurveysData = [
  {
    id: "cs1",
    title: "Хэрэглэгчийн сэтгэл ханамж", // "Миний үүсгэсэн судалгаа:" хэсгийг хасав
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
    title: "Бүтээгдэхүүний шинэчлэл", // "Миний үүсгэсэн судалгаа:" хэсгийг хасав
    status: "Хүлээгдэж байна",
    responses: 0,
    totalResponses: 100,
    genderStats: { male: 0, female: 0 },
    ageDistribution: [],
  },
  {
    id: "cs3",
    title: "Зах зээлийн судалгаа", // "Миний үүсгэсэн судалгаа:" хэсгийг хасав
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
    title: "Ажилтны сэтгэл ханамж", // "Миний үүсгэсэн судалгаа:" хэсгийг хасав
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

export default function MyCreatedSurveysPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <Link href="/profile" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white -ml-2"
              >
                <ArrowLeft className="h-5 w-5" /> {/* Зөвхөн сум үлдээв */}
                <span className="sr-only">Буцах</span> {/* Дэлгэц уншигчид зориулж нэмэв */}
              </Button>
            </Link>
            <h1 className="text-2xl font-bold ml-2">Миний үүсгэсэн судалгаанууд</h1> {/* Нэрийг сумын ард байрлуулав */}
          </div>
          <CardDescription className="text-zinc-600 dark:text-zinc-300">
            Таны үүсгэсэн судалгаануудын жагсаалт.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {createdSurveysData.length > 0 ? (
            createdSurveysData.map((survey) => (
              <Card key={survey.id} className="bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">{survey.title}</CardTitle>
                  <CardDescription className="text-zinc-600 dark:text-zinc-300">
                    Төлөв:{" "}
                    <span
                      className={`font-semibold ${
                        survey.status === "Идэвхтэй"
                          ? "text-green-600 dark:text-green-400"
                          : survey.status === "Дууссан"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {survey.status}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Хариулт: {survey.responses}/{survey.totalResponses}
                  </p>
                  <Link href={`/profile/my-surveys/${survey.id}`} passHref>
                    <Button
                      variant="outline"
                      className="bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-500"
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400 text-center py-8">Та одоогоор судалгаа үүсгээгүй байна.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
