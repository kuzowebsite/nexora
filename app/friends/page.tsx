"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, ArrowLeft, MessageSquare, Phone, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChatDialog } from "@/components/chat-dialog" // Шинээр нэмсэн
import { CallDialog } from "@/components/call-dialog" // Шинээр нэмсэн
import { FriendDetailsDialog } from "@/components/friend-details-dialog" // Шинээр нэмсэн

interface User {
  id: string
  name: string
  avatarSrc: string
  gender?: "Эрэгтэй" | "Эмэгтэй" | "Бусад"
  status: "Онлайн" | "Офлайн"
  isBlocked: boolean // Блоклосон эсэх статус нэмэв
}

// Жишээ хэрэглэгчийн мэдээлэл
const allUsers: User[] = [
  {
    id: "u1",
    name: "Амар",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=АМ",
    gender: "Эрэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u2",
    name: "Бат",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=БТ",
    gender: "Эрэгтэй",
    status: "Офлайн",
    isBlocked: false,
  },
  {
    id: "u3",
    name: "Цэцэг",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ЦЦ",
    gender: "Эмэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u4",
    name: "Дорж",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ДР",
    gender: "Эрэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u5",
    name: "Энх",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ЭН",
    gender: "Эмэгтэй",
    status: "Офлайн",
    isBlocked: false,
  },
  {
    id: "u6",
    name: "Баярсайхан",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=БС",
    gender: "Эрэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u7",
    name: "Цэцэгмаа",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ЦМ",
    gender: "Эмэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u8",
    name: "Хулан",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ХЛ",
    gender: "Эмэгтэй",
    status: "Офлайн",
    isBlocked: false,
  },
  {
    id: "u9",
    name: "Тэмүүжин",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=ТМ",
    gender: "Эрэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
  {
    id: "u10",
    name: "Уранчимэг",
    avatarSrc: "/placeholder.svg?height=40&width=40&text=УЧ",
    gender: "Эмэгтэй",
    status: "Онлайн",
    isBlocked: false,
  },
]

// Жишээ найзууд (allUsers-ийн дэд хэсэг)
const initialFriends: User[] = [
  { ...allUsers[0], status: "Онлайн", isBlocked: false },
  { ...allUsers[1], status: "Офлайн", isBlocked: false },
  { ...allUsers[2], status: "Онлайн", isBlocked: false },
  { ...allUsers[3], status: "Онлайн", isBlocked: false },
  { ...allUsers[4], status: "Офлайн", isBlocked: false },
]

export default function FriendsPage() {
  const [friends, setFriends] = useState<User[]>(initialFriends)
  const [searchTermFriends, setSearchTermFriends] = useState("")
  const [searchTermAddFriend, setSearchTermAddFriend] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [friendToDelete, setFriendToDelete] = useState<User | null>(null)
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false) // Шинэ state
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false) // Шинэ state
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false) // Шинэ state
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null) // Шинэ state
  const { toast } = useToast()

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTermFriends.toLowerCase()),
  )

  const usersNotFriends = allUsers.filter((user) => !friends.some((friend) => friend.id === user.id))

  const filteredUsersToAdd = usersNotFriends.filter((user) =>
    user.name.toLowerCase().includes(searchTermAddFriend.toLowerCase()),
  )

  const handleAddFriend = (userToAdd: User) => {
    setFriends((prevFriends) => [...prevFriends, { ...userToAdd, isBlocked: false }])
    toast({
      title: "Амжилттай",
      description: `${userToAdd.name} таны найзуудын жагсаалтад нэмэгдлээ.`,
    })
  }

  const handleDeleteFriendClick = (friend: User) => {
    setFriendToDelete(friend)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (friendToDelete) {
      setFriends((prevFriends) => prevFriends.filter((f) => f.id !== friendToDelete.id))
      toast({
        title: "Амжилттай",
        description: `${friendToDelete.name} найзуудын жагсаалтаас устгагдлаа.`,
      })
      setFriendToDelete(null)
      setIsDeleteDialogOpen(false)
      setIsDetailsDialogOpen(false) // Дэлгэрэнгүй диалогийг хаах
    }
  }

  const handleChatClick = (friend: User) => {
    setSelectedFriend(friend)
    setIsChatDialogOpen(true)
  }

  const handleCallClick = (friend: User) => {
    setSelectedFriend(friend)
    setIsCallDialogOpen(true)
  }

  const handleDetailsClick = (friend: User) => {
    setSelectedFriend(friend)
    setIsDetailsDialogOpen(true)
  }

  const handleToggleBlock = () => {
    if (selectedFriend) {
      setFriends((prevFriends) =>
        prevFriends.map((f) => (f.id === selectedFriend.id ? { ...f, isBlocked: !f.isBlocked } : f)),
      )
      toast({
        title: "Амжилттай",
        description: selectedFriend.isBlocked
          ? `${selectedFriend.name}-ийн блокийг цуцаллаа.`
          : `${selectedFriend.name}-ийг блоклолоо.`,
      })
      setSelectedFriend((prev) => (prev ? { ...prev, isBlocked: !prev.isBlocked } : null)) // selectedFriend-ийг шинэчлэх
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-8 px-4">
      <Card className="w-full max-w-md bg-zinc-900 text-white shadow-lg border-zinc-700">
        <CardHeader className="pb-4 border-b border-zinc-700">
          <div className="flex items-center mb-2">
            <Link href="/chat" passHref>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white -ml-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Буцах</span>
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold leading-tight ml-2">Миний найзууд ({friends.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 pt-6">
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-700 mb-6">
              <TabsTrigger
                value="friends"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-white"
              >
                Найзууд
              </TabsTrigger>
              <TabsTrigger
                value="add-friend"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-white"
              >
                Найз нэмэх
              </TabsTrigger>
            </TabsList>
            <TabsContent value="friends" className="w-full">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Нэрээр хайх..."
                  value={searchTermFriends}
                  onChange={(e) => setSearchTermFriends(e.target.value)}
                  className="pl-8 w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 mb-2 bg-zinc-800 rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-yellow-400">
                          <AvatarImage
                            src={
                              friend.avatarSrc && friend.avatarSrc !== "/placeholder.svg"
                                ? friend.avatarSrc
                                : friend.gender === "Эрэгтэй"
                                  ? "/images/male.avif"
                                  : friend.gender === "Эмэгтэй"
                                    ? "/images/female.avif"
                                    : "/placeholder.svg?height=40&width=40&query=default user avatar"
                            }
                            alt={friend.name}
                          />
                          <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-lg font-medium text-white">{friend.name}</span>
                          <p className={`text-sm ${friend.status === "Онлайн" ? "text-green-500" : "text-zinc-400"}`}>
                            {friend.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:bg-zinc-700"
                          onClick={() => handleChatClick(friend)}
                        >
                          <MessageSquare className="h-5 w-5" />
                          <span className="sr-only">Чатлах</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:bg-zinc-700"
                          onClick={() => handleCallClick(friend)}
                        >
                          <Phone className="h-5 w-5" />
                          <span className="sr-only">Дуудлага хийх</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:bg-zinc-700"
                          onClick={() => handleDetailsClick(friend)}
                        >
                          <ChevronRight className="h-5 w-5" />
                          <span className="sr-only">Дэлгэрэнгүй</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-zinc-400 py-4">Найз олдсонгүй.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="add-friend" className="w-full">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Нэрээр хайх..."
                  value={searchTermAddFriend}
                  onChange={(e) => setSearchTermAddFriend(e.target.value)}
                  className="pl-8 w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {filteredUsersToAdd.length > 0 ? (
                  filteredUsersToAdd.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 mb-2 bg-zinc-800 rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-yellow-400">
                          <AvatarImage
                            src={
                              user.avatarSrc && user.avatarSrc !== "/placeholder.svg"
                                ? user.avatarSrc
                                : user.gender === "Эрэгтэй"
                                  ? "/images/male.avif"
                                  : user.gender === "Эмэгтэй"
                                    ? "/images/female.avif"
                                    : "/placeholder.svg?height=40&width=40&query=default user avatar"
                            }
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-medium text-white">{user.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddFriend(user)}
                        className="bg-transparent border-zinc-700 text-white hover:bg-zinc-700"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span className="sr-only">Найз нэмэх</span>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-zinc-400 py-4">Нэмэх хэрэглэгч олдсонгүй.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-zinc-900 text-white border-zinc-700">
          <DialogHeader>
            <DialogTitle>Найзыг устгах</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Та <span className="font-bold text-red-500">{friendToDelete?.name}</span>-ийг найзуудын жагсаалтаас
              устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
            >
              Цуцлах
            </Button>
            <Button onClick={handleConfirmDelete} className="bg-red-500 text-white hover:bg-red-600">
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      {selectedFriend && (
        <ChatDialog
          isOpen={isChatDialogOpen}
          onClose={() => setIsChatDialogOpen(false)}
          friendName={selectedFriend.name}
          isBlocked={selectedFriend.isBlocked}
        />
      )}

      {/* Call Dialog */}
      {selectedFriend && (
        <CallDialog
          isOpen={isCallDialogOpen}
          onClose={() => setIsCallDialogOpen(false)}
          friendName={selectedFriend.name}
          friendAvatarSrc={
            selectedFriend.avatarSrc && selectedFriend.avatarSrc !== "/placeholder.svg"
              ? selectedFriend.avatarSrc
              : selectedFriend.gender === "Эрэгтэй"
                ? "/images/male.avif"
                : selectedFriend.gender === "Эмэгтэй"
                  ? "/images/female.avif"
                  : "/placeholder.svg?height=40&width=40"
          }
        />
      )}

      {/* Friend Details Dialog */}
      {selectedFriend && (
        <FriendDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          friendName={selectedFriend.name}
          isBlocked={selectedFriend.isBlocked}
          onDelete={() => handleDeleteFriendClick(selectedFriend)}
          onToggleBlock={handleToggleBlock}
        />
      )}
    </div>
  )
}
