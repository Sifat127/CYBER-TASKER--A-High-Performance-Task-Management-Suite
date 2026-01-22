import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIPlan = async (goal: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    return ["Make sure to set your API Key", "Check environment variables"];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Break down the following goal into 3 to 5 concise, actionable todo list items. Goal: "${goal}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of actionable tasks based on the goal."
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const parsed = JSON.parse(jsonText);
    return parsed.tasks || [];
  } catch (error) {
    console.error("Gemini generation error:", error);
    return [];
  }
};
