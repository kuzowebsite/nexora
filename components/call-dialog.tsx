"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, PhoneOff, Mic, Camera } from "lucide-react"
import { useState, useEffect } from "react"

interface CallDialogProps {
  isOpen: boolean
  onClose: () => void
  friendName: string
  friendAvatarSrc: string
}

export function CallDialog({ isOpen, onClose, friendName, friendAvatarSrc }: CallDialogProps) {
  const [callStatus, setCallStatus] = useState<"Calling" | "Connected" | "Ended">("Calling")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCallStatus("Calling")
      setIsMuted(false)
      setIsVideoOn(false)
      // Дуудлага холбогдохыг симуляц хийх
      const timer = setTimeout(() => {
        setCallStatus("Connected")
      }, 3000) // 3 секундын дараа холбогдсон болгох
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleEndCall = () => {
    setCallStatus("Ended")
    onClose()
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOn(!isVideoOn)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-md p-0 overflow-hidden bg-zinc-900 text-white border-none">
        <div
          className="relative flex flex-col items-center justify-between h-[calc(100vh-10rem)] sm:h-[600px] bg-cover bg-center p-6"
          style={{ backgroundImage: `url('/images/call-background.png')` }}
        >
          <div className="absolute top-4 left-0 right-0 text-center text-zinc-300 text-sm">end-to-end encrypted</div>

          {callStatus === "Calling" && (
            <>
              <Avatar className="h-28 w-28 border-4 border-yellow-400 mt-20">
                <AvatarImage src={friendAvatarSrc || "/placeholder.svg"} alt={friendName} />
                <AvatarFallback>{friendName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold mt-4">{friendName}</h2>
              <p className="text-zinc-300 text-lg">Дуудаж байна...</p>
            </>
          )}

          {callStatus === "Connected" && (
            <div className="flex flex-col items-center justify-center h-full w-full">
              {isVideoOn ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Энд видео стрим харагдана */}
                  <img
                    src="/images/female-caller.png"
                    alt="Video Stream"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 h-24 w-20 rounded-lg overflow-hidden border-2 border-white">
                    <img src="/images/alex-mayer.png" alt="Your Video" className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-28 w-28 border-4 border-yellow-400 mt-20">
                    <AvatarImage src={friendAvatarSrc || "/placeholder.svg"} alt={friendName} />
                    <AvatarFallback>{friendName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-3xl font-bold mt-4">{friendName}</h2>
                  <p className="text-green-400 text-lg">Холбогдсон</p>
                </>
              )}
            </div>
          )}

          <div className="flex justify-center gap-6 w-full mb-6">
            <Button
              variant="ghost"
              size="icon"
              className={`h-14 w-14 rounded-full ${isVideoOn ? "bg-yellow-600" : "bg-zinc-700"} text-white hover:bg-yellow-700`}
              onClick={toggleVideo}
            >
              <Video className="h-7 w-7" />
              <span className="sr-only">{isVideoOn ? "Видеог унтраах" : "Видеог асаах"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 rounded-full bg-red-600 text-white hover:bg-red-700"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-7 w-7" />
              <span className="sr-only">Дуудлага таслах</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-14 w-14 rounded-full ${isMuted ? "bg-yellow-600" : "bg-zinc-700"} text-white hover:bg-yellow-700`}
              onClick={toggleMute}
            >
              <Mic className="h-7 w-7" />
              <span className="sr-only">{isMuted ? "Дууг нээх" : "Дууг хаах"}</span>
            </Button>
            {/* Камер солих товчлуур (зөвхөн видео дуудлага идэвхтэй үед) */}
            {isVideoOn && (
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
              >
                <Camera className="h-7 w-7" />
                <span className="sr-only">Камер солих</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
