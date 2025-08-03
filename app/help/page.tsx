import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Тусламж ба Ашиглах Заавар</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Сайтыг хэрхэн ашиглах вэ?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Манай платформыг ашиглахад тавтай морил! Энэ хэсэгт та манай сайтын үндсэн функцууд болон тэдгээрийг хэрхэн
            ашиглах талаар дэлгэрэнгүй мэдээлэл авах болно.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Бүртгүүлэх ба Нэвтрэх</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Та манай платформыг ашиглахын тулд эхлээд бүртгүүлэх шаардлагатай. Бүртгүүлэхдээ өөрийн и-мэйл хаяг,
                  нууц үг, хүйс зэрэг мэдээллээ оруулна. Амжилттай бүртгүүлсний дараа та өөрийн бүртгэлээр нэвтэрч,
                  сайтын бүх боломжийг ашиглах боломжтой болно.
                </p>
                <p>
                  Хэрэв та хурууны хээгээр нэвтрэх боломжийг идэвхжүүлсэн бол дараагийн удаа нэвтрэхдээ хурууны хээгээ
                  ашиглах боломжтой.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>2. Судалгаанд оролцох</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Та "Судалгаанууд" хэсгээс идэвхтэй байгаа судалгаануудыг харж, оролцох боломжтой. Судалгаанд оролцохын
                  тулд тухайн судалгааг сонгож, асуултуудад хариулна. Судалгааг амжилттай бөглөсний дараа танд
                  урамшуулал олгогдоно.
                </p>
                <p>
                  Судалгааны төрлөөс хамаарч, текст, нэг сонголттой, олон сонголттой, үнэлгээ, зураг, видео зэрэг янз
                  бүрийн асуултын төрлүүд байж болно.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>3. Түрүүвч ба Цэнэглэлт</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Таны цуглуулсан урамшуулал "Түрүүвч" хэсэгт харагдана. Та түрүүвчээ цэнэглэх эсвэл цуглуулсан оноогоо
                  бэлэн мөнгө болгон шилжүүлэх боломжтой.
                </p>
                <p>Цэнэглэлт хийхдээ банкны апп эсвэл DiGi Pay зэрэг төлбөрийн системүүдийг ашиглах боломжтой.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>4. Найзуудтай холбогдох</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Та "Найзууд" хэсгээс өөрийн найзуудын жагсаалтыг харж, тэдэнтэй чатлах, дуудлага хийх боломжтой. Мөн
                  найзын дэлгэрэнгүй мэдээлэл хэсгээс найзыг устгах эсвэл блоклох боломжтой.
                </p>
                <p>Хэрэв та найзыг блоклосон бол тухайн найз танд чат бичих боломжгүй болно.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>5. Профайл удирдах</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  "Профайл" хэсэгт та өөрийн хувийн мэдээлэл, профайл зургаа шинэчлэх боломжтой. Хэрэв та профайл зургаа
                  солиогүй бол таны хүйсний дагуу анхдагч зураг харагдана.
                </p>
                <p>Та мөн өөрийн бөглөсөн судалгаанууд болон үүсгэсэн судалгаануудыг энэ хэсгээс хянах боломжтой.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Нэмэлт мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Хэрэв танд нэмэлт асуулт байвал эсвэл ямар нэгэн асуудал тулгарвал бидэнтэй холбогдоно уу.
          </p>
          <ul className="list-disc list-inside">
            <li>
              И-мэйл:{" "}
              <a href="mailto:support@linkups.mn" className="text-blue-500 hover:underline">
                support@linkups.mn
              </a>
            </li>
            <li>Утас: +976-ХХХХ-ХХХХ</li>
            <li>Ажлын цаг: Даваа-Баасан (09:00-18:00)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
