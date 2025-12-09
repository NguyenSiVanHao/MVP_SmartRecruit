import type React from "react"
import { RoleNavbar } from "@/components/shared/role-navbar"
import { RoleSidebar } from "@/components/shared/role-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="recruiter">
      <div className="min-h-screen bg-background flex flex-col">
        <RoleNavbar title="Recruiter Portal" role="recruiter" />
        <div className="flex-1 flex flex-col lg:flex-row">
          <RoleSidebar role="recruiter" />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
