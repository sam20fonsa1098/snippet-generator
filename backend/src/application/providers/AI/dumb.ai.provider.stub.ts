import { IAIProvider } from "./i.ai.provider";

export class StubAiProvider implements IAIProvider {
    async generateSummaryByText(text: string): Promise<string> {
        return "some random text";
    }
}