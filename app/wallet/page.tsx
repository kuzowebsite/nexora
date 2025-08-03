"use client"
import { useState } from "react"
import { DialogTrigger } from "@/components/ui/dialog"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Copy,
  ArrowDown,
  ArrowUp,
  Repeat,
  Dice5,
  Check,
  Search,
  Filter,
  Plus,
  QrCode,
  Banknote,
  AlertCircle,
  Eye,
  EyeOff,
  ScanLine,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { TransactionSuccessDialog } from "@/components/transaction-success-dialog" // Import the new component
import { useToast } from "@/hooks/use-toast" // useToast-ийг импортлов
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Tabs-ийг импортлов

export default function WalletPage() {
  const [hasAccount, setHasAccount] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [balance, setBalance] = useState(15000)
  const [newAccountName, setNewAccountName] = useState("")
  const [copied, setCopied] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isTransferConfirmDialogOpen, setIsTransferConfirmDialogOpen] = useState(false)

  // Withdrawal states
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>("")
  const [bankName, setBankName] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")
  const [withdrawalStep, setWithdrawalStep] = useState(1) // 1: input, 2: confirm
  const [isWithdrawalConfirmDialogOpen, setIsWithdrawalConfirmDialogOpen] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [transactionPurpose, setTransactionPurpose] = useState("")

  // Transfer states
  const [transferAmount, setTransferAmount] = useState<number | string>("")
  const [transferRecipientAccount, setTransferRecipientAccount] = useState("")
  const [transferRecipientName, setTransferRecipientName] = useState("")
  const [transferPurpose, setTransferPurpose] = useState("")

  // Recharge states
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false)
  const [rechargeAmountInput, setRechargeAmountInput] = useState<number | string>("")
  const [rechargeStep, setRechargeStep] = useState(1)

  // View All Friends Dialog state
  const [isViewAllFriendsDialogOpen, setIsViewAllFriendsDialogOpen] = useState(false)
  const [isPinCreationDialogOpen, setIsPinCreationDialogOpen] = useState(false)
  const [pinCreationStep, setPinCreationStep] = useState(1)
  const [firstPin, setFirstPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [searchTermFriends, setSearchTermFriends] = useState("")

  // New states for transaction PIN confirmation
  const [isTransactionPinDialogOpen, setIsTransactionPinDialogOpen] = useState(false)
  const [transactionPin, setTransactionPin] = useState("")
  const [showTransactionPin, setShowTransactionPin] = useState(false)

  // State to store the user's created transaction PIN
  const [userTransactionPin, setUserTransactionPin] = useState<string | null>(null)
  // States for showing/hiding PIN during creation
  const [showFirstPin, setShowFirstPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)

  // State for success dialog
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [successDialogData, setSuccessDialogData] = useState<{
    type: "transfer" | "withdrawal" | "recharge"
    amount: number
    date: string
    time: string
    transactionId: string
    senderName?: string
    senderAvatar?: string
    recipientName?: string
    recipientAvatar?: string
    recipientAccount?: string
    purpose?: string
  } | null>(null)

  // New state to track which transaction type is pending PIN confirmation
  const [pendingTransactionType, setPendingTransactionType] = useState<
    "withdrawal" | "transfer" | "scan-transfer" | null
  >(null)

  const { toast } = useToast() // useToast-ийг эхлүүлэв

  // New states for QR/Scan functionality
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)
  const [qrTab, setQrTab] = useState("my-qr") // 'my-qr' or 'scan'
  const [isScanResultDialogOpen, setIsScanResultDialogOpen] = useState(false)
  const [scannedRecipientAccount, setScannedRecipientAccount] = useState("")
  const [scannedRecipientName, setScannedRecipientName] = useState("")
  const [scannedAmount, setScannedAmount] = useState<number | string>("")
  const [scannedPurpose, setScannedPurpose] = useState("")
  const [scanStep, setScanStep] = useState(1) // 1: input, 2: confirm

  const [transactions, setTransactions] = useState([
    { id: 1, description: "Судалгаа бөглөсөн шагнал", amount: "+500", date: "2025.07.30 14:30", type: "reward" },
    { id: 2, description: "Данс цэнэглэсэн", amount: "+10000", date: "2025.07.29 10:00", type: "deposit" },
    { id: 3, description: "Судалгаа үүсгэсэн төлбөр", amount: "-2000", date: "2025.07.28 16:45", type: "payment" },
    { id: 4, description: "Судалгаа бөглөсөн шагнал", amount: "+300", date: "2025.07.28 11:15", type: "reward" },
    { id: 5, description: "Данс цэнэглэсэн", amount: "+5000", date: "2025.07.27 09:30", type: "deposit" },
    { id: 6, description: "Судалгаа бөглөсөн шагнал", amount: "+700", date: "2025.07.26 18:00", type: "reward" },
    { id: 7, description: "Судалгаа үүсгэсэн төлбөр", amount: "-1500", date: "2025.07.25 13:00", type: "payment" },
    { id: 8, description: "Судалгаа бөглөсөн шагнал", amount: "+400", date: "2025.07.24 09:00", type: "reward" },
    { id: 9, description: "Данс цэнэглэсэн", amount: "+2000", date: "2025.07.23 17:00", type: "deposit" },
    { id: 10, description: "Судалгаа бөглөсөн шагнал", amount: "+600", date: "2025.07.22 14:00", type: "reward" },
    { id: 11, description: "Мөнгө татсан", amount: "-1000", date: "2025.07.21 10:00", type: "withdrawal" },
    {
      id: 12,
      description: "Гүйлгээ хийсэн",
      amount: "-500",
      date: "2025.07.20 15:00",
      type: "transfer",
      targetAccount: "12345678",
    },
  ])

  const friends = [
    { id: "f1", name: "Add", avatarSrc: "", isAdd: true, accountNumber: "", fullName: "" },
    {
      id: "f2",
      name: "Xavier",
      avatarSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i42Hy3UMKWmwTk8Tz0Cuz6DUp0Sdgq.png?query=man%20with%20beard%20and%20suit",
      accountNumber: "12345678",
      fullName: "Xavier Bold",
    },
    {
      id: "f3",
      name: "Nolan",
      avatarSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i42Hy3UMKWmwTk8Tz0Cuz6DUp0Sdgq.png?query=man%20with%20dark%20hair%20and%20suit",
      accountNumber: "87654321",
      fullName: "Nolan Bat",
    },
    {
      id: "f4",
      name: "Addison",
      avatarSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i42Hy3UMKWmwTk8Tz0Cuz6DUp0Sdgq.png?query=asian%20man%20smiling",
      accountNumber: "11223344",
      fullName: "Addison Enkh",
    },
    {
      id: "f5",
      name: "Olivia",
      avatarSrc:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i42Hy3UMKWmwTk8Tz0Cuz6DUp0Sdgq.png?query=woman%20with%20dark%20hair%20and%20red%20shirt",
      accountNumber: "55667788",
      fullName: "Olivia Tsetseg",
    },
    {
      id: "f6",
      name: "Liam",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=LI",
      accountNumber: "99887766",
      fullName: "Liam Gan",
    },
    {
      id: "f7",
      name: "Sophia",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=SO",
      accountNumber: "10203040",
      fullName: "Sophia Ulaan",
    },
    {
      id: "f8",
      name: "Noah",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=NO",
      accountNumber: "20304050",
      fullName: "Noah Khulan",
    },
    {
      id: "f9",
      name: "Emma",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=EM",
      accountNumber: "30405060",
      fullName: "Emma Saruul",
    },
    {
      id: "f10",
      name: "Jackson",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=JA",
      accountNumber: "40506070",
      fullName: "Jackson Temuujin",
    },
  ]

  const generateRandomAccountNumber = () => {
    let num = ""
    for (let i = 0; i < 8; i++) {
      num += Math.floor(Math.random() * 10)
    }
    setAccountNumber(num)
  }

  const handleCreateAccount = () => {
    if (accountNumber.length === 8 && newAccountName.trim() !== "") {
      setIsPinCreationDialogOpen(true)
      setPinCreationStep(1)
      setFirstPin("")
      setConfirmPin("")
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Дансны дугаар 8 оронтой, дансны нэр хоосон биш байх ёстой.",
      })
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleWithdrawalAmountSubmit = () => {
    const amount = Number(withdrawalAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Зөв мөнгөн дүн оруулна уу.",
      })
      return
    }
    if (amount > balance) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Дансны үлдэгдэл хүрэлцэхгүй байна.",
      })
      return
    }
    if (!bankName || !recipientAccount || !recipientName || !transactionPurpose) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Бүх талбарыг бөглөнө үү.",
      })
      return
    }
    setWithdrawalStep(2)
  }

  const executeWithdrawal = () => {
    const amount = Number(withdrawalAmount)
    const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Simulate withdrawal
    setBalance((prevBalance) => prevBalance - amount)
    setTransactions((prevTransactions) => [
      {
        id: prevTransactions.length + 1,
        description: transactionPurpose,
        amount: `-${amount}`,
        date: format(new Date(), "yyyy.MM.dd HH:mm"),
        type: "withdrawal",
      },
      ...prevTransactions,
    ])

    setSuccessDialogData({
      type: "withdrawal",
      amount: amount,
      date: format(new Date(), "yyyy.MM.dd"),
      time: format(new Date(), "HH:mm"),
      transactionId: transactionId,
      senderName: accountName, // Current user's account name
      senderAvatar: "/placeholder.svg?height=40&width=40&text=ТА", // Placeholder for current user
      recipientName: recipientName,
      recipientAvatar: "/placeholder.svg?height=40&width=40&text=Х", // Placeholder for recipient
      recipientAccount: recipientAccount, // Pass recipient account for withdrawal
      purpose: transactionPurpose,
    })
    setIsSuccessDialogOpen(true)

    setWithdrawalAmount("")
    setBankName("")
    setRecipientAccount("")
    setRecipientName("")
    setTransactionPurpose("")
  }

  const handleWithdrawalConfirm = () => {
    setIsWithdrawalConfirmDialogOpen(false) // Close the confirmation dialog
    setPendingTransactionType("withdrawal") // Set pending transaction type
    setIsTransactionPinDialogOpen(true) // Open the PIN dialog
  }

  const handleTransferAmountSubmit = () => {
    const amount = Number(transferAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Зөв мөнгөн дүн оруулна уу.",
      })
      return
    }
    if (amount > balance) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Дансны үлдэгдэл хүрэлцэхгүй байна.",
      })
      return
    }
    if (!transferRecipientAccount || !transferRecipientName || !transferPurpose) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Бүх талбарыг бөглөнө үү.",
      })
      return
    }
    setIsTransferDialogOpen(false) // Close the input dialog
    setIsTransferConfirmDialogOpen(true) // Open the confirmation dialog
  }

  const executeTransfer = () => {
    const amount = Number(transferAmount)
    const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()

    setBalance((prevBalance) => prevBalance - amount)
    setTransactions((prevTransactions) => [
      {
        id: prevTransactions.length + 1,
        description: transferPurpose,
        amount: `-${amount}`,
        date: format(new Date(), "yyyy.MM.dd HH:mm"),
        type: "transfer",
        targetAccount: transferRecipientAccount,
      },
      ...prevTransactions,
    ])

    setSuccessDialogData({
      type: "transfer",
      amount: amount,
      date: format(new Date(), "yyyy.MM.dd"),
      time: format(new Date(), "HH:mm"),
      transactionId: transactionId,
      senderName: accountName, // Current user's account name
      senderAvatar: "/placeholder.svg?height=40&width=40&text=ТА", // Placeholder for current user
      recipientName: transferRecipientName,
      recipientAvatar:
        friends.find((f) => f.accountNumber === transferRecipientAccount)?.avatarSrc ||
        "/placeholder.svg?height=40&width=40&text=Х", // Find recipient avatar
      recipientAccount: transferRecipientAccount, // Pass recipient account for transfer
      purpose: transferPurpose,
    })
    setIsSuccessDialogOpen(true)

    setTransferAmount("")
    setTransferRecipientAccount("")
    setTransferRecipientName("")
    setTransferPurpose("")
  }

  const handleTransferConfirm = () => {
    setIsTransferConfirmDialogOpen(false) // Close the confirmation dialog
    setPendingTransactionType("transfer") // Set pending transaction type
    setIsTransactionPinDialogOpen(true) // Open the PIN dialog
  }

  const executeScanTransfer = () => {
    const amount = Number(scannedAmount)
    const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()

    setBalance((prevBalance) => prevBalance - amount)
    setTransactions((prevTransactions) => [
      {
        id: prevTransactions.length + 1,
        description: scannedPurpose,
        amount: `-${amount}`,
        date: format(new Date(), "yyyy.MM.dd HH:mm"),
        type: "transfer",
        targetAccount: scannedRecipientAccount,
      },
      ...prevTransactions,
    ])

    setSuccessDialogData({
      type: "transfer",
      amount: amount,
      date: format(new Date(), "yyyy.MM.dd"),
      time: format(new Date(), "HH:mm"),
      transactionId: transactionId,
      senderName: accountName, // Current user's account name
      senderAvatar: "/placeholder.svg?height=40&width=40&text=ТА", // Placeholder for current user
      recipientName: scannedRecipientName,
      recipientAvatar:
        friends.find((f) => f.accountNumber === scannedRecipientAccount)?.avatarSrc ||
        "/placeholder.svg?height=40&width=40&text=Х", // Find recipient avatar
      recipientAccount: scannedRecipientAccount, // Pass recipient account for transfer
      purpose: scannedPurpose,
    })
    setIsSuccessDialogOpen(true)

    setScannedAmount("")
    setScannedPurpose("")
    setScannedRecipientAccount("")
    setScannedRecipientName("")
  }

  const handleTransactionPinConfirm = () => {
    if (!userTransactionPin) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Та эхлээд данс үүсгэж, гүйлгээний нууц код үүсгэх шаардлагатай.",
      })
      setIsTransactionPinDialogOpen(false)
      return
    }

    if (transactionPin.length === 6 && /^\d+$/.test(transactionPin)) {
      if (transactionPin === userTransactionPin) {
        // Validate against the stored PIN
        if (pendingTransactionType === "withdrawal") {
          executeWithdrawal()
          setIsWithdrawalDialogOpen(false) // Close main withdrawal dialog
          setWithdrawalStep(1) // Reset withdrawal step
        } else if (pendingTransactionType === "transfer") {
          executeTransfer()
          setIsTransferDialogOpen(false) // Close main transfer dialog
        } else if (pendingTransactionType === "scan-transfer") {
          executeScanTransfer()
          setIsScanResultDialogOpen(false) // Close scan result dialog
          setScanStep(1) // Reset scan step
        }
        setIsTransactionPinDialogOpen(false) // Close PIN dialog
        setTransactionPin("") // Clear PIN input
        setPendingTransactionType(null) // Reset pending transaction type
      } else {
        toast({
          variant: "destructive",
          title: "Алдаа",
          description: "Буруу нууц код. Дахин оролдоно уу.",
        })
        setTransactionPin("") // Clear PIN input
      }
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Нууц код 6 оронтой тоо байх ёстой.",
      })
    }
  }

  const handleRechargeAmountSubmit = () => {
    const amount = Number(rechargeAmountInput)
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Зөв мөнгөн дүн оруулна уу.",
      })
      return
    }
    setRechargeStep(2)
  }

  const handleRechargeComplete = () => {
    const amount = Number(rechargeAmountInput)
    const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase()

    setBalance((prevBalance) => prevBalance + amount)
    setTransactions((prevTransactions) => [
      {
        id: prevTransactions.length + 1,
        description: "Данс цэнэглэсэн",
        amount: `+${amount}`,
        date: format(new Date(), "yyyy.MM.dd HH:mm"),
        type: "deposit",
      },
      ...prevTransactions,
    ])

    setSuccessDialogData({
      type: "recharge",
      amount: amount,
      date: format(new Date(), "yyyy.MM.dd"),
      time: format(new Date(), "HH:mm"),
      transactionId: transactionId,
      recipientName: accountName, // Current user's account name is the recipient
      recipientAvatar: "/placeholder.svg?height=40&width=40&text=ТА", // Placeholder for current user
      recipientAccount: accountNumber, // Pass current user's account number for recharge
      purpose: "Данс цэнэглэсэн",
    })
    setIsSuccessDialogOpen(true)

    setIsRechargeDialogOpen(false)
    setRechargeAmountInput("")
    setRechargeStep(1)
  }

  const handlePinEnter = () => {
    if (firstPin.length === 6 && /^\d+$/.test(firstPin)) {
      setPinCreationStep(2)
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Нууц код 6 оронтой тоо байх ёстой.",
      })
    }
  }

  const handlePinConfirm = () => {
    if (confirmPin.length === 6 && /^\d+$/.test(confirmPin)) {
      if (firstPin === confirmPin) {
        setAccountName(newAccountName) // Set account name here after PIN is confirmed
        setHasAccount(true)
        setUserTransactionPin(confirmPin) // Store the confirmed PIN
        setIsPinCreationDialogOpen(false)
        toast({
          title: "Амжилттай",
          description: "Данс амжилттай үүсгэгдлээ! Таны нууц код амжилттай үүсгэгдлээ.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Алдаа",
          description: "Нууц код таарахгүй байна. Дахин оруулна уу.",
        })
        setFirstPin("")
        setConfirmPin("")
        setPinCreationStep(1)
      }
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Нууц код 6 оронтой тоо байх ёстой.",
      })
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearchTerm =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.type === "transfer" && tx.targetAccount?.includes(searchTerm))

    const transactionDate = new Date(tx.date.split(" ")[0].replace(/\./g, "-"))

    const matchesStartDate = startDate ? transactionDate >= startDate : true
    const matchesEndDate = endDate ? transactionDate >= endDate : true // Changed to >= for end date

    return matchesSearchTerm && matchesStartDate && matchesEndDate
  })

  const handleFriendSelect = (friend: (typeof friends)[number]) => {
    if (!friend.isAdd) {
      setTransferRecipientAccount(friend.accountNumber)
      setTransferRecipientName(friend.fullName)
      setIsViewAllFriendsDialogOpen(false)
      setIsTransferDialogOpen(true)
    }
  }

  const filteredFriends = friends.filter((friend) => {
    if (friend.isAdd) return false
    return (
      friend.fullName.toLowerCase().includes(searchTermFriends.toLowerCase()) ||
      friend.accountNumber.includes(searchTermFriends)
    )
  })

  const handleScanQrCode = () => {
    // Simulate scanning a QR code and getting recipient details
    const randomFriend = friends.filter((f) => !f.isAdd)[Math.floor(Math.random() * (friends.length - 1))]
    if (randomFriend) {
      setScannedRecipientAccount(randomFriend.accountNumber)
      setScannedRecipientName(randomFriend.fullName)
      setScannedAmount("") // Reset amount
      setScannedPurpose("") // Reset purpose
      setScanStep(1) // Go to input step
      setIsQrDialogOpen(false) // Close QR/Scan dialog
      setIsScanResultDialogOpen(true) // Open scan result dialog
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Уншуулах найз олдсонгүй.",
      })
    }
  }

  const handleScanResultSubmit = () => {
    const amount = Number(scannedAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Зөв мөнгөн дүн оруулна уу.",
      })
      return
    }
    if (amount > balance) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Дансны үлдэгдэл хүрэлцэхгүй байна.",
      })
      return
    }
    if (!scannedPurpose) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Гүйлгээний утгыг бөглөнө үү.",
      })
      return
    }
    setScanStep(2) // Move to confirmation step
  }

  const handleScanResultConfirm = () => {
    setIsScanResultDialogOpen(false) // Close confirmation dialog
    setPendingTransactionType("scan-transfer") // Set pending transaction type
    setIsTransactionPinDialogOpen(true) // Open PIN dialog
  }

  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[number] | null>(null)

  const handleTransactionClick = (transaction: (typeof transactions)[number]) => {
    setSelectedTransaction(transaction)
    const amount = Number(transaction.amount.replace(/[+-]/g, ""))
    const [datePart, timePart] = transaction.date.split(" ")

    let dialogType: "transfer" | "withdrawal" | "recharge" = "recharge" // Default to recharge
    const senderName = accountName
    const senderAvatar = "/placeholder.svg?height=40&width=40&text=ТА"
    let recipientName = accountName
    let recipientAvatar = "/placeholder.svg?height=40&width=40&text=ТА"
    let recipientAccount = accountNumber
    let purpose = transaction.description

    if (transaction.type === "withdrawal") {
      dialogType = "withdrawal"
      recipientName = "Таны банкны данс" // Placeholder for bank account
      recipientAvatar = "/placeholder.svg?height=40&width=40&text=Б" // Placeholder for bank
      recipientAccount = "Банкны данс" // Placeholder for bank account number
    } else if (transaction.type === "transfer") {
      dialogType = "transfer"
      // For transfers, we need to determine recipient details if available
      const targetFriend = friends.find((f) => f.accountNumber === transaction.targetAccount)
      if (targetFriend) {
        recipientName = targetFriend.fullName
        recipientAvatar = targetFriend.avatarSrc
        recipientAccount = targetFriend.accountNumber
      } else {
        recipientName = "Үл мэдэгдэх" // Default if not found in friends
        recipientAvatar = "/placeholder.svg?height=40&width=40&text=Х"
        recipientAccount = transaction.targetAccount || "N/A"
      }
    } else if (transaction.type === "reward") {
      dialogType = "recharge" // Treat rewards as recharge for success dialog display
      purpose = "Судалгааны шагнал"
    } else if (transaction.type === "payment") {
      dialogType = "transfer" // Treat payments as transfers for success dialog display
      recipientName = "Үйлчилгээний төлбөр" // Placeholder for service payment
      recipientAvatar = "/placeholder.svg?height=40&width=40&text=Ү"
      recipientAccount = "N/A"
    }

    setSuccessDialogData({
      type: dialogType,
      amount: amount,
      date: datePart,
      time: timePart,
      transactionId: transaction.id.toString(), // Use transaction ID as unique identifier
      senderName: senderName,
      senderAvatar: senderAvatar,
      recipientName: recipientName,
      recipientAvatar: recipientAvatar,
      recipientAccount: recipientAccount,
      purpose: purpose,
    })
    setIsSuccessDialogOpen(true)
  }

  return (
    <div className="container mx-auto pt-0 px-4 md:px-6">
      <Card className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg">
        <CardHeader className="pb-4"></CardHeader>
        <CardContent className="grid gap-6">
          <>
            {!hasAccount ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Сайн байна уу!</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                  Та өөрийн дансны дугаар болон Дансны нэр үүсгэн үү.
                </p>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="account-number">Дансны дугаар (8 оронтой)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="account-number"
                        type="text"
                        placeholder="Дансны дугаар"
                        maxLength={8}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={generateRandomAccountNumber}
                        className="bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <Dice5 className="h-5 w-5" />
                        <span className="sr-only">Санамсаргүй дугаар үүсгэх</span>
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account-name">Дансны нэр</Label>
                    <Input
                      id="account-name"
                      type="text"
                      placeholder="Жишээ: Миний түрүүвч"
                      value={newAccountName}
                      onChange={(e) => setNewAccountName(e.target.value)}
                      className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <Button
                    onClick={handleCreateAccount}
                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    Данс үүсгэх
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Дансны мэдээлэл */}
                <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Данс:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 dark:text-white">{accountNumber}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyClick}
                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Дансны дугаар хуулах</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Дансны нэр:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{accountName}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-medium">Дансндх дүн:</span>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">{balance}₮</span>
                  </div>
                </div>

                {/* Үйлчилгээний товчлуур */}
                <div className="flex justify-around gap-x-2 mt-2 flex-nowrap">
                  <Dialog open={isWithdrawalDialogOpen} onOpenChange={setIsWithdrawalDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-1/4 flex flex-col items-center justify-center h-12 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <ArrowDown className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">Татах</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                      <DialogHeader className="px-4 pt-4">
                        <DialogTitle>Гүйлгээ хийх</DialogTitle>
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">MNT</span>
                            <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 max-h-[calc(80vh-180px)] overflow-y-auto px-4">
                        <div className="grid gap-2">
                          <Label htmlFor="withdrawal-amount">Мөнгөн дүн (₮)</Label>
                          <Input
                            id="withdrawal-amount"
                            type="number"
                            placeholder="0.00"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bank-name">Банкны нэр</Label>
                          <Input
                            id="bank-name"
                            type="text"
                            placeholder="Жишээ: Хаан Банк"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="recipient-account">Хүлээн авагчийн данс</Label>
                          <Input
                            id="recipient-account"
                            type="text"
                            placeholder="Дансны дугаар"
                            value={recipientAccount}
                            onChange={(e) => setRecipientAccount(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="recipient-name">Хүлээн авагчийн нэр</Label>
                          <Input
                            id="recipient-name"
                            type="text"
                            placeholder="Хүлээн авагчийн нэр"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="transaction-purpose">Гүйлгээ утга</Label>
                          <Textarea
                            id="transaction-purpose"
                            placeholder="Гүйлгээний зорилго"
                            value={transactionPurpose}
                            onChange={(e) => setTransactionPurpose(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="button"
                          onClick={handleWithdrawalAmountSubmit}
                          className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Үргэлжлүүлэх
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Withdrawal Confirmation Dialog */}
                  <Dialog
                    open={withdrawalStep === 2 && isWithdrawalDialogOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        setWithdrawalStep(1)
                        setIsWithdrawalDialogOpen(false)
                      }
                    }}
                  >
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
                      <DialogHeader className="px-4 pt-4">
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">
                              Та таталт хийхээсээ өмнө банк, хүлээн авагчийн мэдээлэл, дансны дугаар, мөнгөн дүнг дахин
                              хянаж баталгаажуулна уу.
                            </span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 px-4">
                        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Татах дүн</span>
                          <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                            {Number(withdrawalAmount).toFixed(2)}₮
                          </span>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Банкны нэр:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{bankName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн нэр:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{recipientName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн данс:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{recipientAccount}</span>
                          </div>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-lg font-medium">Гүйлгээний утга:</span>
                          <span className="text-zinc-900 dark:text-white">{transactionPurpose}</span>
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="button"
                          onClick={handleWithdrawalConfirm}
                          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Баталгаажуулах
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* New: Transaction PIN Confirmation Dialog */}
                  <Dialog open={isTransactionPinDialogOpen} onOpenChange={setIsTransactionPinDialogOpen}>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
                      <DialogHeader className="px-4 pt-4">
                        <div className="flex flex-col items-center justify-center gap-2 mb-4">
                          <AlertCircle className="h-12 w-12 text-yellow-500" />
                          <DialogTitle className="text-2xl font-bold">Гүйлгээний нууц код</DialogTitle>
                        </div>
                        <DialogDescription className="text-center text-zinc-600 dark:text-zinc-300">
                          Гүйлгээний нууц кодоо оруулан баталгаажуулна уу.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 px-4">
                        <div className="grid gap-2">
                          <Label htmlFor="transaction-pin">Нууц код</Label>
                          <div className="relative">
                            <Input
                              id="transaction-pin"
                              type={showTransactionPin ? "text" : "password"}
                              placeholder="******"
                              maxLength={6}
                              value={transactionPin}
                              onChange={(e) => setTransactionPin(e.target.value)}
                              className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setShowTransactionPin(!showTransactionPin)}
                              className="absolute right-1 top-1 h-8 w-8 text-zinc-600 hover:bg-transparent dark:text-zinc-400 dark:hover:bg-transparent"
                            >
                              {showTransactionPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showTransactionPin ? "Нууц кодыг нуух" : "Нууц кодыг харах"}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="submit"
                          onClick={handleTransactionPinConfirm}
                          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Баталгаажуулах
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-1/4 flex flex-col items-center justify-center h-12 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <ArrowUp className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">Цэнэглэх</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                      <DialogHeader className="px-4 pt-4">
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">MNT</span>
                            <span className="text-4xl font-bold">{Number(rechargeAmountInput).toFixed(2)}</span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      {rechargeStep === 1 ? (
                        <div className="grid gap-4 py-4 px-4">
                          <div className="grid gap-2">
                            <Label htmlFor="recharge-amount-input">Мөнгөн дүн</Label>
                            <Input
                              id="recharge-amount-input"
                              type="number"
                              placeholder="0.00"
                              value={rechargeAmountInput}
                              onChange={(e) => setRechargeAmountInput(e.target.value)}
                              className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-6 py-4 max-h-[calc(80vh-180px)] overflow-y-auto px-4">
                          {/* QR Төлбөр */}
                          <div className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md text-center">
                            <h4 className="text-lg font-medium flex items-center justify-center gap-2 mb-3">
                              <QrCode className="h-5 w-5" /> QR Төлбөр
                            </h4>
                            <Image
                              src="/images/qr-code.png"
                              alt="QR Code"
                              width={200}
                              height={200}
                              className="mx-auto mb-4 rounded-md"
                            />
                            <p className="text-zinc-600 dark:text-zinc-300">
                              Дээрх QR кодыг уншуулан{" "}
                              <span className="font-bold text-zinc-900 dark:text-white">{rechargeAmountInput}₮</span>
                              төлбөрөө хийнэ үү.
                            </p>
                            <Button
                              onClick={handleRechargeComplete}
                              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                            >
                              Төлбөр хийсэн
                            </Button>
                          </div>

                          {/* Банкны Апп Төлбөр */}
                          <div className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                            <h4 className="text-lg font-medium flex items-center justify-center gap-2 mb-3">
                              <Banknote className="h-5 w-5" /> Банкны Апп Төлбөр
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex flex-col items-center gap-2">
                                <Image
                                  src="/images/khanbank.png"
                                  alt="Хаан Банк"
                                  width={60}
                                  height={60}
                                  className="rounded-lg"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Хаан Банк</span>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <Image
                                  src="/images/toriinbank.png"
                                  alt="Төрийн Банк"
                                  width={60}
                                  height={60}
                                  className="rounded-lg"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Төрийн Банк</span>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <Image
                                  src="/images/golomt.png"
                                  alt="Голомт Банк"
                                  width={60}
                                  height={60}
                                  className="rounded-lg"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Голомт Банк</span>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                <Image
                                  src="/images/tdb.png"
                                  alt="Худалдаа Хөгжлийн Банк"
                                  width={60}
                                  height={60}
                                  className="rounded-lg"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">ХХБ</span>
                              </div>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300">
                              Та өөрийн банкны апп-аар{" "}
                              <span className="font-bold text-zinc-900 dark:text-white">{rechargeAmountInput}₮</span>
                              төлбөрөө хийнэ үү:
                            </p>
                            <Button
                              onClick={handleRechargeComplete}
                              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                            >
                              Төлбөр хийсэн
                            </Button>
                          </div>
                        </div>
                      )}
                      <DialogFooter className="px-4 pb-4">
                        {rechargeStep === 1 && (
                          <Button
                            type="submit"
                            onClick={handleRechargeAmountSubmit}
                            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                          >
                            Үргэлжлүүлэх
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-1/4 flex flex-col items-center justify-center h-12 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <Repeat className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">Гүйлгээ</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 flex flex-col max-h-[90vh] p-4">
                      <DialogHeader className="p-0">
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-2 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">MNT</span>
                            <span className="text-4xl font-bold">{balance.toFixed(2)}₮</span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-zinc-900 rounded-md mt-2 mb-4 text-white p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold mt-2">Хурдан илгээх</h3>
                          <Dialog open={isViewAllFriendsDialogOpen} onOpenChange={setIsViewAllFriendsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="link" className="p-0 h-auto text-sm text-yellow-400 hover:underline">
                                Бүгдийг харах
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 p-4">
                              <DialogHeader>
                                <DialogTitle>Бүх найзууд</DialogTitle>
                                <div className="relative mt-2">
                                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                  <Input
                                    type="text"
                                    placeholder="Нэрээр хайх..."
                                    value={searchTermFriends}
                                    onChange={(e) => setSearchTermFriends(e.target.value)}
                                    className="pl-8 w-full bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                                  />
                                </div>
                              </DialogHeader>
                              <div className="grid gap-4 py-4 max-h-[calc(80vh-180px)] overflow-y-auto">
                                {filteredFriends.length > 0 ? (
                                  filteredFriends.map((friend) => (
                                    <div
                                      key={friend.id}
                                      className="flex items-center gap-3 p-2 bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
                                      onClick={() => handleFriendSelect(friend)}
                                    >
                                      <Avatar className="h-12 w-12 border-2 border-yellow-400">
                                        <AvatarImage
                                          src={friend.avatarSrc || "/placeholder.svg"}
                                          alt={friend.fullName}
                                        />
                                        <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="text-lg font-medium">{friend.fullName}</span>
                                        <span className="text-sm text-zinc-600 dark:text-zinc-300">
                                          {friend.accountNumber}
                                        </span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-center text-zinc-600 dark:text-zinc-400 py-4">
                                    Хайлтад тохирох найз олдсонгүй.
                                  </p>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="flex space-x-3 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                          {friends.slice(0, 5).map((friend) => (
                            <div
                              key={friend.id}
                              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                              onClick={() => handleFriendSelect(friend)}
                            >
                              {friend.isAdd ? (
                                <div className="h-12 w-12 rounded-full border-2 border-dashed border-zinc-500 flex items-center justify-center text-zinc-400">
                                  <Plus className="h-6 w-6" />
                                </div>
                              ) : (
                                <Avatar className="h-12 w-12 border-2 border-yellow-400">
                                  <AvatarImage src={friend.avatarSrc || "/placeholder.svg"} alt={friend.name} />
                                  <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              )}
                              <span className="text-xs mt-1 text-zinc-300">{friend.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-4 flex-1 overflow-y-auto">
                        <div className="grid gap-2">
                          <Label htmlFor="transfer-amount">Мөнгөн дүн</Label>
                          <Input
                            id="transfer-amount"
                            type="number"
                            placeholder="0.00"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="transfer-recipient-account">Хүлээн авагчийн данс</Label>
                          <Input
                            id="transfer-recipient-account"
                            type="text"
                            placeholder="Дансны дугаар"
                            value={transferRecipientAccount}
                            onChange={(e) => setTransferRecipientAccount(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="transfer-recipient-name">Хүлээн авагч</Label>
                          <Input
                            id="transfer-recipient-name"
                            type="text"
                            placeholder="Хүлээн авагчийн нэр"
                            value={transferRecipientName}
                            onChange={(e) => setTransferRecipientName(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="transfer-purpose">Гүйлгээний утга</Label>
                          <Textarea
                            id="transfer-purpose"
                            placeholder="Гүйлгээний зорилго"
                            value={transferPurpose}
                            onChange={(e) => setTransferPurpose(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button
                          type="submit"
                          onClick={handleTransferAmountSubmit}
                          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Үргэлжлүүлэх
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={isTransferConfirmDialogOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        setIsTransferConfirmDialogOpen(false)
                      }
                    }}
                  >
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
                      <DialogHeader className="px-4 pt-4">
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">
                              Та гүйлгээ хийхээсээ өмнө хүлээн авагчийн мэдээлэл, дансны дугаар, мөнгөн дүнг дахин хянаж
                              баталгаажуулна уу.
                            </span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 px-4">
                        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Гүйлгээний дүн</span>
                          <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                            {Number(transferAmount).toFixed(2)}₮
                          </span>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн нэр:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{transferRecipientName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн данс:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{transferRecipientAccount}</span>
                          </div>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-lg font-medium">Гүйлгээний утга:</span>
                          <span className="text-zinc-900 dark:text-white">{transferPurpose}</span>
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="button"
                          onClick={handleTransferConfirm}
                          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Баталгаажуулах
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* QR / Scan Dialog */}
                  <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-1/4 flex flex-col items-center justify-center h-12 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        onClick={() => setQrTab("my-qr")} // Default to My QR tab
                      >
                        <QrCode className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium">QR</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                      <DialogHeader className="px-4 pt-4">
                        <DialogTitle>QR код</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="my-qr" className="w-full px-4" onValueChange={setQrTab}>
                        <TabsList className="grid w-full grid-cols-2 bg-zinc-200 dark:bg-zinc-700">
                          <TabsTrigger
                            value="my-qr"
                            className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
                          >
                            Миний QR
                          </TabsTrigger>
                          <TabsTrigger
                            value="scan"
                            className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white dark:data-[state=active]:bg-yellow-400 dark:data-[state=active]:text-zinc-900 text-zinc-900 dark:text-white"
                          >
                            QR Уншуулах
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="my-qr" className="mt-4">
                          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                            <Image
                              src="/placeholder.svg?height=200&width=200&text=QR%20Code"
                              alt="My QR Code"
                              width={200}
                              height={200}
                              className="rounded-md"
                            />
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                              Энэ QR кодыг бусдад харуулан мөнгө хүлээн авах боломжтой.
                            </p>
                            {/* In a real app, you'd use a library like 'qrcode.react' to generate a QR code from accountNumber and accountName */}
                          </div>
                        </TabsContent>
                        <TabsContent value="scan" className="mt-4">
                          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                            <ScanLine className="h-24 w-24 text-zinc-600 dark:text-zinc-300" />
                            <p className="text-lg font-medium text-center">
                              QR код уншуулахын тулд доорх товчийг дарна уу.
                            </p>
                            <Button
                              onClick={handleScanQrCode}
                              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                            >
                              QR код уншуулах
                            </Button>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                              (Энэ нь жишээ уншилт бөгөөд бодит QR сканер биш.)
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {/* Scan Result Input Dialog */}
                  <Dialog open={isScanResultDialogOpen && scanStep === 1} onOpenChange={setIsScanResultDialogOpen}>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                      <DialogHeader className="px-4 pt-4">
                        <DialogTitle>Гүйлгээ хийх</DialogTitle>
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">MNT</span>
                            <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 max-h-[calc(80vh-180px)] overflow-y-auto px-4">
                        <div className="grid gap-2">
                          <Label htmlFor="scanned-recipient-name">Хүлээн авагчийн нэр</Label>
                          <Input
                            id="scanned-recipient-name"
                            type="text"
                            value={scannedRecipientName}
                            readOnly
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="scanned-recipient-account">Хүлээн авагчийн данс</Label>
                          <Input
                            id="scanned-recipient-account"
                            type="text"
                            value={scannedRecipientAccount}
                            readOnly
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="scanned-amount">Мөнгөн дүн (₮)</Label>
                          <Input
                            id="scanned-amount"
                            type="number"
                            placeholder="0.00"
                            value={scannedAmount}
                            onChange={(e) => setScannedAmount(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="scanned-purpose">Гүйлгээ утга</Label>
                          <Textarea
                            id="scanned-purpose"
                            placeholder="Гүйлгээний зорилго"
                            value={scannedPurpose}
                            onChange={(e) => setScannedPurpose(e.target.value)}
                            className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="button"
                          onClick={handleScanResultSubmit}
                          className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Үргэлжлүүлэх
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Scan Result Confirmation Dialog */}
                  <Dialog open={isScanResultDialogOpen && scanStep === 2} onOpenChange={setIsScanResultDialogOpen}>
                    <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
                      <DialogHeader className="px-4 pt-4">
                        <DialogDescription className="p-0">
                          <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                            <span className="text-sm font-medium text-zinc-400">
                              Та гүйлгээ хийхээсээ өмнө хүлээн авагчийн мэдээлэл, дансны дугаар, мөнгөн дүнг дахин хянаж
                              баталгаажуулна уу.
                            </span>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 px-4">
                        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Гүйлгээний дүн</span>
                          <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                            {Number(scannedAmount).toFixed(2)}₮
                          </span>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн нэр:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{scannedRecipientName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Хүлээн авагчийн данс:</span>
                            <span className="font-bold text-zinc-900 dark:text-white">{scannedRecipientAccount}</span>
                          </div>
                        </div>
                        <div className="grid gap-2 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md">
                          <span className="text-lg font-medium">Гүйлгээний утга:</span>
                          <span className="text-zinc-900 dark:text-white">{scannedPurpose}</span>
                        </div>
                      </div>
                      <DialogFooter className="px-4 pb-4">
                        <Button
                          type="button"
                          onClick={handleScanResultConfirm}
                          className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        >
                          Баталгаажуулах
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Хуулга хэсэг */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Хуулга</h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                        <Input
                          type="text"
                          placeholder="Хайх..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-[150px] md:w-[200px] bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                        />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-9 h-9 p-0 bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700",
                              !startDate && !endDate && "text-muted-foreground",
                            )}
                          >
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Шүүлтүүр</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                          <div className="p-4 grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="start-date">Эхлэх огноо</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] justify-start text-left font-normal bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white",
                                      !startDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : <span>Огноо сонгоно уу</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="end-date">Дуусах огноо</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] justify-start text-left font-normal bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white",
                                      !endDate && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : <span>Огноо сонгоно уу</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <Button
                              onClick={() => {
                                setStartDate(undefined)
                                setEndDate(undefined)
                              }}
                              variant="outline"
                              className="w-full bg-transparent border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            >
                              Шүүлтүүрийг цэвэрлэх
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto pr-2">
                    <div className="grid gap-3">
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer" // Added cursor-pointer
                            onClick={() => handleTransactionClick(tx)} // Added onClick handler
                          >
                            <div>
                              <p className="text-sm font-medium">{tx.description}</p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.date}</p>
                              {tx.type === "withdrawal" && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                  Та мөнгө <span className="text-red-600 dark:text-red-400">татсан</span>
                                </p>
                              )}
                              {tx.type === "deposit" && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                  Та дансаа <span className="text-green-600 dark:text-green-400">цэнэглэсэн</span> байна
                                </p>
                              )}
                              {tx.type === "transfer" && tx.targetAccount && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Данс: {tx.targetAccount}</p>
                              )}
                            </div>
                            <span
                              className={`text-sm font-bold ${
                                tx.amount.startsWith("+")
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {tx.amount}₮
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-zinc-600 dark:text-zinc-400 py-4">
                          Хайлт болон шүүлтүүрт тохирох гүйлгээ олдсонгүй.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* PIN үүсгэх цонх */}
            <Dialog open={isPinCreationDialogOpen} onOpenChange={setIsPinCreationDialogOpen}>
              <DialogContent className="max-w-[90vw] sm:max-w-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700">
                <DialogHeader className="px-4 pt-4">
                  <DialogTitle>{pinCreationStep === 1 ? "Нууц код оруулах" : "Нууц кодоо баталгаажуулах"}</DialogTitle>
                  <DialogDescription className="p-0">
                    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-900 rounded-md text-white">
                      <span className="text-sm font-medium text-zinc-400">
                        Та цаашин гүйлгээ хийхдээ ашиглах 6 оронтой нууц кодоо оруулна уу.
                      </span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 px-4">
                  {pinCreationStep === 1 ? (
                    <div className="grid gap-2">
                      <Label htmlFor="first-pin">6 оронтой нууц код</Label>
                      <div className="relative">
                        <Input
                          id="first-pin"
                          type={showFirstPin ? "text" : "password"}
                          placeholder="******"
                          maxLength={6}
                          value={firstPin}
                          onChange={(e) => setFirstPin(e.target.value)}
                          className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowFirstPin(!showFirstPin)}
                          className="absolute right-1 top-1 h-8 w-8 text-zinc-600 hover:bg-transparent dark:text-zinc-400 dark:hover:bg-transparent"
                        >
                          {showFirstPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showFirstPin ? "Нууц кодыг нуух" : "Нууц кодыг харах"}</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-pin">6 оронтой нууц кодоо баталгаажуулах</Label>
                      <div className="relative">
                        <Input
                          id="confirm-pin"
                          type={showConfirmPin ? "text" : "password"}
                          placeholder="******"
                          maxLength={6}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value)}
                          className="bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPin(!showConfirmPin)}
                          className="absolute right-1 top-1 h-8 w-8 text-zinc-600 hover:bg-transparent dark:text-zinc-400 dark:hover:bg-transparent"
                        >
                          {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showConfirmPin ? "Нууц кодыг нуух" : "Нууц кодыг харах"}</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter className="px-4 pb-4">
                  {pinCreationStep === 1 ? (
                    <Button
                      type="submit"
                      onClick={handlePinEnter}
                      className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                      Үргэлжлүүлэх
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handlePinConfirm}
                      className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                      Баталгаажуулах
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {successDialogData && (
              <TransactionSuccessDialog
                isOpen={isSuccessDialogOpen}
                onClose={() => setIsSuccessDialogOpen(false)}
                type={successDialogData.type}
                amount={successDialogData.amount}
                date={successDialogData.date}
                time={successDialogData.time}
                transactionId={successDialogData.transactionId}
                senderName={successDialogData.senderName}
                senderAvatar={successDialogData.senderAvatar}
                recipientName={successDialogData.recipientName}
                recipientAvatar={successDialogData.recipientAvatar}
                recipientAccount={successDialogData.recipientAccount}
                purpose={successDialogData.purpose}
              />
            )}
          </>
        </CardContent>
      </Card>
    </div>
  )
}
