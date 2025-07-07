export interface IAIProvider {
    generateSummaryByText(text: string): Promise<string>;
}