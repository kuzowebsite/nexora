"use client"

import { AdBanner } from "@/components/ad-banner"
import { PartnerLogos } from "@/components/partner-logos"
import Image from "next/image"
import {
  Diamond,
  Hand,
  Wallet,
  Percent,
  Gamepad2,
  Battery,
  UtensilsCrossed,
  Plus,
  Zap,
  Droplets,
  Flame,
} from "lucide-react"

// Service data matching the reference image
const mainServices = [
  {
    id: "gamexp",
    name: "GameXP",
    icon: Diamond,
  },
  {
    id: "donation",
    name: "Хандив",
    icon: Hand,
  },
  {
    id: "payment",
    name: "Төлбөр",
    icon: Wallet,
  },
  {
    id: "coupon",
    name: "Купон",
    icon: Percent,
  },
  {
    id: "games",
    name: "Тоглоом, эн...",
    icon: Gamepad2,
  },
  {
    id: "charging",
    name: "Цэнэглэгч к...",
    icon: Battery,
  },
  {
    id: "food",
    name: "Хүнс, хоол х...",
    icon: UtensilsCrossed,
  },
  {
    id: "other",
    name: "Бусад",
    icon: Plus,
  },
]

// Telecom services with actual logos
const telecomServices = [
  {
    id: "mobicom",
    name: "Mobicom",
    logo: "/images/mobicom-logo.png",
  },
  {
    id: "unitel",
    name: "Unitel",
    logo: "/images/unitel-logo.png",
  },
  {
    id: "gmobile",
    name: "G-mobile",
    logo: "/images/gmobile-logo.png",
  },
  {
    id: "skytel",
    name: "Skytel",
    logo: "/images/skytel-logo.png",
  },
]

// Service Card Component - responsive to theme
function ServiceCard({
  service,
  onClick,
}: {
  service: (typeof mainServices)[0]
  onClick: () => void
}) {
  const IconComponent = service.icon

  return (
    <div
      className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 flex flex-col items-center justify-center aspect-square"
      onClick={onClick}
    >
      <div className="w-6 h-6 mb-2 flex items-center justify-center">
        <IconComponent className="h-5 w-5 text-blue-500 dark:text-blue-400" />
      </div>
      <span className="text-zinc-900 dark:text-white text-xs font-medium text-center leading-tight">
        {service.name}
      </span>
    </div>
  )
}

// Telecom Service Card - responsive to theme
function TelecomCard({
  service,
  onClick,
}: {
  service: (typeof telecomServices)[0]
  onClick: () => void
}) {
  return (
    <div
      className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 flex flex-col items-center justify-center aspect-square"
      onClick={onClick}
    >
      <div className="w-8 h-8 mb-2 flex items-center justify-center relative">
        <Image
          src={service.logo || "/placeholder.svg"}
          alt={service.name}
          width={32}
          height={32}
          className="rounded-md object-cover"
        />
      </div>
      <span className="text-zinc-900 dark:text-white text-xs font-medium text-center">{service.name}</span>
    </div>
  )
}

// Utility Service Card - responsive to theme
function UtilityCard({
  id,
  name,
  icon: IconComponent,
  iconColor,
  onClick,
}: {
  id: string
  name: string
  icon: any
  iconColor: string
  onClick: () => void
}) {
  return (
    <div
      className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 flex flex-col items-center justify-center aspect-square"
      onClick={onClick}
    >
      <div className="w-6 h-6 mb-2 flex items-center justify-center">
        <IconComponent className={`h-5 w-5 ${iconColor}`} />
      </div>
      <span className="text-zinc-900 dark:text-white text-xs font-medium text-center leading-tight">{name}</span>
    </div>
  )
}

export default function HomePage() {
  const handleServiceClick = (serviceId: string) => {
    console.log(`Clicked service: ${serviceId}`)
    // TODO: Implement service functionality
  }

  return (
    <div className="relative pb-16 px-4 md:px-6 pt-6 bg-white dark:bg-black min-h-screen transition-colors duration-200">
      <PartnerLogos />
      <AdBanner className="mt-4" />

      {/* Main Services Section */}
      <section className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          {mainServices.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={() => handleServiceClick(service.id)} />
          ))}
        </div>
      </section>

      {/* Mobile Top-up Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">📱 Нэгж авах</h2>
        <div className="grid grid-cols-4 gap-2">
          {telecomServices.map((service) => (
            <TelecomCard key={service.id} service={service} onClick={() => handleServiceClick(service.id)} />
          ))}
        </div>
      </section>

      {/* Utility Bills Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">🏠 Төлбөр төлөх</h2>
        <div className="grid grid-cols-4 gap-2">
          <UtilityCard
            id="electricity"
            name="Цахилгаан"
            icon={Zap}
            iconColor="text-yellow-500 dark:text-yellow-400"
            onClick={() => handleServiceClick("electricity")}
          />
          <UtilityCard
            id="water"
            name="Ус"
            icon={Droplets}
            iconColor="text-blue-500 dark:text-blue-400"
            onClick={() => handleServiceClick("water")}
          />
          <UtilityCard
            id="heating"
            name="Дулаан"
            icon={Flame}
            iconColor="text-red-500 dark:text-red-400"
            onClick={() => handleServiceClick("heating")}
          />
          <UtilityCard
            id="other"
            name="Бусад"
            icon={Plus}
            iconColor="text-gray-500 dark:text-gray-400"
            onClick={() => handleServiceClick("other")}
          />
        </div>
      </section>
    </div>
  )
}
