import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ChecklistResponse, BenefitsAnalysis, LinkedInPostResponse } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const explainMedicalJargon = async (text: string): Promise<string> => {
  if (!text) return "";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an empathetic and clear medical advocate. 
      Analyze the following medical text, which may contain jargon, abbreviations, or complex terms from a discharge summary.
      
      Task:
      1. Translate it into simple, plain English (5th-grade reading level).
      2. Highlight any potential "red flags" or things the patient should clarify with a doctor (if any).
      3. Keep the tone calm and reassuring.
      
      Input text:
      "${text}"`,
    });
    return response.text || "Could not generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error while trying to explain this text. Please try again.";
  }
};

export const generateChecklist = async (condition: string, type: 'discharge' | 'admission'): Promise<ChecklistResponse | null> => {
  if (!condition) return null;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "A comforting title for the checklist" },
      items: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Category like 'Medication', 'Documents', 'Home Prep'" },
            task: { type: Type.STRING, description: "Specific action item for the patient" },
            priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
          },
          required: ["category", "task", "priority"]
        }
      }
    },
    required: ["title", "items"]
  };

  const typeText = type === 'discharge' ? 'hospital discharge' : 'hospital admission';
  const focusText = type === 'discharge'
    ? 'Focus on things patients often forget to ask or do upon leaving. Make it practical and safety-focused.'
    : 'Focus on what to pack, documents to bring, questions to ask the intake team, and how to prepare the home for an absence.';

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a personalized ${typeText} checklist for a patient regarding: ${condition}.
      ${focusText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as ChecklistResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const analyzeBenefitsPolicy = async (base64Data: string): Promise<BenefitsAnalysis | null> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING, description: "A simplified summary of the policy tone and general coverage." },
      deductibles_and_maximums: { type: Type.STRING, description: "Clear explanation of deductible and out-of-pocket max." },
      coverage_limits: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "e.g., Inpatient Rehab, PT/OT, DME" },
            limit: { type: Type.STRING, description: "The specific limit (e.g., 60 days/year, 20 visits)" },
            explanation: { type: Type.STRING, description: "What this means for a catastrophic injury patient." }
          },
          required: ["category", "limit", "explanation"]
        }
      },
      red_flags: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of clauses that could lead to denials (e.g., 'medical necessity' definitions, exclusions)."
      },
      actionable_advice: { type: Type.STRING, description: "Advice for the patient based on this specific policy." }
    },
    required: ["summary", "deductibles_and_maximums", "coverage_limits", "red_flags", "actionable_advice"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64Data
            }
          },
          {
            text: `You are an expert insurance case manager for catastrophic injuries (TBI, SCI, etc.). 
            Analyze this insurance benefits document. 
            Transform the complex insurance language into clear, understandable terms.
            Focus on:
            1. Inpatient Rehabilitation coverage limitations.
            2. Therapy limitations (PT/OT/ST).
            3. Durable Medical Equipment (DME) coverage logic.
            4. "Red Flag" clauses that allow insurers to deny care based on "medical necessity" or "plateau" definitions.
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as BenefitsAnalysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateLinkedInPost = async (topic: string): Promise<LinkedInPostResponse | null> => {
  if (!topic) return null;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      headline: { type: Type.STRING, description: "A catchy, satirical headline for the LinkedIn post." },
      content: { type: Type.STRING, description: "The content of the post." },
      graphicDescription: { type: Type.STRING, description: "A description of the satirical graphic." },
    },
    required: ["headline", "content", "graphicDescription"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a satirical LinkedIn post about: "${topic}".
      The persona is a burnt-out Nurse Case Manager at "Last Resort Rehab Hospital".
      The style should be cynical, dark humor, exposing healthcare bureaucracy.
      Also provide a description for a "Mad Magazine" style caricature graphic to accompany it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as LinkedInPostResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};