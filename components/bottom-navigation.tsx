"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, Wallet, Briefcase, MessageSquare, X, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function BottomNavigation() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const navItems = [
    {
      name: "Нүүр",
      href: "/",
      icon: Home,
    },
    {
      name: "Ранк",
      href: "/rank",
      icon: Trophy,
    },
    {
      name: "Түрүүвч",
      href: "/wallet",
      icon: Wallet,
    },
    {
      name: "Ажил",
      href: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Чат",
      href: "/chat",
      icon: MessageSquare,
    },
  ]

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300",
        isExpanded
          ? "h-16 bg-white border-t border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
          : "h-8 bg-transparent border-t border-transparent",
      )}
    >
      <div className="relative h-full flex items-center justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "absolute right-2 p-1 rounded-full text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors",
            "top-[-14px] -translate-y-1/2",
          )}
          aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
        >
          {isExpanded ? <X className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </button>

        {isExpanded && (
          <div className="flex h-full items-center justify-between w-full px-4 md:justify-around md:px-2 md:pr-10">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center transition-colors gap-1",
                    isActive
                      ? "text-yellow-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                  )}
                >
                  <Icon
                    className={cn("transition-all duration-200", item.name === "Түрүүвч" ? "h-8 w-8" : "h-5 w-5")}
                  />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
