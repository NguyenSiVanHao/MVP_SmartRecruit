import type React from "react"
import { RoleNavbar } from "@/components/shared/role-navbar"
import { RoleSidebar } from "@/components/shared/role-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background flex flex-col">
        <RoleNavbar title="Admin Dashboard" role="admin" />
        <div className="flex-1 flex flex-col lg:flex-row">
          <RoleSidebar role="admin" />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
