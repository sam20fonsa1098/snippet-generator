import { config } from 'dotenv';
import { GeminiProvider } from './gemini.provider';

describe("Gemini Provider tests", () => {
    beforeAll(() => {
        config();
    });
    
    it("should be able to generate a summary of a text with maximum 30 words", async () => {
        const summary = await new GeminiProvider().generateSummaryByText(
            "The discovery of photosynthesis in the 18th century revolutionized our understanding of plant biology. Scientists found that plants convert sunlight into chemical energy, releasing oxygen as a byproduct. This process not only sustains plant life but also produces most of Earth's atmospheric oxygen, making it vital for all aerobic organisms. Modern research continues to explore ways to enhance photosynthetic efficiency, potentially boosting agricultural yields and addressing food security challenges"
        );

        expect(summary.split(" ").length).toBeLessThanOrEqual(30);
    });
})