import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Жишээ мэдэгдлүүд (бодит байдал дээр мэдээллийн сангаас авна)
const allNotifications = [
  { id: "n1", text: "Шинэ судалгаа нэмэгдлээ: Онлайн худалдаа", timestamp: "2025.07.30 14:30" },
  { id: "n2", text: "Таны судалгааг 5 хүн бөглөлөө.", timestamp: "2025.07.30 13:00" },
  { id: "n3", text: "Түрүүвч рүү 500₮ орлоо.", timestamp: "2025.07.30 11:45" },
  { id: "n4", text: "Таны үүсгэсэн судалгаа идэвхжлээ.", timestamp: "2025.07.29 16:00" },
  { id: "n5", text: "Шинэ апдейт гарлаа! Апп-аа шинэчилнэ үү.", timestamp: "2025.07.29 09:00" },
  { id: "n6", text: "Таны найзын хүсэлтийг хүлээн авлаа: Бат.", timestamp: "2025.07.28 18:30" },
  { id: "n7", text: "Таны судалгааг 10 хүн бөглөлөө.", timestamp: "2025.07.28 10:15" },
  { id: "n8", text: "Түрүүвчнээс 1000₮ татлаа.", timestamp: "2025.07.27 14:00" },
]

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white -ml-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Буцах</span>
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold ml-2">Бүх мэдэгдлүүд</CardTitle>
          </div>
          <CardDescription className="text-zinc-600 dark:text-zinc-300">Таны бүх мэдэгдлийн жагсаалт.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {allNotifications.length > 0 ? (
            allNotifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                <p className="text-sm font-medium">{notification.text}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{notification.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400 text-center py-8">Мэдэгдэл байхгүй байна.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
