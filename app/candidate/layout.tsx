import type React from "react"
import { RoleNavbar } from "@/components/shared/role-navbar"
import { RoleSidebar } from "@/components/shared/role-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="candidate">
      <div className="min-h-screen bg-background flex flex-col">
        <RoleNavbar title="Candidate Portal" role="candidate" />
        <div className="flex-1 flex flex-col lg:flex-row">
          <RoleSidebar role="candidate" />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
