"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockCandidates, mockApplications, mockJobs } from "@/lib/mock-data"
import { FileUp, Briefcase, FileText, TrendingUp, Sparkles, Target, ArrowRight, CheckCircle2 } from "lucide-react"

export default function CandidateDashboard() {
  const candidate = mockCandidates[0]
  const applications = mockApplications.filter((app) => app.candidateId === candidate.id)
  const avgMatchScore = applications.length > 0
    ? Math.round(applications.reduce((sum, app) => sum + app.matchScore, 0) / applications.length)
    : 0

  const stats = [
    { 
      label: "ATS Score", 
      value: candidate.atsScore, 
      icon: TrendingUp,
      description: "CV compatibility score",
      color: candidate.atsScore >= 80 ? "text-green-600" : candidate.atsScore >= 60 ? "text-yellow-600" : "text-red-600"
    },
    { 
      label: "Applications", 
      value: applications.length, 
      icon: Briefcase,
      description: "Total applications",
      color: "text-primary"
    },
    { 
      label: "Avg Match Score", 
      value: `${avgMatchScore}%`, 
      icon: Target,
      description: "Average job match",
      color: "text-primary"
    },
    { 
      label: "Skills", 
      value: candidate.skills.length, 
      icon: FileText,
      description: "Total skills",
      color: "text-primary"
    },
  ]

  // Get recommended jobs based on skills
  const recommendedJobs = mockJobs
    .filter(job => 
      job.skills.some(skill => candidate.skills.includes(skill))
    )
    .slice(0, 3)

  return (
    <div className="p-4 sm:p-6 lg:px-12 2xl:px-16 space-y-8">
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome, {candidate.name}!</h2>
          <p className="text-muted-foreground mt-2">Here's your AI-powered recruitment dashboard</p>
        </div>
        <Link href="/candidate/cv">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Analyze CV
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
                {stat.label === "ATS Score" && (
                  <Progress value={candidate.atsScore} className="mt-2 h-2" />
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
          <CardDescription>Get started with your recruitment journey</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Link href="/candidate/cv">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Update CV</span>
              <span className="text-xs text-muted-foreground mt-1">AI analysis available</span>
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Browse Jobs</span>
              <span className="text-xs text-muted-foreground mt-1">AI-matched opportunities</span>
            </Button>
          </Link>
          <Link href="/candidate/applications">
            <Button variant="outline" className="w-full bg-transparent h-28 flex flex-col items-center justify-center hover:bg-primary/5 hover:border-primary transition-colors">
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">View Applications</span>
              <span className="text-xs text-muted-foreground mt-1">Track your progress</span>
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track your recent job applications</CardDescription>
              </div>
              <Badge variant="secondary">{applications.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.length > 0 ? (
                applications.slice(0, 3).map((app) => (
                  <Link key={app.id} href={`/jobs/${app.jobId}`}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{app.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Applied: {app.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
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
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-primary" />
                          <span className="text-sm font-medium text-primary">{app.matchScore}%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No applications yet</p>
                  <Link href="/jobs">
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {applications.length > 0 && (
              <Link href="/candidate/applications" className="mt-4 block">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Applications
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Recommended Jobs
                </CardTitle>
                <CardDescription>Jobs matched to your skills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedJobs.length > 0 ? (
                recommendedJobs.map((job) => {
                  const matchedSkills = job.skills.filter(skill => candidate.skills.includes(skill))
                  const matchPercentage = Math.round((matchedSkills.length / job.skills.length) * 100)
                  return (
                    <Link key={job.id} href={`/jobs/${job.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {job.salary}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3 text-primary" />
                            <span className="text-sm font-medium text-primary">{matchPercentage}%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{matchedSkills.length}/{job.skills.length} skills</span>
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No recommendations yet</p>
                  <Link href="/jobs">
                    <Button variant="outline" size="sm" className="mt-4">
                      Browse All Jobs
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <Link href="/jobs" className="mt-4 block">
              <Button variant="outline" className="w-full bg-transparent">
                Browse All Jobs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* CV Info & AI Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CV Information</CardTitle>
            <CardDescription>Your current profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Title</label>
              <p className="text-foreground font-semibold text-lg">{candidate.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Skills</label>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Experience</label>
              <p className="text-foreground font-semibold">{candidate.experience}</p>
            </div>
            <Link href="/candidate/cv">
              <Button className="w-full mt-4 gap-2">
                <FileUp className="h-4 w-4" />
                Update CV
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>Improve your profile with AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">ATS Score: {candidate.atsScore}/100</p>
                  <p className="text-xs text-muted-foreground">
                    {candidate.atsScore >= 80 
                      ? "Excellent! Your CV is well-optimized."
                      : candidate.atsScore >= 60
                        ? "Good, but there's room for improvement."
                        : "Consider updating your CV for better results."
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Match Score: {avgMatchScore}%</p>
                  <p className="text-xs text-muted-foreground">
                    Average match with job requirements
                  </p>
                </div>
              </div>
            </div>
            <Link href="/candidate/cv">
              <Button variant="outline" className="w-full gap-2 bg-background/50">
                <Sparkles className="h-4 w-4" />
                Get AI Analysis
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
