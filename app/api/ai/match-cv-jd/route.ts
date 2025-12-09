import { generateObject } from "ai"
import { z } from "zod"

const CVJDMatchSchema = z.object({
  matchScore: z.number().min(0).max(100),
  matchBreakdown: z.object({
    experienceMatch: z.number(),
    skillsMatch: z.number(),
    educationMatch: z.number(),
    certificationsMatch: z.number(),
  }),
  matchedSkills: z.array(
    z.object({
      skill: z.string(),
      candidateLevel: z.string(),
      requiredLevel: z.string(),
    }),
  ),
  missingSkills: z.array(z.string()),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { cv, jobDescription } = await req.json()

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: CVJDMatchSchema,
      prompt: `Compare this CV against the job description and provide a match score.

CV:
${JSON.stringify(cv, null, 2)}

Job Description:
${jobDescription}

Provide:
1. Overall match score (0-100)
2. Match breakdown: experience (25%), skills (40%), education (20%), certifications (15%)
3. List of skills that match with candidate level vs required level
4. List of required skills that are missing
5. Actionable recommendations to improve match`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("CV-JD matching error:", error)
    return Response.json({ error: "Failed to match CV with JD" }, { status: 500 })
  }
}
