"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CVAnalysis } from "@/lib/ai-utils"
import { AlertCircle, CheckCircle2, TrendingUp, Zap, RefreshCw } from "lucide-react"

interface CVAnalysisPanelProps {
  analysis: CVAnalysis
  isLoading?: boolean
  onReanalyze?: () => void
}

export function CVAnalysisPanel({ analysis, isLoading = false, onReanalyze }: CVAnalysisPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("strengths")

  const scoreColor =
    analysis.atsScore >= 80 ? "text-green-600" : analysis.atsScore >= 60 ? "text-yellow-600" : "text-red-600"
  const scoreLabel = analysis.atsScore >= 80 ? "Excellent" : analysis.atsScore >= 60 ? "Good" : "Needs Improvement"

  return (
    <div className="space-y-6">
      {/* Main ATS Score */}
      <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                ATS Score Analysis
              </CardTitle>
              <CardDescription>AI-powered CV evaluation against ATS systems</CardDescription>
            </div>
            {onReanalyze && (
              <Button variant="outline" size="sm" onClick={onReanalyze} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Reanalyze
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Score Circle */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative h-32 w-32">
                <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-secondary"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(analysis.atsScore / 100) * 339.29} 339.29`}
                    className={scoreColor}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${scoreColor}`}>{analysis.atsScore}</div>
                    <div className="text-xs text-muted-foreground">{scoreLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground mb-4">Score Breakdown by Criteria</p>
              {Object.entries(analysis.scoreBreakdown).map(([key, value]) => {
                const labelMap: Record<string, string> = {
                  structure: "Structure",
                  length: "Length",
                  keywords: "Keywords",
                  jdAlignment: "JD Alignment"
                }
                const descriptionMap: Record<string, string> = {
                  structure: "CV organization & formatting",
                  length: "Optimal content length",
                  keywords: "Relevant keyword usage",
                  jdAlignment: "Match with job requirements"
                }
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <div>
                        <span className="font-medium text-foreground">{labelMap[key] || key}</span>
                        <span className="text-muted-foreground text-xs ml-2">({descriptionMap[key]})</span>
                      </div>
                      <span className="font-semibold text-foreground">{Math.round(value)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setExpandedSection(expandedSection === "strengths" ? null : "strengths")}
        >
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Strengths
          </CardTitle>
        </CardHeader>
        {expandedSection === "strengths" && (
          <CardContent>
            <ul className="space-y-2">
              {analysis.strengths.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Weaknesses */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setExpandedSection(expandedSection === "weaknesses" ? null : "weaknesses")}
        >
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        {expandedSection === "weaknesses" && (
          <CardContent>
            <ul className="space-y-2">
              {analysis.weaknesses.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="text-yellow-600 font-bold">!</span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* Missing Skills */}
      {analysis.missingSkills.length > 0 && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">Skills to Add for Better Fit:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-900">
                  {skill}
                </Badge>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Duplicate Content */}
      {analysis.duplicateContent && analysis.duplicateContent.length > 0 && (
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => setExpandedSection(expandedSection === "duplicates" ? null : "duplicates")}
          >
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              Duplicate & Redundant Content
            </CardTitle>
            <CardDescription>AI detected repeated or unnecessary content in your CV</CardDescription>
          </CardHeader>
          {expandedSection === "duplicates" && (
            <CardContent>
              <ul className="space-y-2">
                {analysis.duplicateContent.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-orange-600 font-bold mt-0.5">⚠</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}

      {/* Keyword Suggestions */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setExpandedSection(expandedSection === "keywords" ? null : "keywords")}
        >
          <CardTitle>Keyword Suggestions</CardTitle>
          <CardDescription>Add these keywords to improve ATS score</CardDescription>
        </CardHeader>
        {expandedSection === "keywords" && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordSuggestions.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  + {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Actionable Suggestions */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setExpandedSection(expandedSection === "suggestions" ? null : "suggestions")}
        >
          <CardTitle>Improvement Suggestions</CardTitle>
          <CardDescription>Step-by-step actions to boost your score</CardDescription>
        </CardHeader>
        {expandedSection === "suggestions" && (
          <CardContent>
            <ol className="space-y-3">
              {analysis.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="font-semibold text-primary min-w-6">{idx + 1}.</span>
                  <span className="text-foreground">{suggestion}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
