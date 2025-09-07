"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Video, FileText } from "lucide-react"

export default function CreateTrainingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalPrice: "",
    pricePerPerson: "",
    expectedParticipants: 0,
    modules: [] as any[],
  })

  const [currentModule, setCurrentModule] = useState({
    title: "",
    type: "",
    content: "",
    file: null as File | null,
  })

  // Нийт үнэ болон нэг хүний үнээс хүрэх ёстой хүний тоог тооцоолох
  const calculateExpectedParticipants = () => {
    const total = Number.parseFloat(formData.totalPrice) || 0
    const perPerson = Number.parseFloat(formData.pricePerPerson) || 0
    if (perPerson > 0) {
      const participants = Math.ceil(total / perPerson)
      setFormData((prev) => ({ ...prev, expectedParticipants: participants }))
    } else {
      setFormData((prev) => ({ ...prev, expectedParticipants: 0 }))
    }
  }

  // Үнэ өөрчлөгдөх үед тооцоолох
  const handlePriceChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTimeout(calculateExpectedParticipants, 100)
  }

  const addModule = () => {
    if (currentModule.title && currentModule.type) {
      setFormData((prev) => ({
        ...prev,
        modules: [...prev.modules, { ...currentModule, id: Date.now() }],
      }))
      setCurrentModule({ title: "", type: "", content: "", file: null })
    }
  }

  const removeModule = (moduleId: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCurrentModule((prev) => ({ ...prev, file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Сурчилгааны мэдээлэл:", formData)
    // Энд сурчилгаа хадгалах логик байх
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Шинэ сурчилгаа үүсгэх</h1>
          <p className="text-gray-600 dark:text-gray-400">Хэрэглэгчдэд зориулсан сурчилгааны контент үүсгэнэ үү</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Үндсэн мэдээлэл */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Үндсэн мэдээлэл
              </CardTitle>
              <CardDescription>Сурчилгааны нэр, тайлбар болон үнийн мэдээлэл</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Сурчилгааны нэр *</Label>
                <Input
                  id="title"
                  placeholder="Жишээ: JavaScript програмчлал"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Тайлбар *</Label>
                <Textarea
                  id="description"
                  placeholder="Сурчилгааны дэлгэрэнгүй тайлбар бичнэ үү..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Нийт үнэ (₮) *</Label>
                  <Input
                    id="totalPrice"
                    type="number"
                    placeholder="100000"
                    value={formData.totalPrice}
                    onChange={(e) => handlePriceChange("totalPrice", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerPerson">Нэг хүнд олгох үнэ (₮) *</Label>
                  <Input
                    id="pricePerPerson"
                    type="number"
                    placeholder="1000"
                    value={formData.pricePerPerson}
                    onChange={(e) => handlePriceChange("pricePerPerson", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Хүрэх ёстой хүний тоо</Label>
                  <div className="flex items-center h-10 px-3 py-2 border border-input bg-background rounded-md">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {formData.expectedParticipants} хүн
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сурчилгааны модулиуд */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Сурчилгааны модулиуд
              </CardTitle>
              <CardDescription>Сурчилгааны агуулгыг модулиудад хуваан зохион байгуулна уу</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Модул нэмэх хэсэг */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Шинэ модул нэмэх</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Модулын нэр *</Label>
                    <Input
                      placeholder="Жишээ: 1-р хичээл: Танилцуулга"
                      value={currentModule.title}
                      onChange={(e) => setCurrentModule((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Төрөл *</Label>
                    <Select
                      value={currentModule.type}
                      onValueChange={(value) => setCurrentModule((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Төрөл сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Видео хичээл</SelectItem>
                        <SelectItem value="image">Зураг</SelectItem>
                        <SelectItem value="text">Текст материал</SelectItem>
                        <SelectItem value="quiz">Асуулт хариулт</SelectItem>
                        <SelectItem value="assignment">Даалгавар</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Файл оруулах хэсэг - Видео эсвэл Зураг сонгосон үед гарна */}
                {(currentModule.type === "video" || currentModule.type === "image") && (
                  <div className="space-y-2">
                    <Label>{currentModule.type === "video" ? "Видео файл оруулах" : "Зураг файл оруулах"}</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept={currentModule.type === "video" ? "video/*" : "image/*"}
                        onChange={handleFileChange}
                        className="flex-1"
                      />
                      {currentModule.file && (
                        <span className="text-sm text-green-600 dark:text-green-400">✓ {currentModule.file.name}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Агуулга</Label>
                  <Textarea
                    placeholder="Модулын агуулга эсвэл тайлбар..."
                    value={currentModule.content}
                    onChange={(e) => setCurrentModule((prev) => ({ ...prev, content: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={addModule}>
                    Модул нэмэх
                  </Button>
                </div>
              </div>

              {/* Нэмэгдсэн модулиуд */}
              {formData.modules.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Нэмэгдсэн модулиуд ({formData.modules.length})</h4>
                  {formData.modules.map((module, index) => (
                    <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {module.type === "video" && "📹 Видео"}
                            {module.type === "image" && "🖼️ Зураг"}
                            {module.type === "text" && "📄 Текст"}
                            {module.type === "quiz" && "❓ Асуулт"}
                            {module.type === "assignment" && "📝 Даалгавар"}
                            {module.file && ` • ${module.file.name}`}
                          </p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeModule(module.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Хадгалах товчлуур */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Ноорог хадгалах
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Сурчилгаа нийтлэх
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
