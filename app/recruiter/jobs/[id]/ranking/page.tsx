"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateRankingPanel } from "@/components/ai/candidate-ranking-panel"
import { mockJobs, mockRanking, mockCandidates } from "@/lib/mock-data"
import { rankCandidatesWithAI, type CandidateRanking } from "@/lib/ai-utils"
import { Download, Sparkles } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export default function RankingPage() {
  const params = useParams()
  const job = mockJobs.find((j) => j.id === params.id)
  const [aiRanking, setAiRanking] = useState<CandidateRanking | null>(null)
  const [isRanking, setIsRanking] = useState(false)

  if (!job) return <div className="p-6">Job not found</div>

  const topCandidate = mockRanking[0]
  const radarData = Object.entries(topCandidate.skills).map(([skill, value]) => ({
    skill: skill.slice(0, 10),
    value,
  }))

  const barData = mockRanking.map((candidate) => ({
    name: candidate.name.split(" ")[0],
    matchScore: candidate.matchScore,
    atsScore: candidate.atsScore,
  }))

  const handleAIRank = async () => {
    setIsRanking(true)
    try {
      const jobDescriptionText = `
        Position: ${job.title}
        Company: ${job.company}
        Description: ${job.description}
        Required Skills: ${job.requirements.join(", ")}
        Key Skills: ${job.skills.join(", ")}
      `
      const ranking = await rankCandidatesWithAI(mockCandidates, jobDescriptionText)
      setAiRanking(ranking)
    } catch (error) {
      console.error("Error ranking candidates:", error)
    } finally {
      setIsRanking(false)
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/recruiter/jobs/${job.id}`} className="text-primary hover:underline text-sm mb-4 block">
            ← Back to job
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Candidate Rankings</h2>
          <p className="text-muted-foreground mt-2">{job.title}</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" onClick={handleAIRank} disabled={isRanking} className="gap-2 bg-transparent">
            {isRanking ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Ranking...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI Rank
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Ranking Tabs */}
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI-Powered Ranking
          </TabsTrigger>
          <TabsTrigger value="visualizations">Analytics</TabsTrigger>
        </TabsList>

        {/* AI Ranking Tab */}
        <TabsContent value="ai" className="space-y-6">
          {aiRanking ? (
            <CandidateRankingPanel ranking={aiRanking} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">Click "AI Rank" to get AI-powered candidate ranking</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Our AI will analyze all candidates against the job description and provide detailed recommendations
                </p>
                <Button onClick={handleAIRank} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Run AI Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Visualizations Tab */}
        <TabsContent value="visualizations" className="space-y-6">
          {/* Overall Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Comparison</CardTitle>
              <CardDescription>Match score vs ATS score for all candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="matchScore" fill="#2563eb" name="Match Score" />
                  <Bar dataKey="atsScore" fill="#0891b2" name="ATS Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Candidate Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Candidate - Skill Breakdown</CardTitle>
              <CardDescription>{topCandidate.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Skill Level" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Default Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Default Rankings</CardTitle>
              <CardDescription>All candidates ranked by match score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRanking.map((candidate, idx) => (
                  <div
                    key={candidate.candidateId}
                    className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.experience} years experience</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-2xl font-bold text-primary">{candidate.matchScore}%</p>
                            <p className="text-xs text-muted-foreground">Match Score</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score Bars */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">ATS Score</span>
                          <span className="font-semibold text-foreground">{candidate.atsScore}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${candidate.atsScore}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Match Score</span>
                          <span className="font-semibold text-foreground">{candidate.matchScore}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${candidate.matchScore}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.keys(candidate.skills)
                        .slice(0, 3)
                        .map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}: {candidate.skills[skill]}%
                          </Badge>
                        ))}
                      {Object.keys(candidate.skills).length > 3 && (
                        <Badge variant="outline" className="bg-transparent text-xs">
                          +{Object.keys(candidate.skills).length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
