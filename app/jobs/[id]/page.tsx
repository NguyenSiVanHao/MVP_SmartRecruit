"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockJobs, mockCandidates } from "@/lib/mock-data"
import {
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  Building2,
  Clock,
  FileText,
  Award,
  Users,
  Target,
  Heart,
  TrendingUp,
  ExternalLink,
  Sparkles,
} from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const job = mockJobs.find((j) => j.id === params.id)
  const [hasApplied, setHasApplied] = useState(false)
  const [selectedCV, setSelectedCV] = useState<string | null>(null)

  if (!job) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Job not found</p>
      </div>
    )
  }

  const handleApply = () => {
    if (selectedCV) {
      setHasApplied(true)
      setTimeout(() => {
        setHasApplied(false)
        setSelectedCV(null)
      }, 3000)
    }
  }

  // Get related jobs (exclude current job)
  const relatedJobs = mockJobs.filter((j) => j.id !== job.id).slice(0, 3)

  return (
    <div className="p-4 sm:p-6 lg:px-12 2xl:px-16 space-y-8">
      {/* Header */}
      <div>
        <Link href="/jobs" className="text-primary hover:underline text-sm mb-4 block">
          ← Back to jobs
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xl text-muted-foreground">{job.company}</p>
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span>Expires in: {Math.ceil((new Date((job as any).applicationDeadline || "2026-01-15").getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              Save Job
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-semibold text-foreground">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Employment Type</p>
                    <p className="font-semibold text-foreground">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="font-semibold text-foreground">{(job as any).position || "Senior"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Job Details and Company Info */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="company">About Company</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{job.description}</p>
                  {(job as any).jobDescription && (
                    <ul className="space-y-2">
                      {((job as any).jobDescription as string[]).map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              {(job as any).benefits && (
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {((job as any).benefits as string[]).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Workplace */}
              <Card>
                <CardHeader>
                  <CardTitle>Workplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">{job.location}</p>
                      <p className="text-sm text-muted-foreground">{(job as any).workplace || job.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Apply</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">
                    Submit your application online by clicking the <strong>Apply</strong> button below:
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Application Deadline: {(job as any).applicationDeadline || "2026-01-15"}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" disabled={!selectedCV && !hasApplied} onClick={handleApply}>
                      {hasApplied ? "Applied" : "Apply"}
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Report Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-6 mt-6">
              {/* Giới thiệu công ty */}
              {(job as any).companyInfo && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>About {job.company}</CardTitle>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        View Company Page <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Vision */}
                      {(job as any).companyInfo.vision && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Vision
                          </h4>
                          <p className="text-muted-foreground">{(job as any).companyInfo.vision}</p>
                        </div>
                      )}

                      {/* Mission */}
                      {(job as any).companyInfo.mission && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4 text-primary" />
                            Mission
                          </h4>
                          <p className="text-muted-foreground">{(job as any).companyInfo.mission}</p>
                        </div>
                      )}

                      {/* Core Values */}
                      {(job as any).companyInfo.coreValues && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            Core Values
                          </h4>
                          <ul className="space-y-2">
                            {((job as any).companyInfo.coreValues as string[]).map((value, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">{value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Company Information */}
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                        {(job as any).companyInfo.size && (
                          <div>
                            <p className="text-sm text-muted-foreground">Company Size</p>
                            <p className="font-semibold text-foreground">{(job as any).companyInfo.size}</p>
                          </div>
                        )}
                        {(job as any).companyInfo.industry && (
                          <div>
                            <p className="text-sm text-muted-foreground">Industry</p>
                            <p className="font-semibold text-foreground">{(job as any).companyInfo.industry}</p>
                          </div>
                        )}
                        {(job as any).companyInfo.founded && (
                          <div>
                            <p className="text-sm text-muted-foreground">Founded</p>
                            <p className="font-semibold text-foreground">{(job as any).companyInfo.founded}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 h-fit lg:sticky lg:top-24">
          {/* Apply Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply Now</CardTitle>
              <CardDescription>Select your CV to apply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasApplied ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mb-2" />
                  <p className="font-semibold text-foreground">Application Sent!</p>
                  <p className="text-sm text-muted-foreground">Good luck with your application</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mockCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => setSelectedCV(candidate.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCV === candidate.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-secondary border-border"
                        }`}
                      >
                        <p className="font-medium text-foreground">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" disabled={!selectedCV} onClick={handleApply}>
                      Apply with CV
                    </Button>
                    <Link href={`/candidate/cv?jobId=${job.id}&cvId=${selectedCV || mockCandidates[0]?.id}`}>
                      <Button
                        variant="outline"
                        className="bg-transparent border-primary text-primary hover:bg-primary/10"
                        title="AI Match CV with Job Requirements - Analyze CV against JD"
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Required Skills */}
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

          {/* Company Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-semibold text-foreground">{job.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="font-semibold text-foreground">{job.applicationCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Related Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      href={`/jobs/${relatedJob.id}`}
                      className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <p className="font-semibold text-foreground text-sm mb-1">{relatedJob.title}</p>
                      <p className="text-xs text-muted-foreground mb-1">{relatedJob.company}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{relatedJob.salary}</span>
                        <span>•</span>
                        <span>{relatedJob.location}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
