"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Toaster } from "@/components/ui/toaster"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import LoadingSplash from "@/components/loading-splash"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const hideNav = pathname === "/auth/login"

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const hasSeenSplash = localStorage.getItem("hasSeenSplash")

    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem("hasSeenSplash", "true")
        const loggedInStatus = localStorage.getItem("isLoggedIn")
        if (loggedInStatus === "true") {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          if (pathname !== "/auth/login") {
            router.push("/auth/login")
          }
        }
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setShowSplash(false)
      const loggedInStatus = localStorage.getItem("isLoggedIn")
      if (loggedInStatus === "true") {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        if (pathname !== "/auth/login") {
          router.push("/auth/login")
        }
      }
    }
  }, [pathname, router, isClient])

  if (!isClient) {
    return (
      <html lang="mn" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    )
  }

  if (showSplash) {
    return <LoadingSplash />
  }

  if (!isLoggedIn && pathname !== "/auth/login") {
    return null
  }

  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
            {!hideNav && <Header className="hidden md:flex" />}
            <main className={`flex-1 ${hideNav ? "pb-0" : "pb-16 md:pb-0"}`}>{children}</main>
            {!hideNav && <BottomNavigation />}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
