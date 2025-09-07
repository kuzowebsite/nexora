"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Edit, Trash2, Users, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data for user's created trainings
const userTrainings = [
  {
    id: 1,
    title: "JavaScript програмчлалын үндэс",
    description: "JavaScript хэлний үндсийг сурах сурчилгаа",
    category: "Програмчлал",
    level: "Анхан шат",
    totalPrice: 50000,
    pricePerPerson: 5000,
    targetParticipants: 10,
    currentParticipants: 7,
    status: "Идэвхтэй",
    createdAt: "2024-01-15",
    modules: 8,
    image: "/javascript-programming-course.png",
  },
  {
    id: 2,
    title: "UX/UI дизайны мастер класс",
    description: "Хэрэглэгчийн туршлага болон интерфейсийн дизайн",
    category: "Дизайн",
    level: "Дунд шат",
    totalPrice: 80000,
    pricePerPerson: 8000,
    targetParticipants: 10,
    currentParticipants: 10,
    status: "Дууссан",
    createdAt: "2024-01-10",
    modules: 12,
    image: "/ux-ui-masterclass.png",
  },
]

export default function MyTrainingsPage() {
  const [trainings] = useState(userTrainings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || training.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Идэвхтэй":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Дууссан":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Ноорог":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Миний үүсгэсэн сурчилгаанууд</h1>
            <p className="text-zinc-600 dark:text-zinc-300 mt-2">
              Таны үүсгэсэн сурчилгаануудын жагсаалт болон статистик
            </p>
          </div>
          <Link href="/create-training">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Шинэ сурчилгаа үүсгэх</Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white dark:bg-zinc-800">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  placeholder="Сурчилгаа хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-50 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-zinc-50 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <SelectItem value="all">Бүгд</SelectItem>
                    <SelectItem value="Идэвхтэй">Идэвхтэй</SelectItem>
                    <SelectItem value="Дууссан">Дууссан</SelectItem>
                    <SelectItem value="Ноорог">Ноорог</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trainings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrainings.map((training) => (
            <Card key={training.id} className="bg-white dark:bg-zinc-800 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getStatusColor(training.status)}>{training.status}</Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg text-zinc-900 dark:text-white line-clamp-2">{training.title}</CardTitle>
                <CardDescription className="text-zinc-600 dark:text-zinc-300 line-clamp-2">
                  {training.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">Ангилал:</span>
                    <Badge variant="outline" className="text-xs">
                      {training.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">Модулийн тоо:</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{training.modules}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Оролцогчид:
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {training.currentParticipants}/{training.targetParticipants}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Нийт үнэ:
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {training.totalPrice.toLocaleString()}₮
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">Үүсгэсэн:</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {new Date(training.createdAt).toLocaleDateString("mn-MN")}
                    </span>
                  </div>

                  {/* Progress bar for participants */}
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(training.currentParticipants / training.targetParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <Card className="bg-white dark:bg-zinc-800">
            <CardContent className="p-12 text-center">
              <div className="text-zinc-400 dark:text-zinc-500 mb-4">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Сурчилгаа олдсонгүй</p>
                <p className="text-sm mt-2">
                  {searchTerm || statusFilter !== "all"
                    ? "Хайлтын үр дүн олдсонгүй. Өөр түлхүүр үг ашиглан хайж үзнэ үү."
                    : "Та одоогоор ямар ч сурчилгаа үүсгээгүй байна."}
                </p>
              </div>
              {!searchTerm && statusFilter === "all" && (
                <Link href="/create-training">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Анхны сурчилгаагаа үүсгэх</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
