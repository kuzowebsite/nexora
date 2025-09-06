"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LinearSegment {
  id: string
  label: string
  subLabel: string
  imageSrc: string
  value: number // Prize value
  weight: number // Probability weight
  bgColor?: string
}

interface LinearWheelProps {
  onSpinComplete: (segment: LinearSegment) => void
  availableSpins: number
  setAvailableSpins: React.Dispatch<React.SetStateAction<number>>
}

const linearSegments: LinearSegment[] = [
  {
    id: "item1",
    label: "SCAR-20 | Cyrex",
    subLabel: "",
    imageSrc: "/placeholder.svg?height=150&width=200",
    value: 0,
    weight: 15,
    bgColor: "#5A189A", // Deep purple
  },
  {
    id: "item2",
    label: "M4A4 | X-Ray",
    subLabel: "",
    imageSrc: "/placeholder.svg?height=150&width=200",
    value: 0,
    weight: 20,
    bgColor: "#8B0000", // Dark red
  },
  {
    id: "item3",
    label: "★ Karambit | Rust Co...",
    subLabel: "",
    imageSrc: "/placeholder.svg?height=150&width=200",
    value: 0,
    weight: 10,
    bgColor: "#B8860B", // Dark goldenrod
  },
  {
    id: "item4",
    label: "★ Falchion Knife | St...",
    subLabel: "",
    imageSrc: "/placeholder.svg?height=150&width=200",
    value: 0,
    weight: 25,
    bgColor: "#B8860B", // Dark goldenrod
  },
  {
    id: "item5",
    label: "★ Driver Gloves | Dia...",
    subLabel: "",
    imageSrc: "/placeholder.svg?height=150&width=200",
    value: 0,
    weight: 25,
    bgColor: "#B8860B", // Dark goldenrod
  },
]

const ITEM_WIDTH = 160 // Width of each item card in pixels
const REPEAT_COUNT = 30 // Increased repeat count to allow for more spins and smoother appearance
const MIN_SPIN_CYCLES = 20 // Minimum number of full cycles the wheel will spin

export function LinearWheel({ onSpinComplete, availableSpins, setAvailableSpins }: LinearWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState("0s")
  const [transitionTimingFunction, setTransitionTimingFunction] = useState("linear")
  const [result, setResult] = useState<LinearSegment | null>(null)
  const [showResultDialog, setShowResultDialog] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null) // Audio ref

  const handleSpin = () => {
    if (spinning || !wheelRef.current) return

    setAvailableSpins((prev) => prev - 1)
    setSpinning(true)
    setResult(null)
    setShowResultDialog(false)

    // Play sound
    if (audioRef.current) {
      console.log("Attempting to play audio for linear wheel...")
      audioRef.current.currentTime = 0 // Reset to start
      audioRef.current.play().catch((error) => {
        console.error("Linear wheel audio play failed:", error)
        // You might want to show a user-friendly message here if audio fails
      })
    }

    // Calculate total weight
    const totalWeight = linearSegments.reduce((sum, segment) => sum + segment.weight, 0)

    // Determine the winning segment based on weights
    let randomWeight = Math.random() * totalWeight

    // Determine the winning segment based on weights
    let winningSegmentIndex = 0
    for (let i = 0; i < linearSegments.length; i++) {
      randomWeight -= linearSegments[i].weight
      if (randomWeight <= 0) {
        winningSegmentIndex = i
        break
      }
    }
    const selectedSegment = linearSegments[winningSegmentIndex]

    // Calculate the total width of one full set of segments
    const totalSegmentSetWidth = linearSegments.length * ITEM_WIDTH

    // Calculate the target position for the winning segment to be centered
    // We want it to land after a minimum number of full cycles
    const targetSegmentCenterOffset = winningSegmentIndex * ITEM_WIDTH + ITEM_WIDTH / 2

    // Ensure it spins at least MIN_SPIN_CYCLES, plus some random additional cycles for variation
    const extraRandomCycles = Math.floor(Math.random() * 3) // 0, 1, or 2 extra cycles
    const totalSpinCycles = MIN_SPIN_CYCLES + extraRandomCycles

    // Calculate the absolute position on the extended track where the winning segment's center should be
    const absoluteTargetPosition = totalSpinCycles * totalSegmentSetWidth + targetSegmentCenterOffset

    // Calculate the final translateX value to center this item under the pointer
    // The pointer is at the center of the visible container (wheelRef.current.offsetWidth / 2)
    const finalTranslateX = wheelRef.current.offsetWidth / 2 - absoluteTargetPosition

    // Set transition properties for the spin
    setTransitionTimingFunction("cubic-bezier(0.25, 0.1, 0.25, 1)") // Ease out for deceleration
    setTransitionDuration("2s") // Changed to 2 seconds for faster spin

    // Trigger the spin
    setTranslateX(finalTranslateX)

    // After the transition ends (2 seconds), show the result and reset spinning state
    setTimeout(() => {
      setSpinning(false)
      setResult(selectedSegment)
      setShowResultDialog(true)
      onSpinComplete(selectedSegment) // Call the callback to update history in parent
      // Reset translateX to 0 after the dialog is shown, so the next spin starts from a clean state
      // This also prevents the wheel from "snapping back" visually if the user closes the dialog quickly
      setTranslateX(0)
      setTransitionDuration("0s") // Reset duration for instant snap back

      // Stop sound
      if (audioRef.current) {
        console.log("Attempting to pause audio for linear wheel...")
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, 2000) // Match CSS transition duration
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <audio ref={audioRef} src="/sounds/spinning-sound.mp3" preload="auto" crossOrigin="anonymous" />
      {/* This div now contains the border and the pointers */}
      <div className="relative w-full border-2 border-yellow-500 rounded-lg overflow-hidden">
        {/* Top Pointer Triangle */}
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-yellow-500 z-10" />

        {/* Bottom Pointer Triangle */}
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-yellow-500 z-10" />

        {/* Linear Wheel Track */}
        <div
          ref={wheelRef}
          className={cn("flex flex-nowrap")}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${transitionDuration} ${transitionTimingFunction}`,
            // The width should be large enough to contain all repeated segments
            width: `${linearSegments.length * REPEAT_COUNT * ITEM_WIDTH}px`,
          }}
        >
          {/* Repeat segments multiple times to create a long track for spinning */}
          {Array.from({ length: REPEAT_COUNT }).map((_, repeatIdx) =>
            linearSegments.map((segment, index) => (
              <div
                key={`${repeatIdx}-${segment.id}`}
                className="flex-shrink-0 w-[160px] h-[180px] flex flex-col items-center justify-center p-2 mx-1 rounded-lg
               border-2 border-linear-border-blue text-white shadow-lg" // Updated styling
                style={{ backgroundColor: segment.bgColor }} // Dynamic background color
              >
                {/* Directly place the image, removing the hexagonal wrapper */}
                <div className="relative w-full h-3/4 flex items-center justify-center">
                  <Image
                    src={segment.imageSrc || "/placeholder.svg"}
                    alt={segment.label}
                    fill
                    className="object-contain p-2" // Add padding to image
                  />
                </div>
                <span className="text-lg font-bold text-center">{segment.label}</span>
                <span className="text-xs text-white">{segment.subLabel}</span> {/* Ensure text is white */}
              </div>
            )),
          )}
        </div>
      </div>

      <Button
        onClick={handleSpin}
        disabled={spinning || availableSpins === 0}
        className="w-full bg-yellow-500 text-zinc-900 hover:bg-yellow-600 dark:bg-yellow-400 dark:text-zinc-900 dark:hover:bg-yellow-500 text-lg h-12 mt-6"
      >
        {spinning ? "Эргүүлж байна..." : `Эрх ${availableSpins}`}
      </Button>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">Баяр хүргэе!</DialogTitle>
            <DialogDescription className="text-zinc-600 dark:text-zinc-300">
              Та <span className="font-bold text-yellow-600 dark:text-yellow-400">{result?.label}</span> хожлоо!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setShowResultDialog(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Хаах
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
