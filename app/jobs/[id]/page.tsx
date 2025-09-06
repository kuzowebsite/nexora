"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MapPin, Clock, Users, Building, DollarSign } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Бүтэн цаг" | "Хагас цаг" | "Гэрээт" | "Дадлага"
  salary: string
  description: string
  requirements: string[]
  posted: string
  applicants: number
  maxApplicants: number
  companyLogo?: string
  featured: boolean
  imageSrc: string
  creatorName: string
  creatorImageSrc: string
  fullDescription: string
  responsibilities: string[]
  benefits: string[]
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp Mongolia",
    location: "Улаанбаатар",
    type: "Бүтэн цаг",
    salary: "1500000",
    description: "React, Next.js ашиглан веб аппликейшн хөгжүүлэх ажил",
    fullDescription:
      "Манай компани нь технологийн салбарт тэргүүлэгч байр суурь эзэлдэг бөгөөд шинэлэг веб аппликейшнуудыг хөгжүүлэх талаар мэргэшсэн баг бүрдүүлэхийг зорьж байна. Та манай багт нэгдэж, олон төрлийн төслүүдэд оролцох боломжтой.",
    requirements: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git", "REST API"],
    responsibilities: [
      "Веб аппликейшны frontend хэсгийг хөгжүүлэх",
      "UI/UX дизайныг код болгон хувиргах",
      "API-тай холбогдох функцуудыг бичих",
      "Кодын чанарыг хангах, тест бичих",
      "Багийн гишүүдтэй хамтран ажиллах",
    ],
    benefits: [
      "Өрсөлдөхүйц цалин",
      "Эрүүл мэндийн даатгал",
      "Гибкий ажлын цаг",
      "Мэргэжлийн хөгжлийн боломж",
      "Орчин үеийн оффис орчин",
    ],
    posted: "2 өдрийн өмнө",
    applicants: 30,
    maxApplicants: 50,
    companyLogo: "/images/generic-logo.svg",
    featured: true,
    imageSrc: "/frontend-development-coding.png",
    creatorName: "Т. Эрдэнэ",
    creatorImageSrc: "/images/male.avif",
  },
  {
    id: "2",
    title: "Маркетингийн мэргэжилтэн",
    company: "Digital Marketing Agency",
    location: "Улаанбаатар",
    type: "Бүтэн цаг",
    salary: "1200000",
    description: "Дижитал маркетингийн кампайн зохион байгуулах, удирдах",
    fullDescription:
      "Дижитал маркетингийн салбарт туршлагатай, шинэлэг санаануудтай мэргэжилтэн хайж байна. Та олон төрлийн брэндүүдтэй ажиллах, тэдний онлайн оролцоог нэмэгдүүлэх боломжтой.",
    requirements: ["Facebook Ads", "Google Ads", "SEO", "Content Marketing", "Analytics", "Social Media"],
    responsibilities: [
      "Дижитал маркетингийн стратеги боловсруулах",
      "Зар сурталчилгааны кампайн удирдах",
      "Контент маркетингийн төлөвлөгөө гаргах",
      "SEO оновчлол хийх",
      "Үр дүнг хэмжих, тайлагнах",
    ],
    benefits: [
      "Өрсөлдөхүйц цалин + урамшуулал",
      "Эрүүл мэндийн даатгал",
      "Сургалтад хамрагдах боломж",
      "Олон улсын төслүүдэд оролцох",
      "Багийн уур амьсгал",
    ],
    posted: "1 өдрийн өмнө",
    applicants: 50,
    maxApplicants: 100,
    companyLogo: "/images/crypto-case-logo.png",
    featured: true,
    imageSrc: "/digital-marketing-campaign.png",
    creatorName: "Г. Дорж",
    creatorImageSrc: "/images/female.avif",
  },
  {
    id: "3",
    title: "График дизайнер",
    company: "Creative Studio",
    location: "Улаанбаатар",
    type: "Хагас цаг",
    salary: "800000",
    description: "Брэндийн дизайн, зар сурталчилгааны материал бэлтгэх",
    fullDescription:
      "Бүтээлч студид график дизайнер ажилд авна. Та олон төрлийн төслүүдэд оролцож, өөрийн бүтээлч чадварыг хөгжүүлэх боломжтой.",
    requirements: ["Photoshop", "Illustrator", "Figma", "Branding", "Typography", "Color Theory"],
    responsibilities: [
      "Брэндийн дизайн хийх",
      "Зар сурталчилгааны материал бэлтгэх",
      "Веб дизайны элементүүд бүтээх",
      "Клиенттэй харилцах",
      "Дизайны концепци боловсруулах",
    ],
    benefits: [
      "Уян хатан ажлын цаг",
      "Бүтээлч орчин",
      "Мэргэжлийн хөгжлийн боломж",
      "Төрөл бүрийн төслүүд",
      "Багийн дэмжлэг",
    ],
    posted: "3 өдрийн өмнө",
    applicants: 12,
    maxApplicants: 25,
    companyLogo: "/images/cu-logo.png",
    featured: false,
    imageSrc: "/graphic-design-creative.png",
    creatorName: "Б. Цэцэг",
    creatorImageSrc: "/images/male.avif",
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  const progress = (job.applicants / job.maxApplicants) * 100

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Бүтэн цаг":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Хагас цаг":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Гэрээт":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Дадлага":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Буцах
        </Link>

        {/* Job Header */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <Image src={job.imageSrc || "/placeholder.svg"} alt={job.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Creator info */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 text-white px-3 py-2 rounded-full">
            <Image
              src={job.creatorImageSrc || "/placeholder.svg"}
              alt={job.creatorName}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium">{job.creatorName}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.posted}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Ажлын тайлбар</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Үүрэг хариуцлага</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Шаардлага</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((requirement, index) => (
                    <Badge key={index} variant="secondary">
                      {requirement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Тэтгэмж, боломжууд</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Цалин
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{job.salary}₮</div>

                <div className="space-y-2">
                  <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                </div>

                <Button className="w-full bg-yellow-500 text-yellow-900 hover:bg-yellow-600">Өргөдөл гаргах</Button>
              </CardContent>
            </Card>

            {/* Application Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Өргөдлийн статистик
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Өргөдөл:</span>
                  <span className="font-medium">
                    {job.applicants}/{job.maxApplicants}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-right text-xs text-gray-500">{progress.toFixed(0)}% дүүрсэн</div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>Компанийн мэдээлэл</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.companyLogo && (
                  <div className="w-16 h-16 relative">
                    <Image
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{job.company}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
