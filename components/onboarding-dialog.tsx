"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OnboardingDialogProps {
  isOpen: boolean
  onClose: () => void
  loginMethod: "phone" | "email" | "facebook" | "apple"
  prefilledData: { name?: string; email?: string; phone?: string }
}

export default function OnboardingDialog({ isOpen, onClose, loginMethod, prefilledData }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [inviteLink, setInviteLink] = useState("")
  const [inviteError, setInviteError] = useState("")
  const [firstName, setFirstName] = useState(prefilledData.name?.split(" ")[0] || "")
  const [lastName, setLastName] = useState(prefilledData.name?.split(" ")[1] || "")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(prefilledData.phone || "")
  const [email, setEmail] = useState(prefilledData.email || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFirstName(prefilledData.name?.split(" ")[0] || "")
    setLastName(prefilledData.name?.split(" ")[1] || "")
    setPhoneNumber(prefilledData.phone || "")
    setEmail(prefilledData.email || "")
  }, [prefilledData])

  const handleInviteLinkSubmit = async () => {
    setInviteError("")
    setIsSubmitting(true)
    // Simulate API call to validate invite link
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (inviteLink === "https://your-app.com/invite/valid_code") {
      setCurrentStep(2)
    } else if (inviteLink === "") {
      // Skip invite link
      setCurrentStep(2)
    } else {
      setInviteError("Уучлаарай, таны оруулсан урилга бүртгэлгүй байна.")
    }
    setIsSubmitting(false)
  }

  const handleRegistrationSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call for registration
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log({ firstName, lastName, age, gender, phoneNumber, email })
    setIsSubmitting(false)
    onClose() // Close dialog and trigger main page redirect
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {currentStep === 1 ? "Урилгын линк" : "Бүртгэлийн мэдээлэл"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            {currentStep === 1 ? "Та урилгын линк оруулах уу?" : "Хувийн мэдээллээ бөглөнө үү."}
          </DialogDescription>
        </DialogHeader>
        {currentStep === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invite-link" className="text-right text-white">
                Линк
              </Label>
              <Input
                id="invite-link"
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                placeholder="Урилгын линкээ оруулна уу"
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>
            {inviteError && <p className="text-red-500 text-sm text-center">{inviteError}</p>}
          </div>
        )}
        {currentStep === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last-name" className="text-right text-white">
                Овог
              </Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first-name" className="text-right text-white">
                Нэр
              </Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right text-white">
                Нас
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right text-white">
                Хүйс
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-white focus:ring-zinc-500 focus:border-zinc-500">
                  <SelectValue placeholder="Хүйсээ сонгоно уу" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                  <SelectItem value="male">Эрэгтэй</SelectItem>
                  <SelectItem value="female">Эмэгтэй</SelectItem>
                  <SelectItem value="other">Бусад</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone-number" className="text-right text-white">
                Утасны дугаар
              </Label>
              <Input
                id="phone-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loginMethod === "phone"}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-white">
                И-мэйл
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginMethod === "email"}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        )}
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2 pt-4">
          {currentStep === 1 && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setInviteLink("") // Clear invite link if skipping
                  setCurrentStep(2)
                }}
                className="w-full sm:w-auto bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
              >
                Алгсах
              </Button>
              <Button
                onClick={handleInviteLinkSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-200"
              >
                {isSubmitting ? "Шалгаж байна..." : "Үргэлжлүүлэх"}
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <Button
              onClick={handleRegistrationSubmit}
              disabled={isSubmitting}
              className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
            >
              {isSubmitting ? "Бүртгэж байна..." : "Баталгаажуулах"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
