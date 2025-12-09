import { generateObject } from "ai"
import { z } from "zod"

const CandidateRankingSchema = z.object({
  rankings: z.array(
    z.object({
      candidateId: z.string(),
      name: z.string(),
      matchScore: z.number().min(0).max(100),
      rank: z.number(),
      reasoning: z.string(),
      topMatchedSkills: z.array(z.string()),
      gapSkills: z.array(z.string()),
      recommendedNextSteps: z.array(z.string()),
    }),
  ),
  topCandidates: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { candidates, jobDescription } = await req.json()

    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: CandidateRankingSchema,
      prompt: `Rank these candidates against the job description. Provide detailed analysis for each.

Job Description:
${jobDescription}

Candidates:
${JSON.stringify(candidates, null, 2)}

For each candidate provide:
1. Match score (0-100) based on skills alignment, experience, and fit
2. Ranking position
3. Clear reasoning for the score
4. Top matched skills (3-5)
5. Skill gaps
6. Recommended next steps (interview questions, skills to verify, etc.)

Also identify the top 3 candidates overall.`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Candidate ranking error:", error)
    return Response.json({ error: "Failed to rank candidates" }, { status: 500 })
  }
}
