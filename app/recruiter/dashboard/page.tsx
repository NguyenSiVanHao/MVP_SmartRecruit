"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockJobs, mockAdminMetrics, mockRanking } from "@/lib/mock-data"
import { Plus, Briefcase, Users, TrendingUp, BarChart3, Sparkles, Target, ArrowRight, Clock, CheckCircle2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function RecruiterDashboard() {
  const totalApplications = mockJobs.reduce((sum, job) => sum + job.applicationCount, 0)
  const totalMatchedCandidates = mockJobs.reduce((sum, job) => sum + job.matchedCandidates, 0)
  const avgMatchScore = mockRanking.length > 0
    ? Math.round(mockRanking.reduce((sum, c) => sum + c.matchScore, 0) / mockRanking.length)
    : 82

  const stats = [
    { 
      label: "Active Jobs", 
      value: mockJobs.length, 
      icon: Briefcase,
      description: "Job postings",
      color: "text-primary"
    },
    { 
      label: "Total Applications", 
      value: totalApplications, 
      icon: Users,
      description: "Received applications",
      color: "text-primary"
    },
    { 
      label: "Avg Match Score", 
      value: `${avgMatchScore}%`, 
      icon: Target,
      description: "AI matching accuracy",
      color: avgMatchScore >= 80 ? "text-green-600" : avgMatchScore >= 60 ? "text-yellow-600" : "text-red-600"
    },
    { 
      label: "Top Candidates", 
      value: totalMatchedCandidates, 
      icon: Sparkles,
      description: "AI-ranked candidates",
      color: "text-primary"
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:px-12 2xl:px-16 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome Back!</h2>
          <p className="text-muted-foreground mt-2">Here's your AI-powered recruitment dashboard</p>
        </div>
        <Link href="/recruiter/jobs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color || "text-primary"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color || "text-foreground"} mb-1`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.label === "Avg Match Score" && (
                  <Progress value={avgMatchScore} className="mt-2 h-2" />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your recruitment process</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Link href="/recruiter/jobs/new">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Post New Job</span>
              <span className="text-xs text-muted-foreground mt-1">Create new posting</span>
            </Button>
          </Link>
          <Link href="/recruiter/jobs">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">View Jobs</span>
              <span className="text-xs text-muted-foreground mt-1">Manage postings</span>
            </Button>
          </Link>
          <Link href="/recruiter/jobs">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">AI Ranking</span>
              <span className="text-xs text-muted-foreground mt-1">View AI insights</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Job Postings</CardTitle>
                <CardDescription>Your latest job openings</CardDescription>
              </div>
              <Badge variant="secondary">{mockJobs.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockJobs.slice(0, 3).map((job) => (
                <Link key={job.id} href={`/recruiter/jobs/${job.id}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Posted: {job.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">{job.applicationCount}</Badge>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-xs text-muted-foreground">{job.matchedCandidates} AI matches</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/recruiter/jobs" className="mt-4 block">
              <Button variant="outline" className="w-full bg-transparent">
                View All Jobs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>AI-powered recruitment analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Average Match Score: {avgMatchScore}%</p>
                  <p className="text-xs text-muted-foreground">
                    {avgMatchScore >= 80 
                      ? "Excellent candidate quality!"
                      : avgMatchScore >= 60
                        ? "Good candidate pool."
                        : "Consider refining job requirements."
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{totalMatchedCandidates} Top Candidates</p>
                  <p className="text-xs text-muted-foreground">
                    AI-ranked candidates ready for review
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Active Jobs: {mockJobs.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {mockJobs.length > 0 ? `${mockJobs.length} job${mockJobs.length > 1 ? 's' : ''} receiving applications` : "No active jobs"}
                  </p>
                </div>
              </div>
            </div>
            <Link href="/recruiter/jobs">
              <Button variant="outline" className="w-full gap-2 bg-background/50">
                <Sparkles className="h-4 w-4" />
                View AI Rankings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth</CardTitle>
          <CardDescription>Users, jobs, and applications over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAdminMetrics.platformGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="jobs" stroke="#0891b2" strokeWidth={2} />
              <Line type="monotone" dataKey="applications" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
