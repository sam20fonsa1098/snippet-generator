import { DomainError } from "./domain.error";

export class InvalidSummaryError extends DomainError {
    constructor(message = "Summary must contains 30 words or less") {
        super(message);
        this.name = "InvalidSummaryError";
    }
}