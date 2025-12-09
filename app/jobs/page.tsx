"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockJobs, mockCandidates } from "@/lib/mock-data"
import { matchCVWithJD, type CVJDMatch } from "@/lib/ai-utils"
import { Search, MapPin, Briefcase, Sparkles, TrendingUp } from "lucide-react"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [matchAnalysis, setMatchAnalysis] = useState<CVJDMatch | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const itemsPerPage = 5

  const currentCandidate = mockCandidates[0]
  const selectedJob = mockJobs.find((j) => j.id === selectedJobId)

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)

  const handleMatchCV = async (jobId: string) => {
    const job = mockJobs.find((j) => j.id === jobId)
    if (!job) return

    setSelectedJobId(jobId)
    setIsMatching(true)
    try {
      const jobDescriptionText = `
        Position: ${job.title}
        Company: ${job.company}
        Description: ${job.description}
        Required Skills: ${job.requirements.join(", ")}
        Key Skills: ${job.skills.join(", ")}
      `
      const analysis = await matchCVWithJD(currentCandidate.cv, jobDescriptionText)
      setMatchAnalysis(analysis)
    } catch (error) {
      console.error("Error matching CV with JD:", error)
    } finally {
      setIsMatching(false)
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Browse Jobs</h2>
        <p className="text-muted-foreground mt-2">Find your perfect job match</p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">All Jobs</TabsTrigger>
          <TabsTrigger value="match" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Match Analysis
          </TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10"
                  />
                </div>
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Link href={`/jobs/${job.id}`} className="flex-1">
                      <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </Link>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">{job.salary}</p>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                  </div>

                  <Link href={`/jobs/${job.id}`}>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                  </Link>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.matchedCandidates} matched candidates
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-transparent">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge variant="outline" className="bg-transparent">
                        +{job.skills.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Posted on {job.postedDate}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMatchCV(job.id)}
                      className="gap-2 bg-transparent"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Check Match
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-transparent"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage !== i + 1 ? "bg-transparent" : ""}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-transparent"
              >
                Next
              </Button>
            </div>
          )}
        </TabsContent>

        {/* AI Match Tab */}
        <TabsContent value="match" className="space-y-6">
          {selectedJob && matchAnalysis ? (
            <>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{selectedJob.title}</h3>
                      <p className="text-muted-foreground">{selectedJob.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{matchAnalysis.matchScore}%</div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-4">
                    <div
                      className="bg-primary h-4 rounded-full transition-all"
                      style={{ width: `${matchAnalysis.matchScore}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Match Breakdown */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm font-semibold text-foreground mb-4">Match Breakdown</p>
                  {Object.entries(matchAnalysis.matchBreakdown).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-semibold text-foreground">{Math.round(value)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Matched Skills */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground mb-4">Matched Skills</p>
                  {matchAnalysis.matchedSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-secondary/50 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{skill.skill}</p>
                        <p className="text-xs text-muted-foreground">Your: {skill.candidateLevel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Required: {skill.requiredLevel}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Missing Skills */}
              {matchAnalysis.missingSkills.length > 0 && (
                <Card className="border-yellow-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-semibold text-foreground mb-3">Skills to Develop</p>
                    <div className="flex flex-wrap gap-2">
                      {matchAnalysis.missingSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-yellow-50 border-yellow-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold text-foreground mb-4">Recommendations</p>
                  <ul className="space-y-2">
                    {matchAnalysis.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="text-primary font-bold">→</span>
                        <span className="text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Button onClick={() => setSelectedJobId(null)} variant="outline" className="w-full bg-transparent">
                Back to Jobs
              </Button>
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">No job selected</p>
                <p className="text-sm text-muted-foreground">
                  Click "Check Match" on any job to see AI-powered analysis
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
