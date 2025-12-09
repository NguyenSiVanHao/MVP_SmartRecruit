"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CVJDMatch } from "@/lib/ai-utils"
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface CVJDMatchPanelProps {
  match: CVJDMatch
  jobTitle?: string
}

export function CVJDMatchPanel({ match, jobTitle = "Job" }: CVJDMatchPanelProps) {
  const matchColor =
    match.matchScore >= 75 ? "text-green-600" : match.matchScore >= 50 ? "text-yellow-600" : "text-red-600"
  const matchLabel = match.matchScore >= 75 ? "Excellent Fit" : match.matchScore >= 50 ? "Good Fit" : "Needs Review"

  return (
    <div className="space-y-6">
      {/* Overall Match Score */}
      <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Job Match Analysis
          </CardTitle>
          <CardDescription>How well your CV aligns with {jobTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <div className={`text-5xl font-bold ${matchColor} mb-2`}>{match.matchScore}%</div>
              <div className="text-sm text-muted-foreground">{matchLabel}</div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground mb-4">Match Breakdown</p>
              {Object.entries(match.matchBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-semibold text-foreground">{Math.round(value)}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matched Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Matched Skills
          </CardTitle>
          <CardDescription>Skills from your CV that match the job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {match.matchedSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">{skill.skill}</p>
                  <p className="text-sm text-muted-foreground">Your: {skill.candidateLevel}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Required: {skill.requiredLevel}</p>
                  <Badge className="mt-1 bg-green-100 text-green-900 border-green-200">Match</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Skills */}
      {match.missingSkills.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">Missing Required Skills:</p>
            <div className="flex flex-wrap gap-2">
              {match.missingSkills.map((skill) => (
                <Badge key={skill} variant="destructive" className="bg-red-100 text-red-900 border-red-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Recommendations to improve your application</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {match.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-accent font-bold">→</span>
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
