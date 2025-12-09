"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockJobs } from "@/lib/mock-data"
import { MapPin, Users, Briefcase, Eye, FileText } from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Job not found</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <Link href="/recruiter/jobs" className="text-primary hover:underline text-sm mb-4 block">
          ← Back to jobs
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
        <p className="text-xl text-muted-foreground">{job.company}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Employment Type</p>
                    <p className="font-semibold text-foreground">{job.type}</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="font-semibold text-foreground">{job.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Posted Date</p>
                  <p className="font-semibold text-foreground">{job.postedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{job.description}</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Link href={`/recruiter/jobs/${job.id}/pipeline`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent gap-2">
                <Users className="h-4 w-4" />
                View Pipeline
              </Button>
            </Link>
            <Link href={`/recruiter/jobs/${job.id}/ranking`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent gap-2">
                <FileText className="h-4 w-4" />
                Rankings
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 h-fit sticky top-24">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Total
                </span>
                <span className="font-bold text-2xl text-primary">{job.applicationCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Badge variant="secondary">Matched</Badge>
                </span>
                <span className="font-bold text-lg">{job.matchedCandidates}</span>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Edit Posting</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Close Position
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Posting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
