"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockApplications } from "@/lib/mock-data"
import { TrendingUp } from "lucide-react"

export default function ApplicationsPage() {
  const applications = mockApplications

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">My Applications</h2>
        <p className="text-muted-foreground mt-2">Track all your job applications in one place</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((a) => a.status === "interview").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((a) => a.status === "applied").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Avg Match Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(applications.reduce((sum, a) => sum + a.matchScore, 0) / applications.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>View details of all your applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Job Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Match Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">ATS Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{app.jobTitle}</td>
                    <td className="py-3 px-4 text-muted-foreground">{app.company}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          app.status === "interview"
                            ? "default"
                            : app.status === "applied"
                              ? "secondary"
                              : app.status === "rejected"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-16 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${app.matchScore}%` }} />
                        </div>
                        <span className="font-semibold text-primary">{app.matchScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-transparent">
                        {app.atsScore}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{app.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
