"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockJobs, mockCandidates } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

export default function PipelinePage() {
  const params = useParams()
  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) return <div className="p-6">Job not found</div>

  const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"]
  const candidatesByStage: Record<string, typeof mockCandidates> = {
    Applied: mockCandidates.slice(0, 2),
    Screening: mockCandidates.slice(1, 2),
    Interview: mockCandidates.slice(0, 1),
    Offer: [],
    Hired: [],
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <Link href={`/recruiter/jobs/${job.id}`} className="text-primary hover:underline text-sm mb-4 block">
          ← Back to job
        </Link>
        <h2 className="text-3xl font-bold text-foreground">Hiring Pipeline</h2>
        <p className="text-muted-foreground mt-2">{job.title}</p>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <Card key={stage} className="lg:min-h-96">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                {stage}
                <Badge variant="secondary" className="ml-2">
                  {candidatesByStage[stage]?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidatesByStage[stage]?.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-3 border rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-move"
                >
                  <p className="font-medium text-foreground text-sm">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{candidate.title}</p>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="outline" className="text-xs bg-transparent">
                      {candidate.atsScore}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Management</CardTitle>
          <CardDescription>Drag candidates between stages to update their status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/30 rounded-lg text-sm text-muted-foreground">
            <p>💡 This is a mock pipeline. In production, you could drag and drop candidates between stages.</p>
          </div>
          <Button className="w-full gap-2">
            <ArrowRight className="h-4 w-4" />
            Export Pipeline Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
