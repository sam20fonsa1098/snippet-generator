import { IAIProvider } from "../../../../application/providers/AI/i.ai.provider";
import { GeminiProvider } from "./gemini.provider";

export class SingletonAIProvider {
  private static instance: IAIProvider;

  public static getInstance(): IAIProvider {
    if (!SingletonAIProvider.instance) {
      SingletonAIProvider.instance = new GeminiProvider();
    }
    return SingletonAIProvider.instance;
  }
}