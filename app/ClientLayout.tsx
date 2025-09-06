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
import LoadingSplash from "@/components/loading-splash" // Import LoadingSplash

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSplash, setShowSplash] = useState(true) // State to control splash screen visibility
  const hideNav = pathname === "/auth/login"

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash")

    if (!hasSeenSplash) {
      // Show splash for a duration if not seen before
      const timer = setTimeout(() => {
        setShowSplash(false)
        localStorage.setItem("hasSeenSplash", "true") // Mark splash as seen
        // After splash, proceed with login check
        const loggedInStatus = localStorage.getItem("isLoggedIn")
        if (loggedInStatus === "true") {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          if (pathname !== "/auth/login") {
            router.push("/auth/login")
          }
        }
      }, 2000) // Show splash for 2 seconds

      return () => clearTimeout(timer) // Cleanup timer
    } else {
      // If splash has been seen, hide it immediately and proceed with login check
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
  }, [pathname, router])

  if (showSplash) {
    return <LoadingSplash />
  }

  // Only render children if logged in or on the login page
  if (!isLoggedIn && pathname !== "/auth/login") {
    return null // Or a loading spinner, to prevent flickering before redirect
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
