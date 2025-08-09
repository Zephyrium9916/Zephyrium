import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generatePostDraft(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are Zephyrium AI, a cinematic cybersecurity writer. Draft an engaging, informative, and forward-thinking blog post based on the user's prompt. Keep it professional, rich in insights, and suitable for publishing on a thought leadership blog.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Extract the content from the response
  const content = response.choices[0]?.message?.content || "";
  return content;
}
