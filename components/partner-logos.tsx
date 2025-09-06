"use client"

import Image from "next/image"
import Link from "next/link"

interface PartnerLogo {
  id: string
  src: string
  alt: string
  href: string
}

const partnerLogos: PartnerLogo[] = [
  {
    id: "dz-jargalyn-san",
    src: "/images/dz-jargalyn-san-logo.png",
    alt: "ДЗ Жаргалын Сан Лого",
    href: "https://www.jargalansan.mn/", // Жишээ холбоос
  },
  {
    id: "imax",
    src: "/images/imax-white-logo.png",
    alt: "IMAX Лого",
    href: "https://www.imax.com/", // Жишээ холбоос
  },
  {
    id: "cu",
    src: "/images/cu-logo.png",
    alt: "CU Лого",
    href: "https://www.cu.mn/", // Жишээ холбоос
  },
  {
    id: "ubcab-holding",
    src: "/images/ubcab-holding-logo.png",
    alt: "Ubcab Holding Лого",
    href: "https://www.ubcab.mn/", // Жишээ холбоос
  },
  {
    id: "shopp",
    src: "/images/shopp-logo.png",
    alt: "Shopp Лого",
    href: "https://www.shopp.mn/", // Жишээ холбоос
  },
  {
    id: "holding-logo-1",
    src: "/images/holding-logo.svg",
    alt: "Хамтрагч Лого 1",
    href: "https://www.example.com/partner1", // Жишээ холбоос
  },
  {
    id: "generic-logo-1",
    src: "/images/generic-logo.svg",
    alt: "Хамтрагч Лого 2",
    href: "https://www.example.com/partner2", // Жишээ холбоос
  },
  // Илүү олон лого нэмэх боломжтой
]

// Логонуудыг тасралтгүй гүйлгэхийн тулд хэд хэдэн удаа давтана
const REPEAT_COUNT = 5

export function PartnerLogos() {
  return (
    <div className="w-full overflow-hidden py-4 mb-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: REPEAT_COUNT }).map((_, repeatIdx) =>
          partnerLogos.map((logo) => (
            <Link
              key={`${repeatIdx}-${logo.id}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-4 hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={100}
                height={40}
                className="h-10 object-contain"
              />
            </Link>
          )),
        )}
      </div>
    </div>
  )
}
