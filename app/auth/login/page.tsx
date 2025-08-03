"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mail, Facebook, Apple, ArrowLeft, HelpCircle, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import OnboardingDialog from "@/components/onboarding-dialog"
import FingerprintDialog from "@/components/fingerprint-dialog"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/firebase"
import { signInWithPhoneNumber, RecaptchaVerifier, type ConfirmationResult } from "firebase/auth"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email" | "facebook" | "apple">("phone")
  const [inputValue, setInputValue] = useState("")
  const [isLoginPending, setIsLoginPending] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showFingerprintDialog, setShowFingerprintDialog] = useState(false)
  const [prefilledData, setPrefilledData] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [showQuickLogin, setShowQuickLogin] = useState(false)
  const [loggedInUserName, setLoggedInUserName] = useState("Хэрэглэгч")
  const router = useRouter()

  // Firebase specific states
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otpInput, setOtpInput] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)
  const recaptchaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fingerprintEnabled = localStorage.getItem("hasFingerprintEnabled") === "true"
    if (fingerprintEnabled) {
      setShowQuickLogin(true)
      setLoggedInUserName(localStorage.getItem("loggedInUserName") || "Хэрэглэгч")
    } else {
      setShowQuickLogin(false)
    }

    // Initialize reCAPTCHA verifier
    if (recaptchaContainerRef.current && !recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // This callback is triggered automatically when size is "invisible"
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("reCAPTCHA expired")
        },
      })
      recaptchaVerifierRef.current.render()
    }
  }, [])

  const handleLogin = async (method: "phone" | "email" | "facebook" | "apple", data?: any) => {
    setIsLoginPending(true)
    setLoginMethod(method)

    if (method === "phone") {
      if (!showOtpInput) {
        // Step 1: Send OTP
        try {
          if (!recaptchaVerifierRef.current) {
            console.error("reCAPTCHA verifier not initialized.")
            setIsLoginPending(false)
            return
          }
          const phoneNumber = `+976${inputValue}` // Assuming +976 is the country code
          const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current)
          setConfirmationResult(result)
          setShowOtpInput(true)
          alert("Баталгаажуулах кодыг таны утас руу илгээлээ.")
        } catch (error: any) {
          console.error("Error sending OTP:", error)
          alert(`Код илгээхэд алдаа гарлаа: ${error.message}`)
        } finally {
          setIsLoginPending(false)
        }
      } else {
        // Step 2: Verify OTP
        try {
          if (confirmationResult) {
            await confirmationResult.confirm(otpInput)
            // User successfully signed in
            const isFirstTimeUser =
              localStorage.getItem("isFirstTimeUser") === null || localStorage.getItem("isFirstTimeUser") === "true"

            if (isFirstTimeUser) {
              setPrefilledData({ phone: inputValue })
              setShowOnboarding(true)
            } else {
              localStorage.setItem("isLoggedIn", "true")
              if (rememberMe) {
                setShowFingerprintDialog(true)
              } else {
                router.push("/")
              }
            }
          } else {
            alert("Баталгаажуулах үйл явц эхлээгүй байна. Дахин оролдоно уу.")
          }
        } catch (error: any) {
          console.error("Error verifying OTP:", error)
          alert(`Код баталгаажуулахад алдаа гарлаа: ${error.message}`)
        } finally {
          setIsLoginPending(false)
        }
      }
    } else {
      // Existing login methods (email, facebook, apple)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const isFirstTimeUser =
        localStorage.getItem("isFirstTimeUser") === null || localStorage.getItem("isFirstTimeUser") === "true"

      if (isFirstTimeUser) {
        const prefill: { name?: string; email?: string; phone?: string } = {}
        if (method === "email") {
          prefill.email = inputValue
        } else if (method === "facebook") {
          prefill.name = data?.name || "Facebook User"
        } else if (method === "apple") {
          prefill.name = data?.name || "Apple User"
        }
        setPrefilledData(prefill)
        setShowOnboarding(true)
      } else {
        localStorage.setItem("isLoggedIn", "true")
        if (rememberMe) {
          setShowFingerprintDialog(true)
        } else {
          router.push("/")
        }
      }
      setIsLoginPending(false)
    }
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    localStorage.setItem("isFirstTimeUser", "false")
    localStorage.setItem("isLoggedIn", "true")
    if (rememberMe) {
      setShowFingerprintDialog(true)
    } else {
      router.push("/")
    }
  }

  const handleFingerprintConfirm = () => {
    localStorage.setItem("hasFingerprintEnabled", "true")
    localStorage.setItem("loggedInUserName", "Шинэ Хэрэглэгч")
    localStorage.setItem("isLoggedIn", "true")
    setShowFingerprintDialog(false)
    router.push("/")
  }

  const handleFingerprintDecline = () => {
    localStorage.setItem("hasFingerprintEnabled", "false")
    localStorage.setItem("isLoggedIn", "true")
    setShowFingerprintDialog(false)
    router.push("/")
  }

  const handleQuickLoginFingerprint = async () => {
    console.log("Хурууны хээгээр нэвтэрч байна...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("isLoggedIn", "true")
    router.push("/")
  }

  const handleQuickLoginNewUser = () => {
    localStorage.setItem("hasFingerprintEnabled", "false")
    localStorage.setItem("isLoggedIn", "false")
    setShowQuickLogin(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
      {showQuickLogin ? (
        <Card className="w-full max-w-sm bg-zinc-900 text-white border-zinc-800 shadow-lg rounded-lg p-6 text-center">
          <CardContent className="grid gap-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Профайл зураг"
              width={100}
              height={100}
              className="rounded-full mx-auto mb-4 border-2 border-white"
            />
            <CardTitle className="text-2xl font-bold">Сайн байна уу, {loggedInUserName}!</CardTitle>
            <Button
              onClick={handleQuickLoginFingerprint}
              className="w-full bg-white text-zinc-900 hover:bg-zinc-200 py-2 text-base font-semibold flex items-center justify-center gap-2"
            >
              <Fingerprint className="h-5 w-5" /> Нэвтрэх
            </Button>
            <Button
              variant="outline"
              onClick={handleQuickLoginNewUser}
              className="w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              Шинэ хэрэглэгчээр нэвтрэх
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto w-full max-w-sm bg-zinc-900 text-white border-zinc-800 shadow-lg rounded-lg">
          <CardHeader className="px-6 pt-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Буцах</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <HelpCircle className="h-6 w-6" />
                <span className="sr-only">Тусламж</span>
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold text-left">Тавтай морил!</CardTitle>
            <CardDescription className="text-zinc-400 mt-2 text-left">
              {showOtpInput ? "Баталгаажуулах кодыг оруулна уу." : "Утасны дугаараа оруулна уу."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login-input" className="text-white">
                {showOtpInput ? "Баталгаажуулах код" : "Утасны дугаар"}
              </Label>
              <div className="flex items-center space-x-2">
                {!showOtpInput && (
                  <Button
                    variant="outline"
                    className="flex-shrink-0 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  >
                    +976
                  </Button>
                )}
                <Input
                  id="login-input"
                  type={showOtpInput ? "number" : "tel"}
                  placeholder={showOtpInput ? "Код" : "Утасны дугаар"}
                  value={showOtpInput ? otpInput : inputValue}
                  onChange={(e) => (showOtpInput ? setOtpInput(e.target.value) : setInputValue(e.target.value))}
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-zinc-500 focus:border-zinc-500"
                />
              </div>
              {!showOtpInput && (
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-zinc-500 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
                  />
                  <Label htmlFor="remember-me" className="text-zinc-400">
                    Сануулах
                  </Label>
                </div>
              )}
            </div>
            <Button
              className="w-full bg-white text-zinc-900 hover:bg-zinc-200 py-2 text-base font-semibold"
              onClick={() => handleLogin("phone")}
              disabled={isLoginPending}
            >
              {isLoginPending ? "Нэвтэрч байна..." : showOtpInput ? "Кодыг баталгаажуулах" : "Нэвтрэх"}
            </Button>
            <div id="recaptcha-container" ref={recaptchaContainerRef} /> {/* reCAPTCHA container */}
            <div className="relative flex items-center justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">эсвэл</span>
            </div>
            <div className="flex justify-around gap-4">
              <Button
                variant="outline"
                onClick={() => handleLogin("email")}
                className="flex-1 h-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 flex items-center justify-center"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Имэйлээр нэвтрэх</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleLogin("facebook", { name: "Facebook User" })}
                className="flex-1 h-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 flex items-center justify-center"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook-ээр нэвтрэх</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleLogin("apple", { name: "Apple User" })}
                className="flex-1 h-12 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 flex items-center justify-center"
              >
                <Apple className="h-5 w-5" />
                <span className="sr-only">Apple-ээр нэвтрэх</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showOnboarding && (
        <OnboardingDialog
          isOpen={showOnboarding}
          onClose={handleOnboardingClose}
          loginMethod={loginMethod}
          prefilledData={prefilledData}
        />
      )}
      {showFingerprintDialog && (
        <FingerprintDialog
          isOpen={showFingerprintDialog}
          onClose={() => setShowFingerprintDialog(false)}
          onConfirm={handleFingerprintConfirm}
          onDecline={handleFingerprintDecline}
        />
      )}
    </div>
  )
}
