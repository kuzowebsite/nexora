"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, ArrowDown, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface TransactionSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  type: "transfer" | "withdrawal" | "recharge"
  amount: number
  date: string
  time: string
  transactionId: string
  senderName?: string
  senderAvatar?: string
  recipientName?: string
  recipientAvatar?: string
  recipientAccount?: string // Added for recipient's account number
  purpose?: string
}

export function TransactionSuccessDialog({
  isOpen,
  onClose,
  type,
  amount,
  date,
  time,
  transactionId,
  senderName,
  senderAvatar,
  recipientName,
  recipientAvatar,
  recipientAccount,
  purpose,
}: TransactionSuccessDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(transactionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  let titleText = ""
  let senderLabel = ""
  let recipientLabel = ""

  switch (type) {
    case "transfer":
      titleText = "Гүйлгээ амжилттай!"
      senderLabel = "Илгээгч"
      recipientLabel = "Хүлээн авагч"
      break
    case "withdrawal":
      titleText = "Таталт амжилттай!"
      senderLabel = "Илгээгч"
      recipientLabel = "Хүлээн авагч"
      break
    case "recharge":
      titleText = "Цэнэглэлт амжилттай!"
      recipientLabel = "Хүлээн авагч" // For recharge, user is the recipient
      break
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md bg-zinc-900 text-white border-zinc-700 p-0 max-h-[90vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader className="flex flex-col items-center justify-center pt-8 px-4">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#A7F300] mb-4">
            <CheckCircle className="h-16 w-16 text-zinc-900" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center mb-2">{titleText}</DialogTitle>
          <DialogDescription className="text-center text-zinc-400 mb-6">
            {purpose && <span>{purpose}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="relative bg-zinc-800 rounded-lg mx-4 p-6 pb-4 mb-6 overflow-hidden">
          {/* Ticket cutouts - simplified with pseudo-elements for visual effect */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-900 rounded-full -ml-3" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-900 rounded-full -mr-3" />

          {(type === "transfer" || type === "withdrawal") && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 border-2 border-yellow-400">
                  <AvatarImage src={senderAvatar || "/placeholder.svg?height=40&width=40&text=И"} alt={senderName} />
                  <AvatarFallback>{senderName?.substring(0, 2).toUpperCase() || "И"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{senderName || "Үл мэдэгдэх"}</span>
                  <span className="text-sm text-zinc-400">{senderLabel}</span>
                </div>
              </div>
              <div className="flex items-center justify-center my-2">
                <ArrowDown className="h-6 w-6 text-zinc-400" />
              </div>
            </>
          )}

          {recipientName && (
            <div className="flex items-center gap-3 mb-4">
              {type !== "withdrawal" &&
                recipientName !== "Эрх баталгаажуулалт" && ( // Hide avatar for withdrawals and "Эрх баталгаажуулалт"
                  <Avatar className="h-12 w-12 border-2 border-yellow-400">
                    <AvatarImage
                      src={recipientAvatar || "/placeholder.svg?height=40&width=40&text=Х"}
                      alt={recipientName}
                    />
                    <AvatarFallback>{recipientName?.substring(0, 2).toUpperCase() || "Х"}</AvatarFallback>
                  </Avatar>
                )}
              <div className="flex flex-col">
                <span className="text-lg font-medium">{recipientName || "Үл мэдэгдэх"}</span>
                <span className="text-sm text-zinc-400">{recipientLabel}</span>
                {recipientAccount && <span className="text-xs text-zinc-500">{recipientAccount}</span>}
              </div>
            </div>
          )}

          <div className="border-t border-dashed border-zinc-600 my-4" />

          <div className="flex flex-col items-center justify-center mb-4">
            <span className="text-4xl font-bold text-[#A7F300]">{amount.toLocaleString()}₮</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
            <div className="flex flex-col">
              <span className="font-medium">Огноо</span>
              <span>{date}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-medium">Цаг</span>
              <span>{time}</span>
            </div>
            <div className="flex flex-col col-span-2 mt-2">
              <span className="font-medium">Гүйлгээний дугаар</span>
              <div className="flex items-center justify-between">
                <span>{transactionId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyClick}
                  className="text-zinc-400 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Гүйлгээний дугаар хуулах</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-6">
          <Button onClick={onClose} className="w-full bg-[#A7F300] text-zinc-900 hover:bg-[#8cdb00]">
            Ойлголоо
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
