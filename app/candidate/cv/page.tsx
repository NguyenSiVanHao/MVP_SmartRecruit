"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CVAnalysisPanel } from "@/components/ai/cv-analysis-panel"
import { mockCandidates, mockJobs } from "@/lib/mock-data"
import { analyzeCVWithAI, type CVAnalysis } from "@/lib/ai-utils"
import { Upload, CheckCircle2, Sparkles, ArrowLeft, Briefcase, FileText } from "lucide-react"

export default function CVPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")
  const cvId = searchParams.get("cvId")
  
  const selectedCandidate = cvId 
    ? mockCandidates.find(c => c.id === cvId) || mockCandidates[0]
    : mockCandidates[0]
  const job = jobId ? mockJobs.find(j => j.id === jobId) : null
  
  const [candidate] = useState(selectedCandidate)
  const [cvData, setCVData] = useState(candidate.cv)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [cvAnalysis, setCVAnalysis] = useState<CVAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAutoAnalyzed, setHasAutoAnalyzed] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setFileUrl(url)
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
    }
  }

  // Cleanup URL when component unmounts
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl)
      }
    }
  }, [fileUrl])

  const handleAnalyzeCV = async () => {
    setIsAnalyzing(true)
    try {
      const jobDescription = job 
        ? `
          Position: ${job.title}
          Company: ${job.company}
          Description: ${job.description}
          Requirements: ${job.requirements.join(", ")}
          Required Skills: ${job.skills.join(", ")}
        `
        : undefined
      const analysis = await analyzeCVWithAI(cvData, jobDescription)
      setCVAnalysis(analysis)
      // Auto-switch to analysis tab after analysis completes
      setTimeout(() => {
        const analysisTab = document.querySelector('[value="analysis"]') as HTMLElement
        if (analysisTab) {
          analysisTab.click()
        }
      }, 300)
    } catch (error) {
      console.error("Error analyzing CV:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Auto-analyze CV with JD if jobId is present
  useEffect(() => {
    if (jobId && job && !hasAutoAnalyzed) {
      setIsAnalyzing(true)
      setHasAutoAnalyzed(true)
      const jobDescription = `
        Position: ${job.title}
        Company: ${job.company}
        Description: ${job.description}
        Requirements: ${job.requirements.join(", ")}
        Required Skills: ${job.skills.join(", ")}
      `
      analyzeCVWithAI(cvData, jobDescription)
        .then((analysis) => {
          setCVAnalysis(analysis)
          // Auto-switch to analysis tab after a short delay
          setTimeout(() => {
            const analysisTab = document.querySelector('[value="analysis"]') as HTMLElement
            if (analysisTab) {
              analysisTab.click()
            }
          }, 500)
        })
        .catch((error) => {
          console.error("Error analyzing CV:", error)
        })
        .finally(() => {
          setIsAnalyzing(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, job])

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        {job && (
          <div className="mb-4">
            <Link 
              href={`/jobs/${job.id}`} 
              className="text-primary hover:underline text-sm mb-2 inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Job
            </Link>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI is analyzing your CV against this job description
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <h2 className="text-3xl font-bold text-foreground">Manage Your CV</h2>
        <p className="text-muted-foreground mt-2">
          {job 
            ? `AI-powered CV analysis matched against: ${job.title}`
            : "Upload and optimize your CV for better job matches"
          }
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload CV</CardTitle>
          <CardDescription>Upload a PDF, DOC, or DOCX file</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium text-foreground mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mb-4">PDF, DOC, or DOCX (max 10MB)</p>
            <label htmlFor="cv-upload" className="cursor-pointer">
              <input
                id="cv-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
              />
              <Button asChild className="relative">
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            {uploadSuccess && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>CV uploaded successfully!</span>
                </div>
                <Button
                  onClick={handleAnalyzeCV}
                  disabled={isAnalyzing}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      AI Analyze CV
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center max-w-md">
                  Get AI-powered scoring based on structure, length, keywords, and identify errors, duplications, and redundancies
                </p>
              </div>
            )}
            {uploadedFile && !uploadSuccess && (
              <div className="mt-4 text-sm text-muted-foreground">
                Current file: <span className="font-medium text-foreground">{uploadedFile.name}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue={jobId ? "analysis" : "preview"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">CV Preview</TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Analysis My CV {job && <Badge variant="secondary" className="ml-1">JD Match</Badge>}
          </TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          {/* CV File Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>CV Preview</CardTitle>
              <CardDescription>
                {uploadedFile 
                  ? `Viewing uploaded CV: ${uploadedFile.name}`
                  : "Upload a CV file to preview it here"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fileUrl && uploadedFile ? (
                <div className="w-full">
                  {uploadedFile.type === "application/pdf" ? (
                    <iframe
                      src={fileUrl}
                      className="w-full h-[800px] border rounded-lg"
                      title="CV Preview"
                    />
                  ) : (
                    <div className="border rounded-lg p-8 text-center bg-secondary/30">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        File type: {uploadedFile.type || "Document"}
                      </p>
                      <a
                        href={fileUrl}
                        download={uploadedFile.name}
                        className="text-primary hover:underline"
                      >
                        Download CV
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-secondary/30">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-2">No CV file uploaded yet</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a CV file above to preview it here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI-Powered CV Analysis
                </div>
                <Button onClick={handleAnalyzeCV} disabled={isAnalyzing} className="gap-2">
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Analyze My CV
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                {job 
                  ? `AI-powered CV analysis matched against ${job.title} at ${job.company}. Get detailed insights on how your CV aligns with job requirements.`
                  : "AI analyzes your CV based on structure, length, keywords. Identifies errors, duplications, and redundancies to help improve your score."
                }
              </CardDescription>
            </CardHeader>
          </Card>

          {cvAnalysis ? (
            <CVAnalysisPanel analysis={cvAnalysis} isLoading={isAnalyzing} onReanalyze={handleAnalyzeCV} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">
                  Click "Analyze My CV" to get AI-powered insights and recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
