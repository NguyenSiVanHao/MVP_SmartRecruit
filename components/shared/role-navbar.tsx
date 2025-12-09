"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Home, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface RoleNavbarProps {
  title: string
  role: "candidate" | "recruiter" | "admin"
}

export function RoleNavbar({ title, role }: RoleNavbarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="border-b border-border/70 bg-white/60 dark:bg-slate-900/70 backdrop-blur-2xl sticky top-0 z-40 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.35)]">
      <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-16 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Home className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">SmartRecruit</span>
          </Link>
          <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/20">
            {role}
          </span>
        </div>
        <div className="flex-1 min-w-0 ml-4 sm:ml-8">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
