import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

interface SurveyCardProps {
  id: string
  imageSrc: string
  title: string
  reward: number
  participants: number
  maxParticipants: number
  isCompleted?: boolean
  creatorName: string
  creatorImageSrc: string
}

export function SurveyCard({
  id,
  imageSrc,
  title,
  reward,
  participants,
  maxParticipants,
  isCompleted,
  creatorName,
  creatorImageSrc,
}: SurveyCardProps) {
  const progress = (participants / maxParticipants) * 100

  return (
    <Link href={`/surveys/${id}`} className="block">
      <Card className="relative w-full aspect-square overflow-hidden rounded-lg bg-zinc-100 text-zinc-900 shadow-md hover:shadow-lg transition-shadow cursor-pointer dark:bg-zinc-800 dark:text-white">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Текст уншигдах байдлыг сайжруулах градиент давхарга */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
            <CheckCircle className="h-3 w-3" />
          </div>
        )}

        {/* Creator Profile Info - Added to the top left corner */}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Image
            src={creatorImageSrc || "/placeholder.svg?height=30&width=30&query=avatar"}
            alt={creatorName}
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <span>{creatorName}</span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Гарчиг */}
          <CardHeader className="p-0 pt-8">
            <CardTitle className="text-sm font-bold leading-tight">{title}</CardTitle>
          </CardHeader>

          {/* Шагнал болон явц */}
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Шагнал:</span>
              <span className="text-base font-bold text-green-600 dark:text-green-400">{reward}₮</span>
            </div>
            <div className="grid gap-0.5">
              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
                <span>
                  Бөглөсөн: {participants}/{maxParticipants}
                </span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-1.5 bg-zinc-300 dark:bg-zinc-700 [&>*]:bg-zinc-900 dark:[&>*]:bg-white"
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
