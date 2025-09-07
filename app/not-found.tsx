import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="text-center p-8">
        <h2 className="text-6xl font-bold text-zinc-900 dark:text-white mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Хуудас олдсонгүй</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Таны хайж буй хуудас олдсонгүй эсвэл устгагдсан байна.</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Нүүр хуудас руу буцах</Button>
        </Link>
      </div>
    </div>
  )
}
