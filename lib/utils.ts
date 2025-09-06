import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCompletedSurveyIds(): string[] {
  if (typeof window === "undefined") {
    return []
  }
  const storedIds = localStorage.getItem("completedSurveyIds")
  return storedIds ? JSON.parse(storedIds) : []
}

export function addCompletedSurveyId(id: string) {
  if (typeof window === "undefined") {
    return
  }
  const currentIds = getCompletedSurveyIds()
  if (!currentIds.includes(id)) {
    localStorage.setItem("completedSurveyIds", JSON.stringify([...currentIds, id]))
  }
}
