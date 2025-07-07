import { v4 } from 'uuid';
import { InvalidSummaryError } from '../errors/invalid.summary.error';

export class Snippet {
    public static MAXIMUM_SUMMARY_WORDS = 30;

    public readonly id: string;
    public readonly text: string;
    public readonly summary: string;

    constructor(
        text: string,
        summary: string,
        id?: string
    ) {
        if (summary.split(" ").length > Snippet.MAXIMUM_SUMMARY_WORDS) {
            throw new InvalidSummaryError();
        }

        this.id = id || v4();
        this.text = text;
        this.summary = summary;
    }
}