"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"

interface RoleNavbarProps {
  title: string
  role: "candidate" | "recruiter" | "admin"
}

export function RoleNavbar({ title, role }: RoleNavbarProps) {
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
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-white/50 dark:bg-white/10">
            <LogOut className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
    </nav>
  )
}
