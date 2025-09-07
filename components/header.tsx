"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Moon, Sun, User, LogOut, PlusCircle, ShoppingCart, LifeBuoy, GraduationCap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useTheme } from "next-themes"

export function Header() {
  const [user, setUser] = useState({
    name: "Очир Бат",
    email: "ochir.bat@example.com",
    gender: "Эрэгтэй",
    avatarSrc: "",
  })

  const { theme, setTheme } = useTheme()

  const notifications = [
    { id: "n1", text: "Шинэ судалгаа нэмэгдлээ: Онлайн худалдаа", timestamp: "10 минутын өмнө" },
    { id: "n2", text: "Таны судалгааг 5 хүн бөглөлөө.", timestamp: "1 цагийн өмнө" },
    { id: "n3", text: "Түрүүвч рүү 500₮ орлоо.", timestamp: "3 цагийн өмнө" },
  ]

  const getAvatarSrc = () => {
    if (user.avatarSrc && !user.avatarSrc.startsWith("/placeholder.svg")) {
      return user.avatarSrc
    } else if (user.gender === "Эрэгтэй") {
      return "/images/male.avif"
    } else if (user.gender === "Эмэгтэй") {
      return "/images/female.avif"
    }
    return "/placeholder.svg?height=40&width=40"
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white text-zinc-900 border-b border-zinc-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-800">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="h-10 w-10 border-2 border-yellow-400">
                  <AvatarImage src={getAvatarSrc() || "/placeholder.svg"} alt="Хэрэглэгчийн зураг" />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-2">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Сайн уу, {user.name}</span>
                  <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                    {theme === "dark" ? <Sun className="h-3 w-3 mr-1" /> : <Moon className="h-3 w-3 mr-1" />}
                    <span>23°C</span>
                    <span className="mx-2">•</span>
                    <span>2025 оны 5-р сарын 23, Баасан</span>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Avatar className="h-12 w-12 border-2 border-yellow-400">
                  <AvatarImage src={getAvatarSrc() || "/placeholder.svg"} alt="Хэрэглэгчийн зураг" />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs text-zinc-400">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Профайл</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/permissions"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Эрх</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/create-survey"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Судалгаа нэмэх</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/create-training"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Сурчилгаа нэмэх</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/purchase"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>Худалдан авалт</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/help"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Тусламж</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/auth/login"
                  className="flex items-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Гарах</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          {theme === "dark" ? (
            <Sun
              className="h-5 w-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
              onClick={() => setTheme("light")}
            />
          ) : (
            <Moon
              className="h-5 w-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
              onClick={() => setTheme("dark")}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Bell className="h-5 w-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700">
              <DropdownMenuLabel>Мэдэгдлүүд</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
              {notifications.length > 0 ? (
                notifications.slice(0, 3).map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start px-2 py-1.5">
                    <span className="text-sm font-medium">{notification.text}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{notification.timestamp}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-zinc-500 dark:text-zinc-400">Мэдэгдэл байхгүй.</DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
              <DropdownMenuItem asChild>
                <Link
                  href="/notifications"
                  className="flex items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 px-2 py-1.5 rounded-sm text-yellow-600 dark:text-yellow-400"
                >
                  Дэлгэрэнгүй
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
