"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Fingerprint } from "lucide-react"

interface FingerprintDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onDecline: () => void
}

export default function FingerprintDialog({ isOpen, onClose, onConfirm, onDecline }: FingerprintDialogProps) {
  const [isScanning, setIsScanning] = useState(false)

  const handleConfirm = async () => {
    setIsScanning(true)
    // Simulate fingerprint scan
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsScanning(false)
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-800">
        <DialogHeader className="text-center">
          <Fingerprint className="h-16 w-16 mx-auto mb-4 text-white" />
          <DialogTitle className="text-white">Та цаашид нэвтрэхдээ FINGERPRINT ашиглах уу?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            FINGERPRINT-г идэвхжүүлснээр цаашид сайт руу нэвтрэхэд Утасны дугаар, И-мэйл, Фэйсбүүк, ID бичих
            шаардлагагүй.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onDecline}
            className="w-full sm:w-auto bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            Татгалзах
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isScanning}
            className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-200"
          >
            {isScanning ? "Уншуулж байна..." : "Зөвшөөрөх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
