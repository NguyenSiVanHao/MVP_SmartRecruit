"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"

// Google OAuth script loader
declare global {
  interface Window {
    google?: any
  }
}

const registerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu"),
  role: z.enum(["candidate", "recruiter"], {
    required_error: "Vui lòng chọn vai trò",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { register, loginWithGoogle, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "candidate",
    },
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectPath =
        user.role === "candidate"
          ? "/candidate/dashboard"
          : user.role === "recruiter"
            ? "/recruiter/dashboard"
            : "/admin/dashboard"
      router.push(redirectPath)
    }
  }, [user, router])

  // Load Google Identity Services
  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!googleClientId) {
      console.warn("Google Client ID not configured. Google sign-in will be disabled.")
      return
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleSignIn,
        })
        const buttonElement = document.getElementById("google-signin-button")
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signup_with",
            locale: "vi",
          })
        }
      }
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleGoogleSignIn = async (response: any) => {
    setGoogleLoading(true)
    setError(null)

    try {
      // Decode the credential
      const payload = JSON.parse(atob(response.credential.split(".")[1]))
      const googleUser = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      }

      const result = await loginWithGoogle(googleUser)
      if (result.success && result.user) {
        const redirectPath =
          result.user.role === "candidate"
            ? "/candidate/dashboard"
            : result.user.role === "recruiter"
              ? "/recruiter/dashboard"
              : "/admin/dashboard"
        router.push(redirectPath)
      } else {
        setError(result.error || "Đăng ký thất bại")
      }
    } catch (err) {
      setError("Đăng ký bằng Google thất bại")
      console.error(err)
    } finally {
      setGoogleLoading(false)
    }
  }

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await register(data.email, data.password, data.name, data.role)
      if (result.success && result.user) {
        const redirectPath =
          result.user.role === "candidate"
            ? "/candidate/dashboard"
            : result.user.role === "recruiter"
              ? "/recruiter/dashboard"
              : "/admin/dashboard"
        router.push(redirectPath)
      } else {
        setError(result.error || "Đăng ký thất bại")
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="glass border-white/40 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">Đăng ký</CardTitle>
            <CardDescription>Tạo tài khoản mới để bắt đầu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Mật khẩu phải có ít nhất 6 ký tự</FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Bạn là</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                            <RadioGroupItem value="candidate" id="candidate" />
                            <Label htmlFor="candidate" className="cursor-pointer flex-1">
                              Ứng viên
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                            <RadioGroupItem value="recruiter" id="recruiter" />
                            <Label htmlFor="recruiter" className="cursor-pointer flex-1">
                              Nhà tuyển dụng
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng ký...
                    </>
                  ) : (
                    <>
                      Đăng ký
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
              </div>
            </div>

            {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
              <div className="space-y-3">
                <div id="google-signin-button" className="w-full" />
                {googleLoading && (
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </div>
                )}
              </div>
            )}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Đã có tài khoản? </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

