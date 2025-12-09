"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CandidateRanking } from "@/lib/ai-utils"
import { AlertCircle, CheckCircle2, FileText } from "lucide-react"

interface CandidateRankingPanelProps {
  ranking: CandidateRanking
}

export function CandidateRankingPanel({ ranking }: CandidateRankingPanelProps) {
  return (
    <div className="space-y-6">
      {/* Top Candidates Highlight */}
      {ranking.topCandidates.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-950 dark:to-emerald-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5" />
              Top Candidates
            </CardTitle>
            <CardDescription>Highest recommended candidates for this position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {ranking.rankings
                .filter((r) => ranking.topCandidates.includes(r.candidateId))
                .map((candidate, idx) => (
                  <div
                    key={candidate.candidateId}
                    className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-green-100 dark:border-green-900"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                        #{candidate.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{candidate.name}</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">{candidate.matchScore}%</div>
                    <p className="text-xs text-muted-foreground mb-3">Match Score</p>
                    <Link href={`/recruiter/candidates/${candidate.candidateId}/cv`}>
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <FileText className="h-4 w-4" />
                        View CV
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Candidate Rankings</CardTitle>
          <CardDescription>AI analysis for all candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ranking.rankings.map((candidate) => (
              <div
                key={candidate.candidateId}
                className="border rounded-lg p-4 hover:bg-secondary/30 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      #{candidate.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.reasoning.split(".")[0]}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{candidate.matchScore}%</div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                    <Link href={`/recruiter/candidates/${candidate.candidateId}/cv`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View CV
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Match Score Bar */}
                <div className="mb-4">
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${candidate.matchScore}%` }}
                    />
                  </div>
                </div>

                {/* Matched Skills */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-foreground mb-2">Top Matched Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.topMatchedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-green-100 text-green-900 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Gap Skills */}
                {candidate.gapSkills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Skill Gaps
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.gapSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-yellow-50 border-yellow-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Recommended Next Steps</p>
                  <ol className="text-xs space-y-1 text-muted-foreground">
                    {candidate.recommendedNextSteps.map((step, idx) => (
                      <li key={idx}>
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
