"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, UsersRound, Trash2 } from "lucide-react" // Trash2 icon-ийг нэмэв
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog" // Dialog components-ийг нэмэв
import { useToast } from "@/hooks/use-toast" // useToast-ийг импортлов
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Message interface
interface Message {
  id: string
  user: string
  text: string
  timestamp: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const { toast } = useToast() // useToast-ийг эхлүүлэв

  // Long press болон устгах функцэд зориулсан state-үүд
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
  const [showDeleteIconForId, setShowDeleteIconForId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null)

  // Simulate a user ID for demonstration
  const [userId] = useState(() => `Хэрэглэгч ${Math.floor(Math.random() * 1000)}`)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: Date.now().toString(),
      user: userId,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prevMessages) => [...prevMessages, newMsg])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Мессеж дээр удаан дарах эхлэх үед
  const handleMouseDown = (messageId: string) => {
    setActiveMessageId(messageId)
    longPressTimerRef.current = setTimeout(() => {
      setShowDeleteIconForId(messageId)
    }, 2000) // 2 секунд
  }

  // Мессеж дээр дарахаа болих үед
  const handleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
    setActiveMessageId(null)
  }

  // Хулганы курсор мессежээс гарах үед (санамсаргүй устгахаас сэргийлнэ)
  const handleMouseLeave = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
    setActiveMessageId(null)
    setShowDeleteIconForId(null) // Hide icon if mouse leaves
  }

  // Устгах товчийг дарах үед
  const handleDeleteClick = (message: Message) => {
    setMessageToDelete(message)
    setIsDeleteDialogOpen(true)
    setShowDeleteIconForId(null) // Устгах товчийг шууд нууна
  }

  // Устгахыг баталгаажуулах үед
  const handleConfirmDelete = () => {
    if (messageToDelete) {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageToDelete.id))
      toast({
        title: "Амжилттай",
        description: "Зурвас амжилттай устгагдлаа.",
      })
      setMessageToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  // Устгахыг цуцлах үед
  const handleCancelDelete = () => {
    setMessageToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  return (
    <Card className="w-full max-w-md h-[70vh] flex flex-col bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
      <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-700 flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-center flex-1">Олон нийтийн чат</CardTitle>
        <Link href="/friends" passHref>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            <UsersRound className="h-6 w-6" />
            <span className="sr-only">Найзууд</span>
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            <p>Чат эхлүүлэх...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user === userId ? "justify-end" : "justify-start"}`}>
              {msg.user !== userId && (
                <Avatar className="h-8 w-8 border-2 border-yellow-400 mr-2 mt-auto">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${msg.user.substring(0, 2)}`}
                    alt={msg.user}
                  />
                  <AvatarFallback>{msg.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`relative max-w-[75%] p-3 rounded-lg ${
                  msg.user === userId
                    ? theme === "dark"
                      ? "bg-white text-zinc-900 rounded-br-none"
                      : "bg-zinc-900 text-white rounded-br-none"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-bl-none"
                }`}
                {...(msg.user === userId && {
                  // Only add handlers if it's the current user's message
                  onMouseDown: () => handleMouseDown(msg.id),
                  onMouseUp: handleMouseUp,
                  onMouseLeave: handleMouseLeave,
                  onTouchStart: () => handleMouseDown(msg.id),
                  onTouchEnd: handleMouseUp,
                })}
              >
                <div className="font-semibold text-sm mb-1">{msg.user === userId ? "Би" : msg.user}</div>
                <p className="text-sm">{msg.text}</p>
                <div
                  className={`text-xs text-right mt-1 ${
                    msg.user === userId
                      ? theme === "dark"
                        ? "text-zinc-600"
                        : "text-zinc-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
                {showDeleteIconForId === msg.id &&
                  msg.user === userId && ( // Only show delete icon for current user's message
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(msg)}
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md"
                      aria-label="Зурвас устгах"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </CardContent>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Зурвас бичих..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          size="icon"
          aria-label="Зурвас илгээх"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
          <DialogHeader>
            <DialogTitle>Зурвас устгах</DialogTitle>
            <DialogDescription>
              Та "<span className="font-bold text-red-500">{messageToDelete?.text}</span>" зурвасыг устгахдаа итгэлтэй
              байна уу? Энэ үйлдлийг буцаах боломжгүй.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              className="bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              Цуцлах
            </Button>
            <Button onClick={handleConfirmDelete} className="bg-red-500 text-white hover:bg-red-600">
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
