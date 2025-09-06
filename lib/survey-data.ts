// Судалгааны интерфейс
export interface Question {
  id: string
  text: string
  questionContentType: "text" | "image" | "video"
  mediaUrl?: string
  answerType: "text" | "radio" | "checkbox" | "rating"
  options?: { value: string; label: string }[]
}

export interface Survey {
  id: string
  title: string
  description: string
  imageSrc: string
  reward: number
  participants: number
  maxParticipants: number
  type: "featured" | "regular"
  questions: Question[]
  creatorName: string
  creatorImageSrc: string
}

// Судалгааны жишээ мэдээлэл
export const surveysData: Survey[] = [
  {
    id: "1",
    title: "Онлайн худалдааны хэрэглээний судалгаа",
    description:
      "Таны онлайн худалдааны зуршлыг судлах судалгаа. Энэ судалгаа нь таны худалдан авах зан төлөв, онлайн дэлгүүрийн сонголт, төлбөрийн арга зэрэг олон талын мэдээллийг цуглуулах зорилготой.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 500,
    participants: 120,
    maxParticipants: 200,
    type: "featured",
    questions: [
      {
        id: "q1",
        text: "Та хэр олон удаа онлайн худалдаа хийдэг вэ?",
        questionContentType: "text",
        answerType: "radio",
        options: [
          { value: "daily", label: "Өдөр бүр" },
          { value: "weekly", label: "Долоо хоногт" },
          { value: "monthly", label: "Сард" },
          { value: "rarely", label: "Ховор" },
        ],
      },
      {
        id: "q2",
        text: "Таны хамгийн их ашигладаг онлайн дэлгүүр юу вэ?",
        questionContentType: "text",
        answerType: "text",
      },
      {
        id: "q3",
        text: "Та дараах бүтээгдэхүүнүүдээс алийг нь онлайнаар худалдаж авдаг вэ? (Олон сонголттой)",
        questionContentType: "text",
        answerType: "checkbox",
        options: [
          { value: "clothes", label: "Хувцас" },
          { value: "electronics", label: "Цахилгаан бараа" },
          { value: "food", label: "Хүнс" },
          { value: "books", label: "Ном" },
        ],
      },
      {
        id: "q_rating1",
        text: "Манай үйлчилгээнд та хэр сэтгэл ханамжтай байна вэ?",
        questionContentType: "text",
        answerType: "rating",
      },
    ],
    creatorName: "А. Бат",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "2",
    title: "Гар утасны аппликейшн хэрэглээний судалгаа",
    description:
      "Таны өдөр тутмын гар утасны аппликейшн хэрэглээний талаар. Энэ судалгаа нь таны хамгийн их ашигладаг аппликейшн, тэдгээрийн ашиглалтын давтамж, сэтгэл ханамж зэргийг тодорхойлно.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 300,
    participants: 80,
    maxParticipants: 150,
    type: "regular",
    questions: [
      {
        id: "q4",
        text: "Та өдөрт дунджаар хэдэн цаг гар утсаа ашигладаг вэ?",
        questionContentType: "text",
        answerType: "text",
      },
      {
        id: "q5",
        text: "Таны хамгийн их ашигладаг аппликейшн юу вэ?",
        questionContentType: "text",
        answerType: "radio",
        options: [
          { value: "social", label: "Сошиал медиа" },
          { value: "game", label: "Тоглоом" },
          { value: "utility", label: "Хэрэгцээт апп" },
          { value: "work", label: "Ажлын апп" },
        ],
      },
      {
        id: "q_img1",
        text: "Энэ зураг танд юу санагдуулж байна вэ?",
        questionContentType: "image",
        mediaUrl: "/placeholder.svg?height=300&width=500",
        answerType: "text",
      },
    ],
    creatorName: "Э. Оюун",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "3",
    title: "Эрүүл мэндийн үйлчилгээний сэтгэл ханамжийн судалгаа",
    description:
      "Эрүүл мэндийн үйлчилгээний талаарх таны сэтгэл ханамжийг үнэлэх судалгаа. Энэ нь үйлчилгээний чанар, хүртээмж, эмнэлгийн ажилтнуудын харилцаа зэрэгт анхаарна.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 700,
    participants: 50,
    maxParticipants: 100,
    type: "featured",
    questions: [
      {
        id: "q6",
        text: "Та сүүлийн 1 жилд эмнэлгийн үйлчилгээ авсан уу?",
        questionContentType: "text",
        answerType: "radio",
        options: [
          { value: "yes", label: "Тийм" },
          { value: "no", label: "Үгүй" },
        ],
      },
      {
        id: "q7",
        text: "Эмнэлгийн үйлчилгээний чанарт та хэр сэтгэл ханамжтай байдаг вэ?",
        questionContentType: "text",
        answerType: "rating",
      },
      {
        id: "q_video1",
        text: "Энэ видео танд ямар сэтгэгдэл төрүүлж байна вэ?",
        questionContentType: "video",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        answerType: "checkbox",
        options: [
          { value: "positive", label: "Эерэг" },
          { value: "negative", label: "Сөрөг" },
          { value: "neutral", label: "Төвийг сахисан" },
        ],
      },
    ],
    creatorName: "Г. Дорж",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "4",
    title: "Сошиал медиа хэрэглээний судалгаа",
    description: "Таны сошиал медиа хэрэглээний зуршлыг судлах судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 400,
    participants: 90,
    maxParticipants: 180,
    type: "regular",
    questions: [
      {
        id: "q8",
        text: "Та ямар сошиал медиа платформыг хамгийн их ашигладаг вэ?",
        questionContentType: "text",
        answerType: "radio",
        options: [
          { value: "facebook", label: "Facebook" },
          { value: "instagram", label: "Instagram" },
          { value: "twitter", label: "Twitter/X" },
          { value: "tiktok", label: "TikTok" },
        ],
      },
    ],
    creatorName: "С. Наран",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "5",
    title: "Хоол хүнсний хэрэглээний судалгаа",
    description: "Таны хоол хүнсний сонголт, хэрэглээний талаарх судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 600,
    participants: 70,
    maxParticipants: 120,
    type: "featured",
    questions: [
      {
        id: "q9",
        text: "Та долоо хоногт хэр олон удаа гадуур хооллодог вэ?",
        questionContentType: "text",
        answerType: "text",
      },
    ],
    creatorName: "Б. Цэцэг",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "6",
    title: "Аялал жуулчлалын сонирхол",
    description: "Таны аялал жуулчлалын сонирхол, зуршлыг судлах судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 550,
    participants: 110,
    maxParticipants: 200,
    type: "regular",
    questions: [
      {
        id: "q10",
        text: "Таны хамгийн их аялахыг хүсдэг улс аль вэ?",
        questionContentType: "text",
        answerType: "text",
      },
    ],
    creatorName: "Д. Ганбат",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "7",
    title: "Боловсролын системийн судалгаа",
    description: "Боловсролын системийн талаарх таны санал, бодлыг судлах судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 450,
    participants: 60,
    maxParticipants: 100,
    type: "regular",
    questions: [
      {
        id: "q11",
        text: "Та Монголын боловсролын системийг хэрхэн үнэлдэг вэ?",
        questionContentType: "text",
        answerType: "rating",
      },
    ],
    creatorName: "О. Уран",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "8",
    title: "Фитнесс аппликейшний судалгаа",
    description: "Фитнесс аппликейшн хэрэглээний талаарх судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 800,
    participants: 30,
    maxParticipants: 50,
    type: "featured",
    questions: [
      {
        id: "q12",
        text: "Та фитнесс аппликейшн ашигладаг уу?",
        questionContentType: "text",
        answerType: "radio",
        options: [
          { value: "yes", label: "Тийм" },
          { value: "no", label: "Үгүй" },
        ],
      },
    ],
    creatorName: "Т. Эрдэнэ",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "9",
    title: "Номын уншлагын зуршил",
    description: "Таны ном унших зуршлыг судлах судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 250,
    participants: 100,
    maxParticipants: 120,
    type: "regular",
    questions: [
      {
        id: "q13",
        text: "Та сард дунджаар хэдэн ном уншдаг вэ?",
        questionContentType: "text",
        answerType: "text",
      },
    ],
    creatorName: "Х. Сарнай",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
  {
    id: "10",
    title: "Онлайн тоглоомын хэрэглээ",
    description: "Таны онлайн тоглоомын хэрэглээний талаарх судалгаа.",
    imageSrc: "/placeholder.svg?height=300&width=300",
    reward: 350,
    participants: 95,
    maxParticipants: 110,
    type: "regular",
    questions: [
      {
        id: "q14",
        text: "Таны хамгийн дуртай онлайн тоглоом юу вэ?",
        questionContentType: "text",
        answerType: "text",
      },
    ],
    creatorName: "З. Тулга",
    creatorImageSrc: "/placeholder.svg?height=30&width=30",
  },
]
