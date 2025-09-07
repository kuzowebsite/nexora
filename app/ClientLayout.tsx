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
  const [isLoading, setIsLoading] = useState(true)
  const hideNav = pathname === "/auth/login"

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
      const hasSeenSplash = localStorage.getItem("hasSeenSplash")

      if (!hasSeenSplash) {
        const timer = setTimeout(() => {
          setShowSplash(false)
          localStorage.setItem("hasSeenSplash", "true")

          try {
            const loggedInStatus = localStorage.getItem("isLoggedIn")
            if (loggedInStatus === "true") {
              setIsLoggedIn(true)
            } else {
              setIsLoggedIn(false)
              if (pathname !== "/auth/login") {
                router.push("/auth/login")
              }
            }
          } catch (error) {
            console.error("Error checking login status:", error)
            setIsLoggedIn(false)
            if (pathname !== "/auth/login") {
              router.push("/auth/login")
            }
          }

          setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
      } else {
        setShowSplash(false)

        try {
          const loggedInStatus = localStorage.getItem("isLoggedIn")
          if (loggedInStatus === "true") {
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false)
            if (pathname !== "/auth/login") {
              router.push("/auth/login")
            }
          }
        } catch (error) {
          console.error("Error checking login status:", error)
          setIsLoggedIn(false)
          if (pathname !== "/auth/login") {
            router.push("/auth/login")
          }
        }

        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error in ClientLayout useEffect:", error)
      setShowSplash(false)
      setIsLoggedIn(false)
      setIsLoading(false)
      if (pathname !== "/auth/login") {
        router.push("/auth/login")
      }
    }
  }, [pathname, router, isClient])

  if (!isClient || isLoading) {
    return (
      <html lang="mn" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-zinc-600 dark:text-zinc-400">Ачааллаж байна...</p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  if (showSplash) {
    return (
      <html lang="mn" suppressHydrationWarning>
        <body className={inter.className}>
          <LoadingSplash />
        </body>
      </html>
    )
  }

  if (!isLoggedIn && pathname !== "/auth/login") {
    return (
      <html lang="mn" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-zinc-600 dark:text-zinc-400">Нэвтэрч байна...</p>
            </div>
          </div>
        </body>
      </html>
    )
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
