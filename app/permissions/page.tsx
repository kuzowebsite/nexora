"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react" // Check icon-ийг нэмэв
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TransactionSuccessDialog } from "@/components/transaction-success-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Avatar-ийг импортлов

interface InvitedUser {
  id: string
  name: string
  avatarSrc: string
  inviteDate: string
}

export default function PermissionsPage() {
  // Жишээ нь, хэрэглэгч баталгаажсан эсэхийг шалгах state
  // Бодит байдал дээр энэ мэдээлэл мэдээллийн сангаас ирнэ
  const [isVerified, setIsVerified] = useState(true) // For demonstration, set to true
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [totalPermissions, setTotalPermissions] = useState(1250) // Жишээ эрхийн тоо
  const [copied, setCopied] = useState(false) // Хуулсан эсэхийг хянах state
  const [verificationAmount] = useState(15000) // Баталгаажуулах төлбөр
  const [isPaymentConfirmDialogOpen, setIsPaymentConfirmDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successDialogData, setSuccessDialogData] = useState<{
    type: "transfer" | "withdrawal" | "recharge"
    amount: number
    date: string
    time: string
    transactionId: string
    senderName?: string
    senderAvatar?: string
    recipientName?: string
    recipientAvatar?: string
    recipientAccount?: string
    purpose?: string
  } | null>(null)

  // Added user info for sender
  const userName = "Очир Бат" // Replace with actual user name from context/auth
  const userAvatarSrc = "/placeholder.svg?height=40&width=40&text=ОБ" // Replace with actual user avatar from context/auth

  const inviteLink = "https://your-app.com/invite/your_referral_code" // Найзаа урих жишээ линк

  // Жишээ уригдсан хүмүүсийн жагсаалт
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([
    {
      id: "inv1",
      name: "Ариунболд",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=АБ",
      inviteDate: "2025.07.20",
    },
    {
      id: "inv2",
      name: "Гантулга",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=ГТ",
      inviteDate: "2025.07.18",
    },
    { id: "inv3", name: "Дөлгөөн", avatarSrc: "/placeholder.svg?height=40&width=40&text=ДЛ", inviteDate: "2025.07.15" },
    { id: "inv4", name: "Энхтуул", avatarSrc: "/placeholder.svg?height=40&width=40&text=ЭТ", inviteDate: "2025.07.10" },
    {
      id: "inv5",
      name: "Баярсайхан",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=БС",
      inviteDate: "2025.07.05",
    },
    {
      id: "inv6",
      name: "Цэцэгмаа",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=ЦМ",
      inviteDate: "2025.07.01",
    },
    { id: "inv7", name: "Хулан", avatarSrc: "/placeholder.svg?height=40&width=40&text=ХЛ", inviteDate: "2025.06.28" },
    {
      id: "inv8",
      name: "Тэмүүжин",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=ТМ",
      inviteDate: "2025.06.25",
    },
  ])

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 10000) // 10 секундын дараа буцаана
  }

  const handleVerifyClick = () => {
    setIsPaymentConfirmDialogOpen(true)
  }

  const handleConfirmPayment = () => {
    // Бодит аппликейшнд энд түрүүвчнээс мөнгө хасах сервер талын логик байна.
    // Одоохондоо зөвхөн төлөвийг өөрчилж, амжилттай мессеж харуулна.
    const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()
    const now = new Date()

    setSuccessDialogData({
      type: "transfer",
      amount: verificationAmount,
      date: now.toLocaleDateString("mn-MN"),
      time: now.toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" }),
      transactionId: transactionId,
      senderName: userName, // Use actual user name
      senderAvatar: userAvatarSrc, // Use actual user avatar
      recipientName: "Эрх баталгаажуулалт", // Change recipient name
      recipientAvatar: undefined, // No avatar for recipient
      purpose: "Эрх баталгаажуулах төлбөр",
    })
    setIsSuccessDialogOpen(true)
    setIsVerified(true)
    setIsPaymentConfirmDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4">{/* Гарчиг болон буцах товчийг арилгав */}</CardHeader>
        <CardContent className="grid gap-6">
          {!isVerified ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Таны эрх баталгаажаагүй байна!</h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Та эрх баталгаажуулсан аар судалгаанд хамрагдах боломжтой болно.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                Та баталгаажуулахын тулд{" "}
                <span className="font-bold text-yellow-600 dark:text-yellow-400">{verificationAmount}₮</span> төлнө үү.
              </p>
              <Button
                onClick={handleVerifyClick}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Төлөх
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Таны эрх баталгаажсан байна!</h2>
              <div className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md mb-6">
                <p className="text-lg font-medium">
                  Нийт эрх: <span className="font-bold text-yellow-600 dark:text-yellow-400">{totalPermissions}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md mb-4 text-left">
                <p className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{inviteLink}</p>
                <Button
                  onClick={handleCopyClick}
                  variant="ghost"
                  size="icon"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Линк хуулах</span>
                </Button>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 text-left">
                Та өөрийн линк хуулж аваад бусдад түгээх зарчимаар хүн урих боломжтой.
              </p>
            </div>
          )}

          {isVerified && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Урилгын урамшуулал</h2>
              <Tabs defaultValue="instructions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-zinc-200 dark:bg-zinc-700 mb-4">
                  <TabsTrigger
                    value="instructions"
                    className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
                  >
                    Заавар
                  </TabsTrigger>
                  <TabsTrigger
                    value="my-invited"
                    className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
                  >
                    Миний урисан хүмүүс
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="instructions">
                  <Card className="bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-md">
                    <CardContent className="p-4 grid gap-3">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        Та хүн уриснаар эрх авах боломжтой. Та олон хүн урих тусам урамшуулалын эрх нэмэгдэх болно.
                      </p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        Таны урисан хүнд бүртгэлийн 5 эрх дээр нэмээд 5 эрх нэмэгдэх болно.
                      </p>
                      <div className="grid gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                        <p>
                          <span className="font-bold">1 хүн урих:</span> 2 эрх
                        </p>
                        <p>
                          <span className="font-bold">2 хүн урих:</span> 4 эрх
                        </p>
                        <p>
                          <span className="font-bold">3 хүн урих:</span> 6 эрх
                        </p>
                        <p>
                          <span className="font-bold">4 хүн урих:</span> 8 эрх
                        </p>
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        гэх мэт өсөлтөөр урамшуулал олгогдох болно.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="my-invited">
                  <Card className="bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-md">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Урисан хүмүүсийн жагсаалт</h3>
                      <div className="max-h-[300px] overflow-y-auto pr-2">
                        {invitedUsers.length > 0 ? (
                          invitedUsers.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-3 p-2 mb-2 bg-zinc-200 dark:bg-zinc-600 rounded-md"
                            >
                              <Avatar className="h-10 w-10 border-2 border-yellow-400">
                                <AvatarImage src={user.avatarSrc || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-base font-medium">{user.name}</span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                                  Урьсан огноо: {user.inviteDate}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center py-4">
                            Та одоогоор хүн уриагүй байна.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Payment Confirmation Dialog */}
          <Dialog open={isPaymentConfirmDialogOpen} onOpenChange={setIsPaymentConfirmDialogOpen}>
            <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
              <DialogHeader>
                <DialogTitle>Баталгаажуулах</DialogTitle>
                <DialogDescription>
                  Та эрхээ баталгаажуулахын тулд{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">{verificationAmount}₮</span> төлөх гэж
                  байна. Үргэлжлүүлэх үү?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPaymentConfirmDialogOpen(false)}
                  className="bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Цуцлах
                </Button>
                <Button
                  onClick={handleConfirmPayment}
                  className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                >
                  Төлөх
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {successDialogData && (
            <TransactionSuccessDialog
              isOpen={isSuccessDialogOpen}
              onClose={() => setIsSuccessDialogOpen(false)}
              type={successDialogData.type}
              amount={successDialogData.amount}
              date={successDialogData.date}
              time={successDialogData.time}
              transactionId={successDialogData.transactionId}
              senderName={successDialogData.senderName}
              senderAvatar={successDialogData.senderAvatar}
              recipientName={successDialogData.recipientName}
              recipientAvatar={successDialogData.recipientAvatar}
              recipientAccount={successDialogData.recipientAccount}
              purpose={successDialogData.purpose}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
