"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useState } from "react"

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  friendName: string
  isBlocked: boolean
}

export function ChatDialog({ isOpen, onClose, friendName, isBlocked }: ChatDialogProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim() && !isBlocked) {
      console.log(`Sending message to ${friendName}: ${message}`)
      setMessage("")
      // Энд чат илгээх логикийг нэмнэ
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md bg-zinc-900 text-white border-zinc-700">
        <DialogHeader>
          <DialogTitle>{friendName}-тэй чатлах</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isBlocked ? (
              <span className="text-red-500">Та энэ хэрэглэгчийг блоклосон тул чат бичих боломжгүй.</span>
            ) : (
              "Та энэ хэрэглэгчтэй шууд чатлах боломжтой."
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex-1 h-48 overflow-y-auto p-2 border border-zinc-700 rounded-md bg-zinc-800 text-zinc-300">
            {/* Энд чатын мессежүүд харагдана */}
            <p className="text-center text-zinc-500">Одоогоор чатын түүх байхгүй байна.</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Мессеж бичих..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              disabled={isBlocked}
            />
            <Button onClick={handleSendMessage} disabled={isBlocked}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Илгээх</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
