import { generateObject } from "ai"
import { z } from "zod"

const CVAnalysisSchema = z.object({
  atsScore: z.number().min(0).max(100),
  scoreBreakdown: z.object({
    structure: z.number(),
    length: z.number(),
    keywords: z.number(),
    jdAlignment: z.number(),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  missingSkills: z.array(z.string()),
  duplicateContent: z.array(z.string()),
  suggestions: z.array(z.string()),
  keywordSuggestions: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { cv, jobDescription } = await req.json()

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: CVAnalysisSchema,
      prompt: `Analyze this CV and provide detailed ATS scoring and improvement suggestions. Also compare it against the job description.

CV:
${JSON.stringify(cv, null, 2)}

Job Description:
${jobDescription}

Provide:
1. ATS Score (0-100) based on: structure (25%), length (15%), keywords (30%), JD alignment (30%)
2. Detailed breakdown of each scoring criterion
3. Key strengths and weaknesses
4. Missing skills compared to JD
5. Any duplicate or redundant content
6. Specific suggestions for improvement
7. Recommended keywords to add based on JD`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("CV analysis error:", error)
    return Response.json({ error: "Failed to analyze CV" }, { status: 500 })
  }
}
