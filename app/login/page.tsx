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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

// Google OAuth script loader
declare global {
  interface Window {
    google?: any
  }
}

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
            text: "signin_with",
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
        setError(result.error || "Đăng nhập thất bại")
      }
    } catch (err) {
      setError("Đăng nhập bằng Google thất bại")
      console.error(err)
    } finally {
      setGoogleLoading(false)
    }
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(data.email, data.password)
      if (result.success && result.user) {
        const redirectPath =
          result.user.role === "candidate"
            ? "/candidate/dashboard"
            : result.user.role === "recruiter"
              ? "/recruiter/dashboard"
              : "/admin/dashboard"
        router.push(redirectPath)
      } else {
        setError(result.error || "Đăng nhập thất bại")
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
            <CardTitle className="text-3xl font-bold">Đăng nhập</CardTitle>
            <CardDescription>Chào mừng trở lại SmartRecruit</CardDescription>
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
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      Đăng nhập
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
              <span className="text-muted-foreground">Chưa có tài khoản? </span>
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

