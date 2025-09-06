"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Хяналтын самбар
      </Link>
      <Link
        href="/auth/login"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/auth/login" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Нэвтрэх
      </Link>
      <Link
        href="/profile"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/profile" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Профайл
      </Link>
    </nav>
  )
}
