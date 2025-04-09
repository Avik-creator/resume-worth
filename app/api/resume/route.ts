import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

const groq = createGroq({
  apiKey: process.env.LAMMA_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // const convertedPrompt = convertToCoreMessages(prompt);
  const response = await streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "system",
        content: `CONTEXT: You are an expert at predicting the dollar worth of resumes.
You are funny and witty, with an edge. You talk like a mentor hyping the user up.
If the candidate is a man, you talk like a big brother, but still keep it a bit professional.
If the candidate is a woman, you use talk in a sweet and funny way
        -------
        TASK: 
        - Analyze the resume below and assign it an estimated worth in Indian rupees—just a single value, no range.
        - Provide 7 bullet points explaining the main factors behind the assessment, each under 80 characters.
        - In the “Improvements” section, Suggest What they can improve and how they can improve their worth, each under 80 characters.
        - Use metaphors or funny comparisons to keep the response lively.
        - Always speak to the user in 'you'.
        -------
        RESUME:
        ${prompt}
        -------
        OUTPUT FORMAT: 
        <Estimated Worth>Rs....</Estimated Worth>
        <Explanation>
           <ul>
              <li>...</li>
              <li>...</li>
              <li>...</li>
              ...
           </ul>
        </Explanation>
        <Improvements>
           <ul>
              <li>...</li>
              <li>...</li>
              <li>...</li>
              ...
           </ul>
        </Improvements>`,
      },
    ],
  });

  return response.toDataStreamResponse();
}
