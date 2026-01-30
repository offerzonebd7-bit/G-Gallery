
import { GoogleGenAI } from "@google/genai";

export const generateAestheticDescription = async (name: string, category: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, elegant, and poetic one-sentence description for a premium mobile wallpaper named "${name}" from the "${category}" collection. Focus on sophistication and minimalist art vibes.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });

    return response.text?.trim() || "A refined expression of minimalist art for your digital sanctuary.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An elegant addition to your premium collection.";
  }
};
