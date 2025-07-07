import { GoogleGenAI } from "@google/genai"
import { IAIProvider } from "../../../../application/providers/AI/i.ai.provider";
import { FailToGenerateSummaryError } from "../../../../application/providers/AI/errors/fail-to-generate-summary.error";


export class GeminiProvider implements IAIProvider {
    private genAI: GoogleGenAI;

    constructor() {
        this.genAI = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }

    async generateSummaryByText(text: string): Promise<string> {
        const prompt = `Summarize the following text with maximum 30 words: ${text}`;

        const response = await this.genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        if (!response.text) {
            throw new FailToGenerateSummaryError("Gemini failed")
        }

        return response.text;
    }
}