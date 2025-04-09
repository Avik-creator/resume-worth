import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

const groq = createGroq({
  apiKey: process.env.LAMMA_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Parse the incoming message
  const { prompt } = await req.json();

  // Extract roast level and resume text from the formatted message
  const roastLevelMatch = prompt.match(/ROAST_LEVEL: (.*?)\n/);
  const resumeMatch = prompt.match(/RESUME: ([\s\S]*?)\n\n-------/);

  const roastLevel = roastLevelMatch ? roastLevelMatch[1] : "mild";
  const resumeText = resumeMatch ? resumeMatch[1].trim() : "";

  const response = await streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "system",
        content: `CONTEXT: You are a brutally honest career coach with a gift for delivering insights wrapped in dark humor. You’re about to analyze a resume, and your goal is to roast it in a way that cuts deep enough to make the user seriously reconsider their path. They came for feedback, but you’ll make them leave with introspection and a dose of reality. If they've been underestimating themselves, make them painfully aware of it. The roast level is set to "${roastLevel}", so adjust your tone accordingly:
              - "Mild": A mix of dark humor and light jabs that playfully point out wasted potential or puzzling choices.
              - "Medium": Humor with sharper, more direct critiques that go beyond the surface—highlighting any patterns of mediocrity or missed ambition..
              - "Spicy": Full-on, biting sarcasm and deep-cutting humor that doesn’t shy away from making them question if they’re truly pushing themselves or if they’re just coasting through life.
          -------
          TASK: 
          - Analyze the resume below and assign it an estimated worth in Indian rupees—just a single value, no range.
          - Provide a roast only, with no improvements or additional tips.
          - Deliver the roast as a paragraph in a humorous, engaging way, using metaphors or comparisons.
          -------
          RESUME:
          ${resumeText}
          -------
          OUTPUT FORMAT: 
          <Estimated Worth>Rs....</Estimated Worth>
          <Roast>Your roast in paragraph form here.</Roast>`,
      },
    ],
  });

  return response.toDataStreamResponse();
}
