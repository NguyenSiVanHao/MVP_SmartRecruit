"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Briefcase, Users, Settings, TrendingUp } from "lucide-react"

interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
}

interface RoleSidebarProps {
  role: "candidate" | "recruiter" | "admin"
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()

  const links: SidebarLink[] =
    role === "candidate"
      ? [
          { href: "/candidate/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
          { href: "/candidate/cv", label: "My CV", icon: <FileText className="h-5 w-5" /> },
          { href: "/jobs", label: "Browse Jobs", icon: <Briefcase className="h-5 w-5" /> },
          { href: "/candidate/applications", label: "Applications", icon: <TrendingUp className="h-5 w-5" /> },
        ]
      : role === "recruiter"
        ? [
            { href: "/recruiter/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
            { href: "/recruiter/jobs", label: "Job Postings", icon: <Briefcase className="h-5 w-5" /> },
          ]
        : [
            { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
            { href: "/admin/dashboard", label: "Users", icon: <Users className="h-5 w-5" /> },
            { href: "/admin/dashboard", label: "System Config", icon: <Settings className="h-5 w-5" /> },
          ]

  return (
    <aside className="w-full lg:w-64 border-r border-white/30 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl lg:min-h-screen shadow-[0_10px_60px_-50px_rgba(0,0,0,0.6)]">
      <div className="p-4 lg:p-6 flex lg:flex-col gap-3 lg:gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 whitespace-nowrap text-sm",
              pathname === link.href
                ? "bg-primary text-primary-foreground shadow-[0_10px_40px_-24px_rgba(56,197,185,0.65)]"
                : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary/30 border border-transparent",
            )}
          >
            {link.icon}
            <span className="font-medium leading-5">{link.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
