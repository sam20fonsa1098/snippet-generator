import { DomainError } from "./domain.error";

export class NotFoundError extends DomainError {
    constructor(message = "Not Found Entity") {
        super(message);
        this.name = "NotFoundError";
    }
}