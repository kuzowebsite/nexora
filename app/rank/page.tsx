"use client"
import { useState } from "react" // useState-ийг импортлов
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award } from "lucide-react" // Award icon-ийг импортлов

// Жишээ хэрэглэгчийн мэдээлэл
interface UserRank {
  id: string
  name: string
  avatarSrc: string
  completedSurveys: number
  createdSurveys: number
}

const sampleUsers: UserRank[] = [
  {
    id: "u1",
    name: "Очир Бат",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ОБ",
    completedSurveys: 150,
    createdSurveys: 5,
  },
  {
    id: "u2",
    name: "Ариунболд",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=АБ",
    completedSurveys: 120,
    createdSurveys: 8,
  },
  {
    id: "u3",
    name: "Гантулга",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ГТ",
    completedSurveys: 100,
    createdSurveys: 3,
  },
  {
    id: "u4",
    name: "Дөлгөөн",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ДЛ",
    completedSurveys: 90,
    createdSurveys: 12,
  },
  {
    id: "u5",
    name: "Энхтуул",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ЭТ",
    completedSurveys: 80,
    createdSurveys: 7,
  },
  {
    id: "u6",
    name: "Баярсайхан",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=БС",
    completedSurveys: 75,
    createdSurveys: 10,
  },
  {
    id: "u7",
    name: "Цэцэгмаа",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ЦМ",
    completedSurveys: 60,
    createdSurveys: 4,
  },
  {
    id: "u8",
    name: "Хулан",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ХЛ",
    completedSurveys: 50,
    createdSurveys: 9,
  },
  {
    id: "u9",
    name: "Тэмүүжин",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ТМ",
    completedSurveys: 45,
    createdSurveys: 6,
  },
  {
    id: "u10",
    name: "Уранчимэг",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=УЧ",
    completedSurveys: 40,
    createdSurveys: 15,
  },
]

export default function RankPage() {
  const [activeTab, setActiveTab] = useState("completed") // Идэвхтэй табыг хянах state

  // Судалгаа бөглөсөнөөр эрэмбэлэх
  const sortedByCompleted = [...sampleUsers].sort((a, b) => b.completedSurveys - a.completedSurveys)
  // Судалгаа үүсгэснээр эрэмбэлэх
  const sortedByCreated = [...sampleUsers].sort((a, b) => b.createdSurveys - a.createdSurveys)

  // Жишээ хэрэглэгч (бодит байдал дээр нэвтэрсэн хэрэглэгч байна)
  const currentUser = sampleUsers[0] // Очир Бат-ыг жишээ хэрэглэгчээр авав

  const completedRank = sortedByCompleted.findIndex((user) => user.id === currentUser.id) + 1
  const createdRank = sortedByCreated.findIndex((user) => user.id === currentUser.id) + 1

  const getRankDisplay = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" /> // Алтан цом
      case 1:
        return <Award className="h-6 w-6 text-zinc-600 dark:text-zinc-400" /> // Мөнгөн цом
      case 2:
        return <Award className="h-6 w-6 text-amber-800 dark:text-amber-700" /> // Хүрэл цом
      default:
        return <span className="text-lg font-bold text-zinc-700 dark:text-zinc-300 w-6 text-center">{index + 1}.</span>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Таны ранк:</CardTitle>
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
            {activeTab === "completed" ? getRankDisplay(completedRank - 1) : getRankDisplay(createdRank - 1)}
            <Avatar className="h-10 w-10 border-2 border-zinc-300 dark:border-zinc-600">
              <AvatarImage src={currentUser.avatarSrc || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">{currentUser.name}</span>
            <span
              className={
                activeTab === "completed"
                  ? "ml-auto text-xl font-bold text-green-600 dark:text-green-400"
                  : "ml-auto text-xl font-bold text-yellow-600 dark:text-yellow-400"
              }
            >
              {activeTab === "completed" ? currentUser.completedSurveys : currentUser.createdSurveys}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completed" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-zinc-200 dark:bg-zinc-700">
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
              >
                Бөглөсөн судалгаа
              </TabsTrigger>
              <TabsTrigger
                value="created"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
              >
                Үүсгэсэн судалгаа
              </TabsTrigger>
            </TabsList>
            <TabsContent value="completed" className="mt-4">
              <div className="grid gap-4">
                {sortedByCompleted.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      {getRankDisplay(index)}
                      <Avatar className="h-10 w-10 border-2 border-zinc-300 dark:border-zinc-600">
                        <AvatarImage src={user.avatarSrc || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-lg font-medium">{user.name}</span>
                    </div>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {user.completedSurveys}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="created" className="mt-4">
              <div className="grid gap-4">
                {sortedByCreated.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      {getRankDisplay(index)}
                      <Avatar className="h-10 w-10 border-2 border-zinc-300 dark:border-zinc-600">
                        <AvatarImage src={user.avatarSrc || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-lg font-medium">{user.name}</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                      {user.createdSurveys}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
