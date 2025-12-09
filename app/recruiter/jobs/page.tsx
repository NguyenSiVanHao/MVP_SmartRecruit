"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockJobs } from "@/lib/mock-data"
import { Plus, MapPin, Users } from "lucide-react"

export default function RecruiterJobsPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Job Postings</h2>
          <p className="text-muted-foreground mt-2">Manage all your job listings</p>
        </div>
        <Link href="/recruiter/jobs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <Link key={job.id} href={`/recruiter/jobs/${job.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {job.type}
                    </Badge>
                    <p className="text-sm font-semibold text-primary">{job.salary}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{job.applicationCount} applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-transparent">
                      {job.matchedCandidates} matched
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Posted: {job.postedDate}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
