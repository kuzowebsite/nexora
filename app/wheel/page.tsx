"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinearWheel } from "@/components/linear-wheel" // Import the new LinearWheel component
import { RotateCw, List, HistoryIcon } from "lucide-react" // Icons for tabs

interface Segment {
  label: string
  color: string
  value: number // Value for the prize (e.g., 2 for "2 эрх", 500 for "500₮", 0 for "Хоосон")
  weight: number // Probability weight
}

interface LinearSegment {
  id: string
  label: string
  subLabel: string
  imageSrc: string
  value: number // Prize value
  weight: number // Probability weight
  bgColor?: string
}

interface SpinHistoryEntry {
  id: string
  wheelType: "circular" | "linear"
  resultLabel: string
  resultValue: number
  timestamp: string
}

const segments: Segment[] = [
  { label: "2 эрх", color: "#FFD700", value: 2, weight: 15 }, // Gold - дунд зэрэг
  { label: "1 эрх", color: "#32CD32", value: 1, weight: 20 }, // LimeGreen - өндөр
  { label: "5 эрх", color: "#FF4500", value: 5, weight: 10 }, // OrangeRed - бага
  { label: "Хоосон", color: "#8A2BE2", value: 0, weight: 25 }, // BlueViolet - хамгийн өндөр
  { label: "Хоосон", color: "#00CED1", value: 0, weight: 25 }, // DarkTurquoise - хамгийн өндөр
  { label: "500₮", color: "#FF69B4", value: 500, weight: 15 }, // HotPink - дунд зэрэг
  { label: "1000₮", color: "#ADFF2F", value: 1000, weight: 8 }, // GreenYellow - хамгийн бага
  { label: "Хоосон", color: "#FF8C00", value: 0, weight: 25 }, // DarkOrange - хамгийн өндөр
]

const segmentAngle = 360 / segments.length // Each segment is 45 degrees for 8 segments

export default function WheelPage() {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<Segment | null>(null)
  const [showResultDialog, setShowResultDialog] = useState(false)
  const [spinHistory, setSpinHistory] = useState<SpinHistoryEntry[]>([])
  const [availableSpins, setAvailableSpins] = useState(5) // Default to 5 spins
  const wheelRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null) // Audio ref

  const handleSpin = () => {
    if (spinning || !wheelRef.current || availableSpins === 0) return // Disable if no spins left

    setSpinning(true)
    setResult(null)
    setShowResultDialog(false)
    setAvailableSpins((prev) => prev - 1) // Decrement available spins

    // Play sound
    if (audioRef.current) {
      console.log("Attempting to play audio for circular wheel...")
      audioRef.current.currentTime = 0 // Reset to start
      audioRef.current.play().catch((error) => {
        console.error("Circular wheel audio play failed:", error)
        // You might want to show a user-friendly message here if audio fails
      })
    }

    // Calculate total weight
    const totalWeight = segments.reduce((sum, segment) => sum + segment.weight, 0)

    // Pick a random number within the total weight
    let randomWeight = Math.random() * totalWeight

    // Determine the winning segment based on weights
    let winningSegmentIndex = 0
    for (let i = 0; i < segments.length; i++) {
      randomWeight -= segments[i].weight
      if (randomWeight <= 0) {
        winningSegmentIndex = i
        break
      }
    }

    const selectedSegment = segments[winningSegmentIndex]

    // Calculate the target angle for the pointer to land on the selected segment
    // The pointer is at the top (0 degrees).
    // We want the wheel to rotate such that the winning segment lands under the pointer.
    // The center of the winning segment should align with the pointer.
    const targetSegmentCenterAngle = winningSegmentIndex * segmentAngle + segmentAngle / 2

    // Calculate the rotation needed to bring the target segment to the top (0 degrees)
    // This is the rotation *within one full cycle*
    const rotationToTarget = (360 - targetSegmentCenterAngle) % 360 // Ensure it's within 0-359

    // Add multiple full rotations to make it spin visibly and fast
    const fullSpins = 10 // Increased from 5
    const spinAmount = fullSpins * 360 + rotationToTarget

    // Update rotation by adding to the current value
    // This is crucial for continuous animation from the current visual state
    setRotation((prevRotation) => prevRotation + spinAmount)

    setResult(selectedSegment)

    // After the transition ends (5 seconds), show the result
    setTimeout(() => {
      setSpinning(false)
      setShowResultDialog(true)
      setSpinHistory((prevHistory) => [
        {
          id: `circular-${Date.now()}`,
          wheelType: "circular",
          resultLabel: selectedSegment.label,
          resultValue: selectedSegment.value,
          timestamp: new Date().toLocaleString("mn-MN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prevHistory,
      ])
      // Stop sound
      if (audioRef.current) {
        console.log("Attempting to pause audio for circular wheel...")
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }, 5000) // Match CSS transition duration
  }

  const handleLinearSpinComplete = (selectedSegment: LinearSegment) => {
    setSpinHistory((prevHistory) => [
      {
        id: `linear-${Date.now()}`,
        wheelType: "linear",
        resultLabel: selectedSegment.label,
        resultValue: selectedSegment.value,
        timestamp: new Date().toLocaleString("mn-MN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prevHistory,
    ])
  }

  // Function to generate conic-gradient for the wheel background
  const generateConicGradient = () => {
    let gradient = "conic-gradient(from 0deg"
    segments.forEach((segment, index) => {
      const start = index * segmentAngle
      const end = (index + 1) * segmentAngle
      gradient += `, ${segment.color} ${start}deg ${end}deg`
    })
    gradient += ")"
    return gradient
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8 px-4">
      <audio ref={audioRef} src="/sounds/spinning-sound.mp3" preload="auto" crossOrigin="anonymous" />
      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 text-white shadow-lg">
        <CardHeader className="text-center pb-4">
          {/* Removed CardTitle "Аз сорих хүрд" */}
          <p className="text-zinc-600 dark:text-zinc-300">Эргүүлээд шагнал хожоорой!</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6">
          <Tabs defaultValue="circular" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-200 dark:bg-zinc-700 mb-6">
              <TabsTrigger
                value="circular"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
              >
                <RotateCw className="h-5 w-5" />
                <span className="sr-only">Бөөрөнхий хүрд</span>
              </TabsTrigger>
              <TabsTrigger
                value="linear"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
              >
                <List className="h-5 w-5" />
                <span className="sr-only">Шугаман хүрд</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
              >
                <HistoryIcon className="h-5 w-5" />
                <span className="sr-only">Түүх</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="circular" className="flex flex-col items-center justify-center gap-6">
              <div className="relative w-72 h-72">
                {/* Pointer - positioned at the top, pointing inwards */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-500 z-10" />

                {/* Wheel container that rotates */}
                <div
                  className="relative w-full h-full rounded-full border-4 border-yellow-500 shadow-xl"
                  style={{
                    background: generateConicGradient(),
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
                  }}
                  ref={wheelRef}
                >
                  {/* Segment labels - positioned inside the rotating wheel, counter-rotated to stay upright */}
                  {segments.map((segment, index) => {
                    // Calculate the angle for the center of the segment
                    const centerAngle = index * segmentAngle + segmentAngle / 2
                    // Convert to radians for Math.sin/cos, adjusting for CSS coordinate system (0deg right, 90deg bottom)
                    const angleRad = ((centerAngle - 90) * Math.PI) / 180

                    // Distance from the center of the wheel to the text label
                    const textRadius = 80 // Adjust this value to move text closer/further from center

                    const x = textRadius * Math.cos(angleRad)
                    const y = textRadius * Math.sin(angleRad)

                    return (
                      <div
                        key={index}
                        className="absolute text-center font-bold text-sm text-white"
                        style={{
                          // Position relative to the center of the wheel (which is 50% 50% of the parent)
                          left: "50%",
                          top: "50%",
                          // Apply transforms:
                          // 1. Translate to the calculated radial position (x, y)
                          // 2. Rotate the text container to align with the segment's angle
                          // 3. Counter-rotate the text itself to keep it upright relative to the screen
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${centerAngle}deg) rotate(-${rotation}deg)`,
                          // The `rotate(${centerAngle}deg)` aligns the text container with the segment.
                          // The `translate(${x}px, ${y}px)` moves it radially.
                          // The `rotate(-${rotation}deg)` counteracts the wheel's rotation to keep the text upright.
                        }}
                      >
                        {segment.label}
                      </div>
                    )
                  })}
                </div>
              </div>

              <Button
                onClick={handleSpin}
                disabled={spinning || availableSpins === 0} // Disable if spinning or no spins left
                className="w-full bg-yellow-500 text-zinc-900 hover:bg-yellow-600 dark:bg-yellow-400 dark:text-zinc-900 dark:hover:bg-yellow-500 text-lg h-12"
              >
                {spinning ? "Эргүүлж байна..." : `Эрх ${availableSpins}`}
              </Button>
            </TabsContent>
            <TabsContent value="linear" className="w-full">
              <LinearWheel
                onSpinComplete={handleLinearSpinComplete}
                availableSpins={availableSpins}
                setAvailableSpins={setAvailableSpins}
              />
            </TabsContent>
            <TabsContent value="history" className="w-full">
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {spinHistory.length > 0 ? (
                  spinHistory.map((entry) => (
                    <Card key={entry.id} className="mb-3 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {entry.wheelType === "circular" ? "Бөөрөнхий хүрд" : "Шугаман хүрд"}
                            </span>
                            <span className="text-xs text-zinc-600 dark:text-zinc-300">{entry.timestamp}</span>
                          </div>
                          <span className="text-base font-bold text-yellow-600 dark:text-yellow-400">
                            {entry.resultLabel}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
                    Та одоогоор хүрд эргүүлсэн түүхгүй байна.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Result Dialog for Circular Wheel */}
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
