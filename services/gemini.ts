
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePostIdea(mood: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, engaging social media status update for Facebook in a ${mood} mood. Keep it under 100 characters. No hashtags.`,
    });
    return response.text || "I'm having a great day!";
  } catch (error) {
    console.error("AI Post generation failed:", error);
    return "Thinking about life today...";
  }
}

export async function analyzePostSentiment(content: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the sentiment of this text: "${content}". Reply with one emoji that represents the mood.`,
    });
    return response.text?.trim() || "✨";
  } catch (error) {
    return "✨";
  }
}
