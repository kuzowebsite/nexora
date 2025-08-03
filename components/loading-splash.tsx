import Image from "next/image"
import { cn } from "@/lib/utils" // Assuming cn utility is available

export default function LoadingSplash({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white", className)}>
      <div className="flex items-center mb-8">
        <Image
          src="/images/crypto-case-logo.png"
          alt="Crypto Case Logo"
          width={200}
          height={200}
          priority // Preload the image
        />
      </div>
      <div className="relative flex h-10 w-10">
        <div className="absolute h-full w-full rounded-full border-4 border-t-4 border-zinc-700 border-t-teal-500 animate-spin"></div>
        <div className="absolute h-full w-full rounded-full border-4 border-t-4 border-zinc-700 border-t-teal-500 animate-spin-slow delay-100"></div>
      </div>
    </div>
  )
}
