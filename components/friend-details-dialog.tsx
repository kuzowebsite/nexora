"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Ban, UserCheck } from "lucide-react" // Ban, UserCheck иконууд нэмэв

interface FriendDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  friendName: string
  isBlocked: boolean
  onDelete: () => void
  onToggleBlock: () => void
}

export function FriendDetailsDialog({
  isOpen,
  onClose,
  friendName,
  isBlocked,
  onDelete,
  onToggleBlock,
}: FriendDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md bg-zinc-900 text-white border-zinc-700">
        <DialogHeader>
          <DialogTitle>{friendName}-ийн дэлгэрэнгүй мэдээлэл</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Та энэ хэрэглэгчтэй холбоотой үйлдлүүдийг хийх боломжтой.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
            onClick={onToggleBlock}
          >
            {isBlocked ? (
              <>
                <UserCheck className="mr-2 h-5 w-5 text-green-500" />
                Блокийг цуцлах
              </>
            ) : (
              <>
                <Ban className="mr-2 h-5 w-5 text-red-500" />
                Блоклох
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent border-zinc-700 text-red-500 hover:bg-zinc-800 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Найзыг устгах
          </Button>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
          >
            Хаах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
