// Mock AI responses for frontend-only MVP (simulates AI API calls)

export interface CVAnalysis {
  atsScore: number
  scoreBreakdown: {
    structure: number
    length: number
    keywords: number
    jdAlignment: number
  }
  strengths: string[]
  weaknesses: string[]
  missingSkills: string[]
  duplicateContent: string[]
  suggestions: string[]
  keywordSuggestions: string[]
}

export interface CVJDMatch {
  matchScore: number
  matchBreakdown: {
    experienceMatch: number
    skillsMatch: number
    educationMatch: number
    certificationsMatch: number
  }
  matchedSkills: Array<{
    skill: string
    candidateLevel: string
    requiredLevel: string
  }>
  missingSkills: string[]
  recommendations: string[]
}

export interface CandidateRanking {
  rankings: Array<{
    candidateId: string
    name: string
    matchScore: number
    rank: number
    reasoning: string
    topMatchedSkills: string[]
    gapSkills: string[]
    recommendedNextSteps: string[]
  }>
  topCandidates: string[]
}

// Mock CV Analysis Function
export async function analyzeCVWithAI(cv: any, jobDescription?: string): Promise<CVAnalysis> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const baseScore = 75 + Math.random() * 20
  const hasJD = !!jobDescription

  return {
    atsScore: Math.round(baseScore),
    scoreBreakdown: {
      structure: 85 + Math.random() * 10,
      length: hasJD ? 70 + Math.random() * 20 : 75 + Math.random() * 15,
      keywords: hasJD ? 65 + Math.random() * 25 : 70 + Math.random() * 20,
      jdAlignment: hasJD ? 60 + Math.random() * 30 : 0,
    },
    strengths: [
      "Well-structured CV with clear sections",
      "Good use of action verbs and accomplishments",
      "Relevant skills prominently displayed",
      "Professional formatting and readability",
    ],
    weaknesses: [
      "Could add more quantifiable metrics and results",
      "Some bullet points could be more concise",
      "Missing specific dates for recent experience",
    ],
    missingSkills: hasJD ? ["Leadership", "Project Management", "Agile/Scrum"] : [],
    duplicateContent: [
      "Technical skills mentioned twice in different sections",
      "Award-winning repeatedly used to describe achievements",
    ],
    suggestions: [
      'Add 2-3 more quantifiable achievements with metrics (e.g., "Improved performance by X%")',
      "Expand education section with relevant coursework or certifications",
      "Include links to portfolio or GitHub profile",
      "Add specific tools and technologies with proficiency levels",
      "Rewrite generic descriptions to be more action-oriented",
    ],
    keywordSuggestions: hasJD
      ? ["Full Stack Development", "Cloud Architecture", "Microservices", "CI/CD Pipeline", "DevOps", "System Design"]
      : [
          "Leadership",
          "Strategic Planning",
          "Performance Optimization",
          "System Architecture",
          "Cross-functional Collaboration",
        ],
  }
}

// Mock CV-JD Matching Function
export async function matchCVWithJD(cv: any, jobDescription: string): Promise<CVJDMatch> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const skillsMatch = 50 + Math.random() * 45
  const experienceMatch = 45 + Math.random() * 50

  return {
    matchScore: Math.round((skillsMatch + experienceMatch) / 2),
    matchBreakdown: {
      experienceMatch: Math.round(experienceMatch),
      skillsMatch: Math.round(skillsMatch),
      educationMatch: 70 + Math.random() * 25,
      certificationsMatch: 30 + Math.random() * 40,
    },
    matchedSkills: [
      { skill: "React", candidateLevel: "Expert", requiredLevel: "Expert" },
      { skill: "TypeScript", candidateLevel: "Advanced", requiredLevel: "Advanced" },
      { skill: "Next.js", candidateLevel: "Advanced", requiredLevel: "Intermediate" },
      { skill: "Node.js", candidateLevel: "Advanced", requiredLevel: "Intermediate" },
      { skill: "AWS", candidateLevel: "Intermediate", requiredLevel: "Intermediate" },
    ],
    missingSkills: ["Docker", "Kubernetes", "Microservices Architecture"],
    recommendations: [
      "Candidate is a strong fit for the senior role with 5+ years of relevant experience",
      "Slight gaps in DevOps skills but can be addressed quickly",
      "Excellent technical foundation for system design and architecture roles",
      "Consider pairing with DevOps engineer for infrastructure-heavy projects",
    ],
  }
}

// Mock Candidate Ranking Function
export async function rankCandidatesWithAI(candidates: any[], jobDescription: string): Promise<CandidateRanking> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const rankedCandidates = candidates
    .map((candidate, idx) => {
      const baseScore = 50 + Math.random() * 50
      return {
        candidateId: candidate.id,
        name: candidate.name,
        matchScore: Math.round(baseScore),
        rank: idx + 1,
        reasoning: `${candidate.name} has strong alignment with the job requirements. Their ${candidate.experience} years of experience and technical skills make them a valuable candidate for this role.`,
        topMatchedSkills: candidate.skills.slice(0, 4),
        gapSkills: ["System Design", "Leadership", "Strategic Planning"],
        recommendedNextSteps: [
          "Technical assessment covering core competencies",
          "System design interview",
          "Culture fit discussion",
          "Reference check",
        ],
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .map((candidate, idx) => ({
      ...candidate,
      rank: idx + 1,
    }))

  return {
    rankings: rankedCandidates,
    topCandidates: rankedCandidates.slice(0, 3).map((c) => c.candidateId),
  }
}
