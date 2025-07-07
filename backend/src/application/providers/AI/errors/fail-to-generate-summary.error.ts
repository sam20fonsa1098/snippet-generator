import { ApplicationError } from "../../shared/errors/application.error";

export class FailToGenerateSummaryError extends ApplicationError {
    constructor(message = "Fail to generate summary") {
        super(message);
        this.name = "FailToGenerateSummaryError";
    }
}