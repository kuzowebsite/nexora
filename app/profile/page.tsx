"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Edit, ListChecks, Save, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Location data for Mongolia
const mongoliaLocations = {
  provinces: [
    "Архангай",
    "Баян-Өлгий",
    "Баянхонгор",
    "Булган",
    "Говь-Алтай",
    "Говьсүмбэр",
    "Дархан-Уул",
    "Дорноговь",
    "Дорнод",
    "Дундговь",
    "Завхан",
    "Орхон",
    "Өвөрхангай",
    "Өмнөговь",
    "Сүхбаатар",
    "Сэлэнгэ",
    "Төв",
    "Увс",
    "Ховд",
    "Хөвсгөл",
    "Хэнтий",
  ],
  ulaanbaatarDistricts: [
    "Багануур",
    "Багахангай",
    "Баянгол",
    "Баянзүрх",
    "Налайх",
    "Сонгинохайрхан",
    "Сүхбаатар",
    "Хан-Уул",
    "Чингэлтэй",
  ],
}

export default function UserProfilePage() {
  const [user, setUser] = useState({
    name: "Очир Бат",
    email: "ochir.bat@example.com",
    gender: "Эрэгтэй",
    age: 28,
    phoneNumber: "99112233",
    location: "Улаанбаатар",
    completedSurveys: 15,
    createdSurveys: 3,
    avatarSrc: "/placeholder.svg?height=64&width=64",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user.name)
  const [editedEmail, setEditedEmail] = useState(user.email)
  const [editedGender, setEditedGender] = useState(user.gender)
  const [editedAge, setEditedAge] = useState(user.age)
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(user.phoneNumber)
  const [editedLocation, setEditedLocation] = useState(user.location)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    setUser({
      ...user,
      name: editedName,
      email: editedEmail,
      gender: editedGender,
      age: editedAge,
      phoneNumber: editedPhoneNumber,
      location: editedLocation,
    })
    setIsEditing(false)
    alert("Профайл амжилттай хадгалагдлаа!")
  }

  const handleCancel = () => {
    setEditedName(user.name)
    setEditedEmail(user.email)
    setEditedGender(user.gender)
    setEditedAge(user.age)
    setEditedPhoneNumber(user.phoneNumber)
    setEditedLocation(user.location)
    setIsEditing(false)
  }

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, avatarSrc: reader.result as string }))
        alert("Профайл зураг амжилттай солигдлоо!")
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Хэрэглэгчийн мэдээлэл */}
        <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className={`relative ${isEditing ? "cursor-pointer" : ""}`} onClick={handleAvatarClick}>
              <Avatar className="h-16 w-16 border-2 border-yellow-400">
                <AvatarImage
                  src={
                    user.avatarSrc && !user.avatarSrc.startsWith("/placeholder.svg")
                      ? user.avatarSrc
                      : user.gender === "Эрэгтэй"
                        ? "/images/male.avif"
                        : user.gender === "Эмэгтэй"
                          ? "/images/female.avif"
                          : "/placeholder.svg?height=64&width=64"
                  }
                  alt="Хэрэглэгчийн зураг"
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-zinc-200 dark:bg-zinc-700 rounded-full p-1 border border-zinc-300 dark:border-zinc-600">
                  <Edit className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="grid gap-2">
                  <Label htmlFor="edit-name" className="sr-only">
                    Нэр
                  </Label>
                  <Input
                    id="edit-name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                  />
                  <Label htmlFor="edit-email" className="sr-only">
                    Имэйл
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                  />
                  {/* Хүйс сонгох хэсэг */}
                  <div className="grid gap-2">
                    <Label htmlFor="edit-gender">Хүйс</Label>
                    <Select onValueChange={setEditedGender} value={editedGender}>
                      <SelectTrigger
                        id="edit-gender"
                        className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                      >
                        <SelectValue placeholder="Хүйсээ сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                        <SelectItem value="Эрэгтэй">Эрэгтэй</SelectItem>
                        <SelectItem value="Эмэгтэй">Эмэгтэй</SelectItem>
                        <SelectItem value="Бусад">Бусад</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Байршил сонгох хэсэг */}
                  <div className="grid gap-2">
                    <Label htmlFor="edit-location">Байршил</Label>
                    <Select onValueChange={setEditedLocation} value={editedLocation}>
                      <SelectTrigger
                        id="edit-location"
                        className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                      >
                        <SelectValue placeholder="Байршил сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 max-h-60">
                        <SelectItem value="Улаанбаатар">Улаанбаатар</SelectItem>
                        {mongoliaLocations.ulaanbaatarDistricts.map((district) => (
                          <SelectItem key={district} value={`УБ-${district}`}>
                            УБ - {district}
                          </SelectItem>
                        ))}
                        {mongoliaLocations.provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Нас болон Утасны дугаар */}
                  <Label htmlFor="edit-age" className="sr-only">
                    Нас
                  </Label>
                  <Input
                    id="edit-age"
                    type="number"
                    placeholder="Нас"
                    value={editedAge}
                    onChange={(e) => setEditedAge(Number.parseInt(e.target.value) || 0)}
                    className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                  />
                  <Label htmlFor="edit-phone" className="sr-only">
                    Утасны дугаар
                  </Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    placeholder="Утасны дугаар"
                    value={editedPhoneNumber}
                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                  />
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-zinc-600 dark:text-zinc-300">{user.email}</CardDescription>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1">Хүйс: {user.gender}</p>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm">Байршил: {user.location}</p>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm">Нас: {user.age}</p>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm">Утасны дугаар: {user.phoneNumber}</p>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Хадгалах
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <X className="mr-2 h-4 w-4" />
                  Цуцлах
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <Edit className="mr-2 h-4 w-4" />
                Профайл засах
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Судалгааны статистик */}
        <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-xl">Судалгааны статистик</CardTitle>
            <ListChecks className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-lg">
                <span>Бөглөсөн судалгаа:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{user.completedSurveys}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span>Үүсгэсэн судалгаа:</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">{user.createdSurveys}</span>
              </div>
            </div>
            <Link href="/profile/my-surveys" passHref>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                Миний үүсгэсэн судалгаанууд
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
